import { FontAwesome } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../../components/Loader';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadAssets() {
      await Asset.loadAsync([
        require('@/assets/images/woman.png'),
      ]);
      setIsReady(true);
    }
    loadAssets();
  }, []);

  if (!isReady) {
    return <Loader isLoading={true} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FFF5F5', '#FFE8E8', '#FFF5F5']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.inner}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.iconContainer}>
              <FontAwesome name="heartbeat" size={32} color="#FC7A7A" />
            </View>
            <Text style={styles.title}> Welcome to Lifeline</Text>
            <View style={{ height: 8 }} />
            <Text style={styles.subtitle}>
              Your trusted first aid & emergency companion
            </Text>
            <View style={styles.featureHighlight}>
              <FontAwesome name="shield" size={16} color="#10B981" />
              <Text style={styles.featureText}>Always Ready • Always Safe</Text>
            </View>
          </View>

          {/* Image Section */}
          <View style={styles.imageSection}>
            <View style={styles.imageContainer}>
              <Image
                source={require('@/assets/images/woman.png')}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.imageBorder} />
            </View>
          </View>

          {/* Action Section */}
          <View style={styles.actionSection}>
              
            <View style={styles.buttonContainer}>
              <Link href="/auth/sign-in" asChild>
                <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85}>
                  <LinearGradient
                    colors={['#FC7A7A', '#F87171']}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <FontAwesome name="sign-in" size={18} color="#fff" style={styles.buttonIcon} />
                    <Text style={styles.primaryButtonText}>Sign In</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Link>
              
              <Link href="/auth/sign-up" asChild>
                <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.85}>
                  <FontAwesome name="user-plus" size={18} color="#FC7A7A" style={styles.buttonIcon} />
                  <Text style={styles.secondaryButtonText}>Create Account</Text>
                </TouchableOpacity>
              </Link>
            </View>
            </View>
          </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  
  // Header Section
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#FC7A7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
   title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FC7A7A',
    marginBottom: 8,
    letterSpacing: 1,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 12,
  },
  featureHighlight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  featureText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
    marginLeft: 6,
  },

  // Image Section
  imageSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 240,           
    height: 240,          
    borderRadius: 120,    
    backgroundColor: 'transparent',
  },
  imageBorder: {
    position: 'absolute',
    top: -12,             
    left: -12,
    right: -12,
    bottom: -12,
    borderRadius: 132,
    borderWidth: 3,
    borderColor: '#FC7A7A',
    opacity: 0.3,
  },

  // Action Section
  actionSection: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 16,
    marginBottom: 10,
    marginTop: 20,
  },
  
  // Primary Button
  primaryButton: {
    width: width * 0.8,
    height: 56,
    borderRadius: 28,
    shadowColor: '#FC7A7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  
  // Secondary Button
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.8,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#FC7A7A',
    shadowColor: '#FC7A7A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryButtonText: {
    color: '#FC7A7A',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginRight: 10,
  },

  // Quick Access Section
  quickAccessContainer: {
    alignItems: 'center',
  },
  quickAccessTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 16,
  },
  quickAccessButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  quickButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
});