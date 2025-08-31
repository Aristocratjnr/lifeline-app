import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Define the color scheme interface
interface ColorScheme {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  emergencyText: string;
  buttonBackground: string;
  purpleAccent: string;
  termCard: string;
  noteBox: string;
  iconBackground: string;
}

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
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Colors based on theme
  const colors: ColorScheme = {
    background: isDarkMode ? '#121212' : '#F8F9FA',
    card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#333333',
    textSecondary: isDarkMode ? '#B0B0B0' : '#555555',
    border: isDarkMode ? '#333333' : '#E0E0E0',
    emergencyText: isDarkMode ? '#FF9E9E' : '#E53935',
    buttonBackground: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    purpleAccent: isDarkMode ? '#B39DDB' : '#5E35B1',
    termCard: isDarkMode ? '#2A2A2A' : '#FFFFFF',
    noteBox: isDarkMode ? 'rgba(179, 157, 219, 0.1)' : '#F3E5F5',
    iconBackground: isDarkMode ? 'rgba(179, 157, 219, 0.2)' : '#F3E5F5',
  };

  const [fontsLoaded] = useFonts({
    'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('@/assets/fonts/JetBrainsMono-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      
      <ImageBackground 
        source={require('@/assets/images/blur.png')}
        style={[styles.backgroundImage, { backgroundColor: colors.background }]}
        resizeMode="cover"
      >
        <View style={[styles.overlay, { backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.6)' }]} />
        <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? 'rgba(18, 18, 18, 0.89)' : 'rgba(255, 255, 255, 0.74)' }]} edges={['top', 'right', 'left']}>
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <TouchableOpacity 
                style={[styles.backButton, { backgroundColor: colors.buttonBackground }]}
                onPress={() => router.back()}
              >
                <MaterialIcons name="arrow-back" size={24} color={colors.text} />
              </TouchableOpacity>
              
              <Text style={[styles.headerTitle, { color: colors.purpleAccent }]}>GLOSSARY</Text>
              
              <View style={[styles.headerRight, { backgroundColor: colors.buttonBackground }]}>
                <TouchableOpacity 
                  style={[styles.menuButton, styles.headerIconButton]}
                  onPress={() => router.push('/screens/guest')}
                >
                  <MaterialIcons name="person" size={24} color={colors.emergencyText} />
                </TouchableOpacity>
                <View style={[styles.verticalLine, { backgroundColor: colors.border }]} />
                <TouchableOpacity 
                  style={[styles.menuButton, styles.headerIconButton]}
                  onPress={() => router.push('/settings')}
                >
                  <MaterialIcons name="more-vert" size={24} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.contentContainer, { backgroundColor: colors.card }]}>
              <Text style={[styles.sectionTitle, { color: colors.purpleAccent }]}>First Aid Terms & Definitions</Text>
              <Text style={[styles.introText, { color: colors.textSecondary }]}>
                Common medical terms and abbreviations used in first aid and emergency situations:
              </Text>
              
              <View style={styles.termsContainer}>
                {terms.map((item, index) => (
                  <View key={index} style={[styles.termCard, { 
                    backgroundColor: colors.termCard,
                    borderColor: isDarkMode ? colors.border : '#EDE7F6' 
                  }]}>
                    <View style={styles.termHeader}>
                      <MaterialIcons 
                        name={item.icon} 
                        size={24} 
                        color={colors.purpleAccent} 
                        style={[styles.termIcon, { backgroundColor: colors.iconBackground }]} 
                      />
                      <Text style={[styles.term, { color: colors.purpleAccent }]}>{item.term}</Text>
                    </View>
                    <Text style={[styles.definition, { color: colors.textSecondary }]}>{item.definition}</Text>
                  </View>
                ))}
              </View>
              
              <View style={[styles.noteBox, { backgroundColor: colors.noteBox }]}>
                <MaterialIcons name="info" size={24} color={colors.purpleAccent} style={styles.noteIcon} />
                <Text style={[styles.noteText, { color: colors.purpleAccent }]}>
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
    zIndex: 1,
  },
  container: {
    flex: 1,
    zIndex: 2,
  },
  loadingContainer: {
    flex: 1,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
    textAlign: 'center',
    flex: 1,
    letterSpacing: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  contentContainer: {
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
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  introText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  termsContainer: {
    marginBottom: 20,
  },
  termCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
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
  },
  definition: {
    fontSize: 15,
    lineHeight: 22,
    paddingLeft: 36, // Align with icon
  },
  noteBox: {
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
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
