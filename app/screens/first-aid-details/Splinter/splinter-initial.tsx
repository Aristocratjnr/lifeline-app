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

const SplinterInitial: React.FC = () => {
  const router = useRouter();
  const video = useRef<Video>(null);
  const [highlight, setHighlight] = useState<'scenario' | 'instructions'>('scenario');
  const [highlightedWordIdx, setHighlightedWordIdx] = useState<number>(-1);

  // Scenario transcript with timings (in seconds)
  const scenarioTranscript = useMemo(() => [
    { word: "Wash", start: 0.0, end: 0.4 },
    { word: "your", start: 0.4, end: 0.7 },
    { word: "hands", start: 0.7, end: 1.2 },
    { word: "so", start: 1.2, end: 1.4 },
    { word: "that", start: 1.4, end: 1.6 },
    { word: "this", start: 1.6, end: 1.8 },
    { word: "boo", start: 1.8, end: 2.1 },
    { word: "boo", start: 2.1, end: 2.4 },
    { word: "(injury)", start: 2.4, end: 3.0 },
    { word: "doesn't", start: 3.0, end: 3.4 },
    { word: "turn", start: 3.4, end: 3.7 },
    { word: "into", start: 3.7, end: 4.0 },
    { word: "infection", start: 4.0, end: 4.7 },
  ], []);
  


  const handleNext = () => {
    router.push('/screens/first-aid-details/Splinter/splinter-removal');
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
    setHighlightedWordIdx(scenarioIdx);
    
    // Only scenario section remains
    if (highlight !== 'scenario') setHighlight('scenario');
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
          <Text style={styles.headerTitle}>First Aid: Splinter</Text>
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
              source={require("@/assets/videos/splinter-1.mp4")}
              useNativeControls
              resizeMode={ResizeMode.COVER}
              progressUpdateIntervalMillis={200}
              shouldPlay={false}
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            />
          </View>

          {/* Spacer to push content down */}
          <View style={styles.topSpacer} />
          
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


        </ScrollView>
        
        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.backButtonBottom} onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={24} color="#000" />
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
  topSpacer: {
    height: 40, // Adjust this value to control how far down the scenario appears
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 1,
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
  backButtonBottom: {
    position: 'absolute',
    left: 30,
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  creditsContainer: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 20,
    marginBottom: 5,
  },
  creditsText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Cochin',
    fontStyle: 'italic',
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
  divider: {
    height: 2,
    backgroundColor: '#e0e0e0',
    width: '100%',
    marginVertical: 20,
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
  wordHighlight: {
    backgroundColor: 'rgba(217, 83, 79, 0.2)',
    borderRadius: 3,
    paddingHorizontal: 2,
  },
  bottomNav: {
    zIndex: 3,
    position: 'absolute',
    bottom: 30,
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
});

export default SplinterInitial;
