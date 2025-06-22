import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';
import React, { useState } from 'react';
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

const SignUpScreen = () => {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.background}>
        <BlurView intensity={70} tint="light" style={StyleSheet.absoluteFill}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <Image source={require('../../assets/images/signup.png')} style={styles.headerImage} />
                <Text style={styles.headerText}>Join our community for better healthcare</Text>

                <View style={styles.formCard}>
                <Text style={styles.welcomeText}>Welcome LIFELINER!</Text>
                <Text style={styles.title}>Create your account</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Your full name"
                        placeholderTextColor="#999"
                    />
                    <Image source={require('../../assets/images/woman.png')} style={styles.inputIcon} />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="username@example.com"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Image source={require('../../assets/images/mail.png')} style={styles.inputIcon} />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Create a strong password"
                        placeholderTextColor="#999"
                        secureTextEntry
                    />
                    {/* Eye icon would go here, you can add an image component if you have one */}
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
                    {/* Eye icon would go here, you can add an image component if you have one */}
                    </View>
                </View>

                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                    style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
                    onPress={() => setRememberMe(!rememberMe)}
                    >
                    {rememberMe && <Text style={styles.checkboxCheck}>✓</Text>}
                    </TouchableOpacity>
                    <Text style={styles.checkboxLabel}>Remember me</Text>
                </View>

                <TouchableOpacity style={styles.signUpButton}>
                    <Text style={styles.signUpButtonText}>Sign Up →</Text>
                </TouchableOpacity>

                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>OR</Text>
                    <View style={styles.divider} />
                </View>

                <TouchableOpacity style={styles.googleButton}>
                    <Image source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }} style={styles.googleIcon} />
                    <Text style={styles.googleButtonText}>Continue with Google</Text>
                </TouchableOpacity>

                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account? </Text>
                    <Link href="/auth/sign-in" asChild>
                        <TouchableOpacity>
                            <Text style={styles.loginLink}>Login</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
            </ScrollView>
        </BlurView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
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
    headerImage: {
        width: 200,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    headerText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
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
        marginBottom: 20,
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
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
    checkboxLabel: {
        fontSize: 14,
    },
    signUpButton: {
        backgroundColor: '#ff4d4f',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    signUpButtonText: {
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
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 14,
    },
    loginLink: {
        fontSize: 14,
        color: '#ff4d4f',
        fontWeight: 'bold',
    },
});
