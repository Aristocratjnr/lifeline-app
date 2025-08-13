import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PainManagement() {
  const router = useRouter();
  const video = useRef<Video>(null);
  
  // Per-word transcript with timings
  const transcript = useMemo(() => [
    { word: "Ice", start: 0, end: 0.5, highlight: true },
    { word: "the", start: 0.5, end: 0.7 },
    { word: "area", start: 0.7, end: 1.0 },
    { word: "for", start: 1.0, end: 1.2 },
    { word: "about", start: 1.2, end: 1.4 },
    { word: "20", start: 1.4, end: 1.6, highlight: true },
    { word: "minutes", start: 1.6, end: 2.0, highlight: true },
    { word: "at", start: 2.0, end: 2.2 },
    { word: "a", start: 2.2, end: 2.3 },
    { word: "time", start: 2.3, end: 2.6 },
    { word: "followed", start: 2.6, end: 3.0 },
    { word: "by", start: 3.0, end: 3.2 },
    { word: "20", start: 3.2, end: 3.5, highlight: true },
    { word: "minutes", start: 3.5, end: 4.0, highlight: true },
    { word: "off", start: 4.0, end: 4.5, highlight: true },
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
              source={require("@/assets/videos/sprain-3.mp4")}
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
            
            <View style={styles.warningContainer}>
              <View style={styles.warningHeader}>
                <Ionicons name="warning" size={22} color="#D32F2F" />
                <Text style={styles.warningTitle}>Important Safety Information</Text>
              </View>
              <View style={styles.warningItem}>
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                </View>
                <Text style={styles.warningText}>
                  Ice the area for about 20 minutes at a time followed by 20 minutes off
                </Text>
              </View>
              <View style={styles.warningItem}>
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                </View>
                <Text style={styles.warningText}>
                  Use a cloth barrier between ice and skin to prevent frostbite
                </Text>
              </View>
              <View style={styles.warningItem}>
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                </View>
                <Text style={styles.warningText}>
                  Repeat the icing cycle for the first 48-72 hours after injury
                </Text>
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
          
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => router.push('/screens/first-aid-details/SprainStrain/when-to-seek-help')}
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
