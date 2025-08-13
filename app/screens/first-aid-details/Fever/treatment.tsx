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
    { word: "1.", start: 0, end: 0.3 },
    { word: "To", start: 0.3, end: 0.5 },
    { word: "reduce", start: 0.5, end: 0.8 },
    { word: "their", start: 0.8, end: 1.0 },
    { word: "temperature,", start: 1.0, end: 1.5 },
    { word: "remove", start: 1.5, end: 1.9 },
    { word: "excess", start: 1.9, end: 2.3 },
    { word: "clothing.", start: 2.3, end: 3.0 },
    
    { word: "2.", start: 3.5, end: 3.8 },
    { word: "Give", start: 3.8, end: 4.0 },
    { word: "them", start: 4.0, end: 4.2 },
    { word: "fluids", start: 4.2, end: 4.6, highlight: true },
    { word: "(water)", start: 4.6, end: 5.0 },
    { word: "to", start: 5.0, end: 5.2 },
    { word: "drink.", start: 5.2, end: 6.0 },
    
    { word: "3.", start: 6.5, end: 6.8 },
    { word: "Give", start: 6.8, end: 7.0 },
    { word: "the", start: 7.0, end: 7.2 },
    { word: "recommended", start: 7.2, end: 8.0 },
    { word: "doses", start: 8.0, end: 8.4 },
    { word: "of", start: 8.4, end: 8.6 },
    { word: "paracetamol", start: 8.6, end: 9.5, highlight: true },
    { word: "or", start: 9.5, end: 9.7 },
    { word: "ibuprofen", start: 9.7, end: 10.5, highlight: true },
    { word: "syrup.", start: 10.5, end: 11.5 },
    
    { word: "4.", start: 12.0, end: 12.3 },
    { word: "This", start: 12.3, end: 12.5 },
    { word: "will", start: 12.5, end: 12.7 },
    { word: "help", start: 12.7, end: 13.0 },
    { word: "reduce", start: 13.0, end: 13.4 },
    { word: "pain", start: 13.4, end: 13.8 },
    { word: "and", start: 13.8, end: 14.0 },
    { word: "distress.", start: 14.0, end: 15.0 },
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
               source={require("@/assets/videos/fever-2.mp4")}
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
                    style={isHighlighted ? styles.wordHighlight : undefined}
                  >
                    {w.word + ' '}
                  </Text>
                );
              })}
            </Text>
          </View>

          <View style={styles.tipBox}>
            <Ionicons name="warning" size={22} color="#FF9800" style={styles.tipIcon} />
            <Text style={styles.tipText}>
              If you are worried and don't know what to do, you can seek advice from your GP (General Practitioner), 
              walk-in centre (hospital/pharmacy/clinic) or by calling your local emergency number.
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
            onPress={() => router.push('/screens/first-aid-details/Fever/finished')}
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


});
