import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Language options with flags
const languages = [
  { code: 'ENG', flag: '🇺🇸', name: 'ENG' },
  { code: 'FRA', flag: '🇬🇭', name: 'FRAFRA' },
  { code: 'TWI', flag: '🇬🇭', name: 'TWI' },
  { code: 'GA', flag: '🇬🇭', name: 'GA' },
  { code: 'EWE', flag: '🇬🇭', name: 'EWE' },
  { code: 'HAU', flag: '🇬🇭', name: 'HAUSA' },
  { code: 'DAG', flag: '🇬🇭', name: 'DAGBANI' },
  { code: 'FRE', flag: '🇫🇷', name: 'FRENCH' },
  { code: 'SPA', flag: '🇪🇸', name: 'SPANISH' },
  { code: 'ARA', flag: '🇪🇬', name: 'ARABIC' },
  { code: 'HIN', flag: '🇮🇳', name: 'HINDI' },
  { code: 'RUS', flag: '🇷🇺', name: 'RUSSIAN' },
];

export default function GuestScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+233 (059) 874 1236');
  const [selectedLanguages, setSelectedLanguages] = useState(['ENG']);
  const [gender] = useState('Male/Female');
  
  const [fontsLoaded] = useFonts({
    'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  const toggleLanguage = (code: any) => {
    if (selectedLanguages.includes(code)) {
      setSelectedLanguages(selectedLanguages.filter(lang => lang !== code));
    } else {
      setSelectedLanguages([...selectedLanguages, code]);
    }
  };

  const handleConfirm = () => {
    router.push('/screens/profile'); 
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Complete Your Profile!</Text>
        
        <Text style={styles.description}>
          Unlock personalized guidance and ensure critical info is ready for emergencies.
          Add your info for a safer, more personalized experience.
        </Text>
        
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image 
            source={require('@/assets/images/profile.png')}
            style={styles.profileImage}
            resizeMode="contain"
          />
        </View>
        
        {/* Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Your full name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#888"
            />
            <FontAwesome name="user" size={20} color="#000" style={styles.inputIcon} />
          </View>
        </View>
        
        {/* Phone Number Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <View style={styles.inputContainer}>
            <View style={styles.countryCodeContainer}>
              <Image source={require('@/assets/images/flags/ghana.png')} style={styles.flagIcon} />
              <Text style={styles.countryCode}>🇬🇭</Text>
              <MaterialIcons name="arrow-drop-down" size={24} color="black" />
            </View>
            <TextInput
              style={[styles.input, styles.phoneInput]}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.arrowButton}>
              <MaterialIcons name="arrow-forward" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Language Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Language</Text>
          <View style={styles.languageGrid}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageButton,
                  selectedLanguages.includes(lang.code) && styles.selectedLanguage
                ]}
                onPress={() => toggleLanguage(lang.code)}
              >
                <Text style={styles.languageFlag}>{lang.flag}</Text>
                <Text style={styles.languageText}>{lang.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Gender Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Gender</Text>
          <TouchableOpacity style={styles.inputContainer}>
            <View style={styles.genderIconContainer}>
              <FontAwesome name="venus-mars" size={20} color="#333" />
            </View>
            <Text style={styles.genderText}>{gender}</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="black" style={styles.dropdownIcon} />
          </TouchableOpacity>
        </View>
        
        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm Profile</Text>
        </TouchableOpacity>

        {/* Add extra padding at the bottom to ensure visibility */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  scrollContent: {
    // Increase bottom padding to ensure button visibility
    paddingBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  // Add this for additional space at the bottom
  bottomPadding: {
    height: 40, // Extra space after the button
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'JetBrainsMono-Bold',
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
    fontFamily: 'JetBrainsMono-Regular',
    lineHeight: 20,
  },
  // Replace completionContainer with profileImageContainer
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    // You may want to add a border to match the design
    borderWidth: 2,
    borderColor: '#000',
  },
  inputGroup: {
    marginBottom: 15, // Slightly reduced margin between input groups
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'JetBrainsMono-Bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    height: 50,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
    fontFamily: 'JetBrainsMono-Regular',
  },
  inputIcon: {
    marginRight: 15,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 5,
    borderRightWidth: 1,
    borderRightColor: '#DDD',
  },
  flagIcon: {
    width: 0,
    height: 0,
    marginRight: 5,
  },
  countryCode: {
    fontSize: 16,
    marginRight: 5,
  },
  phoneInput: {
    flex: 1,
  },
  arrowButton: {
    padding: 10,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  languageButton: {
    width: (width - 50) / 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8, // Reduced padding
    marginBottom: 8, // Reduced margin
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
  },
  selectedLanguage: {
    backgroundColor: '#FFE0E0',
    borderColor: '#FF9A9A',
  },
  languageFlag: {
    fontSize: 16,
    marginRight: 5,
  },
  languageText: {
    fontSize: 10,
    fontFamily: 'JetBrainsMono-Regular',
  },
  genderIconContainer: {
    padding: 15,
  },
  genderText: {
    flex: 1,
    fontFamily: 'JetBrainsMono-Regular',
  },
  dropdownIcon: {
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: '#FFB6B6',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 10, // Add margin at the bottom
  },
  confirmButtonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Bold',
  },
});