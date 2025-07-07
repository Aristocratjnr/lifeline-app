import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useEffect } from 'react';
import {
  Alert,
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

export default function DeleteAccount() {
  const navigation = useNavigation();

  useEffect(() => {
    loadFonts();
  }, []);

  const handleDeactivate = () => {
    Alert.alert(
      "Deactivate Account",
      "Are you sure you want to deactivate your account? You can reactivate it later by logging in.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Deactivate", style: "destructive" }
      ]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Account",
      "This action is irreversible. All your data will be permanently deleted.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive" }
      ]
    );
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
          <Text style={styles.headerTitle}>DELETE ACCOUNT</Text>
        </View>

        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentCard}>
            {/* Manage Account Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Manage Your Account</Text>
              <Text style={styles.sectionText}>
                Control your account settings, including deactivation and deletion options.
              </Text>
            </View>

            <View style={styles.separator} />

            {/* Deactivate Account Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Deactivate Account</Text>
              <Text style={styles.sectionText}>
                Temporarily disable your account. You can reactivate it by logging in again.
              </Text>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={handleDeactivate}
              >
                <Text style={styles.actionButtonText}>DEACTIVATE ACCOUNT</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.separator} />

            {/* Delete Account Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Deactivate Account</Text>
              <Text style={styles.sectionText}>
                We are really sorry to see you go. Are you sure you want to delete your account? <Text style={styles.warningText}>This is irreversible and will remove your account and all data from Lifeline.</Text>
              </Text>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={handleDelete}
              >
                <Text style={styles.actionButtonText}>DELETE ACCOUNT</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  sectionText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 15,
  },
  warningText: {
    color: '#e53e3e',
    fontFamily: 'JetBrainsMono',
  },
  separator: {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 15,
  },
  actionButton: {
    backgroundColor: '#ff0000',
    borderRadius: 25,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  actionButtonText: {
    color: 'white',
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
  },
});