import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Dimensions,
  ImageBackground,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useDisplayPreferences } from '../../context/DisplayPreferencesContext';

const { width } = Dimensions.get('window');
const pink = '#F9A6A6';

export default function DonateScreen() {
  const [fontsLoaded] = useFonts({
    'Flavours': require('@/assets/fonts/Flavors-Regular.ttf'),
    'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
  });
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const { t } = useTranslation();
  const { darkMode } = useDisplayPreferences();

  if (!fontsLoaded) {
    return null;
  }

  const handleDonate = () => {
    setShowPaymentDetails(true);
  };

  const handleCloseModal = () => {
    setShowPaymentDetails(false);
    setShowThankYou(false);
  };

  const handleDonationComplete = () => {
    setShowPaymentDetails(false);
    setShowThankYou(true);
  };

  return (
    <ImageBackground
      source={darkMode ? require('../../assets/images/blur.png') : require('../../assets/images/blur.png')}
      style={[styles.backgroundImage, darkMode && { opacity: 0.9 }]}
      resizeMode="cover"
    >
      <View style={[styles.overlay, darkMode && styles.darkOverlay]}>
        <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
          <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
          {/* Content */}
          <View style={styles.content}>
            <Text style={[styles.title, darkMode && styles.darkTitle]}>{t('donate.title')}</Text>
            <Text style={[styles.description, darkMode && styles.darkText]}>{t('donate.description')}</Text>
            
            <TouchableOpacity 
              style={styles.donateButton}
              onPress={handleDonate}
            >
              <Text style={styles.buttonText}>{t('donate.donateNow')}</Text>
            </TouchableOpacity>

            <Modal
              visible={showPaymentDetails || showThankYou}
              transparent={true}
              animationType="fade"
              onRequestClose={handleCloseModal}
            >
              <View style={styles.modalOverlay}>
                <View style={[styles.modalContent, darkMode && styles.darkModalContent]}>
                  {showThankYou ? (
                    <>
                      <Text style={[styles.title, darkMode && styles.darkTitle]}>{t('donate.thankYou')}</Text>
                      <Text style={[styles.description, darkMode && styles.darkText]}>{t('donate.thankYouMessage')}</Text>
                      <TouchableOpacity
                        style={[styles.closeButton, { backgroundColor: darkMode ? '#4a4a4a' : pink }]}
                        onPress={handleCloseModal}
                      >
                        <Text style={styles.closeButtonText}>{t('common.close')}</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Text style={[styles.modalTitle, darkMode && styles.darkTitle]}>{t('donate.paymentDetails')}</Text>
                      <View style={styles.detailRow}>
                        <MaterialIcons name="mobile-friendly" size={22} color="#B96A6A" style={styles.detailIcon} />
                        <View style={styles.detailTextGroup}>
                          <Text style={[styles.modalText, darkMode && styles.darkText]}>{t('donate.telecelCash')} <Text style={styles.bold}>0203430787</Text></Text>
                          <Text style={[styles.accountName, darkMode && { color: '#aaa' }]}>Daniella Asiedu</Text>
                        </View>
                      </View>
                      <View style={styles.detailRow}>
                        <MaterialIcons name="mobile-friendly" size={22} color="#B96A6A" style={styles.detailIcon} />
                        <View style={styles.detailTextGroup}>
                          <Text style={[styles.modalText, darkMode && styles.darkText]}>{t('donate.mtnMomo')} <Text style={styles.bold}>0551784926</Text></Text>
                          <Text style={[styles.accountName, darkMode && { color: '#aaa' }]}>{t('donate.davidAccount')}</Text>
                        </View>
                      </View>
                      <View style={styles.detailRow}>
                        <MaterialIcons name="account-balance" size={22} color="#B96A6A" style={styles.detailIcon} />
                        <View style={styles.detailTextGroup}>
                          <Text style={[styles.modalText, darkMode && styles.darkText]}>{t('donate.bankGcb')} <Text style={styles.bold}>1331250000242</Text></Text>
                          <Text style={[styles.accountName, darkMode && { color: '#aaa' }]}>{t('donate.daniellaAccount')}</Text>
                        </View>
                      </View>
                      <View style={styles.detailRow}>
                        <MaterialIcons name="account-balance-wallet" size={22} color="#B96A6A" style={styles.detailIcon} />
                        <View style={styles.detailTextGroup}>
                          <Text style={[styles.modalText, darkMode && styles.darkText]}>{t('donate.usdtWallet')} <Text style={styles.bold}>TCvvhtnFTm6dQcrtq3x3uXabRULzvEkwr1</Text></Text>
                        </View>
                      </View>
                      <TouchableOpacity 
                        style={[styles.closeButton, { backgroundColor: darkMode ? '#4a4a4a' : pink }]} 
                        onPress={handleDonationComplete}
                      >
                        <Text style={[styles.closeButtonText, darkMode && { color: '#fff' }]}>{t('donate.donateNow')}</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </Modal>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
  },
  darkOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  darkContainer: {
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    width: '100%',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Flavours',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  darkTitle: {
    color: '#fff',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Regular',
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  darkText: {
    color: '#e0e0e0',
  },
  donateButton: {
    backgroundColor: pink,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  darkModalContent: {
    backgroundColor: '#333',
  },
  modalTitle: {
    fontFamily: 'Flavours',
    fontSize: 24,
    marginBottom: 28,
    color: '#222',
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    width: '100%',
    paddingHorizontal: 8,
  },
  detailIcon: {
    marginRight: 12,
  },
  modalText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 16,
    color: '#222',
    textAlign: 'left',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  bold: {
    fontWeight: 'bold',
    color: '#B96A6A',
  },
  closeButton: {
    marginTop: 24,
    backgroundColor: pink,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    elevation: 3,
  },
  closeButtonText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  detailTextGroup: {
    flexDirection: 'column',
    flexShrink: 1,
  },
  accountName: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 13,
    color: '#888',
    marginTop: 2,
    marginLeft: 2,
  },
});
