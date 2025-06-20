import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const LifelineFAQ: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "Is Lifeline a substitute for professional medical help?",
      answer: "No, Lifeline is not a substitute for professional medical help. It provides basic guidance for common health concerns, but you should always consult healthcare professionals for medical emergencies or serious conditions."
    },
    {
      id: 2,
      question: "How does the Symptom Checker work?",
      answer: "The Symptom Checker uses an algorithm to assess your symptoms based on your inputs. It asks a series of questions about your symptoms and provides general guidance based on your responses."
    },
    {
      id: 3,
      question: "Can the Symptom Checker diagnose my medical condition?",
      answer: "No, the Symptom Checker cannot diagnose medical conditions. It can only provide general guidance based on the symptoms you report. For accurate diagnosis, please consult a healthcare professional."
    },
    {
      id: 4,
      question: "Are the first-aid guides easy to follow?",
      answer: "Yes, our first-aid guides are designed to be clear and easy to follow, with step-by-step instructions and illustrations to help you during emergency situations."
    },
    {
      id: 5,
      question: "How do I update Lifeline?",
      answer: "Lifeline updates automatically when connected to the internet with our offline mode on the webApp which allows you to access the app without an internet connection."
    },
    {
      id: 6,
      question: "Do I need to create an account to use Lifeline?",
      answer: "No, you don't need to create an account to use the basic features of Lifeline. However, creating an account allows you to save your medical information, preferences, and access additional features."
    },
  ];

  const toggleFaq = (id: number): void => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const renderFAQItem = (faq: FAQ) => (
    <View key={faq.id} style={styles.faqItem}>
      <TouchableOpacity
        style={styles.faqButton}
        onPress={() => toggleFaq(faq.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.faqQuestion}>{faq.question}</Text>
        <FontAwesome
          name="chevron-down"
          size={18}
          color="#374151"
          style={[
            styles.chevron,
            expandedFaq === faq.id && styles.chevronRotated
          ]}
        />
      </TouchableOpacity>
      
      {expandedFaq === faq.id && (
        <View style={styles.faqAnswer}>
          <Text style={styles.faqAnswerText}>{faq.answer}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      
      <View style={styles.contentContainer}>
        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <ScrollView 
            style={styles.faqScrollView}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {faqs.map(renderFAQItem)}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#111827',
    paddingVertical: width < 768 ? 20 : 24,
  },
  title: {
    fontSize: width < 400 ? 24 : width < 640 ? 28 : 32,
    fontWeight: '800',
    textAlign: 'center',
    color: '#111827',
    marginBottom: width < 768 ? 24 : 36,
    paddingHorizontal: 16,
    lineHeight: width < 400 ? 28 : width < 640 ? 32 : 36,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  contentContainer: {
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  faqSection: {
    flex: 1,
  },
  faqScrollView: {
    flex: 1,
    maxHeight: width < 768 ? 300 : 370,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderStyle: 'solid',
    backgroundColor: 'rgba(249, 250, 251, 0.5)',
    marginVertical: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  faqButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  faqQuestion: {
    flex: 1,
    fontSize: width < 400 ? 15 : 16,
    fontWeight: '600',
    color: '#111827',
    lineHeight: width < 400 ? 20 : 22,
    marginRight: 12,
  },
  chevron: {
    transform: [{ rotate: '0deg' }],
  },
  chevronRotated: {
    transform: [{ rotate: '180deg' }],
  },
  faqAnswer: {
    paddingBottom: 16,
    paddingHorizontal: 4,
    paddingTop: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 6,
    marginBottom: 8,
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#1f2937',
    lineHeight: 20,
    fontWeight: '400',
  },
});

export default LifelineFAQ;