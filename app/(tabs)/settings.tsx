import { AntDesign, Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { useDisplayPreferences } from '../../context/DisplayPreferencesContext';

type RootStackParamList = {
  'screens/help': undefined;
  'screens/about': undefined;
  'screens/delete-account': undefined;
  'screens/display': undefined;
  'screens/language': undefined;
  'screens/notifications': undefined;
  'screens/terms': undefined;
  'screens/privacy': undefined;
  'screens/faq': undefined;
  'screens/contact': undefined;
  'screens/profile': undefined;
  'screens/login': undefined;
  'screens/register': undefined;
  'screens/forgot-password': undefined;
  'screens/reset-password': undefined;
  'screens/verification': undefined;
  'screens/home': undefined;
  'screens/dashboard': undefined;
  'screens/settings': undefined;
  'screens/profile-settings': undefined;
  'screens/security': undefined;
  'screens/notifications-settings': undefined;
  'screens/display-settings': undefined;
  'screens/language-settings': undefined;
  'screens/help-support': undefined;
  'screens/about-app': undefined;
  'screens/terms-conditions': undefined;
  'screens/privacy-policy': undefined;
  'screens/faqs': undefined;
  'screens/contact-us': undefined;
  'screens/feedback': undefined;
  'screens/rate-app': undefined;
  'screens/share-app': undefined;
  'screens/logout': undefined;
  'screens/offline-content': undefined;
  // Add other screen names as needed
};

type IconProps = {
  color?: string;
  size?: number;
  [key: string]: any;
};

// Font loading hook
const useLoadFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'JetBrainsMono': require('../../assets/fonts/JetBrainsMono-Regular.ttf'),
        'JetBrainsMono-Bold': require('../../assets/fonts/JetBrainsMono-Bold.ttf'),
      });
      setFontsLoaded(true);
    };
    
    loadFonts();
  }, []);
  
  return fontsLoaded;
};

// Helper for dynamic text style - moved inside the component
const getTextStyle = (textSize: number, fontBold: boolean, baseStyle = {}) => {
  let fontSize = 14 + textSize * 8; // 14-22px
  let fontFamily = fontBold ? 'JetBrainsMono-Bold' : 'JetBrainsMono';
  return { ...baseStyle, fontSize, fontFamily };
};

type Theme = {
  background: string;
  card: string;
  text: string;
  subtitle: string;
  icon: string;
  overlay: string;
  containerBg: string;
};

type SettingItemProps = {
  icon: React.ReactElement<IconProps>;
  title: string;
  subtitle: string;
  onPress?: () => void;
  textSize: number;
  fontBold: boolean;
};

const SettingItem = React.memo(({ icon, title, subtitle, onPress, textSize, fontBold }: SettingItemProps) => {
  const { darkMode } = useDisplayPreferences();
  const iconColor = darkMode ? '#ffffff' : '#000000';
  const cardColor = darkMode ? '#2d2d2d' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#000000';
  const subTextColor = darkMode ? '#a0a0a0' : '#666666';
  
  const iconWithTheme = React.cloneElement(icon, { 
    color: iconColor,
    size: 24
  });
  
  return (
    <TouchableOpacity 
      style={[styles.settingItem, { backgroundColor: cardColor }]} 
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        {iconWithTheme}
      </View>
      <View style={styles.textContainer}>
        <Text style={[getTextStyle(textSize, fontBold, styles.title), { color: textColor }]}>
          {title}
        </Text>
        <Text style={[getTextStyle(textSize, fontBold, styles.subtitle), { color: subTextColor }]}>
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

export default function Settings() {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState('');
  const { textSize, fontBold, brightness, eyeProtection, darkMode } = useDisplayPreferences();
  const systemColorScheme = useColorScheme();
  const isDark = darkMode; // darkMode is a boolean in the context
  
  // Theme colors
  const overlayColor = isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.6)';
  const containerBg = isDark ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.89)';
  const iconColor = isDark ? '#ffffff' : '#000000';
  
  const fontsLoaded = useLoadFonts();

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
    if (screen === 'screens/profile-settings') {
      router.push('/(screens)/profile-settings');
    } else {
      // @ts-ignore - We know the screen is valid
      navigation.navigate(screen);
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/blur.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Faded overlay */}
      <View style={[styles.overlay, { backgroundColor: overlayColor }]} />
      <SafeAreaView style={[styles.container, { backgroundColor: containerBg }]}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={isDark ? '#ffffff' : '#000000'} />
          </TouchableOpacity>
          <Text style={[
              styles.headerTitle, 
              getTextStyle(textSize, fontBold, {fontSize: 18}),
              { color: isDark ? '#ffffff' : '#000000' }
            ]}>
            {t('settings.title')}
          </Text>
        </View>

        {/* Settings Grid */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.grid}>
            {!username && (
              <SettingItem
                icon={<Ionicons name="person-outline" size={24} color={iconColor} />}
                title={t('settings.guest.title')}
                subtitle={t('settings.guest.subtitle')}
                onPress={() => router.push('/screens/guest-settings')}
                textSize={textSize}
                fontBold={fontBold}
              />
            )}
            <SettingItem
              icon={<Ionicons name="person-outline" size={24} color={iconColor} />}
              title={t('settings.profile.title')}
              subtitle={username || t('settings.profile.subtitle')}
              onPress={() => router.push('/(screens)/profile-settings')}
              textSize={textSize}
              fontBold={fontBold}
            />
            <SettingItem
              icon={<Ionicons name="notifications-outline" size={24} color={iconColor} />}
              title={t('settings.notifications.title')}
              subtitle={t('settings.notifications.subtitle')}
              onPress={() => navigateToScreen('screens/notifications')}
              textSize={textSize}
              fontBold={fontBold}
            />
            <SettingItem
              icon={<Ionicons name="language" size={24} color={iconColor} />}
              title={t('settings.language.title')}
              subtitle={t('settings.language.subtitle')}
              onPress={() => navigateToScreen('screens/language')}
              textSize={textSize}
              fontBold={fontBold}
            />
            <SettingItem
              icon={<MaterialIcons name="display-settings" size={24} color={iconColor} />}
              title={t('settings.display.title')}
              subtitle={t('settings.display.subtitle')}
              onPress={() => navigateToScreen('screens/display')}
              textSize={textSize}
              fontBold={fontBold}
            />
            <SettingItem
              icon={<FontAwesome5 name="file-contract" size={22} color={iconColor} />}
              title={t('settings.terms.title')}
              subtitle={t('settings.terms.subtitle')}
              onPress={() => navigateToScreen('screens/terms')}
              textSize={textSize}
              fontBold={fontBold}
            />
            <SettingItem
              icon={<AntDesign name="infocirlceo" size={22} color={iconColor} />}
              title={t('settings.about.title')}
              subtitle={t('settings.about.subtitle')}
              onPress={() => navigateToScreen('screens/about')}
              textSize={textSize}
              fontBold={fontBold}
            />
            <SettingItem
              icon={<MaterialIcons name="offline-pin" size={24} color={iconColor} />}
              title={t('settings.offline.title')}
              subtitle={t('settings.offline.subtitle')}
              onPress={() => navigateToScreen('screens/offline-content')}
              textSize={textSize}
              fontBold={fontBold}
            />
            <SettingItem
              icon={<Feather name="help-circle" size={24} color={iconColor} />}
              title={t('settings.help.title')}
              subtitle={t('settings.help.subtitle')}
              onPress={() => navigateToScreen('screens/help')}
              textSize={textSize}
              fontBold={fontBold}
            />
          </View>
          
          {/* Show brightness value */}
          <View style={{alignItems: 'center', marginVertical: 10}}>
            <Text style={[getTextStyle(textSize, fontBold), { color: isDark ? '#ffffff' : '#333333' }]}>
            {t('settings.display.brightness')}: {Math.round(brightness * 100)}%
          </Text>
          </View>
          
          {/* Show eye protection status */}
          <View style={{alignItems: 'center', marginVertical: 10}}>
            <Text style={[getTextStyle(textSize, fontBold), { color: isDark ? '#ffffff' : '#333333' }]}>
            {t('settings.display.eyeProtection')}: {eyeProtection ? t('common.on') : t('common.off')}
          </Text>
          </View>
          
          {/* Delete button centered */}
          <View style={styles.deleteContainer}>
            <SettingItem
              icon={<AntDesign name="delete" size={24} color={isDark ? '#ffffff' : '#000000'} />}
              title={t('settings.delete.title')}
              subtitle={t('settings.delete.subtitle')}
              onPress={() => navigateToScreen('screens/delete-account')}
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
    zIndex: 1,
  },
  container: {
    flex: 1,
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
