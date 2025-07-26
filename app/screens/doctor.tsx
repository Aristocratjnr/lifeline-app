import { useFonts } from 'expo-font';
import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const maroon = '#8E2A2A';

export default function DoctorScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  // State to force re-render when language changes
  const [, setLanguageUpdate] = React.useState(0);

  // Re-render when language changes
  React.useEffect(() => {
    const handleLanguageChanged = () => {
      console.log("Language changed in DoctorScreen - forcing update");
      // Force re-render by updating state
      setLanguageUpdate(prev => prev + 1);
    };
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'Caveat-Regular': require('@/assets/fonts/Caveat-Bold.ttf'),
    'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer} />;
  }

  const handleGetStarted = () => {
    // Navigate to the next screen
    router.push('/Home');
  };

  const handlePrivacyPolicy = () => {
    // Navigate to privacy policy
    router.push('/screens/privacy-policy');
  };

  // Force re-render on language change
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']} key={`doctor-${i18n.language}`}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

     {/* Blurred Background Image */}
           <ExpoImage
             source={require('@/assets/images/blur.png')}
             style={styles.bgImage}
             blurRadius={6}
             contentFit="cover"
           />
           {/* Light brown overlay for tint */}
           <View style={styles.bgOverlay} />

         {/* Top curve */}
         <ExpoImage
           source={require('@/assets/images/top.png')}
           style={styles.topCurve}
           contentFit="cover"
         />

         {/* Bottom curve */}
         <ExpoImage
           source={require('@/assets/images/bottom.png')}
           style={styles.bottomCurve}
           contentFit="cover"
         />

      {/* Main content */}
      <View style={styles.content}>
        {/* Doctor illustration */}
        <View style={styles.illustrationContainer}>
          <ExpoImage
            source={require('@/assets/images/sir.png')}
            style={styles.doctorImage}
            contentFit="contain"
          />

          {/* Plus signs */}
          {[...Array(6)].map((_, index) => (
            <Text key={index} style={[styles.plusSign, {
              top: 50 + Math.random() * 200,
              left: 20 + Math.random() * (width - 40),
              opacity: 0.3 + Math.random() * 0.5,
              transform: [{ rotate: `${Math.random() * 90}deg` }]
            }]}>+</Text>
          ))}
        </View>

        {/* Text sections - No margin/padding between image and title */}
        <Text style={styles.title}>{t('doctor.title')}</Text>

        <Text style={styles.description}>
          {t('doctor.description')}
        </Text>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>{t('doctor.getStarted')}</Text>
        </TouchableOpacity>

        {/* Privacy Policy */}
        <TouchableOpacity onPress={handlePrivacyPolicy}>
          <Text style={styles.privacyText}>{t('doctor.privacyPolicy')}</Text>
        </TouchableOpacity>
      </View>

      {/* Home indicator line for notched devices */}
      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: 0,
    opacity: 0.09,
  },
  bgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(228, 225, 220, 0.32)',
    zIndex: 1,
  },
  background: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: '#fff',
    zIndex: 0,
  },
  topCurve: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.5,
    height: height * 0.25,
    zIndex: 1,
  },
  bottomCurve: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: width * 0.5,
    height: height * 0.25,
    zIndex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 2,
    justifyContent: 'center',
  },
  illustrationContainer: {
    width: width * 0.9,
    height: height * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: height * 0.05,
    marginBottom: 0,
  },
  doctorImage: {
    width: width * 0.8,
    height: height * 0.45,
    marginBottom: -10,
  },
  // Other icon styles remain the same
  plusSign: {
    color: maroon,
    fontSize: 24,
    position: 'absolute',
    zIndex: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginTop: 0,
    textAlign: 'center',
    fontFamily: 'Caveat-Regular',
    color: '#000',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10, // Reduced top margin
    marginBottom: 20,
    paddingHorizontal: 20,
    fontFamily: 'JetBrainsMono-Regular',
    lineHeight: 22,
    color: '#222',
  },
  button: {
    backgroundColor: '#FC7C7C',
    width: width * 0.85,
    height: 56,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 38,
    borderWidth: 1,
    borderColor: maroon,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Regular',
  },
  privacyText: {
    fontSize: 14,
    color: '#444',
    marginTop: 16,
    textDecorationLine: 'underline',
    fontFamily: 'JetBrainsMono-Regular',
  },
  homeIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#222',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
});