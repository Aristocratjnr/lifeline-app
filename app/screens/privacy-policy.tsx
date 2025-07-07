import { ExternalLink } from '@/components/ExternalLink';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

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

export default function PrivacyPolicy() {
  const navigation = useNavigation();
  const router = useRouter();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  useEffect(() => {
    loadFonts();
  }, []);

  const handleShareApp = async () => {
    try {
      const result = await Share.share({
        message: 'Check out Lifeline - Your emergency first aid companion! Get instant access to crucial medical information during emergencies. Download now: https://lifeline-mu.vercel.app/',
        title: 'Lifeline - First Aid App',
        url: 'https://lifeline-mu.vercel.app/'
      });
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing app:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PRIVACY POLICY</Text>
      </View>

      <ScrollView style={styles.scrollContent}>
        {/* Privacy Content */}
        <View style={styles.privacyContainer}>
          <Text style={styles.privacyText}>
            Your privacy is important to us. We are committed to protecting your personal information.
          </Text>
          
          <Text style={[styles.privacyText, styles.spacingTop]}>
            Learn how we collect, use, and safeguard your data when you use Lifeline
          </Text>
          
          <Text style={[styles.privacyText, styles.spacingTop]}>
            This Privacy Policy explains our practices regarding the collection and use of information through our application.
          </Text>
          
          {/* See More Button */}
          <TouchableOpacity 
            style={styles.seeMoreButton}
            onPress={() => setShowPrivacyModal(true)}
          >
            <Text style={styles.seeMoreText}>SEE MORE</Text>
            <Ionicons name="chevron-forward" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Links */}
        <View style={styles.linksContainer}>
          <LinkItem title="Terms & Use" onPress={() => router.push('/screens/terms-use')} />
          <LinkItem title="FAQs" onPress={() => router.push('/screens/faqs')} />
          <LinkItem title="Share App" onPress={handleShareApp} />
          <ExternalLink href="https://lifeline-mu.vercel.app/">
            <LinkItem title="Visit Our Website" />
          </ExternalLink>
        </View>
      </ScrollView>

      {/* Privacy Policy Modal */}
      <Modal
        visible={showPrivacyModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPrivacyModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowPrivacyModal(false)}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Privacy Policy</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Modal Content */}
          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>1. Information We Collect</Text>
              <Text style={styles.sectionText}>
                We collect information you provide directly to us, such as when you create an account, use our features, or contact us for support. This may include your name, email address, and any other information you choose to provide.
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
              <Text style={styles.sectionText}>
                We use the information we collect to provide, maintain, and improve our services, communicate with you, and ensure the security of our application. We do not sell your personal information to third parties.
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>3. Information Sharing</Text>
              <Text style={styles.sectionText}>
                We do not share your personal information with third parties except in the following circumstances:{'\n'}
                • With your explicit consent{'\n'}
                • To comply with legal obligations{'\n'}
                • To protect our rights and safety{'\n'}
                • With service providers who assist in app operations
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>4. Data Security</Text>
              <Text style={styles.sectionText}>
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>5. Data Retention</Text>
              <Text style={styles.sectionText}>
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>6. Your Rights</Text>
              <Text style={styles.sectionText}>
                You have the right to access, update, or delete your personal information. You may also opt out of certain communications. Contact us to exercise these rights.
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>7. Children&apos;s Privacy</Text>
              <Text style={styles.sectionText}>
                Our application is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent and believe your child has provided us with personal information, please contact us.
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>8. Changes to This Policy</Text>
              <Text style={styles.sectionText}>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>9. Contact Us</Text>
              <Text style={styles.sectionText}>
                If you have any questions about this Privacy Policy or our privacy practices, please contact us at:{'\n'}
                Email: privacy@lifeline-app.com{'\n'}
                Website: https://lifeline-mu.vercel.app
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>10. Last Updated</Text>
              <Text style={styles.sectionText}>
                This Privacy Policy was last updated on May 2025.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
    borderRadius: 0,
    margin: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 1,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
    marginRight: 30,
    color: '#333',
  },
  scrollContent: {
    flex: 1,
  },
  privacyContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  privacyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontFamily: 'JetBrainsMono',
  },
  spacingTop: {
    marginTop: 15,
  },
  seeMoreButton: {
    backgroundColor: '#ff0000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 3,
    elevation: 2,
  },
  seeMoreText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
    marginRight: 8,
  },
  linksContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 10,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  linkText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'JetBrainsMono',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  closeButton: {
    padding: 5,
  },
  modalTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
    color: '#333',
  },
  placeholder: {
    width: 34,
  },
  modalContent: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 18,
    width: '92%',
    maxWidth: 420,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 4,
  },
  privacySection: {
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'JetBrainsMono-Bold',
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    fontFamily: 'JetBrainsMono',
  },
}); 