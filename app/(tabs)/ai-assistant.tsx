import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
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
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { id: 1, type: 'assistant', text: 'Hello! I\'m your Lifeline First Aid Assistant. I can help with emergency medical information and first aid procedures. What would you like to know?' },
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

  // Helper function to determine if a query is health related
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
    
    // Common greetings and polite conversation starters
    const greetings = [
      'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening',
      'thanks', 'thank you', 'bye', 'goodbye', 'help', 'start', 'begin'
    ];
    
    const lowerQuery = query.toLowerCase().trim();
    
    // Allow greetings and basic conversation
    if (greetings.some(greeting => lowerQuery.includes(greeting))) {
      return true;
    }
    
    // Check if query contains health-related keywords
    return healthRelatedKeywords.some(keyword => lowerQuery.includes(keyword)) ||
      // Simple heuristic for health questions not containing specific keywords
      /how (do|to|can|should) (i|you|we|they) (treat|handle|deal with|manage|help)/i.test(lowerQuery);
  };

  const fetchAIResponse = async (userQuery: string) => {
    try {
      // Check if API key is available
      if (!OPENROUTER_API_KEY) {
        throw new Error('API key not configured');
      }
      
      setIsLoading(true);
      
      // Check if query is health or first aid related before sending to API
      if (!isHealthRelatedQuery(userQuery)) {
        // Handle non-health related queries locally
        setTimeout(() => {
          setChatHistory(prev => [...prev, { 
            id: Date.now() + 1, 
            type: 'assistant', 
            text: "I'm sorry, I can only answer questions related to health, medical issues, or first aid. Please ask me something about first aid, emergency response, or health-related topics."
          }]);
          setIsLoading(false);
        }, 500);
        return;
      }
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a knowledgeable first aid assistant helping people with emergency medical information. Provide clear, concise instructions for first aid situations. For serious emergencies, always advise calling emergency services. Your advice should be based on established first aid protocols. ONLY answer questions related to health, medicine, first aid, or emergency response. For other topics, politely decline to answer. Your name is Lifeline Assistant.'
            },
            { role: 'user', content: userQuery }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const aiReply = data.choices[0].message.content;

      // Add AI response to chat
      setChatHistory(prev => [...prev, { 
        id: Date.now() + 1, 
        type: 'assistant', 
        text: aiReply 
      }]);
      
    } catch (error) {
      console.error('Error fetching AI response:', error);
      
      let errorMessage = 'I apologize, but I\'m having trouble connecting to my medical database. Please try again in a moment.';
      
      // Special message for API key configuration issues
      if (error instanceof Error && error.message.includes('API key')) {
        errorMessage = 'The AI service is currently unavailable. Please contact support for assistance.';
        console.error('API key not properly configured');
      }
      
      // Add error message to chat
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
    
    // Add user message to chat
    const userMessage = { id: Date.now(), type: 'user', text: message.trim() };
    setChatHistory(prev => [...prev, userMessage]);
    
    // Save query and clear input
    const userQuery = message.trim();
    setMessage('');
    
    // Get AI response
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
        keyboardVerticalOffset={insets.bottom} // Only safe area inset
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.chatContainer} 
          contentContainerStyle={[
            styles.chatContent,
            { paddingBottom: 100 } // Add extra padding for tab bar
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
        
        {/* Update the input container with tab bar consideration */}
        <View 
          style={[
            styles.inputContainer,
            isDark ? { backgroundColor: '#333', borderTopColor: '#444' } : null,
            { 
              paddingBottom: Platform.OS === 'ios' ? insets.bottom : 0, // Only add bottom padding for iOS
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
            <FontAwesome name="send" size={18} color="#fff" />
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
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  bobbleEffect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff0f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#fcc',
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
    // Optionally, add animation for pulsing effect
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
    position: 'relative', // Ensure proper positioning
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