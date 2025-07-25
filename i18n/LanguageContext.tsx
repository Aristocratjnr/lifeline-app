
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert, I18nManager, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import i18n from './index';

// Language metadata with display names and native names
export type LanguageOption = {
  code: string;
  name: string;
  nativeName: string;
  isRTL?: boolean;
  flag?: string;
};

export const AVAILABLE_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'twi', name: 'Twi', nativeName: 'Twi', flag: '🇬🇭' },
  { code: 'ga', name: 'Ga', nativeName: 'Ga', flag: '🇬🇭' },
  { code: 'frafra', name: 'Frafra', nativeName: 'Frafra', flag: '🇬🇭' },
  { code: 'ewe', name: 'Ewe', nativeName: 'Ewe', flag: '🇬🇭' },
  { code: 'hausa', name: 'Hausa', nativeName: 'Hausa', flag: '🇳🇬' },
  { code: 'dagbani', name: 'Dagbani', nativeName: 'Dagbani', flag: '🇬🇭' },
  { code: 'french', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'spanish', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'arabic', name: 'Arabic', nativeName: 'العربية', isRTL: true, flag: '🇸🇦' },
  { code: 'hindi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'russian', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' }
];

// Define the shape of the language context
export type LanguageContextType = {
  currentLanguage: string;
  setLanguage: (language: string, restart?: boolean) => Promise<void>;
  isRTL: boolean;
  languageOptions: LanguageOption[];
  getCurrentLanguageOption: () => LanguageOption;
  restartApp: () => Promise<void>;
};

// Create the context
// Create the context with default values to avoid undefined context
const defaultContextValue: LanguageContextType = {
  currentLanguage: 'en',
  setLanguage: async () => {},
  isRTL: false,
  languageOptions: AVAILABLE_LANGUAGES,
  getCurrentLanguageOption: () => AVAILABLE_LANGUAGES[0],
  restartApp: async () => {},
};

// Create the context
const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

// Language provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [isRTL, setIsRTL] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Get language option by code
  const getCurrentLanguageOption = (): LanguageOption => {
    return AVAILABLE_LANGUAGES.find(lang => lang.code === currentLanguage) || AVAILABLE_LANGUAGES[0];
  };

  // Restart the app to apply layout changes (especially important for RTL changes)
  const restartApp = async () => {
    if (Platform.OS === 'web') {
      window.location.reload();
      return;
    }

    try {
      if (process.env.NODE_ENV !== 'development') {
        await Updates.reloadAsync();
      } else {
        Alert.alert(
          'App Restart Required',
          'Please manually restart the app to apply language changes fully.',
          [{ text: 'OK', onPress: () => {} }]
        );
      }
    } catch (error) {
      console.error('Error restarting app:', error);
      Alert.alert(
        'App Restart Required',
        'Please manually restart the app to apply language changes fully.',
        [{ text: 'OK', onPress: () => {} }]
      );
    }
  };

  // Function to change language - define it first
  const setLanguage = async (languageCode: string, restart: boolean = true) => {
    try {
      if (!AVAILABLE_LANGUAGES.some(lang => lang.code === languageCode)) {
        console.warn(`Language code ${languageCode} is not supported, falling back to English`);
        languageCode = 'en';
      }

      // Get language option
      const selectedLang = AVAILABLE_LANGUAGES.find(lang => lang.code === languageCode);
      const shouldBeRTL = selectedLang?.isRTL || false;

      // Change language in i18next
      await i18n.changeLanguage(languageCode);

      // Force i18n cache refresh to ensure translations update
      i18n.store.data = { ...i18n.store.data };

      // Only update if RTL state needs to change
      if (shouldBeRTL !== isRTL) {
        setIsRTL(shouldBeRTL);
        I18nManager.forceRTL(shouldBeRTL);
        I18nManager.allowRTL(shouldBeRTL);
      }

      // Save language to storage
      await AsyncStorage.setItem('user-language', languageCode);

      // Update state
      setCurrentLanguage(languageCode);

      // Optionally restart app to apply RTL changes fully
      if (restart && shouldBeRTL !== isRTL) {
        await restartApp();
      } else {
        // Even without restart, force a re-render of translation components
        // This helps ensure all components pick up the new language immediately
        i18n.emit('languageChanged', languageCode);
      }
    } catch (error) {
      console.error('Error setting language:', error);
    }
  };

  // Load saved language on component mount
  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('user-language');
        if (savedLanguage) {
          await setLanguage(savedLanguage, false);
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Error loading language:', error);
        setIsInitialized(true);
      }
    };

    loadSavedLanguage();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- setLanguage is defined inside the component

  // Don't render until we've loaded the language preference
  if (!isInitialized) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      setLanguage, 
      isRTL, 
      languageOptions: AVAILABLE_LANGUAGES,
      getCurrentLanguageOption,
      restartApp
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  return context;
};
