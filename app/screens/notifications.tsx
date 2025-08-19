import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native';
import { useDisplayPreferences } from '@/context/DisplayPreferencesContext';

// Load JetBrains Mono font
const loadFonts = async () => {
  await Font.loadAsync({
    'JetBrainsMono': require('../../assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('../../assets/fonts/JetBrainsMono-Bold.ttf'),
  });
};

type NotificationItemProps = {
  icon: React.ReactNode;
  title: string;
  isToggle: boolean;
  value?: boolean;
  onValueChange?: (newValue: boolean) => void;
  subtitle?: string;
};

const NotificationItem = ({ 
  icon, 
  title, 
  isToggle, 
  value = false, 
  onValueChange,
  subtitle,
  isDark = false
}: NotificationItemProps & { isDark?: boolean }) => {
  const styles = getStyles(isDark);
  
  return (
    <View style={styles.notificationItem}>
      <View style={styles.leftContent}>
        {icon}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      {isToggle ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: isDark ? '#444' : '#e0e0e0', true: isDark ? '#444' : '#e0e0e0' }}
          thumbColor={value ? (isDark ? '#E0E0E0' : '#000') : (isDark ? '#666' : '#f4f3f4')}
        />
      ) : null}
    </View>
  );
};

const getStyles = (isDark: boolean) => StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255,255,255,0.6)',
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: isDark ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.89)',
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
    color: isDark ? '#E0E0E0' : 'black',
  },
  divider: {
    height: 1,
    backgroundColor: isDark ? '#333' : '#f0f0f0',
    marginHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 80,
  },
  card: {
    backgroundColor: isDark ? '#1E1E1E' : 'white',
    borderRadius: 15,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: isDark ? 0.4 : 0.18,
    shadowRadius: 8,
    elevation: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
    fontFamily: 'JetBrainsMono',
    color: isDark ? '#E0E0E0' : '#333',
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'JetBrainsMono',
    color: isDark ? '#A0A0A0' : '#888',
    marginTop: 2,
  },
  itemDivider: {
    height: 1,
    backgroundColor: isDark ? '#333' : '#f0f0f0',
    marginHorizontal: 15,
  },
});

export default function Notifications() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { darkMode } = useDisplayPreferences();
  const colorScheme = useColorScheme();
  const isDark = darkMode || colorScheme === 'dark';
  const styles = getStyles(isDark);
  
  const [generalNotifications, setGeneralNotifications] = useState(true);
  const [dailyTips, setDailyTips] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <ImageBackground 
      source={require('../../assets/images/blur.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={isDark ? '#E0E0E0' : 'black'} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('settings.notifications.title')}</Text>
        </View>
        
        {/* Notification Settings */}
        <View style={styles.contentContainer}>
          <ScrollView>
            <View style={styles.card}>
              <NotificationItem
                icon={<Ionicons name="notifications-outline" size={22} color={isDark ? '#E0E0E0' : 'black'} />}
                title={t('settings.notifications.general')}
                isToggle={true}
                value={generalNotifications}
                onValueChange={setGeneralNotifications}
                isDark={isDark}
              />
              
              <View style={styles.itemDivider} />
              
              <NotificationItem
                icon={<FontAwesome name="comment" size={22} color={isDark ? '#E0E0E0' : 'black'} />}
                title={t('settings.notifications.dailyTips')}
                isToggle={true}
                value={dailyTips}
                onValueChange={setDailyTips}
                isDark={isDark}
              />
              
              <View style={styles.itemDivider} />
              
              <NotificationItem
                icon={<Feather name="settings" size={22} color={isDark ? '#E0E0E0' : 'black'} />}
                title={t('settings.notifications.appUpdate')}
                subtitle={t('settings.notifications.upToDate')}
                isToggle={false}
                isDark={isDark}
              />
              
              <View style={styles.itemDivider} />
              
              <NotificationItem
                icon={<MaterialIcons name="mail-outline" size={22} color={isDark ? '#E0E0E0' : 'black'} />}
                title={t('settings.notifications.email')}
                isToggle={true}
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                isDark={isDark}
              />
              
              <View style={styles.itemDivider} />
              
              <NotificationItem
                icon={<Ionicons name="volume-medium-outline" size={22} color={isDark ? '#E0E0E0' : 'black'} />}
                title={t('settings.notifications.sound')}
                isToggle={true}
                value={sound}
                onValueChange={setSound}
                isDark={isDark}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
