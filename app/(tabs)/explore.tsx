import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const navigateToSection = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#1a1a1a' : '#fff' }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#FFB5B5', dark: '#353636' }}
        headerImage={
          <Image
            source={require('@/assets/images/woman.png')} // Update with your image
            style={styles.headerImage}
            contentFit="contain"
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Explore Lifeline</ThemedText>
          <IconSymbol
            size={24}
            color={isDark ? '#fff' : '#FC7A7A'}
            name="heart.fill"
            style={styles.heartIcon}
          />
        </ThemedView>
        
        <ThemedText style={styles.subtitle}>
          Discover the features that make Lifeline your trusted emergency companion.
        </ThemedText>

        <Collapsible title="🚨 Emergency First Aid">
          <ThemedText>
            Access step-by-step first aid instructions for common emergencies including:
          </ThemedText>
          <ThemedText style={styles.listItem}>• CPR and choking procedures</ThemedText>
          <ThemedText style={styles.listItem}>• Wound care and bleeding control</ThemedText>
          <ThemedText style={styles.listItem}>• Burns, fractures, and allergic reactions</ThemedText>
          <TouchableOpacity onPress={() => navigateToSection('/first-aid-guide')}>
            <ThemedText type="link" style={styles.actionLink}>
              View First Aid Guide →
            </ThemedText>
          </TouchableOpacity>
        </Collapsible>

        <Collapsible title="🩺 Symptom Checker">
          <ThemedText>
            Our intelligent symptom checker helps you:
          </ThemedText>
          <ThemedText style={styles.listItem}>• Assess symptoms and their severity</ThemedText>
          <ThemedText style={styles.listItem}>• Get guidance on when to seek medical help</ThemedText>
          <ThemedText style={styles.listItem}>• Understand common conditions</ThemedText>
          <TouchableOpacity onPress={() => navigateToSection('/symptom-checker')}>
            <ThemedText type="link" style={styles.actionLink}>
              Try Symptom Checker →
            </ThemedText>
          </TouchableOpacity>
        </Collapsible>

        <Collapsible title="📱 Offline Access">
          <ThemedText>
            Lifeline works even without internet connection:
          </ThemedText>
          <ThemedText style={styles.listItem}>• All essential guides stored locally</ThemedText>
          <ThemedText style={styles.listItem}>• Emergency contacts always accessible</ThemedText>
          <ThemedText style={styles.listItem}>• No data required in critical moments</ThemedText>
          <ThemedText style={styles.highlight}>
            Perfect for remote areas or network emergencies!
          </ThemedText>
        </Collapsible>

        <Collapsible title="🏥 Emergency Contacts">
          <ThemedText>
            Quick access to emergency services:
          </ThemedText>
          <ThemedText style={styles.listItem}>• Local emergency numbers</ThemedText>
          <ThemedText style={styles.listItem}>• Poison control centers</ThemedText>
          <ThemedText style={styles.listItem}>• Your personal emergency contacts</ThemedText>
          <TouchableOpacity onPress={() => navigateToSection('/contact')}>
            <ThemedText type="link" style={styles.actionLink}>
              Manage Emergency Contacts →
            </ThemedText>
          </TouchableOpacity>
        </Collapsible>

        <Collapsible title="👨‍⚕️ Expert-Verified Content">
          <ThemedText>
            All our content is reviewed by certified medical professionals and follows guidelines from:
          </ThemedText>
          <ThemedText style={styles.listItem}>• American Heart Association</ThemedText>
          <ThemedText style={styles.listItem}>• American Red Cross</ThemedText>
          <ThemedText style={styles.listItem}>• World Health Organization</ThemedText>
          <TouchableOpacity onPress={() => handleLinkPress('https://www.heart.org')}>
            <ThemedText type="link" style={styles.actionLink}>
              Learn about our sources →
            </ThemedText>
          </TouchableOpacity>
        </Collapsible>

        <Collapsible title="🎯 How to Use Lifeline">
          <ThemedText>
            Getting started is simple:
          </ThemedText>
          <ThemedText style={styles.stepItem}>1. Bookmark emergency contacts</ThemedText>
          <ThemedText style={styles.stepItem}>2. Familiarize yourself with first aid basics</ThemedText>
          <ThemedText style={styles.stepItem}>3. Practice using the symptom checker</ThemedText>
          <ThemedText style={styles.stepItem}>4. Share with family and friends</ThemedText>
          <ThemedText style={styles.highlight}>
            Remember: Lifeline is a guide, not a replacement for professional medical care.
          </ThemedText>
        </Collapsible>

        <ThemedView style={styles.ctaSection}>
          <ThemedText style={styles.ctaTitle}>Ready to Get Started?</ThemedText>
          <ThemedText style={styles.ctaText}>
            Explore our first aid guides and symptom checker to become better prepared for emergencies.
          </ThemedText>
          <TouchableOpacity 
            style={[styles.ctaButton, { backgroundColor: '#FC7A7A' }]}
            onPress={() => navigateToSection('/first-aid-guide')}
          >
            <ThemedText style={styles.ctaButtonText}>Start Learning</ThemedText>
          </TouchableOpacity>
        </ThemedView>
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
  heartIcon: {
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 24,
  },
  listItem: {
    fontSize: 14,
    marginVertical: 2,
    marginLeft: 8,
    lineHeight: 20,
  },
  stepItem: {
    fontSize: 14,
    marginVertical: 4,
    fontWeight: '500',
    lineHeight: 20,
  },
  actionLink: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
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
  },
  ctaText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  ctaButton: {
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
