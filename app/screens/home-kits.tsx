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
  checklistItem: string;
  iconBackground: string;
  tipBox: string;
  greenAccent: string;
}

interface KitItem {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const essentialItems: KitItem[] = [
  { name: 'Adhesive bandages (various sizes)', icon: 'bandage' },
  { name: 'Sterile gauze pads', icon: 'medkit-outline' },
  { name: 'Adhesive tape', icon: 'bandage-outline' },
  { name: 'Antiseptic wipes', icon: 'medkit' },
  { name: 'Antibiotic ointment', icon: 'flask' },
  { name: 'Hydrocortisone cream', icon: 'flask-outline' },
  { name: 'Tweezers', icon: 'cut' },
  { name: 'Scissors', icon: 'cut-outline' },
  { name: 'Thermometer', icon: 'thermometer' },
  { name: 'Disposable gloves', icon: 'hand-right' },
  { name: 'CPR face shield', icon: 'shield' },
  { name: 'Instant cold packs', icon: 'snow' },
  { name: 'First aid manual', icon: 'book' },
  { name: 'Emergency contact numbers', icon: 'call' },
  { name: 'Prescription medications', icon: 'medical' },
  { name: 'Pain relievers', icon: 'medical-outline' },
  { name: 'Antihistamines', icon: 'medkit-sharp' },
  { name: 'Hydrogen peroxide', icon: 'flask-sharp' },
  { name: 'Thermal blanket', icon: 'sunny' },
  { name: 'Flashlight with extra batteries', icon: 'flashlight' }
];

export default function HomeKitsScreen() {
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
    checklistItem: isDarkMode ? '#2A2A2A' : '#FFFFFF',
    iconBackground: isDarkMode ? 'rgba(76, 175, 80, 0.2)' : '#E8F5E9',
    tipBox: isDarkMode ? 'rgba(76, 175, 80, 0.1)' : '#E8F5E9',
    greenAccent: isDarkMode ? '#81C784' : '#2E7D32',
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
              
              <Text style={[styles.headerTitle, { color: colors.text }]}>HOME KITS</Text>
              
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
              <Text style={[styles.sectionTitle, { color: colors.greenAccent }]}>First Aid Kit Items</Text>
              <Text style={[styles.introText, { color: colors.textSecondary }]}>
                A well-stocked first aid kit is a must for every home. Here&apos;s what you should include:
              </Text>
              
              <View style={styles.checklistContainer}>
                {essentialItems.map((item, index) => (
                  <View key={index} style={[styles.checklistItem, { 
                    backgroundColor: colors.checklistItem,
                    borderColor: colors.border 
                  }]}>
                    <View style={[styles.iconContainer, { backgroundColor: colors.iconBackground }]}>
                      <Ionicons name={item.icon} size={20} color={colors.greenAccent} />
                    </View>
                    <Text style={[styles.checklistText, { color: colors.text }]}>{item.name}</Text>
                  </View>
                ))}
              </View>
              
              <View style={[styles.tipBox, { backgroundColor: colors.tipBox }]}>
                <MaterialIcons name="lightbulb" size={24} color={colors.greenAccent} style={styles.tipIcon} />
                <View>
                  <Text style={[styles.tipTitle, { color: colors.greenAccent }]}>Kit Maintenance Tips:</Text>
                  <View style={styles.tipList}>
                    <View style={styles.bulletPoint}>
                      <View style={[styles.bullet, { backgroundColor: colors.greenAccent }]} />
                      <Text style={[styles.tipText, { color: colors.greenAccent }]}>Check your kit every 6 months</Text>
                    </View>
                    <View style={styles.bulletPoint}>
                      <View style={[styles.bullet, { backgroundColor: colors.greenAccent }]} />
                      <Text style={[styles.tipText, { color: colors.greenAccent }]}>Replace expired items immediately</Text>
                    </View>
                    <View style={styles.bulletPoint}>
                      <View style={[styles.bullet, { backgroundColor: colors.greenAccent }]} />
                      <Text style={[styles.tipText, { color: colors.greenAccent }]}>Keep in a cool, dry place</Text>
                    </View>
                    <View style={styles.bulletPoint}>
                      <View style={[styles.bullet, { backgroundColor: colors.greenAccent }]} />
                      <Text style={[styles.tipText, { color: colors.greenAccent }]}>Make sure everyone in the household knows where it is</Text>
                    </View>
                  </View>
                </View>
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
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'JetBrainsMono-Bold',
    letterSpacing: 0.5,
  },
  introText: {
    fontSize: 15,
    marginBottom: 24,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 8,
    fontFamily: 'JetBrainsMono-Regular',
  },
  checklistContainer: {
    marginBottom: 20,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checklistText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  tipBox: {
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  tipIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  tipTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'JetBrainsMono-Bold',
  },
  tipList: {
    flex: 1,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginTop: 8,
    marginRight: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'JetBrainsMono-Regular',
  },
});
