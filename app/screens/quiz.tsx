import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

// Define the color scheme interface
interface ColorScheme {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  progressBackground: string;
  progressFill: string;
  explanationBackground: string;
  homeButtonText: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function QuizScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Colors based on theme
  const colors: ColorScheme = {
    background: isDarkMode ? 'rgba(18, 18, 18, 0.9)' : 'rgba(255, 255, 255, 0.9)',
    card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#333333',
    textSecondary: isDarkMode ? '#B0B0B0' : '#666666',
    border: isDarkMode ? '#333333' : '#E0E0E0',
    progressBackground: isDarkMode ? '#333333' : '#F0F0F0',
    progressFill: isDarkMode ? '#FF8A8A' : '#FF6B6B',
    explanationBackground: isDarkMode ? '#2A2A2A' : '#F8F9FA',
    homeButtonText: isDarkMode ? '#FFFFFF' : '#333333',
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answered, setAnswered] = useState(false);

  // First Aid Quiz Questions
  const questions: Question[] = [
    {
      id: 1,
      question: 'What is the first thing you should do when you see someone collapse?',
      options: [
        'Start CPR immediately',
        'Check for responsiveness',
        'Call emergency services',
        'Look for a defibrillator'
      ],
      correctAnswer: 1,
      explanation: 'The first step is to check if the person is responsive by tapping their shoulder and shouting, "Are you okay?"'
    },
    {
      id: 2,
      question: 'How many chest compressions should you give per minute during CPR?',
      options: [
        '60-80',
        '80-100',
        '100-120',
        '120-140'
      ],
      correctAnswer: 2,
      explanation: 'The recommended rate for chest compressions is 100-120 per minute.'
    },
    {
      id: 3,
      question: 'What is the correct ratio of chest compressions to rescue breaths in adult CPR?',
      options: [
        '15:2',
        '30:2',
        '5:1',
        '10:2'
      ],
      correctAnswer: 1,
      explanation: 'The correct ratio is 30 chest compressions followed by 2 rescue breaths for adult CPR.'
    },
    {
      id: 4,
      question: 'What should you do if someone is choking but can still speak or cough?',
      options: [
        'Perform abdominal thrusts immediately',
        'Encourage them to keep coughing',
        'Slap them on the back forcefully',
        'Give them water to drink'
      ],
      correctAnswer: 1,
      explanation: 'If the person can speak, cough, or breathe, encourage them to keep coughing as this is the most effective way to clear the obstruction.'
    },
    {
      id: 5,
      question: 'How should you treat a minor burn?',
      options: [
        'Apply butter or oil',
        'Use ice directly on the burn',
        'Run cool water for 10-15 minutes',
        'Pop any blisters that form'
      ],
      correctAnswer: 2,
      explanation: 'Cool the burn under cool (not cold) running water for 10-15 minutes. Avoid ice, butter, or other home remedies.'
    },
    {
      id: 6,
      question: 'What is the first step in treating a bleeding wound?',
      options: [
        'Apply a tourniquet',
        'Elevate the injured area',
        'Apply direct pressure with a clean cloth',
        'Clean the wound with alcohol'
      ],
      correctAnswer: 2,
      explanation: 'The first step is to apply direct pressure to the wound with a clean cloth or bandage to stop the bleeding.'
    },
    {
      id: 7,
      question: 'What should you do if someone is having a seizure?',
      options: [
        'Hold them down to stop the shaking',
        'Put something in their mouth',
        'Move objects away and protect their head',
        'Give them water when it stops'
      ],
      correctAnswer: 2,
      explanation: 'Clear the area around them, protect their head, and time the seizure. Never put anything in their mouth or restrain them.'
    },
    {
      id: 8,
      question: 'What does FAST stand for in stroke recognition?',
      options: [
        'Fever, Aches, Sore throat, Tiredness',
        'Face, Arm, Speech, Time',
        'Fainting, Abdominal, Sweating, Thirst',
        'Fever, Appetite, Soreness, Thirst'
      ],
      correctAnswer: 1,
      explanation: 'FAST stands for Face (drooping), Arm (weakness), Speech (difficulty), Time (to call emergency).'
    },
    {
      id: 9,
      question: 'What is the correct treatment for a nosebleed?',
      options: [
        'Tilt the head back',
        'Pinch the soft part of the nose and lean forward',
        'Lie down flat',
        'Blow the nose forcefully'
      ],
      correctAnswer: 1,
      explanation: 'Pinch the soft part of the nose, lean forward slightly, and breathe through your mouth for 10-15 minutes.'
    },
    {
      id: 10,
      question: 'What should you do if someone is experiencing heat exhaustion?',
      options: [
        'Give them alcohol to drink',
        'Have them take a hot shower',
        'Move them to a cool place and give water',
        'Wrap them in warm blankets'
      ],
      correctAnswer: 2,
      explanation: 'Move them to a cool place, have them drink cool water, and apply cool, wet cloths to their skin.'
    },
    {
      id: 11,
      question: 'How should you treat a sprained ankle?',
      options: [
        'Apply heat immediately',
        'Use the RICE method (Rest, Ice, Compression, Elevation)',
        'Continue normal activities',
        'Massage the area'
      ],
      correctAnswer: 1,
      explanation: 'The RICE method (Rest, Ice, Compression, Elevation) is the recommended treatment for sprains.'
    },
    {
      id: 12,
      question: 'What is the first thing to do when someone is stung by a bee?',
      options: [
        'Squeeze the stinger out',
        'Scrape the stinger out with a credit card',
        'Apply a tourniquet',
        'Suck out the venom'
      ],
      correctAnswer: 1,
      explanation: 'Gently scrape the stinger out with a credit card or your fingernail. Don\'t squeeze it, as this can release more venom.'
    }
  ];

  const handleAnswer = (selectedOption: number) => {
    if (answered) return;
    
    setSelectedOption(selectedOption);
    setAnswered(true);
    
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setAnswered(false);
      setShowExplanation(false);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setAnswered(false);
    setShowExplanation(false);
  };

  const renderOptions = () => {
    return questions[currentQuestion].options.map((option, index) => {
      let optionStyle = [styles.option, { backgroundColor: colors.card, borderColor: colors.border }];
      let optionTextStyle = [styles.optionText, { color: colors.text }];
      
      if (answered) {
        if (index === selectedOption) {
          optionStyle = index === questions[currentQuestion].correctAnswer 
            ? [styles.correctOption, { backgroundColor: isDarkMode ? 'rgba(76, 175, 80, 0.2)' : '#E8F5E9', borderColor: '#4CAF50' }]
            : [styles.wrongOption, { backgroundColor: isDarkMode ? 'rgba(244, 67, 54, 0.2)' : '#FFEBEE', borderColor: '#F44336' }];
        } else if (index === questions[currentQuestion].correctAnswer) {
          optionStyle = [styles.correctOption, { backgroundColor: isDarkMode ? 'rgba(76, 175, 80, 0.2)' : '#E8F5E9', borderColor: '#4CAF50' }];
        }
      }

      return (
        <TouchableOpacity
          key={index}
          style={[optionStyle, { opacity: answered && index !== selectedOption && index !== questions[currentQuestion].correctAnswer ? 0.6 : 1 }]}
          onPress={() => handleAnswer(index)}
          disabled={answered}
          activeOpacity={0.7}
        >
          <Text style={optionTextStyle}>{option}</Text>
          {answered && index === questions[currentQuestion].correctAnswer && (
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" style={styles.optionIcon} />
          )}
          {answered && index === selectedOption && index !== questions[currentQuestion].correctAnswer && (
            <Ionicons name="close-circle" size={24} color="#F44336" style={styles.optionIcon} />
          )}
        </TouchableOpacity>
      );
    });
  };

  return (
    <ImageBackground 
      source={require('@/assets/images/blur.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>First Aid Quiz</Text>
          <View style={styles.headerRight} />
        </View>

        {!showScore ? (
          <View style={styles.quizContainer}>
            <View style={styles.progressContainer}>
              <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                Question {currentQuestion + 1} of {questions.length}
              </Text>
              <View style={[styles.progressBar, { backgroundColor: colors.progressBackground }]}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                      backgroundColor: colors.progressFill
                    }
                  ]} 
                />
              </View>
            </View>

            <View style={[styles.questionContainer, { backgroundColor: colors.card }]}>
              <Text style={[styles.questionText, { color: colors.text }]}>
                {questions[currentQuestion].question}
              </Text>
            </View>

            <View style={styles.optionsContainer}>
              {renderOptions()}
            </View>

            {answered && (
              <View style={[styles.explanationContainer, { backgroundColor: colors.explanationBackground }]}>
                <Text style={[styles.explanationTitle, { color: colors.text }]}>
                  {selectedOption === questions[currentQuestion].correctAnswer 
                    ? 'Correct! 🎉' 
                    : 'Incorrect'}
                </Text>
                <Text style={[styles.explanationText, { color: colors.textSecondary }]}>
                  {questions[currentQuestion].explanation}
                </Text>
                <TouchableOpacity 
                  style={[styles.nextButton, { backgroundColor: colors.progressFill }]}
                  onPress={handleNext}
                  activeOpacity={0.8}
                >
                  <Text style={styles.nextButtonText}>
                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                  </Text>
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.scoreContainer}>
            <LinearGradient
              colors={score / questions.length >= 0.8 ? ['#4CAF50', '#66BB6A'] : ['#FF6B6B', '#FF8E8E']}
              style={styles.scoreCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.scoreCircle}>
                <Text style={styles.scoreText}>
                  {Math.round((score / questions.length) * 100)}%
                </Text>
                <Text style={styles.scoreSubtext}>Your Score</Text>
              </View>
              
              <Text style={styles.resultText}>
                {score === questions.length 
                  ? 'Perfect! You\'re a first aid expert! 🎉' 
                  : score >= questions.length / 2 
                    ? 'Good job! Keep learning!' 
                    : 'Keep practicing! You\'ll get better!'}
              </Text>
              
              <TouchableOpacity 
                style={styles.restartButton}
                onPress={restartQuiz}
                activeOpacity={0.8}
              >
                <Ionicons name="refresh" size={20} color="#FF6B6B" />
                <Text style={styles.restartButtonText}>Try Again</Text>
              </TouchableOpacity>
            </LinearGradient>
            
            <TouchableOpacity 
              style={styles.homeButton}
              onPress={() => router.push('/')}
              activeOpacity={0.8}
            >
              <Ionicons name="home" size={20} color={colors.homeButtonText} />
              <Text style={[styles.homeButtonText, { color: colors.homeButtonText }]}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
  },
  headerRight: {
    width: 40,
  },
  quizContainer: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressText: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'JetBrainsMono-Regular',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  questionContainer: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  questionText: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: 'JetBrainsMono-Bold',
  },
  optionsContainer: {
    marginBottom: 24,
  },
  option: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Regular',
  },
  optionIcon: {
    marginLeft: 8,
  },
  correctOption: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrongOption: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  explanationContainer: {
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'JetBrainsMono-Bold',
  },
  explanationText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
    fontFamily: 'JetBrainsMono-Regular',
  },
  nextButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    fontFamily: 'JetBrainsMono-Bold',
  },
  scoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scoreCard: {
    width: '100%',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 6,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: 'JetBrainsMono-Bold',
  },
  scoreSubtext: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.9,
    marginTop: 4,
    fontFamily: 'JetBrainsMono-Regular',
  },
  resultText: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 28,
    fontFamily: 'JetBrainsMono-Bold',
  },
  restartButton: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  restartButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    fontFamily: 'JetBrainsMono-Bold',
  },
  homeButton: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  homeButtonText: {
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'JetBrainsMono-Regular',
  },
});
