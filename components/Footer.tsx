import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { width } = Dimensions.get('window');

const Footer: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLinkPress = (path: string) => {
    // Check if it's an external link or internal route
    if (path.startsWith('http')) {
      Linking.openURL(path);
    } else {
      // Use router.push for internal navigation
      router.push(path as any);
    }
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
                source={require('@/assets/images/logo.png')}
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
        <View style={styles.navLinksContainer}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={styles.navLinks}>
            <TouchableOpacity 
              style={styles.linkButton} 
              onPress={() => handleLinkPress('/')}
            >
              <Text style={styles.link}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.linkButton} 
              onPress={() => handleLinkPress('/(tabs)/index')}
            >
              <Text style={styles.link}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.linkButton}
              onPress={() => handleLinkPress('/(tabs)/explore')}
            >
              <Text style={styles.link}>Explore</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.linkButton}
              onPress={() => handleLinkPress('/(tabs)/ai-assistant')}
            >
              <Text style={styles.link}>AI Assistant</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Social Icons */}
        <View style={styles.socialContainer}>
          <Text style={styles.sectionTitle}>Connect With Us</Text>
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
        </View>

        {/* Description */}
        <View style={styles.description}>
          <Text style={styles.descriptionTitle}>About Lifeline</Text>
          <Text style={styles.descriptionText}>
            Lifeline provides instant access to crucial first-aid information
            during emergencies, ensuring you&apos;re prepared to act quickly and
            effectively when it matters most.
          </Text>
        </View>
      </View>

      {/* Bottom Line */}
      <View style={styles.bottomLine} />
      
      {/* Copyright */}
      <View style={styles.copyright}>
        <Text style={styles.copyrightText}>
          © {new Date().getFullYear()} Lifeliner. All rights reserved. Daniella Asiedu.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingTop: 40,
    paddingBottom: 25,
    paddingHorizontal: 20,
    marginTop: 40,
    backgroundColor: '#FFB5B5',
  },
  container: {
    alignItems: 'center',
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  logoSection: {
    marginBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#ffff', 
    overflow: 'hidden',
    backgroundColor: '#fff',
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#111827',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    color: '#111827',
    textAlign: 'center',
  },
  navLinksContainer: {
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
  },
  navLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    maxWidth: 600,
  },
  linkButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    margin: 5,
  },
  link: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  socialContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 15,
  },
  socialButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  description: {
    alignItems: 'center',
    marginBottom: 30,
    maxWidth: 800,
    paddingHorizontal: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111827',
    textAlign: 'center',
  },
  descriptionText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    color: '#111827',
    fontWeight: '400',
  },
  bottomLine: {
    height: 1,
    width: '100%',
    marginVertical: 20,
    backgroundColor: '#FF9A9A',
  },
  copyright: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  copyrightText: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    color: '#111827',
    fontWeight: '500',
    marginBottom: 5,
  },
  creditText: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    color: '#111827',
  },
  creditLink: {
    color: '#dc2626',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});

export default Footer;