
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18next, { use as i18nextUse, init as i18nextInit } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

// Import all translations
import arabicTranslation from './translations/arabic';
import dagbaniTranslation from './translations/dagbani';
import enTranslation from './translations/en';
import eweTranslation from './translations/ewe';
import fraFraTranslation from './translations/frafra';
import frTranslation from './translations/french';
import gaTranslation from './translations/ga';
import hausaTranslation from './translations/hausa';
import hindiTranslation from './translations/hindi';
import russianTranslation from './translations/russian';
import esTranslation from './translations/spanish';
import twiTranslation from './translations/twi';

// Map of RTL languages
const RTL_LANGUAGES = ['ar'];

// Initialize i18n resources
const resources = {
  en: {
    translation: enTranslation
  },
  twi: {
    translation: twiTranslation
  },
  ga: {
    translation: gaTranslation
  },
  frafra: {
    translation: fraFraTranslation
  },
  ewe: {
    translation: eweTranslation
  },
  hausa: {
    translation: hausaTranslation
  },
  dagbani: {
    translation: dagbaniTranslation
  },
  fr: {
    translation: frTranslation
  },
  es: {
    translation: esTranslation
  },
  ar: {
    translation: arabicTranslation
  },
  hi: {
    translation: hindiTranslation
  },
  ru: {
    translation: russianTranslation
  }
};

// Available languages codes for validation
export const availableLanguages = Object.keys(resources);

// Helper to determine if a language code is RTL
export const isRTLLanguage = (code) => RTL_LANGUAGES.includes(code.toLowerCase());

// Load saved language preference or detect from device
export const getStoredLanguage = async () => {
  try {
    // Try to get saved language first
    const savedLanguage = await AsyncStorage.getItem('user-language');
    if (savedLanguage && availableLanguages.includes(savedLanguage)) {
      return savedLanguage;
    }

    // Fall back to device locale if available and supported
    const locales = Localization.getLocales && Localization.getLocales();
    const deviceLocale = locales && locales.length > 0 ? locales[0].languageCode : 'en';
    if (availableLanguages.includes(deviceLocale)) {
      return deviceLocale;
    }

    // Default to English
    return 'en';
  } catch (error) {
    console.error('Failed to load language preference:', error);
    return 'en';
  }
};

// Initialize i18next with enhanced configuration
export const initI18n = async () => {
  const language = await getStoredLanguage();
  const isRTL = isRTLLanguage(language);

  // Set RTL configuration
  if (isRTL !== I18nManager.isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
  }

  // Initialize i18next
  i18nextUse(initReactI18next);
  await i18nextInit({
    resources,
    lng: language,
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    // Add more features
    returnNull: false, // Return empty string instead of null
    returnEmptyString: false, // Return key instead of empty string
    saveMissing: __DEV__, // Save missing translations in dev mode
    missingKeyHandler: (lng, ns, key) => {
      if (__DEV__) {
        console.warn(`Missing translation key: ${key} for language: ${lng}`);
      }
    }
  });

  return i18next;
};

// Function to get language display name
export const getLanguageDisplayName = (code) => {
  switch (code) {
    case 'en': return 'English';
    case 'twi': return 'Twi';
    case 'ga': return 'Ga';
    case 'frafra': return 'Frafra';
    case 'ewe': return 'Ewe';
    case 'hausa': return 'Hausa';
    case 'dagbani': return 'Dagbani';
    case 'fr': return 'Français';
    case 'es': return 'Español';
    case 'ar': return 'العربية';
    case 'hi': return 'हिन्दी';
    case 'ru': return 'Русский';
    default: return code;
  }
};

export default i18next;
