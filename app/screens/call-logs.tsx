import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

export default function CallLogsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  
  // Mock call log data
  const [callLogs, setCallLogs] = useState([
    { id: '1', name: 'Dr. Sarah Johnson', number: '0203430787', date: '2025-07-28', time: '14:30', duration: '12:45', type: 'outgoing' },
    { id: '2', name: 'Dr. Michael Chen', number: '0203430787', date: '2025-07-25', time: '09:15', duration: '08:22', type: 'incoming' },
    { id: '3', name: 'Dr. Emily Wilson', number: '0203430787', date: '2025-07-22', time: '16:45', duration: '15:30', type: 'outgoing' },
    { id: '4', name: 'Dr. James Brown', number: '0203430787', date: '2025-07-20', time: '11:20', duration: '05:15', type: 'missed' },
    { id: '5', name: 'Dr. Lisa Anderson', number: '0203430787', date: '2025-07-18', time: '13:10', duration: '22:18', type: 'outgoing' },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  const formatCallType = (type: string) => {
    switch (type) {
      case 'outgoing': return t('callLogs.outgoing');
      case 'incoming': return t('callLogs.incoming');
      case 'missed': return t('callLogs.missed');
      default: return type;
    }
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/dashboard');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('callLogs.title')}</Text>
      </View>
      
      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {callLogs.map((log) => (
          <View key={log.id} style={styles.logItem}>
            <View style={styles.logInfo}>
              <Text style={styles.doctorName}>{log.name}</Text>
              <Text style={styles.callDetails}>
                {log.date} • {log.time} • {formatCallType(log.type)} • {log.duration}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.callButton}
              onPress={() => handleCall(log.number)}
            >
              <MaterialIcons name="call" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  logItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  callDetails: {
    fontSize: 14,
    color: '#666',
  },
  callButton: {
    backgroundColor: '#EF4444',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
