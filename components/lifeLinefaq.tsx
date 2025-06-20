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
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Frequently Asked Questions</Text>
        
        <View style={styles.contentContainer}>
          {/* FAQ Section */}
          <View style={styles.faqSection}>
            {faqs.map(renderFAQItem)}
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
                  numberOfLines={3}
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
      </ScrollView>

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
    flex: 1,
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  title: {
    fontSize: width < 400 ? 24 : width < 640 ? 28 : 32,
    fontWeight: '800',
    textAlign: 'center',
    color: '#374151',
    marginBottom: width < 768 ? 32 : 64,
    marginTop: 32,
    paddingHorizontal: 16,
    lineHeight: width < 400 ? 28 : width < 640 ? 32 : 36,
  },
  contentContainer: {
    flexDirection: width < 768 ? 'column' : 'row',
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 16,
    gap: width < 768 ? 32 : 64,
  },
  faqSection: {
    flex: width < 768 ? undefined : 3,
  },
  faqItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#d1d5db',
    borderStyle: 'dotted',
  },
  faqButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingRight: 8,
  },
  faqQuestion: {
    flex: 1,
    fontSize: width < 400 ? 14 : 16,
    fontWeight: '500',
    color: '#374151',
    lineHeight: width < 400 ? 20 : 24,
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
    paddingRight: 24,
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  questionSection: {
    flex: width < 768 ? undefined : 2,
    marginTop: width < 768 ? 32 : 0,
  },
  questionCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4b5563',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  questionIcon: {
    width: 80,
    height: 60,
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111827',
    marginBottom: 8,
  },
  questionSubtitle: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  formContainer: {
    gap: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#111827',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#fff',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#fca5a5', // red-300
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    borderTopWidth: 2,
    borderColor: '#111827',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sendButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#111827',
    fontSize: 16,
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
    padding: 32,
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#dcfce7', // green-100
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  modalButton: {
    backgroundColor: '#fca5a5', // red-300
    paddingHorizontal: 24,
    paddingVertical: 8,
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
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LifelineFAQ;