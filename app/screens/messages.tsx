import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'doctor';
  time: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  online: boolean;
}

export default function MessagesScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const flatListRef = useRef<FlatList>(null);
  
  // Doctor data from navigation parameters or fallback
  const { doctorId, doctorName } = useLocalSearchParams<{
    doctorId: string;
    doctorName: string;
  }>();
  
  // Mock doctor data based on ID
  const doctors: Record<string, Doctor> = {
    '1': {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Emergency Medicine',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      online: true
    },
    '2': {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      online: false
    },
    '3': {
      id: '3',
      name: 'Dr. Emily Wilson',
      specialty: 'Pediatrics',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      online: true
    },
    '4': {
      id: '4',
      name: 'Dr. James Brown',
      specialty: 'Neurology',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      online: false
    },
    '5': {
      id: '5',
      name: 'Dr. Lisa Anderson',
      specialty: 'Dermatology',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      online: true
    }
  };
  
  // Get the current doctor or fallback to first doctor
  const doctor = doctors[doctorId || '1'] || Object.values(doctors)[0];

  useEffect(() => {
    // Initial greeting message
    const greeting: Message = {
      id: '0',
      text: 'Hello! How can I help you today?',
      sender: 'doctor',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([greeting]);
  }, []);

  const handleSend = () => {
    if (message.trim() === '') return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Simulate doctor's response
    setTimeout(() => {
      const responses = [
        'I understand your concern. Can you provide more details?',
        'Thank you for sharing that information.',
        'I recommend scheduling an appointment for further evaluation.',
        'Is there anything else you\'d like to discuss?',
        'I\'ll make a note of that in your records.'
      ];
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'doctor',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessageContainer : styles.doctorMessageContainer
    ]}>
      {item.sender === 'doctor' && (
        <Image 
          source={{ uri: doctor.avatar }} 
          style={styles.avatar} 
        />
      )}
      <View style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.doctorBubble
      ]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
    </View>
  );

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/dashboard');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.doctorStatus}>
            {doctor.online ? 'Online' : 'Offline'}
            <View style={[styles.statusDot, { backgroundColor: doctor.online ? '#4CAF50' : '#9E9E9E' }]} />
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={handleSend}
            disabled={message.trim() === ''}
          >
            <MaterialIcons 
              name={message.trim() === '' ? 'mic' : 'send'} 
              size={24} 
              color={message.trim() === '' ? '#666' : '#EF4444'} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerInfo: {
    marginLeft: 10,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  doctorStatus: {
    fontSize: 14,
    color: '#666',
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 6,
  },
  content: {
    flex: 1,
  },
  messagesList: {
    padding: 15,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  doctorMessageContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
  },
  doctorBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#EF4444',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userBubbleText: {
    color: '#fff',
  },
  doctorBubbleText: {
    color: '#000',
  },
  messageTime: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 10,
    fontSize: 16,
    color: '#000',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
