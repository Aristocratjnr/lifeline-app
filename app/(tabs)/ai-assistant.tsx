import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import {
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

export default function AIAssistantScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { id: 1, type: 'assistant', text: 'Hello! I\'m your Lifeline AI assistant. How can I help you with medical information today?' },
  ]);
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  
  // Scroll to bottom when chat history changes
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [chatHistory]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = { id: Date.now(), type: 'user', text: message.trim() };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = { 
        id: Date.now() + 1, 
        type: 'assistant', 
        text: 'I understand you have a question about health. As an AI assistant, I can provide general medical information, but remember that I\'m not a replacement for professional medical advice. What specific medical topic would you like to learn about?' 
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
      <SafeAreaView edges={['top']} style={{ flex: 0 }} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#111' }]}>
          AI Medical Assistant
        </Text>
        <Text style={[styles.headerSubtitle, { color: isDark ? '#ccc' : '#666' }]}>
          Get instant medical guidance
        </Text>
      </View>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.chatContainer} 
          contentContainerStyle={styles.chatContent}
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
                msg.type === 'user' ? styles.userBubble : styles.aiBubble,
              ]}>
                <Text style={[
                  styles.messageText,
                  { color: isDark ? '#fff' : '#111' }
                ]}>
                  {msg.text}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        
        {/* Fixed position input area */}
        <View 
          style={[
            styles.inputContainer,
            isDark ? { backgroundColor: '#333', borderTopColor: '#444' } : null,
            { paddingBottom: Math.max(insets.bottom, 16) }
          ]}
        >
          <TextInput
            style={[
              styles.input,
              isDark ? { backgroundColor: '#444', color: '#fff', borderColor: '#555' } : null
            ]}
            placeholder="Type your medical question..."
            placeholderTextColor={isDark ? '#aaa' : '#999'}
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, !message.trim() ? styles.sendButtonDisabled : null]}
            onPress={handleSend}
            disabled={!message.trim()}
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    paddingBottom: 20,
    marginBottom: 80, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
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