import { MaterialIcons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function MainScreen() {
  const router = useRouter();

  // Load JetBrains Mono font
  const [fontsLoaded] = useFonts({
    'JetBrainsMono-Regular': require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('@/assets/fonts/JetBrainsMono-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <ImageBackground 
        source={require('@/assets/images/blur.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <SafeAreaView style={styles.container} edges={['right', 'left']}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Hello! Welcome</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.menuButton}>
                <MaterialIcons name="person" size={24} color="#E53935" />
              </TouchableOpacity>
              <View style={styles.verticalLine} />
              <TouchableOpacity style={styles.menuButton}>
                <MaterialIcons name="more-vert" size={24} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Main Emergency Card */}
          <TouchableOpacity 
            style={styles.emergencyCard}
            onPress={() => router.push('/sos')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#FFE5E5', '#FFCECE', '#FFB5B5']}
              style={styles.emergencyGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.emergencyContent}>
                <View style={styles.emergencyTextContainer}>
                  <Text style={styles.emergencyTitle}>
                    In an{'\n'}
                    <Text style={{fontWeight: '900'}}>Emergency</Text>,
                    {'\n'}We&apos;re your{'\n'}
                    <Text style={styles.emergencyHighlight}>Lifeline</Text>
                  </Text>
                  
                  <TouchableOpacity 
                    style={styles.getStartedButton}
                    onPress={() => router.push('/dashboard')}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.getStartedText}>Get Started!</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.emergencyVideoContainer}>
                  <Video
                    source={require('@/assets/videos/good.mp4')}
                    style={styles.emergencyVideo}
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    shouldPlay
                    isMuted
                  />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* First Aid Tips Card */}
          <TouchableOpacity 
            style={styles.tipsCard}
            onPress={() => router.push('/(screens)/tips')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#FFE5E5', '#FFCECE']}
              style={styles.tipsGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.tipsContent}>
                <View style={styles.tipsTextContainer}>
                  <Text style={styles.tipsTitle}>Tap to get{'\n'}First Aid Tips</Text>
                </View>
                <Image
                  source={require('@/assets/images/aid.png')}
                  style={styles.tipsImage}
                  resizeMode="contain"
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Quiz Card */}
          <TouchableOpacity 
            style={styles.quizCard}
            onPress={() => router.push('/screens/welcome')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#FFE5E5', '#FFCECE']}
              style={styles.quizGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.quizContent}>
                <View style={styles.quizIconContainer}>
                  <Image
                    source={require('@/assets/images/quiz.png')}
                    style={styles.quizImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.quizTextContainer}>
                  <Text style={styles.quizTitle}>Take a quiz to</Text>
                  <Text style={styles.quizSubtitle}>see how well</Text>
                  <Text style={styles.quizSubtitle}>you can save a life</Text>
                  
                  <View style={styles.quizButtonContainer}>
                    <Text style={styles.quizButtonText}>Take Quiz/Learn Soon</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* First Aid Hub Card */}
          <TouchableOpacity 
            style={styles.hubCard}
            onPress={() => router.push('/screens/firstAidGuide')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#FFE5E5', '#FFCECE']}
              style={styles.hubGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.hubContent}>
                <View style={styles.hubTextContainer}>
                  <Text style={styles.hubTitle}>First Aid Hub 🚑</Text>
                </View>
                <View style={styles.hubIconContainer}>
                  <Image
                    source={require('@/assets/images/hub.png')}
                    style={styles.hubImage}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
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
    backgroundColor: 'rgba(255, 255, 255, 0.89)',
    zIndex: 2,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,  // Increased from 40 to 60
    paddingBottom: 40,
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalLine: {
    width: 1,
    height: 24,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
  menuButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'JetBrainsMono-Bold',
  },

  // Emergency Card Styles
  emergencyCard: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  emergencyGradient: {
    padding: 20,
    minHeight: 180,
  },
  emergencyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  emergencyTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'JetBrainsMono-Bold',
    lineHeight: 26,
    marginBottom: 16,
  },
  emergencyHighlight: {
    color: '#E53935',
    fontSize: 22,
    fontFamily: 'JetBrainsMono-Bold',
  },
  getStartedButton: {
    backgroundColor: '#E53935',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'flex-start',
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
  },
  emergencyVideoContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 12,
  },
  emergencyVideo: {
    width: '100%',
    height: '100%',
  },

  // Tips Card Styles
  tipsCard: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  tipsGradient: {
    padding: 16,
    minHeight: 80,
  },
  tipsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tipsIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(229, 57, 53, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipsTextContainer: {
    flex: 1,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'JetBrainsMono-Bold',
    lineHeight: 20,
  },
  tipsImage: {
    width: 80,
    height: 80,
  },

  // Quiz Card Styles
  quizCard: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  quizGradient: {
    padding: 16,
    minHeight: 120,
  },
  quizContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  quizIconContainer: {
    width: 60,  // Increased from 50 to 60
    height: 60, // Increased from 50 to 60
    borderRadius: 30, // Adjusted for new size
    backgroundColor: 'rgba(229, 57, 53, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14, // Slightly increased for better spacing
    marginTop: 4,
  },
  quizImage: {
    width: 60,
    height: 60,
  },
  quizTextContainer: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'JetBrainsMono-Bold',
    marginBottom: 2,
  },
  quizSubtitle: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'JetBrainsMono-Regular',
    lineHeight: 18,
  },
  quizButtonContainer: {
    backgroundColor: '#E53935',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'JetBrainsMono-Bold',
  },

  // Hub Card Styles
  hubCard: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  hubGradient: {
    padding: 16,
    minHeight: 80,
  },
  hubContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hubTextContainer: {
    flex: 1,
  },
  hubTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'JetBrainsMono-Bold',
  },
  hubIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(229, 57, 53, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  hubImage: {
    width: '100%',
    height: '100%',
  },
});