import { Ionicons } from '@expo/vector-icons';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FrostBiteHomeTreatment() {
  const router = useRouter();
  const video = useRef<Video>(null);
  
  // Per-word transcript with timings for frostbite treatment
  const transcript = useMemo(() => [
    { word: "Frostnip", start: 0.5, end: 1.0, highlight: true },
    { word: "can", start: 1.0, end: 1.2 },
    { word: "be", start: 1.2, end: 1.4 },
    { word: "treated", start: 1.4, end: 1.8, highlight: true },
    { word: "at", start: 1.8, end: 2.0 },
    { word: "home", start: 2.0, end: 2.5, highlight: true },
    { word: "with", start: 2.5, end: 2.7 },
    { word: "basic", start: 2.7, end: 3.0, highlight: true },
    { word: "first", start: 3.0, end: 3.3, highlight: true },
    { word: "aid", start: 3.3, end: 3.6, highlight: true },
    { word: "measures.", start: 3.6, end: 4.0 },
    
    { word: "For", start: 4.5, end: 4.7 },
    { word: "other", start: 4.7, end: 5.0 },
    { word: "frostbites", start: 5.0, end: 5.5, highlight: true },
    { word: "treatment", start: 5.5, end: 6.0, highlight: true },
    { word: "options", start: 6.0, end: 6.5, highlight: true },
    { word: "may", start: 6.5, end: 6.8 },
    { word: "include:", start: 6.8, end: 7.5 },
    
    { word: "Rewarming", start: 8.0, end: 8.5, highlight: true },
    { word: "of", start: 8.5, end: 8.7 },
    { word: "the", start: 8.7, end: 8.9 },
    { word: "skin.", start: 8.9, end: 9.5 },
    
    { word: "Oral", start: 10.0, end: 10.5, highlight: true },
    { word: "pain", start: 10.5, end: 11.0, highlight: true },
    { word: "medication.", start: 11.0, end: 12.0, highlight: true },
    
    { word: "Protecting", start: 12.5, end: 13.0, highlight: true },
    { word: "the", start: 13.0, end: 13.2 },
    { word: "injury", start: 13.2, end: 13.7, highlight: true },
    { word: "with", start: 13.7, end: 14.0 },
    { word: "sterile", start: 14.0, end: 14.5, highlight: true },
    { word: "sheaths", start: 14.5, end: 15.0, highlight: true },
    { word: "towels", start: 15.0, end: 15.5, highlight: true },
    { word: "or", start: 15.5, end: 15.7 },
    { word: "dressing.", start: 15.7, end: 16.5, highlight: true },
    
    { word: "Removal", start: 17.0, end: 17.5, highlight: true },
    { word: "of", start: 17.5, end: 17.7 },
    { word: "damaged", start: 17.7, end: 18.2, highlight: true },
    { word: "tissues.", start: 18.2, end: 19.0, highlight: true },
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
              source={require("@/assets/videos/frost-1.mp4")}
              useNativeControls
              resizeMode={ResizeMode.COVER}
              progressUpdateIntervalMillis={250}
              shouldPlay={false}
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            />
          </View>

          <View style={styles.scenarioContainer}>
            <View style={styles.scenarioHeader}>
              <Text style={styles.scenarioTitle}>Home Treatment</Text>
            </View>
            <Text style={styles.scenarioText}>
              {transcript.map((w, i) => (
                <Text
                  key={i}
                  style={[
                    i === highlightedWordIdx && styles.wordHighlight,
                    w.highlight && styles.importantWord
                  ]}
                >
                  {w.word + ' '}
                </Text>
              ))}
            </Text>
          </View>

          <View style={styles.tipBox}>
            <Ionicons name="warning" size={22} color="#FF9800" style={styles.tipIcon} />
            <Text style={styles.tipText}>
              Never use direct heat like a heating pad, heat lamp, or the heat of a stove, fireplace, or radiator for warming.
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
          
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => router.push('/screens/first-aid-details/frost-bite/home-treatment')}
          >
            <Ionicons name="arrow-forward" size={28} color="#000" />
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
  importantWord: {
    color: '#d32f2f',
    fontWeight: 'bold',
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
