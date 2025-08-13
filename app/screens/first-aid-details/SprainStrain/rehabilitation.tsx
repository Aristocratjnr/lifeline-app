import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Rehabilitation() {
  const router = useRouter();
  const video = useRef<Video>(null);
  
  // Per-word transcript with timings
  const transcript = useMemo(() => [
    { word: "Elevate", start: 0, end: 0.5, highlight: true },
    { word: "the", start: 0.5, end: 0.7 },
    { word: "injured", start: 0.7, end: 1.0, highlight: true },
    { word: "part", start: 1.0, end: 1.3, highlight: true },
    { word: "up", start: 1.3, end: 1.5 },
    { word: "on", start: 1.5, end: 1.7 },
    { word: "pillows", start: 1.7, end: 2.1, highlight: true },
    { word: "so", start: 2.1, end: 2.3 },
    { word: "it", start: 2.3, end: 2.5 },
    { word: "is", start: 2.5, end: 2.7 },
    { word: "above", start: 2.7, end: 3.0, highlight: true },
    { word: "heart", start: 3.0, end: 3.3, highlight: true },
    { word: "level.", start: 3.3, end: 4.0, highlight: true },
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
          <View style={styles.creditsContainer}>
            <Text style={styles.creditsText}>Credits: First Aid Kit</Text>
          </View>
          
          <View style={styles.videoContainer}>
            <Video
              ref={video}
              style={styles.video}
              source={require("@/assets/videos/sprain-5.mp4")}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              progressUpdateIntervalMillis={250}
              shouldPlay={false}
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            />
          </View>

          <View style={styles.transcriptContainer}>
            <Text style={styles.transcript}>
              {transcript.map((w, i) => {
                const isHighlighted = i === highlightedWordIdx;
                const isImportant = w.highlight;
                
                return (
                  <Text
                    key={i}
                    style={[
                      styles.word,
                      isHighlighted && styles.highlightedWord,
                      isImportant && styles.importantWord,
                      isHighlighted && isImportant && styles.highlightedImportantWord
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
          
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => router.push('/screens/first-aid-details/SprainStrain/finished')}
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
    paddingTop: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    elevation: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  creditsContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  creditsText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16/9,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  transcriptContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 100,
  },
  transcript: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: 'JetBrainsMono-Regular',
    marginBottom: 20,
  },
  word: {
    fontFamily: 'JetBrainsMono-Regular',
  },
  highlightedWord: {
    backgroundColor: '#ffe082',
    color: '#d84315',
    fontWeight: 'bold',
    borderRadius: 4,
  },
  importantWord: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
  highlightedImportantWord: {
    backgroundColor: '#1976D2',
    color: '#fff',
  },
  rehabContainer: {
    marginTop: 20,
  },
  rehabTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
    fontFamily: 'JetBrainsMono-Bold',
  },
  phaseContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#BDBDBD',
  },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  phaseNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  phaseNumberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  phaseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
    fontFamily: 'JetBrainsMono-Bold',
  },
  phaseText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#424242',
    fontFamily: 'JetBrainsMono-Regular',
    paddingLeft: 38,
  },
  tipBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    padding: 15,
    marginTop: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  tipIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#5D4037',
    fontFamily: 'JetBrainsMono-Regular',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    zIndex: 3,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sosButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  sosText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 50,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  completeText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    fontFamily: 'JetBrainsMono-Bold',
  },
});
