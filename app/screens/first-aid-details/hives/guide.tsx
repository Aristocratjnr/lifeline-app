import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RiceMethod() {
  const router = useRouter();
  const video = useRef<Video>(null);
  
  // Per-word transcript with timings
  const transcript = useMemo(() => [
    { word: "In", start: 0, end: 0.3 },
    { word: "some", start: 0.3, end: 0.6 },
    { word: "cases,", start: 0.6, end: 1.0 },
    { word: "using", start: 1.2, end: 1.5 },
    { word: "home", start: 1.5, end: 1.8, highlight: true },
    { word: "remedies", start: 1.8, end: 2.2, highlight: true },
    { word: "such", start: 2.2, end: 2.5 },
    { word: "as", start: 2.5, end: 2.7 },
    { word: "applying", start: 2.8, end: 3.2 },
    { word: "cold,", start: 3.2, end: 3.6 },
    { word: "damp", start: 3.8, end: 4.2, highlight: true },
    { word: "cloth", start: 4.2, end: 4.5, highlight: true },
    { word: "to", start: 4.5, end: 4.7 },
    { word: "the", start: 4.7, end: 4.9 },
    { word: "affected", start: 5.0, end: 5.4 },
    { word: "area,", start: 5.4, end: 5.8 },
    { word: "wearing", start: 6.0, end: 6.4 },
    { word: "loose-fitting", start: 6.4, end: 7.0, highlight: true },
    { word: "lightweight", start: 7.0, end: 7.6, highlight: true },
    { word: "clothes,", start: 7.6, end: 8.2 },
    { word: "and", start: 8.4, end: 8.6 },
    { word: "working", start: 8.6, end: 9.0 },
    { word: "and", start: 9.2, end: 9.4 },
    { word: "sleeping", start: 9.4, end: 9.9 },
    { word: "in", start: 9.9, end: 10.1 },
    { word: "a", start: 10.1, end: 10.2 },
    { word: "cool", start: 10.2, end: 10.6, highlight: true },
    { word: "room", start: 10.6, end: 11.0 },
    { word: "can", start: 11.0, end: 11.3 },
    { word: "help.", start: 11.3, end: 12.0 },
    { word: "let", start: 3.8, end: 4.0 },
    { word: "the", start: 4.0, end: 4.2 },
    { word: "healing", start: 4.2, end: 4.6, highlight: true },
    { word: "begin.", start: 4.6, end: 5.0 },
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

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/dashboard');
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
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleGoBack}
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
              source={require("@/assets/videos/hives-2.mp4")}
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
            onPress={handleGoBack}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.sosButton}
            onPress={() => router.push('/sos')}
          >
            <Text style={styles.sosText}>SOS</Text>
          </TouchableOpacity>
          
          <View style={styles.navButton} />
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
  tipContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
    fontFamily: 'JetBrainsMono-Bold',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tipText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    lineHeight: 20,
    color: '#424242',
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
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: 'transparent',
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
