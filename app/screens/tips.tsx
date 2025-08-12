import { useFonts } from 'expo-font';
import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const red = '#FC1C1C';

export default function TipsScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  // Re-render when language changes
  React.useEffect(() => {
    const handleLanguageChanged = () => {
      console.log("Language changed in TipsScreen - forcing update");
    };
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);
  const [fontsLoaded] = useFonts({
      'FjallaOne-Regular': require('@/assets/fonts/FjallaOne-Regular.ttf'),
      'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'), 
    });

  const handleNext = () => {
    router.replace('/screens/unique');
  };

  if (!fontsLoaded) {
    return null;
  }

  // Force re-render on language change
  return (
    <View style={styles.container} key={`tips-${i18n.language}`}>
      {/* Blurred Background Image */}
      <ExpoImage
        source={require('@/assets/images/blur.png')}
        style={styles.bgImage}
        blurRadius={6}
        contentFit="cover"
      />
      {/* Light brown overlay for tint */}
      <View style={styles.bgOverlay} />
      {/* Background Curves */}
      <ExpoImage 
        source={require('@/assets/images/top.png')}
        style={styles.topCurve}
        contentFit="cover"
      />
      <ExpoImage 
        source={require('@/assets/images/bottom.png')}
        style={styles.bottomCurve}
        contentFit="cover"
      />

      {/* Main Content */}
      <View style={styles.content}>
        <ExpoImage
          source={require('@/assets/images/tips.png')}
          style={styles.illustration}
          contentFit="contain"
        />

        <Text style={styles.title}>
          {t('tips.title')}
        </Text>

        <Text style={styles.subtitle}>
          {t('tips.subtitle')}
        </Text>

        {/* Pagination Dots */}
        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Next Button */}
        <TouchableOpacity 
          style={styles.nextButton} 
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.nextButtonText}>
            {t('buttons.next')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 3,
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
  illustration: {
    width: width * 0.95,
    height: height * 0.4,
    marginBottom: 0,
    marginTop: 150,
  },
  title: {
    fontSize: 36,
    color: '#222',
    textAlign: 'center',
    fontFamily: 'FjallaOne-Regular',
    marginTop: 0,
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
   subtitle: {
    fontSize: 17,
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
    backgroundColor: '#D9D9D9',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: red,
    width: 18,
  },
 nextButton: {
    backgroundColor: red,
    borderRadius: 20,
    paddingHorizontal: 48,
    paddingVertical: 10,
    marginBottom: 64,
    alignSelf: 'center',
    shadowColor: red,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,           
    borderColor: '#000',      
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});