import { 
  StyleSheet, 
  TextStyle, 
  ViewStyle, 
  ImageStyle, 
  Platform 
} from 'react-native';

export type CustomStyles = {
  backgroundImage: ViewStyle;
  overlay: ViewStyle;
  container: ViewStyle;
  header: ViewStyle;
  backButton: ViewStyle;
  headerTitle: TextStyle;
  emptySpace: ViewStyle;
  formContainer: ViewStyle;
  inputRow: ViewStyle;
  inputRowDark: ViewStyle;
  inputIconContainer: ViewStyle;
  inputTextInput: TextStyle & { cursor?: 'text' | 'pointer' };
  inputTextDark: TextStyle;
  inputText: TextStyle;
  editButton: ViewStyle;
  saveButtonContainer: ViewStyle;
  saveButton: ViewStyle;
  saveButtonText: TextStyle;
  modalOverlay: ViewStyle;
  modalContent: ViewStyle;
  modalHeader: ViewStyle;
  modalTitle: TextStyle;
  genderOption: ViewStyle;
  selectedGenderOption: ViewStyle;
  genderOptionContent: ViewStyle;
  genderOptionText: TextStyle;
  heroContainer: ViewStyle;
  heroImage: ImageStyle;
};

export const getStyles = (darkMode: boolean): CustomStyles => {
  // Web-specific styles with proper typing
  const webStyles = Platform.OS === 'web' ? {
    cursor: 'text' as const,
    userSelect: 'text' as const,
  } : {};

  const baseInputText: TextStyle = {
    flex: 1,
    fontSize: 16,
    color: darkMode ? '#E0E0E0' : '#333',
    padding: 12,
    ...(Platform.OS === 'web' ? webStyles : {}),
  };

  // Create styles object with explicit type
  const styles: CustomStyles = {
    // Base styles
    backgroundImage: {
      flex: 1,
      width: '100%',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
      flex: 1,
    },
    
    // Header styles
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: 'transparent',
    },
    backButton: {
      padding: 8,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: darkMode ? '#FFFFFF' : '#000000',
      marginLeft: 16,
    },
    emptySpace: {
      flex: 1,
    },
    
    // Form styles
    formContainer: {
      flex: 1,
      padding: 16,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: darkMode ? '#1E1E1E' : '#F5F5F5',
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
    },
    inputRowDark: {
      backgroundColor: '#333',
    },
    inputIconContainer: {
      marginRight: 12,
    },
    inputTextInput: {
      ...baseInputText,
      borderColor: darkMode ? '#444' : '#CCC',
      borderBottomWidth: 1,
      cursor: 'text' as const,
    },
    inputTextDark: {
      borderColor: '#444',
    },
    inputText: baseInputText,
    
    // Button styles
    editButton: {
      marginLeft: 12,
      padding: 8,
    },
    saveButtonContainer: {
      marginTop: 24,
      alignItems: 'center',
    },
    saveButton: {
      backgroundColor: '#4CAF50',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    saveButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    
    // Modal styles
    modalOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: darkMode ? '#1E1E1E' : '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      width: '80%',
      maxWidth: 400,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: darkMode ? '#FFFFFF' : '#000000',
    },
    genderOption: {
      padding: 12,
      borderRadius: 8,
      marginBottom: 8,
    },
    selectedGenderOption: {
      backgroundColor: darkMode ? '#333' : '#F0F0F0',
    },
    genderOptionContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    genderOptionText: {
      marginLeft: 12,
      fontSize: 16,
      color: darkMode ? '#E0E0E0' : '#333',
    },
    
    // Hero image styles
    heroContainer: {
      alignItems: 'center',
      padding: 24,
    },
    heroImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
    },
  };

  return styles;
};

export default getStyles;
