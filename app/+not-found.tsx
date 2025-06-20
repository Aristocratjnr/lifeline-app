import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Link, Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export default function NotFoundScreen() {
  const [countdown, setCountdown] = useState<number | null>(null);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    setCountdown(10);
  }, []);

  useEffect(() => {
    if (countdown === null) return;
    
    if (countdown <= 0) {
      router.replace('/');
      return;
    }
    
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown, router]);

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <>
      <Stack.Screen options={{ 
        title: 'Page Not Found',
        headerStyle: {
          backgroundColor: isDark ? '#1a1a1a' : '#f9fafb',
        },
        headerTintColor: isDark ? '#fff' : '#000',
      }} />
      
      <ThemedView style={styles.container}>
        {/* Main Content */}
        <ThemedView style={styles.content}>
          <ThemedView style={styles.errorSection}>
            {/* 404 Number */}
            <ThemedText style={[styles.errorNumber, { color: '#FC7A7A' }]}>
              404
            </ThemedText>
            
            {/* Title */}
            <ThemedText style={styles.errorTitle}>
              Page not found
            </ThemedText>
            
            {/* Description */}
            <ThemedText style={styles.errorDescription}>
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </ThemedText>
            <ThemedText style={[styles.pathText, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
              This screen does not exist.
            </ThemedText>
            
            {/* Action Buttons */}
            <ThemedView style={styles.buttonContainer}>
              {/* Go Back Button */}
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={handleGoBack}
                activeOpacity={0.8}
              >
                <ThemedText style={styles.primaryButtonText}>
                  Go back
                </ThemedText>
              </TouchableOpacity>
              
              {/* Home Button with Countdown */}
              <Link href="/" asChild>
                <TouchableOpacity 
                  style={[styles.secondaryButton, { borderColor: isDark ? '#4b5563' : '#d1d5db' }]}
                  activeOpacity={0.8}
                >
                  <ThemedText style={[styles.secondaryButtonText, { color: isDark ? '#e5e7eb' : '#374151' }]}>
                    Return to homepage
                    {countdown !== null && (
                      <ThemedText style={styles.countdownText}>
                        {' '}(auto-redirect in {countdown}s)
                      </ThemedText>
                    )}
                  </ThemedText>
                </TouchableOpacity>
              </Link>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        
        {/* Footer */}
        <ThemedView style={[styles.footer, { 
          backgroundColor: isDark ? '#111827' : '#f9fafb',
          borderTopColor: isDark ? '#374151' : '#e5e7eb'
        }]}>
          <ThemedText style={[styles.footerText, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
            © {new Date().getFullYear()} Lifeliner. All rights reserved. Daniella Asiedu
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  errorSection: {
    alignItems: 'center',
    maxWidth: width - 40,
    width: '100%',
  },
  errorNumber: {
    fontSize: width < 400 ? 72 : 96,
    fontWeight: '800',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: width < 400 ? 24 : 30,
    fontWeight: '800',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  pathText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#cf9393',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  countdownText: {
    fontSize: 14,
    fontWeight: '400',
  },
  footer: {
    borderTopWidth: 1,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
  },
});
