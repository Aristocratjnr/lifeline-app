import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDisplayPreferences } from '../../context/DisplayPreferencesContext';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Load JetBrains Mono font
const loadFonts = async () => {
  await Font.loadAsync({
    'JetBrainsMono': require('../../assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('../../assets/fonts/JetBrainsMono-Bold.ttf'),
  });
};

type FAQItemProps = {
  question: string;
  answer: string;
  isExpanded: boolean;
  onToggle: () => void;
  darkMode?: boolean;
};

const FAQItem = ({ question, answer, isExpanded, onToggle, darkMode = false }: FAQItemProps) => (
  <View style={[styles.faqItem, darkMode && styles.darkFaqItem]}>
    <TouchableOpacity style={styles.faqQuestion} onPress={onToggle}>
      <Text style={[styles.faqQuestion, darkMode && styles.darkText]}>{question}</Text>
      <Ionicons 
        name={isExpanded ? "chevron-up" : "chevron-down"} 
        size={20} 
        color={darkMode ? 'white' : '#666'} 
      />
    </TouchableOpacity>
    {isExpanded && (
      <View style={[styles.faqAnswerContainer, darkMode && styles.darkFaqAnswerContainer]}>
        <Text style={[styles.faqAnswer, darkMode && styles.darkFaqAnswer]}>{answer}</Text>
      </View>
    )}
  </View>
);

export default function FAQs() {
  const navigation = useNavigation();
  const router = useRouter();
  const { t } = useTranslation();
  const { darkMode } = useDisplayPreferences();
  const [expandedFAQs, setExpandedFAQs] = useState<number[]>([]);

  useEffect(() => {
    loadFonts();
  }, []);

  const toggleFAQ = (index: number) => {
    setExpandedFAQs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: t('faqs.questions.whatIsLifeline'),
      answer: t('faqs.questions.whatIsLifelineAnswer')
    },
    {
      question: t('faqs.questions.substituteForProfessionalHelp'),
      answer: t('faqs.questions.substituteForProfessionalHelpAnswer')
    },
    {
      question: t('faqs.questions.symptomCheckerWork'),
      answer: t('faqs.questions.symptomCheckerWorkAnswer')
    },
    {
      question: t('faqs.questions.symptomCheckerDiagnose'),
      answer: t('faqs.questions.symptomCheckerDiagnoseAnswer')
    },
    {
      question: t('faqs.questions.firstAidGuides'),
      answer: t('faqs.questions.firstAidGuidesAnswer')
    },
    {
      question: t('faqs.questions.updateLifeline'),
      answer: t('faqs.questions.updateLifelineAnswer')
    },
    {
      question: t('faqs.questions.offlineUse'),
      answer: t('faqs.questions.offlineUseAnswer')
    },
    {
      question: t('faqs.questions.dataSecurity'),
      answer: t('faqs.questions.dataSecurityAnswer')
    },
    {
      question: t('faqs.questions.contactSupport'),
      answer: t('faqs.questions.contactSupportAnswer')
    }
  ];

  const handleContactSupport = () => {
    router.push('/screens/help');
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/blur.png')} 
      style={[styles.backgroundImage, darkMode && { opacity: 0.9 }]}
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
            <Ionicons name="arrow-back" size={24} color={darkMode ? 'white' : 'black'} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, darkMode && styles.darkText]}>{t('faqs.headerTitle')}</Text>
        </View>
        
        <ScrollView style={styles.scrollContent}>
          {/* Intro Section */}
          <View style={styles.introContainer}>
            <Text style={styles.introTitle}>{t('faqs.introTitle')}</Text>
            <Text style={styles.introText}>
              {t('faqs.introText')}
            </Text>
          </View>

          {/* FAQ Items */}
          <View style={[styles.faqsContainer, darkMode && styles.darkFaqsContainer]}>
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isExpanded={expandedFAQs.includes(index)}
                onToggle={() => toggleFAQ(index)}
                darkMode={darkMode}
              />
            ))}
          </View>

          {/* Contact Section */}
          <View style={styles.contactContainer}>
            <Text style={styles.contactTitle}>{t('faqs.contactTitle')}</Text>
            <Text style={styles.contactText}>
              {t('faqs.contactText')}
            </Text>
            <TouchableOpacity style={styles.contactButton} onPress={handleContactSupport}>
              <Text style={styles.contactButtonText}>{t('faqs.contactButton')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
    zIndex: 1,
  },
  darkOverlay: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.89)',
    zIndex: 2,
  },
  darkContainer: {
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
  },
  darkText: {
    color: '#f0f0f0',
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
    lineHeight: 24,
  },
  scrollContent: {
    flex: 1,
  },
  introContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  introTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  introText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  faqsContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  darkFaqsContainer: {
    backgroundColor: 'transparent',
  },
  faqItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  darkFaqItem: {
    backgroundColor: '#2d2d2d',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  faqQuestion: {
    flex: 1,
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 15,
    color: '#333',
    marginRight: 10,
  },
  faqAnswerContainer: {
    padding: 15,
    paddingTop: 0,
    backgroundColor: '#f9f9f9',
  },
  darkFaqAnswerContainer: {
    backgroundColor: '#3d3d3d',
  },
  faqAnswer: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  darkFaqAnswer: {
    color: '#d0d0d0',
  },
  contactContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  contactTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  contactText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  contactButton: {
    backgroundColor: 'red',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  contactButtonText: {
    color: 'white',
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
}); 