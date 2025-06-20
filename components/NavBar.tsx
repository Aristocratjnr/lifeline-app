import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Animation for mobile menu
  const slideAnimation = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: isMenuOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isMenuOpen, slideAnimation]);

  // Define the routes as a union type that matches Expo Router's expected formats
  type AppRoute = '/' | '/symptom-checker' | '/first-aid-guide' | '/contact' | '/donate' | '/auth/signIn';
  
  const handleNavigation = (route: AppRoute) => {
    setIsMenuOpen(false);
    router.push(route as any); // Use type assertion to satisfy TypeScript
  };

  const isActiveRoute = (route: string) => {
    return pathname === route;
  };

  const menuHeight = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300],
  });

  const menuOpacity = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <>
      <StatusBar 
        backgroundColor="#FFB5B5" 
        barStyle={isDark ? "light-content" : "dark-content"} 
      />
      <View style={styles.navbar}>
        <View style={styles.container}>
          {/* Logo */}
          <TouchableOpacity 
            onPress={() => handleNavigation('/')}
            style={styles.logoContainer}
            activeOpacity={0.8}
          >
            <View style={styles.logoWrapper}>
              <Image
                source={require('@/assets/images/logo.png')} // Update path as needed
                style={styles.logoImage}
                contentFit="contain"
                onLoad={() => setImageLoaded(true)}
                onError={() => console.error("Logo image failed to load")}
              />
              {!imageLoaded && (
                <View style={styles.logoFallback}>
                  <Text style={styles.logoFallbackText}>L</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          {/* Desktop Navigation - Hidden on small screens */}
          {width >= 768 && (
            <View style={styles.desktopNav}>
              <TouchableOpacity 
                onPress={() => handleNavigation('/')}
                style={[styles.navLink, isActiveRoute('/') && styles.activeNavLink]}
              >
                <Text style={[styles.navLinkText, isActiveRoute('/') && styles.activeNavLinkText]}>
                  HOME
                </Text>
                {isActiveRoute('/') && <View style={styles.activeBorder} />}
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => handleNavigation('/symptom-checker')}
                style={[styles.navLink, isActiveRoute('/symptom-checker') && styles.activeNavLink]}
              >
                <Text style={[styles.navLinkText, isActiveRoute('/symptom-checker') && styles.activeNavLinkText]}>
                  SYMPTOM CHECKER
                </Text>
                {isActiveRoute('/symptom-checker') && <View style={styles.activeBorder} />}
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => handleNavigation('/first-aid-guide')}
                style={[styles.navLink, isActiveRoute('/first-aid-guide') && styles.activeNavLink]}
              >
                <Text style={[styles.navLinkText, isActiveRoute('/first-aid-guide') && styles.activeNavLinkText]}>
                  FIRST AID GUIDE
                </Text>
                {isActiveRoute('/first-aid-guide') && <View style={styles.activeBorder} />}
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => handleNavigation('/contact')}
                style={[styles.navLink, isActiveRoute('/contact') && styles.activeNavLink]}
              >
                <Text style={[styles.navLinkText, isActiveRoute('/contact') && styles.activeNavLinkText]}>
                  CONTACT US
                </Text>
                {isActiveRoute('/contact') && <View style={styles.activeBorder} />}
              </TouchableOpacity>
            </View>
          )}

          {/* Mobile menu button and user icon */}
          <View style={styles.rightSection}>
            {width < 768 && (
              <TouchableOpacity 
                onPress={() => handleNavigation('/auth/signIn')}
                style={[styles.userButton, pathname.startsWith('/auth') && styles.activeUserButton]}
                activeOpacity={0.7}
              >
                <Ionicons name="person-outline" size={20} color="#000" />
              </TouchableOpacity>
            )}
            
            {width < 768 && (
              <TouchableOpacity 
                onPress={() => setIsMenuOpen(!isMenuOpen)}
                style={styles.menuButton}
                activeOpacity={0.7}
              >
                {isMenuOpen ? (
                  <Ionicons name="close" size={20} color="#000" />
                ) : (
                  <Ionicons name="menu" size={20} color="#000" />
                )}
              </TouchableOpacity>
            )}

            {/* Desktop right side */}
            {width >= 768 && (
              <View style={styles.desktopRightSection}>
                <TouchableOpacity 
                  onPress={() => handleNavigation('/donate')}
                  style={[styles.donateButton, isActiveRoute('/donate') && styles.activeDonateButton]}
                  activeOpacity={0.8}
                >
                  <Text style={styles.donateButtonText}>DONATE</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={() => handleNavigation('/auth/signIn')}
                  style={[styles.userButton, pathname.startsWith('/auth') && styles.activeUserButton]}
                  activeOpacity={0.7}
                >
                  <Ionicons name="person-outline" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Mobile Navigation Menu */}
        {width < 768 && (
          <Animated.View 
            style={[
              styles.mobileMenu,
              {
                height: menuHeight,
                opacity: menuOpacity,
              }
            ]}
          >
            <ScrollView style={styles.mobileMenuContent} showsVerticalScrollIndicator={false}>
              <TouchableOpacity 
                onPress={() => handleNavigation('/')}
                style={[styles.mobileNavLink, isActiveRoute('/') && styles.activeMobileNavLink]}
              >
                <Text style={[styles.mobileNavLinkText, isActiveRoute('/') && styles.activeMobileNavLinkText]}>
                  HOME
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => handleNavigation('/symptom-checker')}
                style={[styles.mobileNavLink, isActiveRoute('/symptom-checker') && styles.activeMobileNavLink]}
              >
                <Text style={[styles.mobileNavLinkText, isActiveRoute('/symptom-checker') && styles.activeMobileNavLinkText]}>
                  SYMPTOM CHECKER
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => handleNavigation('/first-aid-guide')}
                style={[styles.mobileNavLink, isActiveRoute('/first-aid-guide') && styles.activeMobileNavLink]}
              >
                <Text style={[styles.mobileNavLinkText, isActiveRoute('/first-aid-guide') && styles.activeMobileNavLinkText]}>
                  FIRST AID GUIDE
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => handleNavigation('/contact')}
                style={[styles.mobileNavLink, isActiveRoute('/contact') && styles.activeMobileNavLink]}
              >
                <Text style={[styles.mobileNavLinkText, isActiveRoute('/contact') && styles.activeMobileNavLinkText]}>
                  CONTACT US
                </Text>
              </TouchableOpacity>

              <View style={styles.mobileDonateSection}>
                <TouchableOpacity 
                  onPress={() => handleNavigation('/donate')}
                  style={styles.mobileDonateButton}
                  activeOpacity={0.8}
                >
                  <Text style={styles.mobileDonateButtonText}>DONATE NOW</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animated.View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#FFB5B5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  logoContainer: {
    zIndex: 10,
  },
  logoWrapper: {
    width: width < 640 ? 44 : width < 768 ? 48 : 56,
    height: width < 640 ? 44 : width < 768 ? 48 : 56,
    borderRadius: width < 640 ? 22 : width < 768 ? 24 : 28,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  logoFallback: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FA9D9D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoFallbackText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  desktopNav: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    gap: 24,
  },
  navLink: {
    position: 'relative',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  activeNavLink: {
    // Additional styling for active state
  },
  navLinkText: {
    color: '#000',
    fontWeight: '500',
    fontSize: width >= 1024 ? 16 : 14,
  },
  activeNavLinkText: {
    fontWeight: '600',
  },
  activeBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#000',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  desktopRightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  donateButton: {
    backgroundColor: '#fff',
    paddingVertical: width >= 1024 ? 8 : 6,
    paddingHorizontal: width >= 1024 ? 24 : 16,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#000',
  },
  activeDonateButton: {
    backgroundColor: '#f3f4f6',
    transform: [{ translateY: -2 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  donateButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: width >= 1024 ? 16 : 14,
  },
  userButton: {
    padding: 6,
    borderRadius: 20,
  },
  activeUserButton: {
    backgroundColor: '#FA9D9D',
  },
  menuButton: {
    padding: 6,
    borderRadius: 6,
  },
  mobileMenu: {
    overflow: 'hidden',
    backgroundColor: '#FA9D9D',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#FF9A9A',
  },
  mobileMenuContent: {
    paddingVertical: 8,
  },
  mobileNavLink: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  activeMobileNavLink: {
    backgroundColor: '#FFB5B5',
  },
  mobileNavLinkText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 16,
  },
  activeMobileNavLinkText: {
    fontWeight: '600',
  },
  mobileDonateSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#FF9A9A',
    marginTop: 4,
  },
  mobileDonateButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  mobileDonateButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});