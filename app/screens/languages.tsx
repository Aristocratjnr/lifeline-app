import { Ionicons } from '@expo/vector-icons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useLanguage } from '../../i18n/LanguageContext';
import { useDisplayPreferences } from '../../context/DisplayPreferencesContext';

// Load JetBrains Mono font
const loadFonts = async () => {
  await Font.loadAsync({
    'JetBrainsMono': require('../../assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('../../assets/fonts/JetBrainsMono-Bold.ttf'),
  });
};

// Language data structure
const languages = [
  { id: 1, code: 'en', name: 'ENG', flag: require('../../assets/images/flags/us.png') },
  { id: 2, code: 'frafra', name: 'FRAFRA', flag: require('../../assets/images/flags/ghana.png') },
  { id: 3, code: 'twi', name: 'TWI', flag: require('../../assets/images/flags/ghana.png') },
  { id: 4, code: 'ga', name: 'GA', flag: require('../../assets/images/flags/ghana.png') },
  { id: 5, code: 'ewe', name: 'EWE', flag: require('../../assets/images/flags/ghana.png') },
  { id: 6, code: 'hausa', name: 'HAUSA', flag: require('../../assets/images/flags/ghana.png') },
  { id: 7, code: 'dagbani', name: 'DAGBANI', flag: require('../../assets/images/flags/ghana.png') },
  { id: 8, code: 'fr', name: 'FRENCH', flag: require('../../assets/images/flags/france.png') },
  { id: 9, code: 'es', name: 'SPANISH', flag: require('../../assets/images/flags/spain.png') },
  { id: 10, code: 'ar', name: 'ARABIC', flag: require('../../assets/images/flags/egypt.png') },
  { id: 11, code: 'hi', name: 'HINDI', flag: require('../../assets/images/flags/india.png') },
  { id: 12, code: 'ru', name: 'RUSSIAN', flag: require('../../assets/images/flags/russia.png') },
];

type LanguageItemProps = {
  flag: React.ReactNode;
  name: string;
  onSelect?: () => void;
  selected?: boolean;
  darkMode?: boolean;
};

const LanguageItem = ({ flag, name, onSelect, selected, darkMode = false }: LanguageItemProps) => (
  <TouchableOpacity 
    style={[
      styles.languageItem, 
      darkMode && styles.darkLanguageItem,
      selected && (darkMode ? styles.darkLanguageItemSelected : styles.languageItemSelected)
    ]} 
    onPress={onSelect}
  >
    {flag}
    <Text style={[styles.languageName, darkMode && styles.darkLanguageName]}>{name}</Text>
  </TouchableOpacity>
);

export default function Languages() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState(languages);
  const [selectedLanguageId, setSelectedLanguageId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { t } = useTranslation();
  const { currentLanguage, setLanguage } = useLanguage();
  const { darkMode } = useDisplayPreferences();

  // Set initial selected language based on current language
  useEffect(() => {
    const currentLangObj = languages.find(lang => lang.code === currentLanguage);
    if (currentLangObj) {
      setSelectedLanguageId(currentLangObj.id);
    }
  }, [currentLanguage]);

  useEffect(() => {
    loadFonts();
  }, []);

  // Filter languages based on search text
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredLanguages(languages);
    } else {
      const filtered = languages.filter(language =>
        language.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredLanguages(filtered);
    }
  }, [searchText]);

  // Apply language selection immediately when a language is selected
  const handleLanguageSelect = async (languageId: number) => {
    setSelectedLanguageId(languageId);

    const selectedLang = languages.find(lang => lang.id === languageId);
    if (selectedLang) {
      try {
        await setLanguage(selectedLang.code);
      } catch (error) {
        console.error("Failed to change language:", error);
      }
    }
  };

  const handleSubmit = async () => {
    if (!selectedLanguageId) {
      setModalVisible(true);
      return;
    }

    const selectedLang = languages.find(lang => lang.id === selectedLanguageId);
    if (selectedLang) {
      try {
        // Apply the language change
        await setLanguage(selectedLang.code);

        // Reset navigation stack to Welcome screen for seamless language update
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'screens/welcome' }], 
          })
        );
      } catch (error) {
        console.error("Failed to change language:", error);
        Alert.alert(
          t('languages.error'),
          t('languages.languageChangeFailed'),
          [{ text: "OK" }]
        );
      }
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/blur.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={[styles.overlay, darkMode && styles.darkOverlay]} />
      <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={darkMode ? '#fff' : 'black'} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, darkMode && styles.darkHeaderTitle]}>{t('languages.title')}</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={darkMode ? '#aaa' : '#999'} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, darkMode && styles.darkSearchInput]}
              placeholder={t('languages.searchPlaceholder')}
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Ionicons name="close-circle" size={20} color={darkMode ? '#aaa' : '#999'} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Language Selection */}
        <View style={styles.contentContainer}>
          <ScrollView>
            <View style={[styles.languageGrid, darkMode && styles.darkLanguageGrid]}>
              {filteredLanguages.map((language) => (
                <LanguageItem
                  key={language.id}
                  flag={<Image source={language.flag} style={styles.flagIcon} />}
                  name={language.name}
                  onSelect={() => handleLanguageSelect(language.id)}
                  selected={selectedLanguageId === language.id}
                  darkMode={darkMode}
                />
              ))}
            </View>

            {filteredLanguages.length === 0 && (
              <View style={styles.noResultsContainer}>
                <Ionicons name="search-outline" size={48} color={darkMode ? '#555' : '#ccc'} />
                <Text style={[styles.noResultsText, darkMode && styles.darkText]}>{t('languages.noResults')}</Text>
                <Text style={[styles.noResultsSubtext, darkMode && styles.darkSubtext]}>{t('languages.tryAgain')}</Text>
              </View>
            )}

            <Text style={[styles.comingSoon, darkMode && styles.darkComingSoon]}>{t('languages.comingSoon')}</Text>
          </ScrollView>
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>{t('languages.submit')}</Text>
        </TouchableOpacity>

        {/* Modal for no language selected */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, darkMode && styles.darkModalContent]}>
              <Ionicons name="alert-circle" size={48} color="red" style={{ marginBottom: 10 }} />
              <Text style={[styles.modalTitle, darkMode && styles.darkModalMessage]}>{t('languages.noLanguageSelected')}</Text>
              <Text style={[styles.modalMessage, darkMode && styles.darkModalMessage]}>{t('languages.pleaseSelectLanguage')}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  darkOverlay: {
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.89)',
    zIndex: 2,
  },
  darkContainer: {
    backgroundColor: 'rgba(25, 25, 25, 0.95)',
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
    color: '#000',
  },
  darkHeaderTitle: {
    color: '#fff',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  darkSearchBar: {
    backgroundColor: '#2d2d2d',
    borderColor: '#444',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontFamily: 'JetBrainsMono',
    fontSize: 15,
    color: '#000',
    paddingVertical: 0,
  },
  darkSearchInput: {
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 70,
  },
  languageGrid: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 15,
  },
  darkLanguageGrid: {
    backgroundColor: '#1e1e1e',
    shadowColor: '#000',
  },
  languageItem: {
    width: '30%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  darkLanguageItem: {
    backgroundColor: '#2d2d2d',
    borderColor: '#444',
  },
  flagIcon: {
    width: 24,
    height: 16,
    marginBottom: 5,
  },
  languageName: {
    fontFamily: 'JetBrainsMono',
    fontSize: 12,
    textAlign: 'center',
    color: '#000',
  },
  darkLanguageName: {
    color: '#fff',
  },
  comingSoon: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  darkText: {
    color: '#f0f0f0',
  },
  darkComingSoon: {
    color: '#aaa',
  },
  noResultsSubtext: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  darkSubtext: {
    color: '#aaa',
  },
  submitButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'red',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: 'white',
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
  },
  languageItemSelected: {
    borderWidth: 2,
    borderColor: '#e63946',
    backgroundColor: '#ffebee',
  },
  darkLanguageItemSelected: {
    borderWidth: 2,
    borderColor: '#ff6b6b',
    backgroundColor: '#3a0d0d',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  darkModalContent: {
    backgroundColor: '#2d2d2d',
  },
  modalTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 18,
    color: '#e63946',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  darkModalMessage: {
    color: '#e0e0e0',
  },
  modalButton: {
    backgroundColor: '#e63946',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
});