import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ImageBackground, Modal, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Interface for info hub items
interface InfoHubItem {
  id: string;
  title: string;
  image: any; // Will be used with require()
  color: string;
  description: string;
  route?: string;
  comingSoon?: boolean;
}

export default function InfoHubScreen() {
  const router = useRouter();
  const [showGlossaryModal, setShowGlossaryModal] = useState(false);

  // Info hub items data
  const infoHubItems: InfoHubItem[] = [
    {
      id: '1',
      title: 'What is First Aid?',
      image: require('@/assets/images/first-aid.png'),
      color: '#E53935',
      description: 'Learn the fundamentals of first aid care',
      route: '/screens/first-aid',
    },
    {
      id: '2',
      title: 'Myth Buster',
      image: require('@/assets/images/myth.png'),
      color: '#FFB300',
      description: 'Debunk common first aid myths and misconceptions',
      route: '/screens/myth-buster',
    },
    {
      id: '3',
      title: 'Home Kits To Get',
      image: require('@/assets/images/kit.png'),
      color: '#43A047',
      description: 'Essential items to include in your first aid kit',
      route: '/screens/home-kits',
    },
    {
      id: '4',
      title: 'Glossary',
      image: require('@/assets/images/book.png'),
      color: '#5E35B1',
      description: 'Key medical terms explained',
      route: '/screens/glossary',
    },
  ];

  // Load JetBrains Mono font
  const [fontsLoaded] = useFonts({
    'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('@/assets/fonts/JetBrainsMono-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer} />;
  }

  const handleItemPress = (item: InfoHubItem) => {
    if (item.route) {
      router.push(item.route as any);
    }
  };

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
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <MaterialIcons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              
              <Text style={styles.headerTitle}>INFO HUB</Text>
              
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

            {/* Info Hub Items */}
            <View style={styles.itemsContainer}>
              {infoHubItems.map((item, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={[styles.infoCard, { backgroundColor: item.color + '15' }]}
                  onPress={() => {
                    switch(index) {
                      case 0: // First Aid
                        router.push('/screens/first-aid');
                        break;
                      case 1: // Myth Buster
                        router.push('/screens/myth-buster');
                        break;
                      case 2: // Home Kits
                        router.push('/screens/home-kits');
                        break;
                      case 3: // Glossary
                        router.push('/screens/glossary');
                        break;
                    }
                  }}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#FFFFFF', '#F8F9FA']}
                    style={styles.cardGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.cardContent}>
                      <View style={styles.iconContainer}>
                        <Image 
                          source={item.image} 
                          style={styles.iconImage} 
                          resizeMode="contain"
                        />
                      </View>
                      
                      <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardDescription}>{item.description}</Text>
                      </View>
                      
                      <View style={styles.arrowContainer}>
                        <MaterialIcons name="chevron-right" size={24} color="#666" />
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>

            {/* Coming Soon Modal for Glossary */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={showGlossaryModal}
              onRequestClose={() => setShowGlossaryModal(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setShowGlossaryModal(false)}
                  >
                    <MaterialIcons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                  
                  <View style={styles.modalHeader}>
                    <MaterialIcons name="book" size={48} color="#5E35B1" />
                    <Text style={styles.modalTitle}>Glossary Coming Soon!</Text>
                    <Text style={styles.modalSubtitle}>
                      We&apos;re working on creating a comprehensive glossary of medical and first aid terms to help you better understand emergency care.
                    </Text>
                  </View>

                  <View style={styles.modalBody}>
                    <View style={styles.featureItem}>
                      <View style={[styles.featureIcon, { backgroundColor: 'rgba(94, 53, 177, 0.1)' }]}>
                        <MaterialIcons name="search" size={24} color="#5E35B1" />
                      </View>
                      <Text style={styles.featureText}>Searchable medical terms</Text>
                    </View>
                    
                    <View style={styles.featureItem}>
                      <View style={[styles.featureIcon, { backgroundColor: 'rgba(94, 53, 177, 0.1)' }]}>
                        <MaterialIcons name="translate" size={24} color="#5E35B1" />
                      </View>
                      <Text style={styles.featureText}>Multiple language support</Text>
                    </View>
                    
                    <View style={styles.featureItem}>
                      <View style={[styles.featureIcon, { backgroundColor: 'rgba(94, 53, 177, 0.1)' }]}>
                        <MaterialIcons name="bookmark" size={24} color="#5E35B1" />
                      </View>
                      <Text style={styles.featureText}>Bookmark important terms</Text>
                    </View>
                  </View>

                  <TouchableOpacity 
                    style={styles.notifyButton}
                    onPress={() => setShowGlossaryModal(false)}
                  >
                    <Text style={styles.notifyButtonText}>Got it!</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
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
  
  // Header Styles
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
  menuButton: {
    padding: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 20,
    paddingHorizontal: 4,
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

  // Items Container
  itemsContainer: {
    gap: 16,
  },

  // Info Card Styles
  infoCard: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    backgroundColor: '#FFFFFF',
  },
  cardGradient: {
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconImage: {
    width: 32,
    height: 32,
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'JetBrainsMono-Bold',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#666',
    fontFamily: 'JetBrainsMono-Regular',
    lineHeight: 18,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
    padding: 4,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'JetBrainsMono-Bold',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'JetBrainsMono-Regular',
  },
  modalBody: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontFamily: 'JetBrainsMono-Regular',
  },
  notifyButton: {
    backgroundColor: '#5E35B1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  notifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
  },
});