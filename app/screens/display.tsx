import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Modal,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Load JetBrains Mono font
const loadFonts = async () => {
  await Font.loadAsync({
    'JetBrainsMono': require('../../assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('../../assets/fonts/JetBrainsMono-Bold.ttf'),
  });
};

export default function Display() {
  const navigation = useNavigation();
  const [fontBold, setFontBold] = useState(false);
  const [eyeProtection, setEyeProtection] = useState(false);
  const [brightness, setBrightness] = useState(0.7);
  const [textSize, setTextSize] = useState(0.5);
  const [theme, setTheme] = useState('Light');
  const [showThemeModal, setShowThemeModal] = useState(false);

  useEffect(() => {
    loadFonts();
  }, []);

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
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>DISPLAY</Text>
        </View>

        {/* Display Settings */}
        <View style={styles.contentContainer}>
          {/* Brightness */}
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Brightness</Text>
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
            <Text style={styles.settingLabel}>Text Size</Text>
            <View style={styles.sliderContainer}>
              <Text style={styles.smallA}>A</Text>
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
              <Text style={styles.largeA}>A</Text>
            </View>
          </View>

          {/* Text Bold */}
          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <Text style={[styles.textBold, styles.settingLabel]}>B</Text>
                <Text style={styles.settingLabel}>Text Bold</Text>
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
                <Text style={styles.settingLabel}>Theme</Text>
              </View>
              <View style={styles.themeValueContainer}>
                <Text style={styles.themeValue}>{theme}</Text>
                <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Eye Protection */}
          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <Ionicons name="eye-outline" size={20} color="black" />
                <Text style={styles.settingLabel}>Eye Protection</Text>
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
                <Text style={styles.modalTitle}>Select Theme</Text>
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
                  <Text style={styles.themeOptionText}>Light Mode</Text>
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
                  <Text style={styles.themeOptionText}>Dark Mode</Text>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
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
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    padding: 20,
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