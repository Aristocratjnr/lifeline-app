import { ExternalLink } from '@/components/ExternalLink';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    ImageBackground,
    Modal,
    SafeAreaView,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useDisplayPreferences } from '../../context/DisplayPreferencesContext';

// Load JetBrains Mono font
const loadFonts = async () => {
  await Font.loadAsync({
    'JetBrainsMono': require('../../assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('../../assets/fonts/JetBrainsMono-Bold.ttf'),
  });
};

type LinkItemProps = {
  title: string;
  hasArrow?: boolean;
  onPress?: () => void;
};

const LinkItem = ({ title, hasArrow = true, onPress }: LinkItemProps) => (
  <TouchableOpacity style={styles.linkItem} onPress={onPress}>
    <Text style={styles.linkText}>{title}</Text>
    {hasArrow && <Ionicons name="chevron-forward" size={20} color="black" />}
  </TouchableOpacity>
);

export default function TermsUse() {
  const navigation = useNavigation();
  const router = useRouter();
  const [showTermsModal, setShowTermsModal] = useState(false);
  const { eyeProtection } = useDisplayPreferences();
  const fadeAnim = useRef(new Animated.Value(eyeProtection ? 1 : 0)).current;

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: eyeProtection ? 1 : 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [eyeProtection]);

  const handleShareApp = async () => {
    try {
      const result = await Share.share({
        message: 'Check out Lifeline - Your emergency first aid companion! Get instant access to crucial medical information during emergencies. Download now: https://lifeline-mu.vercel.app/',
        title: 'Lifeline - First Aid App',
        url: 'https://lifeline-mu.vercel.app/'
      });
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('Shared with activity type:', result.activityType);
        } else {
          // shared
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing app:', error);
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/blur.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <Animated.View
        pointerEvents="none"
        style={[
          styles.eyeProtectionOverlay,
          { opacity: fadeAnim },
        ]}
      />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>TERMS & USE</Text>
        </View>

        <ScrollView style={styles.scrollContent}>
          {/* Terms Content */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By using Lifeline, you agree to our terms and conditions.
            </Text>
            
            <Text style={[styles.termsText, styles.spacingTop]}>
              Understand your rights and responsibilities when using Lifeline
            </Text>
            
            <Text style={[styles.termsText, styles.spacingTop]}>
              Please review our terms and conditions. Your use of Lifeline indicates your agreement to these guidelines.
            </Text>
            
            {/* See More Button */}
            <TouchableOpacity 
              style={styles.seeMoreButton}
              onPress={() => setShowTermsModal(true)}
            >
              <Text style={styles.seeMoreText}>SEE MORE</Text>
              <Ionicons name="chevron-forward" size={18} color="white" />
            </TouchableOpacity>
          </View>

          {/* Links */}
          <View style={styles.linksContainer}>
            <LinkItem title="FAQs" onPress={() => router.push('/screens/faqs')} />
            <LinkItem title="Share App" onPress={handleShareApp} />
            <ExternalLink href="https://lifeline-mu.vercel.app/">
              <LinkItem title="Visit Our Website" />
            </ExternalLink>
          </View>
        </ScrollView>

        {/* Terms and Conditions Modal */}
        <Modal
          visible={showTermsModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowTermsModal(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowTermsModal(false)}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Terms & Conditions</Text>
              <View style={styles.placeholder} />
            </View>

            {/* Modal Content */}
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <View style={styles.termsSection}>
                <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
                <Text style={styles.sectionText}>
                  By downloading, installing, or using the Lifeline application, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the application.
                </Text>
              </View>

              <View style={styles.termsSection}>
                <Text style={styles.sectionTitle}>2. Medical Disclaimer</Text>
                <Text style={styles.sectionText}>
                  Lifeline is designed to provide general first aid information and guidance. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers for medical emergencies.
                </Text>
              </View>

              <View style={styles.termsSection}>
                <Text style={styles.sectionTitle}>3. User Responsibilities</Text>
                <Text style={styles.sectionText}>
                  • Use the app responsibly and in accordance with applicable laws{'\n'}
                  • Do not rely solely on the app for medical decisions{'\n'}
                  • Contact emergency services for serious medical situations{'\n'}
                  • Keep your personal information secure
                </Text>
              </View>

              <View style={styles.termsSection}>
                <Text style={styles.sectionTitle}>4. Privacy and Data</Text>
                <Text style={styles.sectionText}>
                  We respect your privacy and are committed to protecting your personal information. Our Privacy Policy explains how we collect, use, and safeguard your data.
                </Text>
              </View>

              <View style={styles.termsSection}>
                <Text style={styles.sectionTitle}>5. App Usage</Text>
                <Text style={styles.sectionText}>
                  • The app is for personal, non-commercial use{'\n'}
                  • Do not attempt to reverse engineer or modify the app{'\n'}
                  • Report any bugs or issues through appropriate channels{'\n'}
                  • Keep the app updated to the latest version
                </Text>
              </View>

              <View style={styles.termsSection}>
                <Text style={styles.sectionTitle}>6. Limitation of Liability</Text>
                <Text style={styles.sectionText}>
                  Lifeline and its developers are not liable for any damages arising from the use or inability to use the application, including but not limited to medical complications or delays in seeking professional help.
                </Text>
              </View>

              <View style={styles.termsSection}>
                <Text style={styles.sectionTitle}>7. Updates and Changes</Text>
                <Text style={styles.sectionText}>
                  These terms may be updated from time to time. Continued use of the app after changes constitutes acceptance of the new terms.
                </Text>
              </View>

              <View style={styles.termsSection}>
                <Text style={styles.sectionTitle}>8. Contact Information</Text>
                <Text style={styles.sectionText}>
                  For questions about these terms, please contact us at support@lifeline.com or visit our website.
                </Text>
              </View>

              <View style={styles.bottomPadding} />
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  eyeProtectionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 236, 140, 0.35)',
    zIndex: 2,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.89)',
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Bold',
    marginRight: 30,
  },
  scrollContent: {
    flex: 1,
  },
  termsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  termsText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  spacingTop: {
    marginTop: 20,
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 25,
    alignSelf: 'flex-start',
  },
  seeMoreText: {
    color: 'white',
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
    marginRight: 5,
  },
  linksContainer: {
    marginTop: 20,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  linkText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff4f5',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: 'white',
  },
  closeButton: {
    padding: 5,
  },
  modalTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 18,
    color: '#333',
  },
  placeholder: {
    width: 34,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  termsSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  sectionText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
  },
  bottomPadding: {
    height: 40,
  },
});