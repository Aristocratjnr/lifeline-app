import { useFonts } from 'expo-font';
import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const red = '#FC1C1C';

export default function EmpowerScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  // Re-render when language changes
  React.useEffect(() => {
    const handleLanguageChanged = () => {
      console.log("Language changed in EmpowerScreen - forcing update");
    };
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  // Load the fonts
  const [fontsLoaded] = useFonts({
    'Caveat-Regular': require('@/assets/fonts/Caveat-Bold.ttf'),
    'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
  });

  // Use a loading state instead
  if (!fontsLoaded) {
    return <View style={styles.loadingContainer} />;
  }

  const handleNext = () => {
    router.push('/screens/doctor'); // Update this to your next screen route
  };

  // Force re-render on language change
  return (
    <View style={styles.container} key={`empower-${i18n.language}`}>
      {/* Background */}
      <View style={styles.background} />
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

      {/* Bandaid illustration */}
      <View style={styles.blueCircle}>
        <ExpoImage 
          source={require('@/assets/images/cotton.png')}
          style={styles.illustration}
          contentFit="contain"
        />
      </View>

      {/* Title with Caveat font */}
      <Text style={styles.title}>
        {i18n.language === 'twi' 
          ? "Ahoɔden ne Ahoɔdennie" 
          : "Confidence and Empowerment"}
      </Text>

      {/* Description with JetBrains Mono font */}
      <Text style={styles.description}>
        {i18n.language === 'twi'
          ? "Fa yɛn nkitahodie nneɛma ne dabiara afotuo di dwuma kyerɛ nkwa-nkwagyeɛ nyansa na woasiesie wo ho daa"
          : "Use our interactive tools and daily tips to build life-saving skills and stay prepared always"}
      </Text>

      {/* Pagination dots */}
      <View style={styles.dotsContainer}>
        <View style={[styles.dot]} />
        <View style={[styles.dot]} />
        <View style={[styles.dot]} />
        <View style={[styles.dot, styles.activeDot]} />
        <View style={[styles.dot]} />
      </View>

      {/* Next button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>
          {i18n.language === 'twi' ? "NKANODƆ" : "NEXT"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFF9F9',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF9F9',
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
    backgroundColor: '#FFF9F9',
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
  blueCircle: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: '#A8D5F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.20,
    zIndex: 2,
  },
  illustration: {
    width: width * 0.5,
    height: width * 0.5,
    zIndex: 3,
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    color: 'black',
    marginHorizontal: 20,
    marginTop: 30,
    zIndex: 2,
    fontFamily: 'Caveat-Regular',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 17,
    textAlign: 'center',
    color: '#000000',
    marginHorizontal: 40,
    marginTop: 20,
    lineHeight: 24,
    zIndex: 2,
    fontFamily: 'JetBrainsMono-Regular',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    zIndex: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: red,
    width: 18,
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
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});