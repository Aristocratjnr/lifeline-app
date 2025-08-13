import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const firstAidPrinciples: {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}[] = [
  {
    id: '1',
    title: 'Assess the Situation',
    description: 'Check for danger and ensure the area is safe before approaching the injured person.',
    icon: 'eye-outline',
    color: '#E53935'
  },
  {
    id: '2',
    title: 'Call for Help',
    description: 'Dial emergency services immediately if the situation is serious.',
    icon: 'call-outline',
    color: '#1E88E5'
  },
  {
    id: '3',
    title: 'Provide Comfort',
    description: 'Keep the person calm and comfortable while waiting for help.',
    icon: 'heart-outline',
    color: '#43A047'
  },
  {
    id: '4',
    title: 'Stop Bleeding',
    description: 'Apply direct pressure to wounds with a clean cloth or bandage.',
    icon: 'water-outline',
    color: '#F4511E'
  },
  {
    id: '5',
    title: 'Check Breathing',
    description: 'Ensure the person is breathing. If not, begin CPR if trained.',
    icon: 'pulse-outline',
    color: '#8E24AA'
  },
  {
    id: '6',
    title: 'Prevent Shock',
    description: 'Have the person lie down and elevate their legs if possible.',
    icon: 'alert-circle-outline',
    color: '#FB8C00'
  },
];

export default function FirstAidScreen() {
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
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <MaterialIcons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              
              <Text style={styles.headerTitle}>FIRST AID</Text>
              
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

            {/* Content */}
            <View style={styles.contentContainer}>
              <View style={styles.headerCard}>
                <Text style={styles.sectionTitle}>First Aid Basics</Text>
                <Text style={styles.paragraph}>
                  First aid is the immediate care given to a person who has been injured or is suddenly taken ill. It includes self-help and home care if medical assistance is not available or delayed.
                </Text>
              </View>
              
              <Text style={styles.sectionSubtitle}>Essential First Aid Principles</Text>
              
              <View style={styles.cardsContainer}>
                {firstAidPrinciples.map((item) => (
                  <View key={item.id} style={styles.card}>
                    <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
                      <Ionicons name={item.icon} size={24} color={item.color} />
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={styles.cardText}>{item.description}</Text>
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.primaryButton}
                  onPress={() => router.push('/screens/firstAidGuide')}
                >
                  <MaterialIcons name="medical-services" size={20} color="white" style={styles.buttonIcon} />
                  <Text style={styles.primaryButtonText}>View First Aid Guide</Text>
                </TouchableOpacity>
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
    padding: 16,
    paddingTop: 10,
    paddingBottom: 30,
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
    flex: 1,
  },
  headerCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1a1a1a',
    fontFamily: 'JetBrainsMono-Bold',
  },
  sectionSubtitle: {
    fontSize: 18,
    fontFamily: 'JetBrainsMono-Bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 16,
  },
  listContainer: {
    marginBottom: 24,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E53935',
    marginTop: 10,
    marginRight: 12,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
  },
  buttonContainer: {
    paddingHorizontal: 4,
  },
  primaryButton: {
    backgroundColor: '#E53935',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Bold',
  },
  buttonIcon: {
    marginRight: 8,
  },
  cardsContainer: {
    marginBottom: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
    fontFamily: 'JetBrainsMono-Bold',
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontFamily: 'JetBrainsMono-Regular',
  },
});
