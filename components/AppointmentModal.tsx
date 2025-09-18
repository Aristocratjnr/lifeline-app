import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDisplayPreferences } from '../context/DisplayPreferencesContext';

interface AppointmentModalProps {
  visible: boolean;
  onClose: () => void;
  appointment?: {
    id: string;
    doctor: string;
    specialty: string;
    date: string;
    time: string;
    location: string;
  };
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ visible, onClose, appointment }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { darkMode } = useDisplayPreferences();

  if (!appointment) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, darkMode && styles.darkModalContent]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, darkMode && styles.darkText]}>
              {t('appointments.upcoming')}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color={darkMode ? '#fff' : '#000'} />
            </TouchableOpacity>
          </View>

          <View style={styles.appointmentDetails}>
            <View style={styles.detailRow}>
              <MaterialIcons name="person" size={20} color="#4CAF50" style={styles.icon} />
              <View>
                <Text style={[styles.detailLabel, darkMode && styles.darkText]}>{t('appointments.doctor')}</Text>
                <Text style={[styles.detailValue, darkMode && styles.darkText]}>{appointment.doctor}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <MaterialIcons name="medical-services" size={20} color="#2196F3" style={styles.icon} />
              <View>
                <Text style={[styles.detailLabel, darkMode && styles.darkText]}>{t('appointments.specialty')}</Text>
                <Text style={[styles.detailValue, darkMode && styles.darkText]}>{appointment.specialty}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <MaterialIcons name="event" size={20} color="#FF9800" style={styles.icon} />
              <View>
                <Text style={[styles.detailLabel, darkMode && styles.darkText]}>{t('appointments.date')}</Text>
                <Text style={[styles.detailValue, darkMode && styles.darkText]}>{appointment.date}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <MaterialIcons name="access-time" size={20} color="#9C27B0" style={styles.icon} />
              <View>
                <Text style={[styles.detailLabel, darkMode && styles.darkText]}>{t('appointments.time')}</Text>
                <Text style={[styles.detailValue, darkMode && styles.darkText]}>{appointment.time}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <MaterialIcons name="location-on" size={20} color="#F44336" style={styles.icon} />
              <View>
                <Text style={[styles.detailLabel, darkMode && styles.darkText]}>{t('appointments.location')}</Text>
                <Text style={[styles.detailValue, darkMode && styles.darkText]}>{appointment.location}</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>{t('common.cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.confirmButton]}
              onPress={() => {
                onClose();
                router.push({
                  pathname: '/appointment-details/[id]',
                  params: { id: appointment.id }
                });
              }}
            >
              <Text style={[styles.buttonText, styles.confirmButtonText]}>{t('appointments.viewDetails')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxWidth: 400,
  },
  darkModalContent: {
    backgroundColor: '#1e1e1e',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 15,
  },
  darkModalHeader: {
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  closeButton: {
    padding: 5,
  },
  appointmentDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 15,
    width: 24,
    textAlign: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    fontWeight: '600',
    color: '#333',
  },
  confirmButtonText: {
    color: '#fff',
  },
});

export default AppointmentModal;
