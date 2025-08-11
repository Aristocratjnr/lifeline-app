import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import { BlurView } from 'expo-blur';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Animated,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
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
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showHelpCheck, setShowHelpCheck] = useState(false);
  const [checkComplete, setCheckComplete] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [feelingGood, setFeelingGood] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isTransitioningToAI, setIsTransitioningToAI] = useState(false);
  const checkAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  // State to force re-render when language changes
  const [, setLanguageUpdate] = React.useState(0);

  // Re-render when language changes
  React.useEffect(() => {
    const handleLanguageChanged = () => {
      console.log("Language changed in SignInScreen - forcing update");
      // Force re-render by updating state
      setLanguageUpdate(prev => prev + 1);
    };
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

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

  useEffect(() => {
    if (showHelpCheck) {
      setCheckComplete(false);
      setAnswered(false);
      setFeelingGood(false);
      setIsChecking(false);
      checkAnim.setValue(0);
    }
  }, [showHelpCheck, checkAnim]);

  useEffect(() => {
    if (answered && feelingGood && isChecking) {
      const timer = setTimeout(() => {
        setCheckComplete(true);
        setIsChecking(false);
        Animated.spring(checkAnim, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [answered, checkAnim, feelingGood, isChecking]);

  if (!isReady) {
    return <Loader isLoading={true} />;
  }

  const handleYes = () => {
    setAnswered(true);
    setFeelingGood(true);
    setIsChecking(true);
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign in logic
    alert('Google sign in logic goes here');
  };

  return (
    <>
      {/* Transition UI for AI Assistant */}
      {isTransitioningToAI && (
        <View style={styles.transitionOverlay}>
          <View style={styles.transitionCard}>
            <ActivityIndicator size="large" color="#E53935" style={{ marginBottom: 18 }} />
            <Text style={styles.transitionText}>Connecting you to AI Assistant...</Text>
          </View>
        </View>
      )}
      {/* Full-screen background image */}
      <ImageBackground 
        source={require('../../assets/images/background.jpg')} 
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      
      {/* Blur overlay for the entire screen */}
      <BlurView intensity={100} tint="light" style={StyleSheet.absoluteFillObject} />
      
      {/* Health Check Modal (only show if not transitioning to AI) */}
      {!isTransitioningToAI && (
        <Modal
          visible={showHelpCheck}
          transparent
          animationType="slide"
          onRequestClose={() => setShowHelpCheck(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Pressable style={styles.modalClose} onPress={() => setShowHelpCheck(false)}>
                <Text style={styles.modalCloseText}>×</Text>
              </Pressable>
              {!answered && !checkComplete ? (
                <>
                  <Ionicons name="heart" size={48} color="#E53935" style={{ marginBottom: 16 }} />
                  <Text style={styles.modalTitle}>{t('auth.signIn.healthCheck')}</Text>
                  <Text style={styles.modalText}>{t('auth.signIn.feelingGoodToday')}</Text>
                  <View style={{ flexDirection: 'row', marginTop: 18 }}>
                    <TouchableOpacity
                      style={[styles.modalConfirmButton, { backgroundColor: '#43A047', marginRight: 10 }]}
                      onPress={handleYes}
                    >
                      <Text style={styles.modalConfirmButtonText}>{t('auth.signIn.yes')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalConfirmButton, { backgroundColor: '#E53935' }]}
                      onPress={() => {
                        setAnswered(true);
                        setFeelingGood(false);
                        setShowHelpCheck(false);
                        setIsTransitioningToAI(true);
                        setTimeout(() => {
                          setIsTransitioningToAI(false);
                          router.replace('/ai-assistant');
                        }, 700);
                      }}
                    >
                      <Text style={styles.modalConfirmButtonText}>{t('auth.signIn.no')}</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : feelingGood && isChecking ? (
                <View style={{ alignItems: 'center' }}>
                  <Ionicons name="heart" size={48} color="#E53935" style={{ marginBottom: 16, opacity: 0.7 }} />
                  <Text style={styles.modalTitle}>{t('auth.signIn.checkingStatus')}</Text>
                  <ActivityIndicator size="large" color="#E53935" style={{ marginVertical: 18 }} />
                </View>
              ) : feelingGood && checkComplete ? (
                <Animated.View style={{ alignItems: 'center', opacity: checkAnim, transform: [{ scale: checkAnim.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) }] }}>
                  <Ionicons name="medkit" size={48} color="#43A047" style={{ marginBottom: 16 }} />
                  <Text style={[styles.modalTitle, { color: '#43A047' }]}>{t('auth.signIn.youAreGood')}</Text>
                  <Text style={styles.modalText}>{t('auth.signIn.allChecksPassed')}</Text>
                  <TouchableOpacity
                    style={[styles.modalConfirmButton, { backgroundColor: '#43A047' }]}
                    onPress={() => {
                      setShowHelpCheck(false);
                      setTimeout(() => router.replace('/dashboard'), 200);
                    }}
                  >
                    <Text style={styles.modalConfirmButtonText}>{t('buttons.proceedToDashboard')}</Text>
                  </TouchableOpacity>
                </Animated.View>
              ) : !feelingGood && answered ? (
                <View style={{ alignItems: 'center' }}>
                  <Ionicons name="sad" size={48} color="#E53935" style={{ marginBottom: 16 }} />
                  <Text style={[styles.modalTitle, { color: '#E53935' }]}>{t('auth.signIn.takeCare')}</Text>
                  <Text style={styles.modalText}>{t('auth.signIn.rememberToRest')}</Text>
                  <TouchableOpacity
                    style={[styles.modalConfirmButton, { backgroundColor: '#E53935', marginTop: 10 }]}
                    onPress={() => setShowHelpCheck(false)}
                  >
                    <Text style={styles.modalConfirmButtonText}>{t('auth.signIn.close')}</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>
        </Modal>
      )}
      
      {/* Content */}
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
              <View style={styles.header}>
                  <Text style={styles.headerText}>{t('auth.signIn.noAccount')}</Text>
                  <Link href="/auth/sign-up" asChild>
                      <TouchableOpacity>
                          <Text style={styles.signUpLink}>{t('buttons.signUp')}</Text>
                      </TouchableOpacity>
                  </Link>
              </View>

              <Image source={require('../../assets/images/medical-kit.png')} style={styles.headerImage} />
            
              <View style={styles.formCard}>
              <Text style={styles.welcomeText}>{t('auth.signIn.welcomeBack')} <Text style={{ fontWeight: 'bold' }}>LIFELINER!</Text></Text>
              <Text style={styles.title}>{t('auth.signIn.title')}</Text>

              <View style={styles.inputContainer}>
                  <Text style={styles.label}>{t('auth.signIn.emailLabel')}</Text>
                  <View style={styles.inputWrapper}>
                  <TextInput
                      style={styles.input}
                      placeholder={t('auth.signIn.emailPlaceholder')}
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
                  <Text style={styles.label}>{t('auth.signIn.passwordLabel')}</Text>
                  <View style={styles.inputWrapper}>
                  <TextInput
                      style={styles.input}
                      placeholder={t('auth.signIn.passwordPlaceholder')}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      placeholderTextColor="#999"
                  />
                  <Image source={require('../../assets/images/lock.png')} style={styles.inputIcon} />
                  </View>
              </View>

              <View style={styles.optionsRow}>
                  <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkboxRow}>
                  <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                      {rememberMe && <Text style={styles.checkboxCheck}>✓</Text>}
                  </View>
                  <Text style={styles.rememberMeText}>{t('buttons.rememberMe')}</Text>
                  </TouchableOpacity>
                  <Link href="/auth/forgot-password" asChild>
                      <TouchableOpacity>
                          <Text style={styles.forgotText}>{t('buttons.forgotPassword')}</Text>
                      </TouchableOpacity>
                  </Link>
              </View>

              <TouchableOpacity style={styles.signInButton} onPress={() => setShowHelpCheck(true)}>
                  <Text style={styles.signInButtonText}>{t('buttons.signIn')} →</Text>
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.divider} />
              </View>

              <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
                  <Image source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }} style={styles.googleIcon} />
                  <Text style={styles.googleButtonText}>{t('buttons.continueWithGoogle')}</Text>
              </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent', 
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
      fontFamily: 'JetBrainsMono-Regular',
  },
  signUpLink: {
      fontSize: 14,
      color: '#ff4d4f',
      fontWeight: 'bold',
      marginLeft: 5,
      fontFamily: 'JetBrainsMono-Regular',
  },
  headerImage: {
      width: 210,
      height: 210,
      resizeMode: 'contain',
      marginBottom: 10,
  },
  slogan: {
      fontSize: 16,
      color: '#555',
      textAlign: 'center',
      marginBottom: 20,
      fontStyle: 'italic',
      fontFamily: 'JetBrainsMono-Regular',
  },
  formCard: {
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 15,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 10,
  },
  welcomeText: {
      fontSize: 16,
      color: '#888',
      textAlign: 'left',
      marginBottom: 5,
      fontFamily: 'JetBrainsMono-Regular',
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: 20,
      fontFamily: 'JetBrainsMono-Bold',
  },
  inputContainer: {
      marginBottom: 15,
  },
  label: {
      fontSize: 14,
      color: '#333',
      marginBottom: 5,
      fontFamily: 'JetBrainsMono-Regular',
  },
  inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 50,
      borderWidth: 1,
      borderColor: '#555',
      borderRadius: 14,
      paddingHorizontal: 15,
      backgroundColor: 'white',
  },
  input: {
      flex: 1,
      height: '100%',
      fontFamily: 'JetBrainsMono-Regular',
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
      fontFamily: 'JetBrainsMono-Regular',
  },
  forgotText: {
      color: '#ff4d4f',
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: 'JetBrainsMono-Regular',
  },
  signInButton: {
      backgroundColor: '#FF0000',
      paddingVertical: 15,
      borderRadius: 14,
      alignItems: 'center',
      marginBottom: 20,
  },
  signInButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'JetBrainsMono-Regular',
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
      fontFamily: 'JetBrainsMono-Regular',
  },
  googleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
      paddingVertical: 15,
      borderRadius: 14,
  },
  googleIcon: {
      width: 20,
      height: 20,
      marginRight: 10,
  },
  googleButtonText: {
      fontSize: 15,
      color: '#333',
      fontFamily: 'JetBrainsMono-Bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  modalClose: {
    position: 'absolute',
    top: 10,
    right: 14,
    zIndex: 2,
  },
  modalCloseText: {
    fontSize: 24,
    color: '#888',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'JetBrainsMono-Bold',
    color: '#E53935',
  },
  modalText: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'JetBrainsMono-Regular',
  },
  modalConfirmButton: {
    backgroundColor: '#E53935',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  modalConfirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Bold',
  },
  transitionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  transitionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  transitionText: {
    fontSize: 16,
    color: '#E53935',
    fontFamily: 'JetBrainsMono-Bold',
    textAlign: 'center',
  },
  floatingBot: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 10,
  },
  botButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  botModalCard: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  botIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  botModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: 'JetBrainsMono-Bold',
    color: '#E53935',
    textAlign: 'center',
  },
  botModalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'JetBrainsMono-Regular',
    lineHeight: 22,
  },
  callDoctorButton: {
    flexDirection: 'row',
    backgroundColor: '#E53935',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 160,
  },
  callDoctorButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Bold',
  },
  connectingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  connectingText: {
    fontSize: 16,
    color: '#E53935',
    fontFamily: 'JetBrainsMono-Regular',
    textAlign: 'center',
  },
});
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

