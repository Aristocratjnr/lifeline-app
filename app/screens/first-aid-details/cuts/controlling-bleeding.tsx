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

const CutsControllingBleeding: React.FC = () => {
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
          <Text style={styles.headerTitle}>Cuts - Controlling Bleeding</Text>
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
            <Text style={styles.sectionTitle}>Controlling Bleeding:</Text>
            <Text style={styles.description}>
              Controlling bleeding is often the first step in treating a cut. Most minor cuts will stop bleeding on their own, but some may require direct pressure.
            </Text>
            
            <Text style={styles.sectionTitle}>Steps to control bleeding:</Text>
            <Text style={styles.description}>
              1. Apply direct pressure to the wound with a clean cloth, sterile gauze, or your hand if nothing else is available.{'\n'}
              2. Maintain pressure for at least 5-10 minutes without lifting to check if bleeding has stopped.{'\n'}
              3. If blood soaks through the material, add another layer on top rather than removing the original one.{'\n'}
              4. Elevate the injured area above the level of the heart if possible to reduce blood flow to the area.{'\n'}
              5. If bleeding is severe, apply pressure to the artery that supplies blood to the wound (pressure points).
            </Text>
            
            <Text style={styles.sectionTitle}>Pressure points:</Text>
            <Text style={styles.description}>
              • For arm or hand injuries: Apply pressure to the brachial artery (inside of upper arm) or radial/ulnar arteries (wrist).{'\n'}
              • For leg or foot injuries: Apply pressure to the femoral artery (groin area) or popliteal artery (behind the knee).{'\n'}
              • Never use a tourniquet unless absolutely necessary and you have proper training.
            </Text>
            
            <Text style={styles.sectionTitle}>When to seek immediate medical help:</Text>
            <Text style={styles.description}>
              • Bleeding is spurting or cannot be controlled with direct pressure{'\n'}
              • Bleeding continues heavily after 10-15 minutes of direct pressure{'\n'}
              • The person shows signs of shock (pale, cold, clammy skin; rapid breathing; dizziness; weakness){'\n'}
              • The cut is on the neck, chest, or abdomen{'\n'}
              • The person loses consciousness
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

export default CutsControllingBleeding;
