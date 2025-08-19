import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
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

export default function About() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { darkMode } = useDisplayPreferences();

  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <ImageBackground
      source={darkMode ? require('../../assets/images/blur.png') : require('../../assets/images/blur.png')}
      style={[styles.backgroundImage, darkMode && { opacity: 0.9 }]}
      resizeMode="cover"
    >
      <View style={[styles.overlay, darkMode && styles.darkOverlay]} />
      <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={darkMode ? '#fff' : '#000'} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, darkMode && styles.darkHeaderTitle]}>{t('about.title')}</Text>
        </View>

        <ScrollView style={styles.scrollContent}>
          {/* About Lifeline Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, darkMode && styles.darkSectionTitle]}>{t('about.aboutUs')}</Text>
            <Text style={[styles.sectionText, darkMode && styles.darkText]}>
              {t('about.lifelineDescription')}
            </Text>
            <View style={styles.divider} />
          </View>

          {/* App Version Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, darkMode && styles.darkSectionTitle]}>{t('about.appVersion')}</Text>
            <Text style={[styles.sectionText, darkMode && styles.darkText]}>{t('about.versionNumber')}</Text>
            <View style={styles.divider} />
          </View>

          {/* Acknowledgement Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, darkMode && styles.darkSectionTitle]}>{t('about.acknowledgement')}</Text>
            <Text style={[styles.sectionText, darkMode && styles.darkText]}>
              {t('about.acknowledgementDescription')}
            </Text>

            <Text style={[styles.creditName, styles.spacingTop, darkMode && styles.darkCreditName]}>
              {t('about.daniellaCredit')}
            </Text>

            <Text style={[styles.creditName, styles.spacingTop, darkMode && styles.darkCreditName]}>
              {t('about.davidCredit')}
            </Text>

            <Text style={[styles.creditName, styles.spacingTop, darkMode && styles.darkCreditName]}>
              {t('about.specialMention')}
            </Text>
            <Text style={[styles.sectionText, darkMode && styles.darkText]}>
              {t('about.stephenCredit')}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  darkOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  darkHeaderTitle: {
    color: '#fff',
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
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  darkSectionTitle: {
    color: '#fff',
  },
  sectionText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  darkText: {
    color: '#e0e0e0',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 10,
    opacity: 0.5,
  },
  creditName: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
    color: '#333',
  },
  darkCreditName: {
    color: '#4DA6FF',
  },
  spacingTop: {
    marginTop: 15,
  },
});