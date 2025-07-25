import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'expo-status-bar';
import { useThemeColor } from '@/hooks/useThemeColor';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from '@/i18n/LanguageContext';

export default function LanguageSwitcherScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background');
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const { getCurrentLanguageOption } = useLanguage();

  const currentLang = getCurrentLanguageOption();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backButtonText, { color: textColor }]}>
            ← {t('common.back')}
          </Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: textColor }]}>
          {t('languages.title')}
        </Text>

        <View style={styles.rightPlaceholder} />
      </View>

      <View style={styles.currentLanguage}>
        <Text style={[styles.currentLanguageLabel, { color: textColor }]}>
          {t('settings.language')}:
        </Text>
        <View style={styles.currentLanguageValue}>
          {currentLang.flag && <Text style={styles.currentLanguageFlag}>{currentLang.flag}</Text>}
          <Text style={[styles.currentLanguageName, { color: textColor }]}>
            {currentLang.name} ({currentLang.nativeName})
          </Text>
        </View>
      </View>

      <View style={styles.selectorContainer}>
        <LanguageSelector
          headerTitle={t('languages.title')}
          closeAfterSelection={false}
        />
      </View>

      <Text style={styles.comingSoonText}>
        {t('languages.comingSoon')}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightPlaceholder: {
    width: 60,
  },
  currentLanguage: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  currentLanguageLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  currentLanguageValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentLanguageFlag: {
    fontSize: 24,
    marginRight: 8,
  },
  currentLanguageName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectorContainer: {
    flex: 1,
  },
  comingSoonText: {
    textAlign: 'center',
    color: '#888888',
    paddingVertical: 12,
    fontStyle: 'italic',
  },
});
