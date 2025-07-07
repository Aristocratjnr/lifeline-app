import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  Image,
  ImageBackground,
  Linking,
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

export default function Help() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    loadFonts();
  }, []);

  const handleEmailPress = () => {
    Linking.openURL('mailto:support@gmail.com');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:0201346530');
  };

  const handleLiveChatPress = () => {
    // Navigate to AI Assistant screen
    router.push('/(tabs)/ai-assistant');
  };

  const handleDonatePress = () => {
    // Navigate to Donate screen
    router.push('/screens/donate');
  };

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
          <Text style={styles.headerTitle}>HELP</Text>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Doctor Image */}
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../assets/images/nurse.png')} 
              style={styles.helpImage} 
              resizeMode="contain"
            />
          </View>

          {/* Help Title */}
          <Text style={styles.helpTitle}>HOW CAN WE BE OF HELP?</Text>

          {/* Help Description */}
          <Text style={styles.helpText}>
            We&apos;re here to help! Whether you have a question about our services, need to schedule an appointment, or simply want to share your feedback, we&apos;re happy to hear from you.
          </Text>

          {/* Action Buttons */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.actionButton} onPress={handleDonatePress}>
              <MaterialIcons name="favorite" size={18} color="#E74C3C" style={styles.buttonIcon} />
              <Text style={styles.actionButtonText}>Donate?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleLiveChatPress}>
              <MaterialIcons name="chat" size={18} color="#2980B9" style={styles.buttonIcon} />
              <Text style={styles.actionButtonText}>Start Live Chat</Text>
            </TouchableOpacity>
          </View>

          {/* Contact Text */}
          <Text style={styles.contactText}>Or you can contact us at:</Text>

          {/* Email Button */}
          <TouchableOpacity style={styles.contactButton} onPress={handleEmailPress}>
            <MaterialIcons name="email" size={18} color="#8E44AD" style={styles.buttonIcon} />
            <Text style={styles.contactButtonText}>Email: support@gmail.com</Text>
          </TouchableOpacity>

          {/* Phone Button */}
          <TouchableOpacity style={styles.contactButton} onPress={handlePhonePress}>
            <MaterialIcons name="call" size={18} color="#16A085" style={styles.buttonIcon} />
            <Text style={styles.contactButtonText}>Phone: 0201346530</Text>
          </TouchableOpacity>

          {/* Solution Text */}
          <Text style={styles.solutionText}>WE HAVE THE SOLUTION!</Text>
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
    backgroundColor: 'rgba(255,255,255,0.89)',
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
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingBottom: 40,
    alignItems: 'center',
  },
  imageContainer: {
    width: 180,
    height: 180,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3f7f5',
    borderRadius: 90,
  },
  helpImage: {
    width: '80%',
    height: '80%',
  },
  helpTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  helpText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  actionButton: {
    backgroundColor: '#FFD1D1',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    width: '48%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  contactText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    marginVertical: 10,
    color: '#333',
  },
  contactButton: {
    backgroundColor: '#FFD1D1',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contactButtonText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  solutionText: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 20,
    marginTop: 15,
    color: '#333',
  },
  buttonIcon: {
    marginRight: 2,
  },
});