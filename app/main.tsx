import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, ImageBackground, Modal, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Define the color scheme interface
interface ColorScheme {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  emergencyCard: string;
  emergencyText: string;
  tabActive: string;
  tabInactive: string;
  modalBackground: string;
  modalContent: string;
}

// Define props for TabBar component
interface TabBarProps {
  isDarkMode: boolean;
  colors: ColorScheme;
  router: any; // You might want to properly type this with your router type
}

// Interface for first aid tip items
interface FirstAidTip {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  description: string;
  preventionTips: {
    title: string;
    content: string;
    icon: keyof typeof Ionicons.glyphMap;
  }[];
}

export default function MainScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [selectedTip, setSelectedTip] = useState<FirstAidTip | null>(null);
  
  // Colors based on theme
  const colors: ColorScheme = {
    background: isDarkMode ? '#121212' : '#F8F9FA',
    card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#333333',
    textSecondary: isDarkMode ? '#B0B0B0' : '#666666',
    border: isDarkMode ? '#333333' : '#E0E0E0',
    emergencyCard: isDarkMode ? '#2A1A1A' : '#FFE5E5',
    emergencyText: isDarkMode ? '#FF9E9E' : '#E53935',
    tabActive: isDarkMode ? '#FF6B6B' : '#E53935',
    tabInactive: isDarkMode ? '#666666' : '#666666',
    modalBackground: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
    modalContent: isDarkMode ? '#1E1E1E' : '#FFFFFF',
  };

  // First aid tips data with detailed tips for each category
  const firstAidTips: FirstAidTip[] = [
    {
      id: '1',
      title: 'CPR',
      icon: 'heart-circle-outline',
      color: '#FF6B6B',
      description: '30 chest compressions followed by 2 rescue breaths',
      preventionTips: [
        {
          title: "Learn CPR",
          content: "Take a certified CPR course to be prepared for emergencies and practice regularly to maintain skills.",
          icon: "school-outline"
        },
        {
          title: "Keep Emergency Numbers Handy",
          content: "Program emergency numbers in your phone and keep them easily accessible for quick dialing.",
          icon: "call-outline"
        },
        {
          title: "Know Risk Factors",
          content: "Be aware of heart disease risk factors and encourage regular health checkups for family members.",
          icon: "heart-outline"
        }
      ]
    },
    {
      id: '2',
      title: 'Choking',
      icon: 'person-remove-outline',
      color: '#4ECDC4',
      description: '5 back blows between shoulder blades, then 5 abdominal thrusts',
      preventionTips: [
        {
          title: "Cut Food Properly",
          content: "Cut food into small pieces, especially for children and elderly. Avoid hard candies for small children.",
          icon: "restaurant-outline"
        },
        {
          title: "Eat Slowly",
          content: "Chew food thoroughly and eat slowly. Avoid talking or laughing while chewing large bites.",
          icon: "time-outline"
        },
        {
          title: "Supervise Children",
          content: "Watch young children while eating and keep small objects that could cause choking out of reach.",
          icon: "eye-outline"
        }
      ]
    },
    {
      id: '3',
      title: 'Bleeding',
      icon: 'water-outline',
      color: '#FF9F43',
      description: 'Apply direct pressure with a clean cloth or bandage',
      preventionTips: [
        {
          title: "Keep First Aid Kit Stocked",
          content: "Maintain a well-stocked first aid kit with sterile gauze, bandages, and antiseptic supplies.",
          icon: "medical-outline"
        },
        {
          title: "Handle Sharp Objects Safely",
          content: "Use proper technique when handling knives, glass, or sharp tools. Keep them clean and stored safely.",
          icon: "warning-outline"
        },
        {
          title: "Wear Protective Gear",
          content: "Use appropriate safety equipment when doing activities that could cause cuts or injuries.",
          icon: "shield-outline"
        }
      ]
    },
    {
      id: '4',
      title: 'Burns',
      icon: 'flame-outline',
      color: '#FF9F43',
      description: 'Cool with running water for 10-15 minutes',
      preventionTips: [
        {
          title: "Kitchen Safety",
          content: "Keep pot handles turned inward, use oven mitts, and be careful around hot surfaces and liquids.",
          icon: "flame-outline"
        },
        {
          title: "Check Water Temperature",
          content: "Test bath water temperature before use, especially for children and elderly. Set water heater below 120°F.",
          icon: "thermometer-outline"
        },
        {
          title: "Fire Safety",
          content: "Install smoke detectors, have fire extinguishers accessible, and create family fire escape plans.",
          icon: "alarm-outline"
        }
      ]
    },
    {
      id: '5',
      title: 'Fractures',
      icon: 'body-outline',
      color: '#5F27CD',
      description: 'Immobilize the injured area and seek medical help',
      preventionTips: [
        {
          title: "Home Safety",
          content: "Remove tripping hazards, use non-slip mats, ensure good lighting, and install handrails on stairs.",
          icon: "home-outline"
        },
        {
          title: "Bone Health",
          content: "Maintain strong bones with calcium-rich diet, vitamin D, and regular weight-bearing exercise.",
          icon: "fitness-outline"
        },
        {
          title: "Fall Prevention",
          content: "Wear appropriate footwear, use assistive devices if needed, and be extra careful on wet surfaces.",
          icon: "walk-outline"
        }
      ]
    },
    {
      id: '6',
      title: 'Poisoning',
      icon: 'flask-outline',
      color: '#1DD1A1',
      description: 'Call poison control immediately',
      preventionTips: [
        {
          title: "Secure Household Chemicals",
          content: "Store cleaning products, medications, and chemicals in locked cabinets away from children.",
          icon: "lock-closed-outline"
        },
        {
          title: "Label Everything",
          content: "Keep all substances in original containers with labels. Never store chemicals in food containers.",
          icon: "pricetag-outline"
        },
        {
          title: "Install Safety Latches",
          content: "Use child-proof latches on cabinets containing potentially dangerous substances.",
          icon: "shield-checkmark-outline"
        }
      ]
    }
  ];

  // Load JetBrains Mono font
  const [fontsLoaded] = useFonts({
    'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('@/assets/fonts/JetBrainsMono-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer} />;
  }

  // Tab bar component
  const TabBar = ({ isDarkMode, colors, router }: TabBarProps) => (
    <View style={[styles.tabBar, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
      <TouchableOpacity 
        style={styles.tabItem}
        onPress={() => router.push('/')}
      >
        <MaterialIcons name="home" size={24} color={colors.tabActive} />
        <Text style={[styles.tabText, { color: colors.tabActive }]}>{t('tabs.home')}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabItem}
        onPress={() => router.push('/ExploreScreen')}
      >
        <MaterialIcons name="place" size={24} color={colors.tabInactive} />
        <Text style={[styles.tabText, { color: colors.textSecondary }]}>{t('tabs.maps')}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabItem}
        onPress={() => router.push('/NewsScreen')}
      >
        <MaterialIcons name="newspaper" size={24} color={colors.tabInactive} />
        <Text style={[styles.tabText, { color: colors.textSecondary }]}>{t('tabs.news')}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabItem}
        onPress={() => router.push('/screens/guest-settings')}
      >
        <MaterialIcons name="settings" size={24} color={colors.tabInactive} />
        <Text style={[styles.tabText, { color: colors.textSecondary }]}>{t('tabs.settings')}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      
      <ImageBackground 
        source={isDarkMode ? require('@/assets/images/blur.png') : require('@/assets/images/blur.png')}
        style={[styles.backgroundImage, { backgroundColor: colors.background }]}
        resizeMode="cover"
      >
        <View style={[styles.overlay, { backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)' }]} />
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['right', 'left']}>
          <TabBar isDarkMode={isDarkMode} colors={colors} router={router} />
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.welcomeText, { color: colors.text }]}>{t('home.welcome')}</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity 
                style={styles.menuButton}
                onPress={() => router.push('/screens/guest')}
              >
                <MaterialIcons name="person" size={24} color={colors.emergencyText} />
              </TouchableOpacity>
              <View style={[styles.verticalLine, { backgroundColor: colors.border }]} />
              <TouchableOpacity 
                style={styles.menuButton}
                onPress={() => router.push('/screens/guest-settings')}
              >
                <MaterialIcons name="more-vert" size={24} color={colors.textSecondary} />
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
              colors={isDarkMode ? ['#2A1A1A', '#3A2A2A', '#4A3A3A'] : ['#FFE5E5', '#FFCECE', '#FFB5B5']}
              style={styles.emergencyGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.emergencyContent}>
                <View style={styles.emergencyTextContainer}>
                  <Text style={[styles.emergencyTitle, { color: colors.emergencyText }]}>
                    {t('home.emergencyTitle1')}{'\n'}
                    <Text style={{fontWeight: '900'}}>{t('home.emergencyTitle2')}</Text>{'\n'}
                    {t('home.emergencyTitle3')}{'\n'}
                    <Text style={[styles.emergencyHighlight, { color: colors.emergencyText }]}>{t('home.emergencyTitle4')}</Text>
                  </Text>
                  
                  <TouchableOpacity 
                    style={styles.getStartedButton}
                    onPress={() => router.push('/screens/firstAidGuide')}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.getStartedText, { color: '#FFFFFF' }]}>{t('common.getStarted')}</Text>
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
                  <Text style={styles.tipsTitle}>{t('home.tapForTips')}</Text>
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
            onRequestClose={() => {
              setShowTipsModal(false);
              setSelectedTip(null);
            }}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {selectedTip ? selectedTip.title : 'First Aid Tips'}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => {
                      if (selectedTip) {
                        setSelectedTip(null);
                      } else {
                        setShowTipsModal(false);
                      }
                    }}
                    style={styles.closeButton}
                  >
                    <Ionicons 
                      name={selectedTip ? "arrow-back" : "close"} 
                      size={24} 
                      color="#666" 
                    />
                  </TouchableOpacity>
                </View>
                
                {!selectedTip ? (
                  // Show all categories
                  <ScrollView style={styles.tipsList}>
                    <Text style={styles.instructionText}>
                      {t('home.tapCategoryInstruction')}
                    </Text>
                    {firstAidTips.map((tip) => (
                      <TouchableOpacity 
                        key={tip.id} 
                        style={styles.tipItem}
                        onPress={() => setSelectedTip(tip)}
                        activeOpacity={0.7}
                      >
                        <View style={[styles.tipIconContainer, { backgroundColor: `${tip.color}20` }]}>
                          <Ionicons name={tip.icon} size={28} color={tip.color} />
                        </View>
                        <View style={styles.tipTextContainer}>
                          <Text style={styles.tipTitle}>{tip.title}</Text>
                          <Text style={styles.tipDescription}>{tip.description}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                ) : (
                  // Show detailed tips for selected category
                  <ScrollView style={styles.detailedTipsList}>
                    <View style={styles.selectedTipHeader}>
                      <View style={[styles.selectedTipIcon, { backgroundColor: `${selectedTip.color}20` }]}>
                        <Ionicons name={selectedTip.icon} size={32} color={selectedTip.color} />
                      </View>
                      <Text style={styles.selectedTipDescription}>
                        {selectedTip.description}
                      </Text>
                    </View>
                    
                    <Text style={styles.detailedTipsTitle}>{t('home.preventionTipsTitle')}</Text>
                    
                    {selectedTip.preventionTips.map((tip, index) => (
                      <View key={index} style={styles.detailedTipItem}>
                        <View style={styles.tipIconContainer}>
                          <Ionicons name={tip.icon} size={20} color={selectedTip.color} />
                        </View>
                        <View style={styles.tipContentContainer}>
                          <Text style={styles.preventionTipTitle}>{tip.title}</Text>
                          <Text style={styles.detailedTipText}>{tip.content}</Text>
                        </View>
                      </View>
                    ))}
                    
                    <View style={styles.emergencyNote}>
                      <Ionicons name="warning" size={20} color="#FF6B6B" />
                      <Text style={styles.emergencyNoteText}>
                        {t('home.emergencyNote')}
                      </Text>
                    </View>
                  </ScrollView>
                )}
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
              colors={isDarkMode ? ['#2A1A1A', '#3A2A2A'] : ['#FFE5E5', '#FFCECE']}
              style={[styles.quizGradient, { backgroundColor: colors.card }]}
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
                  <Text style={[styles.quizTitle, { color: colors.text }]}>{t('home.quizTitle')}</Text>
                  <Text style={[styles.quizSubtitle, { color: colors.textSecondary }]}>{t('home.quizSubtitle')}</Text>
                  
                  <View style={styles.quizButtonContainer}>
                    <Text style={styles.quizButtonText}>{t('home.takeQuiz')}</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* First Aid Hub Card */}
          <TouchableOpacity 
            style={styles.hubCard}
            onPress={() => router.push('/info-hub')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={isDarkMode ? ['#2A1A1A', '#3A2A2A'] : ['#FFE5E5', '#FFCECE']}
              style={[styles.hubGradient, { backgroundColor: colors.card }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.hubContent}>
                <View style={styles.hubTextContainer}>
                  <Text style={[styles.hubTitle, { color: colors.text }]}>{t('home.hubTitle')} 🚑</Text>
                  <Text style={[styles.hubSubtitle, { color: colors.textSecondary }]}>{t('home.hubSubtitle')}</Text>
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
    paddingBottom: Platform.OS === 'ios' ? 80 : 60, // Add padding for the tab bar
  },
  // Tab Bar Styles
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tabItem: {
    alignItems: 'center',
    padding: 8,
    flex: 1,
  },
  activeTab: {
    // Active tab styles
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
    fontFamily: 'JetBrainsMono-Regular',
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
  instructionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
    fontFamily: 'JetBrainsMono-Regular',
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
  
  // Detailed Tips Styles
  detailedTipsList: {
    marginBottom: 20,
  },
  selectedTipHeader: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  selectedTipIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedTipDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'JetBrainsMono-Regular',
  },
  detailedTipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    fontFamily: 'JetBrainsMono-Bold',
  },
  detailedTipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tipContentContainer: {
    flex: 1,
    marginLeft: 8,
  },
  preventionTipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'JetBrainsMono-Bold',
  },
  detailedTipText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    fontFamily: 'JetBrainsMono-Regular',
  },
  emergencyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  emergencyNoteText: {
    flex: 1,
    fontSize: 13,
    color: '#E65100',
    marginLeft: 8,
    fontWeight: '500',
    fontFamily: 'JetBrainsMono-Regular',
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
  hubImage: {
    width: '150%',
    height: '150%',
  },
});