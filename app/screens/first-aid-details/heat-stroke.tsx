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

const HeatStrokeDetail: React.FC = () => {
  const router = useRouter();

  // Load fonts
  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Regular": require("@/assets/fonts/JetBrainsMono-Regular.ttf"),
    "JetBrainsMono-Bold": require("@/assets/fonts/JetBrainsMono-Bold.ttf"),
  });

  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  
  const tips = [
    {
      title: "Stay Hydrated",
      content: "Drink plenty of water throughout the day, especially in hot weather or during exercise.",
      iconSet: Ionicons,
      iconName: "water-outline" as const,
      color: "#FF5722",
    },
    {
      title: "Wear Appropriate Clothing",
      content: "Choose lightweight, loose-fitting, and light-colored clothing to help keep cool.",
      iconSet: Ionicons,
      iconName: "shirt-outline" as const,
      color: "#FF5722",
    },
    {
      title: "Avoid Midday Heat",
      content: "Limit outdoor activities during the hottest part of the day (10am-4pm) when possible.",
      iconSet: Ionicons,
      iconName: "sunny-outline" as const,
      color: "#FF5722",
    },
  ];

  const currentTip = tips[currentTipIndex];

  const handleNewTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
  };

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
          <Text style={styles.headerTitle}>HEAT STROKE</Text>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.illustrationContainer}>
            <View style={styles.imageWrapper}>
              <Image 
                source={require('../../../assets/images/heat_stroke.png')} 
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>
          </View>
          
          <View style={styles.infoContainer}>
            {/* Scenario Section */}
            <View style={styles.section}>
              <View style={[styles.sectionHeader, { borderLeftColor: '#FF5722' }]}>
                <Text style={styles.sectionTitle}>Scenario</Text>
              </View>
              <Text style={styles.sectionText}>
                You find someone who has been in extreme heat and is showing signs of confusion, dizziness, or loss of consciousness. Their skin is hot and dry or profusely sweating.
              </Text>
            </View>
            
            {/* What to Do Section */}
            <View style={styles.section}>
              <View style={[styles.sectionHeader, { borderLeftColor: '#FF5722' }]}>
                <Text style={styles.sectionTitle}>What to do</Text>
              </View>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Call</Text> 911 or emergency services immediately</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Move</Text> to a cooler, shaded area</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Remove</Text> excess clothing</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Cool</Text> rapidly by immersing in cool water or using a cool shower</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Apply</Text> ice packs to neck, armpits, and groin areas</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Sponge</Text> with cool water if other methods aren't available</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Monitor</Text> body temperature until it drops to 101-102°F (38.3-38.8°C)</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Offer</Text> cool water if conscious and not nauseated</Text>
                </View>
              </View>
            </View>
            
            {/* When to Seek Medical Help Section */}
            <View style={styles.section}>
              <View style={[styles.sectionHeader, { borderLeftColor: '#FF5722' }]}>
                <Text style={styles.sectionTitle}>When to seek medical help</Text>
              </View>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>For any suspected heat stroke (this is a medical emergency)</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>If the person loses consciousness</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>If symptoms worsen or don't improve with cooling</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>For children, elderly, or those with chronic conditions</Text>
                </View>
              </View>
            </View>
            
            {/* Prevention Tips Card */}
            <View style={[styles.tipCard, { borderColor: 'rgba(255, 87, 34, 0.3)' }]}>
              <View style={[styles.tipHeader, { backgroundColor: 'rgba(255, 87, 34, 0.1)' }]}>
                <Text style={[styles.tipTitle, { color: '#FF5722' }]}>Prevention Tips</Text>
              </View>
              <View style={styles.tipContent}>
                <View style={styles.tipIconContainer}>
                  <currentTip.iconSet 
                    name={currentTip.iconName} 
                    size={28}
                    color={currentTip.color}
                    style={{ marginBottom: 6 }}
                  />
                </View>
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
            
            {/* See Guides Button */}
            <TouchableOpacity 
              style={styles.guideButton}
              onPress={() => {
                router.push('/screens/first-aid-details/heat-stroke/first');
              }}
            >
              <Ionicons name="book-outline" size={20} color="white" style={styles.guideIcon} />
              <Text style={styles.guideButtonText}>See Guides</Text>
            </TouchableOpacity>
            
            {/* Bottom padding to ensure content isn't hidden behind the button */}
            <View style={{ height: 30 }} />
            
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  backButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 8,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'JetBrainsMono-Bold',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  imageWrapper: {
    backgroundColor: 'white',
    width: 150,
    height: 150,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 87, 34, 0.3)',
    shadowColor: '#FF5722',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  illustration: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 10,
    borderLeftWidth: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Bold',
    color: '#000',
    marginLeft: 8,
  },
  sectionText: {
    fontSize: 14,
    fontFamily: 'JetBrainsMono-Regular',
    color: '#333',
    lineHeight: 20,
    marginBottom: 16,
    paddingHorizontal: 5,
  },
  bulletList: {
    paddingLeft: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 5,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    color: '#FF5722',
    marginRight: 10,
    lineHeight: 20,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'JetBrainsMono-Regular',
    color: '#333',
    lineHeight: 20,
    flexWrap: 'wrap',
  },
  nestedBulletList: {
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  nestedBullet: {
    fontSize: 12,
    fontFamily: 'JetBrainsMono-Regular',
    color: '#555',
    lineHeight: 18,
    marginBottom: 3,
  },
  bold: {
    fontFamily: 'JetBrainsMono-Bold',
    color: '#000',
  },
  tipCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tipHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tipTitle: {
    fontSize: 15,
    fontFamily: 'JetBrainsMono-Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  tipContent: {
    padding: 16,
    alignItems: 'center',
  },
  tipIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 87, 34, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 13,
    fontFamily: 'JetBrainsMono-Regular',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  newTipButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 87, 34, 0.3)',
    alignSelf: 'center',
  },
  newTipButtonText: {
    color: '#FF5722',
    fontSize: 13,
    fontFamily: 'JetBrainsMono-Bold',
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

export default HeatStrokeDetail;
