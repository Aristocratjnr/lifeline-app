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

const CutsApplyingDressings: React.FC = () => {
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
          <Text style={styles.headerTitle}>Cuts - Applying Dressings</Text>
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
            <Text style={styles.sectionTitle}>Applying Dressings:</Text>
            <Text style={styles.description}>
              Properly dressing a cut helps protect it from infection and promotes healing. The type of dressing depends on the size and location of the wound.
            </Text>
            
            <Text style={styles.sectionTitle}>Types of dressings:</Text>
            <Text style={styles.description}>
              1. Adhesive bandages (Band-Aids) - For small, superficial cuts{'\n'}
              2. Sterile gauze pads - For larger or deeper cuts{'\n'}
              3. Medical tape - To secure gauze in place{'\n'}
              4. Elastic bandages - For cuts on joints or areas that move frequently
            </Text>
            
            <Text style={styles.sectionTitle}>Steps to apply a dressing:</Text>
            <Text style={styles.description}>
              1. Ensure your hands are clean or wear gloves if available.{'\n'}
              2. If using gauze, place a sterile gauze pad directly over the wound.{'\n'}
              3. Secure the gauze with medical tape, wrapping around the area.{'\n'}
              4. For adhesive bandages, remove the backing and place directly over the wound.{'\n'}
              5. Ensure the dressing is snug but not too tight to restrict circulation.{'\n'}
              6. Check that fingertips or toes (if applicable) remain pink and warm.
            </Text>
            
            <Text style={styles.sectionTitle}>Dressing changes:</Text>
            <Text style={styles.description}>
              • Change the dressing daily or whenever it becomes wet or dirty{'\n'}
              • Clean the wound gently with water before applying a new dressing{'\n'}
              • Apply a thin layer of antibiotic ointment if recommended{'\n'}
              • Monitor for signs of infection during each dressing change
            </Text>
            
            <Text style={styles.sectionTitle}>When NOT to cover a wound:</Text>
            <Text style={styles.description}>
              • Small, superficial cuts on areas that won't get dirty or rubbed{'\n'}
              • Cuts that are healing well and have formed a scab{'\n'}
              • Wounds that your doctor has specifically instructed to remain uncovered
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

export default CutsApplyingDressings;
