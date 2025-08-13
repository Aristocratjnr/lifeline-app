import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SplinterIndex = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/dashboard');
    }
  };

  const navigateTo = (screen: string) => {
    router.push(`/screens/first-aid-details/Splinter/splinter-initial`);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: t('firstAid.splinter.title'),
          headerShown: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTitleStyle: {
            fontFamily: 'JetBrainsMono-Bold',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          ),
        }}
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>{t('firstAid.splinter.title')}</Text>
          
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigateTo('splinter-initial')}
          >
            <Text style={styles.cardTitle}>{t('firstAid.splinter.initialAssessment')}</Text>
            <Text style={styles.cardDescription}>{t('firstAid.splinter.initialDescription')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigateTo('splinter-removal')}
          >
            <Text style={styles.cardTitle}>{t('firstAid.splinter.removal')}</Text>
            <Text style={styles.cardDescription}>{t('firstAid.splinter.removalDescription')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigateTo('splinter-cleaning')}
          >
            <Text style={styles.cardTitle}>{t('firstAid.splinter.cleaning')}</Text>
            <Text style={styles.cardDescription}>{t('firstAid.splinter.cleaningDescription')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigateTo('splinter-when-to-seek-help')}
          >
            <Text style={styles.cardTitle}>{t('firstAid.splinter.whenToSeekHelp')}</Text>
            <Text style={styles.cardDescription}>{t('firstAid.splinter.whenToSeekHelpDescription')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'JetBrainsMono-Bold',
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'JetBrainsMono-Bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'JetBrainsMono-Regular',
  },
});

export default SplinterIndex;
