import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native';
import { useDisplayPreferences } from '@/context/DisplayPreferencesContext';

// Load JetBrains Mono font
const loadFonts = async () => {
  await Font.loadAsync({
    'JetBrainsMono': require('../../assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('../../assets/fonts/JetBrainsMono-Bold.ttf'),
  });
};

const getStyles = (isDark: boolean) => StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255,255,255,0.6)',
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: isDark ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.89)',
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
    color: isDark ? '#E0E0E0' : 'black',
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentCard: {
    backgroundColor: isDark ? '#1E1E1E' : 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: isDark ? 0.3 : 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
    color: isDark ? '#E0E0E0' : '#333',
    marginBottom: 8,
  },
  sectionText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    lineHeight: 20,
    color: isDark ? '#E0E0E0' : '#333',
    marginBottom: 15,
  },
  warningText: {
    color: '#e53e3e',
    fontFamily: 'JetBrainsMono',
  },
  separator: {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: isDark ? '#444' : '#000',
    marginVertical: 15,
  },
  actionButton: {
    backgroundColor: isDark ? '#d32f2f' : '#ff0000',
    borderRadius: 25,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  actionButtonText: {
    color: 'white',
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
  },
});

export default function DeleteAccount() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { darkMode } = useDisplayPreferences();
  const colorScheme = useColorScheme();
  const isDark = darkMode || colorScheme === 'dark';
  const styles = getStyles(isDark);

  useEffect(() => {
    loadFonts();
  }, []);

  const handleDeactivate = () => {
    Alert.alert(
      t('alerts.deactivateAccount.title'),
      t('alerts.deactivateAccount.message'),
      [
        { text: t('common.cancel'), style: "cancel" },
        { text: t('common.deactivate'), style: "destructive" }
      ]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      t('alerts.deleteAccount.title'),
      t('alerts.deleteAccount.message'),
      [
        { text: t('common.cancel'), style: "cancel" },
        { text: t('common.delete'), style: "destructive" }
      ]
    );
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
            <Ionicons name="arrow-back" size={24} color={isDark ? '#E0E0E0' : 'black'} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('settings.deleteAccount.title')}</Text>
        </View>

        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentCard}>
            {/* Manage Account Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('settings.deleteAccount.manageTitle')}</Text>
              <Text style={styles.sectionText}>
                {t('settings.deleteAccount.manageDescription')}
              </Text>
            </View>

            <View style={styles.separator} />

            {/* Deactivate Account Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('settings.deleteAccount.deactivateTitle')}</Text>
              <Text style={styles.sectionText}>
                {t('settings.deleteAccount.deactivateDescription')}
              </Text>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={handleDeactivate}
              >
                <Text style={styles.actionButtonText}>{t('settings.deleteAccount.deactivateButton')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.separator} />

            {/* Delete Account Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('settings.deleteAccount.deleteTitle')}</Text>
              <Text style={styles.sectionText}>
                {t('settings.deleteAccount.deleteDescription')} <Text style={styles.warningText}>{t('settings.deleteAccount.deleteWarning')}</Text>
              </Text>
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: isDark ? '#b71c1c' : '#d32f2f' }]}
                onPress={handleDelete}
              >
                <Text style={styles.actionButtonText}>{t('settings.deleteAccount.deleteButton')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}