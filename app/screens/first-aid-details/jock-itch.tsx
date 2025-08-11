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

const JockItchDetail: React.FC = () => {
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

  const tips = [
    {
      title: "Stay Dry",
      content: "Keep the groin area dry by changing out of wet clothing immediately after exercise.",
      iconSet: Ionicons,
      iconName: "water-outline",
      color: "#9C27B0",
    },
    {
      title: "Wear Breathable Fabrics",
      content: "Choose loose-fitting, moisture-wicking underwear made of cotton or other breathable materials.",
      iconSet: Ionicons,
      iconName: "shirt-outline",
      color: "#673AB7",
    },
    {
      title: "Practice Good Hygiene",
      content: "Shower after exercise and dry the groin area thoroughly, especially between skin folds.",
      iconSet: Ionicons,
      iconName: "body-outline",
      color: "#3F51B5",
    },
    {
      title: "Rotate Footwear",
      content: "Alternate between pairs of shoes to allow them to dry completely between uses.",
      iconSet: Ionicons,
      iconName: "footsteps-outline",
      color: "#9C27B0",
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
          <Text style={styles.headerTitle}>JOCK ITCH</Text>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.illustrationContainer}>
            <Image 
              source={require('../../../assets/images/inch.png')} 
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.sectionTitle}>Scenario</Text>
            <Text style={styles.description}>
              If you're experiencing an itchy, red, ring-shaped rash in your groin area, you may have jock itch. This common fungal infection thrives in warm, moist areas and can be effectively treated with proper care.
            </Text>
            
            <Text style={styles.sectionTitle}>What to do:</Text>
            <Text style={styles.description}>
              • <Text style={{fontWeight: 'bold'}}>Clean</Text> the affected area gently with soap and water daily.{'\n'}
              • <Text style={{fontWeight: 'bold'}}>Apply</Text> antifungal cream, powder, or spray as directed.{'\n'}
              • <Text style={{fontWeight: 'bold'}}>Dry</Text> thoroughly after bathing, especially between skin folds.{'\n'}
              • <Text style={{fontWeight: 'bold'}}>Wear</Text> loose, breathable cotton underwear.{'\n'}
              • <Text style={{fontWeight: 'bold'}}>Change</Text> out of wet clothing immediately after exercise.{'\n'}
              • Avoid sharing personal items like towels or clothing.{'\n'}
              • Use a separate towel for the affected area.
            </Text>
            
            <Text style={styles.sectionTitle}>When to seek medical help:</Text>
            <Text style={styles.description}>
              • No improvement after 2 weeks of treatment{'\n'}
              • Rash spreads or worsens despite treatment{'\n'}
              • Signs of infection (increased redness, warmth, swelling, pus){'\n'}
              • Severe itching affecting daily activities or sleep{'\n'}
              • Development of blisters or open sores{'\n'}
              • Fever accompanies the rash{'\n'}
              • If you have diabetes or a weakened immune system
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
            onPress={() => {
              // Add navigation to guides here if needed
              console.log('Navigate to jock itch guides');
            }}
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
    borderColor: '#9C27B0',
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
    borderLeftColor: '#9C27B0',
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
    backgroundColor: 'rgba(156, 39, 176, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(156, 39, 176, 0.3)',
  },
  newTipButtonText: {
    color: '#9C27B0',
    fontSize: 13,
    fontFamily: 'JetBrainsMono-Medium',
  },
  
  // Guide Button Styles
  guideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9C27B0',
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

export default JockItchDetail;
