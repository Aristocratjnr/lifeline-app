import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function JockItchPrevention() {
  const router = useRouter();

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
          <View style={styles.scenarioContainer}>
            <View style={styles.scenarioHeader}>
              <Text style={styles.scenarioTitle}>Treatment Options</Text>
            </View>
            
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>
                If you want to speed up the process, you can use an over-the-counter anti-fungal ointment designed to treat the condition.
              </Text>
            </View>
            
            <Text style={styles.scenarioText}>
              Apply the ointment as directed on the package for 1-2 weeks to see if your rash clears up. Make sure to continue the treatment for the full recommended duration, even if symptoms improve earlier.
            </Text>
            
            <View style={styles.infoBox}>
              <Ionicons name="information-circle" size={20} color="#1976d2" style={styles.infoIcon} />
              <Text style={styles.infoText}>
                Look for active ingredients like clotrimazole, miconazole, or terbinafine. Always read and follow the package instructions carefully.
              </Text>
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
            onPress={() => router.push('/screens/first-aid-details/jock-itch/treatment')}
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
  instructionContainer: {
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  instructionText: {
    fontSize: 16,
    color: '#2e7d32',
    fontFamily: 'JetBrainsMono-Bold',
    lineHeight: 22,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    alignItems: 'flex-start',
  },
  infoIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#0d47a1',
    lineHeight: 20,
    fontFamily: 'JetBrainsMono-Regular',
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
