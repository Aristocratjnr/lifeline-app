import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, ImageBackground, SafeAreaView, Share, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, Vibration, View } from 'react-native';

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
  const [answered, setAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showCountdown, setShowCountdown] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const countdownAnim = useRef(new Animated.Value(0)).current;
  const optionAnimations = useRef(
    Array.from({ length: 4 }, () => new Animated.Value(0))
  ).current;

  // Animate progress bar
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (currentQuestion + 1) / questions.length,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [currentQuestion, progressAnim, questions.length]);

  // Animate options entrance
  useEffect(() => {
    optionAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      optionAnimations.forEach(anim => anim.setValue(0));
    };
  }, [currentQuestion, optionAnimations]);

  const handleAnswer = (selectedOption: number) => {
    if (answered) return;
    
    setSelectedOption(selectedOption);
    setAnswered(true);
    setIsLoading(true);
    
    // Haptic feedback
    Vibration.vibrate(100);
    
    // Scale animation for selected option
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Delay to show result
    setTimeout(() => {
      if (selectedOption === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
      setIsLoading(false);
      setShowCountdown(true);
      setCountdown(3);
      
      // Start countdown animation
      countdownAnim.setValue(0);
      Animated.timing(countdownAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }).start();
      
      // Countdown timer
      let timeLeft = 3;
      const countdownInterval = setInterval(() => {
        timeLeft--;
        setCountdown(timeLeft);
        
        if (timeLeft <= 0) {
          clearInterval(countdownInterval);
          setShowCountdown(false);
          handleNext();
        }
      }, 1000);
    }, 500);
  };

  const handleNext = () => {
    // Fade out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setAnswered(false);
        
        // Reset option animations
        optionAnimations.forEach(anim => anim.setValue(0));
        
        // Fade back in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setShowScore(true);
        // Fade back in for score screen
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    });
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setAnswered(false);
    setShowCountdown(false);
    setCountdown(0);
    
    // Reset all animations
    fadeAnim.setValue(1);
    scaleAnim.setValue(1);
    progressAnim.setValue(0);
    countdownAnim.setValue(0);
    optionAnimations.forEach(anim => anim.setValue(0));
  };

  const shareScore = async () => {
    try {
      const percentage = Math.round((score / questions.length) * 100);
      const performanceLevel = percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : 'Keep Learning';
      
      const shareMessage = `🏥 First Aid Quiz Results! 📋\n\n` +
        `I scored ${percentage}% (${score}/${questions.length}) on the Lifeline First Aid Quiz! ${performanceLevel === 'Excellent' ? '🎉' : performanceLevel === 'Good' ? '👍' : '📚'}\n\n` +
        `Performance: ${performanceLevel}\n` +
        `${percentage >= 80 ? 'I\'m well-prepared for emergencies!' : percentage >= 60 ? 'I\'m on the right track!' : 'Time to brush up on my first aid skills!'}\n\n` +
        `💡 First aid knowledge can save lives! Take the quiz and test your emergency preparedness.\n\n` +
        `#FirstAid #LifelineMobile #EmergencyPreparedness #HealthEducation`;

      const result = await Share.share({
        message: shareMessage,
        title: 'My First Aid Quiz Score',
      });

      if (result.action === Share.sharedAction) {
        // Content was shared
        console.log('Score shared successfully');
      }
    } catch (error) {
      console.error('Error sharing score:', error);
    }
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

      const animatedStyle = {
        opacity: optionAnimations[index],
        transform: [
          {
            translateY: optionAnimations[index].interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          },
          {
            scale: index === selectedOption && answered ? scaleAnim : 1,
          },
        ],
      };

      return (
        <Animated.View key={index} style={animatedStyle}>
          <TouchableOpacity
            style={[
              optionStyle, 
              { 
                opacity: answered && index !== selectedOption && index !== questions[currentQuestion].correctAnswer ? 0.6 : 1,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }
            ]}
            onPress={() => handleAnswer(index)}
            disabled={answered}
            activeOpacity={0.8}
          >
            <View style={styles.optionContent}>
              <View style={[styles.optionNumber, { 
                backgroundColor: answered && index === questions[currentQuestion].correctAnswer 
                  ? '#4CAF50' 
                  : answered && index === selectedOption && index !== questions[currentQuestion].correctAnswer
                    ? '#F44336'
                    : isDarkMode ? '#444' : '#f0f0f0'
              }]}>
                <Text style={[styles.optionNumberText, {
                  color: answered && (index === questions[currentQuestion].correctAnswer || 
                         (index === selectedOption && index !== questions[currentQuestion].correctAnswer))
                    ? '#fff' : colors.text
                }]}>
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text style={[optionTextStyle, { flex: 1, marginLeft: 12 }]}>{option}</Text>
              {answered && index === questions[currentQuestion].correctAnswer && (
                <Animated.View style={{
                  transform: [{
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1],
                    })
                  }]
                }}>
                  <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                </Animated.View>
              )}
              {answered && index === selectedOption && index !== questions[currentQuestion].correctAnswer && (
                <Animated.View style={{
                  transform: [{
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1],
                    })
                  }]
                }}>
                  <Ionicons name="close-circle" size={24} color="#F44336" />
                </Animated.View>
              )}
            </View>
          </TouchableOpacity>
        </Animated.View>
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
          <Animated.View style={[styles.quizContainer, { opacity: fadeAnim }]}>
            <View style={styles.progressContainer}>
              <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                Question {currentQuestion + 1} of {questions.length}
              </Text>
              <View style={[styles.progressBar, { backgroundColor: colors.progressBackground }]}>
                <Animated.View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      }),
                      backgroundColor: colors.progressFill
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.scoreIndicator, { color: colors.textSecondary }]}>
                Score: {score}/{questions.length}
              </Text>
            </View>

            <Animated.View style={[
              styles.questionContainer, 
              { 
                backgroundColor: colors.card,
                transform: [{
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                  })
                }]
              }
            ]}>
              <View style={styles.questionHeader}>
                <View style={[styles.questionBadge, { backgroundColor: colors.progressFill }]}>
                  <Text style={styles.questionBadgeText}>Q{currentQuestion + 1}</Text>
                </View>
                <View style={styles.difficultyIndicator}>
                  <Ionicons 
                    name="star" 
                    size={16} 
                    color={colors.progressFill} 
                  />
                  <Text style={[styles.difficultyText, { color: colors.textSecondary }]}>
                    {currentQuestion < 4 ? 'Easy' : currentQuestion < 8 ? 'Medium' : 'Hard'}
                  </Text>
                </View>
              </View>
              <Text style={[styles.questionText, { color: colors.text }]}>
                {questions[currentQuestion].question}
              </Text>
            </Animated.View>

            <View style={styles.optionsContainer}>
              {renderOptions()}
            </View>

            {answered && !isLoading && (
              <Animated.View style={[
                styles.explanationContainer, 
                { 
                  backgroundColor: colors.explanationBackground,
                  opacity: fadeAnim,
                  transform: [{
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    })
                  }]
                }
              ]}>
                <View style={styles.explanationHeader}>
                  <Ionicons 
                    name={selectedOption === questions[currentQuestion].correctAnswer ? "checkmark-circle" : "close-circle"} 
                    size={24} 
                    color={selectedOption === questions[currentQuestion].correctAnswer ? "#4CAF50" : "#F44336"} 
                  />
                  <Text style={[styles.explanationTitle, { color: colors.text }]}>
                    {selectedOption === questions[currentQuestion].correctAnswer 
                      ? 'Correct! 🎉' 
                      : 'Incorrect 📚'}
                  </Text>
                </View>
                <Text style={[styles.explanationText, { color: colors.textSecondary }]}>
                  {questions[currentQuestion].explanation}
                </Text>
                
                {showCountdown && (
                  <View style={styles.countdownContainer}>
                    <View style={styles.countdownContent}>
                      <Text style={[styles.countdownText, { color: colors.text }]}>
                        {currentQuestion < questions.length - 1 ? 'Next question in' : 'Showing results in'}
                      </Text>
                      <View style={styles.countdownCircle}>
                        <Animated.View style={[
                          styles.countdownProgress,
                          {
                            transform: [{
                              rotate: countdownAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg'],
                              })
                            }]
                          }
                        ]} />
                        <Text style={[styles.countdownNumber, { color: colors.progressFill }]}>
                          {countdown}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </Animated.View>
            )}

            {isLoading && (
              <View style={styles.loadingContainer}>
                <Animated.View style={{
                  transform: [{
                    rotate: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    })
                  }]
                }}>
                  <Ionicons name="hourglass-outline" size={32} color={colors.progressFill} />
                </Animated.View>
                <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
                  Checking answer...
                </Text>
              </View>
            )}
          </Animated.View>
        ) : (
          <Animated.View style={[styles.scoreContainer, { opacity: fadeAnim }]}>
            <LinearGradient
              colors={score / questions.length >= 0.8 
                ? ['#4CAF50', '#66BB6A', '#81C784'] 
                : score / questions.length >= 0.6
                  ? ['#FF9800', '#FFB74D', '#FFCC02']
                  : ['#FF6B6B', '#FF8E8E', '#FFAB91']
              }
              style={styles.scoreCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Animated.View style={[
                styles.scoreCircle,
                {
                  transform: [{
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1],
                    })
                  }]
                }
              ]}>
                <Text style={styles.scoreText}>
                  {Math.round((score / questions.length) * 100)}%
                </Text>
                <Text style={styles.scoreSubtext}>Your Score</Text>
                <View style={styles.scoreDetails}>
                  <Text style={styles.scoreDetailText}>
                    {score} out of {questions.length}
                  </Text>
                </View>
              </Animated.View>
              
              <View style={styles.performanceIndicator}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Ionicons
                    key={index}
                    name="star"
                    size={24}
                    color={index < Math.ceil((score / questions.length) * 5) ? '#FFD700' : 'rgba(255, 255, 255, 0.3)'}
                    style={{ marginHorizontal: 2 }}
                  />
                ))}
              </View>
              
              <Text style={styles.resultText}>
                {score === questions.length 
                  ? 'Perfect! You\'re a first aid expert! 🎉' 
                  : score >= questions.length * 0.8
                    ? 'Excellent! You\'re well prepared! ⭐'
                    : score >= questions.length * 0.6 
                      ? 'Good job! Keep practicing! 👍' 
                      : 'Keep learning! You\'re on the right track! 📚'}
              </Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.restartButton}
                  onPress={restartQuiz}
                  activeOpacity={0.8}
                >
                  <Ionicons name="refresh" size={20} color="#FF6B6B" />
                  <Text style={styles.restartButtonText}>Try Again</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.shareButton, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}
                  onPress={shareScore}
                  activeOpacity={0.8}
                >
                  <Ionicons name="share-social" size={20} color="#fff" />
                  <Text style={styles.shareButtonText}>Share Score</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
            
            <TouchableOpacity 
              style={styles.homeButton}
              onPress={() => router.push('/main')}
              activeOpacity={0.8}
            >
              <Ionicons name="home" size={20} color={colors.homeButtonText} />
              <Text style={[styles.homeButtonText, { color: colors.homeButtonText }]}>Back to Home</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

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
    borderRadius: 20,
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
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  scoreIndicator: {
    fontSize: 12,
    textAlign: 'right',
    fontFamily: 'JetBrainsMono-Regular',
  },
  questionContainer: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  questionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  questionBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
  },
  difficultyIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyText: {
    fontSize: 12,
    marginLeft: 4,
    fontFamily: 'JetBrainsMono-Regular',
  },
  questionText: {
    fontSize: 18,
    lineHeight: 26,
    fontFamily: 'JetBrainsMono-Bold',
  },
  optionsContainer: {
    marginBottom: 24,
  },
  option: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Regular',
  },
  correctOption: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
  },
  wrongOption: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
  },
  explanationContainer: {
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    fontFamily: 'JetBrainsMono-Bold',
  },
  explanationText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
    fontFamily: 'JetBrainsMono-Regular',
  },
  countdownContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  countdownContent: {
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 14,
    marginBottom: 12,
    fontFamily: 'JetBrainsMono-Regular',
    textAlign: 'center',
  },
  countdownCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  countdownProgress: {
    position: 'absolute',
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 3,
    borderColor: 'transparent',
    borderTopColor: '#FF6B6B',
  },
  countdownNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
  },
  nextButton: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    fontFamily: 'JetBrainsMono-Bold',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: 'JetBrainsMono-Regular',
  },
  scoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scoreCard: {
    width: '100%',
    borderRadius: 32,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 16,
  },
  scoreCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 8,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  scoreText: {
    fontSize: 52,
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
  scoreDetails: {
    marginTop: 8,
  },
  scoreDetailText: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.8,
    fontFamily: 'JetBrainsMono-Regular',
  },
  performanceIndicator: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 28,
    fontFamily: 'JetBrainsMono-Bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  restartButton: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  restartButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    fontFamily: 'JetBrainsMono-Bold',
  },
  shareButton: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  shareButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    fontFamily: 'JetBrainsMono-Bold',
  },
  homeButton: {
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  homeButtonText: {
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'JetBrainsMono-Regular',
  },
});
