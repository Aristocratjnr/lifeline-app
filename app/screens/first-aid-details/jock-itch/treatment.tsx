import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, SafeAreaView } from "react-native";
import { useFonts } from 'expo-font';

const Treatment = () => {
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

  const treatments = [
    {
      title: "Antifungal Creams",
      description: "Over-the-counter antifungal medications that kill the fungus causing the infection.",
      examples: "Clotrimazole (Lotrimin), Miconazole (Micatin), Terbinafine (Lamisil)",
      instructions: "Apply to affected area 2-3 times daily for at least 2 weeks, even if symptoms improve earlier."
    },
    {
      title: "Keep the Area Dry",
      description: "Moisture worsens jock itch, so keeping the area dry is crucial for healing.",
      instructions: "After showering, dry the groin area thoroughly with a clean towel. Use a separate towel for the affected area to prevent spreading."
    },
    {
      title: "Wear Loose Clothing",
      description: "Tight clothing can trap moisture and irritate the skin further.",
      instructions: "Choose loose-fitting cotton underwear and clothing to allow air circulation and reduce sweating."
    },
    {
      title: "Antifungal Powders or Sprays",
      description: "Help keep the area dry while treating the infection.",
      examples: "Miconazole powder, Tolnaftate powder",
      instructions: "Apply after showering and drying the area, especially before putting on clothes."
    },
    {
      title: "Home Remedies (Mild Cases)",
      description: "Natural options that may help with mild infections:",
      items: [
        "Tea tree oil (diluted with a carrier oil)",
        "Coconut oil (has natural antifungal properties)",
        "Apple cider vinegar (diluted with water)"
      ],
      note: "These may help with mild cases but are not as effective as antifungal medications."
    }
  ];

  const whenToSeeDoctor = [
    "No improvement after 2 weeks of treatment",
    "Rash worsens or spreads",
    "Severe itching, pain, or discomfort",
    "Signs of infection (increased redness, swelling, pus)",
    "Fever or chills",
    "Diabetes or weakened immune system"
  ];

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
          <Text style={styles.headerTitle}>TREATMENT</Text>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.introContainer}>
            <Text style={styles.introText}>
              Most cases of jock itch can be treated effectively at home with over-the-counter medications and self-care measures. Here's how to treat it:
            </Text>
          </View>
          
          {treatments.map((treatment, index) => (
            <View key={index} style={styles.treatmentCard}>
              <Text style={styles.treatmentTitle}>{treatment.title}</Text>
              <Text style={styles.treatmentDescription}>{treatment.description}</Text>
              
              {treatment.examples && (
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Examples:</Text>
                  <Text style={styles.detailText}>{treatment.examples}</Text>
                </View>
              )}
              
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>How to use:</Text>
                <Text style={styles.detailText}>{treatment.instructions}</Text>
              </View>
              
              {treatment.items && (
                <View style={styles.listContainer}>
                  {treatment.items.map((item, itemIndex) => (
                    <View key={itemIndex} style={styles.listItem}>
                      <Ionicons name="remove" size={16} color="#5C6BC0" style={styles.bulletIcon} />
                      <Text style={styles.listText}>{item}</Text>
                    </View>
                  ))}
                </View>
              )}
              
              {treatment.note && (
                <View style={styles.noteBox}>
                  <Ionicons name="information-circle" size={18} color="#5C6BC0" />
                  <Text style={styles.noteText}>{treatment.note}</Text>
                </View>
              )}
            </View>
          ))}
          
          <View style={styles.warningCard}>
            <View style={styles.warningHeader}>
              <Ionicons name="medical" size={22} color="#D32F2F" />
              <Text style={styles.warningTitle}>When to See a Doctor</Text>
            </View>
            <View style={styles.warningList}>
              {whenToSeeDoctor.map((item, index) => (
                <View key={index} style={styles.warningItem}>
                  <Ionicons name="alert-circle" size={16} color="#D32F2F" />
                  <Text style={styles.warningText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.tipContainer}>
            <Ionicons name="bulb" size={20} color="#FFA000" />
            <Text style={styles.tipText}>
              Continue treatment for 1-2 weeks after symptoms disappear to prevent recurrence. The fungus may still be present even after symptoms improve.
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
  treatmentCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  treatmentTitle: {
    fontSize: 17,
    fontFamily: 'JetBrainsMono-Bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  treatmentDescription: {
    fontSize: 14,
    color: '#444',
    fontFamily: 'JetBrainsMono-Regular',
    marginBottom: 12,
    lineHeight: 20,
  },
  detailSection: {
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'JetBrainsMono-Bold',
    color: '#2c3e50',
    marginBottom: 2,
  },
  detailText: {
    fontSize: 14,
    color: '#444',
    fontFamily: 'JetBrainsMono-Regular',
    lineHeight: 20,
  },
  listContainer: {
    marginLeft: 8,
    marginTop: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bulletIcon: {
    marginTop: 3,
    marginRight: 8,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    color: '#444',
    fontFamily: 'JetBrainsMono-Regular',
    lineHeight: 20,
  },
  noteBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(92, 107, 192, 0.1)',
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
  },
  noteText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    color: '#2c3e50',
    fontFamily: 'JetBrainsMono-Italic',
    lineHeight: 18,
  },
  warningCard: {
    backgroundColor: '#FFEBEE',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  warningTitle: {
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Bold',
    color: '#D32F2F',
    marginLeft: 8,
  },
  warningList: {
    paddingLeft: 8,
  },
  warningItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  warningText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#D32F2F',
    fontFamily: 'JetBrainsMono-Regular',
    lineHeight: 20,
  },
  tipContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  tipText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#8e7d0b',
    fontFamily: 'JetBrainsMono-Regular',
    lineHeight: 20,
  },
});

export default Treatment;
