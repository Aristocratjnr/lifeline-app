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

const SunBurnDetail: React.FC = () => {
  const router = useRouter();
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // Load fonts
  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Regular": require("@/assets/fonts/JetBrainsMono-Regular.ttf"),
    "JetBrainsMono-Bold": require("@/assets/fonts/JetBrainsMono-Bold.ttf"),
  });
  
  const tips = [
    {
      title: "Use Sunscreen Daily",
      content: "Apply broad-spectrum SPF 30+ sunscreen 15-30 minutes before sun exposure, and reapply every 2 hours or after swimming/sweating.",
      iconSet: Ionicons,
      iconName: "sunny-outline" as const,
      color: "#F39C12",
    },
    {
      title: "Seek Shade",
      content: "Stay in the shade, especially between 10 AM and 4 PM when the sun's rays are strongest. Use umbrellas or wear wide-brimmed hats.",
      iconSet: Ionicons,
      iconName: "umbrella-outline" as const,
      color: "#F39C12",
    },
    {
      title: "Wear Protective Clothing",
      content: "Cover up with long sleeves, pants, and UV-blocking sunglasses. Look for clothing with UPF (Ultraviolet Protection Factor) ratings.",
      iconSet: Ionicons,
      iconName: "shirt-outline" as const,
      color: "#F39C12",
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
          <Text style={styles.headerTitle}>SUN BURN</Text>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.illustrationContainer}>
            <View style={styles.imageWrapper}>
              <Image 
                source={require('../../../assets/images/sun_burn.png')} 
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>
          </View>
          
          <View style={styles.infoContainer}>
            {/* Scenario Section */}
            <View style={styles.section}>
              <View style={[styles.sectionHeader, { borderLeftColor: '#F39C12' }]}>
                <Text style={styles.sectionTitle}>Scenario</Text>
              </View>
              <Text style={styles.sectionText}>
                You or someone nearby has spent too much time in the sun and now has red, painful skin that feels warm to the touch. The affected area may be swollen, and in more severe cases, blisters may form. Sunburn can range from mild to severe and is caused by overexposure to ultraviolet (UV) radiation from the sun.
              </Text>
            </View>
            
            {/* What to Do Section */}
            <View style={styles.section}>
              <View style={[styles.sectionHeader, { borderLeftColor: '#F39C12' }]}>
                <Text style={styles.sectionTitle}>What to do</Text>
              </View>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Get out of the sun</Text> immediately and move to a cool, shaded or air-conditioned area</Text>
                </View>
                
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Cool the skin</Text> with a cool (not cold) bath, shower, or damp cloths for 10-15 minutes</Text>
                </View>
                
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Apply moisturizer</Text> with aloe vera or soy to soothe the skin (avoid petroleum-based products)</Text>
                </View>
                
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Stay hydrated</Text> by drinking extra water to help your body recover</Text>
                </View>
                
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Take pain relief</Text> like ibuprofen or aspirin to reduce pain and inflammation</Text>
                </View>
                
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Leave blisters intact</Text> to prevent infection and promote healing</Text>
                </View>
                
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Wear loose clothing</Text> over the sunburned area to avoid further irritation</Text>
                </View>
              </View>
            </View>
            
            {/* When to Seek Medical Help Section */}
            <View style={styles.section}>
              <View style={[styles.sectionHeader, { borderLeftColor: '#F39C12' }]}>
                <Text style={styles.sectionTitle}>When to seek medical help</Text>
              </View>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Severe sunburn</Text> covering a large portion of the body with blisters</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Fever above 100°F (37.8°C)</Text> or chills</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Severe pain</Text> that doesn't respond to over-the-counter medications</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Signs of infection</Text> such as increasing pain, swelling, redness, or pus</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Nausea, vomiting,</Text> or fainting</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Dizziness</Text> or confusion</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Dehydration</Text> symptoms (dry mouth, thirst, reduced urination, dark urine)</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Infant under 1 year old</Text> with sunburn</Text>
                </View>
              </View>
            </View>
            
            {/* Prevention Tips Card */}
            <View style={[styles.tipCard, { borderColor: 'rgba(243, 156, 18, 0.3)' }]}>
              <View style={[styles.tipHeader, { backgroundColor: 'rgba(243, 156, 18, 0.1)' }]}>
                <Text style={[styles.tipTitle, { color: '#F39C12' }]}>Prevention Tips</Text>
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
                // Add navigation to guides here if needed
                console.log('Navigate to sunburn guides');
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
    borderColor: 'rgba(243, 156, 18, 0.3)',
    shadowColor: '#F39C12',
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
    marginBottom: 8,
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
    color: '#F39C12',
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
    backgroundColor: 'rgba(243, 156, 18, 0.1)',
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
    borderColor: 'rgba(243, 156, 18, 0.3)',
    alignSelf: 'center',
  },
  newTipButtonText: {
    color: '#F39C12',
    fontSize: 13,
    fontFamily: 'JetBrainsMono-Bold',
  },
  // Guide Button Styles
  guideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F39C12',
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

export default SunBurnDetail;
