import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useDisplayPreferences } from '../../context/DisplayPreferencesContext';

const AppointmentDetails = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { darkMode } = useDisplayPreferences();
  const { appointmentId } = useLocalSearchParams();

  // In a real app, you would fetch the appointment details using the appointmentId
  const appointment = {
    id: appointmentId,
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    date: '2023-08-20',
    time: '10:30 AM',
    location: 'City Medical Center, Room 305',
    notes: 'Follow-up appointment to discuss test results and treatment plan.',
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={darkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, darkMode && styles.darkText]}>
          {t('appointments.appointmentDetails')}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.card, darkMode && styles.darkCard]}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
              {t('appointments.appointmentInfo')}
            </Text>
            
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

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
              {t('appointments.notes')}
            </Text>
            <Text style={[styles.notesText, darkMode && styles.darkText]}>
              {appointment.notes}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, darkMode && styles.darkFooter]}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => router.back()}>
          <Text style={styles.buttonText}>{t('common.back')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.rescheduleButton]}>
          <Text style={[styles.buttonText, styles.rescheduleButtonText]}>{t('appointments.reschedule')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  darkHeader: {
    backgroundColor: '#1E1E1E',
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  darkText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: '#1E1E1E',
    shadowColor: '#000',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  notesText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  darkFooter: {
    backgroundColor: '#1E1E1E',
    borderTopColor: '#333',
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  rescheduleButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  rescheduleButtonText: {
    color: '#FFFFFF',
  },
});

export default AppointmentDetails;
