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

const CutsFollowUpCare: React.FC = () => {
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
          <Text style={styles.headerTitle}>Cuts - Follow-up Care</Text>
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
            <Text style={styles.sectionTitle}>Follow-up Care:</Text>
            <Text style={styles.description}>
              Proper follow-up care is essential for optimal healing and to prevent complications. Monitoring the wound and maintaining good care practices will help ensure the best outcome.
            </Text>
            
            <Text style={styles.sectionTitle}>Daily care routine:</Text>
            <Text style={styles.description}>
              1. Check the wound daily for signs of healing or complications.{'\n'}
              2. Gently clean the wound with water during dressing changes.{'\n'}
              3. Apply a thin layer of antibiotic ointment if recommended.{'\n'}
              4. Replace the dressing with a clean, sterile one.{'\n'}
              5. Keep the wound dry and protected from further injury.
            </Text>
            
            <Text style={styles.sectionTitle}>Promoting healing:</Text>
            <Text style={styles.description}>
              • Eat a healthy diet rich in protein, vitamins A and C, and zinc to support tissue repair{'\n'}
              • Stay hydrated to maintain good blood flow to the wound{'\n'}
              • Get adequate rest to allow your body to focus on healing{'\n'}
              • Avoid smoking as it impairs circulation and delays healing{'\n'}
              • Protect the healing wound from sun exposure to prevent dark scarring
            </Text>
            
            <Text style={styles.sectionTitle}>Normal healing process:</Text>
            <Text style={styles.description}>
              • Day 1-3: Blood clotting and initial inflammation{'\n'}
              • Day 3-7: New tissue begins to form (wound may appear red or pink){'\n'}
              • Week 1-3: Continued tissue growth and wound contraction{'\n'}
              • Week 3+: Remodeling phase where scar tissue strengthens{'\n'}
              • Weeks to months: Scar maturation and fading
            </Text>
            
            <Text style={styles.sectionTitle}>When healing is delayed:</Text>
            <Text style={styles.description}>
              • The wound becomes larger or deeper over time{'\n'}
              • Persistent or increasing pain{'\n'}
              • Persistent redness, swelling, or warmth{'\n'}
              • Foul odor or unusual discharge{'\n'}
              • Fever develops{'\n'}
              • The wound fails to show signs of improvement after a few days
            </Text>
            
            <Text style={styles.sectionTitle}>Scar care:</Text>
            <Text style={styles.description}>
              • Once the wound has closed, gently massage the area with moisturizer{'\n'}
              • Protect the new skin from sun exposure{'\n'}
              • Silicone gel sheets or scar gels may help minimize scarring{'\n'}
              • Be patient - scars can continue to improve for up to a year
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

export default CutsFollowUpCare;
