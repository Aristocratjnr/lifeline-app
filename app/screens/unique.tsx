import { useFonts } from 'expo-font';
import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const { width, height } = Dimensions.get('window');
const red = '#FC1C1C';

export default function UniqueScreen() {
  const router = useRouter();

  // Load the fonts
  const [fontsLoaded] = useFonts({
    'LuckiestGuy-Regular': require('@/assets/fonts/LuckiestGuy-Regular.ttf'),
    'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
  });

  // Use a loading state instead
  if (!fontsLoaded) {
    return <View style={styles.loadingContainer} />;
  }

  const handleNext = () => {
    router.push('/screens/empower');
  };

  return (
    <View style={styles.container}>
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

      {/* Medical staff illustration */}
      <ExpoImage 
        source={require('@/assets/images/serve.png')}
        style={styles.illustration}
        contentFit="contain"
      />

      {/* Title with Luckiest Guy font */}
      <Text style={styles.title}>PREPARE FOR YOUR UNIQUE NEEDS</Text>

      {/* Description with JetBrains Mono font */}
      <Text style={styles.description}>
        Store your medical history, allergies, and emergency contacts for quick access by you or first responders
      </Text>

      {/* Pagination dots */}
      <View style={styles.dotsContainer}>
        <View style={[styles.dot]} />
        <View style={[styles.dot]} />
        <View style={[styles.dot, styles.activeDot]} />
        <View style={[styles.dot]} />
        <View style={[styles.dot]} />
      </View>

      {/* Next button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
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
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF9F9',
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
  illustration: {
    width: width * 0.8,
    height: height * 0.45,
    marginTop: height * 0.1,
    marginBottom: 0, // Removed bottom margin
    zIndex: 2,
  },
  title: {
    fontSize: 34,
    textAlign: 'center',
    color: 'black',
    marginHorizontal: 30,
    marginTop: 0, 
    zIndex: 2,
    fontFamily: 'LuckiestGuy-Regular',
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
