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

const BeeStingsControllingBleeding: React.FC = () => {
  const router = useRouter();
  const video = useRef<Video>(null);
  const [highlight, setHighlight] = useState<'scenario' | 'instructions'>('scenario');

  // Scenario transcript with timings (in seconds)
  const scenarioTranscript = useMemo(() => [
    { word: "Keep", start: 0, end: 0.7 },
    { word: "the", start: 0.7, end: 0.9 },
    { word: "cold", start: 0.9, end: 1.3 },
    { word: "compress", start: 1.3, end: 2.0 },
    { word: "in", start: 2.0, end: 2.2 },
    { word: "place", start: 2.2, end: 2.7 },
    { word: "for", start: 2.7, end: 3.0 },
    { word: "up", start: 3.0, end: 3.3 },
    { word: "to", start: 3.3, end: 3.5 },
    { word: "20", start: 3.5, end: 4.0 },
    { word: "minutes.", start: 4.0, end: 5.0 },
  ], []);

  // Instructions transcript with timings (in seconds)
  const instructionsTranscript = useMemo(() => [
    { word: "It", start: 5.0, end: 5.3 },
    { word: "is", start: 5.3, end: 5.6 },
    { word: "important", start: 5.6, end: 6.2 },
    { word: "to", start: 6.2, end: 6.4 },
    { word: "monitor", start: 6.4, end: 7.0 },
    { word: "the", start: 7.0, end: 7.2 },
    { word: "vital", start: 7.2, end: 7.6 },
    { word: "signs", start: 7.6, end: 8.0 },
    { word: "and", start: 8.0, end: 8.3 },
    { word: "watch", start: 8.3, end: 8.7 },
    { word: "for", start: 8.7, end: 9.0 },
    { word: "signs", start: 9.0, end: 9.4 },
    { word: "of", start: 9.4, end: 9.6 },
    { word: "any", start: 9.6, end: 10.0 },
    { word: "allergic", start: 10.0, end: 10.6 },
    { word: "reactions.", start: 10.6, end: 12.0 },
  ], []);

  const [highlightedScenarioIdx, setHighlightedScenarioIdx] = useState<number>(-1);
  const [highlightedInstructionIdx, setHighlightedInstructionIdx] = useState<number>(-1);

  const handleNext = () => {
    router.push('/screens/first-aid-details/Stings/bee-cleaning-wound');
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

  // Handler for video progress
  const handlePlaybackStatusUpdate = (status: any) => {
    if (!status.isLoaded) return;
    const seconds = status.positionMillis / 1000;
    
    // Per-word highlight for scenario
    let scenarioIdx = scenarioTranscript.findIndex(
      (w) => seconds >= w.start && seconds < w.end
    );
    if (scenarioIdx === -1 && seconds >= scenarioTranscript[scenarioTranscript.length - 1].end) {
      scenarioIdx = scenarioTranscript.length - 1;
    }
    setHighlightedScenarioIdx(scenarioIdx);
    
    // Per-word highlight for instructions
    let instructionIdx = instructionsTranscript.findIndex(
      (w) => seconds >= w.start && seconds < w.end
    );
    if (instructionIdx === -1 && seconds >= instructionsTranscript[instructionsTranscript.length - 1].end) {
      instructionIdx = instructionsTranscript.length - 1;
    }
    setHighlightedInstructionIdx(instructionIdx);
    
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
               source={require("@/assets/videos/bee-3.mp4")}
               useNativeControls
               resizeMode={ResizeMode.COVER}
               progressUpdateIntervalMillis={200}
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
                  style={i === highlightedScenarioIdx ? styles.wordHighlight : undefined}
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
          </View>

          {/* Additional spacing for bottom navigation */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
        
        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#000" />
          </TouchableOpacity>
          
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
    marginTop: 20,
    marginBottom: 16,
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
    borderLeftWidth: 0,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
    marginHorizontal: 20,
  },
  bottomSpacing: {
    height: 80, // To ensure content isn't hidden behind the bottom navigation
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
});

export default BeeStingsControllingBleeding;
