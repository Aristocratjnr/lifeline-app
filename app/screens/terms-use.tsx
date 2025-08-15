import { ExternalLink } from '@/components/ExternalLink';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDisplayPreferences } from '../../context/DisplayPreferencesContext';
import {
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
  <TouchableOpacity style={styles.linkItem} onPress={onPress}>
    <Text style={[styles.linkText, darkMode && styles.darkLinkText]}>{title}</Text>
    {hasArrow && <Ionicons name="chevron-forward" size={20} color={darkMode ? 'white' : 'black'} />}
  </TouchableOpacity>
);

export default function TermsOfUse() {
  const navigation = useNavigation();
  const router = useRouter();
  const { t } = useTranslation();
  const [showTermsModal, setShowTermsModal] = useState(false);
  const { darkMode } = useDisplayPreferences();

  useEffect(() => {
    loadFonts();
  }, []);

  const handleShareApp = async () => {
    try {
      const result = await Share.share({
        message: t('termsUse.share.message'),
        title: t('termsUse.share.title'),
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
      <View style={styles.overlay} />
      <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
        {/* Header */}
        <View style={[styles.header, darkMode && styles.darkHeader]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={darkMode ? 'white' : 'black'} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, darkMode && styles.darkHeaderTitle]}>{t('termsUse.header')}</Text>
        </View>

        <ScrollView style={[styles.scrollContent, darkMode && styles.darkScrollContent]}>
          {/* Terms Content */}
          <View style={[styles.termsContainer, darkMode && styles.darkTermsContainer]}>
            <Text style={[styles.termsText, darkMode && styles.darkText]}>
              {t('termsUse.intro.agreement')}
            </Text>
            
            <Text style={[styles.termsText, styles.spacingTop, darkMode && styles.darkText]}>
              {t('termsUse.intro.rightsResponsibilities')}
            </Text>
            
            <Text style={[styles.termsText, styles.spacingTop, darkMode && styles.darkText]}>
              {t('termsUse.intro.reviewTerms')}
            </Text>
            
            {/* See More Button */}
            <TouchableOpacity 
              style={styles.seeMoreButton}
              onPress={() => setShowTermsModal(true)}
            >
              <Text style={styles.seeMoreText}>{t('termsUse.seeMore')}</Text>
              <Ionicons name="chevron-forward" size={18} color="white" />
            </TouchableOpacity>
          </View>

          {/* Links */}
          <View style={[styles.linksContainer, darkMode && styles.darkLinksContainer]}>
            <View style={[styles.linkItem, darkMode && styles.darkLinkItem]}>
              <LinkItem 
                title={t('termsUse.links.privacyPolicy')} 
                onPress={() => router.push('/screens/privacy-policy')} 
                darkMode={darkMode}
              />
            </View>
            <View style={[styles.linkItem, darkMode && styles.darkLinkItem]}>
              <LinkItem 
                title={t('termsUse.links.faqs')} 
                onPress={() => router.push('/screens/faqs')} 
                darkMode={darkMode}
              />
            </View>
            <View style={[styles.linkItem, darkMode && styles.darkLinkItem]}>
              <LinkItem 
                title={t('termsUse.links.shareApp')} 
                onPress={handleShareApp} 
                darkMode={darkMode}
              />
            </View>
            <ExternalLink href="https://lifeline-mu.vercel.app/">
              <LinkItem 
                title={t('termsUse.links.visitWebsite')} 
                darkMode={darkMode}
              />
            </ExternalLink>
          </View>
        </ScrollView>

        {/* Terms Modal */}
        <Modal
          visible={showTermsModal}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView style={[styles.modalContainer, darkMode && styles.darkModalContainer]}>
            <View style={[styles.modalHeader, darkMode && styles.darkModalHeader]}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowTermsModal(false)}
              >
                <Ionicons name="close" size={24} color={darkMode ? 'white' : 'black'} />
              </TouchableOpacity>
              <Text style={[styles.modalTitle, darkMode && styles.darkModalTitle]}>{t('termsUse.header')}</Text>
              <View style={styles.placeholder} />
            </View>
            <ScrollView style={[styles.modalContent, darkMode && styles.darkModalContent]}>
              <View style={[styles.termsSection, darkMode && styles.darkTermsSection]}>
                <Text style={[styles.sectionTitle, darkMode && styles.darkSectionTitle]}>{t('termsUse.sections.acceptanceOfTerms.title')}</Text>
                <Text style={[styles.sectionText, darkMode && styles.darkSectionText]}>
                  {t('termsUse.sections.acceptanceOfTerms.description')}
                </Text>
              </View>

              <View style={[styles.termsSection, darkMode && styles.darkTermsSection]}>
                <Text style={[styles.sectionTitle, darkMode && styles.darkSectionTitle]}>{t('termsUse.sections.useOfApplication.title')}</Text>
                <Text style={[styles.sectionText, darkMode && styles.darkSectionText]}>
                  {t('termsUse.sections.useOfApplication.description')}
                </Text>
              </View>

              <View style={[styles.termsSection, darkMode && styles.darkTermsSection]}>
                <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>{t('termsUse.sections.userResponsibilities.title')}</Text>
                <Text style={[styles.sectionText, darkMode && styles.darkSectionText]}>
                  {t('termsUse.sections.userResponsibilities.description')}
                </Text>
              </View>

              <View style={[styles.termsSection, darkMode && styles.darkTermsSection]}>
                <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>{t('termsUse.sections.intellectualProperty.title')}</Text>
                <Text style={[styles.sectionText, darkMode && styles.darkSectionText]}>
                  {t('termsUse.sections.intellectualProperty.description')}
                </Text>
              </View>

              <View style={[styles.termsSection, darkMode && styles.darkTermsSection]}>
                <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>{t('termsUse.sections.disclaimerOfWarranties.title')}</Text>
                <Text style={[styles.sectionText, darkMode && styles.darkSectionText]}>
                  {t('termsUse.sections.disclaimerOfWarranties.description')}
                </Text>
              </View>

              <View style={[styles.termsSection, darkMode && styles.darkTermsSection]}>
                <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>{t('termsUse.sections.limitationOfLiability.title')}</Text>
                <Text style={[styles.sectionText, darkMode && styles.darkSectionText]}>
                  {t('termsUse.sections.limitationOfLiability.description')}
                </Text>
              </View>

              <View style={[styles.termsSection, darkMode && styles.darkTermsSection]}>
                <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>{t('termsUse.sections.updatesAndChanges.title')}</Text>
                <Text style={[styles.sectionText, darkMode && styles.darkSectionText]}>
                  {t('termsUse.sections.updatesAndChanges.description')}
                </Text>
              </View>

              <View style={[styles.termsSection, darkMode && styles.darkTermsSection]}>
                <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>{t('termsUse.sections.contactInformation.title')}</Text>
                <Text style={[styles.sectionText, darkMode && styles.darkSectionText]}>
                  {t('termsUse.sections.contactInformation.description')}
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
    zIndex: 1,
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
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 15,
    overflow: 'hidden',
  },
  darkLinksContainer: {
    backgroundColor: '#2d2d2d',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  darkHeader: {
    backgroundColor: '#2d2d2d',
  },
  darkHeaderTitle: {
    color: 'white',
  },
  darkScrollContent: {
    backgroundColor: '#1a1a1a',
  },
  darkTermsContainer: {
    backgroundColor: '#2d2d2d',
  },
  darkTermsSection: {
    backgroundColor: '#2d2d2d',
  },
  darkSectionTitle: {
    color: 'white',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  darkLinkItem: {
    borderBottomColor: '#3d3d3d',
    backgroundColor: '#2d2d2d',
  },
  linkText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 15,
    color: '#333',
  },
  darkLinkText: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff4f5',
  },
  darkModalContainer: {
    backgroundColor: '#1a1a1a',
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
  darkModalHeader: {
    backgroundColor: '#2d2d2d',
    borderBottomColor: '#3d3d3d',
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
  darkModalContent: {
    backgroundColor: '#1a1a1a',
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
  darkText: {
    color: 'white',
  },
  darkModalTitle: {
    color: 'white',
  },
  darkSectionText: {
    color: '#b0b0b0',
  },
  bottomPadding: {
    height: 40,
  },
});