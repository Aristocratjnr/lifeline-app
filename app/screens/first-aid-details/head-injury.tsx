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

const HeadInjuryDetailsFirstAid: React.FC = () => {
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
          <Text style={styles.headerTitle}>Head Injury Care</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Main Image */}
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../../assets/images/head-injury.png')} 
              style={styles.mainImage}
              resizeMode="contain"
            />
          </View>

          {/* Content */}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Head Injury Emergency Care</Text>
            
            <View style={styles.emergencyContainer}>
              <Ionicons name="medical" size={24} color="#FF6B6B" />
              <Text style={styles.emergencyText}>
                CALL 911 IMMEDIATELY for severe head injuries, loss of consciousness, or suspected brain injury!
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Immediate Assessment:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>1.</Text>
                <Text style={styles.stepText}>Check consciousness level and responsiveness</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>2.</Text>
                <Text style={styles.stepText}>Assess breathing and airway</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>3.</Text>
                <Text style={styles.stepText}>Look for visible wounds, bleeding, or skull deformity</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>4.</Text>
                <Text style={styles.stepText}>Check pupils for size and reaction to light</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>5.</Text>
                <Text style={styles.stepText}>Do not move if spinal injury suspected</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Critical Warning Signs (Call 911):</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Loss of consciousness (even briefly)</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Confusion, disorientation, or memory loss</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Severe headache that worsens</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Repeated vomiting or nausea</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Seizures or convulsions</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Unequal pupil size or no reaction to light</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Clear fluid draining from nose or ears</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Difficulty speaking or slurred speech</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Weakness or numbness in arms/legs</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>For Conscious Patients:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>1.</Text>
                <Text style={styles.stepText}>Keep person still and calm</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>2.</Text>
                <Text style={styles.stepText}>Apply ice pack to injury site (wrapped in cloth)</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>3.</Text>
                <Text style={styles.stepText}>Control bleeding with gentle pressure using clean cloth</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>4.</Text>
                <Text style={styles.stepText}>Monitor consciousness and breathing</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>5.</Text>
                <Text style={styles.stepText}>Keep head and shoulders slightly elevated</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>For Unconscious Patients:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Call 911 immediately</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Do not move unless in immediate danger</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Monitor breathing and be ready to perform CPR</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>If vomiting, carefully turn to side (if no spinal injury)</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Cover with blanket to maintain body temperature</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Concussion Monitoring:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Check mental alertness every 15 minutes</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Ask simple questions (name, date, location)</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Watch for balance or coordination problems</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Monitor for increasing drowsiness</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Look for personality or behavior changes</Text>
              </View>
            </View>

            <View style={styles.warningContainer}>
              <Ionicons name="warning" size={20} color="#FF6B6B" />
              <Text style={styles.warningText}>
                Never give food, water, or medications to someone with a head injury. 
                Do not allow them to sleep without medical clearance for the first few hours.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What NOT to Do:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Do not move the person unnecessarily</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Do not remove any objects stuck in the wound</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Do not shake or slap the person to wake them</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Do not give pain medications without medical advice</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Do not leave them alone for extended periods</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Do not assume they are fine if they seem alert</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recovery Guidelines:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Rest is crucial - avoid physical and mental exertion</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Avoid screens and bright lights if headache persists</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Return to activities gradually as symptoms improve</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Follow up with healthcare provider</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Prevention:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Wear helmets during sports and cycling</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Use seat belts and car seats properly</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Remove tripping hazards from walkways</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Install safety gates and window guards for children</Text>
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

export default HeadInjuryDetailsFirstAid
