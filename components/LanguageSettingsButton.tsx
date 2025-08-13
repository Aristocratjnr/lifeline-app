import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/i18n/LanguageContext';
import { useThemeColor } from '@/hooks/useThemeColor';

interface LanguageSettingsButtonProps {
  mode?: 'icon' | 'text' | 'full'; // Display mode
  size?: 'small' | 'medium' | 'large'; // Size of button
  style?: object; // Additional style
}

/**
 * A reusable button component to access language settings
 * Can be displayed in different modes: icon only, text only, or both
 */
export default function LanguageSettingsButton({
  mode = 'full',
  size = 'medium',
  style = {},
}: LanguageSettingsButtonProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { getCurrentLanguageOption } = useLanguage();

  const currentLang = getCurrentLanguageOption();
  const backgroundColor = useThemeColor({ light: '#F5F5F5', dark: '#333333' }, 'background');
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');

  // Size properties
  const sizeProps = {
    small: {
      height: 32,
      fontSize: 12,
      iconSize: 14,
      paddingHorizontal: 8,
    },
    medium: {
      height: 40,
      fontSize: 14,
      iconSize: 18,
      paddingHorizontal: 12,
    },
    large: {
      height: 48,
      fontSize: 16,
      iconSize: 24,
      paddingHorizontal: 16,
    }
  }[size];

  const handlePress = () => {
    router.push('/language-settings');
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { 
          backgroundColor,
          height: sizeProps.height,
          paddingHorizontal: sizeProps.paddingHorizontal
        },
        style
      ]}
      onPress={handlePress}
      accessibilityLabel={t('settings.language')}
      activeOpacity={0.7}
    >
      {(mode === 'icon' || mode === 'full') && (
        <Text style={[styles.flag, { fontSize: sizeProps.iconSize }]}>
          {currentLang.flag || '🌐'}
        </Text>
      )}

      {(mode === 'text' || mode === 'full') && (
        <Text 
          style={[
            styles.text, 
            { 
              color: textColor,
              fontSize: sizeProps.fontSize,
              marginLeft: mode === 'full' ? 8 : 0
            }
          ]}
          numberOfLines={1}
        >
          {currentLang.name}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  flag: {
    textAlign: 'center',
  },
  text: {
    fontWeight: '500',
  }
});
