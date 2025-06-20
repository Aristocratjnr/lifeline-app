import { Image } from 'expo-image';
import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

const FeatureCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.cardsContainer}>
          {/* Symptom Checker Card */}
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Symptom Checker</Text>
              <Text style={styles.cardDescription}>
                Identify potential medical conditions based on your symptoms.
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                  <Text style={styles.buttonText}>What&apos;s Wrong?</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require('@/assets/images/back.png')}
                style={styles.cardImage}
                contentFit="contain"
                onError={() => {
                  console.error("Symptom checker image failed to load");
                }}
              />
            </View>
          </View>

          {/* First Aid Guide Card */}
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>First Aid Guide</Text>
              <Text style={styles.cardDescription}>
                Provide step-by-step instructions for various medical emergencies.
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                  <Text style={styles.buttonText}>Get First Aid Help</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require('@/assets/images/care.png')}
                style={styles.cardImage}
                contentFit="contain"
                onError={() => {
                  console.error("First aid guide image failed to load");
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: '#111827',
    position: 'relative',
  },
  content: {
    marginTop: width < 640 ? 48 : 64,
    marginBottom: 40,
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  cardsContainer: {
    flexDirection: width < 768 ? 'column' : 'row',
    gap: 32,
    justifyContent: 'center',
  },
  card: {
    flex: width < 768 ? undefined : 1,
    padding: width < 640 ? 24 : 32,
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 32,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#fff',
    minHeight: width < 640 ? 180 : 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    maxWidth: width < 640 ? '85%' : '65%',
    zIndex: 2,
  },
  cardTitle: {
    fontSize: width < 640 ? 20 : 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
    lineHeight: width < 640 ? 24 : 28,
  },
  cardDescription: {
    color: '#000',
    fontSize: width < 640 ? 12 : 14,
    marginBottom: width < 640 ? 16 : 24,
    lineHeight: width < 640 ? 16 : 20,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  button: {
    backgroundColor: '#FF7A7A',
    paddingHorizontal: width < 640 ? 16 : 24,
    paddingVertical: 8,
    borderRadius: 25,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: width < 640 ? 12 : 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: width < 640 ? 120 : 150,
    height: width < 640 ? 120 : 150,
    zIndex: 1,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
});

export default FeatureCard;