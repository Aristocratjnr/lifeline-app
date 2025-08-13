import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
};

const FAQItem = ({ question, answer, isExpanded, onToggle }: FAQItemProps) => (
  <View style={styles.faqItem}>
    <TouchableOpacity style={styles.faqQuestion} onPress={onToggle}>
      <Text style={styles.faqQuestionText}>{question}</Text>
      <Ionicons 
        name={isExpanded ? "chevron-up" : "chevron-down"} 
        size={20} 
        color="#666" 
      />
    </TouchableOpacity>
    {isExpanded && (
      <View style={styles.faqAnswer}>
        <Text style={styles.faqAnswerText}>{answer}</Text>
      </View>
    )}
  </View>
);

export default function FAQs() {
  const navigation = useNavigation();
  const router = useRouter();
  const { t } = useTranslation();
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
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('faqs.headerTitle')}</Text>
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
          <View style={styles.faqsContainer}>
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isExpanded={expandedFAQs.includes(index)}
                onToggle={() => toggleFAQ(index)}
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
    paddingHorizontal: 20,
    marginTop: 20,
  },
  faqItem: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  faqQuestionText: {
    flex: 1,
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  faqAnswer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  faqAnswerText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginTop: 10,
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