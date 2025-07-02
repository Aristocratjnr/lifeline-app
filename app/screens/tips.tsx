import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const red = '#FC1C1C';

export default function TipsScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
      'Flavours': require('@/assets/fonts/Flavors-Regular.ttf'), 
      'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'), 
    });

  const handleNext = () => {
    router.replace('/screens/unique');
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Blurred Background Image */}
      <Image
        source={require('@/assets/images/blur.png')}
        style={styles.bgImage}
        blurRadius={6}
        resizeMode="cover"
      />
      {/* Light brown overlay for tint */}
      <View style={styles.bgOverlay} />
      {/* Background Curves */}
      <Image 
        source={require('@/assets/images/top.png')}
        style={styles.topCurve}
        resizeMode="cover"
      />
      <Image 
        source={require('@/assets/images/bottom.png')}
        style={styles.bottomCurve}
        resizeMode="cover"
      />

      {/* Main Content */}
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/tips.png')}
          style={styles.illustration}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          Instant First Aid at{'\n'}
          Your Fingertips
        </Text>

        <Text style={styles.subtitle}>
          Get clear, Step-by-step{'\n'}
          instructions for any emergency,{'\n'}
          even without internet
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
          <Text style={styles.nextButtonText}>NEXT</Text>
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
    backgroundColor: 'rgba(185, 171, 154, 0.32)', 
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
    marginTop: 100,
  },
  title: {
    fontSize: 40,
    color: '#222',
    textAlign: 'center',
    fontFamily: 'Flavours', 
    marginTop: 0,
    marginBottom: 8,
    letterSpacing: 1,
  },
   subtitle: {
    fontSize: 17,
    color: '#000000',
    textAlign: 'center',
    fontWeight: '900', 
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
    backgroundColor: '#FFFFFF',
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