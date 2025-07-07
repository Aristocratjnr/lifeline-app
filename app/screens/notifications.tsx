import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useDisplayPreferences } from '../../context/DisplayPreferencesContext';

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
  textSize: number;
  fontBold: boolean;
};

const NotificationItem = ({ 
  icon, 
  title, 
  isToggle, 
  value = false, 
  onValueChange,
  subtitle,
  textSize,
  fontBold
}: NotificationItemProps) => {
  // Helper for dynamic text style
  const getTextStyle = (baseStyle = {}) => {
    let fontSize = 14 + textSize * 8; // 14-22px
    let fontFamily = fontBold ? 'JetBrainsMono-Bold' : 'JetBrainsMono';
    return { ...baseStyle, fontSize, fontFamily };
  };

  return (
    <View style={styles.notificationItem}>
      <View style={styles.leftContent}>
        {icon}
        <View style={styles.textContainer}>
          <Text style={getTextStyle(styles.title)}>{title}</Text>
          {subtitle && <Text style={getTextStyle(styles.subtitle)}>{subtitle}</Text>}
        </View>
      </View>
      {isToggle ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#e0e0e0', true: '#e0e0e0' }}
          thumbColor={value ? '#000' : '#f4f3f4'}
        />
      ) : null}
    </View>
  );
};

export default function Notifications() {
  const navigation = useNavigation();
  const [generalNotifications, setGeneralNotifications] = useState(true);
  const [dailyTips, setDailyTips] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [sound, setSound] = useState(false);
  // Move state declarations here
  const [textSize, setTextSize] = useState(0.5); // default medium
  const [fontBold, setFontBold] = useState(false);
  const { eyeProtection } = useDisplayPreferences();
  const fadeAnim = useRef(new Animated.Value(eyeProtection ? 1 : 0)).current;

  useEffect(() => {
    loadFonts();
    // Load display preferences
    const loadDisplayPrefs = async () => {
      try {
        const prefs = await AsyncStorage.getItem('displayPrefs');
        if (prefs) {
          const parsed = JSON.parse(prefs);
          if (parsed.textSize !== undefined) setTextSize(parsed.textSize);
          if (parsed.fontBold !== undefined) setFontBold(parsed.fontBold);
        }
      } catch {}
    };
    loadDisplayPrefs();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: eyeProtection ? 1 : 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [eyeProtection, fadeAnim]);

  // Helper for dynamic text style (used in header)
  const getTextStyle = (baseStyle: React.ComponentProps<typeof Text>['style'] = {}) => {
    const styleObj = Array.isArray(baseStyle) ? Object.assign({}, ...baseStyle) : baseStyle || {};
    let fontSize = (styleObj.fontSize || 14) + textSize * 8;
    let fontFamily = fontBold ? 'JetBrainsMono-Bold' : 'JetBrainsMono';
    return { ...styleObj, fontSize, fontFamily };
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/blur.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <Animated.View
        pointerEvents="none"
        style={[
          styles.eyeProtectionOverlay,
          { opacity: fadeAnim },
        ]}
      />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, getTextStyle({fontSize: 18})]}>NOTIFICATIONS</Text>
        </View>
        
        {/* Notification Settings */}
        <View style={styles.contentContainer}>
          <ScrollView>
            <View style={styles.card}>
              <NotificationItem
                icon={<Ionicons name="notifications-outline" size={22} color="black" />}
                title="General Notifications"
                isToggle={true}
                value={generalNotifications}
                onValueChange={setGeneralNotifications}
                textSize={textSize}
                fontBold={fontBold}
              />
              
              <View style={styles.itemDivider} />
              
              <NotificationItem
                icon={<FontAwesome name="comment" size={22} color="black" />}
                title="Daily Tips"
                isToggle={true}
                value={dailyTips}
                onValueChange={setDailyTips}
                textSize={textSize}
                fontBold={fontBold}
              />
              
              <View style={styles.itemDivider} />
              
              <NotificationItem
                icon={<Feather name="settings" size={22} color="black" />}
                title="App Update"
                subtitle="(Up-to-date)"
                isToggle={false}
                textSize={textSize}
                fontBold={fontBold}
              />
              
              <View style={styles.itemDivider} />
              
              <NotificationItem
                icon={<MaterialIcons name="mail-outline" size={22} color="black" />}
                title="Email Notifications"
                isToggle={true}
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                textSize={textSize}
                fontBold={fontBold}
              />
              
              <View style={styles.itemDivider} />
              
              <NotificationItem
                icon={<Ionicons name="volume-medium-outline" size={22} color="black" />}
                title="Sound"
                isToggle={true}
                value={sound}
                onValueChange={setSound}
                textSize={textSize}
                fontBold={fontBold}
              />
            </View>
          </ScrollView>
        </View>
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
  eyeProtectionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 236, 140, 0.35)',
    zIndex: 2,
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
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 80,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
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
    color: '#333',
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'JetBrainsMono',
    color: '#888',
    marginTop: 2,
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 15,
  },
});