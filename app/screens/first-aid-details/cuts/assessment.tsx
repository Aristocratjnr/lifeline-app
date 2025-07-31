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

Dimensions.get("window");

const CutsControllingBleeding: React.FC = () => {
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
      title: "Stop the Bleeding",
      content: "Apply gentle pressure with a clean cloth or bandage to stop bleeding. Elevate the area if possible.",
      iconSet: Ionicons,
      iconName: "hand-right-outline",
      color: "#D9534F",
    },
    {
      title: "Clean the Cut",
      content: "Rinse the cut under clean running water. Remove any dirt or debris gently. Avoid using hydrogen peroxide or iodine directly in the wound.",
      iconSet: Ionicons,
      iconName: "water-outline",
      color: "#ec8080ff",
    },
    {
      title: "Protect the Wound",
      content: "Cover the cut with a sterile bandage or gauze. Change the dressing daily or whenever it becomes wet or dirty.",
      iconSet: Ionicons,
      iconName: "medkit-outline",
      color: "#FC7A7A",
    },
    {
      title: "Watch for Infection",
      content: "Look for signs of infection such as redness, swelling, warmth, pus, or increased pain. Seek medical help if these occur.",
      iconSet: Ionicons,
      iconName: "alert-circle-outline",
      color: "#D9534F",
    },
    {
      title: "Avoid Picking Scabs",
      content: "Let scabs form and heal naturally. Picking at scabs can cause infection or scarring.",
      iconSet: Ionicons,
      iconName: "hand-left-outline",
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
      source={require('../../../../assets/images/blur.png')} 
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
          <Text style={styles.headerTitle}>Cuts - Controlling Bleeding</Text>
        </View>

        {/* palm */}
        <ScrollView style={styles.content}>
          <View style={styles.illustrationContainer}>
            <Image 
              source={require('../../../../assets/images/cut-palm.png')} 
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.sectionTitle}>Recommended Products:</Text>
            <Text style={styles.description}>
              • Sterile gauze pads or dressings{'\n'}
              • Adhesive bandages (various sizes){'\n'}
              • Antiseptic wipes or solution{'\n'}
              • Medical tape{'\n'}
              • Disposable gloves{'\n'}
              • Scissors and tweezers (sterile){'\n'}
              • Antibiotic ointment
            </Text>

            {/* Tips Card (copied/adapted from DashboardScreen) */}
            <View style={styles.tipsCard}>
              <View style={styles.tipsHeader}>
                <Ionicons name="bulb-outline" size={18} color="#aaa" />
                <Text style={styles.tipsTitle}>Tips for Treating Cuts</Text>
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
        </ScrollView>
        {/* Next Button */}
        <View style={styles.nextButtonContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => router.push('/screens/first-aid-details/cuts/initial-assessment')}
          >
            <Text style={styles.nextButtonText}>See Guide</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
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
    fontSize: 20,
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
    marginVertical: 10,
  },
  illustration: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#D9534F',
    backgroundColor: '#fff',
    shadowColor: '#D9534F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
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
  nextButtonContainer: {
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: 'transparent',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9534F', // Updated to requested color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 2,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Bold',
  },
  tipsCard: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.75)",
    borderRadius: 18,
    padding: 0,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
    marginTop: 10,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 16,
    marginBottom: 2,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    fontFamily: "JetBrainsMono-Bold",
    marginLeft: 8,
  },
  tipTranslucent: {
    borderRadius: 18,
    padding: 18,
    paddingTop: 10,
    margin: 0,
    backgroundColor: "rgba(255,255,255,0.75)", // translucent white
  },
  tipContent: {
    alignItems: "center",
    marginBottom: 10,
  },
  tipText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
    color: "#D9534F", // Use requested color for tip title
    fontFamily: "JetBrainsMono-Bold",
    lineHeight: 22,
  },
  tipSubText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    fontFamily: "JetBrainsMono-Regular",
    lineHeight: 20,
  },
  newTipButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#FDECEA", // Soft red background (matches #D9534F theme)
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 18,
    marginTop: 4,
  },
  newTipButtonText: {
    color: "#D9534F", // Use requested color for button text
    fontWeight: "bold",
    fontSize: 15,
    fontFamily: "JetBrainsMono-Bold",
    marginLeft: 2,
  },
});

export default CutsControllingBleeding;
