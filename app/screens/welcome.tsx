import { useFonts } from 'expo-font';
import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const red = '#FC1C1C';

export default function OnboardingScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  // Re-render when language changes
  React.useEffect(() => {
    const handleLanguageChanged = () => {
      console.log("Language changed in WelcomeScreen - forcing update");
    };
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);
  const [fontsLoaded] = useFonts({
    'Flavours': require('@/assets/fonts/Flavors-Regular.ttf'), 
    'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'), 
  });

  const handleNext = () => {
    router.push('/screens/tips');  
  };

  if (!fontsLoaded) {
    return null;
  }

  // Force re-render on language change
  return (
  <View style={styles.container} key={`welcome-${i18n.language}`}>
     {/* Blurred Background Image */}
          <ExpoImage
            source={require('@/assets/images/blur.png')}
            style={styles.bgImage}
            blurRadius={6}
            contentFit="cover"
          />
          {/* Light brown overlay for tint */}
          <View style={styles.bgOverlay} />

    {/* Top Left Curve */}
    <ExpoImage
      source={require('@/assets/images/top.png')}
      style={styles.topCurve}
      contentFit="cover"
    />
    {/* Bottom Right Curve */}
    <ExpoImage
      source={require('@/assets/images/bottom.png')}
      style={styles.bottomCurve}
      contentFit="cover"
    />

    {/* Illustration */}
    <View style={styles.illustrationContainer}>
      <ExpoImage
        source={require('@/assets/images/help.png')}
        style={styles.illustration}
        contentFit="contain"
      />
    </View>

    {/* Title */}
    <Text style={styles.title}>
      {t('welcome.title')}
    </Text>

    {/* Subtitle */}
    <Text style={styles.subtitle}>
      {t('welcome.subtitle')}
    </Text>

    {/* Pagination Dots */}
    <View style={styles.dotsContainer}>
      <View style={[styles.dot, styles.activeDot]} />
      <View style={styles.dot} />
      <View style={styles.dot} />
      <View style={styles.dot} />
      <View style={styles.dot} />
    </View>

    {/* Next Button */}
    <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.85}>
      <Text style={styles.nextButtonText}>
        {t('buttons.next')}
      </Text>
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'flex-start',
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
  },
  illustrationContainer: {
    marginTop: height * 0.23, 
    width: width * 0.93,
    height: height * 0.38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 40,
    color: '#222',
    textAlign: 'center',
    fontFamily: 'Flavours', 
    marginTop: 8,
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginHorizontal: 24,
    marginBottom: 24,
    lineHeight: 22,
    letterSpacing: 0.2,
    fontFamily: 'JetBrainsMono-Regular',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 120, 
    marginTop: 2,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: red,
    width: 18,
    borderRadius: 6,
  },
nextButton: {
  backgroundColor: red,
  paddingVertical: 12,
  paddingHorizontal: 50,
  borderRadius: 50,
  marginTop: 20,
  position: 'absolute',
  bottom: height * 0.05,
  zIndex: 2,
  borderWidth: 2,          
  borderColor: '#000000',  
},
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
});