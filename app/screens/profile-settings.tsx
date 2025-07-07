import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useEffect } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
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

type InputRowProps = {
  icon: React.ReactNode;
  value: string;
  isPassword?: boolean;
  hasDropdown?: boolean;
};

const InputRow = ({ icon, value, isPassword = false, hasDropdown = false }: InputRowProps) => (
  <View style={styles.inputRow}>
    <View style={styles.inputIconContainer}>
      {icon}
    </View>
    <Text style={styles.inputText}>
      {isPassword ? '****************' : value}
    </Text>
    {hasDropdown && (
      <MaterialIcons name="keyboard-arrow-down" size={20} color="#333" />
    )}
    {isPassword && (
      <Ionicons name="eye-outline" size={20} color="#333" />
    )}
  </View>
);

export default function ProfileSettings() {
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
        <Text style={styles.headerTitle}>PROFILE</Text>
        <View style={styles.emptySpace} />
      </View>

      {/* Hero Image */}
      <View style={styles.heroContainer}>
        <Image 
          source={require('../../assets/images/medical-team.png')} 
          style={styles.heroImage} 
          resizeMode="contain"
        />
      </View>

      {/* Profile Form */}
      <View style={styles.formContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Username */}
          <InputRow 
            icon={<Ionicons name="person-outline" size={20} color="#333" />} 
            value="Agradaa"
          />
          
          {/* Location */}
          <InputRow 
            icon={<MaterialIcons name="location-on" size={20} color="#333" />} 
            value="Bahamas, Nowhere"
            hasDropdown
          />
          
          {/* Email */}
          <InputRow 
            icon={<MaterialCommunityIcons name="email-outline" size={20} color="#333" />} 
            value="username@example.com"
          />
          
          {/* Phone */}
          <InputRow 
            icon={<Feather name="phone" size={20} color="#333" />} 
            value="+233 59 874 1236"
          />
          
          {/* Password */}
          <InputRow 
            icon={<FontAwesome name="lock" size={20} color="#333" />} 
            value=""
            isPassword
          />
          
          {/* Gender */}
          <InputRow 
            icon={<Ionicons name="transgender" size={20} color="#333" />} 
            value="Female"
            hasDropdown
          />
          
          {/* Age */}
          <InputRow 
            icon={<MaterialIcons name="cake" size={20} color="#333" />} 
            value="18 yrs"
          />
        </ScrollView>

        {/* Save Button */}
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
          </TouchableOpacity>
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
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    position: 'relative',
  },
  backButton: {
    padding: 5,
    width: 30,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Bold',
    position: 'absolute',
    left: 0,
    right: 0,
    alignSelf: 'center',
  },
  emptySpace: {
    width: 30,
  },
  heroContainer: {
    height: 120,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 80,
    flex: 1,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  inputIconContainer: {
    width: 25,
    alignItems: 'center',
    marginRight: 5,
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 5,
    fontFamily: 'JetBrainsMono',
    color: '#333',
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
  },
  saveButton: {
    backgroundColor: '#ff0000',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  saveButtonText: {
    color: 'white',
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
});