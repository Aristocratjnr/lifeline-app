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
       {/* Blurred Background Image */}
            <Image
              source={require('@/assets/images/blur.png')}
              style={styles.bgImage}
              blurRadius={6}
              resizeMode="cover"
            />
            {/* Light brown overlay for tint */}
            <View style={styles.bgOverlay} />

      {/* Top Left Curve */}
      <Image
        source={require('@/assets/images/top.png')}
        style={styles.topCurve}
        resizeMode="cover"
      />
      {/* Bottom Right Curve */}
      <Image
        source={require('@/assets/images/bottom.png')}
        style={styles.bottomCurve}
        resizeMode="cover"
      />

      {/* Center Card with animation */}
      <Animated.View
        style={[
          styles.centerCard,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
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
  centerCard: {
    width: width * 0.75,
    height: width * 0.75, 
    backgroundColor: 'transparent',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    zIndex: 1,
    shadowColor: pink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  logoImage: {
    width: width * 0.65,
    height: width * 0.65,
  }
});