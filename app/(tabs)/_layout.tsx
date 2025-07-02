import { HapticTab } from '@/components/HapticTab';
import LoaderWrapper from '@/components/loaderWrapper';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
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
      <TouchableOpacity
        style={styles.sosButton}
        onPress={() => router.push('/sos')}
      >
        <MaterialIcons name="sos" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sosButton: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 82 : 24,
    right: 12,
    backgroundColor: '#EF4444',
    width: 54,
    height: 54,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 1000,
  },
});
