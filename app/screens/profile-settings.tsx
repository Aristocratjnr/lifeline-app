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
            icon={<Ionicons name="person" size={20} color="#333" />} 
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
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 70,
    flex: 1,
    position: 'relative',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  inputIconContainer: {
    width: 30,
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 10,
    fontFamily: 'JetBrainsMono',
    color: '#333',
  },
  saveButton: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 20,
    backgroundColor: 'red',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 15,
  },
});