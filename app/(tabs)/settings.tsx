import { AntDesign, Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDisplayPreferences } from '../../context/DisplayPreferencesContext';

// Load JetBrains Mono font
const loadFonts = async () => {
  await Font.loadAsync({
    'JetBrainsMono': require('../../assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('../../assets/fonts/JetBrainsMono-Bold.ttf'),
  });
};

// Helper for dynamic text style - moved inside the component
const getTextStyle = (textSize: number, fontBold: boolean, baseStyle = {}) => {
  let fontSize = 14 + textSize * 8; // 14-22px
  let fontFamily = fontBold ? 'JetBrainsMono-Bold' : 'JetBrainsMono';
  return { ...baseStyle, fontSize, fontFamily };
};

type SettingItemProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress?: () => void;
  textSize: number;
  fontBold: boolean;
};

const SettingItem = ({ icon, title, subtitle, onPress, textSize, fontBold }: SettingItemProps) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.iconContainer}>
      {icon}
    </View>
    <View style={styles.textContainer}>
      <Text style={getTextStyle(textSize, fontBold, styles.title)}>{title}</Text>
      <Text style={getTextStyle(textSize, fontBold, styles.subtitle)}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

export default function Settings() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const { textSize, fontBold, brightness, eyeProtection } = useDisplayPreferences();
  
  useEffect(() => {
    loadFonts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadUsername = async () => {
        try {
          const savedData = await AsyncStorage.getItem('profileSettings');
          if (savedData) {
            const parsed = JSON.parse(savedData);
            setUsername(parsed.username || '');
          } else {
            setUsername('');
          }
        } catch {
          setUsername('');
        }
      };
      loadUsername();
    }, [])
  );

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
          <Text style={[styles.headerTitle, getTextStyle(textSize, fontBold, {fontSize: 18})]}
            >{t('settings.title')}</Text>
        </View>

        {/* Settings Grid */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.grid}>
            <SettingItem
              icon={<Ionicons name="person-outline" size={24} color="black" />}
              title={t('settings.profile.title')}
              subtitle={username || t('settings.profile.subtitle')}
              onPress={() => navigateToScreen('profile-settings')}
              textSize={textSize}
              fontBold={fontBold}
            />
            <SettingItem
              icon={<Ionicons name="notifications-outline" size={24} color="black" />}
              title={t('settings.notifications.title')}
              subtitle={t('settings.notifications.subtitle')}
              onPress={() => navigateToScreen('notifications')}
              textSize={textSize}
              fontBold={fontBold}
            />
            <SettingItem
              icon={<Ionicons name="language" size={24} color="black" />}
              title={t('settings.language.title')}
              subtitle={t('settings.language.subtitle')}
              onPress={() => navigateToScreen('languages')}
              textSize={textSize}
              fontBold={fontBold}
            />
            <SettingItem
              icon={<MaterialIcons name="display-settings" size={24} color="black" />}
              title={t('settings.display.title')}
              subtitle={t('settings.display.subtitle')}
              onPress={() => navigateToScreen('display')}
              textSize={textSize}
              fontBold={fontBold}
            />
            <SettingItem
              icon={<FontAwesome5 name="file-contract" size={22} color="black" />}
              title={t('settings.terms.title')}
              subtitle={t('settings.terms.subtitle')}
              onPress={() => navigateToScreen('terms-use')}
              textSize={textSize}
              fontBold={fontBold}
            />
            <SettingItem
              icon={<AntDesign name="infocirlceo" size={22} color="black" />}
              title={t('settings.about.title')}
              subtitle={t('settings.about.subtitle')}
              onPress={() => navigateToScreen('about')}
              textSize={textSize}
              fontBold={fontBold}
            />
            <SettingItem
              icon={<MaterialIcons name="offline-pin" size={24} color="black" />}
              title={t('settings.offline.title')}
              subtitle={t('settings.offline.subtitle')}
              onPress={() => navigateToScreen('offline-content')}
              textSize={textSize}
              fontBold={fontBold}
            />
            <SettingItem
              icon={<Feather name="help-circle" size={24} color="black" />}
              title={t('settings.help.title')}
              subtitle={t('settings.help.subtitle')}
              onPress={() => navigateToScreen('help')}
              textSize={textSize}
              fontBold={fontBold}
            />
          </View>
          
          {/* Show brightness value */}
          <View style={{alignItems: 'center', marginVertical: 10}}>
            <Text style={getTextStyle(textSize, fontBold, {color: '#333'})}>
              {t('settings.display.brightness')}: {Math.round(brightness * 100)}%
            </Text>
          </View>
          
          {/* Show eye protection status */}
          <View style={{alignItems: 'center', marginVertical: 10}}>
            <Text style={getTextStyle(textSize, fontBold, {color: '#333'})}>
              {t('settings.display.eyeProtection')}: {eyeProtection ? t('common.on') : t('common.off')}
            </Text>
          </View>
          
          {/* Delete button centered */}
          <View style={styles.deleteContainer}>
            <SettingItem
              icon={<AntDesign name="delete" size={24} color="black" />}
              title={t('settings.delete.title')}
              subtitle={t('settings.delete.subtitle')}
              onPress={() => navigateToScreen('delete-account')}
              textSize={textSize}
              fontBold={fontBold}
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
    width: '90%',
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
