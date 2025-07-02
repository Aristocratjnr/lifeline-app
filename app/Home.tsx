import { FontAwesome } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import { useFonts } from 'expo-font';
import { Image as ExpoImage } from 'expo-image';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../components/Loader';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [isReady, setIsReady] = useState(false);
  
  // Load JetBrains Mono font
  const [fontsLoaded] = useFonts({
    'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
  });

  useEffect(() => {
    async function loadAssets() {
      await Asset.loadAsync([
        require('@/assets/images/woman.png'),
      ]);
      setIsReady(true);
    }
    loadAssets();
  }, []);

  if (!isReady || !fontsLoaded) {
    return <Loader isLoading={true} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.logoContainer}>
            <ExpoImage
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
              contentFit="contain"
            />
          </View>
          
          <Text style={styles.title}>Welcome to LIFELINE</Text>
          
          <Text style={styles.subtitle}>
            Your trusted first aid & emergency companion
          </Text>
          
          <View style={styles.featureHighlight}>
            <FontAwesome name="shield" size={16} color="#106B40" />
            <Text style={styles.featureText}>Always Ready - Always Safe</Text>
          </View>
        </View>

        {/* Image Section */}
        <View style={styles.imageSection}>
          <View style={styles.imageContainer}>
            <Image
              source={require('@/assets/images/woman.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Action Section */}
        <View style={styles.buttonContainer}>
          <Link href="/auth/sign-in" asChild>
            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85}>
              <FontAwesome name="sign-in" size={18} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.primaryButtonText}>Sign In</Text>
            </TouchableOpacity>
          </Link>
          
          <Link href="/auth/sign-up" asChild>
            <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.85}>
              <FontAwesome name="user-plus" size={18} color="#FF5252" style={styles.buttonIcon} />
              <Text style={styles.secondaryButtonText}>Create Account</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/(screens)/tips" asChild>
            <TouchableOpacity style={styles.tertiaryButton} activeOpacity={0.85}>
              <FontAwesome name="user" size={18} color="#333" style={styles.buttonIcon} />
              <Text style={styles.tertiaryButtonText}>Continue as a Guest</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: '#FBDAD8', // Light pink background
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  // Header Section
  headerSection: {
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF5252', 
    marginBottom: 8,
    fontFamily: 'JetBrainsMono-Regular', 
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'JetBrainsMono-Regular', 
    marginBottom: 12,
  },
  featureHighlight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CBEED8', // Light green
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#106B40', // Darker green border
  },
  featureText: {
    fontSize: 14,
    color: '#106B40', // Darker green text
    fontWeight: '600',
    marginLeft: 8,
    fontFamily: 'JetBrainsMono-Regular', // Updated to JetBrains Mono
  },

  // Image Section
  imageSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imageContainer: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  // Button Section
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
    gap: 11,
  },
  
  // Primary Button (Sign In)
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.85,
    height: 56,
    borderRadius: 20,
    backgroundColor: '#FF9A9A', // Light coral
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'JetBrainsMono-Regular', // Updated to JetBrains Mono
  },
  
  // Secondary Button (Create Account)
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.85,
    height: 56,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF9A9A',
  },
  secondaryButtonText: {
    color: '#FF5252',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'JetBrainsMono-Regular', // Updated to JetBrains Mono
  },
  
  // Tertiary Button (Guest)
  tertiaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.85,
    height: 56,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tertiaryButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'JetBrainsMono-Regular', // Updated to JetBrains Mono
  },
  
  buttonIcon: {
    marginRight: 10,
  },
});