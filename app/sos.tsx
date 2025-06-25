import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SOSScreen() {
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const router = useRouter();
  const [showMedicalId, setShowMedicalId] = useState(false);

  // Simulated user data for Medical ID
  const user = {
    name: 'Daniella',
    age: '18-25',
    gender: 'Female',
    medicalCondition: 'Common Cold',
    contact: '0203430787',
    bloodType: 'O+',
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.05,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnimation]);

  const handleCallEmergency = () => {
    Linking.openURL('tel:193');
  };

  const handleSendLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied.');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const lat = loc.coords.latitude;
      const lng = loc.coords.longitude;
      router.push(`/explore?lat=${lat}&lng=${lng}`);
    } catch {
      alert('Could not get your location.');
    }
  };

  const animatedSosButtonStyle = {
    transform: [{ scale: pulseAnimation }],
  };

  return (
    <LinearGradient colors={['#FEF2F2', '#FFFBEB']} style={styles.safeArea}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <FontAwesome5 name="heartbeat" size={40} color="#EF4444" />
            <Text style={styles.headerTitle}>Emergency SOS</Text>
            <Text style={styles.headerSubtitle}>Stay calm. Help is on the way.</Text>
          </View>

          <Animated.View style={[styles.sosButtonContainer, animatedSosButtonStyle]}>
            <TouchableOpacity style={styles.sosButton} onPress={handleCallEmergency} activeOpacity={0.8}>
              <View>
                <MaterialIcons name="sos" size={64} color="white" />
              </View>
              <Text style={styles.sosButtonText}>PRESS AND HOLD</Text>
              <Text style={styles.sosButtonSubtext}>TO CALL FOR HELP</Text>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleSendLocation}>
              <FontAwesome5 name="map-marker-alt" size={24} color="#1F2937" />
              <Text style={styles.actionButtonText}>Send Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => setShowMedicalId(true)}>
              <FontAwesome5 name="user-shield" size={24} color="#1F2937" />
              <Text style={styles.actionButtonText}>Medical ID</Text>
            </TouchableOpacity>
          </View>

          {/* Medical ID Modal */}
          <Modal
            visible={showMedicalId}
            animationType="slide"
            transparent
            onRequestClose={() => setShowMedicalId(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.medicalIdCard}>
                <Text style={styles.medicalIdTitle}>Medical ID</Text>
                <View style={styles.medicalIdRow}><Text style={styles.medicalIdLabel}>Name:</Text><Text style={styles.medicalIdValue}>{user.name}</Text></View>
                <View style={styles.medicalIdRow}><Text style={styles.medicalIdLabel}>Age:</Text><Text style={styles.medicalIdValue}>{user.age}</Text></View>
                <View style={styles.medicalIdRow}><Text style={styles.medicalIdLabel}>Gender:</Text><Text style={styles.medicalIdValue}>{user.gender}</Text></View>
                <View style={styles.medicalIdRow}><Text style={styles.medicalIdLabel}>Condition:</Text><Text style={styles.medicalIdValue}>{user.medicalCondition}</Text></View>
                <View style={styles.medicalIdRow}><Text style={styles.medicalIdLabel}>Contact:</Text><Text style={styles.medicalIdValue}>{user.contact}</Text></View>
                <View style={styles.medicalIdRow}><Text style={styles.medicalIdLabel}>Blood Type:</Text><Text style={styles.medicalIdValue}>{user.bloodType}</Text></View>
                <TouchableOpacity style={styles.closeModalButton} onPress={() => setShowMedicalId(false)}>
                  <Text style={styles.closeModalButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

export const config = {
  headerShown: false,
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 50,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 15,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 5,
  },
  sosButtonContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosButton: {
    backgroundColor: '#EF4444',
    width: 240,
    height: 240,
    borderRadius: 120,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 20,
  },
  sosButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    letterSpacing: 1,
  },
  sosButtonSubtext: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 10,
  },
  infoSection: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginTop: 15,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1F2937',
  },
  guideContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  guideItem: {
    alignItems: 'center',
  },
  guideText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicalIdCard: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  medicalIdTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: 18,
    alignSelf: 'center',
  },
  medicalIdRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  medicalIdLabel: {
    fontWeight: 'bold',
    color: '#374151',
    width: 110,
  },
  medicalIdValue: {
    color: '#1F2937',
    fontWeight: '500',
  },
  closeModalButton: {
    alignSelf: 'center',
    marginTop: 18,
    backgroundColor: '#EF4444',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 28,
  },
  closeModalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
}); 