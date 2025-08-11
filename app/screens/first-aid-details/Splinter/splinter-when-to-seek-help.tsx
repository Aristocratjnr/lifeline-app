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

const SplinterWhenToSeekHelp: React.FC = () => {
  const router = useRouter();
  const video = useRef<Video>(null);

  // Per-word transcript with timings (in seconds)
  const transcript = useMemo(() => [
    // Instruction 1
    { word: "If", start: 0.5, end: 0.8 },
    { word: "it's", start: 0.8, end: 1.1 },
    { word: "buried,", start: 1.1, end: 1.6 },
    { word: "use", start: 1.6, end: 1.9 },
    { word: "a", start: 1.9, end: 2.0 },
    { word: "clean", start: 2.0, end: 2.4 },
    { word: "needle", start: 2.4, end: 3.0 },
    { word: "to", start: 3.0, end: 3.2 },
    { word: "expose", start: 3.2, end: 3.7 },
    { word: "it", start: 3.7, end: 3.9 },
    { word: "and", start: 3.9, end: 4.1 },
    { word: "grab", start: 4.1, end: 4.5 },
    { word: "it", start: 4.5, end: 4.7 },
    { word: "with", start: 4.7, end: 5.0 },
    { word: "the", start: 5.0, end: 5.1 },
    { word: "tweezer", start: 5.1, end: 5.7 },
    { word: "tips.", start: 5.7, end: 6.5 },
    
    // Instruction 2
    { word: "Good", start: 6.5, end: 6.9 },
    { word: "lighting", start: 6.9, end: 7.5 },
    { word: "and", start: 7.5, end: 7.8 },
    { word: "magnifying", start: 7.8, end: 8.5 },
    { word: "glass", start: 8.5, end: 9.0 },
    { word: "will", start: 9.0, end: 9.3 },
    { word: "help.", start: 9.3, end: 10.5 },
    
    // Instruction 3
    { word: "Pull", start: 10.5, end: 10.9 },
    { word: "the", start: 10.9, end: 11.1 },
    { word: "splinter", start: 11.1, end: 11.8 },
    { word: "out", start: 11.8, end: 12.1 },
    { word: "at", start: 12.1, end: 12.3 },
    { word: "the", start: 12.3, end: 12.5 },
    { word: "same", start: 12.5, end: 12.9 },
    { word: "angle", start: 12.9, end: 13.4 },
    { word: "it", start: 13.4, end: 13.6 },
    { word: "entered", start: 13.6, end: 14.2 },
    { word: "the", start: 14.2, end: 14.4 },
    { word: "skin.", start: 14.4, end: 16.0 },
  ], []);

  const [highlightedWordIdx, setHighlightedWordIdx] = useState<number>(-1);

  const handleNext = () => {
    router.push('/screens/first-aid-details/Splinter/splinter-todo');
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
            <Text style={styles.creditsText}>Credits: First Aid Kit</Text>
          </View>
          {/* Top Video Illustration */}
          <View style={styles.topVideoContainer}>
            <Video
               ref={video}
               style={styles.topVideo}
               source={require("@/assets/videos/splinter-4.mp4")}
               useNativeControls
               resizeMode={ResizeMode.COVER}
               progressUpdateIntervalMillis={250}
               shouldPlay={false}
               rate={0.8} // Play video at 0.8x speed (slower)
               onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
             />
          </View>

          {/* Scenario Section */}
          <View style={styles.scenarioContainer}>
            <View style={styles.scenarioHeader}>
              <Text style={styles.scenarioTitle}>Scenario</Text>
            </View>
            <Text style={styles.scenarioText}>
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
});

export default SplinterWhenToSeekHelp;