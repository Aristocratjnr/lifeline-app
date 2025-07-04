import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ForgotPasswordScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/images/background.jpg')}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      >
        <BlurView intensity={70} tint="light" style={StyleSheet.absoluteFill}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
              <View style={styles.topNav}>
                <Link href="/auth/sign-in" asChild>
                  <TouchableOpacity>
                    <Text style={styles.loginLinkText}>Remember your password? <Text style={styles.loginText}>Login</Text></Text>
                  </TouchableOpacity>
                </Link>
              </View>
              <View style={styles.container}>
                <Image source={require('../../assets/images/medical-kit.png')} style={styles.logo} />
                <View style={styles.card}>
                  <Text style={styles.recoveryTitle}>Password Recovery</Text>
                  <Text style={styles.title}>Reset your password</Text>
                  <Text style={styles.subtitle}>
                    Enter your email address and we&apos;ll send you a link to reset your password.
                  </Text>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="username@example.com"
                        placeholderTextColor="#A9A9A9"
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                      <Image source={require('../../assets/images/mail.png')} style={styles.inputIcon} />
                    </View>
                  </View>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Send Reset Link →</Text>
                  </TouchableOpacity>
                  <Link href="/auth/sign-up" asChild>
                    <TouchableOpacity>
                      <Text style={styles.footerLinkText}>Don&apos;t have an account? <Text style={styles.signupText}>Sign up</Text></Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </BlurView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
    background: {
        flex: 1,
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 20,
    },
    backButton: {
        position: 'absolute',
        top: 30,
        left: 20,
        zIndex: 1,
        padding: 10,
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    topNav: {
        zIndex: 1,
        alignItems: 'flex-end',
        marginBottom: 30,
        width: '100%',
        paddingRight: 10,
    },
    loginLinkText: {
        color: '#666',
        fontFamily: 'JetBrainsMono-Regular',
    },
    loginText: {
        color: '#FF6347',
        fontWeight: 'bold',
        fontFamily: 'JetBrainsMono-Bold',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 0,
    },
    logo: {
        width: 210,
        height: 210,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    sideText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
        marginBottom: 20,
        fontStyle: 'italic',
        fontFamily: 'JetBrainsMono-Regular',
    },
    card: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        padding: 25,
        alignItems: 'stretch', // Changed to stretch
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    recoveryTitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'left',
        marginBottom: 5,
        fontFamily: 'JetBrainsMono-Regular',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'left',
        fontFamily: 'JetBrainsMono-Regular',
    },
    subtitle: {
        fontSize: 13,
        marginBottom: 25,
        color: '#666',
        textAlign: 'left',
        lineHeight: 20,
        fontFamily: 'JetBrainsMono-Regular',
    },
    inputWrapper: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
        fontFamily: 'JetBrainsMono-Regular',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        height: 50,
        paddingHorizontal: 15,
    },
    input: {
        flex: 1,
        height: '100%',
        color: '#333',
        fontSize: 16,
        fontFamily: 'JetBrainsMono-Regular',
    },
    inputIcon: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#E53935', // Red color from image
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'JetBrainsMono-Regular',
    },
    footerLinkText: {
        textAlign: 'center',
        color: '#666',
        fontFamily: 'JetBrainsMono-Regular',
    },
    signupText: {
        fontWeight: 'bold',
        color: '#333',
        fontFamily: 'JetBrainsMono-Bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        borderTopColor: '#e0e0e0',
        borderTopWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    footerText: {
        color: '#666',
        marginHorizontal: 15,
        fontSize: 12,
        fontFamily: 'JetBrainsMono-Regular',
    },
});

export default ForgotPasswordScreen;
