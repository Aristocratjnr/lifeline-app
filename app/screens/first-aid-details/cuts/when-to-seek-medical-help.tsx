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

const CutsWhenToSeekMedicalHelp: React.FC = () => {
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
          <Text style={styles.headerTitle}>Cuts - When to Seek Medical Help</Text>
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
            <Text style={styles.sectionTitle}>When to Seek Medical Help:</Text>
            <Text style={styles.description}>
              While many cuts can be treated at home, some require professional medical attention to prevent complications and ensure proper healing.
            </Text>
            
            <Text style={styles.sectionTitle}>Seek immediate emergency care if:</Text>
            <Text style={styles.description}>
              • The cut is deep enough to see fat, muscle, or bone{'\n'}
              • Bleeding is severe and doesn't stop after 10-15 minutes of direct pressure{'\n'}
              • Blood is spurting from the wound{'\n'}
              • The cut is longer than half an inch and is deep{'\n'}
              • The person shows signs of shock (pale, cold, clammy skin; rapid breathing; dizziness; weakness){'\n'}
              • The cut is on the face, neck, chest, or abdomen{'\n'}
              • There are signs of serious infection (fever, red streaking, pus){'\n'}
              • The person loses consciousness
            </Text>
            
            <Text style={styles.sectionTitle}>Seek medical attention within 24 hours if:</Text>
            <Text style={styles.description}>
              • The cut was caused by a dirty or rusty object and the person hasn't had a tetanus shot in the last 5-10 years{'\n'}
              • The cut is on a joint and may affect movement{'\n'}
              • The edges of the cut gape open and may require stitches{'\n'}
              • The cut was caused by an animal or human bite{'\n'}
              • There are foreign objects in the wound that you cannot safely remove{'\n'}
              • The person has a compromised immune system or diabetes{'\n'}
              • The cut shows early signs of infection (increased redness, swelling, warmth, pus){'\n'}
              • The cut is on the face and cosmetic appearance is a concern
            </Text>
            
            <Text style={styles.sectionTitle}>When to call your doctor:</Text>
            <Text style={styles.description}>
              • The cut isn't healing properly after a few days{'\n'}
              • You have questions about wound care or dressing changes{'\n'}
              • The person develops a fever{'\n'}
              • There are concerns about scarring or cosmetic results{'\n'}
              • The person has underlying health conditions that may affect healing
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

export default CutsWhenToSeekMedicalHelp;
