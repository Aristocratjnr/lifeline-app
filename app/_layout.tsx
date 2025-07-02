import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack 
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" options={{ headerShown: false }} />
        <Stack.Screen name="screens/tips" options={{ title: 'Tips' }} />
        <Stack.Screen 
          name="auth/sign-in" 
          options={{ 
            title: 'Sign In',
            presentation: 'modal'
          }} 
        />
        <Stack.Screen 
          name="auth/sign-up" 
          options={{ 
            title: 'Create Account',
            presentation: 'modal'
          }} 
        />
        {/* Add other screens as needed */}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
