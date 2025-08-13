import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, Modal, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

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
  const [selectedMyth, setSelectedMyth] = useState<Myth | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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
              
              <Text style={styles.headerTitle}>MYTH BUSTER</Text>
              
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
              <Text style={styles.sectionTitle}>Common First Aid Myths</Text>
              <Text style={styles.introText}>
                Tap on any myth card to learn the correct first aid practice and why the myth is dangerous.
              </Text>
              
              <View style={styles.mythsList}>
                {myths.map((item) => (
                  <TouchableOpacity 
                    key={item.id}
                    style={styles.mythCard}
                    onPress={() => handleMythPress(item)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.mythHeader}>
                      <MaterialIcons name="warning" size={20} color="#E65100" style={styles.icon} />
                      <Text style={styles.mythText}>Myth:</Text>
                      <Text style={styles.mythContent} numberOfLines={2} ellipsizeMode="tail">{item.myth}</Text>
                    </View>
                    <View style={styles.factHeader}>
                      <MaterialIcons name="check-circle" size={20} color="#2E7D32" style={styles.icon} />
                      <Text style={styles.factText}>Fact:</Text>
                      <Text style={styles.factContent} numberOfLines={1} ellipsizeMode="tail">{item.fact}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              
              <View style={styles.tipBox}>
                <MaterialIcons name="lightbulb" size={24} color="#FFB300" style={styles.tipIcon} />
                <Text style={styles.tipText}>
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
                <View style={styles.modalOverlay}>
                  <TouchableOpacity 
                    style={styles.modalBackground} 
                    activeOpacity={1}
                    onPress={closeModal}
                  >
                    <View style={styles.modalContent}>
                      <TouchableOpacity 
                        style={styles.closeButton}
                        onPress={closeModal}
                      >
                        <MaterialIcons name="close" size={24} color="#666" />
                      </TouchableOpacity>
                      
                      {selectedMyth && (
                        <>
                          <View style={styles.modalHeader}>
                            <View style={styles.modalMythHeader}>
                              <MaterialIcons name="warning" size={20} color="#E65100" style={styles.modalIcon} />
                              <Text style={styles.modalMythLabel}>Myth:</Text>
                            </View>
                            <Text style={styles.modalMythText}>{selectedMyth.myth}</Text>
                            
                            <View style={styles.factBubble}>
                              <View style={styles.factHeader}>
                                <MaterialIcons name="check-circle" size={20} color="#2E7D32" style={styles.modalIcon} />
                                <Text style={styles.factBubbleText}>Fact</Text>
                              </View>
                              <Text style={styles.factBubbleFact}>{selectedMyth.fact}</Text>
                            </View>
                          </View>
                          
                          <View style={styles.modalBody}>
                            <Text style={styles.modalSectionTitle}>Why it's wrong:</Text>
                            <Text style={styles.explanationText}>{selectedMyth.explanation}</Text>
                            
                            {selectedMyth.source && (
                              <Text style={styles.sourceText}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'JetBrainsMono-Bold',
    textAlign: 'center',
    flex: 1,
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
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'JetBrainsMono-Bold',
    color: '#FFB300',
    marginBottom: 16,
    textAlign: 'center',
  },
  introText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    marginBottom: 20,
    textAlign: 'center',
  },
  mythsList: {
    marginBottom: 20,
  },
  mythCard: {
    backgroundColor: '#FFF9E6',
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
    color: '#E65100',
    marginRight: 8,
  },
  mythContent: {
    flex: 1,
    fontFamily: 'JetBrainsMono-Bold',
    color: '#333',
    fontStyle: 'italic',
  },
  factHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  factText: {
    fontFamily: 'JetBrainsMono-Bold',
    color: '#2E7D32',
    marginRight: 8,
  },
  factContent: {
    flex: 1,
    color: '#444',
    lineHeight: 22,
  },
  tipBox: {
    backgroundColor: '#FFF8E1',
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
    color: '#5D4037',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
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
    color: '#E65100',
    fontSize: 16,
    marginBottom: 8,
  },
  modalMythText: {
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Bold',
    color: '#333',
    marginBottom: 20,
    lineHeight: 26,
  },
  factBubble: {
    backgroundColor: '#F1F8E9',
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
    color: '#E65100',
    fontSize: 14,
    marginBottom: 4,
  },
  factBubbleFact: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  modalBody: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontFamily: 'JetBrainsMono-Bold',
    color: '#333',
    marginBottom: 12,
  },
  explanationText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    marginBottom: 16,
  },
  sourceText: {
    fontSize: 13,
    color: '#666',
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
