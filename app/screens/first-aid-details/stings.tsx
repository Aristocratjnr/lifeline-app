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

const StingsDetail: React.FC = () => {
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
      title: "Wear Protective Clothing",
      content: "Wear light-colored, smooth-finished clothing when outdoors to avoid attracting stinging insects.",
      iconSet: Ionicons,
      iconName: "shirt-outline",
      color: "#D9534F",
    },
    {
      title: "Avoid Strong Scents",
      content: "Avoid using perfumes, colognes, and scented soaps when spending time outside as they can attract stinging insects.",
      iconSet: Ionicons,
      iconName: "flower-outline",
      color: "#ec8080ff",
    },
    {
      title: "Cover Food and Drinks",
      content: "Keep food and drinks covered when eating outdoors to prevent attracting stinging insects.",
      iconSet: Ionicons,
      iconName: "fast-food-outline",
      color: "#FC7A7A",
    },
    {
      title: "Stay Calm",
      content: "Remain calm and move away slowly if a single stinging insect is flying around. Swatting may provoke them.",
      iconSet: Ionicons,
      iconName: "happy-outline",
      color: "#D9534F",
    },
    {
      title: "Check for Nests",
      content: "Be cautious around areas where stinging insects might nest, such as in the ground, trees, or under eaves.",
      iconSet: Ionicons,
      iconName: "eye-outline",
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
          <Text style={styles.headerTitle}>STINGS</Text>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.illustrationContainer}>
            <Image 
              source={require('../../../assets/images/beee.png')} 
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.sectionTitle}>Scenario</Text>
            <Text style={styles.description}>
              If you suspect casualty has been stung, please assure them or help them to sit or lie down.
            </Text>
            
            <Text style={styles.sectionTitle}>What to do:</Text>
            <Text style={styles.description}>
              If you have a small BEE STING, first apply pressure to the wound to reduce bleeding.
              {'\n\n'}
              Applying pressure helps constrict the blood vessels, preventing blood from flowing through.
            </Text>
            
            <Text style={styles.sectionTitle}>When to seek medical help:</Text>
            <Text style={styles.description}>
              • Difficulty breathing or swallowing{'\n'}
              • Swelling of the face, throat, or mouth{'\n'}
              • Rapid pulse or dizziness{'\n'}
              • Hives or widespread itching{'\n'}
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
            onPress={() => router.push('/screens/first-aid-details/Stings/bee-initial')}
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
    backgroundColor: 'rgba(255,255,255,0.3)',
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
    borderLeftColor: '#D9534F',
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
    marginBottom: 16,
  },
  tipText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'JetBrainsMono-Bold',
  },
  tipSubText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'JetBrainsMono-Regular',
  },
  newTipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(248, 129, 129, 0.1)',
  },
  newTipButtonText: {
    color: '#f88181ff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Bold',
  },
  treatmentButton: {
    backgroundColor: '#D9534F',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 25,
    shadowColor: 'rgba(217, 83, 79, 0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  treatmentButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
    letterSpacing: 0.5,
    marginLeft: 8,
  },
});

export default StingsDetail;
