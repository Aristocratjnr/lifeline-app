import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useEffect } from 'react';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Load JetBrains Mono font
const loadFonts = async () => {
  await Font.loadAsync({
    'JetBrainsMono': require('../../assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('../../assets/fonts/JetBrainsMono-Bold.ttf'),
  });
};

export default function OfflineContent() {
  const navigation = useNavigation();

  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <ImageBackground 
      source={require('../../assets/images/blur.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>OFFLINE CONTENT{'\n'}MANAGEMENT</Text>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Coming Soon Image */}
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../assets/images/coming.png')} 
              style={styles.comingSoonImage} 
              resizeMode="contain"
            />
          </View>

          {/* Description Text */}
          <Text style={styles.descriptionText}>
            Be prepared for any situation. Access all your Lifeline guides anytime, anywhere, even without internet. Download content for offline use - This feature is on its way!
          </Text>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
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
    backgroundColor: 'rgba(255, 255, 255, 0.89)',
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Bold',
    marginRight: 30,
    lineHeight: 24,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 280,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoonImage: {
    width: '100%',
    height: '100%',
  },
  descriptionText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#333',
  },
});