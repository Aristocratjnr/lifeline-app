import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import LoaderWrapper from '@/components/loaderWrapper';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <LoaderWrapper>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Maps',
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name="place" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="firstAidNews"
          options={{
            title: 'News',
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name="newspaper" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="ai-assistant"
          options={{
            title: 'A.I Assistant',
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name="auto-awesome" color={color} />
            ),
            tabBarStyle: { display: 'none' },
          }}
        />
      </Tabs>
    </LoaderWrapper>
  );
}
