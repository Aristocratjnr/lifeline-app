import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FeverTreatment() {
  const router = useRouter();
  const video = useRef<Video>(null);
  
  // Per-word transcript with timings
  const transcript = useMemo(() => [
    { word: "If", start: 0, end: 0.3 },
    { word: "you", start: 0.3, end: 0.5 },
    { word: "are", start: 0.5, end: 0.7 },
    { word: "worried", start: 0.7, end: 1.0, highlight: true },
    { word: "and", start: 1.0, end: 1.2 },
    { word: "don't", start: 1.2, end: 1.4 },
    { word: "know", start: 1.4, end: 1.6 },
    { word: "what", start: 1.6, end: 1.8 },
    { word: "to", start: 1.8, end: 2.0 },
    { word: "do,", start: 2.0, end: 2.3 },
    { word: "you", start: 2.3, end: 2.5 },
    { word: "can", start: 2.5, end: 2.7 },
    { word: "seek", start: 2.7, end: 3.0, highlight: true },
    { word: "advice", start: 3.0, end: 3.4, highlight: true },
    { word: "from", start: 3.4, end: 3.7 },
    { word: "your", start: 3.7, end: 4.0 },
    { word: "GP", start: 4.0, end: 4.5, highlight: true, isRed: true },
    { word: "(General", start: 4.5, end: 5.0, highlight: true, isRed: true },
    { word: "Practitioner),", start: 5.0, end: 5.8, highlight: true, isRed: true },
    { word: "walk-in", start: 5.8, end: 6.3, highlight: true, isRed: true },
    { word: "centre", start: 6.3, end: 6.7, highlight: true, isRed: true },
    { word: "(hospital/pharmacy/clinic)", start: 6.7, end: 8.0, highlight: true, isRed: true },
    { word: "or", start: 8.0, end: 8.3 },
    { word: "by", start: 8.3, end: 8.5 },
    { word: "calling", start: 8.5, end: 8.9, highlight: true },
    { word: "your", start: 8.9, end: 9.1 },
    { word: "local", start: 9.1, end: 9.5 },
    { word: "emergency", start: 9.5, end: 10.0, highlight: true, isRed: true },
    { word: "number.", start: 10.0, end: 10.5, highlight: true, isRed: true },
  ], []);

  const [highlightedWordIdx, setHighlightedWordIdx] = useState<number>(-1);
  
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

  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Regular": require("@/assets/fonts/JetBrainsMono-Regular.ttf"),
    "JetBrainsMono-Bold": require("@/assets/fonts/JetBrainsMono-Bold.ttf"),
  });

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
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
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
               source={require("@/assets/videos/fever-3.mp4")}
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
              <Text style={styles.scenarioTitle}>Instructions</Text>
            </View>
            <Text style={styles.scenarioText}>
              {transcript.map((w, i) => {
                const isHighlighted = i === highlightedWordIdx;
                
                return (
                  <Text
                    key={i}
                    style={[
                      isHighlighted ? styles.wordHighlight : undefined,
                      w.isRed && styles.redText
                    ]}
                  >
                    {w.word + ' '}
                  </Text>
                );
              })}
            </Text>
          </View>
        </ScrollView>
        
        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={28} color="#000" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.sosButton}
            onPress={() => router.push('/sos')}
          >
            <Text style={styles.sosText}>SOS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.89)',
    zIndex: 2,
  },
  mainContent: {
    paddingHorizontal: 16,
    paddingBottom: 0,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 30, // Reduced padding to move the back button up
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
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
  topVideoContainer: {
    width: '100%',
    aspectRatio: 16/9,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  topVideo: {
    width: '100%',
    height: '100%',
  },
  scenarioContainer: {
    marginTop: 40,
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
  wordHighlight: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    borderRadius: 3,
    paddingHorizontal: 2,
  },
  tipBox: {
    backgroundColor: '#fff8e1',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    color: '#5d4037',
    fontFamily: 'JetBrainsMono-Regular',
  },
 
  navButton: {
    padding: 8,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  redText: {
    color: 'red',
  },
});
