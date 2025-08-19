import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image, KeyboardAvoidingView, Platform, SafeAreaView, Animated, Easing, Modal, Pressable, Linking, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Audio } from 'expo-av';
import { useDisplayPreferences } from '@/context/DisplayPreferencesContext';
import { Colors } from '@/constants/Colors';

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
  const { darkMode } = useDisplayPreferences();
  const themeColors = darkMode ? Colors.dark : Colors.light;
  const styles = getStyles(darkMode, themeColors);
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordingPermission, setRecordingPermission] = useState(false);
  const [isCallModalVisible, setIsCallModalVisible] = useState(false);
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

  const handleMessage = () => {
    if (message.trim() === '') return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleCallPress = () => {
    setIsCallModalVisible(true);
  };

  const handleCallConfirm = async () => {
    try {
      // Close modal
      setIsCallModalVisible(false);
      
      // Initiate call using the provided phone number
      const phoneNumber = '+233203430787';
      const phoneUrl = `tel:${phoneNumber}`;
      
      // Check if the device can open the URL
      const supported = await Linking.canOpenURL(phoneUrl);
      
      if (supported) {
        await Linking.openURL(phoneUrl);
      } else {
        console.error("Device doesn't support phone calls");
        // Optionally show an alert to the user
        Alert.alert("Error", "Your device doesn't support phone calls");
      }
    } catch (error) {
      console.error('Error making call:', error);
    }
  };

  const handleCallCancel = () => {
    setIsCallModalVisible(false);
  };

  const handleSend = () => {
    if (message.trim() === '') return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
          <TouchableOpacity 
            style={styles.doctorInfo}
            onPress={() => router.push({
              pathname: '/(screens)/doctor-profile',
              params: { doctorId: doctor.id }
            })}
          >
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
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={handleCallPress}
            >
              <MaterialIcons name="phone" size={24} color="#EF4444" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => router.push('/(tabs)/settings')}
            >
              <MaterialIcons name="more-vert" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Call Confirmation Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={isCallModalVisible}
            onRequestClose={() => setIsCallModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Call Doctor</Text>
                <Text style={styles.modalText}>
                  Are you sure you want to call {doctor.name}?
                </Text>
                <View style={styles.modalButtons}>
                  <Pressable 
                    style={[styles.modalButton, styles.cancelButton]} 
                    onPress={handleCallCancel}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </Pressable>
                  <Pressable 
                    style={[styles.modalButton, styles.confirmButton]} 
                    onPress={handleCallConfirm}
                  >
                    <Text style={styles.confirmButtonText}>Call</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
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

const getStyles = (darkMode: boolean, themeColors: any) => {
  const backgroundColor = themeColors.background;
  const textColor = themeColors.text;
  const borderColor = darkMode ? '#333' : '#f0f0f0';
  const cardBackground = darkMode ? '#1E1E1E' : '#fff';
  const secondaryText = themeColors.tabIconDefault;
  const inputBackground = darkMode ? '#2D2D2D' : '#f5f5f5';
  const messageBackground = darkMode ? '#2D2D2D' : '#f0f0f0';
  const userMessageBackground = darkMode ? '#EF4444' : '#EF4444';
  const userMessageText = '#fff';
  const timeText = darkMode ? '#aaa' : '#666';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
    header: {
      backgroundColor: cardBackground,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
      paddingBottom: 12,
      shadowColor: darkMode ? '#000' : '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: darkMode ? 0.3 : 0.05,
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
      borderColor: borderColor,
    },
    doctorDetails: {
      flex: 1,
    },
    doctorName: {
      fontSize: 17,
      fontWeight: '600',
      color: textColor,
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
      color: secondaryText,
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
    backgroundColor: cardBackground,
    borderTopWidth: 1,
    borderTopColor: borderColor,
    alignItems: 'center',
  },
  messageInput: {
    flex: 1,
    backgroundColor: inputBackground,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 120,
    color: textColor,
  },
  input: {
    flex: 1,
    color: textColor,
  },
  audioMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  audioWaveform: {
    flex: 1,
    height: 30,
    marginHorizontal: 8,
  },
  audioBar: {
    height: 2,
    backgroundColor: secondaryText,
    marginVertical: 2,
  },
  userAudioBar: {
    backgroundColor: '#fff',
  },
  doctorAudioBar: {
    backgroundColor: secondaryText,
  },
  audioDuration: {
    fontSize: 12,
    color: secondaryText,
  },
  userAudioDuration: {
    color: 'rgba(255,255,255,0.7)',
  },
  doctorAudioDuration: {
    color: secondaryText,
  },
  recordingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: darkMode ? '#3A1E1E' : '#FFEBEE',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  recordButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EF4444',
  },
  stopButton: {
    backgroundColor: '#EF4444',
  },
  recordingTime: {
    marginLeft: 8,
    color: '#EF4444',
    fontWeight: '600',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: cardBackground,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: textColor,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: secondaryText,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: darkMode ? '#333' : '#f0f0f0',
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: '#EF4444',
  },
  cancelButtonText: {
    color: darkMode ? '#fff' : '#333',
    fontWeight: '600',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
};
