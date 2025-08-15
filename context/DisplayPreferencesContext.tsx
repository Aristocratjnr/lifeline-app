import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the shape of the context
export type DisplayPreferences = {
  textSize: number;
  setTextSize: (size: number) => void;
  fontBold: boolean;
  setFontBold: (bold: boolean) => void;
  brightness: number;
  setBrightness: (value: number) => void;
  eyeProtection: boolean;
  setEyeProtection: (value: boolean) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

const DisplayPreferencesContext = createContext<DisplayPreferences | undefined>(undefined);

export const DisplayPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSizeState] = useState(0.5);
  const [fontBold, setFontBoldState] = useState(false);
  const [brightness, setBrightnessState] = useState(0.7);
  const [eyeProtection, setEyeProtectionState] = useState(false);
  const [darkMode, setDarkModeState] = useState(false);

  useEffect(() => {
    const loadPrefs = async () => {
      try {
        const prefs = await AsyncStorage.getItem('displayPrefs');
        if (prefs) {
          const parsed = JSON.parse(prefs);
          if (parsed.textSize !== undefined) setTextSizeState(parsed.textSize);
          if (parsed.fontBold !== undefined) setFontBoldState(parsed.fontBold);
          if (parsed.brightness !== undefined) setBrightnessState(parsed.brightness);
          if (parsed.eyeProtection !== undefined) setEyeProtectionState(parsed.eyeProtection);
          if (parsed.darkMode !== undefined) setDarkModeState(parsed.darkMode);
        }
      } catch {}
    };
    loadPrefs();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('displayPrefs', JSON.stringify({ textSize, fontBold, brightness, eyeProtection, darkMode }));
  }, [textSize, fontBold, brightness, eyeProtection, darkMode]);

  const setTextSize = (size: number) => setTextSizeState(size);
  const setFontBold = (bold: boolean) => setFontBoldState(bold);
  const setBrightness = (value: number) => setBrightnessState(value);
  const setEyeProtection = (value: boolean) => setEyeProtectionState(value);
  const setDarkMode = (value: boolean) => setDarkModeState(value);

  return (
    <DisplayPreferencesContext.Provider value={{ 
      textSize, setTextSize, 
      fontBold, setFontBold, 
      brightness, setBrightness, 
      eyeProtection, setEyeProtection,
      darkMode, setDarkMode 
    }}>
      {children}
    </DisplayPreferencesContext.Provider>
  );
};

export const useDisplayPreferences = () => {
  const context = useContext(DisplayPreferencesContext);
  if (!context) throw new Error('useDisplayPreferences must be used within a DisplayPreferencesProvider');
  return context;
}; 