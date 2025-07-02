import { useFonts } from 'expo-font';
import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

Dimensions.get('window');

export default function ProfileScreen() {
  const router = useRouter();
  const [country] = useState('GHANA');
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

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
          <TouchableOpacity style={styles.countrySelector}>
            <ExpoImage
              source={require('@/assets/images/flags/ghana.png')}
              style={styles.flagIcon}
            />
            <Text style={styles.countryText}>{country}</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
        </View>
        
        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
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
});