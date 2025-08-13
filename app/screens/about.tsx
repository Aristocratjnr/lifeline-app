import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
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

export default function About() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    loadFonts();
  }, []);

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
          <Text style={styles.headerTitle}>{t('about.header')}</Text>
        </View>

        <ScrollView style={styles.scrollContent}>
          {/* About Lifeline Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('about.aboutLifeline')}</Text>
            <Text style={styles.sectionText}>
              {t('about.lifelineDescription')}
            </Text>
             <View style={styles.divider} />
          </View>
          

          {/* App Version Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('about.appVersion')}</Text>
            <Text style={styles.sectionText}>{t('about.versionNumber')}</Text>
            <View style={styles.divider} />
          </View>

          {/* Acknowledgement Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('about.acknowledgement')}</Text>
            <Text style={styles.sectionText}>
              {t('about.acknowledgementDescription')}
            </Text>
            
            <Text style={[styles.creditName, styles.spacingTop]}>
              {t('about.daniellaCredit')}
            </Text>
            
            <Text style={[styles.creditName, styles.spacingTop]}>
              {t('about.davidCredit')}
            </Text>
            
            <Text style={[styles.creditName, styles.spacingTop]}>
              {t('about.specialMention')}
            </Text>
            <Text style={styles.sectionText}>
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
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  sectionText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 10,
  },
  creditName: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
    color: '#333',
  },
  spacingTop: {
    marginTop: 15,
  },
});