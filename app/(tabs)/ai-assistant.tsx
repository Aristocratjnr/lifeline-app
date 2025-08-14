import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const OPENROUTER_API_KEY = process.env.EXPO_PUBLIC_OPENROUTER_API_KEY; 

export default function AIAssistantScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [message, setMessage] = useState('');

  // Local responses for common first aid queries - now using translations
  const getLocalResponses = (): Record<string, string> => ({
    'cpr': t('aiAssistant.localResponses.cpr'),
    'choking': t('aiAssistant.localResponses.choking'),
    'burn': t('aiAssistant.localResponses.burn'),
    'bleeding': t('aiAssistant.localResponses.bleeding'),
    'who are you': t('aiAssistant.localResponses.whoAreYou'),
    'what can you do': t('aiAssistant.localResponses.whatCanYouDo')
  });

  const [chatHistory, setChatHistory] = useState([
    { id: 1, type: 'assistant', text: t('aiAssistant.welcomeMessage') },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  // Bobble animation state
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  // Scroll to bottom when chat history changes
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [chatHistory]);

  // Bobble animation effect
  useEffect(() => {
    if (isLoading) {
      const animateDot = (dot: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(dot, {
              toValue: 1,
              duration: 350,
              delay,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
            Animated.timing(dot, {
              toValue: 0,
              duration: 350,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
          ])
        );
      };
      const a1 = animateDot(dot1, 0);
      const a2 = animateDot(dot2, 150);
      const a3 = animateDot(dot3, 300);
      a1.start();
      a2.start();
      a3.start();
      return () => {
        a1.stop();
        a2.stop();
        a3.stop();
      };
    }
  }, [isLoading, dot1, dot2, dot3]);

  const isHealthRelatedQuery = (query: string): boolean => {
    const healthRelatedKeywords = [
      'health', 'medical', 'doctor', 'nurse', 'hospital', 'emergency', 'injury', 'pain',
      'hurt', 'wound', 'blood', 'bleeding', 'heart', 'attack', 'stroke', 'cpr', 'bandage',
      'first aid', 'broken', 'fracture', 'burn', 'poisoning', 'choking', 'breathing',
      'unconscious', 'fever', 'sick', 'illness', 'disease', 'medicine', 'treatment',
      'symptom', 'diagnosis', 'ambulance', 'paramedic', 'rescue', 'safety', 'accident',
      'trauma', 'recovery', 'injury', 'heal', 'condition', 'patient', 'care', 'therapy',
      'infection', 'vaccine', 'pandemic', 'allergy', 'bite', 'sting', 'overdose', 'seizure'
    ];
    
    const allowedPhrases = [
      'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening',
      'thanks', 'thank you', 'bye', 'goodbye', 'help', 'start', 'begin',
      'who are you', 'what are you', 'who made you', 'who created you',
      'what can you do', 'what do you do', 'your name', 'about you',
      'tell me about yourself', 'what is lifeline', 'what\'s lifeline'
    ];
    
    const lowerQuery = query.toLowerCase().trim();
    
    if (allowedPhrases.some(phrase => lowerQuery.includes(phrase))) {
      return true;
    }
    
    return healthRelatedKeywords.some(keyword => lowerQuery.includes(keyword)) ||
      /how (do|to|can|should) (i|you|we|they) (treat|handle|deal with|manage|help)/i.test(lowerQuery);
  };

  const fetchAIResponse = async (userQuery: string) => {
    try {
      setIsLoading(true);
      
      
      const lowerQuery = userQuery.toLowerCase().trim();
      const localResponses = getLocalResponses();
      if (localResponses[lowerQuery]) {
        setChatHistory(prev => [...prev, { 
          id: Date.now() + 1, 
          type: 'assistant', 
          text: localResponses[lowerQuery]
        }]);
        setIsLoading(false);
        return;
      }
      
      if (!isHealthRelatedQuery(userQuery)) {
        setChatHistory(prev => [...prev, { 
          id: Date.now() + 1, 
          type: 'assistant', 
          text: t('aiAssistant.errorMessage')
        }]);
        setIsLoading(false);
        return;
      }
      
      // Verify API key
      if (!OPENROUTER_API_KEY) {
        throw new Error('API key not configured');
      }
      
      console.log('Making request to OpenRouter API');
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': ' exp://10.107.17.100:8081',
          'X-Title': 'Lifeline App'
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          messages: [
            {
              role: 'system',
              content: 'You are a knowledgeable first aid assistant named Lifeline Assistant. Provide clear, concise first aid instructions. For serious emergencies, always advise calling emergency services. Base advice on established protocols. When asked about identity, explain you are the Lifeline Assistant focused on first aid. For non-health topics, politely decline. Keep responses under 300 words.'
            },
            { role: 'user', content: userQuery }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error details:', errorData);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const aiReply = data.choices[0].message.content;

      setChatHistory(prev => [...prev, { 
        id: Date.now() + 1, 
        type: 'assistant', 
        text: aiReply 
      }]);
      
    } catch (error) {
      console.error('Error fetching AI response:', error);
      
      let errorMessage = 'I apologize, but I\'m having trouble connecting to my medical database. ';
      
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          errorMessage += 'The service is currently unavailable.';
        } else if (error.message.includes('401')) {
          errorMessage += 'There was an authentication issue.';
        }
      }
      
      // Add fallback information for critical queries
      const lowerQuery = userQuery.toLowerCase();
      if (['heart attack', 'stroke', 'unconscious', 'not breathing'].some(term => lowerQuery.includes(term))) {
        errorMessage += '\n\nIMPORTANT: For this emergency, call your local emergency number immediately.';
      }
      
      setChatHistory(prev => [...prev, { 
        id: Date.now() + 1, 
        type: 'assistant', 
        text: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!message.trim() || isLoading) return;
    
    const userMessage = { id: Date.now(), type: 'user', text: message.trim() };
    setChatHistory(prev => [...prev, userMessage]);
    const userQuery = message.trim();
    setMessage('');
    fetchAIResponse(userQuery);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
      <SafeAreaView edges={['top']} style={{ flex: 0 }} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', left: 16, top: 16, zIndex: 20 }}>
          <FontAwesome name="arrow-left" size={24} color={isDark ? '#fff' : '#111'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#111' }]}>
          First Aid Assistant
        </Text>
        <Text style={[styles.headerSubtitle, { color: isDark ? '#ccc' : '#666' }]}>
          Get emergency medical guidance
        </Text>
      </View>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.chatContainer} 
          contentContainerStyle={[
            styles.chatContent,
            { paddingBottom: 100 }
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {chatHistory.map((msg) => (
            <View 
              key={msg.id}
              style={[
                styles.messageContainer, 
                msg.type === 'user' ? styles.userMessage : styles.aiMessage,
              ]}
            >
              {msg.type === 'assistant' && (
                <View style={styles.avatarContainer}>
                  <Image 
                    source={require('@/assets/images/lifeline.jpeg')}
                    style={styles.avatar}
                    contentFit="cover"
                  />
                </View>
              )}
              <View style={[
                styles.messageBubble,
                msg.type === 'user' 
                  ? styles.userBubble 
                  : [styles.aiBubble, isDark ? { backgroundColor: '#444' } : null],
              ]}>
                <Text style={[
                  styles.messageText,
                  { 
                    color: msg.type === 'user' 
                      ? '#fff' 
                      : (isDark ? '#fff' : '#111')
                  }
                ]}>
                  {msg.text}
                </Text>
              </View>
            </View>
          ))}
          
          {isLoading && (
            <View style={[styles.messageContainer, styles.aiMessage]}>
              <View style={styles.avatarContainer}>
                <Image 
                  source={require('@/assets/images/lifeline.jpeg')}
                  style={styles.avatar}
                  contentFit="cover"
                />
              </View>
              <View style={[styles.messageBubble, [styles.aiBubble, isDark ? { backgroundColor: '#444' } : null]]}>
                <View style={styles.bobbleEffect}>
                  <Animated.View style={[styles.dot, { opacity: dot1.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }), transform: [{ translateY: dot1.interpolate({ inputRange: [0, 1], outputRange: [0, -6] }) }] }]} />
                  <Animated.View style={[styles.dot, { opacity: dot2.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }), transform: [{ translateY: dot2.interpolate({ inputRange: [0, 1], outputRange: [0, -6] }) }] }]} />
                  <Animated.View style={[styles.dot, { opacity: dot3.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }), transform: [{ translateY: dot3.interpolate({ inputRange: [0, 1], outputRange: [0, -6] }) }] }]} />
                </View>
              </View>
            </View>
          )}
        </ScrollView>
        
        <View 
          style={[
            styles.inputContainer,
            isDark ? { backgroundColor: '#333', borderTopColor: '#444' } : null,
            { 
              paddingBottom: Platform.OS === 'ios' ? insets.bottom : 0,
              marginBottom: 0 
            }
          ]}
        >
          <TextInput
            style={[
              styles.input,
              isDark ? { backgroundColor: '#444', color: '#fff', borderColor: '#555' } : null
            ]}
            placeholder="Ask about first aid..."
            placeholderTextColor={isDark ? '#aaa' : '#999'}
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
            editable={!isLoading}
          />
          <TouchableOpacity
            style={[
              styles.sendButton, 
              (!message.trim() || isLoading) ? styles.sendButtonDisabled : null
            ]}
            onPress={handleSend}
            disabled={!message.trim() || isLoading}
            activeOpacity={0.7}
          >
            <MaterialIcons name="auto-awesome" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : '#fff',
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
    paddingBottom: 24,
  },
  messageContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userMessage: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    marginRight: 8,
    backgroundColor: '#f0f0f0',
  },
  avatar: {
    width: 36,
    height: 36,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#FC7A7A',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#f2f2f2',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  bobbleEffect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 48,
    minHeight: 32,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#999',
    marginHorizontal: 3,
    opacity: 0.7,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    position: 'relative',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 16,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#FC7A7A',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
});