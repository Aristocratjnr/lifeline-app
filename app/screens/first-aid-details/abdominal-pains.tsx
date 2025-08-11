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

const AbdominalPainsDetail: React.FC = () => {
  const router = useRouter();
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // Load fonts
  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Regular": require("@/assets/fonts/JetBrainsMono-Regular.ttf"),
    "JetBrainsMono-Bold": require("@/assets/fonts/JetBrainsMono-Bold.ttf"),
  });
  
  const tips = [
    {
      title: "Stay Hydrated",
      content: "Drink plenty of clear fluids like water, herbal teas, or clear broths to help with digestion and prevent dehydration.",
      iconSet: Ionicons,
      iconName: "water-outline" as const,
      color: "#3498DB",
    },
    {
      title: "Eat Mindfully",
      content: "Choose bland, easy-to-digest foods like bananas, rice, applesauce, and toast (BRAT diet) when recovering from stomach issues.",
      iconSet: Ionicons,
      iconName: "nutrition-outline" as const,
      color: "#3498DB",
    },
    {
      title: "Monitor Symptoms",
      content: "Keep track of your symptoms, their duration, and any patterns to help healthcare providers with diagnosis if needed.",
      iconSet: Ionicons,
      iconName: "document-text-outline" as const,
      color: "#3498DB",
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
          <Text style={styles.headerTitle}>ABDOMINAL PAINS</Text>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.illustrationContainer}>
            <View style={styles.imageWrapper}>
              <Image 
                source={require('../../../assets/images/abdominal_pains.png')} 
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>
          </View>
          
          <View style={styles.infoContainer}>
            {/* Scenario Section */}
            <View style={styles.section}>
              <View style={[styles.sectionHeader, { borderLeftColor: '#3498DB' }]}>
                <Text style={styles.sectionTitle}>Scenario</Text>
              </View>
              <Text style={styles.sectionText}>
                You or someone nearby is experiencing discomfort or pain in the abdominal area. The pain may be dull, sharp, crampy, or constant, and could be accompanied by other symptoms like nausea, bloating, or changes in bowel movements.
              </Text>
            </View>
            
            {/* What to Do Section */}
            <View style={styles.section}>
              <View style={[styles.sectionHeader, { borderLeftColor: '#3498DB' }]}>
                <Text style={styles.sectionTitle}>What to do</Text>
              </View>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Rest</Text> in a comfortable position and avoid strenuous activities</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Apply</Text> a warm compress to the abdomen to help relax muscles</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Sip</Text> clear fluids like water, herbal tea, or electrolyte solutions</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Eat</Text> small amounts of bland foods if you can tolerate them</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Consider</Text> acetaminophen for pain (avoid NSAIDs if there's a risk of bleeding)</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Avoid</Text> dairy, fatty foods, spicy foods, caffeine, and alcohol</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Monitor</Text> symptoms and be prepared to describe them to a healthcare provider</Text>
                </View>
              </View>
            </View>
            
            {/* When to Seek Medical Help Section */}
            <View style={styles.section}>
              <View style={[styles.sectionHeader, { borderLeftColor: '#3498DB' }]}>
                <Text style={styles.sectionTitle}>When to seek medical help</Text>
              </View>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Severe pain</Text> that doesn't improve with rest or position changes</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Fever</Text> along with abdominal pain</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Persistent vomiting</Text> or inability to keep fluids down</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Severe tenderness</Text> when you press on your abdomen</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Bloody</Text> or black, tarry stools</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Difficulty breathing</Text> or chest pain with abdominal pain</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Pain</Text> that moves to your lower right side (possible appendicitis)</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Pregnancy</Text> with new or severe abdominal pain</Text>
                </View>
              </View>
            </View>
            
            {/* Prevention Tips Card */}
            <View style={[styles.tipCard, { borderColor: 'rgba(52, 152, 219, 0.3)' }]}>
              <View style={[styles.tipHeader, { backgroundColor: 'rgba(52, 152, 219, 0.1)' }]}>
                <Text style={[styles.tipTitle, { color: '#3498DB' }]}>Prevention Tips</Text>
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
              onPress={() => router.push('/screens/first-aid-details/abdominal-pains/initial-assessment')}
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
    borderColor: 'rgba(52, 152, 219, 0.3)',
    shadowColor: '#3498DB',
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
    color: '#3498DB',
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
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
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
    borderColor: 'rgba(52, 152, 219, 0.3)',
    alignSelf: 'center',
  },
  newTipButtonText: {
    color: '#3498DB',
    fontSize: 13,
    fontFamily: 'JetBrainsMono-Bold',
  },
  // Guide Button Styles
  guideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498DB',
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

export default AbdominalPainsDetail;
