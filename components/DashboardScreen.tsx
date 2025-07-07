import { AntDesign, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { SafeAreaView } from 'react-native-safe-area-context';

const DashboardScreen = () => {
  // Load fonts (first hook)
  const [fontsLoaded] = useFonts({
    'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('@/assets/fonts/JetBrainsMono-Bold.ttf'),
  });

  // All hooks must be called before any early return
  const dailyTips = useMemo(() => [
    {
      title: 'Handle sharp objects with care:',
      content: "This seems obvious, but it's the most important rule. Pay close attention when using knives, scissors, razors, box cutters, and tools. Don't rush!",
      iconSet: MaterialIcons,
      iconName: 'content-cut',
    },
    {
      title: 'Stay hydrated:',
      content: 'Drink at least 8 glasses of water a day to keep your body functioning optimally.',
      iconSet: FontAwesome5,
      iconName: 'tint',
    },
    {
      title: 'Wash your hands regularly:',
      content: 'Frequent handwashing helps prevent the spread of germs and illnesses.',
      iconSet: FontAwesome5,
      iconName: 'hands-wash',
    },
    {
      title: 'Take breaks from screens:',
      content: 'Rest your eyes every 20 minutes to reduce eye strain and fatigue.',
      iconSet: Feather,
      iconName: 'monitor',
    },
    {
      title: 'Get enough sleep:',
      content: 'Aim for 7-9 hours of sleep each night to support your overall health.',
      iconSet: Feather,
      iconName: 'moon',
    },
  ], []);

  const [dailyTip, setDailyTip] = useState(dailyTips[0]);
  const healthStats = useMemo(() => ({
    steps: 7421,
    lastCheckup: '25/06/25',
    waterIntake: 6, // out of 8 glasses
  }), []);
  const animatedSteps = useRef(new Animated.Value(0)).current;
  const animatedWater = useRef(new Animated.Value(0)).current;
  const [displayedSteps, setDisplayedSteps] = useState(0);
  const [displayedWater, setDisplayedWater] = useState(0);
  const router = useRouter();
  useEffect(() => {
    Animated.timing(animatedSteps, {
      toValue: healthStats.steps,
      duration: 800,
      useNativeDriver: false,
    }).start();
    Animated.timing(animatedWater, {
      toValue: healthStats.waterIntake,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [healthStats.steps, healthStats.waterIntake, animatedSteps, animatedWater]);
  useEffect(() => {
    const stepsListener = animatedSteps.addListener(({ value }) => setDisplayedSteps(Math.round(value)));
    const waterListener = animatedWater.addListener(({ value }) => setDisplayedWater(Math.round(value)));
    return () => {
      animatedSteps.removeListener(stepsListener);
      animatedWater.removeListener(waterListener);
    };
  }, [animatedSteps, animatedWater]);
  const recentActivity = useMemo(() => [
    { id: 1, icon: 'exclamation-circle', label: 'Sent SOS alert', time: 'Today, 09:12', path: '/sos' as const },
    { id: 2, icon: 'map-marker-alt', label: 'Viewed map', time: 'Yesterday, 18:45', path: '/explore' as const },
    { id: 3, icon: 'newspaper', label: 'Read health news', time: 'Yesterday, 08:30', path: '/firstAidNews' as const },
  ], []);
  const timeline = useMemo(() => [
    { id: '1', title: 'Fracture', date: 'Last Visited: 02, May, 2025', icon: 'bone' },
    { id: '2', title: 'Cough', date: 'Last Visited: 02, May, 2025', icon: 'lungs-virus' },
    { id: '3', title: 'Burns', date: 'Last Visited: 02, May, 2025', icon: 'fire' },
  ], []);
  const handleNewTip = useCallback(() => {
    let newTip;
    do {
      newTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];
    } while (newTip.title === dailyTip.title && dailyTips.length > 1);
    setDailyTip(newTip);
  }, [dailyTips, dailyTip.title]);
  const TimelineItem = React.memo(({ item }: { item: typeof timeline[0] }) => (
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
  ));
  TimelineItem.displayName = "TimelineItem";
  const ActivityRow = React.memo(({ item }: { item: typeof recentActivity[0] }) => (
    <TouchableOpacity
      style={styles.activityRow}
      onPress={() => router.push(item.path)}
      activeOpacity={0.7}
    >
      <FontAwesome5 name={item.icon as any} size={18} color="#FC7A7A" style={{ marginRight: 14 }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.activityLabel}>{item.label}</Text>
        <Text style={styles.activityTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  ));
  ActivityRow.displayName = "ActivityRow";

  // Early return for fontsLoaded
  if (!fontsLoaded) {
    return <View style={styles.safeArea} />;
  }

  const user = {
    name: 'Daniella Asiedu',
    age: '18-25',
    gender: 'Female',
    location: 'Ghana',
    medicalCondition: 'Common Cold',
    contact: '020343077',
    language: 'English',
    avatar: require('@/assets/images/Daniella.jpeg'), 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Health Stats Widget */}
        <LinearGradient colors={["#FFE5EC", "#FFF1F2", "#FFFFFF"]} style={styles.statsCard} start={{x:0, y:0}} end={{x:1, y:1}}>
          <Text style={styles.statsTitle}>Health Stats</Text>
          <View style={styles.statsRow}>
            {/* Steps Stat */}
            <View style={styles.statsItem}>
              <AnimatedCircularProgress
                size={80}
                width={10}
                fill={Math.min((displayedSteps / 10000) * 100, 100)}
                tintColor="#FC7A7A"
                backgroundColor="#F3F4F6"
                rotation={0}
                lineCap="round"
                style={{ marginBottom: 6 }}
              >
                {() => (
                  <FontAwesome5 name="walking" size={32} color="#FC7A7A" />
                )}
              </AnimatedCircularProgress>
              <Text style={[styles.statsValue, { fontSize: 22, marginTop: 8 }]}>{displayedSteps}</Text>
              <Text style={styles.statsLabel}>Steps</Text>
            </View>
            {/* Water Stat */}
            <View style={styles.statsItem}>
              <AnimatedCircularProgress
                size={80}
                width={10}
                fill={Math.min((displayedWater / 8) * 100, 100)}
                tintColor="#60A5FA"
                backgroundColor="#F3F4F6"
                rotation={0}
                lineCap="round"
                style={{ marginBottom: 6 }}
              >
                {() => (
                  <FontAwesome5 name="tint" size={32} color="#60A5FA" />
                )}
              </AnimatedCircularProgress>
              <Text style={[styles.statsValue, { fontSize: 22, marginTop: 8 }]}>{displayedWater}/8</Text>
              <Text style={styles.statsLabel}>Water</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileAvatarGlow}>
            <Image source={user.avatar} style={styles.profileAvatar} contentFit="cover" transition={300} />
          </View>
          <Text style={styles.profileName}>{user.name}</Text>
          <View style={styles.profileInfoRow}>
            <Feather name="calendar" size={20} color="#222" style={styles.profileIcon} />
            <Text style={styles.profileInfoLabel}>Age:</Text>
            <Text style={styles.profileInfoValue}>{user.age}</Text>
            <Feather name="user" size={20} color="#222" style={[styles.profileIcon, { marginLeft: 18 }]} />
            <Text style={styles.profileInfoLabel}>Gender:</Text>
            <Text style={styles.profileInfoValue}>{user.gender}</Text>
          </View>
          <View style={styles.profileInfoRow}>
            <Feather name="map-pin" size={20} color="#222" style={styles.profileIcon} />
            <Text style={styles.profileInfoLabel}>Location:</Text>
            <Text style={styles.profileInfoValue}>{user.location}</Text>
          </View>
          <View style={styles.profileInfoRow}>
            <MaterialIcons name="healing" size={20} color="#222" style={styles.profileIcon} />
            <Text style={styles.profileInfoLabel}>Condition:</Text>
            <Text style={styles.profileInfoValue}>{user.medicalCondition}</Text>
          </View>
          <View style={styles.profileInfoRowNoWrap}>
            <Feather name="phone" size={20} color="#222" style={styles.profileIcon} />
            <Text style={styles.profileInfoValue}>{user.contact}</Text>
            <FontAwesome5 name="language" size={20} color="#222" style={[styles.profileIcon, { marginLeft: 18 }]} />
            <Text style={styles.profileInfoLabel}>Language:</Text>
            <Text style={styles.profileInfoValue}>{user.language}</Text>
          </View>
          <TouchableOpacity style={styles.editProfileButton} onPress={() => router.push('/screens/profile-settings')}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Lifeline History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Lifeline History</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <AntDesign name="eyeo" size={16} color="#D9534F" />
            </TouchableOpacity>
          </View>
          <View style={styles.timelineContainer}>
            <FlatList
              data={timeline}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TimelineItem item={item} />}
              scrollEnabled={false}
            />
          </View>
        </View>

        {/* Daily Tip */}
        <View style={styles.dailyTipCard}>
          <View style={styles.sectionHeader}>
            <AntDesign name="info" size={16} color="#ccc" />
            <Text style={styles.sectionTitle}>DAILY TIP</Text>
          </View>
          <View style={styles.tipContent}>
            {/* Dynamic icon for the tip */}
            {dailyTip.iconSet && dailyTip.iconName && (
              <dailyTip.iconSet name={dailyTip.iconName} size={24} color="#D9534F" style={{ marginBottom: 4 }} />
            )}
            <Text style={styles.tipText}>{dailyTip.title}</Text>
            <Text style={styles.tipSubText}>{dailyTip.content}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <TouchableOpacity style={styles.newTipButton} onPress={handleNewTip}>
              <Feather name="refresh-cw" size={16} color="#D9534F" style={{ marginRight: 6 }} />
             
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Feather name="zap" size={14} color="#aaa" style={{ marginRight: 4 }} />
              <Text style={styles.tipFooter}>New tip every day</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityCard}>
          <Text style={styles.activityTitle}>Recent Activity</Text>
          <FlatList
            data={recentActivity}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <ActivityRow item={item} />}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    padding: 24,
    paddingBottom: 50,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  statsCard: {
    width: '100%',
    borderRadius: 22,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    letterSpacing: 0.5,
    fontFamily: 'JetBrainsMono-Bold',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  statsItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 8,
    minHeight: 80,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 4,
    marginBottom: 4,
    fontFamily: 'JetBrainsMono-Bold',
    textAlign: 'center',
  },
  statsLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    letterSpacing: 0.2,
    fontFamily: 'JetBrainsMono-Regular',
    textAlign: 'center',
  },
  profileCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },
  profileAvatarGlow: {
    width: 112, // slightly larger than avatar
    height: 112,
    borderRadius: 56,
    backgroundColor: 'rgba(252,122,122,0.25)', // soft pink glow
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FC7A7A',
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
    borderColor: '#FC7A7A',
    backgroundColor: '#F3F4F6',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
    fontFamily: 'JetBrainsMono-Bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  profileInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    width: '100%',
    flexWrap: 'wrap',
  },
  profileInfoRowNoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    width: '100%',
    flexWrap: 'nowrap',
  },
  profileIcon: {
    marginRight: 6,
  },
  profileInfoLabel: {
    fontSize: 15,
    color: '#111',
    fontFamily: 'JetBrainsMono-Regular',
    marginRight: 4,
    textAlign: 'center',
  },
  profileInfoValue: {
    fontSize: 15,
    color: '#111',
    fontFamily: 'JetBrainsMono-Regular',
    marginRight: 8,
    flexShrink: 1,
    textAlign: 'center',
  },
  editProfileButton: {
    marginTop: 14,
    backgroundColor: '#FFE5E5',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 32,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#D9534F',
  },
  editProfileButtonText: {
    color: '#D9534F',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'JetBrainsMono-Bold',
    letterSpacing: 0.5,
  },
  section: {
    width: '100%',
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    fontFamily: 'JetBrainsMono-Bold',
  },
  viewAllButton: {
    backgroundColor: '#FFE5E5',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 18,
  },
  viewAllButtonText: {
    color: '#D9534F',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'JetBrainsMono-Bold',
  },
  timelineContainer: {
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: 14,
    padding: 18,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 6,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  timelineContent: {
    flex: 1,
    paddingRight: 8,
  },
  timelineTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1F2937',
    fontFamily: 'JetBrainsMono-Bold',
    marginBottom: 2,
  },
  timelineDate: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'JetBrainsMono-Regular',
  },
  dailyTipCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: 18,
    padding: 24,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 6,
  },
  tipContent: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    marginBottom: 12,
  },
  tipText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
    color: '#D9534F',
    fontFamily: 'JetBrainsMono-Bold',
    lineHeight: 22,
  },
  tipSubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'JetBrainsMono-Regular',
    lineHeight: 20,
  },
  newTipButton: {
    backgroundColor: '#FFE5E5',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 18,
    alignSelf: 'flex-start',
  },
  newTipButtonText: {
    color: '#D9534F',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'JetBrainsMono-Bold',
  },
  tipFooter: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    fontFamily: 'JetBrainsMono-Regular',
  },
  activityCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: 18,
    padding: 20,
    marginTop: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 6,
  },
  activityTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    fontFamily: 'JetBrainsMono-Bold',
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityLabel: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
    fontFamily: 'JetBrainsMono-Regular',
    flex: 1,
  },
  activityTime: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
    fontFamily: 'JetBrainsMono-Regular',
  },
});

export default DashboardScreen; 