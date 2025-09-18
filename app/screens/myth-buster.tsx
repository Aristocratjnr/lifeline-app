import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, Modal, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Define the color scheme interface
interface ColorScheme {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  emergencyText: string;
  modalBackground: string;
  modalContent: string;
  buttonBackground: string;
  mythCard: string;
  tipBox: string;
  factBubble: string;
}

interface Myth {
  id: string;
  myth: string;
  fact: string;
  explanation: string;
  source?: string;
}

const myths: Myth[] = [
  {
    id: '1',
    myth: 'Put butter on a burn',
    fact: 'Cool running water',
    explanation: 'Butter can trap heat and bacteria, potentially causing infection. Instead, cool the burn with running water for 10-15 minutes to reduce heat and pain.',
    source: 'American Burn Association'
  },
  {
    id: '2',
    myth: 'Tilt head back for a nosebleed',
    fact: 'Lean forward and pinch nostrils',
    explanation: 'Tilting the head back can cause blood to run down the throat, potentially causing choking or vomiting. Instead, lean forward slightly and pinch the soft part of the nose for 10 minutes.',
    source: 'American Red Cross'
  },
  {
    id: '3',
    myth: 'Rub frostbitten skin',
    fact: 'Soak in warm water',
    explanation: 'Rubbing frostbitten skin can cause tissue damage. Instead, soak the affected area in warm (not hot) water (100-105°F) until normal color returns.',
    source: 'Mayo Clinic'
  },
  {
    id: '4',
    myth: 'Use a tourniquet for bleeding',
    fact: 'Apply direct pressure',
    explanation: 'Tourniquets can cause more harm than good if used incorrectly. For most bleeding, apply firm, direct pressure with a clean cloth for at least 5 minutes.',
    source: 'American College of Surgeons'
  },
  {
    id: '5',
    myth: 'Suck out snake venom',
    fact: 'Keep still and call for help',
    explanation: 'Attempting to suck out venom can introduce bacteria and doesn\'t remove significant venom. Keep the affected limb at or below heart level and seek immediate medical attention.',
    source: 'World Health Organization'
  },
];

export default function MythBusterScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [selectedMyth, setSelectedMyth] = useState<Myth | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Colors based on theme
  const colors: ColorScheme = {
    background: isDarkMode ? '#121212' : '#F8F9FA',
    card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#333333',
    textSecondary: isDarkMode ? '#B0B0B0' : '#666666',
    border: isDarkMode ? '#333333' : '#E0E0E0',
    emergencyText: isDarkMode ? '#FF9E9E' : '#E53935',
    modalBackground: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
    modalContent: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    buttonBackground: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    mythCard: isDarkMode ? '#2A2A2A' : '#FFF9E6',
    tipBox: isDarkMode ? '#2A2A2A' : '#FFF8E1',
    factBubble: isDarkMode ? '#1F2A1A' : '#F1F8E9',
  };

  const [fontsLoaded] = useFonts({
    'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('@/assets/fonts/JetBrainsMono-Bold.ttf'),
  });

  const handleMythPress = (myth: Myth) => {
    setSelectedMyth(myth);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedMyth(null), 300); // Wait for animation to complete
  };

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
              
              <Text style={[styles.headerTitle, { color: colors.text }]}>MYTH BUSTER</Text>
              
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
              <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFD54F' : '#FFB300' }]}>Common First Aid Myths</Text>
              <Text style={[styles.introText, { color: colors.textSecondary }]}>
                Tap on any myth card to learn the correct first aid practice and why the myth is dangerous.
              </Text>
              
              <View style={styles.mythsList}>
                {myths.map((item) => (
                  <TouchableOpacity 
                    key={item.id}
                    style={[styles.mythCard, { backgroundColor: colors.mythCard }]}
                    onPress={() => handleMythPress(item)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.mythHeader}>
                      <MaterialIcons name="warning" size={20} color="#E65100" style={styles.icon} />
                      <Text style={[styles.mythText, { color: isDarkMode ? '#FFAB40' : '#E65100' }]}>Myth:</Text>
                      <Text style={[styles.mythContent, { color: colors.text }]} numberOfLines={2} ellipsizeMode="tail">{item.myth}</Text>
                    </View>
                    <View style={styles.factHeader}>
                      <MaterialIcons name="check-circle" size={20} color="#2E7D32" style={styles.icon} />
                      <Text style={[styles.factText, { color: isDarkMode ? '#81C784' : '#2E7D32' }]}>Fact:</Text>
                      <Text style={[styles.factContent, { color: colors.textSecondary }]} numberOfLines={1} ellipsizeMode="tail">{item.fact}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              
              <View style={[styles.tipBox, { backgroundColor: colors.tipBox }]}>
                <MaterialIcons name="lightbulb" size={24} color="#FFB300" style={styles.tipIcon} />
                <Text style={[styles.tipText, { color: colors.textSecondary }]}>
                  Always verify first aid information with reliable sources like the Red Cross or medical professionals.
                </Text>
              </View>

              {/* Myth Detail Modal */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
              >
                <View style={[styles.modalOverlay, { backgroundColor: colors.modalBackground }]}>
                  <TouchableOpacity 
                    style={styles.modalBackground} 
                    activeOpacity={1}
                    onPress={closeModal}
                  >
                    <View style={[styles.modalContent, { backgroundColor: colors.modalContent }]}>
                      <TouchableOpacity 
                        style={styles.closeButton}
                        onPress={closeModal}
                      >
                        <MaterialIcons name="close" size={24} color={colors.textSecondary} />
                      </TouchableOpacity>
                      
                      {selectedMyth && (
                        <>
                          <View style={styles.modalHeader}>
                            <View style={styles.modalMythHeader}>
                              <MaterialIcons name="warning" size={20} color="#E65100" style={styles.modalIcon} />
                              <Text style={[styles.modalMythLabel, { color: isDarkMode ? '#FFAB40' : '#E65100' }]}>Myth:</Text>
                            </View>
                            <Text style={[styles.modalMythText, { color: colors.text }]}>{selectedMyth.myth}</Text>
                            
                            <View style={[styles.factBubble, { backgroundColor: colors.factBubble }]}>
                              <View style={styles.factHeader}>
                                <MaterialIcons name="check-circle" size={20} color="#2E7D32" style={styles.modalIcon} />
                                <Text style={[styles.factBubbleText, { color: isDarkMode ? '#81C784' : '#E65100' }]}>Fact</Text>
                              </View>
                              <Text style={[styles.factBubbleFact, { color: colors.text }]}>{selectedMyth.fact}</Text>
                            </View>
                          </View>
                          
                          <View style={styles.modalBody}>
                            <Text style={[styles.modalSectionTitle, { color: colors.text }]}>Why it&apos;s wrong:</Text>
                            <Text style={[styles.explanationText, { color: colors.textSecondary }]}>{selectedMyth.explanation}</Text>
                            
                            {selectedMyth.source && (
                              <Text style={[styles.sourceText, { color: colors.textSecondary }]}>
                                Source: {selectedMyth.source}
                              </Text>
                            )}
                          </View>
                          
                          <TouchableOpacity 
                            style={styles.gotItButton}
                            onPress={closeModal}
                          >
                            <View style={styles.gotItButtonContent}>
                              <MaterialIcons name="check-circle" size={20} color="#FFFFFF" style={styles.gotItIcon} />
                              <Text style={styles.gotItButtonText}>Got it!</Text>
                            </View>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </Modal>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
    textAlign: 'center',
    flex: 1,
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
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'JetBrainsMono-Bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  introText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  mythsList: {
    marginBottom: 20,
  },
  mythCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  icon: {
    marginRight: 8,
  },
  mythHeader: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  mythText: {
    fontFamily: 'JetBrainsMono-Bold',
    marginRight: 8,
  },
  mythContent: {
    flex: 1,
    fontFamily: 'JetBrainsMono-Bold',
    fontStyle: 'italic',
  },
  factHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  factText: {
    fontFamily: 'JetBrainsMono-Bold',
    marginRight: 8,
  },
  factContent: {
    flex: 1,
    lineHeight: 22,
  },
  tipBox: {
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    borderRadius: 20,
    padding: 24,
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  modalHeader: {
    marginBottom: 20,
    paddingRight: 20,
  },
  modalMythLabel: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
    marginBottom: 8,
  },
  modalMythText: {
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Bold',
    marginBottom: 20,
    lineHeight: 26,
  },
  factBubble: {
    borderRadius: 12,
    padding: 16,
    elevation: 1,
  },
  modalMythHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  modalIcon: {
    marginRight: 8,
  },
  factBubbleText: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
    marginBottom: 4,
  },
  factBubbleFact: {
    fontSize: 16,
    lineHeight: 22,
  },
  modalBody: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontFamily: 'JetBrainsMono-Bold',
    marginBottom: 12,
  },
  explanationText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  sourceText: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  gotItButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 3,
  },
  gotItButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gotItIcon: {
    marginRight: 8,
  },
  gotItButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Bold',
  },
});
