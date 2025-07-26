
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert, I18nManager, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import i18n from './i18n';

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
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', isRTL: true, flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' }
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
      // Check if we're in a browser environment
      try {
        // Use globalThis which is available in modern browsers and Node.js
        const globalWindow = globalThis as any;
        if (globalWindow && globalWindow.location && typeof globalWindow.location.reload === 'function') {
          globalWindow.location.reload();
        }
      } catch (e) {
        // Fallback to window if globalThis doesn't work
        try {
          // Type-safe access to window object
          const win: any = (global as any).window || (typeof window !== 'undefined' ? window : undefined);
          if (win && win.location && typeof win.location.reload === 'function') {
            win.location.reload();
          }
        } catch (e2) {
          // If both fail, just log
          if (__DEV__) {
            console.log('Could not restart app in web environment');
          }
        }
      }
      return;
    }

    try {
      // Try to reload the app without showing alert
      try {
        if (Updates.isEnabled) {
          await Updates.reloadAsync();
        } else {
          // Only log in development mode
          if (__DEV__) {
            console.log('Development mode: App restart might be needed for full RTL support');
          }
        }
      } catch (error) {
        // Only log in development mode
        if (__DEV__) {
          console.log('Development mode: App restart might be needed for full RTL support');
        }
      }
    } catch (error) {
      console.error('Error restarting app:', error);
      // Silent fail - don't show alert to user
    }
  };

  // Function to change language
  const setLanguage = async (languageCode: string, restart: boolean = false) => {
    try {
      if (!AVAILABLE_LANGUAGES.some(lang => lang.code === languageCode)) {
        console.warn(`Language code ${languageCode} is not supported, falling back to English`);
        languageCode = 'en';
      }

      // Get language option
      const selectedLang = AVAILABLE_LANGUAGES.find(lang => lang.code === languageCode);
      const shouldBeRTL = selectedLang?.isRTL || false;

      console.log(`Changing language to: ${languageCode}`);

      // Change language using i18n
      await i18n.changeLanguage(languageCode);

      // Only update if RTL state needs to change
      if (shouldBeRTL !== isRTL) {
        setIsRTL(shouldBeRTL);
        I18nManager.forceRTL(shouldBeRTL);
        I18nManager.allowRTL(shouldBeRTL);

        // RTL changes usually need restart
        if (restart) {
          await restartApp();
        }
      }

      // Save language to storage
      await AsyncStorage.setItem('user-language', languageCode);

      // Update state
      setCurrentLanguage(languageCode);

      console.log(`Language changed to: ${languageCode}`);
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
