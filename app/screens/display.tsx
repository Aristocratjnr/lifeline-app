import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import {
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

  useEffect(() => {
    loadFonts();
  }, []);

  return (
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

      <View style={styles.divider} />
      
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
        <TouchableOpacity style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <MaterialIcons name="color-lens" size={20} color="black" />
              <Text style={styles.settingLabel}>Theme</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff4f5',
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
});