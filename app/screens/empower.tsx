import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const pink = '#FA9D9D';
const red = '#FC1C1C';

export default function EmpowerScreen() {
  const router = useRouter();

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

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.background} />
      
      {/* Top curve */}
      <View style={styles.topCurve} />
      
      {/* Bottom curve */}
      <View style={styles.bottomCurve} />

      {/* Bandaid illustration */}
      <View style={styles.blueCircle}>
        <Image 
          source={require('@/assets/images/cotton.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Title with Caveat font */}
      <Text style={styles.title}>Confidence and Empowerment</Text>

      {/* Description with JetBrains Mono font */}
      <Text style={styles.description}>
        Use our interactive tools and daily tips to build life-saving skills and stay prepared always
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
    backgroundColor: pink,
    borderBottomRightRadius: width * 0.7,
    zIndex: 1,
  },
  bottomCurve: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: width * 0.5,
    height: height * 0.25,
    backgroundColor: pink,
    borderTopLeftRadius: width * 0.7,
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
    fontSize: 34,
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