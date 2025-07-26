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
  const { textSize, setTextSize, fontBold, setFontBold, brightness, setBrightness, eyeProtection, setEyeProtection } = useDisplayPreferences();
  const [theme, setTheme] = React.useState('Light');
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
    setShowThemeModal(false);
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/blur.png')} 
      style={styles.backgroundImage}
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
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('settings.display.title')}</Text>
        </View>

        {/* Display Settings */}
        <View style={styles.contentContainer}>
          {/* Brightness */}
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>{t('settings.display.brightness')}</Text>
            <View style={styles.sliderContainer}>
              <Feather name="sun" size={16} color="black" />
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={brightness}
                onValueChange={setBrightness}
                minimumTrackTintColor="#DDDDDD"
                maximumTrackTintColor="#DDDDDD"
                thumbTintColor="black"
              />
              <Feather name="sun" size={22} color="black" />
            </View>
          </View>

          {/* Text Size */}
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>{t('settings.display.textSize')}</Text>
            <View style={styles.sliderContainer}>
              <Text style={styles.smallA}>{t('settings.display.small')}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={textSize}
                onValueChange={setTextSize}
                minimumTrackTintColor="#DDDDDD"
                maximumTrackTintColor="#DDDDDD"
                thumbTintColor="black"
              />
              <Text style={styles.largeA}>{t('settings.display.large')}</Text>
            </View>
          </View>

          {/* Text Bold */}
          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <Text style={[styles.textBold, styles.settingLabel]}>{t('settings.display.bold')}</Text>
                <Text style={styles.settingLabel}>{t('settings.display.textBold')}</Text>
              </View>
              <Switch
                value={fontBold}
                onValueChange={setFontBold}
                trackColor={{ false: '#e0e0e0', true: '#e0e0e0' }}
                thumbColor={fontBold ? 'black' : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Theme */}
          <TouchableOpacity 
            style={styles.settingCard}
            onPress={() => setShowThemeModal(true)}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <MaterialIcons name="color-lens" size={20} color="black" />
                <Text style={styles.settingLabel}>{t('settings.display.theme')}</Text>
              </View>
              <View style={styles.themeValueContainer}>
                <Text style={styles.themeValue}>{theme === 'Light' ? t('settings.display.light') : t('settings.display.dark')}</Text>
                <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Eye Protection */}
          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <Ionicons name="eye-outline" size={20} color="black" />
                <Text style={styles.settingLabel}>{t('settings.display.eyeProtection')}</Text>
              </View>
              <Switch
                value={eyeProtection}
                onValueChange={setEyeProtection}
                trackColor={{ false: '#e0e0e0', true: '#e0e0e0' }}
                thumbColor={eyeProtection ? 'black' : '#f4f3f4'}
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
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{t('settings.display.selectTheme')}</Text>
                <TouchableOpacity onPress={() => setShowThemeModal(false)}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                style={[styles.themeOption, theme === 'Light' && styles.selectedThemeOption]}
                onPress={() => handleThemeSelect('Light')}
              >
                <View style={styles.themeOptionContent}>
                  <View style={[styles.themeIcon, { backgroundColor: '#f0f0f0' }]}>
                    <Ionicons name="sunny" size={20} color="#FFD700" />
                  </View>
                  <Text style={styles.themeOptionText}>{t('settings.display.lightMode')}</Text>
                </View>
                {theme === 'Light' && <Ionicons name="checkmark" size={20} color="black" />}
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.themeOption, theme === 'Dark' && styles.selectedThemeOption]}
                onPress={() => handleThemeSelect('Dark')}
              >
                <View style={styles.themeOptionContent}>
                  <View style={[styles.themeIcon, { backgroundColor: '#333' }]}>
                    <Ionicons name="moon" size={20} color="#fff" />
                  </View>
                  <Text style={styles.themeOptionText}>{t('settings.display.darkMode')}</Text>
                </View>
                {theme === 'Dark' && <Ionicons name="checkmark" size={20} color="black" />}
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
  settingLabel: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    color: '#333',
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
  largeA: {
    fontFamily: 'JetBrainsMono',
    fontSize: 20,
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
});