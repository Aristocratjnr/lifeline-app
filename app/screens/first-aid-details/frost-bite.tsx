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

const FrostBiteDetail: React.FC = () => {
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
          <Text style={styles.headerTitle}>FROST BITE</Text>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.illustrationContainer}>
            <Image 
              source={require('../../../assets/images/frost_bite.png')} 
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.sectionTitle}>What to do:</Text>
            <Text style={styles.description}>
              1. Get out of the cold environment immediately and into a warm shelter.{'\n'}
              2. Remove wet clothing and jewelry from the affected area.{'\n'}
              3. Gradually warm the affected area using warm (not hot) water at 104-107.6°F (40-42°C) for 15-30 minutes.{'\n'}
              4. If warm water is not available, use body heat (place affected area against warm skin).{'\n'}
              5. Do NOT rub or massage the frostbitten area as this can cause further tissue damage.{'\n'}
              6. Do NOT use direct heat sources like heating pads, fire, or stoves as numb skin can be easily burned.{'\n'}
              7. Do NOT walk on frostbitten feet or toes if possible.{'\n'}
              8. Give warm, non-alcoholic beverages to help rewarm the body internally.
            </Text>
            
            <Text style={styles.sectionTitle}>When to seek medical help:</Text>
            <Text style={styles.description}>
              • Seek immediate medical attention for all cases of frostbite.{'\n'}
              • Call emergency services (911) if the person shows signs of hypothermia (shivering, confusion, drowsiness).{'\n'}
              • If the skin turns black or develops blisters after rewarming.{'\n'}
              • If numbness persists after rewarming.{'\n'}
              • If the affected area is large or involves the face, hands, feet, or genitals.{'\n'}
              • If the person has underlying health conditions like diabetes or circulation problems.{'\n'}
              • If signs of infection develop (increased pain, redness, swelling, pus).
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

export default FrostBiteDetail;
