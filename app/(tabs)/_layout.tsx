import { HapticTab } from '@/components/HapticTab';
import LoaderWrapper from '@/components/loaderWrapper';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Linking, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [showBotModal, setShowBotModal] = useState(false);
  const [isConnectingDoctor, setIsConnectingDoctor] = useState(false);

  const handleCallDoctor = async () => {
    setIsConnectingDoctor(true);
    try {
      const phoneNumber = '+233203430787';
      const url = `tel:${phoneNumber}`;
      
      // Check if the device can open the URL
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          'Error',
          'Unable to make a phone call. Please check your device settings.'
        );
      }
    } catch (error) {
      console.error('Error making phone call:', error);
      Alert.alert(
        'Error',
        'An error occurred while trying to make the call. Please try again.'
      );
    } finally {
      setIsConnectingDoctor(false);
      setShowBotModal(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LoaderWrapper>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.select({
              ios: {
                position: 'absolute',
              },
              default: {},
            }),
          }}>
          
          <Tabs.Screen
            name="dashboard"
            options={{
              title: 'Dashboard',
              tabBarIcon: ({ color }) => (
                <MaterialIcons size={28} name="dashboard" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="ai-assistant"
            options={{
              title: 'A.I Assistant',
              tabBarIcon: ({ color }) => (
                <MaterialIcons size={28} name="auto-awesome" color={color} />
              ),
              tabBarStyle: { display: 'none' },
            }}
          />
        </Tabs>
      </LoaderWrapper>
<>
        <TouchableOpacity
          style={[styles.floatingButton, styles.contactButton]}
          onPress={() => setShowBotModal(true)}
        >
          <Ionicons name="medical" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.floatingButton, styles.sosButton]}
          onPress={() => router.push('/sos')}
        >
          <MaterialIcons name="sos" size={28} color="white" />
        </TouchableOpacity>

        {/* Medical Assistant Bot Modal */}
        <Modal
          visible={showBotModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowBotModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.botModalCard}>
              <View style={styles.modalHeader}>
                <TouchableOpacity 
                  style={styles.modalCloseButton} 
                  onPress={() => setShowBotModal(false)}
                >
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.callLogsButton}
                  onPress={() => {
                    setShowBotModal(false);
                    router.push('/screens/call-logs');
                  }}
                >
                  <Ionicons name="time-outline" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              <View style={styles.botIconContainer}>
                <View style={styles.botIcon}>
                  <Ionicons name="medical" size={48} color="#E53935" />
                </View>
              </View>
              <Text style={styles.botModalTitle}>Emergency Medical Assistance</Text>
              <Text style={styles.botModalText}>Call our emergency medical line for immediate assistance</Text>
              <Text style={styles.phoneNumber}>+233 20 343 0787</Text>
              
              {isConnectingDoctor ? (
                <View style={styles.connectingContainer}>
                  <ActivityIndicator size="large" color="#E53935" />
                  <Text style={styles.connectingText}>Connecting to doctor...</Text>
                </View>
              ) : (
                <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity 
                    style={styles.callDoctorButton} 
                    onPress={handleCallDoctor} 
                    activeOpacity={0.8}
                  >
                    <Ionicons name="call" size={20} color="white" style={{ marginRight: 8 }} />
                    <Text style={styles.callDoctorButtonText}>Call Doctor Now</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    right: 12,
    width: 54,
    height: 54,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 1000,
  },
  sosButton: {
    bottom: Platform.OS === 'ios' ? 82 : 24,
    backgroundColor: '#EF4444',
  },
  contactButton: {
    bottom: Platform.OS === 'ios' ? 152 : 94,
    backgroundColor: '#3B82F6',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  botModalCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  modalCloseButton: {
    padding: 8,
    marginRight: 8,
  },
  callLogsButton: {
    padding: 8,
  },
  botIconContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  botIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  botModalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  phoneNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E53935',
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: 1,
  },
  connectingContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  connectingText: {
    marginTop: 12,
    color: '#666',
    fontSize: 16,
  },
  modalButtonsContainer: {
    width: '100%',
  },
  callDoctorButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  callDoctorButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
