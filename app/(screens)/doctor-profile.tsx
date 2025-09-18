import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { useDisplayPreferences } from '@/context/DisplayPreferencesContext';
import { Colors } from '@/constants/Colors';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock doctor data - in a real app, this would come from an API
const doctors = {
  '1': {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Emergency Medicine',
    hospital: 'City General Hospital',
    experience: '12 years',
    rating: 4.9,
    reviews: 128,
    about: 'Board-certified emergency medicine physician with extensive experience in trauma care and acute medical conditions. Committed to providing the highest quality care to all patients.',
    education: 'MD, Harvard Medical School\nResidency: Massachusetts General Hospital',
    languages: ['English', 'Spanish'],
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    online: true
  },
  '2': {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    hospital: 'Heart Care Center',
    experience: '15 years',
    rating: 4.8,
    reviews: 215,
    about: 'Cardiologist specializing in interventional procedures and preventive cardiology. Passionate about heart health and patient education.',
    education: 'MD, Johns Hopkins University\nFellowship: Cleveland Clinic',
    languages: ['English', 'Mandarin'],
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    online: false
  },
  '3': {
    id: '3',
    name: 'Dr. Emily Wilson',
    specialty: 'Pediatrics',
    hospital: 'Children\'s Hospital',
    experience: '8 years',
    rating: 4.7,
    reviews: 176,
    about: 'Pediatrician dedicated to providing compassionate care to children of all ages. Special interest in childhood development and preventive care.',
    education: 'MD, Stanford University\nResidency: Boston Children\'s Hospital',
    languages: ['English', 'French'],
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    online: true
  },
  '4': {
    id: '4',
    name: 'Dr. James Brown',
    specialty: 'Neurology',
    hospital: 'Neuro Care Institute',
    experience: '18 years',
    rating: 4.9,
    reviews: 302,
    about: 'Neurologist with expertise in movement disorders and neurophysiology. Committed to improving the quality of life for patients with neurological conditions.',
    education: 'MD, Columbia University\nFellowship: Mayo Clinic',
    languages: ['English', 'Spanish'],
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    online: false
  },
  '5': {
    id: '5',
    name: 'Dr. Lisa Anderson',
    specialty: 'Dermatology',
    hospital: 'Skin & Beauty Clinic',
    experience: '10 years',
    rating: 4.8,
    reviews: 194,
    about: 'Board-certified dermatologist specializing in medical and cosmetic dermatology. Focus on skin cancer prevention and treatment.',
    education: 'MD, University of California\nResidency: NYU Langone Health',
    languages: ['English', 'Spanish', 'French'],
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    online: true
  }
};

export default function DoctorProfileScreen() {
  const router = useRouter();
  const { doctorId } = useLocalSearchParams();
  const doctor = doctors[doctorId as keyof typeof doctors] || doctors['1'];
  const { darkMode } = useDisplayPreferences();
  const themeColors = darkMode ? Colors.dark : Colors.light;
  const styles = getStyles(darkMode, themeColors);

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/dashboard');
    }
  };

  const handleCall = () => {
    Linking.openURL(`tel:0203430787`);
  };

  const handleMessage = () => {
    router.push({
      pathname: '/(screens)/messages',
      params: { 
        doctorName: doctor.name,
        doctorId: doctor.id 
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back-ios" size={22} color={themeColors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor Profile</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity 
            style={styles.headerIcon}
            onPress={() => router.push('/(tabs)/settings')}
          >
            <MaterialIcons name="more-vert" size={24} color={themeColors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: doctor.avatar }} 
              style={styles.avatar} 
            />
            {doctor.online && <View style={styles.onlineBadge} />}
          </View>
          
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
          
          <View style={styles.hospitalContainer}>
            <MaterialIcons name="local-hospital" size={18} color={themeColors.tabIconDefault} />
            <Text style={[styles.hospital, { color: themeColors.tabIconDefault }]}>{doctor.hospital}</Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <FontAwesome5 name="star" size={16} color="#FFD700" />
            <Text style={[styles.ratingText, { color: themeColors.tabIconDefault }]}>
              {doctor.rating} ({doctor.reviews} reviews)
            </Text>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.callButton]}
              onPress={handleCall}
            >
              <MaterialIcons name="call" size={20} color="#fff" />
              <Text style={styles.callButtonText}>Call Now</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.messageButton]}
              onPress={handleMessage}
            >
              <MaterialIcons name="message" size={20} color="#EF4444" />
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>{doctor.about}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <Text style={styles.educationText}>{doctor.education}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <Text style={styles.experienceText}>{doctor.experience} of experience</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={styles.languagesContainer}>
            {doctor.languages.map((lang, index) => (
              <View key={index} style={styles.languageTag}>
                <Text style={styles.languageText}>{lang}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (darkMode: boolean, themeColors: any) => {
  const backgroundColor = themeColors.background;
  const textColor = themeColors.text;
  const borderColor = darkMode ? '#333' : '#f0f0f0';
  const cardBackground = darkMode ? '#1E1E1E' : '#fff';
  const secondaryText = themeColors.tabIconDefault;
  const languageTagBg = darkMode ? '#2D2D2D' : '#f5f5f5';
  const messageButtonBg = darkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.1)';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
    },
    backButton: {
      padding: 8,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: textColor,
    },
    headerIcons: {
      flexDirection: 'row',
    },
    headerIcon: {
      padding: 8,
    },
    content: {
      flex: 1,
    },
    profileHeader: {
      alignItems: 'center',
      padding: 24,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
    },
    avatarContainer: {
      position: 'relative',
      marginBottom: 16,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: '#EF4444',
    },
    onlineBadge: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: '#4CAF50',
      borderWidth: 2,
      borderColor: '#fff',
    },
    name: {
      fontSize: 24,
      fontWeight: '700',
      color: textColor,
      marginBottom: 4,
    },
    specialty: {
      fontSize: 16,
      color: '#EF4444',
      marginBottom: 8,
    },
    hospitalContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    hospital: {
      fontSize: 14,
      color: secondaryText,
      marginLeft: 4,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    ratingText: {
      fontSize: 14,
      color: secondaryText,
      marginLeft: 4,
    },
    actionButtons: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      borderRadius: 8,
      flex: 1,
    },
    callButton: {
      backgroundColor: '#EF4444',
      marginRight: 12,
    },
    messageButton: {
      backgroundColor: messageButtonBg,
      borderWidth: 1,
      borderColor: '#EF4444',
    },
    callButtonText: {
      color: '#fff',
      fontWeight: '600',
      marginLeft: 8,
    },
    messageButtonText: {
      color: '#EF4444',
      fontWeight: '600',
      marginLeft: 8,
    },
    section: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: textColor,
      marginBottom: 12,
    },
    aboutText: {
      fontSize: 14,
      color: secondaryText,
      lineHeight: 22,
    },
    educationText: {
      fontSize: 14,
      color: secondaryText,
      lineHeight: 22,
      textAlignVertical: 'top',
    },
    experienceText: {
      fontSize: 14,
      color: secondaryText,
    },
    languagesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 8,
    },
    languageTag: {
      backgroundColor: languageTagBg,
      borderRadius: 4,
      paddingVertical: 6,
      paddingHorizontal: 12,
      marginRight: 8,
      marginBottom: 8,
    },
    languageText: {
      fontSize: 14,
      color: secondaryText,
    }
  });
};
