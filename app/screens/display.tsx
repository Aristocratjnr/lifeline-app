import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  ImageBackground,
  Modal,
  SafeAreaView,
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

export default function Display() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { 
    textSize, setTextSize, 
    fontBold, setFontBold, 
    brightness, setBrightness, 
    eyeProtection, setEyeProtection,
    darkMode, setDarkMode 
  } = useDisplayPreferences();
  
  // Set initial theme based on darkMode state
  const [theme, setTheme] = React.useState(darkMode ? 'Dark' : 'Light');
  const [showThemeModal, setShowThemeModal] = React.useState(false);

  useEffect(() => {
    loadFonts();
  }, []);

  // Animated fade for eye protection overlay
  const fadeAnim = useRef(new Animated.Value(eyeProtection ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: eyeProtection ? 1 : 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [eyeProtection, fadeAnim]);

  const handleThemeSelect = (selectedTheme: string) => {
    setTheme(selectedTheme);
    setDarkMode(selectedTheme === 'Dark');
    setShowThemeModal(false);
  };

  return (
    <ImageBackground 
      source={darkMode ? require('../../assets/images/blur.png') : require('../../assets/images/blur.png')} 
      style={[styles.backgroundImage, darkMode && { opacity: 0.8 }]}
      resizeMode="cover"
    >
      {/* Only show the animated yellow overlay for eye protection */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.eyeProtectionOverlay,
          { opacity: fadeAnim },
        ]}
      />
      <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={darkMode ? '#fff' : 'black'} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, darkMode && styles.darkHeaderTitle]}>{t('settings.display.title')}</Text>
        </View>

        {/* Display Settings */}
        <View style={styles.contentContainer}>
          {/* Brightness */}
          <View style={[styles.settingCard, darkMode && styles.darkSettingCard]}>
            <Text style={[styles.settingLabel, darkMode && styles.darkSettingLabel]}>{t('settings.display.brightness')}</Text>
            <View style={styles.sliderContainer}>
              <Feather name="sun" size={16} color={darkMode ? '#fff' : 'black'} />
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={brightness}
                onValueChange={setBrightness}
                minimumTrackTintColor="#DDDDDD"
                maximumTrackTintColor="#DDDDDD"
                thumbTintColor={darkMode ? '#fff' : 'black'}
              />
              <Feather name="sun" size={22} color={darkMode ? '#fff' : 'black'} />
            </View>
          </View>

          {/* Text Size */}
          <View style={[styles.settingCard, darkMode && styles.darkSettingCard]}>
            <Text style={[styles.settingLabel, darkMode && styles.darkSettingLabel]}>{t('settings.display.textSize')}</Text>
            <View style={styles.sliderContainer}>
              <Text style={[styles.smallA, darkMode && styles.darkSmallA]}>{t('settings.display.small')}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={textSize}
                onValueChange={setTextSize}
                minimumTrackTintColor="#DDDDDD"
                maximumTrackTintColor="#DDDDDD"
                thumbTintColor={darkMode ? '#fff' : 'black'}
              />
              <Text style={[styles.largeA, darkMode && styles.darkLargeA]}>{t('settings.display.large')}</Text>
            </View>
          </View>

          {/* Text Bold */}
          <View style={[styles.settingCard, darkMode && styles.darkSettingCard]}>
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <Text style={[styles.textBold, styles.settingLabel, darkMode && styles.darkSettingLabel]}>{t('settings.display.bold')}</Text>
                <Text style={[styles.settingLabel, darkMode && styles.darkSettingLabel]}>{t('settings.display.textBold')}</Text>
              </View>
              <Switch
                value={fontBold}
                onValueChange={setFontBold}
                trackColor={{ false: '#e0e0e0', true: '#e0e0e0' }}
                thumbColor={fontBold ? (darkMode ? '#fff' : 'black') : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Theme */}
          <TouchableOpacity 
            style={[styles.settingCard, darkMode && styles.darkSettingCard]}
            onPress={() => setShowThemeModal(true)}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <MaterialIcons name="color-lens" size={20} color={darkMode ? '#fff' : 'black'} />
                <Text style={[styles.settingLabel, darkMode && styles.darkSettingLabel]}>{t('settings.display.theme')}</Text>
              </View>
              <View style={styles.themeValueContainer}>
                <Text style={[styles.themeValue, darkMode && styles.darkThemeValue]}>{theme === 'Light' ? t('settings.display.light') : t('settings.display.dark')}</Text>
                <MaterialIcons name="keyboard-arrow-down" size={24} color={darkMode ? '#fff' : 'black'} />
              </View>
            </View>
          </TouchableOpacity>

          {/* Eye Protection */}
          <View style={[styles.settingCard, darkMode && styles.darkSettingCard]}>
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <Ionicons name="eye-outline" size={20} color={darkMode ? '#fff' : 'black'} />
                <Text style={[styles.settingLabel, darkMode && styles.darkSettingLabel]}>{t('settings.display.eyeProtection')}</Text>
              </View>
              <Switch
                value={eyeProtection}
                onValueChange={setEyeProtection}
                trackColor={{ false: '#e0e0e0', true: '#e0e0e0' }}
                thumbColor={eyeProtection ? (darkMode ? '#fff' : 'black') : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* Theme Selection Modal */}
        <Modal
          visible={showThemeModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowThemeModal(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowThemeModal(false)}
          >
            <View style={[styles.modalContent, darkMode && styles.darkModalContent]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, darkMode && styles.darkModalTitle]}>{t('settings.display.selectTheme')}</Text>
                <TouchableOpacity onPress={() => setShowThemeModal(false)}>
                  <Ionicons name="close" size={24} color={darkMode ? '#fff' : 'black'} />
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                style={[styles.themeOption, theme === 'Light' && styles.selectedThemeOption, darkMode && styles.darkSettingCard]}
                onPress={() => handleThemeSelect('Light')}
              >
                <View style={styles.themeOptionContent}>
                  <View style={[styles.themeIcon, { backgroundColor: darkMode ? '#333' : '#f0f0f0' }]}>
                    <Ionicons name="sunny" size={20} color={darkMode ? '#FFD700' : '#FFD700'} />
                  </View>
                  <Text style={[styles.themeOptionText, darkMode && styles.darkThemeOptionText]}>{t('settings.display.lightMode')}</Text>
                </View>
                {theme === 'Light' && <Ionicons name="checkmark" size={20} color={darkMode ? '#fff' : 'black'} />}
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.themeOption, theme === 'Dark' && styles.selectedThemeOption, darkMode && styles.darkSettingCard]}
                onPress={() => handleThemeSelect('Dark')}
              >
                <View style={styles.themeOptionContent}>
                  <View style={[styles.themeIcon, { backgroundColor: darkMode ? '#444' : '#333' }]}>
                    <Ionicons name="moon" size={20} color={darkMode ? '#FFD700' : '#fff'} />
                  </View>
                  <Text style={[styles.themeOptionText, darkMode && styles.darkThemeOptionText]}>{t('settings.display.darkMode')}</Text>
                </View>
                {theme === 'Dark' && <Ionicons name="checkmark" size={20} color={darkMode ? '#FFD700' : 'black'} />}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
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
    backgroundColor: 'rgba(255, 236, 140, 0.35)', // professional soft yellow
    zIndex: 2,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.89)',
  },
  darkContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
  darkHeaderTitle: {
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    padding: 24,
    gap: 10,
  },
  settingCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },
  darkSettingCard: {
    backgroundColor: '#1e1e1e',
    shadowColor: '#000',
  },
  settingLabel: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    color: '#333',
  },
  darkSettingLabel: {
    color: '#fff',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 5,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  smallA: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
  },
  darkSmallA: {
    color: '#fff',
  },
  largeA: {
    fontFamily: 'JetBrainsMono',
    fontSize: 20,
  },
  darkLargeA: {
    color: '#fff',
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  themeValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  themeValue: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    color: '#666',
  },
  darkThemeValue: {
    color: '#aaa',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  darkModalContent: {
    backgroundColor: '#1e1e1e',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 18,
    color: '#333',
  },
  darkModalTitle: {
    color: '#fff',
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedThemeOption: {
    backgroundColor: '#f0f0f0',
  },
  themeOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  themeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeOptionText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 16,
    color: '#333',
  },
  darkThemeOptionText: {
    color: '#fff',
  },
});