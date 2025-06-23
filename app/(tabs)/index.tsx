import { FontAwesome } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../../components/Loader';

export default function HomeScreen() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadAssets() {
      await Asset.loadAsync([
        require('@/assets/images/woman.png'),
      ]);
      setIsReady(true);
    }
    loadAssets();
  }, []);

  if (!isReady) {
    return <Loader isLoading={true} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Welcome to Lifeline</Text>
        <Text style={styles.subtitle}>Your trusted first aid & emergency companion</Text>
        <Image
          source={require('@/assets/images/woman.png')}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.buttonContainer}>
          <Link href="/auth/sign-in" asChild>
            <TouchableOpacity style={styles.button} activeOpacity={0.85}>
              <FontAwesome name="sign-in" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/auth/sign-up" asChild>
            <TouchableOpacity style={styles.button} activeOpacity={0.85}>
              <FontAwesome name="user-plus" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FC7A7A',
    marginBottom: 8,
    letterSpacing: 1,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 32,
    textAlign: 'center',
    fontWeight: '500',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'transparent',
    marginBottom: 36,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 18,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 220,
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: '#FC7A7A',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#FC7A7A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  signUpButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#FC7A7A',
    shadowColor: '#FC7A7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 4,
  },
  signUpButtonText: {
    color: '#FC7A7A',
  },
  signUpButtonIcon: {
    marginRight: 10,
  },
});
