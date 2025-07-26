import { ExternalLink } from '@/components/ExternalLink';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('privacyPolicy.header')}</Text>
      </View>

      <ScrollView style={styles.scrollContent}>
        {/* Privacy Content */}
        <View style={styles.privacyContainer}>
          <Text style={styles.privacyText}>
            {t('privacyPolicy.intro.privacyImportant')}
          </Text>
          
          <Text style={[styles.privacyText, styles.spacingTop]}>
            {t('privacyPolicy.intro.howWeCollect')}
          </Text>
          
          <Text style={[styles.privacyText, styles.spacingTop]}>
            {t('privacyPolicy.intro.policyExplains')}
          </Text>
          
          {/* See More Button */}
          <TouchableOpacity 
            style={styles.seeMoreButton}
            onPress={() => setShowPrivacyModal(true)}
          >
            <Text style={styles.seeMoreText}>{t('privacyPolicy.seeMore')}</Text>
            <Ionicons name="chevron-forward" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Links */}
        <View style={styles.linksContainer}>
          <LinkItem title={t('privacyPolicy.links.termsUse')} onPress={() => router.push('/screens/terms-use')} />
          <LinkItem title={t('privacyPolicy.links.faqs')} onPress={() => router.push('/screens/faqs')} />
          <LinkItem title={t('privacyPolicy.links.shareApp')} onPress={handleShareApp} />
          <ExternalLink href="https://lifeline-mu.vercel.app/">
            <LinkItem title={t('privacyPolicy.links.visitWebsite')} />
          </ExternalLink>
        </View>
      </ScrollView>

      {/* Privacy Modal */}
      <Modal
        visible={showPrivacyModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowPrivacyModal(false)}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{t('privacyPolicy.header')}</Text>
            <View style={styles.placeholder} />
          </View>
          <ScrollView style={styles.modalContent}>
            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>{t('privacyPolicy.sections.informationWeCollect.title')}</Text>
              <Text style={styles.sectionText}>
                {t('privacyPolicy.sections.informationWeCollect.description1')}
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={styles.sectionText}>
                {t('privacyPolicy.sections.informationWeCollect.description2')}
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>{t('privacyPolicy.sections.howWeUseInformation.title')}</Text>
              <Text style={styles.sectionText}>
                {t('privacyPolicy.sections.howWeUseInformation.description')}
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>{t('privacyPolicy.sections.informationSharing.title')}</Text>
              <Text style={styles.sectionText}>
                {t('privacyPolicy.sections.informationSharing.description')}
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>{t('privacyPolicy.sections.dataSecurity.title')}</Text>
              <Text style={styles.sectionText}>
                {t('privacyPolicy.sections.dataSecurity.description')}
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>{t('privacyPolicy.sections.yourRights.title')}</Text>
              <Text style={styles.sectionText}>
                {t('privacyPolicy.sections.yourRights.description')}
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>{t('privacyPolicy.sections.childrenPrivacy.title')}</Text>
              <Text style={styles.sectionText}>
                {t('privacyPolicy.sections.childrenPrivacy.description')}
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>{t('privacyPolicy.sections.changesToPolicy.title')}</Text>
              <Text style={styles.sectionText}>
                {t('privacyPolicy.sections.changesToPolicy.description')}
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>{t('privacyPolicy.sections.contactUs.title')}</Text>
              <Text style={styles.sectionText}>
                {t('privacyPolicy.sections.contactUs.description')}
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>{t('privacyPolicy.sections.internationalDataTransfers.title')}</Text>
              <Text style={styles.sectionText}>
                {t('privacyPolicy.sections.internationalDataTransfers.description')}
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>{t('privacyPolicy.sections.lastUpdated.title')}</Text>
              <Text style={styles.sectionText}>
                {t('privacyPolicy.sections.lastUpdated.description')}
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