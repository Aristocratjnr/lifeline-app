import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SymptomCheckerScreen() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState('');

  const handleCheck = () => {
    Keyboard.dismiss();
    // Placeholder logic
    setResult('Symptom checking coming soon!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.iconCircle}>
          <MaterialIcons name="healing" size={40} color="#FC7A7A" />
        </View>
        <Text style={styles.title}>Symptom Checker</Text>
        <Text style={styles.subtitle}>
          Enter your symptoms below and get quick guidance. This tool helps you identify possible conditions and next steps.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. headache, fever, cough"
          value={symptoms}
          onChangeText={setSymptoms}
          placeholderTextColor="#aaa"
          multiline={Platform.OS === 'ios'}
        />
        <TouchableOpacity style={styles.button} onPress={handleCheck} activeOpacity={0.85}>
          <MaterialIcons name="search" size={22} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Check Symptoms</Text>
        </TouchableOpacity>
        {!!result && <Text style={styles.result}>{result}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconCircle: {
    backgroundColor: '#fff',
    borderRadius: 32,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    shadowColor: '#FC7A7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FC7A7A',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 28,
    textAlign: 'center',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    minHeight: 48,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#FC7A7A',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#222',
    marginBottom: 18,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FC7A7A',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginBottom: 18,
    shadowColor: '#FC7A7A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  result: {
    marginTop: 10,
    color: '#FC7A7A',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 