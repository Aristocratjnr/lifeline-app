import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image, KeyboardAvoidingView, Platform, SafeAreaView, Animated, Easing } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Audio } from 'expo-av';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'doctor';
  time: string;
  audioUri?: string;
  audioDuration?: number;
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
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordingPermission, setRecordingPermission] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const recordingAnimation = useRef(new Animated.Value(0)).current;
  
  // Get doctor info from route params or use default
  const { doctorId, doctorName } = useLocalSearchParams<{
    doctorId: string;
    doctorName: string;
  }>();
  
  // Doctor data based on ID
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
    // Request recording permissions
    (async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        setRecordingPermission(status === 'granted');
      } catch (err) {
        console.error('Failed to get recording permission', err);
      }
    })();

    // Initial greeting message
    const greeting: Message = {
      id: '0',
      text: 'Hello! How can I help you today?',
      sender: 'doctor',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([greeting]);

    return () => {
      // Cleanup recording on unmount
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRecording) {
      // Start recording animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(recordingAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(recordingAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      ).start();

      // Update recording duration
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      // Reset animation and duration when not recording
      recordingAnimation.setValue(0);
      setRecordingDuration(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const startRecording = async () => {
    if (!recordingPermission) {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') return;
      setRecordingPermission(true);
    }

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(newRecording);
      setIsRecording(true);
      setRecordingDuration(0);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      
      const uri = recording.getURI();
      if (uri) {
        // Create a message with the audio URI
        const audioMessage: Message = {
          id: Date.now().toString(),
          text: 'Voice message',
          audioUri: uri,
          sender: 'user',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, audioMessage]);
      }
    } catch (err) {
      console.error('Failed to stop recording', err);
    } finally {
      setRecording(null);
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const playAudio = async (uri: string) => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing audio', error);
    }
  };

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
        {item.audioUri ? (
          <TouchableOpacity 
            style={styles.audioMessage}
            onPress={() => item.audioUri && playAudio(item.audioUri)}
          >
            <MaterialIcons 
              name="play-circle-filled" 
              size={32} 
              color={item.sender === 'user' ? '#fff' : '#EF4444'} 
            />
            <View style={styles.audioWaveform}>
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Animated.View
                  key={i}
                  style={[
                    styles.audioBar,
                    item.sender === 'user' ? styles.userAudioBar : styles.doctorAudioBar,
                    {
                      height: Math.random() * 20 + 10,
                      opacity: isRecording && item.sender === 'user' ? 
                        recordingAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.6, 1]
                        }) : 1
                    }
                  ]}
                />
              ))}
            </View>
            <Text style={[
              styles.audioDuration,
              item.sender === 'user' ? styles.userAudioDuration : styles.doctorAudioDuration
            ]}>
              {item.audioDuration || '0:05'}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={[
            styles.messageText,
            item.sender === 'user' ? styles.userBubbleText : styles.doctorBubbleText
          ]}>
            {item.text}
          </Text>
        )}
        <Text style={[
          styles.messageTime,
          item.sender === 'user' && styles.userMessageTime
        ]}>
          {item.time}
        </Text>
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
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <MaterialIcons name="arrow-back-ios" size={22} color="#333" />
          </TouchableOpacity>
          <View style={styles.doctorInfo}>
            <Image 
              source={{ uri: doctor.avatar }} 
              style={styles.doctorAvatar} 
            />
            <View style={styles.doctorDetails}>
              <Text style={styles.doctorName} numberOfLines={1}>
                {doctor.name}
                {doctor.online && (
                  <MaterialIcons 
                    name="verified" 
                    size={16} 
                    color="#4CAF50" 
                    style={styles.verifiedIcon} 
                  />
                )}
              </Text>
              <View style={styles.statusContainer}>
                <View 
                  style={[
                    styles.statusDot, 
                    { backgroundColor: doctor.online ? '#4CAF50' : '#9E9E9E' }
                  ]} 
                />
                <Text style={styles.doctorStatus}>
                  {doctor.online ? 'Online' : 'Offline'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.headerButton}>
              <MaterialIcons name="phone" size={24} color="#EF4444" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <MaterialIcons name="more-vert" size={24} color="#333" />
            </TouchableOpacity>
          </View>
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
          {isRecording ? (
            <View style={styles.recordingContainer}>
              <TouchableOpacity 
                style={[styles.recordButton, styles.stopButton]}
                onPress={stopRecording}
              >
                <MaterialIcons name="stop" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.recordingTime}>
                {Math.floor(recordingDuration / 60)}:{(recordingDuration % 60).toString().padStart(2, '0')}
              </Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={message.trim() === '' ? toggleRecording : handleSend}
            >
              <MaterialIcons 
                name={message.trim() === '' ? 'mic' : 'send'} 
                size={24} 
                color={message.trim() === '' ? '#666' : '#EF4444'} 
              />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  doctorInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorStatus: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
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
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  doctorBubble: {
    backgroundColor: '#f8f8f8',
    borderBottomLeftRadius: 4,
    marginLeft: 8,
  },
  userBubble: {
    backgroundColor: '#EF4444',
    borderBottomRightRadius: 4,
    marginRight: 8,
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
    color: 'rgba(0,0,0,0.5)',
  },
  userMessageTime: {
    color: 'rgba(255,255,255,0.7)',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 120,
    backgroundColor: '#f5f5f5',
    borderRadius: 21,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 10,
    fontSize: 16,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recordButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#EF4444',
  },
  recordingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    borderRadius: 21,
    paddingHorizontal: 12,
    height: 42,
  },
  recordingTime: {
    color: '#EF4444',
    fontWeight: '600',
    marginLeft: 8,
    minWidth: 40,
  },
  audioMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  audioWaveform: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    height: 30,
  },
  audioBar: {
    width: 3,
    marginHorizontal: 1.5,
    borderRadius: 2,
  },
  userAudioBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  doctorAudioBar: {
    backgroundColor: '#EF4444',
  },
  audioDuration: {
    fontSize: 12,
    marginLeft: 4,
  },
  userAudioDuration: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  doctorAudioDuration: {
    color: '#666',
  },
});
