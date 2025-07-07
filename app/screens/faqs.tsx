import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
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
      question: "What is Lifeline?",
      answer: "Lifeline is a comprehensive first aid and emergency response mobile application designed to provide instant access to crucial medical information during emergencies. It offers step-by-step guidance for various medical situations, helping users act quickly and effectively when professional help may not be immediately available."
    },
    {
      question: "Is Lifeline a substitute for professional medical help?",
      answer: "No, Lifeline is not a substitute for professional medical care. It's designed to provide immediate guidance and support while waiting for professional help to arrive. Always call emergency services (like 911 or your local emergency number) for serious medical situations. Lifeline complements professional care by providing valuable first aid information."
    },
    {
      question: "How does the Symptom Checker work?",
      answer: "The Symptom Checker helps you identify potential medical conditions based on your symptoms. Simply select the symptoms you're experiencing, and the app will provide information about possible conditions and recommended actions. However, this is for informational purposes only and should not replace professional medical diagnosis."
    },
    {
      question: "Can the Symptom Checker diagnose my medical condition?",
      answer: "The Symptom Checker provides information and guidance but cannot provide a definitive medical diagnosis. It's designed to help you understand your symptoms and determine whether you should seek professional medical attention. Always consult with a healthcare provider for proper diagnosis and treatment."
    },
    {
      question: "Are the first-aid guides easy to follow?",
      answer: "Yes! All first-aid guides in Lifeline are designed to be clear, concise, and easy to follow, even in stressful situations. They include step-by-step instructions, visual aids where applicable, and are written in simple language. The guides are regularly updated to reflect current medical best practices."
    },
    {
      question: "How do I update Lifeline?",
      answer: "Lifeline updates are available through your device's app store (Google Play Store for Android or App Store for iOS). Enable automatic updates in your device settings to ensure you always have the latest version with the most current medical information and features."
    },
    {
      question: "Do I need to create an account to use Lifeline?",
      answer: "No, you can use Lifeline as a guest without creating an account. However, creating an account allows you to save your preferences, access personalized features, and sync your data across devices. Guest mode provides full access to all emergency features and first aid guides."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we take your privacy and data security very seriously. All personal information is encrypted and stored securely. We never share your personal data with third parties without your explicit consent. You can review our complete Privacy Policy for detailed information about data handling."
    },
    {
      question: "Can I use Lifeline offline?",
      answer: "Yes! Many of Lifeline's core features work offline, including first aid guides and emergency procedures. This ensures you have access to crucial information even when you don't have an internet connection. Some features like the AI assistant require an internet connection."
    },
    {
      question: "What should I do if I find incorrect information?",
      answer: "If you find any information that seems incorrect or outdated, please contact us immediately through the app's help section or email us at support@lifeline.com. We regularly review and update our content to ensure accuracy, and your feedback helps us maintain the highest standards."
    },
    {
      question: "How often is the medical information updated?",
      answer: "Our medical content is reviewed and updated regularly by healthcare professionals to ensure it reflects current best practices and guidelines. We follow standards from reputable medical organizations and update content as new information becomes available."
    },
    {
      question: "Can I share Lifeline with family and friends?",
      answer: "Absolutely! We encourage you to share Lifeline with your family and friends. The more people who have access to reliable first aid information, the safer our communities become. You can share the app through your device's app store or use the 'Share App' feature in the settings."
    }
  ];

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
        <Text style={styles.headerTitle}>FREQUENTLY ASKED{'\n'}QUESTIONS</Text>
      </View>

      <ScrollView 
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Introduction */}
        <View style={styles.introContainer}>
          <Text style={styles.introTitle}>Need Help?</Text>
          <Text style={styles.introText}>
            Find answers to the most commonly asked questions about Lifeline. If you can't find what you're looking for, feel free to contact our support team.
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
          <Text style={styles.contactTitle}>Still Have Questions?</Text>
          <Text style={styles.contactText}>
            If you couldn't find the answer you're looking for, our support team is here to help.
          </Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
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
}); 