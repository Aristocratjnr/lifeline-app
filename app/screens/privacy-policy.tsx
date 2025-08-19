import { ExternalLink } from '@/components/ExternalLink';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDisplayPreferences } from '../../context/DisplayPreferencesContext';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
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
  darkMode?: boolean;
};

const LinkItem = ({ title, hasArrow = true, onPress, darkMode = false }: LinkItemProps) => (
  <TouchableOpacity style={[styles.linkItem, darkMode && styles.darkLinkItem]} onPress={onPress}>
    <Text style={[styles.linkText, darkMode && styles.darkLinkText]}>{title}</Text>
    {hasArrow && <Ionicons name="chevron-forward" size={20} color={darkMode ? '#E0E0E0' : 'black'} />}
  </TouchableOpacity>
);

export default function PrivacyPolicy() {
  const navigation = useNavigation();
  const router = useRouter();
  const { t } = useTranslation();
  const { darkMode } = useDisplayPreferences();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  useEffect(() => {
    loadFonts();
  }, []);

  const handleShareApp = async () => {
    try {
      const result = await Share.share({
        message: t('privacyPolicy.share.message'),
        title: t('privacyPolicy.share.title'),
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
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      {/* Header */}
      <View style={[styles.header, darkMode && styles.darkHeader]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={darkMode ? 'white' : 'black'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, darkMode && styles.darkText]}>{t('privacyPolicy.header')}</Text>
      </View>

      <ScrollView style={[styles.scrollContent, darkMode && styles.darkLinksContainer]}>
        {/* Privacy Content */}
        <View style={[styles.privacyContainer, darkMode && styles.darkPrivacyContainer]}>
          <Text style={[styles.privacyText, darkMode && styles.darkPrivacyText]}>
            {t('privacyPolicy.intro.privacyImportant')}
          </Text>
          
          <Text style={[styles.privacyText, styles.spacingTop, darkMode && styles.darkPrivacyText]}>
            {t('privacyPolicy.intro.howWeCollect')}
          </Text>
          
          <Text style={[styles.privacyText, styles.spacingTop, darkMode && styles.darkPrivacyText]}>
            {t('privacyPolicy.intro.policyExplains')}
          </Text>
          
          {/* See More Button */}
          <TouchableOpacity 
            style={styles.seeMoreButton}
            onPress={() => setShowPrivacyModal(true)}
          >
            <Text style={[styles.seeMoreText, darkMode && styles.darkListText]}>{t('privacyPolicy.seeMore')}</Text>
            <Ionicons name="chevron-forward" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Links */}
        <View style={styles.linksContainer}>
          <View>
            <LinkItem 
              title={t('privacyPolicy.links.termsUse')} 
              onPress={() => router.push('/screens/terms-use')} 
              darkMode={darkMode}
            />
          </View>
          <View>
            <LinkItem 
              title={t('privacyPolicy.links.faqs')} 
              onPress={() => router.push('/screens/faqs')} 
              darkMode={darkMode}
            />
          </View>
          <View>
            <LinkItem 
              title={t('privacyPolicy.links.shareApp')} 
              onPress={handleShareApp} 
              darkMode={darkMode}
            />
          </View>
          <View style={[styles.linkItem, darkMode && styles.darkLinkItem]}>
            <ExternalLink href="https://lifeline-mu.vercel.app/">
              <Text style={[styles.linkText, darkMode && styles.darkLinkText]}>{t('privacyPolicy.links.visitWebsite')}</Text>
              <Ionicons name="chevron-forward" size={20} color={darkMode ? '#E0E0E0' : 'black'} />
            </ExternalLink>
          </View>
        </View>
      </ScrollView>

      {/* Privacy Modal */}
      <Modal
        visible={showPrivacyModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <ImageBackground 
          source={require('../../assets/images/blur.png')} 
          style={[styles.backgroundImage, darkMode && { opacity: 0.9 }]}
          resizeMode="cover"
        >
          <View style={[styles.overlay, darkMode && styles.darkOverlay]} />
          <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowPrivacyModal(false)}
              >
                <Ionicons name="close" size={24} color={darkMode ? 'white' : 'black'} />
              </TouchableOpacity>
              <Text style={[styles.modalTitle, darkMode && styles.darkModalTitle]}>{t('privacyPolicy.header')}</Text>
              <View style={styles.placeholder} />
            </View>
            <ScrollView style={[styles.modalContent, darkMode && styles.darkModalContent]}>
              <View style={[styles.privacySection, darkMode && styles.darkPrivacySection]}>
                <Text style={[styles.sectionTitle, darkMode && styles.darkSectionTitle]}>{t('privacyPolicy.sections.informationWeCollect.title')}</Text>
                <Text style={[styles.sectionText, darkMode && styles.darkSectionText]}>
                  {t('privacyPolicy.sections.informationWeCollect.description1')}
                </Text>
              </View>

              <View style={[styles.privacySection, darkMode && styles.darkPrivacySection]}>
                <Text style={[styles.sectionText, darkMode && styles.darkSectionText]}>
                  {t('privacyPolicy.sections.informationWeCollect.description2')}
                </Text>
              </View>

              <View style={[styles.privacySection, darkMode && styles.darkPrivacySection]}>
                <Text style={[styles.sectionTitle, darkMode && styles.darkSectionTitle]}>{t('privacyPolicy.sections.howWeUseInformation.title')}</Text>
                <Text style={[styles.sectionText, darkMode && styles.darkSectionText]}>
                  {t('privacyPolicy.sections.howWeUseInformation.description')}
                </Text>
              </View>

              <View style={[styles.privacySection, darkMode && styles.darkPrivacySection]}>
                <Text style={[styles.sectionTitle, darkMode && styles.darkSectionTitle]}>{t('privacyPolicy.sections.informationSharing.title')}</Text>
                <Text style={[styles.sectionText, darkMode && styles.darkSectionText]}>
                  {t('privacyPolicy.sections.informationSharing.description')}
                </Text>
              </View>

              <View style={[styles.privacySection, darkMode && styles.darkPrivacySection]}>
                <Text style={[styles.sectionTitle, darkMode && styles.darkSectionTitle]}>{t('privacyPolicy.sections.dataSecurity.title')}</Text>
                <Text style={[styles.sectionText, darkMode && styles.darkSectionText]}>
                  {t('privacyPolicy.sections.dataSecurity.description')}
                </Text>
              </View>

              <View style={[styles.privacySection, darkMode && styles.darkPrivacySection]}>
                <Text style={[styles.sectionTitle, darkMode && styles.darkSectionTitle]}>{t('privacyPolicy.sections.yourRights.title')}</Text>
                <Text style={[styles.sectionText, darkMode && styles.darkSectionText]}>
                  {t('privacyPolicy.sections.yourRights.description')}
                </Text>
              </View>

              <View style={[styles.privacySection, darkMode && styles.darkPrivacySection]}>
                <Text style={[styles.sectionTitle, darkMode && styles.darkSectionTitle]}>{t('privacyPolicy.sections.childrenPrivacy.title')}</Text>
                <Text style={[styles.sectionText, darkMode && styles.darkSectionText]}>
                  {t('privacyPolicy.sections.childrenPrivacy.description')}
                </Text>
              </View>

              <View style={[styles.privacySection, darkMode && styles.darkPrivacySection]}>
                <Text style={[styles.sectionTitle, darkMode && styles.darkSectionTitle]}>{t('privacyPolicy.sections.changesToPolicy.title')}</Text>
                <Text style={[styles.sectionText, darkMode && styles.darkSectionText]}>
                  {t('privacyPolicy.sections.changesToPolicy.description')}
                </Text>
              </View>

              <View style={[styles.privacySection, darkMode && styles.darkPrivacySection]}>
                <Text style={[styles.sectionTitle, darkMode && styles.darkSectionTitle]}>{t('privacyPolicy.sections.contactUs.title')}</Text>
                <Text style={[styles.sectionText, darkMode && styles.darkSectionText]}>
                  {t('privacyPolicy.sections.contactUs.description')}
                </Text>
              </View>

              <View style={[styles.privacySection, darkMode && styles.darkPrivacySection]}>
                <Text style={[styles.sectionTitle, darkMode && styles.darkSectionTitle]}>{t('privacyPolicy.sections.internationalDataTransfers.title')}</Text>
                <Text style={[styles.sectionText, darkMode && styles.darkSectionText]}>
                  {t('privacyPolicy.sections.internationalDataTransfers.description')}
                </Text>
              </View>

              <View style={[styles.privacySection, darkMode && styles.darkPrivacySection]}>
                <Text style={[styles.sectionTitle, darkMode && styles.darkSectionTitle]}>{t('privacyPolicy.sections.lastUpdated.title')}</Text>
                <Text style={[styles.sectionText, darkMode && styles.darkSectionText]}>
                  {t('privacyPolicy.sections.lastUpdated.description')}
                </Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
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
  darkHeader: {
    backgroundColor: '#1E1E1E',
    borderBottomColor: '#333',
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
  darkPrivacyContainer: {
    backgroundColor: '#1E1E1E',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  privacyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontFamily: 'JetBrainsMono',
  },
  darkPrivacyText: {
    color: '#E0E0E0',
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
  darkLinksContainer: {
    backgroundColor: '#121212',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  darkLinkItem: {
    borderBottomColor: '#333',
  },
  linkText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'JetBrainsMono',
  },
  darkLinkText: {
    color: '#E0E0E0',
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
  darkModalHeader: {
    backgroundColor: '#1E1E1E',
    borderBottomColor: '#333',
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
  darkModalTitle: {
    color: '#FFFFFF',
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
  darkModalContent: {
    backgroundColor: '#1E1E1E',
  },
  privacySection: {
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 12,
  },
  darkPrivacySection: {
    borderBottomColor: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'JetBrainsMono-Bold',
  },
  darkSectionTitle: {
    color: '#FFFFFF',
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
    marginBottom: 10,
    fontFamily: 'JetBrainsMono',
  },
  darkSectionText: {
    color: '#d0d0d0',
  },
  darkText: {
    color: '#E0E0E0',
  },
  darkListText: {
    color: '#E0E0E0',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  darkOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
});