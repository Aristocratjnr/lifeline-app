import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from 'expo-av';
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CutsInitialAssessment: React.FC = () => {
  const router = useRouter();
  const video = useRef<Video>(null);

  // Instructions with their transcriptions
  const instructions = [
    {
      title: "Instruction 1",
      text: "Fever can be caused by an illness such as cold or ear infection.",
      transcript: [
        { word: "Fever", start: 0, end: 0.6 },
        { word: "can", start: 0.6, end: 0.9 },
        { word: "be", start: 0.9, end: 1.1 },
        { word: "caused", start: 1.1, end: 1.5 },
        { word: "by", start: 1.5, end: 1.7 },
        { word: "an", start: 1.7, end: 1.9 },
        { word: "illness", start: 1.9, end: 2.4 },
        { word: "such", start: 2.4, end: 2.7 },
        { word: "as", start: 2.7, end: 2.9 },
        { word: "cold", start: 2.9, end: 3.3 },
        { word: "or", start: 3.3, end: 3.5 },
        { word: "ear", start: 3.5, end: 3.8 },
        { word: "infection", start: 3.8, end: 4.5 },
      ]
    },
    {
      title: "Instruction 2",
      text: "Check their temperature - anything above 37ºC is a fever.",
      transcript: [
        { word: "Check", start: 0, end: 0.5 },
        { word: "their", start: 0.5, end: 0.8 },
        { word: "temperature", start: 0.8, end: 1.5 },
        { word: "-", start: 1.5, end: 1.7 },
        { word: "anything", start: 1.7, end: 2.1 },
        { word: "above", start: 2.1, end: 2.5 },
        { word: "37", start: 2.5, end: 2.8 },
        { word: "ºC", start: 2.8, end: 3.0 },
        { word: "is", start: 3.0, end: 3.2 },
        { word: "a", start: 3.2, end: 3.3 },
        { word: "fever", start: 3.3, end: 3.8 },
      ]
    },
    {
      title: "Instruction 3",
      text: "For anything above 39ºC, still give first aid, but seek medical advice as well.",
      transcript: [
        { word: "For", start: 0, end: 0.4 },
        { word: "anything", start: 0.4, end: 0.9 },
        { word: "above", start: 0.9, end: 1.3 },
        { word: "39", start: 1.3, end: 1.6 },
        { word: "ºC,", start: 1.6, end: 1.8 },
        { word: "still", start: 1.8, end: 2.1 },
        { word: "give", start: 2.1, end: 2.3 },
        { word: "first", start: 2.3, end: 2.6 },
        { word: "aid,", start: 2.6, end: 2.8 },
        { word: "but", start: 2.8, end: 3.0 },
        { word: "seek", start: 3.0, end: 3.3 },
        { word: "medical", start: 3.3, end: 3.7 },
        { word: "advice", start: 3.7, end: 4.2 },
        { word: "as", start: 4.2, end: 4.4 },
        { word: "well", start: 4.4, end: 4.8 },
      ]
    }
  ];

  const [currentInstruction, setCurrentInstruction] = useState(0);
  const [transcript, setTranscript] = useState(instructions[0].transcript);

  const [highlightedWordIdx, setHighlightedWordIdx] = useState<number>(-1);
  
  const handleNextInstruction = () => {
    if (currentInstruction < instructions.length - 1) {
      setCurrentInstruction(currentInstruction + 1);
      setTranscript(instructions[currentInstruction + 1].transcript);
    } else {
      // Handle completion of all instructions
      router.push('/screens/first-aid-details/Fever/treatment');
    }
  };
  
  const handlePreviousInstruction = () => {
    if (currentInstruction > 0) {
      setCurrentInstruction(currentInstruction - 1);
      setTranscript(instructions[currentInstruction - 1].transcript);
    } else {
      router.back();
    }
  };

  const handleNext = () => {
    router.push('/screens/first-aid-details/cuts/applying-dressings');
  };

  const handleSOS = () => {
    router.push('/sos');
  };
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Regular": require("@/assets/fonts/JetBrainsMono-Regular.ttf"),
    "JetBrainsMono-Bold": require("@/assets/fonts/JetBrainsMono-Bold.ttf"),
  });

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/dashboard');
    }
  };

  // Highlight logic for per-word
  const handlePlaybackStatusUpdate = (status: any) => {
    if (!status.isLoaded) return;
    const seconds = status.positionMillis / 1000;
    let idx = transcript.findIndex(
      (w, i) => seconds >= w.start && seconds < w.end
    );
    if (idx === -1 && seconds >= transcript[transcript.length - 1].end) {
      idx = transcript.length - 1;
    }
    setHighlightedWordIdx(idx);
  };

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <ImageBackground 
      source={require('../../../../assets/images/blur.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleGoBack}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Credits */}
          <View style={styles.creditsContainer}>
            <Text style={styles.creditsText}>Credits: British Red Cross</Text>
          </View>
          {/* Top Video Illustration */}
          <View style={styles.topVideoContainer}>
            <Video
               ref={video}
               style={styles.topVideo}
               source={require("@/assets/videos/fever-1.mp4")}
               useNativeControls
               resizeMode={ResizeMode.COVER}
               progressUpdateIntervalMillis={250}
               shouldPlay={false}
               onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
             />
          </View>

          {/* Scenario Section */}
          <View style={styles.scenarioContainer}>
            <View style={styles.scenarioHeader}>
              <Text style={styles.scenarioTitle}>{instructions[currentInstruction].title}</Text>
            </View>
            <Text style={styles.scenarioText}>
              {instructions[currentInstruction].text}
            </Text>
            <View style={styles.transcriptContainer}>
              <Text style={styles.transcriptTitle}>Transcript:</Text>
              <Text style={styles.transcriptText}>
                {transcript.map((w, i) => (
                  <Text
                    key={i}
                    style={i === highlightedWordIdx ? styles.wordHighlight : undefined}
                  >
                    {w.word + ' '}
                  </Text>
                ))}
              </Text>
            </View>
            <View style={styles.instructionNav}>
              <Text style={styles.instructionCounter}>
                {currentInstruction + 1} / {instructions.length}
              </Text>
            </View>
          </View>
        </ScrollView>
        
        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navButton} onPress={handlePreviousInstruction}>
            <Ionicons name="arrow-back" size={28} color="#000" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
            <Text style={styles.sosText}>SOS</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={handleNextInstruction}
          >
            <Ionicons 
              name={currentInstruction === instructions.length - 1 ? "checkmark" : "arrow-forward"} 
              size={28} 
              color="#000" 
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.89)',
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'JetBrainsMono-Bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 29, 
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  topVideoContainer: {
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topVideo: {
    width: '100%',
    height: 220,
  },
  scenarioContainer: {
    marginTop: 70,
    marginBottom: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  scenarioHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 8,
    marginBottom: 10,
  },
  scenarioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    fontFamily: 'JetBrainsMono-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scenarioText: {
    fontSize: 15,
    color: '#34495e',
    lineHeight: 22,
    fontFamily: 'JetBrainsMono-Regular',
  },
 
  subTextContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
  },
  creditsContainer: {
    alignSelf: 'flex-end',
    marginTop: 4,
    marginRight: 6,
  },
  creditsText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Cochin',
    fontStyle: 'italic',
  },
  instructionSubText: {
    fontSize: 16,
    color: '#7f8c8d',
    lineHeight: 22,
    textAlign: 'center',
    fontFamily: 'JetBrainsMono-Regular',
    fontStyle: 'italic',
  },
  captionsContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  captionText: {
    fontSize: 14,
    color: '#34495e',
    fontFamily: 'JetBrainsMono-Regular',
    marginVertical: 2,
    textAlign: 'center',
  },
  activeCaptionText: {
    color: '#e74c3c',
    fontFamily: 'JetBrainsMono-Bold',
  },
  bottomSpacing: {
    height: 120, // Space for bottom navigation
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
    zIndex: 1,
  },
  backButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bottomNav: {
    zIndex: 3,
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sosButton: {
    backgroundColor: '#FF3B30',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '50%',
    marginLeft: -20, 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sosText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
  },
  nextButton: {
    position: 'absolute',
    right: 30,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  wordHighlight: {
    backgroundColor: '#ffe082',
    borderRadius: 4,
    color: '#d84315',
    fontWeight: 'bold',
  },
  transcriptContainer: {
    marginTop: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    padding: 12,
  },
  transcriptTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    fontFamily: 'JetBrainsMono-Bold',
  },
  transcriptText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 22,
    fontFamily: 'JetBrainsMono-Regular',
  },
  instructionNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  instructionCounter: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'JetBrainsMono-Regular',
  },
  navButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});

export default CutsInitialAssessment;