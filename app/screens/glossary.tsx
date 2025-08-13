import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type TermItem = {
  term: string;
  definition: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

const terms: TermItem[] = [
  { term: 'ABCs', definition: 'Airway, Breathing, Circulation - the primary survey in first aid', icon: 'airline-seat-recline-normal' },
  { term: 'AED', definition: 'Automated External Defibrillator - device to help with cardiac arrest', icon: 'heart-broken' },
  { term: 'CPR', definition: 'Cardiopulmonary Resuscitation - emergency procedure for cardiac arrest', icon: 'healing' },
  { term: 'DNR', definition: 'Do Not Resuscitate - medical order indicating no CPR', icon: 'do-not-disturb' },
  { term: 'EMS', definition: 'Emergency Medical Services - emergency medical response system', icon: 'emergency' },
  { term: 'First Aid', definition: 'Immediate care given to someone injured or suddenly ill', icon: 'medical-services' },
  { term: 'Heimlich', definition: 'Abdominal thrusts to relieve choking', icon: 'front-hand' },
  { term: 'PPE', definition: 'Personal Protective Equipment - gear to protect first aid providers', icon: 'security' },
  { term: 'RICE', definition: 'Rest, Ice, Compression, Elevation - treatment for sprains/strains', icon: 'compress' },
  { term: 'Shock', definition: 'Life-threatening condition where blood flow is inadequate', icon: 'flash-on' },
];

export default function GlossaryScreen() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('@/assets/fonts/JetBrainsMono-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <ImageBackground 
        source={require('@/assets/images/blur.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <MaterialIcons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              
              <Text style={styles.headerTitle}>GLOSSARY</Text>
              
              <View style={styles.headerRight}>
                <TouchableOpacity 
                  style={[styles.menuButton, styles.headerIconButton]}
                  onPress={() => router.push('/screens/guest')}
                >
                  <MaterialIcons name="person" size={24} color="#E53935" />
                </TouchableOpacity>
                <View style={styles.verticalLine} />
                <TouchableOpacity 
                  style={[styles.menuButton, styles.headerIconButton]}
                  onPress={() => router.push('/settings')}
                >
                  <MaterialIcons name="more-vert" size={24} color="#666" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.contentContainer}>
              <Text style={styles.sectionTitle}>First Aid Terms & Definitions</Text>
              <Text style={styles.introText}>
                Common medical terms and abbreviations used in first aid and emergency situations:
              </Text>
              
              <View style={styles.termsContainer}>
                {terms.map((item, index) => (
                  <View key={index} style={styles.termCard}>
                    <View style={styles.termHeader}>
                      <MaterialIcons name={item.icon} size={24} color="#5E35B1" style={styles.termIcon} />
                      <Text style={styles.term}>{item.term}</Text>
                    </View>
                    <Text style={styles.definition}>{item.definition}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.noteBox}>
                <MaterialIcons name="info" size={24} color="#5E35B1" style={styles.noteIcon} />
                <Text style={styles.noteText}>
                  This glossary provides general information and is not a substitute for professional medical advice.
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

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
    backgroundColor: 'rgba(255, 255, 255, 0.74)',
    zIndex: 2,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
    paddingHorizontal: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5E35B1',
    fontFamily: 'JetBrainsMono-Bold',
    textAlign: 'center',
    flex: 1,
    letterSpacing: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 20,
    paddingHorizontal: 4,
  },
  menuButton: {
    padding: 8,
  },
  headerIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalLine: {
    width: 1,
    height: 24,
    backgroundColor: '#E0E0E0',
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 26,
    fontFamily: 'JetBrainsMono-Bold',
    color: '#5E35B1',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  introText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
    marginBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  termsContainer: {
    marginBottom: 20,
  },
  termCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EDE7F6',
    shadowColor: '#5E35B1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  termHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  termIcon: {
    marginRight: 12,
    backgroundColor: '#F3E5F5',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  term: {
    fontSize: 18,
    fontFamily: 'JetBrainsMono-Bold',
    color: '#5E35B1',
  },
  definition: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    paddingLeft: 36, // Align with icon
  },
  noteBox: {
    backgroundColor: '#F3E5F5',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  noteIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  noteText: {
    flex: 1,
    color: '#5E35B1',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
