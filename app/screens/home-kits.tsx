import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

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
              
              <Text style={styles.headerTitle}>HOME KITS</Text>
              
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
              <Text style={styles.sectionTitle}>First Aid Kit Items</Text>
              <Text style={styles.introText}>
                A well-stocked first aid kit is a must for every home. Here's what you should include:
              </Text>
              
              <View style={styles.checklistContainer}>
                {essentialItems.map((item, index) => (
                  <View key={index} style={styles.checklistItem}>
                    <View style={styles.iconContainer}>
                      <Ionicons name={item.icon} size={20} color="#2E7D32" />
                    </View>
                    <Text style={styles.checklistText}>{item.name}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.tipBox}>
                <MaterialIcons name="lightbulb" size={24} color="#43A047" style={styles.tipIcon} />
                <View>
                  <Text style={styles.tipTitle}>Kit Maintenance Tips:</Text>
                  <View style={styles.tipList}>
                    <View style={styles.bulletPoint}>
                      <View style={styles.bullet} />
                      <Text style={styles.tipText}>Check your kit every 6 months</Text>
                    </View>
                    <View style={styles.bulletPoint}>
                      <View style={styles.bullet} />
                      <Text style={styles.tipText}>Replace expired items immediately</Text>
                    </View>
                    <View style={styles.bulletPoint}>
                      <View style={styles.bullet} />
                      <Text style={styles.tipText}>Keep in a cool, dry place</Text>
                    </View>
                    <View style={styles.bulletPoint}>
                      <View style={styles.bullet} />
                      <Text style={styles.tipText}>Make sure everyone in the household knows where it is</Text>
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
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'JetBrainsMono-Bold',
    letterSpacing: 0.5,
  },
  introText: {
    fontSize: 15,
    color: '#555',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
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
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checklistText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  tipBox: {
    backgroundColor: '#E8F5E9',
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
    color: '#2E7D32',
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
    backgroundColor: '#2E7D32',
    marginTop: 8,
    marginRight: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#2E7D32',
    lineHeight: 22,
    fontFamily: 'JetBrainsMono-Regular',
  },
});
