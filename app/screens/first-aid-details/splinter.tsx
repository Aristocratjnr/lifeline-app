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

const SplinterDetail: React.FC = () => {
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
      title: "Clean Tools First",
      content: "Always sterilize tweezers and needles with rubbing alcohol before attempting to remove a splinter to prevent infection.",
      iconSet: Ionicons,
      iconName: "medkit-outline",
      color: "#D9534F",
    },
    {
      title: "Soak the Area",
      content: "Soaking the affected area in warm water for a few minutes can help bring the splinter closer to the surface of the skin.",
      iconSet: Ionicons,
      iconName: "water-outline",
      color: "#ec8080ff",
    },
    {
      title: "Use Baking Soda Paste",
      content: "Apply a paste of baking soda and water to draw out stubborn splinters naturally.",
      iconSet: Ionicons,
      iconName: "flask-outline",
      color: "#D9534F",
    },
    {
      title: "Prevent Splinters",
      content: "Wear gloves when working with wood or other materials that can cause splinters.",
      iconSet: Ionicons,
      iconName: "hand-right-outline",
      color: "#FC7A7A",
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
          <Text style={styles.headerTitle}>SPLINTER</Text>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.illustrationContainer}>
            <Image 
              source={require('../../../assets/images/splinter.png')} 
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.sectionTitle}>Scenario</Text>
            <Text style={styles.description}>
              If you or someone has a splinter, follow these steps to safely remove it and prevent infection.
            </Text>
            
            <Text style={styles.sectionTitle}>What to do:</Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>Wash your hands thoroughly with soap and water.</Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>Clean the area around the splinter with soap and water.</Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>Sterilize a needle or tweezers with rubbing alcohol.</Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>If the splinter is sticking out, gently pull it out with tweezers in the direction it entered.</Text>
              </View>
              
            </View>
            
            <Text style={styles.sectionTitle}>When to seek medical help:</Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Text style={[styles.bullet, styles.warningBullet]}>•</Text>
                <Text style={[styles.bulletText, styles.warningText]}>The splinter is deep under the skin and you can&apos;t reach it</Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={[styles.bullet, styles.warningBullet]}>•</Text>
                <Text style={[styles.bulletText, styles.warningText]}>The splinter is under a fingernail or toenail</Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={[styles.bullet, styles.warningBullet]}>•</Text>
                <Text style={[styles.bulletText, styles.warningText]}>The splinter is made of glass, metal, or another material that may break</Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={[styles.bullet, styles.warningBullet]}>•</Text>
                <Text style={[styles.bulletText, styles.warningText]}>The area becomes red, swollen, warm, or pus-filled (signs of infection)</Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={[styles.bullet, styles.warningBullet]}>•</Text>
                <Text style={[styles.bulletText, styles.warningText]}>You develop red streaking from the wound</Text>
              </View>
              
            </View>

            {/* Tips Card */}
            <View style={styles.tipsCard}>
              <View style={styles.tipsHeader}>
                <Ionicons name="bulb-outline" size={18} color="#aaa" />
                <Text style={styles.tipsTitle}>Splinter Care Tips</Text>
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
                  <Text style={styles.tipText}>{currentTip.title}</Text>
                  <Text style={styles.tipSubText}>{currentTip.content}</Text>
                </View>
                <TouchableOpacity style={styles.newTipButton} onPress={handleNewTip}>
                  <Ionicons name="refresh-outline" size={16} color="#f88181ff" style={{ marginRight: 6 }} />
                  <Text style={styles.newTipButtonText}>New Tip</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          {/* Button to navigate to detailed treatment */}
          <TouchableOpacity 
            style={styles.treatmentButton}
            onPress={() => router.push('/screens/first-aid-details/Splinter/splinter-initial')}
          >
            <Text style={styles.treatmentButtonText}>See Guide</Text>
          </TouchableOpacity>
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
    backgroundColor: 'transparent',
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
    paddingBottom: 40, // Add padding for bottom navigation
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
    borderColor: '#D9534F',
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
    marginBottom: 12,
    marginTop: 10,
    fontFamily: 'JetBrainsMono-Bold',
  },
  description: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    marginBottom: 15,
    fontFamily: 'JetBrainsMono-Regular',
  },
  bulletList: {
    marginBottom: 15,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    color: '#D9534F',
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 14,
    lineHeight: 22,
  },
  warningBullet: {
    color: '#D9534F',
  },
  bulletText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    fontFamily: 'JetBrainsMono-Regular',
    flex: 1,
  },
  warningText: {
    color: '#D9534F',
  },
  // Tips Card Styles
  tipsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tipsTitle: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    fontFamily: 'JetBrainsMono-Bold',
  },
  tipTranslucent: {
    padding: 15,
  },
  tipContent: {
    alignItems: 'center',
    marginBottom: 15,
  },
  tipText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'JetBrainsMono-Bold',
  },
  tipSubText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'JetBrainsMono-Regular',
  },
  newTipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 15,
    backgroundColor: 'rgba(248, 129, 129, 0.1)',
    alignSelf: 'center',
  },
  newTipButtonText: {
    color: '#f88181ff',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Bold',
  },
  treatmentButton: {
    backgroundColor: '#D9534F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 3,
  },
  treatmentButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
  },
});

export default SplinterDetail;
