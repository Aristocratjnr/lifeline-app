import { Image } from 'expo-image';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const FirstAidScenarios = () => {
  const scenarios = [
    {
      src: require('@/assets/videos/peter.gif'), 
      title: "Bone Fracture?",
      subtitle: "Minor Injury, Immediate Care",
    },
    {
      src: require('@/assets/videos/bleed.gif'),
      title: "Bleeding?",
      subtitle: "Stop the Flow, Stay Calm.",
    },
    {
      src: require('@/assets/videos/paul.gif'),
      title: "Minor Injury?",
      subtitle: "Recognizing the Break, Providing Support.",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Background pattern*/}
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={require('@/assets/images/background.jpg')}
          style={styles.backgroundImage}
          resizeMode="repeat"
          imageStyle={styles.backgroundImageStyle}
        />
      </View>

      <View style={styles.content}>
        {/* Heading */}
        <Text style={styles.heading}>Some Featured Scenarios</Text>
        <Text style={styles.description}>
          Be prepared for common emergencies. Get immediate steps and essential
          knowledge to act fast and stay calm in critical situations.
        </Text>

        {/* Scenarios */}
        <ScrollView 
          style={styles.scenariosScrollView}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <View style={styles.scenariosContainer}>
            {scenarios.map((scenario, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.scenarioCard}
                activeOpacity={0.8}
              >
                <View style={styles.imageContainer}>
                  <View style={styles.imageWrapper}>
                    <Image
                      source={scenario.src}
                      style={styles.scenarioImage}
                      contentFit="cover"
                      onError={() => {
                        console.error(`Failed to load scenario image: ${scenario.title}`);
                      }}
                    />
                  </View>
                </View>
                
                <View style={styles.textContent}>
                  <Text style={styles.scenarioTitle}>{scenario.title}</Text>
                  <Text style={styles.scenarioSubtitle}>{scenario.subtitle}</Text>
                  <TouchableOpacity style={styles.learnButton} activeOpacity={0.8}>
                    <Text style={styles.learnButtonText}>Learn to Save a Life</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Footer Button */}
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.footerButton} activeOpacity={0.8}>
            <Text style={styles.footerButtonText}>View First Aid Guides?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#111827',
    position: 'relative',
    paddingVertical: width < 640 ? 20 : 24,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1, // opacity-10 equivalent
    zIndex: 0,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  backgroundImageStyle: {
    // This makes it cover and repeat like bg-cover bg-repeat
    resizeMode: 'repeat',
  },
  content: {
    maxWidth: 512, // equivalent to max-w-2xl
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: width < 400 ? 12 : width < 640 ? 16 : 24,
    zIndex: 10,
  },
  heading: {
    fontSize: width < 400 ? 20 : width < 640 ? 24 : width < 768 ? 28 : width < 1024 ? 32 : 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: width < 768 ? 8 : 16,
    color: '#000',
    lineHeight: width < 400 ? 24 : width < 640 ? 28 : width < 768 ? 32 : width < 1024 ? 36 : 44,
  },
  description: {
    textAlign: 'center',
    marginBottom: width < 400 ? 16 : width < 640 ? 24 : 32,
    fontSize: width < 400 ? 12 : width < 640 ? 14 : width < 768 ? 16 : 18,
    lineHeight: width < 400 ? 16 : width < 640 ? 20 : width < 768 ? 22 : 24,
    color: '#374151',
    paddingHorizontal: 8,
  },
  scenariosScrollView: {
    maxHeight: 300, // Limit the scroll area height
    marginBottom: 16,
  },
  scenariosContainer: {
    gap: width < 768 ? 12 : 16,
  },
  scenarioCard: {
    flexDirection: width < 640 ? 'column' : 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 8,
  },
  imageContainer: {
    width: width < 640 ? '100%' : '25%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  imageWrapper: {
    width: width < 350 ? 64 : width < 400 ? 72 : width < 640 ? 80 : 96,
    height: width < 350 ? 64 : width < 400 ? 72 : width < 640 ? 80 : 96,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scenarioImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  textContent: {
    width: width < 640 ? '100%' : '75%',
    padding: width < 400 ? 8 : width < 640 ? 12 : 16,
    justifyContent: 'center',
  },
  scenarioTitle: {
    fontSize: width < 400 ? 16 : width < 640 ? 18 : width < 768 ? 20 : 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  scenarioSubtitle: {
    color: '#111827',
    marginBottom: 8,
    fontSize: width < 350 ? 10 : width < 400 ? 11 : width < 640 ? 12 : width < 768 ? 14 : 16,
    lineHeight: width < 350 ? 14 : width < 400 ? 15 : width < 640 ? 16 : width < 768 ? 18 : 20,
  },
  learnButton: {
    backgroundColor: '#fecaca', // red-200
    paddingHorizontal: width < 400 ? 12 : width < 640 ? 16 : 24,
    paddingVertical: width < 400 ? 4 : width < 640 ? 6 : 8,
    borderRadius: 25,
    borderTopWidth: 2,
    borderColor: '#111827',
    alignSelf: width < 640 ? 'stretch' : 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  learnButtonText: {
    color: '#111827',
    fontSize: width < 350 ? 10 : width < 768 ? 12 : 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  footerContainer: {
    alignItems: 'center',
  },
  footerButton: {
    backgroundColor: '#f87171', // red-400
    paddingHorizontal: width < 400 ? 16 : width < 640 ? 24 : 32,
    paddingVertical: width < 400 ? 6 : width < 640 ? 8 : 12,
    borderRadius: 25,
    borderTopWidth: 2,
    borderColor: '#111827',
    width: width < 640 ? '100%' : 'auto',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  footerButtonText: {
    color: '#000',
    fontSize: width < 400 ? 12 : width < 640 ? 14 : width < 768 ? 16 : 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default FirstAidScenarios;