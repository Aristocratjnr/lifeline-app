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

const SprainStrainDetail: React.FC = () => {
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

  const tips = [
    {
      title: "Warm Up Properly",
      content: "Always warm up before physical activity to prepare your muscles and joints for movement.",
      iconSet: Ionicons,
      iconName: "walk-outline",
      color: "#4A90E2",
    },
    {
      title: "Wear Proper Footwear",
      content: "Use appropriate, well-fitting shoes with good support for your activity.",
      iconSet: Ionicons,
      iconName: "footsteps-outline",
      color: "#5C6BC0",
    },
    {
      title: "Strengthen Muscles",
      content: "Regular strength training can help prevent sprains and strains by supporting your joints.",
      iconSet: Ionicons,
      iconName: "barbell-outline",
      color: "#26A69A",
    },
    {
      title: "Use Proper Technique",
      content: "Learn and use proper form for all exercises and sports activities.",
      iconSet: Ionicons,
      iconName: "body-outline",
      color: "#4A90E2",
    },
  ];

  const [currentTip, setCurrentTip] = React.useState(tips[0]);

  const handleNewTip = () => {
    let newTip;
    do {
      newTip = tips[Math.floor(Math.random() * tips.length)];
    } while (newTip.title === currentTip.title && tips.length > 1);
    setCurrentTip(newTip);
  };

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
          <Text style={styles.headerTitle}>SPRAIN/STRAIN</Text>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.illustrationContainer}>
            <Image 
              source={require('../../../assets/images/pain.png')} 
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.sectionTitle}>Scenario</Text>
            <Text style={styles.description}>
              If you suspect a sprain or strain, follow the R.I.C.E. method for initial treatment and monitor symptoms closely.
            </Text>
            
            <Text style={styles.sectionTitle}>What to do:</Text>
            <Text style={styles.description}>
              • <Text style={{fontWeight: 'bold'}}>Rest</Text> the injured area and avoid activities that cause pain.{'\n'}
              • <Text style={{fontWeight: 'bold'}}>Ice</Text> the area with a cold pack for 15-20 minutes every 2-3 hours for the first 48 hours.{'\n'}
              • <Text style={{fontWeight: 'bold'}}>Compress</Text> with an elastic bandage (not too tight - you should be able to slip a finger underneath).{'\n'}
              • <Text style={{fontWeight: 'bold'}}>Elevate</Text> the injured area above heart level when possible.{'\n'}
              • Consider over-the-counter pain relievers if needed.{'\n'}
              • After 48 hours, gentle heat and movement can help with recovery.
            </Text>
            
            <Text style={styles.sectionTitle}>When to seek medical help:</Text>
            <Text style={styles.description}>
              • Severe pain or inability to bear weight on the affected area{'\n'}
              • Numbness or tingling in the injured area{'\n'}
              • Deformity or severe swelling{'\n'}
              • Signs of infection (fever, redness, warmth){'\n'}
              • No improvement after 2-3 days of home care
            </Text>

            {/* Tips Card */}
            <View style={styles.tipsCard}>
              <View style={styles.tipsHeader}>
                <Ionicons name="bulb-outline" size={18} color="#aaa" />
                <Text style={styles.tipsTitle}>Prevention Tips</Text>
              </View>
              <View style={styles.tipTranslucent}>
                <View style={styles.tipContent}>
                  {currentTip.iconSet && currentTip.iconName && (
                    <currentTip.iconSet
                      name={currentTip.iconName as React.ComponentProps<typeof Ionicons>['name']}
                      size={28}
                      color={currentTip.color}
                      style={{ marginBottom: 6 }}
                    />
                  )}
                  <Text style={[styles.tipTitle, { color: currentTip.color }]}>
                    {currentTip.title}
                  </Text>
                  <Text style={styles.tipText}>{currentTip.content}</Text>
                  <TouchableOpacity 
                    style={styles.newTipButton}
                    onPress={handleNewTip}
                  >
                    <Text style={styles.newTipButtonText}>Show Another Tip</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          
          {/* See Guides Button */}
          <TouchableOpacity 
            style={styles.guideButton}
            onPress={() => router.push('/screens/first-aid-details/SprainStrain')}
          >
            <Ionicons name="book-outline" size={20} color="white" style={styles.guideIcon} />
            <Text style={styles.guideButtonText}>See Guides</Text>
          </TouchableOpacity>
          
          {/* Bottom padding to ensure content isn't hidden behind the button */}
          <View style={{ height: 30 }} />
          
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
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'JetBrainsMono-Bold',
    marginLeft: 10,
    letterSpacing: 0.5,
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
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    borderWidth: 3,
    borderColor: '#4A90E2',
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 22,
    marginBottom: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 12,
    color: '#2c3e50',
    fontFamily: 'JetBrainsMono-Bold',
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
    paddingLeft: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#444',
    marginBottom: 16,
    fontFamily: 'JetBrainsMono-Regular',
    letterSpacing: 0.1,
  },
  // Tips Card Styles
  tipsCard: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tipsTitle: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    fontFamily: 'JetBrainsMono-Regular',
  },
  tipTranslucent: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  tipContent: {
    alignItems: 'center',
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'JetBrainsMono-Bold',
  },
  tipText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
    fontFamily: 'JetBrainsMono-Regular',
  },
  newTipButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.3)',
  },
  newTipButtonText: {
    color: '#FF5722',
    fontSize: 13,
    fontFamily: 'JetBrainsMono-Medium',
  },
  // Guide Button Styles
  guideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5722',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  guideButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Bold',
    marginLeft: 8,
  },
  guideIcon: {
    marginRight: 5,
  },
});

export default SprainStrainDetail;
