import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const heartScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    // Heart pumping animation (loop)
    const pump = Animated.loop(
      Animated.sequence([
        Animated.timing(heartScale, {
          toValue: 1.15,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(heartScale, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    );
    pump.start();

    // Navigate after 4 seconds
    const timeout = setTimeout(() => {
      pump.stop();
      router.replace('/screens/welcome');
    }, 4000);

    return () => {
      clearTimeout(timeout);
      pump.stop();
    };
  }, [fadeAnim, scaleAnim, heartScale, router]);

  const handlePress = () => {
    router.replace('/screens/welcome');
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={handlePress}>
      {/* Top Left Curve */}
      <View style={styles.topCurve} />
      {/* Bottom Right Curve */}
      <View style={styles.bottomCurve} />

      {/* Logo with animation directly on background */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          zIndex: 3,
        }}
      >
        {/* Full logo image with pumping effect */}
        <Animated.View style={{ 
          transform: [{ scale: heartScale }], 
          alignSelf: 'center',
        }}>
          <Image 
            source={require('@/assets/images/logo.png')} 
            style={styles.logoImage} 
            resizeMode="contain"
          />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const pink = '#FC7A7A';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topCurve: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.65,
    height: height * 0.23,
    backgroundColor: pink,
    borderBottomRightRadius: width * 0.65,
    borderTopRightRadius: -200,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    zIndex: 2,
  },
  bottomCurve: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: width,
    height: height * 0.20,
    backgroundColor: pink,
    borderTopLeftRadius: 500,
    zIndex: 2,
    transform: [{ scaleX: 1.1 }],
  },
  logoImage: {
    width: width * 0.65,
    height: width * 0.65,
  }
});