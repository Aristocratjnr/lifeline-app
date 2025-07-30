import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const CutsPreventingInfection: React.FC = () => {
  const router = useRouter();

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
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleGoBack}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cuts - Preventing Infection</Text>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.illustrationContainer}>
            <Image 
              source={require('../../../../assets/images/cut-palm.png')} 
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.sectionTitle}>Preventing Infection:</Text>
            <Text style={styles.description}>
              Infection is a common complication of cuts. Taking proper steps to prevent infection is crucial for proper healing and avoiding serious complications.
            </Text>
            
            <Text style={styles.sectionTitle}>Steps to prevent infection:</Text>
            <Text style={styles.description}>
              1. Clean your hands thoroughly before and after treating the wound.{'\n'}
              2. Clean the wound properly with water as soon as bleeding stops.{'\n'}
              3. Apply an antibiotic ointment if available to help prevent bacterial growth.{'\n'}
              4. Cover the wound with a sterile dressing to protect it from dirt and bacteria.{'\n'}
              5. Change the dressing daily or whenever it becomes wet or dirty.{'\n'}
              6. Avoid touching the wound with unwashed hands.{'\n'}
              7. Keep the wound dry and clean during bathing.
            </Text>
            
            <Text style={styles.sectionTitle}>Signs of infection to watch for:</Text>
            <Text style={styles.description}>
              • Increased pain, swelling, or redness around the wound{'\n'}
              • Red streaking extending from the wound{'\n'}
              • Pus or other discharge from the wound{'\n'}
              • Warmth around the wound area{'\n'}
              • Fever or chills{'\n'}
              • The wound edges becoming raised or separated
            </Text>
            
            <Text style={styles.sectionTitle}>Special considerations:</Text>
            <Text style={styles.description}>
              • People with diabetes or compromised immune systems should be extra vigilant about wound care{'\n'}
              • Deep or dirty wounds may require professional medical attention and possibly antibiotics{'\n'}
              • Wounds that were caused by rusty or dirty objects may require a tetanus shot{'\n'}
              • Animal or human bites should always be evaluated by a healthcare provider due to high infection risk
            </Text>
            
            <Text style={styles.sectionTitle}>When to seek medical attention for infection:</Text>
            <Text style={styles.description}>
              • Any signs of infection appear within 24-48 hours{'\n'}
              • Red streaking extends from the wound{'\n'}
              • Fever develops{'\n'}
              • The wound becomes increasingly painful or swollen{'\n'}
              • Pus or foul-smelling discharge is present
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'JetBrainsMono-Bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  illustration: {
    width: width * 0.6,
    height: height * 0.3,
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    fontFamily: 'JetBrainsMono-Bold',
  },
  description: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 15,
    fontFamily: 'JetBrainsMono-Regular',
  },
});

export default CutsPreventingInfection;
