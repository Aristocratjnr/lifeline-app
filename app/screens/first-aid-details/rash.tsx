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

const RashDetail: React.FC = () => {
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
      title: "Identify Triggers",
      content: "Keep a journal to track potential rash triggers like foods, soaps, or fabrics.",
      iconSet: Ionicons,
      iconName: "search-outline",
      color: "#FF7043",
    },
    {
      title: "Gentle Skincare",
      content: "Use fragrance-free, hypoallergenic products to minimize skin irritation.",
      iconSet: Ionicons,
      iconName: "water-outline",
      color: "#5C6BC0",
    },
    {
      title: "Moisturize Regularly",
      content: "Apply fragrance-free moisturizer to maintain skin barrier function.",
      iconSet: Ionicons,
      iconName: "color-wand-outline",
      color: "#26A69A",
    },
    {
      title: "Sun Protection",
      content: "Use broad-spectrum sunscreen and protective clothing to prevent sun-related rashes.",
      iconSet: Ionicons,
      iconName: "sunny-outline",
      color: "#FFA000",
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
          <Text style={styles.headerTitle}>RASH</Text>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.illustrationContainer}>
            <Image 
              source={require('../../../assets/images/rash.png')} 
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.sectionTitle}>Scenario</Text>
            <Text style={styles.description}>
              If you notice an area of irritated or swollen skin that may be red, itchy, or painful, you may be experiencing a rash. Rashes can have many causes and may require different treatments.
            </Text>
            
            <Text style={styles.sectionTitle}>What to do:</Text>
            <Text style={styles.description}>
              • <Text style={{fontWeight: 'bold'}}>Avoid</Text> scratching to prevent infection and scarring.{'\n'}
              • <Text style={{fontWeight: 'bold'}}>Clean</Text> gently with mild soap and pat (don't rub) dry.{'\n'}
              • <Text style={{fontWeight: 'bold'}}>Cool</Text> the area with a damp cloth or take an oatmeal bath.{'\n'}
              • <Text style={{fontWeight: 'bold'}}>Apply</Text> hydrocortisone cream or calamine lotion as directed.{'\n'}
              • <Text style={{fontWeight: 'bold'}}>Take</Text> an oral antihistamine for itching if needed.{'\n'}
              • Wear loose, soft fabrics like cotton to reduce irritation.{'\n'}
              • Identify and eliminate potential triggers.
            </Text>
            
            <Text style={styles.sectionTitle}>When to seek medical help:</Text>
            <Text style={styles.description}>
              • Covers a large area or spreads quickly{'\n'}
              • Accompanied by fever, trouble breathing, or facial swelling{'\n'}
              • Shows signs of infection (pus, increasing redness, warmth){'\n'}
              • Is extremely painful or burning{'\n'}
              • Appears after starting new medication{'\n'}
              • No improvement after 7 days of home care{'\n'}
              • Accompanied by joint pain or swelling
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
              router.push('/screens/first-aid-details/rash/initial-assessment');
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
    borderColor: '#FF7043',
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
    borderLeftColor: '#FF7043',
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
    backgroundColor: 'rgba(255, 112, 67, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 112, 67, 0.3)',
  },
  newTipButtonText: {
    color: '#FF7043',
    fontSize: 13,
    fontFamily: 'JetBrainsMono-Medium',
  },
  
  // Guide Button Styles
  guideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7043',
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

export default RashDetail;
