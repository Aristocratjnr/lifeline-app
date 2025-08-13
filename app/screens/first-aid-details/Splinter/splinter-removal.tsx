import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from 'expo-av';
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import {
  ImageBackground,
  ImageStyle,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type Style = {
  container: ViewStyle;
  backgroundImage: ImageStyle;
  overlay: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  backButton: ViewStyle;
  content: ViewStyle;
  creditsContainer: ViewStyle;
  creditsText: TextStyle;
  topVideoContainer: ViewStyle;
  topVideo: ViewStyle;
  scenarioContainer: ViewStyle;
  scenarioHeader: ViewStyle;
  scenarioTitle: TextStyle;
  scenarioText: TextStyle;
  wordHighlight: TextStyle;
  bottomNav: ViewStyle;
  navButton: ViewStyle;
  sosButton: ViewStyle;
  sosText: TextStyle;
  sosButtonText: TextStyle;
  nextButton: ViewStyle;
  nextButtonText: TextStyle;
  transcriptContainer: ViewStyle;
  transcriptText: TextStyle;
  word: TextStyle;
  highlightedWord: TextStyle;
  buttonsContainer: ViewStyle;
  sosIcon: ImageStyle;
  navButtonText: TextStyle;
};

const SplinterRemoval: React.FC = () => {
  const router = useRouter();
  const video = useRef<Video>(null);
  const [highlightedWordIdx, setHighlightedWordIdx] = useState<number>(-1);

  // Per-word transcript with timings (in seconds)
  const transcript = useMemo(() => [
    { word: "For", start: 0.5, end: 0.8 },
    { word: "a", start: 0.8, end: 0.9 },
    { word: "tiny", start: 0.9, end: 1.3 },
    { word: "splinter,", start: 1.3, end: 1.9 },
    { word: "gently", start: 2.0, end: 2.5 },
    { word: "press", start: 2.5, end: 3.0 },
    { word: "a", start: 3.0, end: 3.2 },
    { word: "piece", start: 3.2, end: 3.7 },
    { word: "of", start: 3.7, end: 3.9 },
    { word: "tape", start: 3.9, end: 4.4 },
    { word: "over", start: 4.4, end: 4.9 },
    { word: "the", start: 4.9, end: 5.1 },
    { word: "tip", start: 5.1, end: 5.6 },
    { word: "and", start: 5.6, end: 5.9 },
    { word: "pull", start: 5.9, end: 6.3 },
    { word: "it", start: 6.3, end: 6.5 },
    { word: "off", start: 6.5, end: 6.9 },
    { word: "in", start: 6.9, end: 7.5 },
  ], []);

  const handleNext = () => {
    router.push('/screens/first-aid-details/Splinter/splinter-cleaning');
  };

  const handleSOS = () => {
    router.push('/sos');
  };
  
  // Load fonts
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

  // Highlight logic for per-word
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleGoBack}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Splinter Removal</Text>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Credits */}
          <View style={styles.creditsContainer}>
            <Text style={styles.creditsText}>Credits: First Aid Kit</Text>
          </View>
          
          {/* Video */}
          <View style={styles.topVideoContainer}>
            <Video
              ref={video}
              style={styles.topVideo}
              source={require('../../../../assets/videos/splinter-2.mp4')}
              useNativeControls
              resizeMode={ResizeMode.COVER}
              progressUpdateIntervalMillis={250}
              shouldPlay={false}
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            />
          </View>

          {/* Instructions Section */}
          <View style={styles.scenarioContainer}>
            <View style={styles.scenarioHeader}>
              <Text style={styles.scenarioTitle}>Instructions</Text>
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
        </ScrollView>
        
        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navButton} onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={28} color="#000" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
            <Text style={styles.sosText}>SOS</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navButton} onPress={handleNext}>
            <Ionicons name="arrow-forward" size={28} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.89)',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'JetBrainsMono-Bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 24,
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 80, // Add padding to account for bottom navigation
  },
  creditsContainer: {
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  creditsText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    fontFamily: 'JetBrainsMono-Italic',
  },
  topVideoContainer: {
    width: '100%',
    aspectRatio: 16/9,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#000',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topVideo: {
    width: '100%',
    height: '100%',
  },
  scenarioContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  scenarioHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
    marginBottom: 15,
  },
  scenarioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    fontFamily: 'JetBrainsMono-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scenarioText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#34495e',
    fontFamily: 'JetBrainsMono-Regular',
  },
  wordHighlight: {
    backgroundColor: '#ffe082',
    color: '#d84315',
    fontWeight: 'bold',
    paddingHorizontal: 2,
    borderRadius: 3,
  },
  transcriptContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  transcriptText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  word: {
    color: '#666',
  },
  highlightedWord: {
    color: '#000',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#E53935',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Bold',
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
  sosButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
    fontFamily: 'JetBrainsMono-Bold',
  },
  sosIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'transparent',
    zIndex: 100,
  },
  navButton: {
    padding: 10,
    backgroundColor: 'transparent',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  sosText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
  },
});

export default SplinterRemoval;
