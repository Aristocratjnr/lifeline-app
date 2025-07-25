import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AVAILABLE_LANGUAGES, LanguageOption, useLanguage } from '../i18n/LanguageContext';

interface LanguageSelectorProps {
  onLanguageSelected?: (languageCode: string) => void;
  showSearch?: boolean;
  closeAfterSelection?: boolean;
  showFlags?: boolean;
  headerTitle?: string;
  containerStyle?: object;
  listStyle?: object;
  onClose?: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onLanguageSelected,
  showSearch = true,
  closeAfterSelection = true,
  showFlags = true,
  headerTitle,
  containerStyle,
  listStyle,
  onClose,
}) => {
  const { t } = useTranslation();
  const { currentLanguage, setLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  // Filter languages based on search query
  const filteredLanguages = searchQuery
    ? AVAILABLE_LANGUAGES.filter(
        lang =>
          lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : AVAILABLE_LANGUAGES;

  const handleLanguageSelect = async (languageCode: string) => {
    if (isChangingLanguage) return;

    try {
      setIsChangingLanguage(true);

      // Call custom handler if provided
      if (onLanguageSelected) {
        onLanguageSelected(languageCode);
      } 
      // Otherwise use the default language context method
      else {
        await setLanguage(languageCode);
      }

      // Close the selector if specified
      if (closeAfterSelection && onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error changing language:', error);
    } finally {
      setIsChangingLanguage(false);
    }
  };

  const renderLanguageItem = ({ item }: { item: LanguageOption }) => {
    const isSelected = item.code === currentLanguage;

    return (
      <TouchableOpacity
        style={[
          styles.languageItem,
          isSelected && styles.selectedLanguageItem
        ]}
        onPress={() => handleLanguageSelect(item.code)}
        disabled={isChangingLanguage}
      >
        <View style={styles.languageContent}>
          {showFlags && item.flag && (
            <Text style={styles.flag}>{item.flag}</Text>
          )}
          <View style={styles.languageTextContainer}>
            <Text style={[styles.languageName, isSelected && styles.selectedText]}>
              {item.name}
            </Text>
            <Text style={[styles.nativeName, isSelected && styles.selectedText]}>
              {item.nativeName}
            </Text>
          </View>
        </View>

        {isSelected && (
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {headerTitle && (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
        </View>
      )}

      {showSearch && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={t('languages.searchPlaceholder')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      )}

      {filteredLanguages.length > 0 ? (
        <FlatList
          data={filteredLanguages}
          renderItem={renderLanguageItem}
          keyExtractor={(item) => item.code}
          style={[styles.list, listStyle]}
          initialNumToRender={15}
          maxToRenderPerBatch={10}
        />
      ) : (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>{t('languages.noResults')}</Text>
          <Text style={styles.tryAgainText}>{t('languages.tryAgain')}</Text>
        </View>
      )}

      {isChangingLanguage && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>{t('common.loading')}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedLanguageItem: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageTextContainer: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
  },
  nativeName: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  selectedText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontSize: 16,
  },
  noResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  tryAgainText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
  },
});

export default LanguageSelector;
