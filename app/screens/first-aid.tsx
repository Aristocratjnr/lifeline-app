import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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
  primaryButton: string;
  cardText: string;
  headerCard: string;
}

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
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Colors based on theme
  const colors: ColorScheme = {
    background: isDarkMode ? '#121212' : '#F8F9FA',
    card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#333333',
    textSecondary: isDarkMode ? '#B0B0B0' : '#666666',
    border: isDarkMode ? '#333333' : '#E0E0E0',
    emergencyText: isDarkMode ? '#FF9E9E' : '#E53935',
    buttonBackground: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    primaryButton: isDarkMode ? '#FF6B6B' : '#E53935',
    cardText: isDarkMode ? '#B0B0B0' : '#444444',
    headerCard: isDarkMode ? '#2A2A2A' : '#FFFFFF',
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
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity 
                style={[styles.backButton, { backgroundColor: colors.buttonBackground }]}
                onPress={() => router.back()}
              >
                <MaterialIcons name="arrow-back" size={24} color={colors.text} />
              </TouchableOpacity>
              
              <Text style={[styles.headerTitle, { color: colors.text }]}>FIRST AID</Text>
              
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

            {/* Content */}
            <View style={styles.contentContainer}>
              <View style={[styles.headerCard, { backgroundColor: colors.headerCard }]}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>First Aid Basics</Text>
                <Text style={[styles.paragraph, { color: colors.cardText }]}>
                  First aid is the immediate care given to a person who has been injured or is suddenly taken ill. It includes self-help and home care if medical assistance is not available or delayed.
                </Text>
              </View>
              
              <Text style={[styles.sectionSubtitle, { color: colors.text }]}>Essential First Aid Principles</Text>
              
              <View style={styles.cardsContainer}>
                {firstAidPrinciples.map((item) => (
                  <View key={item.id} style={[styles.card, { backgroundColor: colors.card }]}>
                    <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
                      <Ionicons name={item.icon} size={24} color={item.color} />
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
                      <Text style={[styles.cardText, { color: colors.textSecondary }]}>{item.description}</Text>
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[styles.primaryButton, { backgroundColor: colors.primaryButton }]}
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
    flex: 1,
  },
  headerCard: {
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
    fontFamily: 'JetBrainsMono-Bold',
  },
  sectionSubtitle: {
    fontSize: 18,
    fontFamily: 'JetBrainsMono-Bold',
    marginTop: 20,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
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
  },
  buttonContainer: {
    paddingHorizontal: 4,
  },
  primaryButton: {
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
    marginBottom: 4,
    fontFamily: 'JetBrainsMono-Bold',
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'JetBrainsMono-Regular',
  },
});
