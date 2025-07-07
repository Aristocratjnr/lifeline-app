import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useEffect } from 'react';
import {
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

type LinkItemProps = {
  title: string;
  hasArrow?: boolean;
  onPress?: () => void;
};

const LinkItem = ({ title, hasArrow = true, onPress }: LinkItemProps) => (
  <TouchableOpacity style={styles.linkItem} onPress={onPress}>
    <Text style={styles.linkText}>{title}</Text>
    {hasArrow && <Ionicons name="chevron-forward" size={20} color="black" />}
  </TouchableOpacity>
);

export default function TermsUse() {
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
        <Text style={styles.headerTitle}>TERMS & USE</Text>
      </View>

      <ScrollView style={styles.scrollContent}>
        {/* Terms Content */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By using Lifeline, you agree to our terms and conditions.
          </Text>
          
          <Text style={[styles.termsText, styles.spacingTop]}>
            Understand your rights and responsibilities when using Lifeline
          </Text>
          
          <Text style={[styles.termsText, styles.spacingTop]}>
            Please review our terms and conditions. Your use of Lifeline indicates your agreement to these guidelines.
          </Text>
          
          {/* See More Button */}
          <TouchableOpacity style={styles.seeMoreButton}>
            <Text style={styles.seeMoreText}>SEE MORE</Text>
            <Ionicons name="chevron-forward" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Links */}
        <View style={styles.linksContainer}>
          <LinkItem title="FAQs" />
          <LinkItem title="Share App" />
          <LinkItem title="Visit Our Website" />
        </View>
      </ScrollView>
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
  scrollContent: {
    flex: 1,
  },
  termsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  termsText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  spacingTop: {
    marginTop: 20,
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 25,
    alignSelf: 'flex-start',
  },
  seeMoreText: {
    color: 'white',
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
    marginRight: 5,
  },
  linksContainer: {
    marginTop: 20,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  linkText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 16,
    color: '#333',
  },
});