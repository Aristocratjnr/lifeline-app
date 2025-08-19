import { useDisplayPreferences } from '@/context/DisplayPreferencesContext';
import { useProfile } from '@/context/ProfileContext';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageStyle,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';

// Load JetBrains Mono font
const loadFonts = async () => {
  await Font.loadAsync({
    'JetBrainsMono': require('../../assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('../../assets/fonts/JetBrainsMono-Bold.ttf'),
  });
};

type InputRowProps = {
  icon: React.ReactElement<{ name: string; size: number; color?: string }>;
  value: string;
  isPassword?: boolean;
  hasDropdown?: boolean;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  isEditing?: boolean;
  onEditPress?: () => void;
  t: (key: string) => string;
};

const InputRow = ({ 
  icon, 
  value, 
  isPassword = false, 
  hasDropdown = false, 
  onPress,
  onChangeText,
  isEditing = false,
  onEditPress,
  t 
}: InputRowProps) => {
  const { darkMode } = useDisplayPreferences();
  const styles = getStyles(darkMode);
  
  // Clone the icon to apply dark mode styles
  const themedIcon = React.cloneElement(icon, {
    color: darkMode ? '#E0E0E0' : '#333',
    size: 20
  });

  const [textSize] = useState(0.5);
  const [fontBold] = useState(false);

  const getTextStyle = (baseStyle: TextStyle = {}): TextStyle => ({
    fontSize: 14 + textSize * 8, // 14-22px
    fontFamily: fontBold ? 'JetBrainsMono-Bold' : 'JetBrainsMono',
    ...baseStyle,
  } as TextStyle);

  // Create style objects with proper typing
  const rowStyle = {
    ...styles.inputRow,
    ...(darkMode ? styles.inputRowDark : {})
  } as ViewStyle;

  const textInputStyle = {
    ...styles.inputTextInput,
    ...(darkMode ? {
      ...styles.inputTextDark,
      // Ensure userSelect is properly typed for web
      ...(Platform.OS === 'web' ? { userSelect: 'text' as const } : {})
    } : {}),
    ...getTextStyle({ color: darkMode ? '#E0E0E0' : '#333' })
  } as TextStyle;

  const textStyle = {
    ...styles.inputText,
    ...(darkMode ? {
      ...styles.inputTextDark,
      // Ensure userSelect is properly typed for web
      ...(Platform.OS === 'web' ? { userSelect: 'text' as const } : {})
    } : {}),
    ...getTextStyle({ color: darkMode ? '#E0E0E0' : '#333' })
  } as TextStyle;

  return (
    <TouchableOpacity 
      style={rowStyle}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.inputIconContainer}>
        {themedIcon}
      </View>
      
      {isEditing ? (
        <TextInput
          style={textInputStyle}
          value={value}
          onChangeText={onChangeText}
          autoFocus
          secureTextEntry={isPassword}
          placeholderTextColor={darkMode ? '#888' : '#999'}
          placeholder={t('profile.notSpecified')}
        />
      ) : (
        <Text style={textStyle}>
          {value || t('profile.notSpecified')}
        </Text>
      )}
      
      {hasDropdown && !isEditing && (
        <Ionicons 
          name="chevron-down" 
          size={20} 
          color={darkMode ? '#888' : '#666'} 
        />
      )}
      
      {!isEditing && onEditPress && (
        <TouchableOpacity onPress={onEditPress} style={styles.editButton}>
          <Feather 
            name="edit-2" 
            size={16} 
            color={darkMode ? '#888' : '#666'} 
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const ProfileSettings = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const { darkMode, textSize, fontBold } = useDisplayPreferences();
  const { profile, updateProfile, loading } = useProfile();
  
  // Get styles based on theme
  const styles = React.useMemo(() => getStyles(darkMode), [darkMode]);
  
  // Form state
  const [formData, setFormData] = useState({
    username: profile.username || '',
    location: profile.location || '',
    email: profile.email || '',
    phone: profile.phone || '',
    password: profile.password || '',
    gender: profile.gender || t('settings.profile.selectGender'),
    age: profile.age || ''
  });

  const getTextStyle = (baseStyle: TextStyle = {}): TextStyle => ({
    fontSize: 14 + textSize * 8, // 14-22px
    fontFamily: fontBold ? 'JetBrainsMono-Bold' : 'JetBrainsMono',
    ...baseStyle,
  } as TextStyle);

  useEffect(() => {
    loadFonts();
  }, []);
  
  // Update form data when profile changes
  useEffect(() => {
    setFormData({
      username: profile.username || '',
      location: profile.location || '',
      email: profile.email || '',
      phone: profile.phone || '',
      password: profile.password || '',
      gender: profile.gender || t('settings.profile.selectGender'),
      age: profile.age || ''
    });
  }, [profile, t]);

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

  const handleSaveChanges = async () => {
    try {
      await updateProfile(formData);
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save profile data:', error);
    }
  };

  return (
    <View style={[styles.background, darkMode ? styles.backgroundDark : styles.backgroundLight]}>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={darkMode ? '#FFFFFF' : '#000000'} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, getTextStyle()]}>{t('settings.profile.title')}</Text>
            <View style={styles.emptySpace} />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.formHeader}>
              <Text style={[styles.formTitle, getTextStyle()]}>{t('settings.profile.personalInfo')}</Text>
            </View>
            
            <View style={styles.formContent}>
              {/* Username */}
              <InputRow 
                icon={<Ionicons name="person-outline" size={20} color={darkMode ? '#9CA3AF' : '#6B7280'} />} 
                value={formData.username}
                isEditing={isEditing === 'username'}
                onEditPress={() => handleEditField('username')}
                onChangeText={(text) => handleInputChange('username', text)}
                t={t}
              />
              
              {/* Email */}
              <InputRow 
                icon={<Ionicons name="mail-outline" size={20} color={darkMode ? '#9CA3AF' : '#6B7280'} />} 
                value={formData.email}
                isEditing={isEditing === 'email'}
                onEditPress={() => handleEditField('email')}
                onChangeText={(text) => handleInputChange('email', text)}
                t={t}
              />
              
              {/* Phone */}
              <InputRow 
                icon={<Ionicons name="call-outline" size={20} color={darkMode ? '#9CA3AF' : '#6B7280'} />} 
                value={formData.phone}
                isEditing={isEditing === 'phone'}
                onEditPress={() => handleEditField('phone')}
                onChangeText={(text) => handleInputChange('phone', text)}
                t={t}
              />
              
              {/* Location */}
              <InputRow 
                icon={<Ionicons name="location-outline" size={20} color={darkMode ? '#9CA3AF' : '#6B7280'} />} 
                value={formData.location}
                isEditing={isEditing === 'location'}
                onEditPress={() => handleEditField('location')}
                onChangeText={(text) => handleInputChange('location', text)}
                t={t}
              />
              
              {/* Gender */}
              <InputRow 
                icon={<Ionicons name="transgender" size={20} color={darkMode ? '#9CA3AF' : '#6B7280'} />} 
                value={formData.gender}
                hasDropdown
                onPress={() => setShowGenderModal(true)}
                t={t}
              />
              
              {/* Age */}
              <InputRow 
                icon={<MaterialIcons name="cake" size={20} color={darkMode ? '#9CA3AF' : '#6B7280'} />} 
                value={formData.age}
                isEditing={isEditing === 'age'}
                onEditPress={() => handleEditField('age')}
                onChangeText={(text) => handleInputChange('age', text)}
                t={t}
              />
              
              {/* Password */}
              <InputRow 
                icon={<Ionicons name="lock-closed-outline" size={20} color={darkMode ? '#9CA3AF' : '#6B7280'} />} 
                value={formData.password}
                isPassword
                isEditing={isEditing === 'password'}
                onEditPress={() => handleEditField('password')}
                onChangeText={(text) => handleInputChange('password', text)}
                t={t}
              />
            </View>
          </View>

          {/* Save Button */}
          <View style={styles.saveButtonContainer}>
            <TouchableOpacity 
              style={[styles.saveButton, loading && { opacity: 0.7 }]}
              onPress={handleSaveChanges}
              disabled={loading}
            >
              <Text style={styles.saveButtonText}>
                {loading ? t('common.loading') : t('profile.saveChanges')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

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
              <Text style={getTextStyle(styles.modalTitle)}>{t('settings.profile.selectGender')}</Text>
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
                <Text style={getTextStyle(styles.genderOptionText)}>{t('settings.profileSettings.male')}</Text>
              </View>
              {formData.gender === 'Male' && <Ionicons name="checkmark" size={20} color="black" />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.genderOption, formData.gender === 'Female' && styles.selectedGenderOption]}
              onPress={() => handleGenderSelect('Female')}
            >
              <View style={styles.genderOptionContent}>
                <Ionicons name="female" size={24} color="#FF2D92" />
                <Text style={getTextStyle(styles.genderOptionText)}>{t('settings.profileSettings.female')}</Text>
              </View>
              {formData.gender === 'Female' && <Ionicons name="checkmark" size={20} color="black" />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.genderOption, formData.gender === 'Other' && styles.selectedGenderOption]}
              onPress={() => handleGenderSelect('Other')}
            >
              <View style={styles.genderOptionContent}>
                <Ionicons name="transgender" size={24} color="#666" />
                <Text style={getTextStyle(styles.genderOptionText)}>{t('settings.profileSettings.other')}</Text>
              </View>
              {formData.gender === 'Other' && <Ionicons name="checkmark" size={20} color="black" />}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

// Define style types for better type safety
type CustomStyles = {
  // Base styles
  background: ViewStyle;
  backgroundLight: ViewStyle;
  backgroundDark: ViewStyle;
  overlay: ViewStyle;
  container: ViewStyle;
  
  // Header styles
  header: ViewStyle;
  backButton: ViewStyle;
  headerTitle: TextStyle;
  emptySpace: ViewStyle;
  
  // Form styles
  formContainer: ViewStyle;
  formHeader: ViewStyle;
  formTitle: TextStyle;
  formContent: ViewStyle;
  inputRow: ViewStyle;
  inputRowDark: ViewStyle;
  inputIconContainer: ViewStyle;
  inputTextInput: TextStyle & { cursor?: 'text' | 'pointer', userSelect?: 'text' | 'auto' | 'none' | undefined };
  inputTextDark: ViewStyle;
  inputText: TextStyle;
  editButton: ViewStyle;
  
  // Save button
  saveButtonContainer: ViewStyle;
  saveButton: ViewStyle;
  saveButtonText: TextStyle;
  
  // Modal styles
  modalOverlay: ViewStyle;
  modalContent: ViewStyle;
  modalHeader: ViewStyle;
  modalTitle: TextStyle;
  genderOption: ViewStyle;
  selectedGenderOption: ViewStyle;
  genderOptionContent: ViewStyle;
  genderOptionText: TextStyle;
  
  // Hero image
  heroContainer: ViewStyle;
  heroImage: ImageStyle;
};

const getStyles = (darkMode: boolean): CustomStyles => {
  const text = darkMode ? '#E0E0E0' : '#333333';
  const secondaryText = darkMode ? '#B0B0B0' : '#666666';
  const backgroundColor = darkMode ? '#121212' : '#FFFFFF';
  const cardBackground = darkMode ? '#1E1E1E' : '#FFFFFF';
  const borderColor = darkMode ? '#333333' : '#E0E0E0';
  const primary = darkMode ? '#BB86FC' : '#6200EE';
  
  const styles: CustomStyles = {
    background: {
      flex: 1,
      width: '100%',
    },
    backgroundLight: {
      backgroundColor: '#FFFFFF',
    },
    backgroundDark: {
      backgroundColor: '#121212',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.6)',
      zIndex: 1,
    } as ViewStyle,
    container: {
      flex: 1,
      backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.89)',
      zIndex: 2,
    } as ViewStyle,
    
    // Header styles
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: 'transparent',
    } as ViewStyle,
    backButton: {
      padding: 8,
    } as ViewStyle,
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: darkMode ? '#FFFFFF' : '#000000',
      marginLeft: 16,
    } as TextStyle,
    emptySpace: {
      flex: 1,
    } as ViewStyle,
    
    // Form styles
    formContainer: {
      flex: 1,
      backgroundColor: darkMode ? '#1E1E1E' : '#FFFFFF',
      borderRadius: 16,
      margin: 16,
      marginTop: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
      overflow: 'hidden',
    } as ViewStyle,
    formHeader: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: darkMode ? '#2D2D2D' : '#F0F0F0',
    } as ViewStyle,
    formTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: darkMode ? '#FFFFFF' : '#1A1A1A',
    } as TextStyle,
    formContent: {
      padding: 16,
    } as ViewStyle,
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: darkMode ? '#252525' : '#F8F9FA',
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: darkMode ? '#333333' : '#E8E8E8',
      overflow: 'hidden',
    } as ViewStyle,
    inputRowDark: {
      backgroundColor: '#333',
    } as ViewStyle,
    inputIconContainer: {
      marginLeft: 16,
      width: 24,
      alignItems: 'center',
    } as ViewStyle,
    inputTextInput: {
      flex: 1,
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 16,
      color: text,
      ...(Platform.OS === 'web' ? {
        cursor: 'text' as const,
        userSelect: 'text' as const,
        outlineStyle: 'none',
      } : {}),
    } as TextStyle & { cursor?: 'text' | 'pointer', userSelect?: 'text' | 'auto' | 'none' | undefined },
    inputTextDark: {
      borderColor: '#444',
      borderWidth: 1,
    } as ViewStyle,
    inputText: {
      flex: 1,
      fontSize: 16,
      color: darkMode ? '#E0E0E0' : '#333',
      padding: 12,
    } as TextStyle,
    
    // Button styles
    editButton: {
      marginLeft: 12,
      padding: 8,
    } as ViewStyle,
    saveButtonContainer: {
      marginTop: 24,
      alignItems: 'center',
    } as ViewStyle,
    saveButton: {
      backgroundColor: '#d32f2f',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      minWidth: 200,
      alignSelf: 'center',
    } as ViewStyle,
    saveButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    } as TextStyle,
    
    // Modal styles
    modalOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    modalContent: {
      backgroundColor: darkMode ? '#1E1E1E' : '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      width: '80%',
      maxWidth: 400,
    } as ViewStyle,
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    } as ViewStyle,
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: darkMode ? '#FFFFFF' : '#000000',
    } as TextStyle,
    genderOption: {
      padding: 12,
      borderRadius: 8,
      marginBottom: 8,
    } as ViewStyle,
    selectedGenderOption: {
      backgroundColor: darkMode ? '#333' : '#F0F0F0',
    } as ViewStyle,
    genderOptionContent: {
      flexDirection: 'row',
      alignItems: 'center',
    } as ViewStyle,
    genderOptionText: {
      fontFamily: 'JetBrainsMono',
      fontSize: 16,
      color: text,
    } as TextStyle,
    
    // Hero image
    heroContainer: {
      alignItems: 'center',
      padding: 24,
    } as ViewStyle,
    heroImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
    } as ImageStyle,
  };
  
  return styles;
};

export default ProfileSettings;