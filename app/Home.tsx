import { FontAwesome } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import { useFonts } from 'expo-font';
import { Image as ExpoImage } from 'expo-image';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../components/Loader';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { t } = useTranslation();
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
    <SafeAreaProvider>
      {/* Set status bar with light content since background is colored */}
      <StatusBar barStyle="dark-content" backgroundColor="#FBDAD8" />
      
      {/* Background that fills the entire screen */}
      <View style={styles.fullBackground} />
      
      {/* Content wrapped in SafeAreaView */}
      <SafeAreaView style={styles.container} edges={['right', 'left']}>
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.logoContainer}>
              <ExpoImage
                source={require('@/assets/images/logo.png')}
                style={styles.logo}
                contentFit="contain"
              />
            </View>
            
            <Text style={styles.title}>{t('home.title')}</Text>
            
            <Text style={styles.subtitle}>
              {t('home.subtitle')}
            </Text>
            
            <View style={styles.featureHighlight}>
              <FontAwesome name="shield" size={16} color="#106B40" />
              <Text style={styles.featureText}>{t('home.featureText')}</Text>
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
                <Text style={styles.primaryButtonText}>{t('home.signIn')}</Text>
              </TouchableOpacity>
            </Link>
            
            <Link href="/auth/sign-up" asChild>
              <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.85}>
                <FontAwesome name="user-plus" size={18} color="#FF5252" style={styles.buttonIcon} />
                <Text style={styles.secondaryButtonText}>{t('home.createAccount')}</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/screens/guest" asChild>
              <TouchableOpacity style={styles.tertiaryButton} activeOpacity={0.85}>
                <Image 
                source={require('@/assets/images/guest.png')} 
                style={styles.guestIcon} 
                resizeMode="contain"
              />
                <Text style={styles.tertiaryButtonText}>{t('home.continueAsGuest')}</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // Full screen background that extends behind safe areas
  fullBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#FBDAD8', 
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  guestIcon: {
  width: 22,
  height: 22,
  marginRight: 10,
},
  
  // Header Section
  headerSection: {
    alignItems: 'center',
    width: '100%',
    marginTop: 48,
    marginBottom: 20,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#FC3737',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: '#FC3737',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FC3737', 
    marginBottom: 8,
    fontFamily: 'JetBrainsMono-Regular', 
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'JetBrainsMono-Regular', 
    marginBottom: 12,
  },
  featureHighlight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CBEED8', 
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#106B40', 
  },
  featureText: {
    fontSize: 14,
    color: '#106B40',
    fontWeight: '600',
    marginLeft: 8,
    fontFamily: 'JetBrainsMono-Regular', 
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

  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 11,
  },
  
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.85,
    height: 56,
    borderRadius: 20,
    backgroundColor: '#FF9A9A', 
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'JetBrainsMono-Regular', 
  },
  
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
    fontFamily: 'JetBrainsMono-Regular', 
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
    fontFamily: 'JetBrainsMono-Regular',
  },
  
  buttonIcon: {
    marginRight: 10,
  },
});