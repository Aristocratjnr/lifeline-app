import { ExternalLink } from '@/components/ExternalLink';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [showTermsModal, setShowTermsModal] = useState(false);

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
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('termsUse.header')}</Text>
        </View>

        <ScrollView style={styles.scrollContent}>
          {/* Terms Content */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              {t('termsUse.intro.agreement')}
            </Text>
            
            <Text style={[styles.termsText, styles.spacingTop]}>
              {t('termsUse.intro.rightsResponsibilities')}
            </Text>
            
            <Text style={[styles.termsText, styles.spacingTop]}>
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
          <View style={styles.linksContainer}>
            <LinkItem title={t('termsUse.links.privacyPolicy')} onPress={() => router.push('/screens/privacy-policy')} />
            <LinkItem title={t('termsUse.links.faqs')} onPress={() => router.push('/screens/faqs')} />
            <LinkItem title={t('termsUse.links.shareApp')} onPress={handleShareApp} />
            <ExternalLink href="https://lifeline-mu.vercel.app/">
              <LinkItem title={t('termsUse.links.visitWebsite')} />
            </ExternalLink>
          </View>
        </ScrollView>

        {/* Terms Modal */}
        <Modal
          visible={showTermsModal}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowTermsModal(false)}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{t('termsUse.header')}</Text>
              <View style={styles.placeholder} />
            </View>
            <ScrollView style={styles.modalContent}>
              <View style={styles.termsSection}>
                <Text style={styles.sectionTitle}>{t('termsUse.sections.acceptanceOfTerms.title')}</Text>
                <Text style={styles.sectionText}>
                  {t('termsUse.sections.acceptanceOfTerms.description')}
                </Text>
              </View>

              <View style={styles.termsSection}>
                <Text style={styles.sectionTitle}>{t('termsUse.sections.useOfApplication.title')}</Text>
                <Text style={styles.sectionText}>
                  {t('termsUse.sections.useOfApplication.description')}
                </Text>
              </View>

              <View style={styles.termsSection}>
                <Text style={styles.sectionTitle}>{t('termsUse.sections.userResponsibilities.title')}</Text>
                <Text style={styles.sectionText}>
                  {t('termsUse.sections.userResponsibilities.description')}
                </Text>
              </View>

              <View style={styles.termsSection}>
                <Text style={styles.sectionTitle}>{t('termsUse.sections.intellectualProperty.title')}</Text>
                <Text style={styles.sectionText}>
                  {t('termsUse.sections.intellectualProperty.description')}
                </Text>
              </View>

              <View style={styles.termsSection}>
                <Text style={styles.sectionTitle}>{t('termsUse.sections.disclaimerOfWarranties.title')}</Text>
                <Text style={styles.sectionText}>
                  {t('termsUse.sections.disclaimerOfWarranties.description')}
                </Text>
              </View>

              <View style={styles.termsSection}>
                <Text style={styles.sectionTitle}>{t('termsUse.sections.limitationOfLiability.title')}</Text>
                <Text style={styles.sectionText}>
                  {t('termsUse.sections.limitationOfLiability.description')}
                </Text>
              </View>

              <View style={styles.termsSection}>
                <Text style={styles.sectionTitle}>{t('termsUse.sections.updatesAndChanges.title')}</Text>
                <Text style={styles.sectionText}>
                  {t('termsUse.sections.updatesAndChanges.description')}
                </Text>
              </View>

              <View style={styles.termsSection}>
                <Text style={styles.sectionTitle}>{t('termsUse.sections.contactInformation.title')}</Text>
                <Text style={styles.sectionText}>
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