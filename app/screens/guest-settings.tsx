import { AntDesign, Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDisplayPreferences } from '../../context/DisplayPreferencesContext';

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

// Helper for dynamic text style
const getTextStyle = (textSize: number, fontBold: boolean, baseStyle = {}) => {
  const fontSize = 14 + textSize * 8; // 14-22px
  const fontFamily = fontBold ? 'JetBrainsMono-Bold' : 'JetBrainsMono';
  return { ...baseStyle, fontSize, fontFamily };
};

export default function GuestSettings() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { textSize, fontBold } = useDisplayPreferences();

  const navigateToScreen = (screen: string) => {
    router.push(`/screens/${screen}` as any);
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/blur.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
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
          <Text style={[styles.headerTitle, getTextStyle(textSize, fontBold, {fontSize: 18})]}>
            {t('settings.guest.title')}
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.grid}>
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
              icon={<Feather name="help-circle" size={24} color="black" />}
              title={t('settings.help.title')}
              subtitle={t('settings.help.subtitle')}
              onPress={() => navigateToScreen('help')}
              textSize={textSize}
              fontBold={fontBold}
            />
          </View>
          
          {/* Sign In/Sign Up Section */}
          <View style={styles.authContainer}>
            <Text style={[styles.authTitle, getTextStyle(textSize, fontBold)]}>
              {t('settings.guest.authTitle')}
            </Text>
            <Text style={[styles.authSubtitle, getTextStyle(textSize, fontBold, { fontSize: 12 })]}>
              {t('settings.guest.authSubtitle')}
            </Text>
            
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
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  settingItem: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  authContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    alignItems: 'center',
  },
  authButtonsContainer: {
    width: '100%',
    marginTop: 10,
  },
  signInButton: {
    backgroundColor: '#007AFF',
  },
  signInButtonText: {
    color: 'white',
  },
  signUpButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
    marginTop: 0,
  },
  signUpButtonText: {
    color: '#007AFF',
  },
  authOrText: {
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  authTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  authSubtitle: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  authButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  authButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
