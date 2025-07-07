import { AntDesign, Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Load JetBrains Mono font
const loadFonts = async () => {
  await Font.loadAsync({
    'JetBrainsMono': require('../../assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('../../assets/fonts/JetBrainsMono-Bold.ttf'),
  });
};

type SettingItemProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress?: () => void;
};

const SettingItem = ({ icon, title, subtitle, onPress }: SettingItemProps) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.iconContainer}>
      {icon}
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

export default function Settings() {
  const navigation = useNavigation();

  useEffect(() => {
    loadFonts();
  }, []);

  const navigateToScreen = (screen: string) => {
    router.push(`/screens/${screen}` as any);
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/blur.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Faded overlay */}
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>SETTINGS</Text>
        </View>

        {/* Settings Grid */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.grid}>
            <SettingItem
              icon={<Ionicons name="person-outline" size={24} color="black" />}
              title="Profile"
              subtitle="Agradaa"
              onPress={() => navigateToScreen('profile-settings')}
            />
            <SettingItem
              icon={<Ionicons name="notifications-outline" size={24} color="black" />}
              title="Notifications"
              subtitle="Preferences"
              onPress={() => navigateToScreen('notifications')}
            />
            <SettingItem
              icon={<Ionicons name="language" size={24} color="black" />}
              title="Language"
              subtitle="Change Language"
              onPress={() => navigateToScreen('languages')}
            />
            <SettingItem
              icon={<MaterialIcons name="display-settings" size={24} color="black" />}
              title="Display"
              subtitle="Accessibility"
              onPress={() => navigateToScreen('display')}
            />
            <SettingItem
              icon={<FontAwesome5 name="file-contract" size={22} color="black" />}
              title="Terms & Use"
              subtitle="Privacy Policy"
              onPress={() => navigateToScreen('terms-use')}
            />
            <SettingItem
              icon={<AntDesign name="infocirlceo" size={22} color="black" />}
              title="About"
              subtitle="What to know"
              onPress={() => navigateToScreen('about')}
            />
            <SettingItem
              icon={<MaterialIcons name="offline-pin" size={24} color="black" />}
              title="Offline Content"
              subtitle="Management"
              onPress={() => navigateToScreen('offline-content')}
            />
            <SettingItem
              icon={<Feather name="help-circle" size={24} color="black" />}
              title="Help?"
              subtitle="Need Help?"
              onPress={() => navigateToScreen('help')}
            />
          </View>
          
          {/* Delete button centered */}
          <View style={styles.deleteContainer}>
            <SettingItem
              icon={<AntDesign name="delete" size={24} color="black" />}
              title="Delete?"
              subtitle="Temporary, Permanent, Deactivate Account"
              onPress={() => navigateToScreen('delete-account')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)', // Adjust alpha for more/less fade
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.89)', 
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Bold',
    marginRight: 30,
  },
  scrollContent: {
    padding: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  deleteContainer: {
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  settingItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    width: '48%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  iconContainer: {
    marginBottom: 8,
  },
  textContainer: {
    
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
    fontFamily: 'JetBrainsMono',
  },
});