"use client"

import { AntDesign, Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { ActivityIndicator, Alert, Animated, FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import { SafeAreaView } from "react-native-safe-area-context"

const DashboardScreen = () => {
  const { width: windowWidth } = useWindowDimensions();
  const circleSize = Math.min(80, windowWidth / 4);
  const { t } = useTranslation()

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

  ActivityRow.displayName = "ActivityRow"

  // Early return for fontsLoaded
  if (!fontsLoaded) {
    return <View style={styles.safeArea} />
  }

  const user = {
    name: "Daniella Asiedu",
    age: "18-25",
    gender: "Female",
    location: "Ghana",
    medicalCondition: "Common Cold",
    contact: "020343077",
    language: "English",
    avatar: require("@/assets/images/Daniella.jpeg"),
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
      
      <ScrollView contentContainerStyle={styles.container}>
        <LinearGradient
          colors={["#FFFFFF", "#FAFAFA", "#F0F0F0"]}
          style={styles.firstAidGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContainer}>
            <View style={styles.headerLeft}>
              <Text style={styles.statsTitle}>{t("dashboard.healthStats")}</Text>
              <View style={styles.headerIcons}>
               
                <TouchableOpacity onPress={() => router.replace("/main")} style={styles.iconButton}>
                  <MaterialIcons name="logout" size={24} color="#D9534F" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.statsRow}>
            {/* Steps Stat */}
            <View style={styles.statsItem}>
              <AnimatedCircularProgress
                size={circleSize}
                width={10}
                fill={Math.min((displayedSteps / 10000) * 100, 100)}
                tintColor="#FC7A7A"
                backgroundColor="#F3F4F6"
                rotation={0}
                lineCap="round"
                style={{ marginBottom: 6 }}
              >
                {() => <FontAwesome5 name="walking" size={32} color="#FC7A7A" />}
              </AnimatedCircularProgress>
              <Text style={[styles.statsValue, { fontSize: 22, marginTop: 8 }]}>{displayedSteps}</Text>
              <Text style={styles.statsLabel}>{t("dashboard.steps")}</Text>
            </View>

            {/* Water Stat */}
            <View style={styles.statsItem}>
              <AnimatedCircularProgress
                size={circleSize}
                width={10}
                fill={Math.min((displayedWater / 8) * 100, 100)}
                tintColor="#60A5FA"
                backgroundColor="#F3F4F6"
                rotation={0}
                lineCap="round"
                style={{ marginBottom: 6 }}
              >
                {() => <FontAwesome5 name="tint" size={32} color="#60A5FA" />}
              </AnimatedCircularProgress>
              <Text style={[styles.statsValue, { fontSize: 22, marginTop: 8 }]}>{displayedWater}/8</Text>
              <Text style={styles.statsLabel}>{t("dashboard.water")}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* First Aid Guide Card */}
        <TouchableOpacity
          style={styles.firstAidCard}
          onPress={() => router.push("/screens/firstAidGuide")}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#FF6B6B", "#FF8E8E", "#FFB5B5"]}
            style={styles.firstAidGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.firstAidContent}>
              <View style={styles.firstAidIconContainer}>
                <View style={styles.firstAidIconGlow}>
                  <MaterialIcons name="medical-services" size={32} color="#FFFFFF" />
                </View>
              </View>
              <View style={styles.firstAidTextContainer}>
                <Text style={styles.firstAidTitle}>First Aid Guides</Text>
                <Text style={styles.firstAidSubtitle}>Emergency help at your fingertips</Text>
                <View style={styles.firstAidBadge}>
                  <Text style={styles.firstAidBadgeText}>15+ Guides</Text>
                </View>
              </View>
              <View style={styles.firstAidArrow}>
                <AntDesign name="right" size={20} color="#FFFFFF" />
              </View>
            </View>

            {/* Decorative elements */}
            <View style={styles.firstAidDecorative1} />
            <View style={styles.firstAidDecorative2} />
            <View style={styles.firstAidDecorative3} />
          </LinearGradient>
        </TouchableOpacity>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileAvatarGlow}>
            <Image source={user.avatar} style={styles.profileAvatar} contentFit="cover" transition={300} />
          </View>
          <Text style={styles.profileName}>{user.name}</Text>
          <View style={styles.profileInfoRow}>
            <Feather name="calendar" size={20} color="#222" style={styles.profileIcon} />
            <Text style={styles.profileInfoLabel}>{t("dashboard.age")}:</Text>
            <Text style={styles.profileInfoValue}>{user.age}</Text>
            <Feather name="user" size={20} color="#222" style={[styles.profileIcon, { marginLeft: 18 }]} />
            <Text style={styles.profileInfoLabel}>{t("dashboard.gender")}:</Text>
            <Text style={styles.profileInfoValue}>{user.gender}</Text>
          </View>
          <View style={styles.profileInfoRow}>
            <Feather name="map-pin" size={20} color="#222" style={styles.profileIcon} />
            <Text style={styles.profileInfoLabel}>{t("dashboard.location")}:</Text>
            <Text style={styles.profileInfoValue}>{user.location}</Text>
          </View>
          <View style={styles.profileInfoRow}>
            <MaterialIcons name="healing" size={20} color="#222" style={styles.profileIcon} />
            <Text style={styles.profileInfoLabel}>{t("dashboard.condition")}:</Text>
            <Text style={styles.profileInfoValue}>{user.medicalCondition}</Text>
          </View>
          <View style={styles.profileInfoRowNoWrap}>
            <Feather name="phone" size={20} color="#222" style={styles.profileIcon} />
            <Text style={styles.profileInfoValue}>{user.contact}</Text>
            <FontAwesome5 name="language" size={20} color="#222" style={[styles.profileIcon, { marginLeft: 18 }]} />
            <Text style={styles.profileInfoLabel}>{t("dashboard.language")}:</Text>
            <Text style={styles.profileInfoValue}>{user.language}</Text>
          </View>
          <TouchableOpacity style={styles.editProfileButton} onPress={() => router.push("/screens/profile-settings")}>
            <Text style={styles.editProfileButtonText}>{t("dashboard.editProfile")}</Text>
          </TouchableOpacity>
        </View>

        {/* Lifeline History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t("dashboard.lifelineHistory")}</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <AntDesign name="eyeo" size={16} color="#D9534F" />
            </TouchableOpacity>
          </View>
          <View style={styles.timelineContainer}>
            <FlatList
              data={timeline}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TimelineItem item={item} />}
              scrollEnabled={false}
            />
          </View>
        </View>

        {/* Daily Tip */}
        <View style={styles.dailyTipCard}>
          <View style={styles.sectionHeader}>
            <AntDesign name="info" size={16} color="#ccc" />
            <Text style={styles.sectionTitle}>{t("dashboard.dailyTip")}</Text>
          </View>
          <View style={styles.tipContent}>
            {/* Dynamic icon for the tip */}
            {dailyTip.iconSet && dailyTip.iconName && (
              <dailyTip.iconSet name={dailyTip.iconName} size={24} color="#D9534F" style={{ marginBottom: 4 }} />
            )}
            <Text style={styles.tipText}>{dailyTip.title}</Text>
            <Text style={styles.tipSubText}>{dailyTip.content}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <TouchableOpacity style={styles.newTipButton} onPress={handleNewTip}>
              <Feather name="refresh-cw" size={16} color="#D9534F" style={{ marginRight: 6 }} />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="zap" size={14} color="#aaa" style={{ marginRight: 4 }} />
              <Text style={styles.tipFooter}>{t("dashboard.newTipEveryDay")}</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityCard}>
          <Text style={styles.activityTitle}>{t("dashboard.recentActivity")}</Text>
          <FlatList
            data={recentActivity}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ActivityRow item={item} />}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      {/* Medical Assistant Bot Modal */}
      <Modal
        visible={showBotModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowBotModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.botModalCard}>
            <TouchableOpacity 
              style={styles.modalCloseButton} 
              onPress={() => setShowBotModal(false)}
            >
              <AntDesign name="close" size={24} color="#666" />
            </TouchableOpacity>
            <View style={styles.botIconContainer}>
              <View style={styles.botIcon}>
                <MaterialIcons name="support-agent" size={48} color="#E53935" />
              </View>
              <View style={styles.botIconRing} />
            </View>
            <Text style={styles.botModalTitle}>{t('bot.title')}</Text>
            <Text style={styles.botModalText}>{t('bot.description')}</Text>
            
            {isConnectingDoctor ? (
              <View style={styles.connectingContainer}>
                <ActivityIndicator size="large" color="#E53935" />
                <Text style={styles.connectingText}>{t('bot.connecting')}</Text>
              </View>
            ) : (
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity 
                  style={styles.callDoctorButton} 
                  onPress={handleCallDoctor} 
                  activeOpacity={0.8}
                >
                  <MaterialIcons name="phone" size={20} color="#fff" style={{ marginRight: 8 }} />
                  <Text style={styles.callDoctorButtonText}>{t('bot.callDoctor')}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.callLogsButton} 
                  onPress={() => {
                    setShowBotModal(false);
                    router.push('/screens/call-logs');
                  }} 
                  activeOpacity={0.8}
                >
                  <MaterialIcons name="history" size={20} color="#E53935" style={{ marginRight: 8 }} />
                  <Text style={styles.callLogsButtonText}>{t('callLogs.title')}</Text>
                </TouchableOpacity>
              </View>
            )}
            
            <View style={styles.modalFooter}>
              <MaterialIcons name="info-outline" size={16} color="#666" style={{ marginRight: 6 }} />
              <Text style={styles.modalFooterText}>{t('bot.available247')}</Text>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Floating Action Button for Bot */}
      <TouchableOpacity 
        style={styles.floatingBot}
        onPress={() => setShowBotModal(true)}
        activeOpacity={0.8}
      >
        <Animated.View style={[styles.botButton, { transform: [{ scale: botPulseAnim }] }]}>
          <MaterialIcons name="support-agent" size={24} color="#fff" />
        </Animated.View>
      </TouchableOpacity>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  floatingBot: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    zIndex: 1000,
  },
  botButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  connectingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  connectingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#E53935',
    fontFamily: 'JetBrainsMono-Regular',
  },
  callDoctorButton: {
    flexDirection: 'row',
    backgroundColor: '#E53935',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 3,
  },
  callDoctorButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Bold',
    marginLeft: 8,
  },
  callLogsButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E53935',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callLogsButtonText: {
    color: '#E53935',
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Bold',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botModalCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '85%',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
  botIconContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  botIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(229, 57, 53, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  botIconRing: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(229, 57, 53, 0.2)',
    top: -10,
    left: -10,
    zIndex: 1,
  },
  botModalTitle: {
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  botModalText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  modalButtonsContainer: {
    width: '100%',
    marginBottom: 16,
  },
  modalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  modalFooterText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'JetBrainsMono-Regular',
  },
  headerContainer: {
    marginBottom: 24,
    width: '100%',
  },
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(217, 83, 79, 0.1)',
  },
  signOutButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(217, 83, 79, 0.1)',
  },
  container: {
    padding: 24,
    paddingBottom: 50,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  statsCard: {
    width: "100%",
    borderRadius: 22,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 16,
    letterSpacing: 0.5,
    fontFamily: "JetBrainsMono-Bold",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  statsItem: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 8,
    minHeight: 80,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginTop: 4,
    marginBottom: 4,
    fontFamily: "JetBrainsMono-Bold",
    textAlign: "center",
  },
  statsLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    letterSpacing: 0.2,
    fontFamily: "JetBrainsMono-Regular",
    textAlign: "center",
  },
  // First Aid Guide Card Styles
  firstAidCard: {
    width: "100%",
    marginBottom: 24,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#FF6B6B",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  firstAidGradient: {
    width: "100%",
    padding: 20,
    marginBottom: 20,
    position: "relative",
    overflow: "hidden",
  },
  firstAidContent: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
  },
  firstAidIconContainer: {
    marginRight: 16,
  },
  firstAidIconGlow: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  firstAidTextContainer: {
    flex: 1,
  },
  firstAidTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: "JetBrainsMono-Bold",
    marginBottom: 4,
  },
  firstAidSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    fontFamily: "JetBrainsMono-Regular",
    marginBottom: 8,
  },
  firstAidBadge: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  firstAidBadgeText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "JetBrainsMono-Bold",
  },
  firstAidArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  // Decorative elements
  firstAidDecorative1: {
    position: "absolute",
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.1)",
    zIndex: 1,
  },
  firstAidDecorative2: {
    position: "absolute",
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.05)",
    zIndex: 1,
  },
  firstAidDecorative3: {
    position: "absolute",
    top: 10,
    left: -10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    zIndex: 1,
  },
  profileCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },
  profileAvatarGlow: {
    width: 112, // slightly larger than avatar
    height: 112,
    borderRadius: 56,
    backgroundColor: "rgba(252,122,122,0.25)", // soft pink glow
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FC7A7A",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 18,
    elevation: 12, // for Android
    marginBottom: 16,
  },
  profileAvatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: "#FC7A7A",
    backgroundColor: "#F3F4F6",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
    fontFamily: "JetBrainsMono-Bold",
    textAlign: "center",
    marginBottom: 10,
  },
  profileInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    width: "100%",
    flexWrap: "wrap",
  },
  profileInfoRowNoWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    width: "100%",
    flexWrap: "nowrap",
  },
  profileIcon: {
    marginRight: 6,
  },
  profileInfoLabel: {
    fontSize: 15,
    color: "#111",
    fontFamily: "JetBrainsMono-Regular",
    marginRight: 4,
    textAlign: "center",
  },
  profileInfoValue: {
    fontSize: 15,
    color: "#111",
    fontFamily: "JetBrainsMono-Regular",
    marginRight: 8,
    flexShrink: 1,
    textAlign: "center",
  },
  editProfileButton: {
    marginTop: 14,
    backgroundColor: "#FFE5E5",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 32,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#D9534F",
  },
  editProfileButtonText: {
    color: "#D9534F",
    fontWeight: "bold",
    fontSize: 15,
    fontFamily: "JetBrainsMono-Bold",
    letterSpacing: 0.5,
  },
  section: {
    width: "100%",
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    fontFamily: "JetBrainsMono-Bold",
  },
  viewAllButton: {
    backgroundColor: "#FFE5E5",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 18,
  },
  viewAllButtonText: {
    color: "#D9534F",
    fontWeight: "bold",
    fontSize: 15,
    fontFamily: "JetBrainsMono-Bold",
  },
  timelineContainer: {
    backgroundColor: "rgba(255,255,255,0.75)",
    borderRadius: 14,
    padding: 18,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 6,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  timelineContent: {
    flex: 1,
    paddingRight: 8,
  },
  timelineTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1F2937",
    fontFamily: "JetBrainsMono-Bold",
    marginBottom: 2,
  },
  timelineDate: {
    fontSize: 14,
    color: "#666",
    fontFamily: "JetBrainsMono-Regular",
  },
  dailyTipCard: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.75)",
    borderRadius: 18,
    padding: 24,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 6,
  },
  tipContent: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    marginBottom: 12,
  },
  tipText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
    color: "#D9534F",
    fontFamily: "JetBrainsMono-Bold",
    lineHeight: 22,
  },
  tipSubText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontFamily: "JetBrainsMono-Regular",
    lineHeight: 20,
  },
  newTipButton: {
    backgroundColor: "#FFE5E5",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 18,
    alignSelf: "flex-start",
  },
  newTipButtonText: {
    color: "#D9534F",
    fontWeight: "bold",
    fontSize: 15,
    fontFamily: "JetBrainsMono-Bold",
  },
  tipFooter: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
    fontFamily: "JetBrainsMono-Regular",
  },
  activityCard: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.75)",
    borderRadius: 18,
    padding: 20,
    marginTop: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 6,
  },
  activityTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
    fontFamily: "JetBrainsMono-Bold",
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  activityLabel: {
    fontSize: 15,
    color: "#222",
    fontWeight: "500",
    fontFamily: "JetBrainsMono-Regular",
    flex: 1,
  },
  activityTime: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
    fontFamily: "JetBrainsMono-Regular",
  },
})

export default DashboardScreen
