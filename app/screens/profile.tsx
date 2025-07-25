import { useFonts } from 'expo-font';
import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

Dimensions.get('window');

// Countries data with flags
const countries = [
  { code: 'GHANA', name: 'Ghana', flag: require('@/assets/images/flags/ghana.png') },
  { code: 'USA', name: 'United States', flag: require('@/assets/images/flags/us.png') },
  { code: 'FRANCE', name: 'France', flag: require('@/assets/images/flags/france.png') },
  { code: 'SPAIN', name: 'Spain', flag: require('@/assets/images/flags/spain.png') },
  { code: 'EGYPT', name: 'Egypt', flag: require('@/assets/images/flags/egypt.png') },
  { code: 'INDIA', name: 'India', flag: require('@/assets/images/flags/india.png') },
  { code: 'RUSSIA', name: 'Russia', flag: require('@/assets/images/flags/russia.png') },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Default to Ghana
  const [showCountryModal, setShowCountryModal] = useState(false);
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('@/assets/fonts/JetBrainsMono-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    setShowCountryModal(false);
  };

  const handleConfirm = () => {
    router.push('/(tabs)/explore');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>What Is Your Location?</Text>
        
        <Text style={styles.description}>
          Allow Lifeline to provide local emergency numbers and nearby help. Help us find you faster in an emergency.
        </Text>
        
        {/* Location Illustration */}
      <View style={styles.illustrationContainer}>
          <ExpoImage
            source={require('@/assets/images/location.png')}
            style={styles.illustrationImage}
            contentFit="contain"
          />
        </View>
        
        {/* Country Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Country</Text>
          <TouchableOpacity style={styles.countrySelector} onPress={() => setShowCountryModal(true)}>
            <ExpoImage
              source={selectedCountry.flag}
              style={styles.flagIcon}
            />
            <Text style={styles.countryText}>{selectedCountry.name}</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
        </View>
        
        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>

      {/* Country Selection Modal */}
      <Modal
        visible={showCountryModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCountryModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCountryModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity onPress={() => setShowCountryModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            {countries.map((country) => (
              <TouchableOpacity 
                key={country.code}
                style={[styles.countryOption, selectedCountry.code === country.code && styles.selectedCountryOption]}
                onPress={() => handleCountrySelect(country)}
              >
                <View style={styles.countryOptionContent}>
                  <ExpoImage
                    source={country.flag}
                    style={styles.countryOptionFlag}
                  />
                  <Text style={styles.countryOptionText}>{country.name}</Text>
                </View>
                {selectedCountry.code === country.code && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'JetBrainsMono-Bold',
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 50,
    fontFamily: 'JetBrainsMono-Regular',
    lineHeight: 20,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    height: 120,
  },
  illustrationImage: {
    width: 120,
    height: 120,
    marginBottom: 0,
  },
  locationMarker: {
    position: 'absolute',
    bottom: 0,
    width: 90,
    height: 45,
    borderRadius: 45,
    borderWidth: 10,
    borderColor: '#FF9A9A',
    borderBottomWidth: 0,
    transform: [{ scaleX: 2 }],
    zIndex: 1,
  }, 
  inputGroup: {
    width: '100%',
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'JetBrainsMono-Bold',
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
  },
  flagIcon: {
    width: 24,
    height: 16,
    marginRight: 10,
  },
  countryText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Regular',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'JetBrainsMono-Regular',
  },
  confirmButton: {
    backgroundColor: '#FFB6B6',
    borderRadius: 8,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Regular',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    maxWidth: 350,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 18,
    color: '#333',
  },
  closeButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#888',
    fontFamily: 'JetBrainsMono-Regular',
  },
  countryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedCountryOption: {
    backgroundColor: '#f0f0f0',
  },
  countryOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  countryOptionFlag: {
    width: 24,
    height: 16,
    marginRight: 15,
  },
  countryOptionText: {
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Regular',
    color: '#333',
  },
  checkmark: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'JetBrainsMono-Bold',
  },
});