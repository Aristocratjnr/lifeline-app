"use client"

import { Ionicons } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import type React from "react"
import {
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native"

const CPRFirstAid: React.FC = () => {
  const router = useRouter()
 

  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Regular": require("@/assets/fonts/JetBrainsMono-Regular.ttf"),
    "JetBrainsMono-Bold": require("@/assets/fonts/JetBrainsMono-Bold.ttf"),
  })

  if (!fontsLoaded) {
    return <View style={styles.container} />
  }

  return (
    <ImageBackground 
      source={require('../../../assets/images/blur.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>CPR Emergency</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Main Image */}
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../../assets/images/cpr.png')} 
              style={styles.mainImage}
              resizeMode="contain"
            />
          </View>

          {/* Content */}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>CPR (Cardiopulmonary Resuscitation)</Text>
            
            <View style={styles.emergencyContainer}>
              <Ionicons name="medical" size={24} color="#FF6B6B" />
              <Text style={styles.emergencyText}>
                EMERGENCY: Call 911 immediately before starting CPR!
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Check Responsiveness:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>1.</Text>
                <Text style={styles.stepText}>Tap shoulders firmly and shout &quot;Are you okay?&quot;</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>2.</Text>
                <Text style={styles.stepText}>Check for normal breathing (10 seconds max)</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>3.</Text>
                <Text style={styles.stepText}>If no response and no normal breathing, start CPR</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Hand Position:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>1.</Text>
                <Text style={styles.stepText}>Place heel of one hand on center of chest (lower half of breastbone)</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>2.</Text>
                <Text style={styles.stepText}>Place other hand on top, interlacing fingers</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>3.</Text>
                <Text style={styles.stepText}>Keep arms straight, shoulders directly over hands</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Chest Compressions:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Push hard and fast at least 2 inches deep</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Compress at rate of 100-120 per minute</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Allow complete chest recoil between compressions</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Minimize interruptions</Text>
              </View>
            </View>

            <View style={styles.ratioContainer}>
              <Text style={styles.ratioTitle}>Compression-to-Breath Ratio:</Text>
              <Text style={styles.ratioText}>30 compressions : 2 rescue breaths</Text>
              <Text style={styles.ratioSubtext}>Continue until emergency services arrive</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Rescue Breathing (if trained):</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>1.</Text>
                <Text style={styles.stepText}>Tilt head back, lift chin to open airway</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>2.</Text>
                <Text style={styles.stepText}>Pinch nose closed, seal mouth over victim&apos;s mouth</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>3.</Text>
                <Text style={styles.stepText}>Give 2 breaths, each lasting 1 second</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>4.</Text>
                <Text style={styles.stepText}>Watch for chest rise with each breath</Text>
              </View>
            </View>

            <View style={styles.warningContainer}>
              <Ionicons name="warning" size={20} color="#FF6B6B" />
              <Text style={styles.warningText}>
                If not trained in rescue breathing, provide continuous chest compressions only. 
                Hands-only CPR is still effective!
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>When to Stop CPR:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Emergency medical services take over</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Person starts breathing normally</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>AED becomes available</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>You become too exhausted to continue</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.89)',
    zIndex: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 0.5,
    fontFamily: "JetBrainsMono-Bold",
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  mainImage: {
    width: 120,
    height: 120,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: "JetBrainsMono-Bold",
  },
  emergencyContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFEBEE',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
    alignItems: 'center',
  },
  emergencyText: {
    fontSize: 16,
    color: '#D32F2F',
    marginLeft: 10,
    flex: 1,
    fontWeight: 'bold',
    fontFamily: "JetBrainsMono-Bold",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    fontFamily: "JetBrainsMono-Bold",
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 10,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 8,
    minWidth: 20,
    fontFamily: "JetBrainsMono-Bold",
  },
  stepText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    lineHeight: 22,
    fontFamily: "JetBrainsMono-Regular",
  },
  ratioContainer: {
    backgroundColor: '#E3F2FD',
    padding: 20,
    borderRadius: 10,
    marginVertical: 15,
    alignItems: 'center',
  },
  ratioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
    fontFamily: "JetBrainsMono-Bold",
  },
  ratioText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 4,
    fontFamily: "JetBrainsMono-Bold",
  },
  ratioSubtext: {
    fontSize: 14,
    color: '#1976D2',
    fontFamily: "JetBrainsMono-Regular",
  },
  warningContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF3F3',
    padding: 15,
    borderRadius: 10,
    marginVertical: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  warningText: {
    fontSize: 14,
    color: '#D32F2F',
    marginLeft: 10,
    flex: 1,
    fontFamily: "JetBrainsMono-Regular",
  },
})

export default CPRFirstAid
