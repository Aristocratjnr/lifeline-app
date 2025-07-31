import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from 'expo-av';
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
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
  const [highlight, setHighlight] = useState<'scenario' | 'instructions'>('scenario');

  const handleNext = () => {
    router.push('/screens/first-aid-details/cuts/cleaning-wound');
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

  // Transcript for scenario section (dummy timings, adjust as needed)
  const scenarioTranscript = useMemo(() => [
    { word: "Katrina", start: 0, end: 0.5 },
    { word: "is", start: 0.5, end: 0.7 },
    { word: "taking", start: 0.7, end: 1.0 },
    { word: "a", start: 1.0, end: 1.1 },
    { word: "walk,", start: 1.1, end: 1.5 },
    { word: "when", start: 1.5, end: 1.7 },
    { word: "she", start: 1.7, end: 1.9 },
    { word: "trips", start: 1.9, end: 2.2 },
    { word: "and", start: 2.2, end: 2.3 },
    { word: "cuts", start: 2.3, end: 2.6 },
    { word: "her", start: 2.6, end: 2.7 },
    { word: "hand", start: 2.7, end: 3.0 },
  ], []);
  const [highlightedWordIdx, setHighlightedWordIdx] = useState<number>(-1);

  // Transcript for instructions section (dummy timings, adjust as needed)
  const instructionsTranscript = useMemo(() => [
    { word: "If", start: 7.0, end: 7.2 },
    { word: "you", start: 7.2, end: 7.4 },
    { word: "have", start: 7.4, end: 7.6 },
    { word: "a", start: 7.6, end: 7.7 },
    { word: "small", start: 7.7, end: 8.0 },
    { word: "CUT,", start: 8.0, end: 8.3 },
    { word: "first", start: 8.3, end: 8.6 },
    { word: "apply", start: 8.6, end: 8.9 },
    { word: "pressure", start: 8.9, end: 9.2 },
    { word: "to", start: 9.2, end: 9.3 },
    { word: "the", start: 9.3, end: 9.4 },
    { word: "wound", start: 9.4, end: 9.7 },
    { word: "to", start: 9.7, end: 9.8 },
    { word: "reduce", start: 9.8, end: 10.1 },
    { word: "bleeding", start: 10.1, end: 10.5 },
  ], []);
  const [highlightedInstructionIdx, setHighlightedInstructionIdx] = useState<number>(-1);

  // Transcript for subtext (slower timings, adjust as needed)
  const subtextTranscript = useMemo(() => [
    { word: "Applying", start: 10.6, end: 11.1 },
    { word: "pressure", start: 11.1, end: 11.6 },
    { word: "helps", start: 11.6, end: 12.1 },
    { word: "constrict", start: 12.1, end: 12.6 },
    { word: "the", start: 12.6, end: 13.1 },
    { word: "blood", start: 13.1, end: 13.6 },
    { word: "vessels", start: 13.6, end: 14.1 },
    { word: "preventing", start: 14.1, end: 14.6 },
    { word: "blood", start: 14.6, end: 15.1 },
    { word: "from", start: 15.1, end: 15.6 },
    { word: "flowing", start: 15.6, end: 16.1 },
    { word: "through", start: 16.1, end: 16.6 },
  ], []);
  const [highlightedSubtextIdx, setHighlightedSubtextIdx] = useState<number>(-1);

  // Handler for video progress
  const handlePlaybackStatusUpdate = (status: any) => {
    if (!status.isLoaded) return;
    const seconds = status.positionMillis / 1000;
    // Per-word highlight for scenario
    let scenarioIdx = scenarioTranscript.findIndex(
      (w, i) => seconds >= w.start && seconds < w.end
    );
    if (scenarioIdx === -1 && seconds >= scenarioTranscript[scenarioTranscript.length - 1].end) {
      scenarioIdx = scenarioTranscript.length - 1;
    }
    setHighlightedWordIdx(scenarioIdx);
    // Per-word highlight for instructions
    let instrIdx = instructionsTranscript.findIndex(
      (w, i) => seconds >= w.start && seconds < w.end
    );
    if (instrIdx === -1 && seconds >= instructionsTranscript[instructionsTranscript.length - 1].end) {
      instrIdx = instructionsTranscript.length - 1;
    }
    setHighlightedInstructionIdx(instrIdx);
    // Per-word highlight for subtext
    let subIdx = subtextTranscript.findIndex(
      (w, i) => seconds >= w.start && seconds < w.end
    );
    if (subIdx === -1 && seconds >= subtextTranscript[subtextTranscript.length - 1].end) {
      subIdx = subtextTranscript.length - 1;
    }
    setHighlightedSubtextIdx(subIdx);
    // Section highlight logic
    if (seconds < instructionsTranscript[0].start) {
      if (highlight !== 'scenario') setHighlight('scenario');
    } else {
      if (highlight !== 'instructions') setHighlight('instructions');
    }
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
          <Text style={styles.headerTitle}>First Aid: Cuts</Text>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Credits */}
          <View style={styles.creditsContainer}>
            <Text style={styles.creditsText}>Credits: First Aid Kit</Text>
          </View>
          {/* Top Video Illustration */}
          <View style={styles.topVideoContainer}>
            <Video
               ref={video}
               style={styles.topVideo}
               source={require("@/assets/videos/cut-1.mp4")}
               useNativeControls
               resizeMode={ResizeMode.COVER}
               shouldPlay={false} 
               onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
             />
          
          </View>

          {/* Scenario Section */}
          <View style={[styles.scenarioContainer, highlight === 'scenario' && styles.highlightedSection]}>
            <View style={styles.scenarioHeader}>
              <Text style={styles.scenarioTitle}>Scenario</Text>
            </View>
            <Text style={styles.scenarioText}>
              {scenarioTranscript.map((w, i) => (
                <Text
                  key={i}
                  style={i === highlightedWordIdx ? styles.wordHighlight : undefined}
                >
                  {w.word + ' '}
                </Text>
              ))}
            </Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Instructions Section */}
          <View style={[styles.scenarioContainer, highlight === 'instructions' && styles.highlightedSection]}>
            <View style={styles.scenarioHeader}>
              <Text style={styles.scenarioTitle}>Instructions</Text>
            </View>
            <Text style={styles.scenarioText}>
              {instructionsTranscript.map((w, i) => (
                <Text
                  key={i}
                  style={i === highlightedInstructionIdx && highlight === 'instructions' ? styles.wordHighlight : undefined}
                >
                  {w.word + ' '}
                </Text>
              ))}
            </Text>
             {/* second Section */}
            <View style={styles.subTextContainer}>
              <Text style={styles.instructionSubText}>
                {subtextTranscript.map((w, i) => (
                  <Text
                    key={i}
                    style={i === highlightedSubtextIdx && highlight === 'instructions' ? styles.wordHighlight : undefined}
                  >
                    {w.word + ' '}
                  </Text>
                ))}
              </Text>
            </View>
          </View>

          {/* Additional spacing for bottom navigation */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
        
        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
            <Text style={styles.sosText}>SOS</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Ionicons name="arrow-forward" size={28} color="#000" />
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
  backButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  topVideoContainer: {
    alignItems: 'center',
    marginBottom: 16,
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
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  highlightedSection: {
    borderWidth: 2,
    borderColor: '#3498db',
    backgroundColor: 'rgba(52, 152, 219, 0.08)',
    shadowColor: '#3498db',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  scenarioHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 8,
    marginBottom: 12,
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
  divider: {
    height: 2,
    backgroundColor: '#e0e0e0',
    width: '100%',
    marginVertical: 20,
  },
  instructionsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 0,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  instructionHeader: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  instructionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'JetBrainsMono-Bold',
    textAlign: 'center',
  },
  instructionContent: {
    padding: 16,
  },
  instructionText: {
    fontSize: 18,
    color: '#2c3e50',
    lineHeight: 26,
    textAlign: 'center',
    fontFamily: 'JetBrainsMono-Bold',
    marginBottom: 16,
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
  bottomNav: {
    zIndex: 3,
    position: 'absolute',
    bottom: 30, // increased from 10 for more space at the bottom
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
  sosButton: {
    backgroundColor: '#FF3B30',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default CutsInitialAssessment;