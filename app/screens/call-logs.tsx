import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Image,
  Linking,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CallLogsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  
  // Mock doctor data with profile images
  const doctors = {
    '1': {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Emergency Medicine',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      online: true,
      rating: 4.9,
      hospital: 'City General Hospital'
    },
    '2': {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      online: false,
      rating: 4.8,
      hospital: 'Heart Care Center'
    },
    '3': {
      id: '3',
      name: 'Dr. Emily Wilson',
      specialty: 'Pediatrics',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      online: true,
      rating: 4.7,
      hospital: 'Children\'s Hospital'
    },
    '4': {
      id: '4',
      name: 'Dr. James Brown',
      specialty: 'Neurology',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      online: false,
      rating: 4.9,
      hospital: 'Neuro Care Institute'
    },
    '5': {
      id: '5',
      name: 'Dr. Lisa Anderson',
      specialty: 'Dermatology',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      online: true,
      rating: 4.8,
      hospital: 'Skin & Beauty Clinic'
    }
  };

  // Mock call log data with doctor references
  const [callLogs, setCallLogs] = useState([
    { id: '1', doctorId: '1', number: '0203430787', date: '2025-07-28', time: '14:30', duration: '12:45', type: 'outgoing' },
    { id: '2', doctorId: '2', number: '0203430787', date: '2025-07-25', time: '09:15', duration: '08:22', type: 'incoming' },
    { id: '3', doctorId: '3', number: '0203430787', date: '2025-07-22', time: '16:45', duration: '15:30', type: 'outgoing' },
    { id: '4', doctorId: '4', number: '0203430787', date: '2025-07-20', time: '11:20', duration: '05:15', type: 'missed' },
    { id: '5', doctorId: '5', number: '0203430787', date: '2025-07-18', time: '13:10', duration: '22:18', type: 'outgoing' },
  ]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleCall = useCallback((number: string) => {
    Linking.openURL(`tel:${number}`);
  }, []);

  interface Doctor {
    id: string;
    name: string;
    specialty: string;
    avatar: string;
    online: boolean;
    rating: number;
    hospital: string;
  }

  const handleMessage = useCallback((doctorData: Doctor | string) => {
    // Make sure we're using the doctor data passed to the function
    const selectedDoctor = typeof doctorData === 'string' 
      ? doctors[doctorData as keyof typeof doctors] 
      : doctors[doctorData.id as keyof typeof doctors] || doctorData;
    router.push({
      pathname: '/(screens)/messages',
      params: { 
        doctorName: selectedDoctor.name,
        doctorId: selectedDoctor.id 
      }
    } as any);
  }, [router, doctors]);

  const formatCallType = useCallback((type: string) => {
    switch (type) {
      case 'outgoing': return t('callLogs.outgoing');
      case 'incoming': return t('callLogs.incoming');
      case 'missed': return t('callLogs.missed');
      default: return type;
    }
  }, [t]);

  const handleGoBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/dashboard');
    }
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('callLogs.title')}</Text>
      </View>
      
      <FlatList 
        data={callLogs}
        keyExtractor={(item) => item.id}
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => {
          const doctor = doctors[item.doctorId as keyof typeof doctors];
          return (
            <View key={item.id} style={styles.logItem}>
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
                  resizeMode="cover"
                />
                <View style={styles.doctorDetails}>
                  <View style={styles.nameContainer}>
                    <Text style={styles.doctorName}>{doctor.name}</Text>
                    <View style={[
                      styles.statusDot,
                      doctor.online ? styles.onlineDot : styles.offlineDot
                    ]} />
                  </View>
                  <Text style={styles.specialty}>{doctor.specialty}</Text>
                  <Text style={styles.callDetails}>
                    {item.date} • {item.time} • {formatCallType(item.type)} • {item.duration}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.callButton]}
                  onPress={() => handleCall(item.number)}
                >
                  <MaterialIcons name="call" size={20} color="#fff" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, styles.messageButton]}
                  onPress={() => handleMessage(doctor)}
                >
                  <MaterialIcons name="message" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  logItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 12,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  doctorDetails: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginRight: 6,
  },
  specialty: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 6,
  },
  onlineDot: {
    backgroundColor: '#4CAF50',
  },
  offlineDot: {
    backgroundColor: '#9E9E9E',
  },
  callDetails: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginTop: 8,  // Added margin to push buttons down
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  callButton: {
    backgroundColor: '#EF4444',
    marginLeft: 46,
  },
  messageButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#EF4444',
    marginLeft: 22,
  },
});
