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
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // Load fonts
  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Regular": require("@/assets/fonts/JetBrainsMono-Regular.ttf"),
    "JetBrainsMono-Bold": require("@/assets/fonts/JetBrainsMono-Bold.ttf"),
  });
  
  const tips = [
    {
      title: "Cut Food Properly",
      content: "Cut food into small, manageable pieces, especially for young children and elderly individuals.",
      iconSet: Ionicons,
      iconName: "restaurant-outline" as const,
      color: "#E74C3C",
    },
    {
      title: "Supervise Meals",
      content: "Always supervise young children while they're eating, and encourage them to sit down while eating.",
      iconSet: Ionicons,
      iconName: "people-outline" as const,
      color: "#E74C3C",
    },
    {
      title: "Avoid Hazards",
      content: "Keep small objects that could be choking hazards away from young children and infants.",
      iconSet: Ionicons,
      iconName: "warning-outline" as const,
      color: "#E74C3C",
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
          <Text style={styles.headerTitle}>CHOKING</Text>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.illustrationContainer}>
            <View style={styles.imageWrapper}>
              <Image 
                source={require('../../../assets/images/choking.png')} 
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>
          </View>
          
          <View style={styles.infoContainer}>
            {/* Scenario Section */}
            <View style={styles.section}>
              <View style={[styles.sectionHeader, { borderLeftColor: '#E74C3C' }]}>
                <Text style={styles.sectionTitle}>Scenario</Text>
              </View>
              <Text style={styles.sectionText}>
                Someone is choking and cannot speak, cough, or breathe. They may be clutching their throat, turning blue, or losing consciousness. Immediate action is required to help dislodge the object blocking their airway.
              </Text>
            </View>
            
            {/* What to Do Section */}
            <View style={styles.section}>
              <View style={[styles.sectionHeader, { borderLeftColor: '#E74C3C' }]}>
                <Text style={styles.sectionTitle}>What to do</Text>
              </View>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Assess</Text> if the person can cough, speak, or breathe</Text>
                </View>
                
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>For adults/children over 1 year:</Text></Text>
                </View>
                
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>◦</Text>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Make a fist</Text>, place above navel, below ribcage</Text>
                </View>
                
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Grasp fist</Text> with other hand, give quick upward thrusts</Text>
                </View>
                
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Continue until</Text> object is out or person becomes unconscious</Text>
                </View>
                
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>For infants under 1 year:</Text> Place face down on forearm, head lower than body</Text>
                </View>
                
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Give 5 back blows</Text> between shoulder blades</Text>
                </View>
                
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>If unsuccessful,</Text> turn face up, give 5 chest thrusts</Text>
                </View>
                
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Repeat until</Text> object is out or infant becomes unconscious</Text>
                </View>
                
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Call emergency services</Text> (911) immediately</Text>
                </View>
                
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Begin CPR</Text> if the person becomes unconscious</Text>
                </View>
              </View>
            </View>
            
            {/* When to Seek Medical Help Section */}
            <View style={styles.section}>
              <View style={[styles.sectionHeader, { borderLeftColor: '#E74C3C' }]}>
                <Text style={styles.sectionTitle}>When to seek medical help</Text>
              </View>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Always</Text> call emergency services for choking incidents</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Persistent</Text> coughing or difficulty breathing after the incident</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Chest pain</Text> or discomfort following the choking episode</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>If the person</Text> becomes unconscious at any point</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}><Text style={styles.bold}>Signs of infection</Text> like fever or difficulty swallowing later</Text>
                </View>
              </View>
            </View>
            
            {/* Prevention Tips Card */}
            <View style={[styles.tipCard, { borderColor: 'rgba(231, 76, 60, 0.3)' }]}>
              <View style={[styles.tipHeader, { backgroundColor: 'rgba(231, 76, 60, 0.1)' }]}>
                <Text style={[styles.tipTitle, { color: '#E74C3C' }]}>Prevention Tips</Text>
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
                console.log('Navigate to choking guides');
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
    borderColor: 'rgba(231, 76, 60, 0.3)',
    shadowColor: '#E74C3C',
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
    width: '100%',
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 5,
    alignItems: 'flex-start',
    width: '100%',
  },
  bullet: {
    fontSize: 16,
    color: '#E74C3C',
    marginRight: 8,
    lineHeight: 20,
    marginTop: 2,
    width: 12,
    textAlign: 'center',
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'JetBrainsMono-Regular',
    color: '#333',
    lineHeight: 20,
    flexWrap: 'wrap',
    marginRight: 15,
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
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
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
    borderColor: 'rgba(231, 76, 60, 0.3)',
    alignSelf: 'center',
  },
  newTipButtonText: {
    color: '#E74C3C',
    fontSize: 13,
    fontFamily: 'JetBrainsMono-Bold',
  },
  // Guide Button Styles
  guideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E74C3C',
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

export default ChokingDetail;
