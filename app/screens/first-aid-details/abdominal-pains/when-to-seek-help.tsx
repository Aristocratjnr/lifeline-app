import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WhenToSeekHelp() {
  const router = useRouter();
  const video = useRef<Video>(null);
  
  // Per-word transcript with timings for abdominal pain management
  const transcript = useMemo(() => [
    { word: "Getting", start: 0.0, end: 0.5, highlight: true },
    { word: "plenty", start: 0.5, end: 0.8, highlight: true },
    { word: "of", start: 0.8, end: 1.0 },
    { word: "rest", start: 1.0, end: 1.5, highlight: true },
    
    { word: "Exercising", start: 2.0, end: 2.7, highlight: true },
    { word: "regularly", start: 2.7, end: 3.5, highlight: true },
    
    { word: "Eating", start: 4.0, end: 4.5, highlight: true },
    { word: "more", start: 4.5, end: 4.8 },
    { word: "meals", start: 4.8, end: 5.2, highlight: true },
    { word: "frequently", start: 5.2, end: 6.0, highlight: true },
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
              source={require("@/assets/videos/abdominal-2.mp4")}
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
            
            <View style={styles.warningSignsContainer}>
              <Text style={styles.warningTitle}>Warning Signs</Text>
              
              <View style={styles.warningItem}>
                <View style={[styles.warningIcon, { backgroundColor: '#FF9800' }]}>
                  <Ionicons name="alert" size={18} color="#fff" />
                </View>
                <Text style={styles.warningText}>Visible deformity in the joint or bone</Text>
              </View>
              
              <View style={styles.warningItem}>
                <View style={[styles.warningIcon, { backgroundColor: '#4CAF50' }]}>
                  <Ionicons name="thermometer" size={18} color="#fff" />
                </View>
                <Text style={styles.warningText}>Fever or signs of infection</Text>
              </View>
              
              <View style={styles.warningItem}>
                <View style={[styles.warningIcon, { backgroundColor: '#2196F3' }]}>
                  <Ionicons name="timer" size={18} color="#fff" />
                </View>
                <Text style={styles.warningText}>No improvement after 48-72 hours of RICE</Text>
              </View>
            </View>
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
    color: '#D32F2F',
    fontWeight: 'bold',
  },
  highlightedImportantWord: {
    backgroundColor: '#D32F2F',
    color: '#fff',
  },
  warningSignsContainer: {
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 15,
    marginTop: 30,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 12,
    fontFamily: 'JetBrainsMono-Bold',
  },
  warningItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  warningIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  warningText: {
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
});
