import { Asset } from 'expo-asset';
import { BlurView } from 'expo-blur';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Loader from '../../components/Loader';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadAssets() {
      await Asset.loadAsync([
        require('../../assets/images/background.jpg'),
        require('../../assets/images/medical-kit.png'),
      ]);
      setIsReady(true);
    }
    loadAssets();
  }, []);

  if (!isReady) {
    return <Loader isLoading={true} />;
  }

  const handleSignIn = () => {
    // TODO: Implement sign in logic
    router.replace('/dashboard');
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign in logic
    alert('Google sign in logic goes here');
  };

  return (
    <>
      {/* Full-screen background image */}
      <ImageBackground 
        source={require('../../assets/images/background.jpg')} 
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      
      {/* Blur overlay for the entire screen */}
      <BlurView intensity={70} tint="light" style={StyleSheet.absoluteFillObject} />
      
      {/* Content */}
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Don&apos;t have an account?</Text>
                <Link href="/auth/sign-up" asChild>
                    <TouchableOpacity>
                        <Text style={styles.signUpLink}>Sign Up</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            <Image source={require('../../assets/images/medical-kit.png')} style={styles.headerImage} />
          

            <View style={styles.formCard}>
            <Text style={styles.welcomeText}>Welcome back <Text style={{ fontWeight: 'bold' }}>LIFELINER!</Text></Text>
            <Text style={styles.title}>Sign in to your account</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="username@example.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                />
                <Image source={require('../../assets/images/mail.png')} style={styles.inputIcon} />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#999"
                />
                {/* Eye icon would go here */}
                </View>
            </View>

            <View style={styles.optionsRow}>
                <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkboxRow}>
                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                    {rememberMe && <Text style={styles.checkboxCheck}>✓</Text>}
                </View>
                <Text style={styles.rememberMeText}>Remember me</Text>
                </TouchableOpacity>
                <Link href="/auth/forgot-password" asChild>
                    <TouchableOpacity>
                        <Text style={styles.forgotText}>Forgot password?</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                <Text style={styles.signInButtonText}>Sign In →</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.divider} />
            </View>

            <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
                <Image source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }} style={styles.googleIcon} />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent', // Important to see the background
  },
  background: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
  },
  scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 20,
  },
  container: {
      alignItems: 'center',
  },
  header: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 20,
  },
  headerText: {
      fontSize: 14,
      color: '#555',
  },
  signUpLink: {
      fontSize: 14,
      color: '#ff4d4f',
      fontWeight: 'bold',
      marginLeft: 5,
  },
  headerImage: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
      marginBottom: 10,
  },
  slogan: {
      fontSize: 16,
      color: '#555',
      textAlign: 'center',
      marginBottom: 20,
      fontStyle: 'italic',
  },
  formCard: {
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 15,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
  },
  welcomeText: {
      fontSize: 16,
      color: '#888',
      textAlign: 'left',
      marginBottom: 5,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: 20,
  },
  inputContainer: {
      marginBottom: 15,
  },
  label: {
      fontSize: 14,
      color: '#333',
      marginBottom: 5,
  },
  inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 15,
      backgroundColor: 'white',
  },
  input: {
      flex: 1,
      height: '100%',
  },
  inputIcon: {
      width: 20,
      height: 20,
      marginLeft: 10,
  },
  optionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
  },
  checkboxRow: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  checkbox: {
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 3,
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },
  checkboxChecked: {
      backgroundColor: '#ff4d4f',
      borderColor: '#ff4d4f',
  },
  checkboxCheck: {
      color: 'white',
      fontWeight: 'bold',
  },
  rememberMeText: {
      fontSize: 14,
  },
  forgotText: {
      color: '#ff4d4f',
      fontSize: 14,
      fontWeight: 'bold',
  },
  signInButton: {
      backgroundColor: '#ff4d4f',
      paddingVertical: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 20,
  },
  signInButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
  },
  dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
  },
  divider: {
      flex: 1,
      height: 1,
      backgroundColor: '#eee',
  },
  dividerText: {
      marginHorizontal: 10,
      color: '#aaa',
  },
  googleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
      paddingVertical: 15,
      borderRadius: 8,
  },
  googleIcon: {
      width: 20,
      height: 20,
      marginRight: 10,
  },
  googleButtonText: {
      fontSize: 16,
      color: '#333',
  },
});
