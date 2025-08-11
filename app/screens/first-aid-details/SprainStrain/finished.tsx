import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PainManagement() {
  const router = useRouter();
  const video = useRef<Video>(null);
  
  // Per-word transcript with timings - synchronized with video
  const transcript = useMemo(() => [
    // First sentence: "Ice and Elevate for 20 minutes at a time at least 4 times a day until the pain and swelling go away."
    { word: "Ice", start: 0.0, end: 0.4, highlight: true },
    { word: "and", start: 0.4, end: 0.6 },
    { word: "Elevate", start: 0.6, end: 1.0, highlight: true },
    { word: "for", start: 1.0, end: 1.3 },
    { word: "20", start: 1.3, end: 1.6, highlight: true },
    { word: "minutes", start: 1.6, end: 2.0, highlight: true },
    { word: "at", start: 2.0, end: 2.2 },
    { word: "a", start: 2.2, end: 2.3 },
    { word: "time,", start: 2.3, end: 2.6 },
    { word: "at", start: 2.6, end: 2.8 },
    { word: "least", start: 2.8, end: 3.1 },
    { word: "4", start: 3.1, end: 3.3, highlight: true },
    { word: "times", start: 3.3, end: 3.7, highlight: true },
    { word: "a", start: 3.7, end: 3.9 },
    { word: "day", start: 3.9, end: 4.2, highlight: true },
    { word: "until", start: 4.2, end: 4.5 },
    { word: "the", start: 4.5, end: 4.7 },
    { word: "pain", start: 4.7, end: 5.0, highlight: true },
    { word: "and", start: 5.0, end: 5.2 },
    { word: "swelling", start: 5.2, end: 5.6, highlight: true },
    { word: "go", start: 5.6, end: 5.8 },
    { word: "away.", start: 5.8, end: 6.2, highlight: true },
    
    // Second sentence: "Ask your pediatrician/doctor about pain relievers such as ibuprofen."
    { word: "Ask", start: 6.5, end: 6.8, highlight: true },
    { word: "your", start: 6.8, end: 7.0 },
    { word: "pediatrician/", start: 7.0, end: 7.5, highlight: true },
    { word: "doctor", start: 7.5, end: 7.9, highlight: true },
    { word: "about", start: 7.9, end: 8.2 },
    { word: "pain", start: 8.2, end: 8.5, highlight: true },
    { word: "relievers", start: 8.5, end: 9.0, highlight: true },
    { word: "such", start: 9.0, end: 9.3 },
    { word: "as", start: 9.3, end: 9.5 },
    { word: "ibuprofen.", start: 9.5, end: 10.5, highlight: true },
    
    // Third sentence: "Call your doctor if your child gets a fever which is a sign of infection or if the pain is intense or doesn't improve in a day or two, he/she could have a sprain or even a fracture."
    { word: "Call", start: 10.8, end: 11.1, highlight: true },
    { word: "your", start: 11.1, end: 11.3 },
    { word: "doctor", start: 11.3, end: 11.7, highlight: true },
    { word: "if", start: 11.7, end: 11.9 },
    { word: "your", start: 11.9, end: 12.1 },
    { word: "child", start: 12.1, end: 12.5, highlight: true },
    { word: "gets", start: 12.5, end: 12.8 },
    { word: "a", start: 12.8, end: 13.0 },
    { word: "fever", start: 13.0, end: 13.4, highlight: true },
    { word: "which", start: 13.4, end: 13.7 },
    { word: "is", start: 13.7, end: 13.9 },
    { word: "a", start: 13.9, end: 14.1 },
    { word: "sign", start: 14.1, end: 14.5, highlight: true },
    { word: "of", start: 14.5, end: 14.7 },
    { word: "infection", start: 14.7, end: 15.3, highlight: true },
    { word: "or", start: 15.3, end: 15.5 },
    { word: "if", start: 15.5, end: 15.7 },
    { word: "the", start: 15.7, end: 15.9 },
    { word: "pain", start: 15.9, end: 16.3, highlight: true },
    { word: "is", start: 16.3, end: 16.5 },
    { word: "intense", start: 16.5, end: 17.0, highlight: true },
    { word: "or", start: 17.0, end: 17.2 },
    { word: "doesn't", start: 17.2, end: 17.6, highlight: true },
    { word: "improve", start: 17.6, end: 18.1, highlight: true },
    { word: "in", start: 18.1, end: 18.3 },
    { word: "a", start: 18.3, end: 18.5 },
    { word: "day", start: 18.5, end: 18.8, highlight: true },
    { word: "or", start: 18.8, end: 19.0 },
    { word: "two,", start: 19.0, end: 19.4, highlight: true },
    { word: "he/", start: 19.4, end: 19.7, highlight: true },
    { word: "she", start: 19.7, end: 20.0, highlight: true },
    { word: "could", start: 20.0, end: 20.3 },
    { word: "have", start: 20.3, end: 20.6 },
    { word: "a", start: 20.6, end: 20.8 },
    { word: "sprain", start: 20.8, end: 21.3, highlight: true },
    { word: "or", start: 21.3, end: 21.5 },
    { word: "even", start: 21.5, end: 21.8 },
    { word: "a", start: 21.8, end: 22.0 },
    { word: "fracture.", start: 22.0, end: 22.8, highlight: true },
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
              source={require("@/assets/videos/sprain-6.mp4")}
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
          <View style={styles.navButton}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={28} color="#000" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.sosButtonContainer}>
            <TouchableOpacity 
              style={styles.sosButton}
              onPress={() => router.push('/sos')}
            >
              <Text style={styles.sosText}>SOS</Text>
            </TouchableOpacity>
          </View>
          
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
  warningContainer: {
    marginTop: 40,
    padding: 15,
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  warningTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F',
    fontFamily: 'JetBrainsMono-Bold',
  },
  warningItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    marginRight: 8,
    marginTop: 2,
  },
  bullet: {
    fontSize: 16,
    color: '#D32F2F',
    lineHeight: 22,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#424242',
    fontFamily: 'JetBrainsMono-Regular',
  },
  instructionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#424242',
    fontFamily: 'JetBrainsMono-Regular',
    marginTop: 5,
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
  sosButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
