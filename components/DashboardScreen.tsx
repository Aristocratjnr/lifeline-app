"use client"

import { useDisplayPreferences } from "@/context/DisplayPreferencesContext"
import { fetchWeatherData, WeatherData } from "@/services/weatherService"
import { AntDesign, Feather, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Alert, Animated, Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import { SafeAreaView } from "react-native-safe-area-context"

const DashboardScreen = () => {
  const { width: windowWidth } = useWindowDimensions();
  const circleSize = Math.min(80, windowWidth / 4);
  const { t } = useTranslation()
  const { darkMode } = useDisplayPreferences()
  const router = useRouter()

  // Handle emergency calls
  const handleEmergencyCall = useCallback((phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to make a call. Please try again later.');
      }
    }).catch(err => {
      console.error('Error making call:', err);
      Alert.alert('Error', 'Unable to make a call. Please try again later.');
    });
  }, []);

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
      steps: 1700,
      lastCheckup: "25/06/25",
      waterIntake: 4, 
      heartRate: 72,
      bloodPressure: "120/80",
      weight: "65 kg",
      temperature: "36.5°C",
    }),
    [],
  )

  // Weather data (real-time)
  const [weatherData, setWeatherData] = useState<WeatherData>({
    location: "Loading...",
    temperature: 0,
    condition: "Loading",
    humidity: 0,
    windSpeed: 0,
    icon: "partly-sunny",
    description: "Loading weather data..."
  });
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Emergency Contacts
  const emergencyContacts = useMemo(() => [
    {
      id: 1,
      name: "Emergency Services",
      number: "911",
      type: "emergency",
      icon: "emergency"
    },
    {
      id: 2,
      name: "Family Doctor",
      number: "+233 24 123 4567",
      type: "doctor",
      icon: "medical-services"
    },
    {
      id: 3,
      name: "Mom",
      number: "+233 24 987 6543",
      type: "family",
      icon: "phone"
    }
  ], [])

  // State for medication modal and data
  const [selectedMedication, setSelectedMedication] = useState<number | null>(null);
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Vitamin D",
      dosage: "1 tablet",
      time: "8:00 AM",
      taken: false,
      color: "#FF9800"
    },
    {
      id: 2,
      name: "Blood Pressure Med",
      dosage: "2 tablets",
      time: "2:00 PM",
      taken: false,
      color: "#4CAF50"
    },
    {
      id: 3,
      name: "Omega-3",
      dosage: "1 capsule",
      time: "8:00 PM",
      taken: false,
      color: "#2196F3"
    }
  ]);

  // Appointments
  const upcomingAppointments = useMemo(() => [
    {
      id: 1,
      doctor: "Dr. Smith",
      specialty: "Cardiologist",
      date: "Aug 20, 2025",
      time: "10:30 AM",
      type: "Check-up"
    },
    {
      id: 2,
      doctor: "Dr. Johnson",
      specialty: "Dentist",
      date: "Aug 25, 2025",
      time: "3:00 PM",
      type: "Cleaning"
    }
  ], [])


  // Handle medication toggle
  const toggleMedication = useCallback((medicationId: number) => {
    setSelectedMedication(medicationId);
  }, []);

  // Handle medication confirmation
  const handleMedicationConfirmation = useCallback((confirm: boolean) => {
    if (selectedMedication === null) return;
    
    if (confirm) {
      setMedications(prevMedications =>
        prevMedications.map(med =>
          med.id === selectedMedication ? { ...med, taken: !med.taken } : med
        )
      );
    }
    
    setSelectedMedication(null);
  }, [selectedMedication]);

  // Handle emergency contact call
  const callEmergencyContact = useCallback((phoneNumber: string, name: string) => {
    Alert.alert(
      "Call Emergency Contact",
      `Do you want to call ${name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call", onPress: () => Linking.openURL(`tel:${phoneNumber}`) }
      ]
    )
  }, [])

  const animatedSteps = useRef(new Animated.Value(0)).current
  const animatedWater = useRef(new Animated.Value(0)).current
  const [displayedSteps, setDisplayedSteps] = useState(0)
  const [displayedWater, setDisplayedWater] = useState(0)

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

  // Fetch weather data
  useEffect(() => {
    const loadWeatherData = async () => {
      setWeatherLoading(true);
      try {
        const data = await fetchWeatherData();
        setWeatherData(data);
      } catch (error) {
        console.error('Failed to load weather data:', error);
        // Keep the default loading state data
      } finally {
        setWeatherLoading(false);
      }
    };

    loadWeatherData();
  }, []);

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
  
  // Get the selected medication data
  const selectedMedicationData = selectedMedication 
    ? medications.find(med => med.id === selectedMedication) 
    : null;

  // Refresh weather data
  const refreshWeatherData = useCallback(async () => {
    setWeatherLoading(true);
    try {
      const data = await fetchWeatherData();
      setWeatherData(data);
    } catch (error) {
      console.error('Failed to refresh weather data:', error);
      Alert.alert('Weather Update', 'Unable to refresh weather data. Please try again later.');
    } finally {
      setWeatherLoading(false);
    }
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeStyles.container.backgroundColor }]}>
      <ScrollView contentContainerStyle={[styles.container, themeStyles.container]}>
        {/* Medication Confirmation Modal */}
        <Modal
          visible={selectedMedication !== null}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setSelectedMedication(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, themeStyles.modalContent]}>
              <Text style={[styles.modalTitle, themeStyles.modalTitle]}>
                {selectedMedicationData?.taken ? 'Mark as Not Taken?' : 'Medication Reminder'}
              </Text>
              <Text style={[styles.modalText, themeStyles.modalText]}>
                {selectedMedicationData?.taken 
                  ? `Mark ${selectedMedicationData.name} as not taken?`
                  : `Did you take your ${selectedMedicationData?.name}?`}
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => handleMedicationConfirmation(false)}
                >
                  <Text style={[styles.cancelButtonText, themeStyles.cancelButtonText]}>
                    {selectedMedicationData?.taken ? 'Cancel' : 'Not Yet'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={() => handleMedicationConfirmation(true)}
                >
                  <Text style={styles.confirmButtonText}>
                    {selectedMedicationData?.taken ? 'Mark Not Taken' : 'Taken'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <LinearGradient
          colors={darkMode ? ["#1E1E1E", "#1A1A1A", "#121212"] : ["#FFFFFF", "#FAFAFA", "#F0F0F0"]}
          style={styles.gradient}>
          
          {/* Profile Card */}
          <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
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
          
          {/* Weather Widget */}
          <View style={[styles.weatherWidget, themeStyles.profileCard, { marginBottom: 20 }]}>
            <View style={styles.weatherHeader}>
              <Text style={[styles.sectionTitle, { color: themeStyles.timelineTitle.color, marginBottom: 0 }]}>
                Weather
              </Text>
              <View style={styles.weatherHeaderActions}>
                <TouchableOpacity 
                  onPress={refreshWeatherData}
                  disabled={weatherLoading}
                  style={styles.weatherRefreshButton}
                  activeOpacity={0.7}
                >
                  <Feather 
                    name="refresh-cw" 
                    size={18} 
                    color={darkMode ? '#4CAF50' : '#2E7D32'}
                    style={weatherLoading ? styles.spinningIcon : undefined}
                  />
                </TouchableOpacity>
                {weatherLoading ? (
                  <Ionicons name="refresh" size={24} color="#FFA726" />
                ) : (
                  <Ionicons name={weatherData.icon as any} size={24} color="#FFA726" />
                )}
              </View>
            </View>
            <View style={styles.weatherContent}>
              <View style={styles.weatherMain}>
                <Text style={[styles.weatherTemp, themeStyles.profileName]}>
                  {weatherLoading ? '--' : `${weatherData.temperature}°C`}
                </Text>
                <Text style={[styles.weatherCondition, themeStyles.profileStatus]}>
                  {weatherData.condition}
                </Text>
                <Text style={[styles.weatherLocation, themeStyles.detailLabel]}>
                  {weatherData.location}
                </Text>
                {weatherData.description && weatherData.description !== weatherData.condition && (
                  <Text style={[styles.weatherDescription, themeStyles.detailLabel]}>
                    {weatherData.description}
                  </Text>
                )}
              </View>
              <View style={styles.weatherDetails}>
                <View style={styles.weatherDetailItem}>
                  <Feather name="droplet" size={16} color="#2196F3" />
                  <Text style={[styles.weatherDetailText, themeStyles.detailValue]}>
                    {weatherLoading ? '--' : `${weatherData.humidity}%`}
                  </Text>
                </View>
                <View style={styles.weatherDetailItem}>
                  <Feather name="wind" size={16} color="#4CAF50" />
                  <Text style={[styles.weatherDetailText, themeStyles.detailValue]}>
                    {weatherLoading ? '--' : `${weatherData.windSpeed} km/h`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* Enhanced Health Stats */}
          <View style={styles.healthStatsContainer}>
            <Text style={[styles.sectionTitle, { color: themeStyles.timelineTitle.color, marginBottom: 16 }]}>
              Health Metrics Summary
            </Text>
            
            {/* Primary Stats Row */}
            <View style={styles.statsRow}>
              {/* Steps */}
              <View style={styles.circularProgressContainer}>
                <AnimatedCircularProgress
                  size={circleSize}
                  width={6}
                  fill={(healthStats.steps / 10000) * 100}
                  tintColor="#4CAF50"
                  backgroundColor={darkMode ? '#333' : '#E0E0E0'}
                  rotation={0}
                  lineCap="round"
                >
                  {() => (
                    <View style={styles.circularProgressContent}>
                      <FontAwesome5 name="walking" size={24} color="#4CAF50" />
                      <Text style={[styles.statValue, themeStyles.statValue]}>{displayedSteps.toLocaleString()}</Text>
                    </View>
                  )}
                </AnimatedCircularProgress>
                <Text style={[styles.statLabel, themeStyles.statLabel, { marginTop: 8, textAlign: 'center' }]}>{t('dashboard.steps')}</Text>
              </View>
              
              {/* Water Intake */}
              <View style={styles.circularProgressContainer}>
                <AnimatedCircularProgress
                  size={circleSize}
                  width={6}
                  fill={(healthStats.waterIntake / 8) * 100}
                  tintColor="#2196F3"
                  backgroundColor={darkMode ? '#333' : '#E0E0E0'}
                  rotation={0}
                  lineCap="round"
                >
                  {() => (
                    <View style={styles.circularProgressContent}>
                      <FontAwesome5 name="tint" size={24} color="#2196F3" />
                      <Text style={[styles.statValue, themeStyles.statValue]}>{displayedWater}/8</Text>
                    </View>
                  )}
                </AnimatedCircularProgress>
                <Text style={[styles.statLabel, themeStyles.statLabel, { marginTop: 8, textAlign: 'center' }]}>{t('dashboard.water')}</Text>
              </View>
            </View>
          </View>
          
          {/* Medication Reminders & Appointments */}
          <View style={[styles.medicationSection, themeStyles.profileCard]}>
            <Text style={[styles.sectionTitle, { color: themeStyles.timelineTitle.color, marginBottom: 16 }]}>
              Medications & Appointments
            </Text>
            
            {/* Medication Reminders */}
            <View style={styles.medicationList}>
              <Text style={[styles.subsectionTitle, themeStyles.detailLabel]}>Today&apos;s Medications</Text>
              {medications.map((med) => (
                <TouchableOpacity
                  key={med.id}
                  style={[styles.medicationItem, themeStyles.timelineItem]}
                  onPress={() => toggleMedication(med.id)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.medicationIndicator, { backgroundColor: med.color }]} />
                  <View style={styles.medicationInfo}>
                    <Text style={[styles.medicationName, themeStyles.timelineTitle]}>
                      {med.name}
                    </Text>
                    <Text style={[styles.medicationDetails, themeStyles.timelineDate]}>
                      {med.dosage} • {med.time}
                    </Text>
                  </View>
                  <View style={[styles.medicationStatus, { backgroundColor: med.taken ? '#4CAF50' : '#FFC107' }]}>
                    <Feather 
                      name={med.taken ? "check" : "clock"} 
                      size={16} 
                      color="white" 
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Upcoming Appointments */}
            <View style={styles.appointmentsList}>
              <Text style={[styles.subsectionTitle, themeStyles.detailLabel]}>Upcoming Appointments</Text>
              {upcomingAppointments.map((appointment) => (
                <View key={appointment.id} style={[styles.appointmentItem, themeStyles.timelineItem]}>
                  <View style={styles.appointmentDate}>
                    <Text style={[styles.appointmentDay, themeStyles.timelineTitle]}>
                      {appointment.date.split(' ')[1]}
                    </Text>
                    <Text style={[styles.appointmentMonth, themeStyles.timelineDate]}>
                      {appointment.date.split(' ')[0]}
                    </Text>
                  </View>
                  <View style={styles.appointmentInfo}>
                    <Text style={[styles.appointmentDoctor, themeStyles.timelineTitle]}>
                      {appointment.doctor}
                    </Text>
                    <Text style={[styles.appointmentSpecialty, themeStyles.timelineDate]}>
                      {appointment.specialty} • {appointment.type}
                    </Text>
                    <Text style={[styles.appointmentTime, themeStyles.detailValue]}>
                      {appointment.time}
                    </Text>
                  </View>
                  <Feather name="calendar" size={16} color="#2196F3" />
                </View>
              ))}
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
            <Animated.View style={[styles.dailyTipContent, { opacity: fadeAnim }]}>
              <View style={styles.dailyTipIconContainer}>
                {React.createElement(
                  dailyTips[currentTipIndex]?.iconSet || MaterialIcons,
                  {
                    name: dailyTips[currentTipIndex]?.iconName || 'lightbulb-outline',
                    size: 24,
                    color: darkMode ? '#4CAF50' : '#2E7D32',
                  }
                )}
              </View>
              <View style={styles.dailyTipTextContainer}>
                <Text style={[styles.dailyTipTitleText, themeStyles.dailyTipTitle]}>
                  {dailyTips[currentTipIndex]?.title || dailyTip.title}
                </Text>
                <Text style={[styles.dailyTipDescription, themeStyles.dailyTipDescription]}>
                  {dailyTips[currentTipIndex]?.content || dailyTip.content}
                </Text>
              </View>
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
          
          {/* Footer */}
          <View style={[{
            padding: 20,
            paddingBottom: 40, 
            alignItems: 'center',
            marginTop: 90,
            borderTopWidth: 1,
          }, themeStyles.footer]}>
            <View style={styles.footerLinks}>
              <TouchableOpacity onPress={() => router.push('/screens/about')}>
                <Text style={[styles.footerLink, themeStyles.footerLink]}>{t('common.about')}</Text>
              </TouchableOpacity>
              <Text style={[styles.footerDivider, themeStyles.footerDivider]}>•</Text>
              <TouchableOpacity onPress={() => router.push('/screens/privacy-policy')}>
                <Text style={[styles.footerLink, themeStyles.footerLink]}>{t('common.privacyPolicy')}</Text>
              </TouchableOpacity>
              <Text style={[styles.footerDivider, themeStyles.footerDivider]}>•</Text>
              <TouchableOpacity onPress={() => router.push('/screens/terms-use')}>
                <Text style={[styles.footerLink, themeStyles.footerLink]}>{t('common.termsOfUse')}</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.footerText, themeStyles.footerText]}>
              {t('common.copyright')} {new Date().getFullYear()} {t('app.name')}. {t('common.allRightsReserved')}
            </Text>
            <Text style={[styles.footerVersion, themeStyles.footerVersion]}>
              {t('common.version')} 1.0.0
            </Text>
            <Text style={[styles.footerBuiltBy, themeStyles.footerBuiltBy]}>
              Built by{' '}
              <Text 
                style={styles.githubLink}
                onPress={() => Linking.openURL('https://github.com/yourusername')}
              >
                Daniella Asiedu
              </Text>
            </Text>
          </View>
        </LinearGradient>
      </ScrollView>
      
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
  dailyTipDescription: {
    color: isDark ? '#A0A0A0' : '#666666',
  },
  modalText: {
    color: isDark ? '#E0E0E0' : '#555555',
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
    fontSize: 20,
    fontWeight: 'bold' as const,
    marginBottom: 16,
    textAlign: 'center' as const,
    color: isDark ? '#FFFFFF' : '#000000',
    fontFamily: 'JetBrainsMono-Bold',
  },
  modalButton: {
    backgroundColor: isDark ? '#2D2D2D' : '#F5F5F5',
  },
  cancelButton: {
    backgroundColor: isDark ? '#2D2D2D' : '#F5F5F5',
  },
  confirmButton: {
    backgroundColor: isDark ? '#4CAF50' : '#4CAF50',
  },
  cancelButtonText: {
    color: isDark ? '#E0E0E0' : '#333333',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  footerLink: {
    color: isDark ? '#A0A0A0' : '#666666',
  },
  footerDivider: {
    color: isDark ? '#A0A0A0' : '#666666',
  },
  footerText: {
    color: isDark ? '#A0A0A0' : '#666666',
  },
  footerVersion: {
    color: isDark ? '#A0A0A0' : '#666666',
  },
  footerBuiltBy: {
    color: isDark ? '#A0A0A0' : '#666666',
  },
  footer: {
    backgroundColor: 'transparent',
    borderTopColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
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

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    marginBottom: 16,
    textAlign: 'center' as const,
    color: '#000000',
    fontFamily: 'JetBrainsMono-Bold',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center' as const,
    lineHeight: 24,
    fontFamily: 'JetBrainsMono-Regular',
  },
  modalButtons: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '600' as const,
  },
  cancelButtonText: {
    color: '#333333',
    fontWeight: '600' as const,
  },
  // Footer styles - using themeStyles.footer for theming
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  footerLink: {
    fontSize: 12,
    marginHorizontal: 8,
    paddingVertical: 4,
    fontFamily: 'JetBrainsMono-Regular',
  },
  footerDivider: {
    fontSize: 12,
    opacity: 0.5,
    marginHorizontal: 4,
    fontFamily: 'JetBrainsMono-Regular',
  },
  footerText: {
    fontSize: 11,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'JetBrainsMono-Regular',
  },
  footerVersion: {
    fontSize: 10,
    opacity: 0.5,
    fontFamily: 'JetBrainsMono-Regular',
    marginBottom: 4,
  },
  footerBuiltBy: {
    fontSize: 11,
    opacity: 0.7,
    fontFamily: 'JetBrainsMono-Regular',
    marginTop: 8,
  },
  githubLink: {
    color: '#E53935',
    textDecorationLine: 'underline',
  },
  healthStatsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    gap: 8,
  },
  circularProgressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  circularProgressContent: {
    alignItems: 'center',
    justifyContent: 'center',
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
  dailyTipContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
  },
  dailyTipTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  dailyTipTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  dailyTipDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  dailyTipIconContainer: {
    marginRight: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
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
  dailyTipText: {
    fontSize: 14,
    fontFamily: 'JetBrainsMono-Regular',
    lineHeight: 20,
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
  
  // Weather Widget Styles
  weatherWidget: {
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  weatherHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  weatherRefreshButton: {
    padding: 6,
    borderRadius: 20,
  },
  spinningIcon: {
    transform: [{ rotate: '45deg' }],
  },
  weatherContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherMain: {
    flex: 1,
  },
  weatherTemp: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
  },
  weatherCondition: {
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'JetBrainsMono-Regular',
  },
  weatherLocation: {
    fontSize: 12,
    marginTop: 2,
    fontFamily: 'JetBrainsMono-Regular',
  },
  weatherDescription: {
    fontSize: 11,
    marginTop: 2,
    fontFamily: 'JetBrainsMono-Regular',
    fontStyle: 'italic',
  },
  weatherDetails: {
    alignItems: 'flex-end',
  },
  weatherDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  weatherDetailText: {
    fontSize: 12,
    marginLeft: 6,
    fontFamily: 'JetBrainsMono-Regular',
  },
  
  // Enhanced Health Metrics Styles
  additionalMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  metricCard: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 10,
    marginLeft: 6,
    fontFamily: 'JetBrainsMono-Regular',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
  },
  
  // Emergency Contacts Styles
  emergencySection: {
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emergencySectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  emergencyContactsList: {
    gap: 8,
  },
  emergencyContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  emergencyContactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(229, 57, 53, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emergencyContactInfo: {
    flex: 1,
  },
  emergencyContactName: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Bold',
    marginBottom: 2,
  },
  emergencyContactNumber: {
    fontSize: 12,
    fontFamily: 'JetBrainsMono-Regular',
  },
  
  // Medication & Appointments Styles
  medicationSection: {
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginBottom: 12,
    fontFamily: 'JetBrainsMono-Bold',
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    fontFamily: 'JetBrainsMono-Bold',
  },
  medicationList: {
    marginBottom: 24,
  },
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  medicationIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Bold',
    marginBottom: 2,
  },
  medicationDetails: {
    fontSize: 12,
    fontFamily: 'JetBrainsMono-Regular',
  },
  medicationStatus: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointmentsList: {
    gap: 8,
  },
  appointmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  appointmentDate: {
    width: 60,
    alignItems: 'center',
    marginRight: 12,
  },
  appointmentDay: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
  },
  appointmentMonth: {
    fontSize: 12,
    fontFamily: 'JetBrainsMono-Regular',
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentDoctor: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Bold',
    marginBottom: 2,
  },
  appointmentSpecialty: {
    fontSize: 12,
    fontFamily: 'JetBrainsMono-Regular',
    marginBottom: 2,
  },
  appointmentTime: {
    fontSize: 12,
    fontWeight: '600' as const,
    fontFamily: 'JetBrainsMono-Bold',
  },
  
  // Daily Tip Text Style
  dailyTipTitleText: {
    fontSize: 15,
    fontWeight: '600' as const,
    marginBottom: 4,
    fontFamily: 'JetBrainsMono-Bold',
  },
});

export default DashboardScreen;
