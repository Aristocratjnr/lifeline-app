import { Ionicons } from '@expo/vector-icons';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FrostBiteGuide() {
  const router = useRouter();
  const video = useRef<Video>(null);
  
  // Per-word transcript with timings for frostbite medical treatments
  const transcript = useMemo(() => [
    { word: "Oral", start: 0.5, end: 1.0, highlight: true },
    { word: "antibiotics", start: 1.0, end: 1.8, highlight: true },
    { word: "for", start: 1.8, end: 2.0 },
    { word: "infected", start: 2.0, end: 2.5, highlight: true },
    { word: "skin", start: 2.5, end: 2.8, highlight: true },
    { word: "or", start: 2.8, end: 3.0 },
    { word: "blisters", start: 3.0, end: 3.7, highlight: true },
    
    { word: "Intravenous", start: 4.5, end: 5.2, highlight: true },
    { word: "injection", start: 5.2, end: 5.8, highlight: true },
    { word: "of", start: 5.8, end: 6.0 },
    { word: "a", start: 6.0, end: 6.2 },
    { word: "type", start: 6.2, end: 6.5 },
    { word: "of", start: 6.5, end: 6.7 },
    { word: "medication", start: 6.7, end: 7.5, highlight: true },
    { word: "called", start: 7.5, end: 7.9 },
    { word: "a", start: 7.9, end: 8.1 },
    { word: "Clot", start: 8.1, end: 8.5, highlight: true },
    { word: "Buster", start: 8.5, end: 9.0, highlight: true },
    { word: "such", start: 9.0, end: 9.3 },
    { word: "as", start: 9.3, end: 9.5 },
    { word: "tissue", start: 9.5, end: 10.0, highlight: true },
    { word: "plasminogen", start: 10.0, end: 10.8, highlight: true },
    { word: "activator", start: 10.8, end: 11.5, highlight: true },
    { word: "or", start: 11.5, end: 11.8 },
    { word: "TPA", start: 11.8, end: 12.5, highlight: true },
    { word: "that", start: 12.5, end: 12.8 },
    { word: "may", start: 12.8, end: 13.1 },
    { word: "help", start: 13.1, end: 13.5 },
    { word: "restore", start: 13.5, end: 14.0, highlight: true },
    { word: "blood", start: 14.0, end: 14.4, highlight: true },
    { word: "flow", start: 14.4, end: 15.0, highlight: true },
    
    { word: "Studies", start: 16.0, end: 16.5, highlight: true },
    { word: "have", start: 16.5, end: 16.8 },
    { word: "shown", start: 16.8, end: 17.2 },
    { word: "that", start: 17.2, end: 17.5 },
    { word: "TPA", start: 17.5, end: 18.0, highlight: true },
    { word: "may", start: 18.0, end: 18.3 },
    { word: "reduce", start: 18.3, end: 18.8, highlight: true },
    { word: "the", start: 18.8, end: 19.0 },
    { word: "risk", start: 19.0, end: 19.4, highlight: true },
    { word: "of", start: 19.4, end: 19.6 },
    { word: "amputation", start: 19.6, end: 20.5, highlight: true },
    
    { word: "Surgery", start: 21.0, end: 21.7, highlight: true },
    { word: "in", start: 21.7, end: 22.0 },
    { word: "extreme", start: 22.0, end: 22.5, highlight: true },
    { word: "cases", start: 22.5, end: 23.0, highlight: true },
  ], []);

  const [highlightedWordIdx, setHighlightedWordIdx] = useState<number>(-1);
  
  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;
    
    const currentTime = status.positionMillis / 1000;
    const currentWordIdx = transcript.findIndex(
      (w, i) => currentTime >= w.start && currentTime < w.end
    );
    
    if (currentWordIdx !== -1 && currentWordIdx !== highlightedWordIdx) {
      setHighlightedWordIdx(currentWordIdx);
    }
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
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={28} color="#000" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.creditsContainer}>
            <Text style={styles.creditsText}>Credits: British Red Cross</Text>
          </View>
          
          <View style={styles.topVideoContainer}>
            <Video
              ref={video}
              style={styles.topVideo}
              source={require("@/assets/videos/frost-3.mp4")}
              useNativeControls
              resizeMode={ResizeMode.COVER}
              progressUpdateIntervalMillis={250}
              shouldPlay={false}
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            />
          </View>

          <View style={styles.scenarioContainer}>
            <View style={styles.scenarioHeader}>
              <Text style={styles.scenarioTitle}>Recognizing Frostbite</Text>
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

          <View style={styles.tipBox}>
            <Ionicons name="warning" size={22} color="#FF9800" style={styles.tipIcon} />
            <Text style={styles.tipText}>
              Seek immediate medical attention if you suspect deep frostbite or if the skin turns white or blue-gray.
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
          
          <View style={{ width: 44 }} />
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
    paddingTop: 30,
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
  navButton: {
    padding: 8,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
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
});
