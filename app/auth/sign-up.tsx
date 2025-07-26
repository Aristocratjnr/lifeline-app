import { Asset } from 'expo-asset';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Dimensions,
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

Dimensions.get('window');
const SignUpScreen = () => {
  const { t } = useTranslation();
  const [rememberMe, setRememberMe] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  // Load JetBrains Mono font
  const [fontsLoaded] = useFonts({
    'JetBrainsMono-Regular': require('../../assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('../../assets/fonts/JetBrainsMono-Bold.ttf'),
  });

  useEffect(() => {
    async function loadAssets() {
      await Asset.loadAsync([
        require('../../assets/images/background.jpg'),
        require('../../assets/images/signup.png'),
        require('../../assets/images/woman.png'),
        require('../../assets/images/mail.png'),
        require('../../assets/images/lock.png'),
        require('../../assets/images/unlock.png'),
      ]);
      setIsReady(true);
    }
    loadAssets();
  }, []);

  if (!isReady || !fontsLoaded) {
    return <Loader isLoading={true} />;
  }

  return (
    <>
      {/* Full-screen background image */}
      <ImageBackground 
        source={require('../../assets/images/background.jpg')} 
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      
      {/* Blur overlay for the entire screen */}
      <BlurView intensity={100} tint="light" style={StyleSheet.absoluteFillObject} />
      
      {/* Content */}
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.container}>
                <Image source={require('../../assets/images/signup.png')} style={styles.headerImage} />
                <Text style={styles.headerText}>{t('auth.signUp.joinCommunity')}</Text>

                <View style={styles.formCard}>
                <Text style={styles.welcomeText}>{t('auth.signUp.welcome')}</Text>
                <Text style={styles.title}>{t('auth.signUp.title')}</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>{t('auth.signUp.nameLabel')}</Text>
                    <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder={t('auth.signUp.namePlaceholder')}
                        placeholderTextColor="#999"
                    />
                    <Image source={require('../../assets/images/user.png')} style={styles.inputIcon} />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>{t('auth.signUp.emailLabel')}</Text>
                    <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder={t('auth.signUp.emailPlaceholder')}
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Image source={require('../../assets/images/mail.png')} style={styles.inputIcon} />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>{t('auth.signUp.passwordLabel')}</Text>
                    <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder={t('auth.signUp.passwordPlaceholder')}
                        placeholderTextColor="#999"
                        secureTextEntry
                    />
                    <Image source={require('../../assets/images/lock.png')} style={styles.inputIcon} />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm your password"
                        placeholderTextColor="#999"
                        secureTextEntry
                    />
                    <Image source={require('../../assets/images/unlock.png')} style={styles.inputIcon} />
                    </View>
                </View>

                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                    style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
                    onPress={() => setRememberMe(!rememberMe)}
                    >
                    {rememberMe && <Text style={styles.checkboxCheck}>✓</Text>}
                    </TouchableOpacity>
                    <Text style={styles.checkboxLabel}>{t('buttons.rememberMe')}</Text>
                </View>

                <TouchableOpacity style={styles.signUpButton}>
                    <Text style={styles.signUpButtonText}>{t('buttons.signUp')}</Text>
                    <Image source={require('../../assets/images/sign.png')} style={styles.soundIcon} />
                </TouchableOpacity>

                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>OR</Text>
                    <View style={styles.divider} />
                </View>

                <TouchableOpacity style={styles.googleButton}>
                    <Image source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }} style={styles.googleIcon} />
                    <Text style={styles.googleButtonText}>{t('buttons.continueWithGoogle')}</Text>
                </TouchableOpacity>

                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>{t('auth.signUp.alreadyHaveAccount')} </Text>
                    <Link href="/auth/sign-in" asChild>
                        <TouchableOpacity>
                            <Text style={styles.loginLink}>{t('buttons.login')}</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    container: {
        alignItems: 'center',
    },
    headerImage: {
        width: 200,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    headerText: {
        fontSize: 14,
        color: '#444',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'JetBrainsMono-Bold',
    },
    formCard: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 14,
        color: '#777',
        textAlign: 'left',
        marginBottom: 5,
        fontFamily: 'JetBrainsMono-Regular',
        letterSpacing: 0.5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 20,
        fontFamily: 'JetBrainsMono-Bold',
        color: '#222',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 13,
        color: '#333',
        marginBottom: 5,
        fontFamily: 'JetBrainsMono-Regular',
        fontWeight: '500',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 14,
        paddingHorizontal: 12,
        backgroundColor: 'white',
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 14,
        fontFamily: 'JetBrainsMono-Regular',
        color: '#333',
    },
    inputIcon: {
        width: 18,
        height: 18,
        marginLeft: 10,
        opacity: 0.7,
    },
    soundIcon: {
        width: 14,
        height: 14,
        marginLeft: 5,
        tintColor: '#fff',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 5,
    },
    checkbox: {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 3,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#ff0000',
        borderColor: '#ff0000',
    },
    checkboxCheck: {
        color: 'white',
        fontFamily: 'JetBrainsMono-Bold',
        fontSize: 10,
    },
    checkboxLabel: {
        fontSize: 13,
        color: '#555',
        fontFamily: 'JetBrainsMono-Regular',
    },
    signUpButton: {
        backgroundColor: '#FF0000',
        paddingVertical: 13,
        borderRadius: 50,
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signUpButtonText: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'JetBrainsMono-Bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#555',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#aaa',
        fontSize: 13,
        fontFamily: 'JetBrainsMono-Regular',
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 12,
        borderRadius: 50,
    },
    googleIcon: {
        width: 18,
        height: 18,
        marginRight: 10,
    },
    googleButtonText: {
        fontSize: 14,
        color: '#555',
        fontFamily: 'JetBrainsMono-Bold',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    loginText: {
        fontSize: 13,
        color: '#555',
        fontFamily: 'JetBrainsMono-Bold',
    },
    loginLink: {
        fontSize: 13,
        color: '#ff0000',
        fontFamily: 'JetBrainsMono-Bold',
    },
});
