import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

const ChokingDetail: React.FC = () => {
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
            onPress={handleGoBack}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>CHOKING</Text>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.illustrationContainer}>
            <Image 
              source={require('../../../assets/images/choking.png')} 
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.sectionTitle}>What to do:</Text>
            <Text style={styles.description}>
              For a conscious adult or child who is choking and cannot speak, cough, or breathe:
            </Text>
            
            <Text style={styles.description}>
              1. Encourage coughing if the person can still cough, speak, or breathe.{'\n'}
              2. If the person cannot cough, speak, or breathe:\n{'\t'}a. Stand behind the person and wrap your arms around their waist.{'\n'}
              {'\t'}b. Make a fist with one hand and place it just above the person's navel, below the ribcage.{'\n'}
              {'\t'}c. Grab your fist with your other hand and give quick, upward thrusts into the abdomen.{'\n'}
              {'\t'}d. Repeat until the object is dislodged or the person becomes unconscious.{'\n'}
              3. If the person becomes unconscious, lower them to the ground and begin CPR.{'\n'}
              4. For infants under 1 year:\n{'\t'}a. Place the infant face down on your forearm with their head lower than their body.{'\n'}
              {'\t'}b. Give up to 5 back slaps between the shoulder blades.{'\n'}
              {'\t'}c. If unsuccessful, turn the infant face up and give up to 5 chest thrusts.{'\n'}
              {'\t'}d. Repeat cycles until the object is dislodged or the infant becomes unconscious.
            </Text>
            
            <Text style={styles.sectionTitle}>When to seek medical help:</Text>
            <Text style={styles.description}>
              • Call emergency services (911) immediately for any choking incident.{'\n'}
              • Seek medical attention after any choking episode, even if the object is dislodged.{'\n'}
              • If the person has persistent coughing, difficulty breathing, or chest pain after the incident.{'\n'}
              • If the person becomes unconscious at any point during the choking episode.{'\n'}
              • If you suspect complications such as aspiration pneumonia.
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
    fontSize: 22,
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

export default ChokingDetail;
