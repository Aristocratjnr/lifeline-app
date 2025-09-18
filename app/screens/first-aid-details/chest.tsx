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

const ChestPainFirstAid: React.FC = () => {
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
          <Text style={styles.headerTitle}>Chest Pain</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Main Image */}
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../../assets/images/chest.png')} 
              style={styles.mainImage}
              resizeMode="contain"
            />
          </View>

          {/* Content */}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Chest Pain Emergency Care</Text>
            
            <View style={styles.emergencyContainer}>
              <Ionicons name="medical" size={24} color="#FF6B6B" />
              <Text style={styles.emergencyText}>
                CALL 911 IMMEDIATELY if chest pain is severe, sudden, or accompanied by other symptoms!
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Immediate Actions:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>1.</Text>
                <Text style={styles.stepText}>Have the person stop all activity and sit down</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>2.</Text>
                <Text style={styles.stepText}>Loosen tight clothing around neck and chest</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>3.</Text>
                <Text style={styles.stepText}>Help them take prescribed heart medication if available</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>4.</Text>
                <Text style={styles.stepText}>Give aspirin if not allergic (only if advised by 911 dispatcher)</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Warning Signs (Call 911):</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Crushing or squeezing chest pain</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Pain radiating to arm, neck, jaw, or back</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Shortness of breath</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Nausea, vomiting, or dizziness</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Cold sweats or pale skin</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Feeling of impending doom</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Position for Comfort:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Sitting upright or semi-reclined position</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Support with pillows or cushions</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Avoid lying flat unless person becomes unconscious</Text>
              </View>
            </View>

            <View style={styles.warningContainer}>
              <Ionicons name="warning" size={20} color="#FF6B6B" />
              <Text style={styles.warningText}>
                Never ignore chest pain. Even mild chest pain can be a sign of a serious heart condition. 
                When in doubt, seek immediate medical attention.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Monitor and Support:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Stay calm and reassure the person</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Monitor breathing and pulse</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Be prepared to perform CPR if needed</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Do not leave the person alone</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What NOT to Do:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Do not give food or water</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Do not give medications unless prescribed</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Do not wait to see if pain goes away</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>Do not drive yourself to hospital</Text>
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

export default ChestPainFirstAid
