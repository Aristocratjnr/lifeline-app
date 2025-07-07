import { useFonts } from 'expo-font';
import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const pink = '#F9A6A6';

export default function CompletedScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'Flavours': require('@/assets/fonts/Flavors-Regular.ttf'),
    'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleGoHome = () => {
    router.replace('/Home');
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ExpoImage
        source={require('@/assets/images/bg.png')}
        style={styles.bgImage}
        contentFit="cover"
        blurRadius={0}
      />
      {/* Overlay for readability */}
      <View style={styles.overlay} />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>YOU ARE SET!!!</Text>
        <Text style={styles.subtitle}>
          Thank you for creating{"\n"}an account with us
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleGoHome} activeOpacity={0.85}>
          <Text style={styles.buttonText}>GO TO HOME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    opacity: 0.13,
    zIndex: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(255,255,255,0.7)',
    zIndex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    width: '100%',
  },
  title: {
    fontFamily: 'Flavours',
    fontSize: 32,
    color: '#222',
    textAlign: 'center',
    marginBottom: 18,
    marginTop: -10,
    letterSpacing: 1,
  },
  subtitle: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 18,
    color: '#222',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 26,
  },
  button: {
    backgroundColor: pink,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: '#B96A6A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 18,
    color: '#222',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
