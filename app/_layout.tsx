import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { DisplayPreferencesProvider } from '../context/DisplayPreferencesContext';
import { initI18n } from '../i18n';
import { LanguageProvider } from '../i18n/LanguageContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
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

  return (
    <LanguageProvider>
      <DisplayPreferencesProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'fade',
              // Add global styling options for all screens
              contentStyle: {
                backgroundColor: colorScheme === 'dark' ? '#1A1A1A' : '#FFFFFF',
              },
            }}
          >
            <Stack.Screen name="language-settings" options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }} />
          </Stack>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </ThemeProvider>
      </DisplayPreferencesProvider>
    </LanguageProvider>
  );
}