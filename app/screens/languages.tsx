import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useEffect } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
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

type LanguageItemProps = {
  flag: React.ReactNode;
  name: string;
  onSelect?: () => void;
};

const LanguageItem = ({ flag, name, onSelect }: LanguageItemProps) => (
  <TouchableOpacity style={styles.languageItem} onPress={onSelect}>
    {flag}
    <Text style={styles.languageName}>{name}</Text>
  </TouchableOpacity>
);

export default function Languages() {
  const navigation = useNavigation();

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
        <Text style={styles.headerTitle}>LANGUAGE</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for language"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Language Selection */}
      <View style={styles.contentContainer}>
        <ScrollView>
          <View style={styles.languageGrid}>
            <LanguageItem
              flag={<Image source={require('../../assets/images/flags/us.png')} style={styles.flagIcon} />}
              name="ENG"
            />
            <LanguageItem
              flag={<Image source={require('../../assets/images/flags/ghana.png')} style={styles.flagIcon} />}
              name="FRAFRA"
            />
            <LanguageItem
              flag={<Image source={require('../../assets/images/flags/ghana.png')} style={styles.flagIcon} />}
              name="TWI"
            />
            <LanguageItem
              flag={<Image source={require('../../assets/images/flags/ghana.png')} style={styles.flagIcon} />}
              name="GA"
            />
            <LanguageItem
              flag={<Image source={require('../../assets/images/flags/ghana.png')} style={styles.flagIcon} />}
              name="EWE"
            />
            <LanguageItem
              flag={<Image source={require('../../assets/images/flags/ghana.png')} style={styles.flagIcon} />}
              name="HAUSA"
            />
            <LanguageItem
              flag={<Image source={require('../../assets/images/flags/ghana.png')} style={styles.flagIcon} />}
              name="DAGBANI"
            />
            <LanguageItem
              flag={<Image source={require('../../assets/images/flags/france.png')} style={styles.flagIcon} />}
              name="FRENCH"
            />
            <LanguageItem
              flag={<Image source={require('../../assets/images/flags/spain.png')} style={styles.flagIcon} />}
              name="SPANISH"
            />
            <LanguageItem
              flag={<Image source={require('../../assets/images/flags/egypt.png')} style={styles.flagIcon} />}
              name="ARABIC"
            />
            <LanguageItem
              flag={<Image source={require('../../assets/images/flags/india.png')} style={styles.flagIcon} />}
              name="HINDI"
            />
            <LanguageItem
              flag={<Image source={require('../../assets/images/flags/russia.png')} style={styles.flagIcon} />}
              name="RUSSIAN"
            />
          </View>

          <Text style={styles.comingSoon}>MORE LANGUAGES COMING SOON!!!</Text>
        </ScrollView>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>SUBMIT</Text>
      </TouchableOpacity>
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
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
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
  },
  languageItem: {
    width: '30%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
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
  },
  comingSoon: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
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
});