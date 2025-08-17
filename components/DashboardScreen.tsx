"use client"

import { AntDesign, Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { ActivityIndicator, Alert, Animated, FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native"
import { useDisplayPreferences } from "@/context/DisplayPreferencesContext"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import { SafeAreaView } from "react-native-safe-area-context"

const DashboardScreen = () => {
  const { width: windowWidth } = useWindowDimensions();
  const circleSize = Math.min(80, windowWidth / 4);
  const { t } = useTranslation()
  const { darkMode } = useDisplayPreferences()

  // Load fonts (first hook)
  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Regular": require("@/assets/fonts/JetBrainsMono-Regular.ttf"),
    "JetBrainsMono-Bold": require("@/assets/fonts/JetBrainsMono-Bold.ttf"),
  })

  // All hooks must be called before any early return
  const dailyTips = useMemo(
    () => [
      {
        title: t("tips.handleSharpObjects"),
        content: t("tips.handleSharpObjectsContent"),
        iconSet: MaterialIcons,
        iconName: "content-cut",
      },
      {
        title: t("tips.stayHydrated"),
        content: t("tips.stayHydratedContent"),
        iconSet: FontAwesome5,
        iconName: "tint",
      },
      {
        title: t("tips.washHands"),
        content: t("tips.washHandsContent"),
        iconSet: FontAwesome5,
        iconName: "hands-wash",
      },
      {
        title: t("tips.takeBreaks"),
        content: t("tips.takeBreaksContent"),
        iconSet: Feather,
        iconName: "monitor",
      },
      {
        title: t("tips.getSleep"),
        content: t("tips.getSleepContent"),
        iconSet: Feather,
        iconName: "moon",
      },
    ],
    [t],
  )

  const [dailyTip, setDailyTip] = useState(dailyTips[0])

  const healthStats = useMemo(
    () => ({
      steps: 7421,
      lastCheckup: "25/06/25",
      waterIntake: 6, // out of 8 glasses
    }),
    [],
  )

  const animatedSteps = useRef(new Animated.Value(0)).current
  const animatedWater = useRef(new Animated.Value(0)).current
  const [displayedSteps, setDisplayedSteps] = useState(0)
  const [displayedWater, setDisplayedWater] = useState(0)

  // Bot state variables
  const [showBotModal, setShowBotModal] = useState(false)
  const [isConnectingDoctor, setIsConnectingDoctor] = useState(false)
  const botPulseAnim = useRef(new Animated.Value(1)).current

  const router = useRouter()

  // Bot functions
  const handleBotPress = () => {
    setShowBotModal(true)
  }

  const handleCallDoctor = () => {
    console.log('Call Doctor button pressed - initiating doctor connection')
    setIsConnectingDoctor(true)
    
    // Log the connection attempt
    const connectionStartTime = new Date().toISOString()
    console.log(`[${connectionStartTime}] Attempting to connect to doctor...`)
    
    // Simulate connecting to doctor
    setTimeout(() => {
      const connectionCompleteTime = new Date().toISOString()
      console.log(`[${connectionCompleteTime}] Successfully connected to doctor`)
      console.log('Doctor Details:', {
        name: 'Dr. Sarah Johnson',
        specialty: 'Emergency Medicine',
        connectionTime: connectionStartTime,
        connectionDuration: '2s',
        status: 'Connected'
      })
      
      setIsConnectingDoctor(false)
      setShowBotModal(false)
      
      // Log the alert being shown to user
      console.log(`[${new Date().toISOString()}] Showing connection success alert to user`)
      
      Alert.alert(
        'Connected to Doctor',
        'Connected to Dr. Sarah Johnson\nSpecialty: Emergency Medicine\nEstimated wait time: 2 minutes',
        [
          {
            text: 'OK',
            onPress: () => console.log('User acknowledged doctor connection')
          }
        ]
      )
    }, 2000)
  }

  // Bot pulse animation
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(botPulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(botPulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    )
    pulseAnimation.start()
    return () => pulseAnimation.stop()
  }, [botPulseAnim])

  useEffect(() => {
    Animated.timing(animatedSteps, {
      toValue: healthStats.steps,
      duration: 800,
      useNativeDriver: false,
    }).start()

    Animated.timing(animatedWater, {
      toValue: healthStats.waterIntake,
      duration: 800,
      useNativeDriver: false,
    }).start()
  }, [healthStats.steps, healthStats.waterIntake, animatedSteps, animatedWater])

  useEffect(() => {
    const stepsListener = animatedSteps.addListener(({ value }) => setDisplayedSteps(Math.round(value)))
    const waterListener = animatedWater.addListener(({ value }) => setDisplayedWater(Math.round(value)))

    return () => {
      animatedSteps.removeListener(stepsListener)
      animatedWater.removeListener(waterListener)
    }
  }, [animatedSteps, animatedWater])

  const recentActivity = useMemo(
    () => [
      {
        id: 1,
        icon: "exclamation-circle",
        label: t("dashboard.sentSOSAlert"),
        time: t("dashboard.todayTime"),
        path: "/sos" as const,
      },
      {
        id: 2,
        icon: "map-marker-alt",
        label: t("dashboard.viewedMap"),
        time: t("dashboard.yesterdayTime1"),
        path: "/explore" as const,
      },
      {
        id: 3,
        icon: "newspaper",
        label: t("dashboard.readHealthNews"),
        time: t("dashboard.yesterdayTime2"),
        path: "/firstAidNews" as const,
      },
    ],
    [t],
  )

  const timeline = useMemo(
    () => [
      { id: "1", title: t("dashboard.fracture"), date: t("dashboard.lastVisited"), icon: "bone" },
      { id: "2", title: t("dashboard.cough"), date: t("dashboard.lastVisited"), icon: "lungs-virus" },
      { id: "3", title: t("dashboard.burns"), date: t("dashboard.lastVisited"), icon: "fire" },
    ],
    [t],
  )

  const handleNewTip = useCallback(() => {
    let newTip
    do {
      newTip = dailyTips[Math.floor(Math.random() * dailyTips.length)]
    } while (newTip.title === dailyTip.title && dailyTips.length > 1)
    setDailyTip(newTip)
  }, [dailyTips, dailyTip.title])

  const TimelineItem = React.memo(({ item }: { item: (typeof timeline)[0] }) => (
    <View style={styles.timelineItem}>
      <View style={styles.timelineIcon}>
        <FontAwesome5 name={item.icon as any} size={20} color="#D9534F" />
      </View>
      <View style={styles.timelineContent}>
        <Text style={styles.timelineTitle}>{item.title}</Text>
        <Text style={styles.timelineDate}>{item.date}</Text>
      </View>
      <AntDesign name="right" size={16} color="#ccc" />
    </View>
  ))

  TimelineItem.displayName = "TimelineItem"

  const ActivityRow = React.memo(({ item }: { item: (typeof recentActivity)[0] }) => (
    <TouchableOpacity style={styles.activityRow} onPress={() => router.push(item.path)} activeOpacity={0.7}>
      <FontAwesome5 name={item.icon as any} size={18} color="#FC7A7A" style={{ marginRight: 14 }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.activityLabel}>{item.label}</Text>
        <Text style={styles.activityTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  ))
  // User data
  const user = {
    name: "Daniella Asiedu",
    age: 50,
    gender: t('common.female'),
    location: "Accra, Ghana",
    medicalCondition: t('conditions.commonCold'),
    language: t('languages.english'),
    lastVisit: "02/05/2025",
    avatar: require("@/assets/images/Daniella.jpeg"),
  };

  // State for daily tips with animation
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isRefreshingTip, setIsRefreshingTip] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  // Get theme-based styles
  const themeStyles = getThemeStyles(darkMode);
  
  // Navigate to profile settings
  const handleEditProfile = () => {
    router.push('/settings');
  };
  
  // Handle refreshing daily tip with smooth animation
  const refreshDailyTip = useCallback(() => {
    if (isRefreshingTip) return;
    
    setIsRefreshingTip(true);
    
    // Fade out current tip
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      // Update to next tip
      const nextIndex = (currentTipIndex + 1) % dailyTips.length;
      setCurrentTipIndex(nextIndex);
      
      // Fade in new tip
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setIsRefreshingTip(false);
      });
    });
  }, [currentTipIndex, dailyTips.length, fadeAnim, isRefreshingTip]);
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeStyles.container.backgroundColor }]}>
      {/* Floating Bot Assistant */}
      <Animated.View 
        style={[
          styles.floatingBot,
          {
            transform: [{ scale: botPulseAnim }]
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.botButton}
          onPress={handleBotPress}
          activeOpacity={0.8}
        >
          <MaterialIcons name="support-agent" size={28} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
      
      <ScrollView contentContainerStyle={[styles.container, themeStyles.container]}>
        <LinearGradient
          colors={darkMode ? ["#1E1E1E", "#1A1A1A", "#121212"] : ["#FFFFFF", "#FAFAFA", "#F0F0F0"]}
          style={styles.gradient}>
          
          {/* Profile Card */}
          <View style={[styles.profileCard, themeStyles.profileCard]}>
            <View style={styles.profileHeader}>
              <Image 
                source={user.avatar} 
                style={styles.profileImage} 
                contentFit="cover"
              />
              <View style={styles.profileInfo}>
                <Text style={[styles.profileName, themeStyles.profileName]}>{user.name}</Text>
                <Text style={[styles.profileStatus, themeStyles.profileStatus]}>
                  {t('status.active')} • {user.lastVisit}
                </Text>
              </View>
              <TouchableOpacity 
                style={[styles.editButton, themeStyles.editButton]}
                onPress={handleEditProfile}
              >
                <Feather name="edit-2" size={16} color={darkMode ? '#E0E0E0' : '#555555'} />
              </TouchableOpacity>
            </View>
            <View style={styles.profileDetails}>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, themeStyles.detailLabel]}>{t('profile.age')}</Text>
                  <Text style={[styles.detailValue, themeStyles.detailValue]}>{user.age}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, themeStyles.detailLabel]}>{t('profile.gender')}</Text>
                  <Text style={[styles.detailValue, themeStyles.detailValue]}>{user.gender}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, themeStyles.detailLabel]}>{t('profile.language')}</Text>
                  <Text style={[styles.detailValue, themeStyles.detailValue]}>{user.language}</Text>
                </View>
              </View>
              <View style={[styles.conditionBadge, themeStyles.conditionBadge]}>
                <MaterialIcons name="medical-services" size={16} color="#D9534F" />
                <Text style={[styles.conditionText, themeStyles.conditionText]}>
                  {user.medicalCondition}
                </Text>
              </View>
            </View>
          </View>
          
          {/* Health Stats */}
          <View style={styles.healthStatsContainer}>
            <Text style={[styles.sectionTitle, { color: themeStyles.timelineTitle.color, marginBottom: 16 }]}>
              {t('dashboard.healthStats')}
            </Text>
            
            <View style={styles.statsRow}>
              {/* Steps */}
              <View style={[styles.statCard, themeStyles.statCard]}>
                <View style={styles.statIconContainer}>
                  <FontAwesome5 name="walking" size={24} color="#4CAF50" />
                </View>
                <View style={styles.statTextContainer}>
                  <Text style={[styles.statValue, themeStyles.statValue]}>{displayedSteps.toLocaleString()}</Text>
                  <Text style={[styles.statLabel, themeStyles.statLabel]}>{t('dashboard.steps')}</Text>
                </View>
              </View>
              
              {/* Water Intake */}
              <View style={[styles.statCard, themeStyles.statCard]}>
                <View style={styles.statIconContainer}>
                  <FontAwesome5 name="tint" size={24} color="#2196F3" />
                </View>
                <View style={styles.statTextContainer}>
                  <Text style={[styles.statValue, themeStyles.statValue]}>{displayedWater}/8</Text>
                  <Text style={[styles.statLabel, themeStyles.statLabel]}>{t('dashboard.water')}</Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* Daily Tip */}
          <View style={[styles.dailyTipContainer, themeStyles.dailyTipContainer]}>
            <View style={styles.dailyTipHeader}>
              <Text style={[styles.dailyTipTitle, themeStyles.dailyTipTitle]}>{t('dashboard.dailyTip')}</Text>
              <TouchableOpacity 
                onPress={refreshDailyTip} 
                disabled={isRefreshingTip}
                style={styles.refreshButton}
                activeOpacity={0.7}
              >
                <Animated.View 
                  style={{
                    transform: [{
                      rotate: isRefreshingTip ? '360deg' : '0deg'
                    }]
                  }}
                >
                  <Feather 
                    name="refresh-cw" 
                    size={18} 
                    color={darkMode ? '#4CAF50' : '#2E7D32'}
                  />
                </Animated.View>
              </TouchableOpacity>
            </View>
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text style={[styles.dailyTipText, themeStyles.dailyTipText]}>
                {dailyTips[currentTipIndex]?.title || dailyTip.title}
              </Text>
            </Animated.View>
          </View>
          
          {/* Timeline Items */}
          <Text style={[styles.sectionTitle, { color: themeStyles.timelineTitle.color, marginTop: 24, marginBottom: 12 }]}>
            {t('dashboard.lifelineHistory')}
          </Text>
          {timeline.map((item) => (
            <View key={item.id} style={[styles.timelineItem, themeStyles.timelineItem]}>
              <View style={styles.timelineIcon}>
                <FontAwesome5 name={item.icon as any} size={20} color="#D9534F" />
              </View>
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineTitle, themeStyles.timelineTitle]}>{item.title}</Text>
                <Text style={[styles.timelineDate, themeStyles.timelineDate]}>{item.date}</Text>
              </View>
              <AntDesign name="right" size={16} color={darkMode ? '#888' : '#ccc'} />
            </View>
          ))}
          
          {/* Recent Activity */}
          <View style={{ marginTop: 24, marginBottom: 16 }}>
            <Text style={[styles.sectionTitle, { color: themeStyles.timelineTitle.color }]}>
              {t('dashboard.recentActivity')}
            </Text>
            {recentActivity.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.activityRow, themeStyles.activityRow]}
                onPress={() => router.push(item.path)}
                activeOpacity={0.7}
              >
                <FontAwesome5 name={item.icon as any} size={18} color="#FC7A7A" style={{ marginRight: 14 }} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.activityLabel, themeStyles.activityLabel]}>{item.label}</Text>
                  <Text style={[styles.activityTime, themeStyles.activityTime]}>{item.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
        </LinearGradient>
      </ScrollView>
      
      {/* Bot Modal */}
      <Modal
        visible={showBotModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowBotModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, themeStyles.modalContent]}>
            <Text style={[styles.modalTitle, themeStyles.modalTitle]}>{t('dashboard.emergencyAssistance')}</Text>
            <Text style={[styles.modalText, themeStyles.modalText]}>
              {t('dashboard.emergencyAssistanceText')}
            </Text>
            <TouchableOpacity 
              style={styles.callButton}
              onPress={handleCallDoctor}
              disabled={isConnectingDoctor}
            >
              {isConnectingDoctor ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.callButtonText}>{t('dashboard.callDoctor')}</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowBotModal(false)}
              disabled={isConnectingDoctor}
            >
              <Text style={[styles.cancelButtonText, themeStyles.cancelButtonText]}>
                {t('common.cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const getThemeStyles = (isDark: boolean) => ({
  container: {
    backgroundColor: isDark ? '#121212' : '#F5F5F5',
  },
  profileCard: {
    backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
  },
  profileName: {
    color: isDark ? '#FFFFFF' : '#222222',
  },
  profileStatus: {
    color: isDark ? '#A0A0A0' : '#888888',
  },
  editButton: {
    borderColor: isDark ? '#444' : '#E0E0E0',
  },
  detailLabel: {
    color: isDark ? '#A0A0A0' : '#888888',
  },
  detailValue: {
    color: isDark ? '#E0E0E0' : '#333333',
  },
  conditionBadge: {
    backgroundColor: isDark ? 'rgba(217, 83, 79, 0.1)' : 'rgba(217, 83, 79, 0.05)',
  },
  conditionText: {
    color: isDark ? '#FF8A80' : '#D9534F',
  },
  statCard: {
    backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
  },
  statValue: {
    color: isDark ? '#E0E0E0' : '#222222',
  },
  statLabel: {
    color: isDark ? '#A0A0A0' : '#888888',
  },
  dailyTipContainer: {
    backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  },
  dailyTipTitle: {
    color: isDark ? '#4CAF50' : '#2E7D32',
  },
  dailyTipText: {
    color: isDark ? '#E0E0E0' : '#333333',
  },
  timelineItem: {
    backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
  },
  timelineTitle: {
    color: isDark ? '#E0E0E0' : '#222222',
  },
  timelineDate: {
    color: isDark ? '#A0A0A0' : '#888888',
  },
  activityRow: {
    borderBottomColor: isDark ? '#333333' : '#F3F4F6',
  },
  activityLabel: {
    color: isDark ? '#E0E0E0' : '#222222',
  },
  activityTime: {
    color: isDark ? '#A0A0A0' : '#888888',
  },
  modalContent: {
    backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
  },
  modalTitle: {
    color: isDark ? '#FFFFFF' : '#000000',
  },
  modalText: {
    color: isDark ? '#E0E0E0' : '#555555',
  },
  cancelButtonText: {
    color: isDark ? '#E0E0E0' : '#555555',
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  floatingBot: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 1000,
  },
  botButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(217, 83, 79, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'JetBrainsMono-Bold',
    marginBottom: 2,
  },
  timelineDate: {
    fontSize: 12,
    fontFamily: 'JetBrainsMono-Regular',
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    marginHorizontal: 16,
    paddingTop: 8,
  },
  activityLabel: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'JetBrainsMono-Regular',
    flex: 1,
  },
  activityTime: {
    fontSize: 13,
    marginTop: 2,
    fontFamily: 'JetBrainsMono-Regular',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 12,
    fontFamily: 'JetBrainsMono-Bold',
  },
  modalContent: {
    width: '85%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  healthStatsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statTextContainer: {
    flex: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'JetBrainsMono-Regular',
    opacity: 0.8,
  },
  dailyTipContainer: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  dailyTipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  refreshButton: {
    padding: 6,
    borderRadius: 20,
  },
  dailyTipTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dailyTipText: {
    fontSize: 14,
    fontFamily: 'JetBrainsMono-Regular',
    lineHeight: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'JetBrainsMono-Bold',
  },
  profileCard: {
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
    marginBottom: 2,
  },
  profileStatus: {
    fontSize: 12,
    fontFamily: 'JetBrainsMono-Regular',
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileDetails: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: 'JetBrainsMono-Regular',
    marginBottom: 2,
    opacity: 0.8,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'JetBrainsMono-Bold',
  },
  conditionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  conditionText: {
    fontSize: 13,
    fontFamily: 'JetBrainsMono-Bold',
    marginLeft: 6,
  },
  gradient: {
    flex: 1,
    paddingVertical: 16,
  },
  callButton: {
    backgroundColor: '#E53935',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Bold',
  },
  cancelButton: {
    padding: 10,
  },
  cancelButtonText: {
    fontSize: 15,
    fontFamily: 'JetBrainsMono-Regular',
  },
  modalText: {
    fontSize: 15,
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'JetBrainsMono-Regular',
  },
});

export default DashboardScreen;
