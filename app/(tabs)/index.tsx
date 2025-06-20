import FeatureCard from '@/components/featureCard';
import FirstAidScenarios from '@/components/firstAidScenarios';
import Footer from '@/components/Footer';
import HeroSection from '@/components/Herosection';
import NavBar from '@/components/NavBar';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Navigation Bar */}
      <NavBar />
      
      {/* Main Content */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
       
        {/* Hero Section */}
        <HeroSection />

        <FeatureCard />

        <FirstAidScenarios />

        {/* Footer */}
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
});
