import { Link, Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function NotFoundScreen() {
  const [countdown, setCountdown] = useState<number | null>(null);
  const router = useRouter();

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
          backgroundColor: '#f9fafb',
        },
        headerTintColor: '#000',
      }} />
      
      <View style={styles.container}>
        {/* Main Content */}
        <View style={styles.content}>
          <View style={styles.errorSection}>
            {/* 404 Number */}
            <Text style={styles.errorNumber}>
              404
            </Text>
            
            {/* Title */}
            <Text style={styles.errorTitle}>
              Page not found
            </Text>
            
            {/* Description */}
            <Text style={styles.errorDescription}>
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </Text>
            <Text style={styles.pathText}>
              This screen does not exist.
            </Text>
            
            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              {/* Go Back Button */}
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={handleGoBack}
                activeOpacity={0.8}
              >
                <Text style={styles.primaryButtonText}>
                  Go back
                </Text>
              </TouchableOpacity>
              
              {/* Home Button with Countdown */}
              <Link href="/" asChild>
                <TouchableOpacity 
                  style={styles.secondaryButton}
                  activeOpacity={0.8}
                >
                  <Text style={styles.secondaryButtonText}>
                    Return to homepage
                    {countdown !== null && (
                      <Text style={styles.countdownText}>
                        {' '}(auto-redirect in {countdown}s)
                      </Text>
                    )}
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
        
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} Lifeliner. All rights reserved. Daniella Asiedu
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    color: '#FC7A7A',
  },
  errorTitle: {
    fontSize: width < 400 ? 24 : 30,
    fontWeight: '800',
    marginBottom: 16,
    textAlign: 'center',
    color: '#000',
  },
  errorDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
    color: '#374151',
  },
  pathText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 40,
    color: '#6b7280',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#FC7A7A',
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
    borderColor: '#d1d5db',
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
    color: '#374151',
  },
  countdownText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6b7280',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#6b7280',
  },
});
