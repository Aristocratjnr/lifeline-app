import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker, UrlTile } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

// Types for hospital and location to match Nominatim response
interface Hospital {
  place_id: string;
  name: string;
  display_name: string;
  lat: string;
  lon: string;
  category: string;
  type: string;
  phone?: string; // Optional phone number for hospitals
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const params = useLocalSearchParams();

  const [location, setLocation] = useState<UserLocation | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [sosMarker, setSosMarker] = useState<UserLocation | null>(null);

  // Emergency contact numbers for Ghana (can be expanded for other countries)
  const emergencyContacts = {
    ambulance: '193',
    fire: '192',
    police: '191',
    general: '112', // European emergency number, also works in Ghana
  };

  const handleCallEmergency = (number: string) => {
    Linking.openURL(`tel:${number}`).catch(() => {
      alert('Unable to make phone call');
    });
  };

  useEffect(() => {
    // If lat/lng params are present, use them as SOS marker and center
    if (params.lat && params.lng) {
      const lat = parseFloat(params.lat as string);
      const lng = parseFloat(params.lng as string);
      const sosLoc = { latitude: lat, longitude: lng };
      setSosMarker(sosLoc);
      setLocation(sosLoc);
      setLoading(false);
      fetchHospitals(sosLoc);
    } else {
      (async () => {
        setLoading(true);
        setErrorMsg('');
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied.');
            setLoading(false);
            return;
          }
          let loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
          const userLocation = { latitude: loc.coords.latitude, longitude: loc.coords.longitude };
          setLocation(userLocation);
          fetchHospitals(userLocation);
        } catch {
          setErrorMsg('Could not get your location.');
          setLoading(false);
        }
      })();
    }
     
  }, [params.lat, params.lng]);

  const fetchHospitals = async (coords: UserLocation) => {
    try {
      const radiusKm = 10; // Search radius
      const latDeg = radiusKm / 111.32;
      const lonDeg = radiusKm / (111.32 * Math.cos(coords.latitude * (Math.PI / 180)));
      
      const viewBox = `${coords.longitude - lonDeg},${coords.latitude + latDeg},${coords.longitude + lonDeg},${coords.latitude - latDeg}`;

      // Nominatim API for nearby hospitals, bounded to the viewbox
      // Include extratags to get additional information like phone numbers
      const url = `https://nominatim.openstreetmap.org/search?q=hospital&format=jsonv2&viewbox=${viewBox}&bounded=1&limit=50&extratags=1&namedetails=1`;
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'LifelineApp/1.0 (https://lifeline-mu.vercel.app)' // Nominatim requires a user-agent
        }
      });
      const data: any[] = await response.json();

      if (data && data.length > 0) {
        // Filter results to only include actual hospitals and add phone numbers if available
        const filteredHospitals: Hospital[] = data
          .filter((place) => place.category === 'amenity' && place.type === 'hospital')
          .map((place) => ({
            place_id: place.place_id,
            name: place.name || place.display_name.split(',')[0],
            display_name: place.display_name,
            lat: place.lat,
            lon: place.lon,
            category: place.category,
            type: place.type,
            phone: place.extratags?.phone || place.extratags?.contact?.phone || place.extratags?.['contact:phone']
          }));
        
        if (filteredHospitals.length > 0) {
          setHospitals(filteredHospitals);
        } else {
          setErrorMsg('No hospitals found within a 10km radius.');
        }
      } else {
        setErrorMsg('No hospitals found nearby.');
      }
    } catch {
      setErrorMsg('Failed to fetch hospitals.');
    }
    setLoading(false);
  };

  const handleGetDirections = (hospital: Hospital) => {
    const destination = `${hospital.lat},${hospital.lon}`;
    const url = Platform.select({
      ios: `maps:?daddr=${destination}`,
      android: `google.navigation:q=${destination}`,
    });

    if (url) {
      Linking.canOpenURL(url)
        .then((supported) => {
          if (supported) {
            return Linking.openURL(url);
          }
          // Fallback to web URL
          const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
          return Linking.openURL(webUrl);
        })
        .catch(() => alert('Could not open maps application.'));
    }
  };

  const router = useRouter();

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // Fallback to main screen if no navigation history
      router.replace('/main');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#1a1a1a' : '#fff' }}>
      <TouchableOpacity 
        style={[styles.backButton, isDark && styles.darkBackButton]} 
        onPress={handleGoBack}
      >
        <FontAwesome name="arrow-left" size={24} color={isDark ? '#fff' : '#000'} />
      </TouchableOpacity>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FC7A7A" />
          <Text style={styles.loadingText}>Finding hospitals near you...</Text>
        </View>
      )}
      {!loading && errorMsg ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      ) : null}
      {!loading && location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsMyLocationButton
        >
          <UrlTile
            urlTemplate="http://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
          />
          {hospitals.map((hospital) => (
            <Marker
              key={hospital.place_id}
              coordinate={{
                latitude: parseFloat(hospital.lat),
                longitude: parseFloat(hospital.lon),
              }}
              title={hospital.name}
              anchor={{ x: 0.5, y: 1 }} // Center the pin tip
            >
              <View style={styles.markerContainer}>
                <View style={styles.markerPin}>
                  <FontAwesome name="hospital-o" size={20} color="#fff" />
                </View>
                <View style={styles.markerPinTriangle} />
              </View>
              <Callout style={styles.calloutContainer} onPress={() => handleGetDirections(hospital)}>
                <View style={styles.calloutContent}>
                  <Text style={styles.calloutTitle}>{hospital.name}</Text>
                  <Text style={styles.calloutAddress}>{hospital.display_name}</Text>
                  
                  <View style={styles.emergencySection}>
                    <Text style={styles.emergencyTitle}>📞 Emergency Contacts:</Text>
                    <TouchableOpacity 
                      style={styles.emergencyButton}
                      onPress={() => handleCallEmergency(emergencyContacts.ambulance)}
                    >
                      <Text style={styles.emergencyButtonText}>🚑 Ambulance: {emergencyContacts.ambulance}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.emergencyButton}
                      onPress={() => handleCallEmergency(emergencyContacts.general)}
                    >
                      <Text style={styles.emergencyButtonText}>🆘 Emergency: {emergencyContacts.general}</Text>
                    </TouchableOpacity>
                    {hospital.phone && (
                      <TouchableOpacity 
                        style={styles.emergencyButton}
                        onPress={() => handleCallEmergency(hospital.phone!)}
                      >
                        <Text style={styles.emergencyButtonText}>🏥 Hospital: {hospital.phone}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  
                  <View style={styles.directionsSection}>
                    <Text style={styles.directionsText}>🚗 Tap anywhere to get directions</Text>
                  </View>
                </View>
              </Callout>
            </Marker>
          ))}
          {sosMarker && (
            <Marker
              coordinate={sosMarker}
              title="SOS Location"
              pinColor="#EF4444"
              anchor={{ x: 0.5, y: 1 }}
            >
              <View style={styles.markerContainer}>
                <View style={[styles.markerPin, { backgroundColor: '#EF4444' }] }>
                  <FontAwesome name="exclamation" size={20} color="#fff" />
                </View>
                <View style={[styles.markerPinTriangle, { borderTopColor: '#EF4444' }]} />
              </View>
            </Marker>
          )}
          {!sosMarker && location && (
            <Marker
              coordinate={location}
              title="Your Location"
              anchor={{ x: 0.5, y: 1 }}
            >
              <View style={styles.markerContainer}>
                <View style={[styles.markerPin, styles.userMarkerPin]}>
                  <FontAwesome name="user" size={20} color="#fff" />
                </View>
                <View style={[styles.markerPinTriangle, styles.userMarkerPinTriangle]} />
              </View>
            </Marker>
          )}
        </MapView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 50, // Lowered the button position
    left: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  darkBackButton: {
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#FC7A7A',
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    color: '#FC7A7A',
    fontSize: 16,
    textAlign: 'center',
  },
  markerBubble: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderColor: '#FC7A7A',
    borderWidth: 1,
    minWidth: 80,
    maxWidth: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  markerText: {
    color: '#FC7A7A',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
  // Custom marker styles
  markerContainer: {
    alignItems: 'center',
  },
  markerPin: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FC7A7A',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  markerPinTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FC7A7A',
    alignSelf: 'center',
    marginTop: -2,
  },
  userMarkerPin: {
    backgroundColor: '#3498db',
  },
  userMarkerPinTriangle: {
    borderTopColor: '#3498db',
  },
  // Callout styles
  calloutContainer: {
    width: 280,
    minHeight: 120,
  },
  calloutContent: {
    padding: 12,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  calloutAddress: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 16,
  },
  emergencySection: {
    marginVertical: 8,
  },
  emergencyTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  emergencyButton: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FC7A7A',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginVertical: 2,
  },
  emergencyButtonText: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '500',
  },
  directionsSection: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  directionsText: {
    fontSize: 11,
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
