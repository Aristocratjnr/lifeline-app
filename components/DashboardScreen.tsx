import { AntDesign, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { SafeAreaView } from 'react-native-safe-area-context';

const DashboardScreen = () => {
  // Load fonts
  const [fontsLoaded] = useFonts({
    'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('@/assets/fonts/JetBrainsMono-Bold.ttf'),
  });

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

  // Simulated health stats
  const healthStats = {
    steps: 7421,
    lastCheckup: '25/06/25',
    waterIntake: 6, // out of 8 glasses
  };

  // Simulated recent activity
  const recentActivity = [
    { id: 1, icon: 'exclamation-circle', label: 'Sent SOS alert', time: 'Today, 09:12' },
    { id: 2, icon: 'map-marker-alt', label: 'Viewed map', time: 'Yesterday, 18:45' },
    { id: 3, icon: 'newspaper', label: 'Read health news', time: 'Yesterday, 08:30' },
  ];

  const timeline = [
    { id: '1', title: 'Fracture', date: 'Last Visited: 02, May, 2025', icon: 'bone' },
    { id: '2', title: 'Cough', date: 'Last Visited: 02, May, 2025', icon: 'lungs-virus' },
    { id: '3', title: 'Burns', date: 'Last Visited: 02, May, 2025', icon: 'fire' },
  ];

  const dailyTip = {
    title: 'Handle sharp objects with care:',
    content: "This seems obvious, but it's the most important rule. Pay close attention when using knives, scissors, razors, box cutters, and tools. Don't rush!",
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Health Stats Widget */}
        <LinearGradient colors={["#FFE5EC", "#FFF1F2", "#FFFFFF"]} style={styles.statsCard} start={{x:0, y:0}} end={{x:1, y:1}}>
          <Text style={styles.statsTitle}>Health Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statsItem}>
              <FontAwesome5 name="walking" size={30} color="#FC7A7A" style={{ marginBottom: 6 }} />
              <Text style={styles.statsValue}>{healthStats.steps}</Text>
              <Text style={styles.statsLabel}>Steps</Text>
            </View>
            <View style={styles.statsItem}>
              <MaterialIcons name="medical-services" size={30} color="#FBBF24" style={{ marginBottom: 6 }} />
              <Text style={styles.statsValue}>{healthStats.lastCheckup}</Text>
              <Text style={styles.statsLabel}>Last Checkup</Text>
            </View>
            <View style={[styles.statsItem, { alignItems: 'center' }]}> 
              <AnimatedCircularProgress
                size={40}
                width={6}
                fill={(healthStats.waterIntake / 8) * 100}
                tintColor="#60A5FA"
                backgroundColor="#F3F4F6"
                rotation={0}
                lineCap="round"
                style={{ marginBottom: 6 }}
              >
                {() => (
                  <FontAwesome5 name="tint" size={24} color="#60A5FA" />
                )}
              </AnimatedCircularProgress>
              <Text style={styles.statsValue}>{healthStats.waterIntake}/8</Text>
              <Text style={styles.statsLabel}>Water</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={user.avatar} style={styles.profileAvatar} contentFit="cover" transition={300} />
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
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Lifeline History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Lifeline History</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllButtonText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.timelineContainer}>
            {timeline.map((item, index) => (
              <View key={item.id} style={styles.timelineItem}>
                <View style={styles.timelineIcon}>
                  <FontAwesome5 name={item.icon as any} size={20} color="#D9534F" />
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>{item.title}</Text>
                  <Text style={styles.timelineDate}>{item.date}</Text>
                </View>
                <AntDesign name="right" size={16} color="#ccc" />
              </View>
            ))}
          </View>
        </View>

        {/* Daily Tip */}
        <View style={styles.dailyTipCard}>
          <View style={styles.sectionHeader}>
            <AntDesign name="info" size={16} color="#ccc" />
            <Text style={styles.sectionTitle}>DAILY TIP</Text>
          </View>
          <View style={styles.tipContent}>
            <MaterialIcons name="content-cut" size={20} color="#ccc" />
            <Text style={styles.tipText}>{dailyTip.title}</Text>
            <Text style={styles.tipSubText}>{dailyTip.content}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <TouchableOpacity style={styles.newTipButton}>
              <Text style={styles.newTipButtonText}>% CUT</Text>
            </TouchableOpacity>
            <Text style={styles.tipFooter}>New tip every day</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityCard}>
          <Text style={styles.activityTitle}>Recent Activity</Text>
          {recentActivity.map((item) => (
            <View key={item.id} style={styles.activityRow}>
              <FontAwesome5 name={item.icon as any} size={18} color="#FC7A7A" style={{ marginRight: 14 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.activityLabel}>{item.label}</Text>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
            </View>
          ))}
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 4,
  },
  profileAvatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
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
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
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
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
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
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginTop: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
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