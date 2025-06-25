import { AntDesign, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DashboardScreen = () => {
  const user = {
    name: 'Daniella',
    age: '18-25',
    gender: 'Female',
    location: 'Ghana',
    medicalCondition: 'Common Cold',
    contact: '0203430787',
    language: 'English',
    avatar: require('@/assets/images/Daniella.jpeg'), 
  };

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
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={user.avatar} style={styles.profileAvatar} contentFit="cover" transition={300} />
          <Text style={styles.profileName}>{user.name}</Text>
          <View style={styles.profileDetailsRow}>
            <Feather name="calendar" size={16} color="#666" />
            <Text style={styles.profileDetailText}>Age: {user.age}</Text>
            <Feather name="user" size={16} color="#666" style={{ marginLeft: 16 }} />
            <Text style={styles.profileDetailText}>Gender: {user.gender}</Text>
          </View>
          <View style={styles.profileDetailsRow}>
            <Feather name="map-pin" size={16} color="#666" />
            <Text style={styles.profileDetailText}>Location: {user.location}</Text>
          </View>
          <View style={styles.profileDetailsRow}>
            <MaterialIcons name="healing" size={16} color="#666" />
            <Text style={styles.profileDetailText}>Condition: {user.medicalCondition}</Text>
          </View>
          <View style={styles.profileDetailsRow}>
            <Feather name="phone" size={16} color="#666" />
            <Text style={styles.profileDetailText}>Contact: {user.contact}</Text>
            <FontAwesome5 name="language" size={16} color="#666" style={{ marginLeft: 16 }} />
            <Text style={styles.profileDetailText}>Language: {user.language}</Text>
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
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  profileCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 28,
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
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#FC7A7A',
    backgroundColor: '#F3F4F6',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1F2937',
  },
  profileDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileDetailText: {
    marginLeft: 6,
    fontSize: 15,
    color: '#333',
  },
  editProfileButton: {
    marginTop: 14,
    backgroundColor: '#FFE5E5',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 28,
  },
  editProfileButtonText: {
    color: '#D9534F',
    fontWeight: 'bold',
    fontSize: 15,
  },
  section: {
    width: '100%',
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  viewAllButton: {
    backgroundColor: '#FFE5E5',
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  viewAllButtonText: {
    color: '#D9534F',
    fontWeight: 'bold',
    fontSize: 14,
  },
  timelineContainer: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginTop: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  timelineIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  timelineDate: {
    fontSize: 13,
    color: '#666',
  },
  dailyTipCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  tipContent: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    marginBottom: 10,
  },
  tipText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#D9534F',
  },
  tipSubText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  newTipButton: {
    backgroundColor: '#FFE5E5',
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 18,
    alignSelf: 'flex-start',
  },
  newTipButtonText: {
    color: '#D9534F',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tipFooter: {
    fontSize: 13,
    color: '#aaa',
    textAlign: 'center',
  },
});

export default DashboardScreen; 