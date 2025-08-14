// i18n.ts

import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import arabic from './locales/arabic.json';
import dagbani from './locales/dagbani.json';
import en from './locales/en.json';
import spanish from './locales/es.json';
import ewe from './locales/ewe.json';
import french from './locales/fr.json';
import frafra from './locales/frafra.json';
import ga from './locales/ga.json';
import hausa from './locales/hausa.json';
import hindi from './locales/hindi.json';
import russian from './locales/russian.json';
import twi from './locales/twi.json';

// Define supported languages
const resources = {
  en: { translation: en },
  twi: { translation: twi },
  ga: { translation: ga },
  ewe: { translation: ewe },
  frafra: { translation: frafra },
  hausa: { translation: hausa },
  dagbani: { translation: dagbani },
  fr: { translation: french },
  es: { translation: spanish },
  ar: { translation: arabic },
  hi: { translation: hindi },
  ru: { translation: russian },
};

// Detect device language
const detectLanguage = (): string => {
  try {
    const locales = Localization.getLocales();
    const deviceLang = locales[0]?.languageCode?.toLowerCase() || 'en';
    return resources[deviceLang as keyof typeof resources] ? deviceLang : 'en';
  } catch (err) {
    console.warn('Language detection error:', err);
    return 'en';
  }
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: detectLanguage(),
    fallbackLng: 'en',

    debug: __DEV__,

    missingKeyHandler: (lng, ns, key) => {
      if (__DEV__) {
        console.warn(`Missing translation: ${key} in language: ${lng}`);
      }
    },

    // Enable nested translations with dot notation
    keySeparator: '.',
    nsSeparator: ':',
    
    // Return the key if translation is missing
    returnEmptyString: false,
    // Disable returnObjects to prevent React rendering issues
    returnObjects: false,
    returnNull: false,
    
    // Interpolation configuration
    interpolation: {
      escapeValue: false, // Not needed for React as it escapes by default
      format: (value, format, lng) => {
        if (typeof value === 'string') {
          if (format === 'uppercase') return value.toUpperCase();
          if (format === 'lowercase') return value.toLowerCase();
        }
        return value;
      },
      skipOnVariables: false
    },

    defaultNS: 'translation',
    ns: ['translation'],

    react: {
      useSuspense: false,
    },
  });

export default i18n;
