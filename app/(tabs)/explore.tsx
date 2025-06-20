import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen() {
  const router = useRouter();

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const navigateToSection = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#FFB5B5', dark: '#FFB5B5' }}
        headerImage={
          <Image
            source={require('@/assets/images/woman.png')}
            style={styles.headerImage}
            contentFit="contain"
          />
        }>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Explore Lifeline</Text>
          <Text style={styles.heartIcon}>💖</Text>
        </View>
        
        <Text style={styles.subtitle}>
          Discover the features that make Lifeline your trusted emergency companion.
        </Text>

        <Collapsible title="🚨 Emergency First Aid">
          <Text style={styles.content}>
            Access step-by-step first aid instructions for common emergencies including:
          </Text>
          <Text style={styles.listItem}>• CPR and choking procedures</Text>
          <Text style={styles.listItem}>• Wound care and bleeding control</Text>
          <Text style={styles.listItem}>• Burns, fractures, and allergic reactions</Text>
          <TouchableOpacity onPress={() => navigateToSection('/first-aid-guide')}>
            <Text style={styles.actionLink}>
              View First Aid Guide →
            </Text>
          </TouchableOpacity>
        </Collapsible>

        <Collapsible title="🩺 Symptom Checker">
          <Text style={styles.content}>
            Our intelligent symptom checker helps you:
          </Text>
          <Text style={styles.listItem}>• Assess symptoms and their severity</Text>
          <Text style={styles.listItem}>• Get guidance on when to seek medical help</Text>
          <Text style={styles.listItem}>• Understand common conditions</Text>
          <TouchableOpacity onPress={() => navigateToSection('/symptom-checker')}>
            <Text style={styles.actionLink}>
              Try Symptom Checker →
            </Text>
          </TouchableOpacity>
        </Collapsible>

        <Collapsible title="📱 Offline Access">
          <Text style={styles.content}>
            Lifeline works even without internet connection:
          </Text>
          <Text style={styles.listItem}>• All essential guides stored locally</Text>
          <Text style={styles.listItem}>• Emergency contacts always accessible</Text>
          <Text style={styles.listItem}>• No data required in critical moments</Text>
          <Text style={styles.highlight}>
            Perfect for remote areas or network emergencies!
          </Text>
        </Collapsible>

        <Collapsible title="🏥 Emergency Contacts">
          <Text style={styles.content}>
            Quick access to emergency services:
          </Text>
          <Text style={styles.listItem}>• Local emergency numbers</Text>
          <Text style={styles.listItem}>• Poison control centers</Text>
          <Text style={styles.listItem}>• Your personal emergency contacts</Text>
          <TouchableOpacity onPress={() => navigateToSection('/contact')}>
            <Text style={styles.actionLink}>
              Manage Emergency Contacts →
            </Text>
          </TouchableOpacity>
        </Collapsible>

        <Collapsible title="👨‍⚕️ Expert-Verified Content">
          <Text style={styles.content}>
            All our content is reviewed by certified medical professionals and follows guidelines from:
          </Text>
          <Text style={styles.listItem}>• American Heart Association</Text>
          <Text style={styles.listItem}>• American Red Cross</Text>
          <Text style={styles.listItem}>• World Health Organization</Text>
          <TouchableOpacity onPress={() => handleLinkPress('https://www.heart.org')}>
            <Text style={styles.actionLink}>
              Learn about our sources →
            </Text>
          </TouchableOpacity>
        </Collapsible>

        <Collapsible title="🎯 How to Use Lifeline">
          <Text style={styles.content}>
            Getting started is simple:
          </Text>
          <Text style={styles.stepItem}>1. Bookmark emergency contacts</Text>
          <Text style={styles.stepItem}>2. Familiarize yourself with first aid basics</Text>
          <Text style={styles.stepItem}>3. Practice using the symptom checker</Text>
          <Text style={styles.stepItem}>4. Share with family and friends</Text>
          <Text style={styles.highlight}>
            Remember: Lifeline is a guide, not a replacement for professional medical care.
          </Text>
        </Collapsible>

        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
          <Text style={styles.ctaText}>
            Explore our first aid guides and symptom checker to become better prepared for emergencies.
          </Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => navigateToSection('/first-aid-guide')}
          >
            <Text style={styles.ctaButtonText}>Start Learning</Text>
          </TouchableOpacity>
        </View>
      </ParallaxScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 200,
    width: 200,
    bottom: -20,
    left: 50,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  heartIcon: {
    fontSize: 24,
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 24,
    color: '#374151',
  },
  content: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  listItem: {
    fontSize: 14,
    marginVertical: 2,
    marginLeft: 8,
    lineHeight: 20,
    color: '#374151',
  },
  stepItem: {
    fontSize: 14,
    marginVertical: 4,
    fontWeight: '500',
    lineHeight: 20,
    color: '#374151',
  },
  actionLink: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#FC7A7A',
    textDecorationLine: 'underline',
  },
  highlight: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FC7A7A',
    marginTop: 8,
    fontStyle: 'italic',
  },
  ctaSection: {
    marginTop: 32,
    padding: 24,
    backgroundColor: '#F8D7D7',
    borderRadius: 16,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#000',
  },
  ctaText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
    color: '#374151',
  },
  ctaButton: {
    backgroundColor: '#FC7A7A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
