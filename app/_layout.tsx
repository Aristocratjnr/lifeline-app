import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, useColorScheme as useNativeColorScheme } from 'react-native';
import 'react-native-reanimated';

import { DisplayPreferencesProvider, useDisplayPreferences } from '../context/DisplayPreferencesContext';
import { useColorScheme } from '../hooks/useColorScheme';
import { initI18n } from '../i18n';
import { LanguageProvider } from '../i18n/LanguageContext';

// Wrapper component to access DisplayPreferences context
function RootLayoutContent() {
  const { darkMode } = useDisplayPreferences();
  const systemColorScheme = useNativeColorScheme();
  const colorScheme = darkMode ? 'dark' : systemColorScheme;
  const [i18nInitialized, setI18nInitialized] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Initialize i18n with proper loading state
  useEffect(() => {
    const init = async () => {
      try {
        await initI18n();
        setI18nInitialized(true);
      } catch (error) {
        console.error('Failed to initialize i18n:', error);
        // Fall back to initialized state even on error to prevent app from being stuck
        setI18nInitialized(true);
      }
    };
    init();
  }, []);

  if (!loaded || !i18nInitialized) {
    // Show loading indicator while initializing
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colorScheme === 'dark' ? '#1A1A1A' : '#FFFFFF' }}>
        <ActivityIndicator size="large" color={colorScheme === 'dark' ? '#FFFFFF' : '#000000'} />
        <Text style={{ marginTop: 16, fontSize: 16, color: colorScheme === 'dark' ? '#FFFFFF' : '#000000' }}>
          Loading...
        </Text>
      </View>
    );
  }

  // Apply dark mode styles
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const backgroundColor = colorScheme === 'dark' ? '#121212' : '#FFFFFF';
  const textColor = colorScheme === 'dark' ? '#FFFFFF' : '#000000';
  const statusBarStyle = colorScheme === 'dark' ? 'light' : 'dark';

  return (
    <ThemeProvider value={{
      ...theme,
      colors: {
        ...theme.colors,
        background: backgroundColor,
        card: colorScheme === 'dark' ? '#1E1E1E' : '#FFFFFF',
        text: textColor,
        border: colorScheme === 'dark' ? '#333333' : '#E5E5E5',
        notification: colorScheme === 'dark' ? '#FF3B30' : '#FF3B30',
      },
    }}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: {
            backgroundColor: backgroundColor,
          },
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#FFFFFF',
          },
          headerTintColor: textColor,
          headerTitleStyle: {
            color: textColor,
          },
        }}
      >
        <Stack.Screen 
          name="language-settings" 
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }} 
        />
        <Stack.Screen 
          name="screens/guest-settings" 
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }} 
        />
      </Stack>
      <StatusBar style={statusBarStyle} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <LanguageProvider>
      <DisplayPreferencesProvider>
        <RootLayoutContent />
      </DisplayPreferencesProvider>
    </LanguageProvider>
  );
}