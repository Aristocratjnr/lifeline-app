import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HivesInitialAssessment() {
  const router = useRouter();
  const video = useRef<Video>(null);
  const [highlight, setHighlight] = useState<'scenario' | 'instructions'>('scenario');
  
  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/dashboard');
    }
  };

  // Transcript for scenario section
  const scenarioTranscript = useMemo(() => [
    { word: "Antihistamine", start: 0, end: 0.8, highlight: true },
    { word: "is", start: 0.8, end: 1.0 },
    { word: "usually", start: 1.0, end: 1.4 },
    { word: "prescribed", start: 1.4, end: 2.0, highlight: true },
    { word: "to", start: 2.0, end: 2.2 },
    { word: "provide", start: 2.2, end: 2.6 },
    { word: "relief", start: 2.6, end: 3.0, highlight: true },
    { word: "from", start: 3.0, end: 3.3 },
    { word: "symptoms.", start: 3.3, end: 4.0 },
    { word: "They", start: 4.2, end: 4.4 },
    { word: "are", start: 4.4, end: 4.6 },
    { word: "taken", start: 4.6, end: 5.0 },
    { word: "regularly", start: 5.0, end: 5.6, highlight: true },
    { word: "for", start: 5.6, end: 5.8 },
    { word: "several", start: 5.8, end: 6.2 },
    { word: "weeks", start: 6.2, end: 6.8, highlight: true },
    { word: "and", start: 6.8, end: 7.0 },
    { word: "may", start: 7.0, end: 7.3 },
    { word: "include", start: 7.3, end: 7.8 },
    { word: "cetirizine", start: 7.8, end: 8.6, highlight: true },
    { word: "or", start: 8.6, end: 8.8 },
    { word: "fexofenadine", start: 8.8, end: 9.8, highlight: true },
    { word: ".", start: 9.8, end: 10.0 },
    { word: "They", start: 10.2, end: 10.4 },
    { word: "help", start: 10.4, end: 10.8 },
    { word: "by", start: 10.8, end: 11.0 },
    { word: "blocking", start: 11.0, end: 11.5, highlight: true },
    { word: "the", start: 11.5, end: 11.7 },
    { word: "effects", start: 11.7, end: 12.2 },
    { word: "of", start: 12.2, end: 12.4 },
    { word: "histamines", start: 12.4, end: 13.2, highlight: true },
  ], []);
  const [highlightedWordIdx, setHighlightedWordIdx] = useState<number>(-1);

  // Transcript for instructions section
  const instructionsTranscript = useMemo(() => [
    { word: "Chronic", start: 13.5, end: 14.0, highlight: true },
    { word: "urticaria", start: 14.0, end: 14.8, highlight: true },
    { word: "can", start: 14.8, end: 15.0 },
    { word: "be", start: 15.0, end: 15.2 },
    { word: "treated", start: 15.2, end: 15.8 },
    { word: "with", start: 15.8, end: 16.0 },
    { word: "an", start: 16.0, end: 16.2 },
    { word: "antihistamine", start: 16.2, end: 17.0, highlight: true },
    { word: "or", start: 17.0, end: 17.3 },
    { word: "a", start: 17.3, end: 17.4 },
    { word: "combination", start: 17.4, end: 18.2, highlight: true },
    { word: "of", start: 18.2, end: 18.4 },
    { word: "medications", start: 18.4, end: 19.2, highlight: true },
  ], []);
  const [highlightedInstructionIdx, setHighlightedInstructionIdx] = useState<number>(-1);

  // Transcript for subtext
  const subtextTranscript = useMemo(() => [
    { word: "When", start: 19.5, end: 19.8 },
    { word: "antihistamine", start: 19.8, end: 20.6, highlight: true },
    { word: "doesn't", start: 20.6, end: 21.0 },
    { word: "provide", start: 21.0, end: 21.5 },
    { word: "relief,", start: 21.5, end: 22.0, highlight: true },
    { word: "an", start: 22.2, end: 22.4 },
    { word: "oral", start: 22.4, end: 22.8, highlight: true },
    { word: "corticosteroid", start: 22.8, end: 23.8, highlight: true },
    { word: "may", start: 23.8, end: 24.0 },
    { word: "be", start: 24.0, end: 24.2 },
    { word: "prescribed.", start: 24.2, end: 25.0, highlight: true },
    { word: "Omalizumab", start: 25.2, end: 26.0, highlight: true },
    { word: "or", start: 26.0, end: 26.3 },
    { word: "Xolair", start: 26.3, end: 27.0, highlight: true },
    { word: "can", start: 27.0, end: 27.3 },
    { word: "also", start: 27.3, end: 27.6 },
    { word: "treat", start: 27.6, end: 28.0 },
    { word: "chronic", start: 28.0, end: 28.6, highlight: true },
    { word: "urticaria", start: 28.6, end: 29.5, highlight: true },
  ], []);
  const [highlightedSubtextIdx, setHighlightedSubtextIdx] = useState<number>(-1);
  
  const handlePlaybackStatusUpdate = (status: any) => {
    if (!status.isLoaded) return;
    const seconds = status.positionMillis / 1000;
    
    // Update scenario transcript highlighting
    let scenarioIdx = scenarioTranscript.findIndex(
      (w) => seconds >= w.start && seconds < w.end
    );
    if (scenarioIdx === -1 && seconds >= scenarioTranscript[scenarioTranscript.length - 1].end) {
      scenarioIdx = scenarioTranscript.length - 1;
    }
    setHighlightedWordIdx(scenarioIdx);
    
    // Update instructions transcript highlighting
    let instructionIdx = instructionsTranscript.findIndex(
      (w) => seconds >= w.start && seconds < w.end
    );
    if (instructionIdx === -1 && seconds >= instructionsTranscript[instructionsTranscript.length - 1].end) {
      instructionIdx = instructionsTranscript.length - 1;
    }
    setHighlightedInstructionIdx(instructionIdx);
    
    // Update subtext highlighting
    let subtextIdx = subtextTranscript.findIndex(
      (w) => seconds >= w.start && seconds < w.end
    );
    if (subtextIdx === -1 && seconds >= subtextTranscript[subtextTranscript.length - 1].end) {
      subtextIdx = subtextTranscript.length - 1;
    }
    setHighlightedSubtextIdx(subtextIdx);
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
              source={require("@/assets/videos/hives-1.mp4")}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              progressUpdateIntervalMillis={250}
              shouldPlay={false}
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            />
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, highlight === 'scenario' && styles.activeTab]}
              onPress={() => setHighlight('scenario')}
            >
              <Text style={[styles.tabText, highlight === 'scenario' && styles.activeTabText]}>Scenario</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, highlight === 'instructions' && styles.activeTab]}
              onPress={() => setHighlight('instructions')}
            >
              <Text style={[styles.tabText, highlight === 'instructions' && styles.activeTabText]}>Instructions</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transcriptContainer}>
            {highlight === 'scenario' ? (
              <View>
                <Text style={styles.transcript}>
                  {scenarioTranscript.map((w, i) => (
                    <Text
                      key={i}
                      style={i === highlightedWordIdx ? styles.highlightedWord : {}}
                    >
                      {w.word + ' '}
                    </Text>
                  ))}
                </Text>
              </View>
            ) : (
              <View>
                <Text style={styles.instructionText}>
                  {instructionsTranscript.map((w, i) => (
                    <Text
                      key={i}
                      style={i === highlightedInstructionIdx ? styles.highlightedWord : {}}
                    >
                      {w.word + ' '}
                    </Text>
                  ))}
                </Text>
                <View style={styles.subtextContainer}>
                  <Text style={styles.subtext}>
                    {subtextTranscript.map((w, i) => (
                      <Text
                        key={i}
                        style={i === highlightedSubtextIdx ? styles.highlightedSubtext : {}}
                      >
                        {w.word + ' '}
                      </Text>
                    ))}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
        
        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={handleGoBack}
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
            onPress={() => router.push('/screens/first-aid-details/hives/guide')}
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
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#000',
    fontFamily: 'JetBrainsMono-Bold',
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
  instructionText: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: 'JetBrainsMono-Regular',
    marginBottom: 15,
  },
  subtextContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },
  subtext: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'JetBrainsMono-Regular',
    color: '#555',
    fontStyle: 'italic',
  },
  highlightedWord: {
    backgroundColor: '#ffe082',
    color: '#d84315',
    fontWeight: 'bold',
    borderRadius: 4,
  },
  highlightedSubtext: {
    backgroundColor: '#ffecb3',
    color: '#bf360c',
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
