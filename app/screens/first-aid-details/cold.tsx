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

const ColdFirstAid: React.FC = () => {
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
          <Text style={styles.headerTitle}>Cold & Flu Care</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Main Image */}
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../../assets/images/cold.png')} 
              style={styles.mainImage}
              resizeMode="contain"
            />
          </View>

          {/* Content */}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Cold & Flu Management</Text>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Immediate Relief:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>1.</Text>
                <Text style={styles.stepText}>Get plenty of rest - sleep helps your body fight infection</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>2.</Text>
                <Text style={styles.stepText}>Stay hydrated with water, herbal teas, and clear broths</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>3.</Text>
                <Text style={styles.stepText}>Use a humidifier or breathe steam from hot shower</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Symptom Management:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Gargle warm salt water for sore throat</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Use nasal saline rinse for congestion</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Take over-the-counter pain relievers as directed</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Suck on throat lozenges or hard candy</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Apply warm compress to forehead and nose</Text>
              </View>
            </View>

            <View style={styles.warningContainer}>
              <Ionicons name="warning" size={20} color="#FF6B6B" />
              <Text style={styles.warningText}>
                Seek medical attention if fever exceeds 103°F (39.4°C), difficulty breathing, 
                chest pain, or symptoms worsen after 10 days.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Foods to Help Recovery:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Chicken soup (helps with hydration and congestion)</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Honey and ginger tea (soothes throat)</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Citrus fruits (vitamin C boost)</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Warm broths and herbal teas</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Prevention:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Wash hands frequently with soap</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Avoid touching face with unwashed hands</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Stay away from sick individuals</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Get adequate sleep and maintain good nutrition</Text>
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

export default ColdFirstAid
