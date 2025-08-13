import React, { useRef, useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

export default function SprainStrainInitial() {
  const router = useRouter();
  const video = useRef<Video>(null);
  
  // Per-word transcript with timings
  const transcript = useMemo(() => [
    { word: "Sprains", start: 0, end: 0.6 },
    { word: "and", start: 0.6, end: 0.8 },
    { word: "strains", start: 0.8, end: 1.2 },
    { word: "are", start: 1.2, end: 1.4 },
    { word: "common", start: 1.4, end: 1.8 },
    { word: "and", start: 1.8, end: 2.0 },
    { word: "luckily,", start: 2.0, end: 2.5 },
    { word: "they", start: 2.5, end: 2.7 },
    { word: "are", start: 2.7, end: 2.9 },
    { word: "treated", start: 2.9, end: 3.3 },
    { word: "the", start: 3.3, end: 3.5 },
    { word: "same", start: 3.5, end: 3.8 },
    { word: "way.", start: 3.8, end: 4.2 },
    { word: "What", start: 4.3, end: 4.5 },
    { word: "to", start: 4.5, end: 4.6 },
    { word: "do", start: 4.6, end: 4.8 },
    { word: "now?", start: 4.8, end: 5.2 },
    { word: "Remember", start: 5.3, end: 5.8 },
    { word: "R-I-C-E", start: 5.8, end: 6.5, highlight: true },
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
              source={require("@/assets/videos/sprain-1.mp4")}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              progressUpdateIntervalMillis={250}
              shouldPlay={false}
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            />
          </View>

          <View style={styles.transcriptContainer}>
            <Text style={styles.transcript}>
              {transcript.map((w, i) => (
                <Text
                  key={i}
                  style={i === highlightedWordIdx ? styles.highlightedWord : undefined}
                >
                  {w.word + ' '}
                </Text>
              ))}
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
            onPress={() => router.push('/screens/first-aid-details/SprainStrain/rice-method')}
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
  },
  highlightedWord: {
    backgroundColor: '#ffe082',
    color: '#d84315',
    fontWeight: 'bold',
    borderRadius: 4,
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
