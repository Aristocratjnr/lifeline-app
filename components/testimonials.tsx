import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

const StarIcon = ({ filled = true, half = false }) => {
  if (half) {
    return (
      <View style={styles.halfStarContainer}>
        <FontAwesome name="star" size={16} color="#FBBF24" />
        <View style={styles.halfStarOverlay}>
          <FontAwesome name="star" size={16} color="#E5E7EB" />
        </View>
      </View>
    );
  }
  
  return (
    <FontAwesome 
      name={filled ? "star" : "star-o"} 
      size={16} 
      color={filled ? "#FBBF24" : "#E5E7EB"} 
    />
  );
};

export default function Testimonials() {
  const testimonials = [
    {
      name: "Akua Donkor",
      role: "Physician",
      image: require('@/assets/images/akua.png'),
      quote: "Lifeline is an invaluable tool for anyone wanting to be prepared for the unexpected.",
      rating: 5,
    },
    {
      name: "Ataa Ayi",
      role: "Student",
      image: require('@/assets/images/ataa.png'),
      quote: "I woke up with a bad headache and wasn't sure if I should go to the doctor. Lifeline's symptom checker helped me figure out it was likely a migraine and gave me some home remedies to try. It saved me a trip to the clinic!",
      rating: 4.5,
    },
    {
      name: "Diana Asamoah",
      role: "Hiker",
      image: require('@/assets/images/diana.png'),
      quote: "I was hiking in a remote area when a friend twisted his ankle. I had no signal, but Lifeline's offline guide helped me stabilize him until we could get help. This app is a lifesaver!",
      rating: 4.5,
    },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} filled={true} />);
    }

    if (hasHalfStar) {
      stars.push(<StarIcon key="half" half={true} />);
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(<StarIcon key={i} filled={false} />);
    }

    return stars;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Testimonials</Text>
      
      {/* Mobile: Horizontal scroll, Tablet+: Vertical layout */}
      {width < 768 ? (
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.mobileScrollContent}
          decelerationRate="fast"
          snapToInterval={width - 40}
          snapToAlignment="start"
        >
          {testimonials.map((testimonial, index) => (
            <View key={index} style={styles.mobileCard}>
              <View style={styles.mobileAvatarContainer}>
                <View style={styles.mobileAvatarWrapper}>
                  <Image
                    source={testimonial.image}
                    style={styles.avatar}
                    contentFit="cover"
                    onError={() => {
                      console.error(`Failed to load testimonial image: ${testimonial.name}`);
                    }}
                  />
                </View>
              </View>
              
              <View style={styles.mobileContent}>
                <Text style={styles.mobileName}>{testimonial.name}</Text>
                <Text style={styles.mobileRole}>{testimonial.role}</Text>
                
                <Text style={styles.mobileQuote}>
                  &quot;{testimonial.quote}&quot;
                </Text>
                
                <View style={styles.mobileStarsContainer}>
                  {renderStars(testimonial.rating)}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.desktopGrid}>
          {testimonials.map((testimonial, index) => (
            <View key={index} style={styles.desktopCard}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatarWrapper}>
                  <Image
                    source={testimonial.image}
                    style={styles.avatar}
                    contentFit="cover"
                    onError={() => {
                      console.error(`Failed to load testimonial image: ${testimonial.name}`);
                    }}
                  />
                </View>
              </View>
              
              <View style={styles.testimonialContent}>
                <Text style={styles.name}>{testimonial.name}</Text>
                <Text style={styles.role}>{testimonial.role}</Text>
                
                <Text style={styles.quote}>
                  &quot;{testimonial.quote}&quot;
                </Text>
                
                <View style={styles.starsContainer}>
                  {renderStars(testimonial.rating)}
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: width < 768 ? 32 : 48,
    paddingHorizontal: width < 768 ? 0 : 16,
  },
  heading: {
    fontSize: width < 400 ? 24 : width < 768 ? 28 : 40,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: width < 768 ? 32 : 64,
    color: '#000',
    paddingHorizontal: 16,
  },
  
  // Mobile styles
  mobileScrollContent: {
    paddingLeft: 20,
    paddingRight: 20,
    gap: 16,
  },
  mobileCard: {
    width: width - 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 20, // Space for avatar
  },
  mobileAvatarContainer: {
    position: 'absolute',
    top: -24,
    left: 16,
    zIndex: 10,
  },
  mobileAvatarWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mobileContent: {
    paddingTop: 32,
    paddingBottom: 8,
  },
  mobileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  mobileRole: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 12,
    fontWeight: '500',
  },
  mobileQuote: {
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  mobileStarsContainer: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
  },
  
  // Desktop styles
  desktopGrid: {
    flexDirection: width < 1024 ? 'column' : 'row',
    gap: 24,
    maxWidth: 1152,
    alignSelf: 'center',
    width: '100%',
    flexWrap: width >= 1024 ? 'wrap' : 'nowrap',
    justifyContent: 'center',
  },
  desktopCard: {
    flex: width >= 1024 ? 1 : undefined,
    maxWidth: width >= 1024 ? 350 : undefined,
    borderWidth: 1,
    borderColor: '#4b5563',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 32,
  },
  
  // Shared desktop styles
  avatarContainer: {
    position: 'absolute',
    top: -48,
    alignItems: 'center',
    zIndex: 10,
  },
  avatarWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  testimonialContent: {
    paddingTop: 48,
    alignItems: 'center',
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
    fontWeight: '500',
  },
  quote: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
    marginBottom: 16,
    flex: 1,
    fontStyle: 'italic',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 'auto',
  },
  
  // Half star styles
  halfStarContainer: {
    position: 'relative',
    width: 16,
    height: 16,
  },
  halfStarOverlay: {
    position: 'absolute',
    top: 0,
    left: 8,
    width: 8,
    height: 16,
    overflow: 'hidden',
  },
});