import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, SafeAreaView, Linking } from "react-native";
import { useFonts } from 'expo-font';

const WhenToSeeDoctor = () => {
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

  const emergencySymptoms = [
    "High fever (above 101°F or 38.3°C)",
    "Severe pain that doesn't improve with over-the-counter pain relievers",
    "Signs of a spreading infection (increasing redness, warmth, swelling, or red streaks)",
    "Pus or other discharge with a foul odor"
  ];

  const seeDoctorSymptoms = [
    "No improvement after 2 weeks of proper treatment",
    "Rash that worsens or spreads despite treatment",
    "Blisters, ulcers, or open sores in the affected area",
    "Rash that keeps coming back",
    "Severe itching that interferes with sleep or daily activities"
  ];

  const riskFactors = [
    "Diabetes or other condition that weakens the immune system",
    "HIV/AIDS or other immune-compromising conditions",
    "Taking immunosuppressant medications",
    "History of recurrent fungal infections"
  ];

  const handleCallEmergency = () => {
    // This would typically call emergency services
    // For demonstration, we'll just show an alert
    alert("Calling emergency services...");
  };

  const handleFindDoctor = () => {
    // This would typically open a doctor finder or appointment scheduling
    alert("Finding a doctor near you...");
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
          <Text style={styles.headerTitle}>WHEN TO SEE A DOCTOR</Text>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.introContainer}>
            <Text style={styles.introText}>
              While most cases of jock itch can be treated at home, there are times when medical attention is necessary. Here's how to know when to seek help.
            </Text>
          </View>
          
          {/* Emergency Section */}
          <View style={[styles.card, { borderLeftWidth: 4, borderLeftColor: '#D32F2F' }]}>
            <View style={styles.sectionHeader}>
              <Ionicons name="warning" size={24} color="#D32F2F" />
              <Text style={[styles.sectionTitle, { color: '#D32F2F', marginLeft: 8 }]}>
                Seek Emergency Care If:
              </Text>
            </View>
            <View style={styles.listContainer}>
              {emergencySymptoms.map((symptom, index) => (
                <View key={index} style={styles.listItem}>
                  <Ionicons name="alert-circle" size={16} color="#D32F2F" style={styles.bulletIcon} />
                  <Text style={[styles.listText, { color: '#D32F2F' }]}>{symptom}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#D32F2F' }]}
              onPress={handleCallEmergency}
            >
              <Ionicons name="call" size={18} color="white" />
              <Text style={styles.buttonText}>Call Emergency Services</Text>
            </TouchableOpacity>
          </View>
          
          {/* See Doctor Section */}
          <View style={[styles.card, { borderLeftWidth: 4, borderLeftColor: '#FFA000' }]}>
            <View style={styles.sectionHeader}>
              <Ionicons name="medical" size={24} color="#FFA000" />
              <Text style={[styles.sectionTitle, { color: '#FFA000', marginLeft: 8 }]}>
                See a Doctor If:
              </Text>
            </View>
            <View style={styles.listContainer}>
              {seeDoctorSymptoms.map((symptom, index) => (
                <View key={index} style={styles.listItem}>
                  <Ionicons name="medical" size={16} color="#FFA000" style={styles.bulletIcon} />
                  <Text style={[styles.listText, { color: '#333' }]}>{symptom}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#1976D2' }]}
              onPress={handleFindDoctor}
            >
              <Ionicons name="search" size={18} color="white" />
              <Text style={styles.buttonText}>Find a Doctor</Text>
            </TouchableOpacity>
          </View>
          
          {/* Risk Factors Section */}
          <View style={[styles.card, { backgroundColor: '#F5F5F5' }]}>
            <View style={styles.sectionHeader}>
              <Ionicons name="alert-circle" size={24} color="#2c3e50" />
              <Text style={[styles.sectionTitle, { color: '#2c3e50' }]}>
                Increased Risk Factors
              </Text>
            </View>
            <Text style={styles.paragraph}>
              If you have any of the following conditions, you may be at higher risk for complications and should consider seeing a doctor sooner:
            </Text>
            <View style={styles.listContainer}>
              {riskFactors.map((factor, index) => (
                <View key={index} style={styles.listItem}>
                  <Ionicons name="remove" size={16} color="#666" style={styles.bulletIcon} />
                  <Text style={[styles.listText, { color: '#333' }]}>{factor}</Text>
                </View>
              ))}
            </View>
          </View>
          
          {/* What to Expect Section */}
          <View style={styles.card}>
            <Text style={[styles.sectionTitle, { color: '#2c3e50' }]}>
              What to Expect at the Doctor's Office
            </Text>
            <Text style={styles.paragraph}>
              Your doctor will likely:
            </Text>
            <View style={styles.listContainer}>
              <View style={styles.listItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.bulletIcon} />
                <Text style={styles.listText}>Examine the affected area</Text>
              </View>
              <View style={styles.listItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.bulletIcon} />
                <Text style={styles.listText}>Ask about your medical history and symptoms</Text>
              </View>
              <View style={styles.listItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.bulletIcon} />
                <Text style={styles.listText}>Possibly take a skin scraping for testing</Text>
              </View>
              <View style={styles.listItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.bulletIcon} />
                <Text style={styles.listText}>Prescribe stronger antifungal medication if needed</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.noteContainer}>
            <Ionicons name="information-circle-outline" size={20} color="#1976D2" />
            <Text style={styles.noteText}>
              Don't hesitate to seek medical advice if you're unsure about your symptoms. It's better to be cautious with skin infections.
            </Text>
          </View>
          
          {/* Bottom padding */}
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
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Bold',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  introContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  introText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    fontFamily: 'JetBrainsMono-Regular',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'JetBrainsMono-Bold',
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    fontFamily: 'JetBrainsMono-Regular',
    marginBottom: 12,
  },
  listContainer: {
    marginLeft: 8,
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletIcon: {
    marginTop: 3,
    marginRight: 8,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'JetBrainsMono-Regular',
    lineHeight: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'JetBrainsMono-Bold',
    marginLeft: 8,
    fontSize: 15,
  },
  noteContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(25, 118, 210, 0.1)',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  noteText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#1976D2',
    fontFamily: 'JetBrainsMono-Regular',
    lineHeight: 20,
  },
});

export default WhenToSeeDoctor;
