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

const BeeStingsCleaningWound: React.FC = () => {
  const router = useRouter();
  const video = useRef<Video>(null);

  // Per-word transcript with timings (in seconds)
  const transcript = useMemo(() => [
    { word: "If", start: 0, end: 0.3 },
    { word: "the", start: 0.3, end: 0.5 },
    { word: "casualty", start: 0.5, end: 1.0 },
    { word: "shows", start: 1.0, end: 1.3 },
    { word: "serious", start: 1.3, end: 1.7 },
    { word: "signs", start: 1.7, end: 2.0 },
    { word: "of", start: 2.0, end: 2.2 },
    { word: "allergic", start: 2.2, end: 2.7 },
    { word: "reactions,", start: 2.7, end: 3.2 },
    { word: "you", start: 3.2, end: 3.4 },
    { word: "need", start: 3.4, end: 3.7 },
    { word: "to", start: 3.7, end: 3.8 },
    { word: "call", start: 3.8, end: 4.1 },
    { word: "your", start: 4.1, end: 4.3 },
    { word: "local", start: 4.3, end: 4.7 },
    { word: "emergency", start: 4.7, end: 5.3 },
    { word: "or", start: 5.3, end: 5.5 },
    { word: "your", start: 5.5, end: 5.7 },
    { word: "doctor", start: 5.7, end: 6.5 },
  ], []);

  const [highlightedWordIdx, setHighlightedWordIdx] = useState<number>(-1);

  const handleNext = () => {
    router.push('/screens/first-aid-details/Stings/bee-preventing-infection');
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

  // Highlight logic for per-word - stops at 'doctor'
  const handlePlaybackStatusUpdate = (status: any) => {
    if (!status.isLoaded) return;
    const seconds = status.positionMillis / 1000;
    
    // Find the index of the word 'doctor' in the transcript
    const doctorIndex = transcript.findIndex(w => w.word === 'doctor');
    
    // If we've reached or passed the 'doctor' word, keep highlighting it
    if (seconds >= transcript[doctorIndex].start) {
      setHighlightedWordIdx(doctorIndex);
      return;
    }
    
    // Otherwise, find the currently speaking word
    let idx = transcript.findIndex(
      (w, i) => seconds >= w.start && seconds < w.end
    );
    
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
               source={require("@/assets/videos/doctor.mp4")}
               useNativeControls
               resizeMode={ResizeMode.COVER}
               progressUpdateIntervalMillis={200}
               shouldPlay={false}
               onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
             />
          </View>

          {/* Scenario Section */}
          <View style={styles.scenarioContainer}>
            <View style={styles.scenarioHeader}>
              <Text style={styles.scenarioTitle}>Instructions</Text>
            </View>
            <Text style={styles.scenarioText}>
              {transcript.map((w, i) => {
                // Check if current word is 'local', 'emergency', or 'doctor' and is being spoken
                const isEmergencyWord = (w.word === 'local' || w.word === 'emergency' || w.word === 'doctor');
                const isHighlighted = i === highlightedWordIdx;
                
                return (
                  <Text
                    key={i}
                    style={[
                      isHighlighted && styles.wordHighlight,
                      isHighlighted && isEmergencyWord && { color: '#FF0000', fontWeight: 'bold' }
                    ]}
                  >
                    {w.word + ' '}
                  </Text>
                );
              })}
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

export default BeeStingsCleaningWound;
