import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Dimensions, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const Footer: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const handleSocialPress = (platform: string) => {
    // Add your social media URLs here
    const urls = {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      whatsapp: 'https://whatsapp.com',
    };
    
    if (urls[platform as keyof typeof urls]) {
      Linking.openURL(urls[platform as keyof typeof urls]);
    }
  };

  return (
    <View style={styles.footer}>
      <View style={styles.container}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <TouchableOpacity style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <Image
                source={require('@/assets/images/logo.png')} // Update path as needed
                style={styles.logoImage}
                contentFit="contain"
                onLoad={() => setImageLoaded(true)}
                onError={() => console.error("Logo image failed to load")}
              />
              {!imageLoaded && (
                <View style={styles.logoFallback}>
                  <Text style={styles.logoFallbackText}>L</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Navigation Links */}
        <View style={styles.navLinks}>
          <TouchableOpacity onPress={() => handleLinkPress('/')}>
            <Text style={styles.link}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress('/symptoms')}>
            <Text style={styles.link}>Symptoms Checker</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress('/first-aid')}>
            <Text style={styles.link}>First Aid Guide</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress('/contact')}>
            <Text style={styles.link}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        {/* Social Icons */}
        <View style={styles.socialIcons}>
          <TouchableOpacity 
            onPress={() => handleSocialPress('facebook')}
            style={styles.socialButton}
            accessibilityLabel="Facebook"
          >
            <FontAwesome name="facebook-f" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleSocialPress('twitter')}
            style={styles.socialButton}
            accessibilityLabel="Twitter"
          >
            <FontAwesome name="twitter" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleSocialPress('instagram')}
            style={styles.socialButton}
            accessibilityLabel="Instagram"
          >
            <FontAwesome name="instagram" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleSocialPress('linkedin')}
            style={styles.socialButton}
            accessibilityLabel="LinkedIn"
          >
            <FontAwesome name="linkedin" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleSocialPress('whatsapp')}
            style={styles.socialButton}
            accessibilityLabel="WhatsApp"
          >
            <FontAwesome name="whatsapp" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            Lifeline provides instant access to crucial first-aid information{'\n'}
            during emergencies, ensuring you&apos;re prepared to act quickly and{'\n'}
            effectively.
          </Text>
        </View>
      </View>

      {/* Bottom Line */}
      <View style={styles.bottomLine} />
      
      {/* Copyright */}
      <View style={styles.copyright}>
        <Text style={styles.copyrightText}>
          © {new Date().getFullYear()} Lifeliner. All rights reserved. Daniella Asiedu. Credits to{' '}
          <TouchableOpacity onPress={() => handleLinkPress('https://github.com/Aristocratjnr')}>
            <Text style={styles.creditLink}>David O. Ayim</Text>
          </TouchableOpacity>
          {' '}for the assistance.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginTop: 40,
    backgroundColor: '#FFB5B5', // Same as NavBar background
  },
  container: {
    alignItems: 'center',
    maxWidth: width - 40,
  },
  logoSection: {
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#000', // Changed to black to match NavBar styling
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  logoFallback: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FA9D9D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoFallbackText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  navLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 20,
  },
  link: {
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#000', // Changed to black to match NavBar text
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 15,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)', // Light overlay for better contrast on pink background
  },
  description: {
    alignItems: 'center',
    marginBottom: 20,
  },
  descriptionText: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 20,
    color: '#000', // Changed to black for better contrast
  },
  bottomLine: {
    height: 1,
    width: '100%',
    marginVertical: 15,
    backgroundColor: '#FF9A9A', // Slightly darker pink for the line
  },
  copyright: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  copyrightText: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    color: '#000', // Changed to black for better contrast
  },
  creditLink: {
    color: '#dc2626',
    textDecorationLine: 'underline',
  },
});

export default Footer;