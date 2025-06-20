import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
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
  const [question, setQuestion] = useState<string>('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [fadeAnim] = useState(new Animated.Value(0));

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

  const handleQuestionChange = (text: string): void => {
    setQuestion(text);
  };

  const handleSubmit = (): void => {
    if (!question.trim()) {
      Alert.alert('Error', 'Please enter a question before submitting.');
      return;
    }

    console.log('Question submitted:', question);
    setIsModalVisible(true);
    setQuestion('');
    
    // Animate modal in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Auto close after 3 seconds
    setTimeout(() => {
      handleCloseModal();
    }, 3000);
  };

  const handleCloseModal = (): void => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false);
      fadeAnim.setValue(0);
    });
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
          size={16}
          color="#6b7280"
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

        {/* Question Section */}
        <View style={styles.questionSection}>
          <View style={styles.questionCard}>
            <View style={styles.iconContainer}>
              <Image
                source={require('@/assets/images/question.png')}
                style={styles.questionIcon}
                contentFit="contain"
                onError={() => {
                  console.error("Question icon failed to load");
                }}
              />
            </View>
            
            <Text style={styles.questionTitle}>
              Do you have more questions?
            </Text>
            
            <Text style={styles.questionSubtitle}>
              You can ask me anything you want{'\n'}
              to know about Lifeline
            </Text>
            
            <View style={styles.formContainer}>
              <Text style={styles.inputLabel}>Let me know</Text>
              <TextInput
                style={styles.textInput}
                value={question}
                onChangeText={handleQuestionChange}
                placeholder="Enter your question..."
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={2}
                textAlignVertical="top"
              />
              
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSubmit}
                activeOpacity={0.8}
              >
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Success Modal */}
      <Modal
        transparent
        visible={isModalVisible}
        animationType="none"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.modalContent,
              {
                opacity: fadeAnim,
                transform: [{
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                  })
                }]
              }
            ]}
          >
            <View style={styles.modalIconContainer}>
              <FontAwesome name="check" size={24} color="#16a34a" />
            </View>
            
            <Text style={styles.modalTitle}>Question Sent!</Text>
            <Text style={styles.modalSubtitle}>
              Thank you for your question. We&apos;ll get back to you soon.
            </Text>
            
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleCloseModal}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#111827',
    paddingVertical: width < 768 ? 16 : 20,
  },
  title: {
    fontSize: width < 400 ? 20 : width < 640 ? 24 : 28,
    fontWeight: '800',
    textAlign: 'center',
    color: '#374151',
    marginBottom: width < 768 ? 20 : 32,
    paddingHorizontal: 16,
    lineHeight: width < 400 ? 24 : width < 640 ? 28 : 32,
  },
  contentContainer: {
    flexDirection: width < 768 ? 'column' : 'row',
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 16,
    gap: width < 768 ? 20 : 32,
    height: width < 768 ? 500 : 400, // Fixed height to make container shorter
  },
  faqSection: {
    flex: width < 768 ? 1 : 3,
  },
  faqScrollView: {
    flex: 1,
    maxHeight: width < 768 ? 280 : 350, // Limit FAQ scroll height
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    borderStyle: 'dotted',
  },
  faqButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingRight: 8,
  },
  faqQuestion: {
    flex: 1,
    fontSize: width < 400 ? 13 : 14,
    fontWeight: '500',
    color: '#374151',
    lineHeight: width < 400 ? 18 : 20,
    marginRight: 12,
  },
  chevron: {
    transform: [{ rotate: '0deg' }],
  },
  chevronRotated: {
    transform: [{ rotate: '180deg' }],
  },
  faqAnswer: {
    paddingBottom: 12,
    paddingRight: 24,
  },
  faqAnswerText: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },
  questionSection: {
    flex: width < 768 ? 1 : 2,
  },
  questionCard: {
    backgroundColor: '#fff',
    padding: width < 768 ? 16 : 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4b5563',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  questionIcon: {
    width: 60,
    height: 45,
  },
  questionTitle: {
    fontSize: width < 768 ? 16 : 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111827',
    marginBottom: 6,
  },
  questionSubtitle: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 16,
  },
  formContainer: {
    gap: 12,
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#111827',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#fff',
    minHeight: 60,
    textAlignVertical: 'top',
    flex: 1,
  },
  sendButton: {
    backgroundColor: '#fca5a5', // red-300
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    borderTopWidth: 2,
    borderColor: '#111827',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginTop: 'auto',
  },
  sendButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#111827',
    fontSize: 14,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    maxWidth: 350,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#dcfce7', // green-100
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 6,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 16,
  },
  modalButton: {
    backgroundColor: '#fca5a5', // red-300
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default LifelineFAQ;