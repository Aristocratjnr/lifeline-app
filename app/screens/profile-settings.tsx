import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import {
    Image,
    Modal,
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

type InputRowProps = {
  icon: React.ReactNode;
  value: string;
  isPassword?: boolean;
  hasDropdown?: boolean;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  isEditing?: boolean;
  onEditPress?: () => void;
};

const InputRow = ({ 
  icon, 
  value, 
  isPassword = false, 
  hasDropdown = false, 
  onPress,
  onChangeText,
  isEditing = false,
  onEditPress
}: InputRowProps) => (
  <View style={styles.inputRow}>
    <View style={styles.inputIconContainer}>
      {icon}
    </View>
    {isEditing ? (
      <TextInput
        style={styles.inputTextInput}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword}
        placeholder={isPassword ? "Enter password" : "Enter value"}
        placeholderTextColor="#999"
      />
    ) : (
      <Text style={styles.inputText}>
        {isPassword ? '****************' : value}
      </Text>
    )}
    {hasDropdown && !isEditing && (
      <MaterialIcons name="keyboard-arrow-down" size={20} color="#333" />
    )}
    {isPassword && !isEditing && (
      <Ionicons name="eye-outline" size={20} color="#333" />
    )}
    {!hasDropdown && !isPassword && (
      <TouchableOpacity onPress={onEditPress} style={styles.editButton}>
        <Ionicons name={isEditing ? "checkmark" : "create-outline"} size={18} color="#666" />
      </TouchableOpacity>
    )}
  </View>
);

export default function ProfileSettings() {
  const navigation = useNavigation();
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    username: 'Agradaa',
    location: 'Bahamas, Nowhere',
    email: 'username@example.com',
    phone: '+233 59 874 1236',
    password: '',
    gender: 'Female',
    age: '18 yrs'
  });

  useEffect(() => {
    loadFonts();
  }, []);

  const handleEditField = (field: string) => {
    setIsEditing(field);
  };


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenderSelect = (gender: string) => {
    setFormData(prev => ({
      ...prev,
      gender
    }));
    setShowGenderModal(false);
  };

  const handleSaveChanges = () => {
    // Here you would typically save to backend/database
    console.log('Saving changes:', formData);
    // Show success message or navigate back
    navigation.goBack();
  };

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
            value={formData.username}
            isEditing={isEditing === 'username'}
            onEditPress={() => handleEditField('username')}
            onChangeText={(text) => handleInputChange('username', text)}
          />
          
          {/* Location */}
          <InputRow 
            icon={<MaterialIcons name="location-on" size={20} color="#333" />} 
            value={formData.location}
            hasDropdown
            isEditing={isEditing === 'location'}
            onEditPress={() => handleEditField('location')}
            onChangeText={(text) => handleInputChange('location', text)}
          />
          
          {/* Email */}
          <InputRow 
            icon={<MaterialCommunityIcons name="email-outline" size={20} color="#333" />} 
            value={formData.email}
            isEditing={isEditing === 'email'}
            onEditPress={() => handleEditField('email')}
            onChangeText={(text) => handleInputChange('email', text)}
          />
          
          {/* Phone */}
          <InputRow 
            icon={<Feather name="phone" size={20} color="#333" />} 
            value={formData.phone}
            isEditing={isEditing === 'phone'}
            onEditPress={() => handleEditField('phone')}
            onChangeText={(text) => handleInputChange('phone', text)}
          />
          
          {/* Password */}
          <InputRow 
            icon={<FontAwesome name="lock" size={20} color="#333" />} 
            value={formData.password}
            isPassword
            isEditing={isEditing === 'password'}
            onEditPress={() => handleEditField('password')}
            onChangeText={(text) => handleInputChange('password', text)}
          />
          
          {/* Gender */}
          <TouchableOpacity 
            style={styles.inputRow}
            onPress={() => setShowGenderModal(true)}
          >
            <View style={styles.inputIconContainer}>
              <Ionicons name="transgender" size={20} color="#333" />
            </View>
            <Text style={styles.inputText}>{formData.gender}</Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color="#333" />
          </TouchableOpacity>
          
          {/* Age */}
          <InputRow 
            icon={<MaterialIcons name="cake" size={20} color="#333" />} 
            value={formData.age}
            isEditing={isEditing === 'age'}
            onEditPress={() => handleEditField('age')}
            onChangeText={(text) => handleInputChange('age', text)}
          />
        </ScrollView>

        {/* Save Button */}
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Gender Selection Modal */}
      <Modal
        visible={showGenderModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowGenderModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowGenderModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Gender</Text>
              <TouchableOpacity onPress={() => setShowGenderModal(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={[styles.genderOption, formData.gender === 'Male' && styles.selectedGenderOption]}
              onPress={() => handleGenderSelect('Male')}
            >
              <View style={styles.genderOptionContent}>
                <Ionicons name="male" size={24} color="#007AFF" />
                <Text style={styles.genderOptionText}>Male</Text>
              </View>
              {formData.gender === 'Male' && <Ionicons name="checkmark" size={20} color="black" />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.genderOption, formData.gender === 'Female' && styles.selectedGenderOption]}
              onPress={() => handleGenderSelect('Female')}
            >
              <View style={styles.genderOptionContent}>
                <Ionicons name="female" size={24} color="#FF2D92" />
                <Text style={styles.genderOptionText}>Female</Text>
              </View>
              {formData.gender === 'Female' && <Ionicons name="checkmark" size={20} color="black" />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.genderOption, formData.gender === 'Other' && styles.selectedGenderOption]}
              onPress={() => handleGenderSelect('Other')}
            >
              <View style={styles.genderOptionContent}>
                <Ionicons name="transgender" size={24} color="#666" />
                <Text style={styles.genderOptionText}>Other</Text>
              </View>
              {formData.gender === 'Other' && <Ionicons name="checkmark" size={20} color="black" />}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
  inputTextInput: {
    flex: 1,
    fontSize: 14,
    marginLeft: 5,
    fontFamily: 'JetBrainsMono',
    color: '#333',
    paddingVertical: 0,
  },
  editButton: {
    padding: 5,
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
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedGenderOption: {
    backgroundColor: '#f0f0f0',
  },
  genderOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  genderOptionText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 16,
    color: '#333',
  },
});