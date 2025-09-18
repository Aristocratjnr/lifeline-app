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

const ShockFirstAid: React.FC = () => {
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
          <Text style={styles.headerTitle}>Shock Emergency</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Main Image */}
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../../assets/images/shock.png')} 
              style={styles.mainImage}
              resizeMode="contain"
            />
          </View>

          {/* Content */}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Shock Emergency Care</Text>
            
            <View style={styles.emergencyContainer}>
              <Ionicons name="medical" size={24} color="#FF6B6B" />
              <Text style={styles.emergencyText}>
                CALL 911 IMMEDIATELY! Shock is a life-threatening emergency requiring immediate medical attention.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recognize Signs of Shock:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Rapid, weak pulse</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Cool, clammy, pale skin</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Rapid, shallow breathing</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Weakness, fatigue, dizziness</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Nausea or vomiting</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Confusion or anxiety</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Decreased urination</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Immediate Actions:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>1.</Text>
                <Text style={styles.stepText}>Call 911 immediately</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>2.</Text>
                <Text style={styles.stepText}>Check and maintain airway, breathing, circulation</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>3.</Text>
                <Text style={styles.stepText}>Control any obvious bleeding</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>4.</Text>
                <Text style={styles.stepText}>Position person appropriately (see positioning section)</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>5.</Text>
                <Text style={styles.stepText}>Keep person warm but not overheated</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Positioning for Shock:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Lay person flat on back</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Elevate legs 8-12 inches (if no spinal injury)</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Turn head to side if vomiting</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Do not elevate head or legs if head/neck/back injury suspected</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Types of Shock:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Hypovolemic: Blood/fluid loss (bleeding, dehydration)</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Cardiogenic: Heart problems</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Anaphylactic: Severe allergic reaction</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Septic: Severe infection</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Neurogenic: Spinal cord injury</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>While Waiting for EMS:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Monitor breathing and pulse continuously</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Be prepared to perform CPR if needed</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Keep person calm and reassured</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Loosen tight clothing</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Cover with blanket to maintain normal body temperature</Text>
              </View>
            </View>

            <View style={styles.warningContainer}>
              <Ionicons name="warning" size={20} color="#FF6B6B" />
              <Text style={styles.warningText}>
                Do not give food, water, or medications. Do not move person unnecessarily. 
                Shock can rapidly become fatal without proper medical treatment.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What NOT to Do:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Do not give anything by mouth</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Do not move person unless absolutely necessary</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Do not elevate head if spinal injury suspected</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Do not leave person alone</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Do not apply direct heat (heating pads, hot water bottles)</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Prevention:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Wear protective equipment during risky activities</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Stay hydrated, especially in hot weather</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Know your allergies and carry medications</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Seek prompt treatment for infections</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Follow medication instructions carefully</Text>
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
    fontSize: 14,
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

export default ShockFirstAid
