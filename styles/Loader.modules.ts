import { Animated, StyleSheet } from 'react-native';

export const loaderStyles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  loaderContent: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
    padding: 32,
  },
  logoImage: {
    width: 80,
    height: 80,
    backgroundColor: 'transparent',
  },
  loadingText: {
    fontFamily: 'System',
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});

// Animation functions for React Native
export const createAnimations = () => {
  const heartbeatValue = new Animated.Value(1);
  const fadeValue = new Animated.Value(0.6);

  const heartbeatAnimation = Animated.loop(
    Animated.sequence([
      Animated.timing(heartbeatValue, { toValue: 1.1, duration: 375, useNativeDriver: true }),
      Animated.timing(heartbeatValue, { toValue: 0.9, duration: 225, useNativeDriver: true }),
      Animated.timing(heartbeatValue, { toValue: 1.1, duration: 300, useNativeDriver: true }),
      Animated.timing(heartbeatValue, { toValue: 1, duration: 600, useNativeDriver: true }),
    ])
  );

  const fadeAnimation = Animated.loop(
    Animated.sequence([
      Animated.timing(fadeValue, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(fadeValue, { toValue: 0.6, duration: 1000, useNativeDriver: true }),
    ])
  );

  return {
    heartbeatValue,
    fadeValue,
    heartbeatAnimation,
    fadeAnimation,
  };
};