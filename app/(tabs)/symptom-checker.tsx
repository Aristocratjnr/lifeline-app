import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OPENROUTER_API_KEY = process.env.EXPO_PUBLIC_OPENROUTER_API_KEY;

export default function SymptomCheckerScreen() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!symptoms.trim()) return;
    Keyboard.dismiss();
    setIsLoading(true);
    setResult('');
    setError('');
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a medical triage assistant. Given a list of symptoms, provide a possible condition and clear, concise next steps. If the symptoms are serious, advise the user to seek emergency care. Format your response as: 1) Possible Condition, 2) Recommended Next Steps.'
            },
            { role: 'user', content: `Symptoms: ${symptoms}` }
          ],
          temperature: 0.5,
          max_tokens: 300
        })
      });
      if (!response.ok) throw new Error('AI service error');
      const data = await response.json();
      const aiReply = data.choices[0].message.content;
      setResult(aiReply);
    } catch (err) {
      setError('Sorry, I could not analyze your symptoms right now.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to parse AI response
  const parseAIResponse = (response: string) => {
    // Expecting format: 1) Possible Condition: ... 2) Recommended Next Steps: ...
    const conditionMatch = response.match(/Possible Condition\s*[:\-]?\s*(.*?)(?:\n|2\))/i);
    const stepsMatch = response.match(/Recommended Next Steps\s*[:\-]?\s*([\s\S]*)/i);
    const condition = conditionMatch ? conditionMatch[1].trim() : '';
    const stepsRaw = stepsMatch ? stepsMatch[1].trim() : '';
    // Split steps by line or bullet
    const steps = stepsRaw
      .split(/\n|\u2022|\d+\./)
      .map(s => s.trim())
      .filter(Boolean);
    return { condition, steps };
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
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
            editable={!isLoading}
            returnKeyType="done"
            onSubmitEditing={handleCheck}
          />
          <TouchableOpacity
            style={[styles.button, isLoading || !symptoms.trim() ? { opacity: 0.6 } : null]}
            onPress={handleCheck}
            activeOpacity={0.85}
            disabled={isLoading || !symptoms.trim()}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
            ) : (
              <MaterialIcons name="search" size={22} color="#fff" style={{ marginRight: 8 }} />
            )}
            <Text style={styles.buttonText}>Check Symptoms</Text>
          </TouchableOpacity>
          {!!result && (() => {
            const { condition, steps } = parseAIResponse(result);
            return (
              <View style={styles.resultCard}>
                {condition ? (
                  <View style={styles.resultSection}>
                    <MaterialIcons name="medical-services" size={28} color="#FC7A7A" style={{ marginRight: 8 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.resultLabel}>Possible Condition</Text>
                      <Text style={styles.resultText}>{condition}</Text>
                    </View>
                  </View>
                ) : null}
                {steps.length > 0 ? (
                  <View style={[styles.resultSection, { marginTop: 18 }] }>
                    <MaterialIcons name="playlist-add-check" size={28} color="#4CAF50" style={{ marginRight: 8 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.resultLabel}>Recommended Next Steps</Text>
                      {steps.map((step, idx) => (
                        <View key={idx} style={styles.stepRow}>
                          <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={{ marginRight: 6 }} />
                          <Text style={styles.stepText}>{step}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ) : null}
              </View>
            );
          })()}
          {!!error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </KeyboardAvoidingView>
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
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 18,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 4,
    elevation: 2,
  },
  resultSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
  },
  resultText: {
    fontSize: 16,
    color: '#374151',
  },
  errorText: {
    marginTop: 10,
    color: '#FC7A7A',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepText: {
    fontSize: 16,
    color: '#374151',
  },
}); 