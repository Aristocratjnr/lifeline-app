import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

interface DisplayPreferencesContextType {
  textSize: number;
  setTextSize: (size: number) => void;
  fontBold: boolean;
  setFontBold: (bold: boolean) => void;
  savePreferences: () => Promise<void>;
}

export const DisplayPreferencesContext = createContext<DisplayPreferencesContextType>({
  textSize: 0.5,
  setTextSize: () => {},
  fontBold: false,
  setFontBold: () => {},
  savePreferences: async () => {},
});

export const DisplayPreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [textSize, setTextSize] = useState(0.5);
  const [fontBold, setFontBold] = useState(false);

  useEffect(() => {
    const loadPrefs = async () => {
      try {
        const prefs = await AsyncStorage.getItem('displayPrefs');
        if (prefs) {
          const parsed = JSON.parse(prefs);
          if (parsed.textSize !== undefined) setTextSize(parsed.textSize);
          if (parsed.fontBold !== undefined) setFontBold(parsed.fontBold);
        }
      } catch {}
    };
    loadPrefs();
  }, []);

  const savePreferences = async () => {
    await AsyncStorage.setItem('displayPrefs', JSON.stringify({ textSize, fontBold }));
  };

  return (
    <DisplayPreferencesContext.Provider value={{ textSize, setTextSize, fontBold, setFontBold, savePreferences }}>
      {children}
    </DisplayPreferencesContext.Provider>
  );
}; 