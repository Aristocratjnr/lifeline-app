import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, Modal, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Interface for first aid tip items
interface FirstAidTip {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  description: string;
}

export default function MainScreen() {
  const router = useRouter();
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [showHubModal, setShowHubModal] = useState(false);

  // First aid tips data
  const firstAidTips: FirstAidTip[] = [
    {
      id: '1',
      title: 'CPR',
      icon: 'heart-circle-outline',
      color: '#FF6B6B',
      description: '30 chest compressions followed by 2 rescue breaths',
    },
    {
      id: '2',
      title: 'Choking',
      icon: 'person-remove-outline',
      color: '#4ECDC4',
      description: '5 back blows between shoulder blades, then 5 abdominal thrusts',
    },
    {
      id: '3',
      title: 'Bleeding',
      icon: 'water-outline',
      color: '#FF9F43',
      description: 'Apply direct pressure with a clean cloth or bandage',
    },
    {
      id: '4',
      title: 'Burns',
      icon: 'flame-outline',
      color: '#FF9F43',
      description: 'Cool with running water for 10-15 minutes',
    },
    {
      id: '5',
      title: 'Fractures',
      icon: 'body-outline',
      color: '#5F27CD',
      description: 'Immobilize the injured area and seek medical help',
    },
    {
      id: '6',
      title: 'Poisoning',
      icon: 'flask-outline',
      color: '#1DD1A1',
      description: 'Call poison control immediately',
    },
  ];

  // Load JetBrains Mono font
  const [fontsLoaded] = useFonts({
    'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('@/assets/fonts/JetBrainsMono-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <ImageBackground 
        source={require('@/assets/images/blur.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <SafeAreaView style={styles.container} edges={['right', 'left']}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Hello! Welcome</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity 
                style={styles.menuButton}
                onPress={() => router.push('/screens/guest')}
              >
                <MaterialIcons name="person" size={24} color="#E53935" />
              </TouchableOpacity>
              <View style={styles.verticalLine} />
              <TouchableOpacity style={styles.menuButton}>
                <MaterialIcons name="more-vert" size={24} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Main Emergency Card */}
          <TouchableOpacity 
            style={styles.emergencyCard}
            onPress={() => router.push('/sos')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#FFE5E5', '#FFCECE', '#FFB5B5']}
              style={styles.emergencyGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.emergencyContent}>
                <View style={styles.emergencyTextContainer}>
                  <Text style={styles.emergencyTitle}>
                    In an{'\n'}
                    <Text style={{fontWeight: '900'}}>Emergency</Text>,
                    {'\n'}We&apos;re your{'\n'}
                    <Text style={styles.emergencyHighlight}>Lifeline</Text>
                  </Text>
                  
                  <TouchableOpacity 
                    style={styles.getStartedButton}
                    onPress={() => router.push('/screens/firstAidGuide')}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.getStartedText}>Get Started!</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.emergencyVideoContainer}>
                  <Video
                    source={require('@/assets/videos/good.mp4')}
                    style={styles.emergencyVideo}
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    shouldPlay
                    isMuted
                  />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* First Aid Tips Card */}
          <TouchableOpacity 
            style={styles.tipsCard}
            onPress={() => setShowTipsModal(true)}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#FFE5E5', '#FFCECE']}
              style={styles.tipsGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.tipsContent}>
                <View style={styles.tipsTextContainer}>
                  <Text style={styles.tipsTitle}>Tap to get{'\n'}First Aid Tips</Text>
                </View>
                <Image
                  source={require('@/assets/images/aid.png')}
                  style={styles.tipsImage}
                  resizeMode="contain"
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* First Aid Tips Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={showTipsModal}
            onRequestClose={() => setShowTipsModal(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>First Aid Tips</Text>
                  <TouchableOpacity 
                    onPress={() => setShowTipsModal(false)}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>
                
                <ScrollView style={styles.tipsList}>
                  {firstAidTips.map((tip) => (
                    <View key={tip.id} style={styles.tipItem}>
                      <View style={[styles.tipIconContainer, { backgroundColor: `${tip.color}20` }]}>
                        <Ionicons name={tip.icon} size={28} color={tip.color} />
                      </View>
                      <View style={styles.tipTextContainer}>
                        <Text style={styles.tipTitle}>{tip.title}</Text>
                        <Text style={styles.tipDescription}>{tip.description}</Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Modal>

          {/* Quiz Card */}
          <TouchableOpacity 
            style={styles.quizCard}
            onPress={() => router.push('/screens/quiz')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#FFE5E5', '#FFCECE']}
              style={styles.quizGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.quizContent}>
                <View style={styles.quizIconContainer}>
                  <Image
                    source={require('@/assets/images/quiz.png')}
                    style={styles.quizImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.quizTextContainer}>
                  <Text style={styles.quizTitle}>Take a quiz to brainstorm</Text>
                  <Text style={styles.quizSubtitle}>on how well you can save a life</Text>
                  
                  <View style={styles.quizButtonContainer}>
                    <Text style={styles.quizButtonText}>Take Quiz Now/Coming Soon</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* First Aid Hub Card */}
          <TouchableOpacity 
            style={styles.hubCard}
            onPress={() => setShowHubModal(true)}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#FFE5E5', '#FFCECE']}
              style={styles.hubGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.hubContent}>
                <View style={styles.hubTextContainer}>
                  <Text style={styles.hubTitle}>First Aid Hub 🚑</Text>
                  <Text style={styles.hubSubtitle}>Comprehensive first aid resources</Text>
                </View>
                <View style={styles.hubIconContainer}>
                  <Image
                    source={require('@/assets/images/aid.png')}
                    style={styles.hubImage}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* First Aid Hub Coming Soon Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={showHubModal}
            onRequestClose={() => setShowHubModal(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.hubModalContent}>
                <TouchableOpacity 
                  style={styles.hubCloseButton}
                  onPress={() => setShowHubModal(false)}
                >
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
                
                <View style={styles.hubModalHeader}>
                  <Ionicons name="construct" size={40} color="#1976D2" />
                  <Text style={styles.hubModalTitle}>Coming Soon!</Text>
                  <Text style={styles.hubModalSubtitle}>We&apos;re working hard to bring you an amazing First Aid Hub experience</Text>
                </View>

                <View style={styles.hubModalBody}>
                  <View style={styles.featureItem}>
                    <View style={[styles.featureIcon, { backgroundColor: 'rgba(229, 57, 53, 0.1)' }]}>
                      <Ionicons name="book" size={24} color="#E53935" />
                    </View>
                    <Text style={styles.featureText}>Comprehensive first aid guides</Text>
                  </View>
                  
                  <View style={styles.featureItem}>
                    <View style={[styles.featureIcon, { backgroundColor: 'rgba(229, 57, 53, 0.1)' }]}>
                      <Ionicons name="videocam" size={24} color="#E53935" />
                    </View>
                    <Text style={styles.featureText}>Step-by-step video tutorials</Text>
                  </View>
                  
                  <View style={styles.featureItem}>
                    <View style={[styles.featureIcon, { backgroundColor: 'rgba(229, 57, 53, 0.1)' }]}>
                      <Ionicons name="search" size={24} color="#E53935" />
                    </View>
                    <Text style={styles.featureText}>Quick search for emergencies</Text>
                  </View>
                </View>

                <View style={styles.hubModalFooter}>
                  <Text style={styles.notifyText}>Get notified when we launch!</Text>
                  <View style={styles.notifyInputContainer}>
                    <TextInput
                      style={styles.notifyInput}
                      placeholder="Enter your email"
                      placeholderTextColor="#999"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    <TouchableOpacity style={styles.notifyButton}>
                      <Text style={styles.notifyButtonText}>Notify Me</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.89)',
    zIndex: 2,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,  // Increased from 40 to 60
    paddingBottom: 40,
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalLine: {
    width: 1,
    height: 24,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
  menuButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'JetBrainsMono-Bold',
  },

  // Emergency Card Styles
  emergencyCard: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  emergencyGradient: {
    padding: 20,
    minHeight: 180,
  },
  emergencyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  emergencyTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'JetBrainsMono-Bold',
    lineHeight: 26,
    marginBottom: 16,
  },
  emergencyHighlight: {
    color: '#E53935',
    fontSize: 22,
    fontFamily: 'JetBrainsMono-Bold',
  },
  getStartedButton: {
    backgroundColor: '#E53935',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'flex-start',
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
  },
  emergencyVideoContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 12,
  },
  emergencyVideo: {
    width: '100%',
    height: '100%',
  },

  // Tips Card Styles
  tipsCard: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  tipsGradient: {
    padding: 16,
    minHeight: 80,
  },
  tipsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tipsIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(229, 57, 53, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipsTextContainer: {
    flex: 1,
  },
  tipsTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 32,
    fontFamily: 'JetBrainsMono-Bold',
  },
  tipsImage: {
    width: 100,
    height: 100,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: Dimensions.get('window').height * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'JetBrainsMono-Bold',
  },
  closeButton: {
    padding: 4,
  },
  tipsList: {
    marginBottom: 20,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tipIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  tipTextContainer: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'JetBrainsMono-Bold',
  },
  tipDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },

  // Quiz Card Styles
  quizCard: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  quizGradient: {
    padding: 16,
    minHeight: 120,
  },
  quizContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  quizIconContainer: {
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: 'rgba(229, 57, 53, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,  // Increased from 14 to 20 for more spacing
    marginTop: 4,
  },
  quizImage: {
    width: 80,
    height: 80,
  },
  quizTextContainer: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'JetBrainsMono-Bold',
    marginBottom: 2,
  },
  quizSubtitle: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'JetBrainsMono-Regular',
    lineHeight: 18,
  },
  quizButtonContainer: {
    backgroundColor: '#E53935',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
  },

  // Hub Card Styles
  hubCard: {
    width: '100%',
    height: 140,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  hubGradient: {
    flex: 1,
    padding: 20,
  },
  hubContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hubTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  hubTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
    fontFamily: 'JetBrainsMono-Bold',
  },
  hubSubtitle: {
    fontSize: 14,
    color: '#546E7A',
    fontFamily: 'JetBrainsMono-Regular',
  },
  hubIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hubModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  hubModalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 500,
    maxHeight: '90%',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 16,
  },
  hubCloseButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
    padding: 4,
  },
  hubModalHeader: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  hubModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  hubModalSubtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
  },
  hubModalBody: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    flex: 1,
    fontSize: 15,
    color: '#263238',
    fontFamily: 'JetBrainsMono-Regular',
  },
  hubModalFooter: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  notifyText: {
    fontSize: 16,
    color: '#37474F',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'JetBrainsMono-Bold',
  },
  notifyInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    overflow: 'hidden',
  },
  notifyInput: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#FFF',
    minWidth: 0, 
  },
  notifyButton: {
    backgroundColor: '#E53935',
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifyButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Bold',
  },
  hubImage: {
    width: '150%',
    height: '150%',
  },
});