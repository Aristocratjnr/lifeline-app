import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { ImageBackground } from 'expo-image';
import React, { useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const pink = '#F9A6A6';

export default function DonateScreen() {
  const [fontsLoaded] = useFonts({
    'Flavours': require('@/assets/fonts/Flavors-Regular.ttf'),
    'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
  });
  const [modalVisible, setModalVisible] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  const handleDonate = () => {
    setModalVisible(true);
  };

  return (
    <ImageBackground
      source={require('@/assets/images/blur.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Support Lifeline</Text>
          <Text style={styles.subtitle}>
            Your donation helps us keep providing life-saving information and support to everyone, everywhere. Thank you for making a difference!
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleDonate} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Donate Now</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Details Modal */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Payment Details</Text>
              <View style={styles.detailRow}>
                <MaterialIcons name="mobile-friendly" size={22} color="#B96A6A" style={styles.detailIcon} />
                <Text style={styles.modalText}>Telecel-Cash: <Text style={styles.bold}>0203430787</Text></Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialIcons name="mobile-friendly" size={22} color="#B96A6A" style={styles.detailIcon} />
                <Text style={styles.modalText}>MTN-MOMO: <Text style={styles.bold}>0551784926</Text></Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialIcons name="account-balance" size={22} color="#B96A6A" style={styles.detailIcon} />
                <Text style={styles.modalText}>Bank(GCB): <Text style={styles.bold}>1331250000242</Text></Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialIcons name="account-balance-wallet" size={22} color="#B96A6A" style={styles.detailIcon} />
                <Text style={styles.modalText}>USDT Wallet TRC20: <Text style={styles.bold}>TCvvhtnFTm6dQcrtq3x3uXabRULzvEkwr1</Text></Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
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
    fontFamily: 'Flavours',
    fontSize: 32,
    color: '#222',
    textAlign: 'center',
    marginBottom: 18,
    marginTop: -60,
    letterSpacing: 1,
  },
  subtitle: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 16,
    color: '#222',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: pink,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: '#B96A6A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 18,
    color: '#222',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 24,
    width: '90%',
    maxWidth: 370,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
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
    marginTop: 30,
    backgroundColor: '#F9A6A6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.2,
    borderColor: '#B96A6A',
    alignSelf: 'center',
  },
  closeButtonText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
