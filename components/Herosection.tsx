import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Counter from './Counter';

const { width } = Dimensions.get('window');

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [hoveredAbout, setHoveredAbout] = useState<string | null>(null);

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>
              <Text style={styles.bold}>Lifeline:</Text> Your answer and your emergency toolkit, so{' '}
              <View style={styles.highlightWrapper}>
                <Text style={styles.highlightText}>you</Text>
                <View style={styles.underline} />
              </View>{' '}
              can...
            </Text>
            
            <Text style={styles.description}>
              Lifeline provides instant access to crucial first-aid information during emergencies, ensuring you&apos;re
              prepared to act quickly and effectively.
            </Text>
            
            <Text style={styles.description}>
              Your pocket guide to handling medical emergencies with confidence.
            </Text>
            
            <Text style={styles.description}>
              Empowering you to take control in critical situations, with clear, step-by-step guidance.
            </Text>
          </View>
          
          <View style={styles.heroImage}>
            <View style={styles.heroImagePlaceholder}>
              <Image
                source={require('@/assets/images/woman.png')} 
                style={styles.nurseImage}
                contentFit="contain"
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  console.error("Nurse image failed to load");
                  setImageLoaded(false);
                }}
              />
              {!imageLoaded && (
                <View style={styles.imageFallback}>
                  <FontAwesome5 name="user-nurse" size={80} color="#FC7A7A" />
                  <Text style={styles.fallbackText}>Medical Professional</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            {/* Lifeliners Stat */}
            <TouchableOpacity style={styles.statCard} activeOpacity={0.8}>
              <View style={styles.statContent}>
                <View style={styles.counterContainer}>
                  <Text style={styles.counterText}>
                    <Counter end={100} duration={2000} />
                  </Text>
                  <Text style={styles.plusSign}>+</Text>
                </View>
                <Text style={styles.statLabel}>Lifeliners</Text>
                <View style={styles.statUnderline} />
              </View>
            </TouchableOpacity>

            {/* Emergency Scenarios Stat */}
            <TouchableOpacity style={styles.statCard} activeOpacity={0.8}>
              <View style={styles.statContent}>
                <View style={styles.counterContainer}>
                  <Text style={styles.counterText}>
                    <Counter end={46} duration={1800} />
                  </Text>
                  <Text style={styles.plusSign}>+</Text>
                </View>
                <Text style={styles.statLabel}>Emergency Scenarios</Text>
                <View style={styles.statUnderline} />
              </View>
            </TouchableOpacity>

            {/* Medical Professionals Stat */}
            <TouchableOpacity style={styles.statCard} activeOpacity={0.8}>
              <View style={styles.statContent}>
                <View style={styles.counterContainer}>
                  <Text style={styles.counterText}>
                    <Counter end={10} duration={1500} />
                  </Text>
                  <Text style={styles.plusSign}>+</Text>
                </View>
                <Text style={styles.statLabel}>Medical Professionals</Text>
                <View style={styles.statUnderline} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <View style={styles.featuresContainer}>
            <View style={styles.featuresGrid}>
              {/* URGENT */}
              <TouchableOpacity 
                style={[
                  styles.featureCard,
                  hoveredFeature === 'urgent' && styles.featureCardHovered
                ]}
                activeOpacity={0.8}
                onPressIn={() => setHoveredFeature('urgent')}
                onPressOut={() => setHoveredFeature(null)}
              >
                <View style={[
                  styles.featureHoverCard,
                  hoveredFeature === 'urgent' && styles.featureHoverCardActive
                ]} />
                <View style={styles.featureContent}>
                  <View style={[
                    styles.featureIcon,
                    hoveredFeature === 'urgent' && styles.featureIconHovered
                  ]}>
                    <Ionicons name="alarm" size={32} color="#FC7A7A" />
                  </View>
                  <Text style={[
                    styles.featureTitle,
                    hoveredFeature === 'urgent' && styles.featureTitleHovered
                  ]}>URGENT</Text>
                  <Text style={styles.featureDescription}>
                    Lifeline recognizes the critical nature of emergencies and delivers information and tools for rapid
                    response.
                  </Text>
                </View>
              </TouchableOpacity>

              {/* ACCURACY */}
              <TouchableOpacity 
                style={[
                  styles.featureCard,
                  hoveredFeature === 'accuracy' && styles.featureCardHovered
                ]}
                activeOpacity={0.8}
                onPressIn={() => setHoveredFeature('accuracy')}
                onPressOut={() => setHoveredFeature(null)}
              >
                <View style={[
                  styles.featureHoverCard,
                  hoveredFeature === 'accuracy' && styles.featureHoverCardActive
                ]} />
                <View style={styles.featureContent}>
                  <View style={[
                    styles.featureIcon,
                    hoveredFeature === 'accuracy' && styles.featureIconHovered
                  ]}>
                    <Ionicons name="checkmark-circle" size={32} color="#FC7A7A" />
                  </View>
                  <Text style={[
                    styles.featureTitle,
                    hoveredFeature === 'accuracy' && styles.featureTitleHovered
                  ]}>ACCURACY</Text>
                  <Text style={styles.featureDescription}>
                    Lifeline&apos;s content is sourced from trusted medical authorities and rigorously reviewed by
                    healthcare professionals.
                  </Text>
                </View>
              </TouchableOpacity>

              {/* ACCESSIBLE */}
              <TouchableOpacity 
                style={[
                  styles.featureCard,
                  hoveredFeature === 'accessible' && styles.featureCardHovered
                ]}
                activeOpacity={0.8}
                onPressIn={() => setHoveredFeature('accessible')}
                onPressOut={() => setHoveredFeature(null)}
              >
                <View style={[
                  styles.featureHoverCard,
                  hoveredFeature === 'accessible' && styles.featureHoverCardActive
                ]} />
                <View style={styles.featureContent}>
                  <View style={[
                    styles.featureIcon,
                    hoveredFeature === 'accessible' && styles.featureIconHovered
                  ]}>
                    <Ionicons name="globe" size={32} color="#FC7A7A" />
                  </View>
                  <Text style={[
                    styles.featureTitle,
                    hoveredFeature === 'accessible' && styles.featureTitleHovered
                  ]}>ACCESSIBLE</Text>
                  <Text style={styles.featureDescription}>
                    Lifeline is designed to be user-friendly and accessible to everyone, regardless of technical skills
                    or circumstances.
                  </Text>
                </View>
              </TouchableOpacity>

              {/* EMPOWERING */}
              <TouchableOpacity 
                style={[
                  styles.featureCard,
                  hoveredFeature === 'empowering' && styles.featureCardHovered
                ]}
                activeOpacity={0.8}
                onPressIn={() => setHoveredFeature('empowering')}
                onPressOut={() => setHoveredFeature(null)}
              >
                <View style={[
                  styles.featureHoverCard,
                  hoveredFeature === 'empowering' && styles.featureHoverCardActive
                ]} />
                <View style={styles.featureContent}>
                  <View style={[
                    styles.featureIcon,
                    hoveredFeature === 'empowering' && styles.featureIconHovered
                  ]}>
                    <MaterialIcons name="self-improvement" size={32} color="#FC7A7A" />
                  </View>
                  <Text style={[
                    styles.featureTitle,
                    hoveredFeature === 'empowering' && styles.featureTitleHovered
                  ]}>EMPOWERMENT</Text>
                  <Text style={styles.featureDescription}>
                    Lifeline equips individuals with the knowledge and confidence to take decisive action in
                    emergencies.
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* About Us Section - Web-like 3-column grid */}
        <View style={styles.aboutSection}>
          <View style={styles.aboutContainer}>
            <View style={styles.aboutGrid}>
              {/* First Aid Kit Illustration */}
              <TouchableOpacity 
                style={[
                  styles.aboutCard,
                  hoveredAbout === 'image' && styles.aboutCardHovered
                ]}
                activeOpacity={0.8}
                onPressIn={() => setHoveredAbout('image')}
                onPressOut={() => setHoveredAbout(null)}
              >
                <View style={[
                  styles.aboutHoverCard,
                  hoveredAbout === 'image' && styles.aboutHoverCardActive
                ]} />
                <View style={styles.aboutImageContainer}>
                  <Image
                    source={require('@/assets/images/bucket.png')}
                    style={styles.firstAidImage}
                    contentFit="contain"
                    onError={() => {
                      console.error("First aid kit image failed to load");
                    }}
                  />
                  <View style={styles.firstAidFallback}>
                    <FontAwesome5 name="first-aid" size={60} color="#FC7A7A" />
                    <Text style={styles.placeholderText}>First Aid Kit</Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* About Us */}
              <TouchableOpacity 
                style={[
                  styles.aboutCard,
                  hoveredAbout === 'about' && styles.aboutCardHovered
                ]}
                activeOpacity={0.8}
                onPressIn={() => setHoveredAbout('about')}
                onPressOut={() => setHoveredAbout(null)}
              >
                <View style={[
                  styles.aboutHoverCard,
                  hoveredAbout === 'about' && styles.aboutHoverCardActive
                ]} />
                <View style={styles.aboutContent}>
                  <Text style={[
                    styles.aboutTitle,
                    hoveredAbout === 'about' && styles.aboutTitleHovered
                  ]}>About Us</Text>
                  <Text style={styles.aboutText}>
                    Lifeline was created by a team of dedicated healthcare professionals and technology experts who
                    recognized the critical need for accessible and reliable first aid information during emergencies.
                    Our mission is to empower individuals with the knowledge and tools to take swift and effective
                    action, potentially saving lives and minimizing the impact of medical crises.
                  </Text>
                  <Text style={styles.aboutText}>
                    The exciting thing also is that it can be accessed{' '}
                    <Text style={[
                      styles.offlineText,
                      hoveredAbout === 'about' && styles.offlineTextHovered
                    ]}>OFFLINE</Text>
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Why Choose Us */}
              <TouchableOpacity 
                style={[
                  styles.aboutCard,
                  hoveredAbout === 'why' && styles.aboutCardHovered
                ]}
                activeOpacity={0.8}
                onPressIn={() => setHoveredAbout('why')}
                onPressOut={() => setHoveredAbout(null)}
              >
                <View style={[
                  styles.aboutHoverCard,
                  hoveredAbout === 'why' && styles.aboutHoverCardActive
                ]} />
                <View style={styles.aboutContent}>
                  <Text style={[
                    styles.aboutTitle,
                    hoveredAbout === 'why' && styles.aboutTitleHovered
                  ]}>Why Choose Us</Text>
                  
                  <View style={styles.whyChooseItem}>
                    <View style={[
                      styles.whyChooseIcon,
                      hoveredAbout === 'why' && styles.whyChooseIconHovered
                    ]}>
                      <FontAwesome5 name="user-md" size={24} color="#FC7A7A" />
                    </View>
                    <View style={styles.whyChooseContent}>
                      <Text style={styles.whyChooseTitle}>Expert-Backed Information</Text>
                      <Text style={styles.whyChooseText}>
                        Lifeline&apos;s content is developed, reviewed, validated by certified medical professionals,
                        adhering to the latest guidelines from reputable organizations.
                      </Text>
                    </View>
                  </View>

                  <View style={styles.whyChooseItem}>
                    <View style={[
                      styles.whyChooseIcon,
                      hoveredAbout === 'why' && styles.whyChooseIconHovered
                    ]}>
                      <Ionicons name="accessibility" size={24} color="#FC7A7A" />
                    </View>
                    <View style={styles.whyChooseContent}>
                      <Text style={styles.whyChooseTitle}>Accessible and User-Friendly</Text>
                      <Text style={styles.whyChooseText}>
                        We prioritize a clean, intuitive design, ensuring that our app is easy to navigate and
                        understand, even in high-stress situations.
                      </Text>
                    </View>
                  </View>

                  <View style={styles.whyChooseItem}>
                    <View style={[
                      styles.whyChooseIcon,
                      hoveredAbout === 'why' && styles.whyChooseIconHovered
                    ]}>
                      <Ionicons name="library" size={24} color="#FC7A7A" />
                    </View>
                    <View style={styles.whyChooseContent}>
                      <Text style={styles.whyChooseTitle}>Comprehensive Coverage</Text>
                      <Text style={styles.whyChooseText}>
                        From common injuries to critical medical events, Lifeline offers a wide range of first aid
                        guides and resources, equipping you with the knowledge to handle various emergencies.
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  heroSection: {
    flexDirection: width >= 768 ? 'row' : 'column',
    alignItems: 'center',
    gap: width >= 768 ? 32 : 24,
    marginBottom: 32,
  },
  heroText: {
    flex: width >= 768 ? 1 : undefined,
    width: width >= 768 ? undefined : '100%',
    alignItems: width >= 768 ? 'flex-start' : 'center',
  },
  heroTitle: {
    fontSize: width < 400 ? 20 : width < 640 ? 24 : width < 768 ? 28 : 36,
    fontWeight: 'bold',
    lineHeight: width < 400 ? 28 : width < 640 ? 32 : width < 768 ? 36 : 44,
    marginBottom: 12,
    textAlign: width >= 768 ? 'left' : 'center',
    color: '#000',
  },
  bold: {
    fontWeight: 'bold',
  },
  highlightWrapper: {
    position: 'relative',
  },
  highlightText: {
    position: 'relative',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#ec4899',
  },
  description: {
    fontSize: width < 640 ? 14 : 16,
    marginBottom: 12,
    textAlign: width >= 768 ? 'left' : 'center',
    lineHeight: 22,
    color: '#374151',
  },
  heroImage: {
    flex: width >= 768 ? 1 : undefined,
    width: width >= 768 ? undefined : '100%',
    height: width < 640 ? 192 : width < 768 ? 224 : 320,
    position: 'relative',
    marginTop: width >= 768 ? 0 : 16,
  },
  heroImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  nurseImage: {
    width: '100%',
    height: '100%',
  },
  imageFallback: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  fallbackText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FC7A7A',
    marginTop: 8,
    textAlign: 'center',
  },
  statsSection: {
    marginTop: width < 640 ? 32 : 48,
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: width < 640 ? 'column' : 'row',
    gap: 24,
  },
  statCard: {
    backgroundColor: '#F5D7D7',
    borderRadius: 16,
    padding: 24,
    flex: width < 640 ? undefined : 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statContent: {
    alignItems: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    position: 'relative',
  },
  counterText: {
    fontSize: width < 640 ? 48 : 60,
    fontWeight: '800',
    color: '#FC7A7A',
  },
  plusSign: {
    fontSize: width < 640 ? 24 : 30,
    fontWeight: 'bold',
    color: '#FC7A7A',
    marginLeft: 4,
  },
  statLabel: {
    fontSize: width < 640 ? 16 : 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#374151',
  },
  statUnderline: {
    width: 64,
    height: 4,
    backgroundColor: '#FC7A7A',
    borderRadius: 2,
  },
  featuresSection: {
    marginTop: width < 640 ? 48 : 64,
  },
  featuresContainer: {
    backgroundColor: '#F8D7D7',
    borderRadius: 24,
    padding: width < 640 ? 16 : 24,
    borderWidth: 2,
    borderColor: '#000',
    overflow: 'visible',
  },
  featuresGrid: {
    flexDirection: width < 1024 ? 'column' : 'row',
    gap: width < 640 ? 16 : 12,
  },
  featureCard: {
    position: 'relative',
    flex: width < 1024 ? undefined : 1,
    padding: width < 640 ? 16 : 24,
    overflow: 'visible',
  },
  featureCardHovered: {
    transform: [{ scale: 1.02 }],
  },
  featureHoverCard: {
    position: 'absolute',
    inset: 0,
    backgroundColor: '#F8D7D7',
    borderRadius: 24,
    zIndex: 1,
    margin: 0,
  },
  featureHoverCardActive: {
    backgroundColor: '#FA9D9D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#000',
    margin: -24,
  },
  featureContent: {
    alignItems: 'center',
    position: 'relative',
    zIndex: 10,
  },
  featureIcon: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  featureIconHovered: {
    transform: [{ scale: 1.1 }],
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
    color: '#000',
  },
  featureTitleHovered: {
    color: '#aa4f4f',
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    color: '#374151',
  },
  aboutSection: {
    marginTop: width < 640 ? 64 : 96,
  },
  aboutContainer: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: width < 640 ? 16 : 24,
    borderWidth: 2,
    borderColor: '#000',
    overflow: 'visible',
  },
  aboutGrid: {
    flexDirection: 'column',
    gap: 0,
  },
  aboutCard: {
    position: 'relative',
    padding: width < 640 ? 16 : width < 768 ? 24 : 32,
    overflow: 'visible',
    borderBottomWidth: 2,
    borderColor: '#000',
  },
  aboutCardHovered: {
    transform: [{ scale: 1.02 }],
  },
  aboutHoverCard: {
    position: 'absolute',
    inset: 0,
    backgroundColor: '#fff',
    borderRadius: 0,
    zIndex: 1,
  },
  aboutHoverCardActive: {
    backgroundColor: '#F8D7D7',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#000',
    margin: -24,
  },
  aboutImageContainer: {
    width: '100%',
    height: width < 400 ? 200 : width < 640 ? 240 : width < 768 ? 280 : 320,
    position: 'relative',
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  firstAidImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  firstAidFallback: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB5B5',
    borderRadius: 12,
    gap: 12,
    opacity: 0,
  },
  placeholderText: {
    fontSize: width < 400 ? 14 : 16,
    fontWeight: 'bold',
    color: '#FC7A7A',
  },
  aboutContent: {
    alignItems: width < 640 ? 'center' : 'flex-start',
    position: 'relative',
    zIndex: 10,
  },
  aboutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: width < 640 ? 'center' : 'left',
    color: '#000',
  },
  aboutTitleHovered: {
    color: '#FC7A7A',
  },
  aboutText: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: width < 640 ? 'center' : 'left',
    lineHeight: 20,
    color: '#374151',
  },
  offlineText: {
    color: '#dc2626',
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
  offlineTextHovered: {
    color: '#FC7A7A',
  },
  whyChooseItem: {
    flexDirection: width < 640 ? 'column' : 'row',
    gap: 16,
    marginBottom: 24,
    alignItems: width < 640 ? 'center' : 'flex-start',
  },
  whyChooseIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
  },
  whyChooseIconHovered: {
    backgroundColor: '#F8D7D7',
  },
  whyChooseContent: {
    flex: 1,
    alignItems: width < 640 ? 'center' : 'flex-start',
  },
  whyChooseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: width < 640 ? 'center' : 'left',
    color: '#000',
  },
  whyChooseText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: width < 640 ? 'center' : 'left',
    color: '#6b7280',
  },
});