import * as Location from 'expo-location';

// Environment variables following the same pattern as firstAidNews.tsx
const OPENWEATHER_API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  description: string;
}

export interface WeatherApiResponse {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

// Map OpenWeatherMap icons to Ionicons
const getIoniconName = (weatherIcon: string): string => {
  const iconMap: { [key: string]: string } = {
    '01d': 'sunny',           // clear sky day
    '01n': 'moon',            // clear sky night
    '02d': 'partly-sunny',    // few clouds day
    '02n': 'cloudy-night',    // few clouds night
    '03d': 'cloudy',          // scattered clouds
    '03n': 'cloudy',          // scattered clouds
    '04d': 'cloudy',          // broken clouds
    '04n': 'cloudy',          // broken clouds
    '09d': 'rainy',           // shower rain
    '09n': 'rainy',           // shower rain
    '10d': 'rainy',           // rain day
    '10n': 'rainy',           // rain night
    '11d': 'thunderstorm',    // thunderstorm
    '11n': 'thunderstorm',    // thunderstorm
    '13d': 'snow',            // snow
    '13n': 'snow',            // snow
    '50d': 'cloudy',          // mist
    '50n': 'cloudy',          // mist
  };
  
  return iconMap[weatherIcon] || 'partly-sunny';
};

// Get user's location using Expo Location
const getUserLocation = async (): Promise<{ latitude: number; longitude: number }> => {
  try {
    // Request permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      console.warn('Location permission denied, using default location (Accra, Ghana)');
      return {
        latitude: 5.6037,
        longitude: -0.1870,
      };
    }

    // Get current location
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.warn('Failed to get location, using default location (Accra, Ghana):', error);
    return {
      latitude: 5.6037,
      longitude: -0.1870,
    };
  }
};

// Alternative free weather service using wttr.in (no API key required)
export const fetchWeatherDataWttr = async (): Promise<WeatherData> => {
  try {
    const location = await getUserLocation();
    
    // Using wttr.in - a free weather service that doesn't require API key
    const response = await fetch(
      `https://wttr.in/${location.latitude},${location.longitude}?format=j1`,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'LifelineApp/1.0',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Weather service responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    const current = data.current_condition[0];
    const area = data.nearest_area[0];
    
    return {
      location: `${area.areaName[0].value}, ${area.country[0].value}`,
      temperature: Math.round(parseFloat(current.temp_C)),
      condition: current.weatherDesc[0].value,
      humidity: parseInt(current.humidity),
      windSpeed: Math.round(parseFloat(current.windspeedKmph)),
      icon: getWeatherIconFromCondition(current.weatherDesc[0].value),
      description: current.weatherDesc[0].value,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    // Return fallback data for Accra, Ghana
    return {
      location: 'Accra, Ghana',
      temperature: 28,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      icon: 'partly-sunny',
      description: 'Unable to fetch current weather',
    };
  }
};

// Helper function to map weather conditions to Ionicons
const getWeatherIconFromCondition = (condition: string): string => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
    return 'sunny';
  } else if (conditionLower.includes('cloud')) {
    if (conditionLower.includes('partly') || conditionLower.includes('few')) {
      return 'partly-sunny';
    }
    return 'cloudy';
  } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return 'rainy';
  } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
    return 'thunderstorm';
  } else if (conditionLower.includes('snow')) {
    return 'snow';
  } else if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
    return 'cloudy';
  }
  
  return 'partly-sunny';
};

// Alternative using OpenWeatherMap (requires API key but has free tier)
export const fetchWeatherDataOpenWeather = async (apiKey?: string): Promise<WeatherData> => {
  if (!apiKey) {
    // Fall back to wttr.in if no API key provided
    return fetchWeatherDataWttr();
  }

  try {
    const location = await getUserLocation();
    
    const response = await fetch(
      `${WEATHER_API_BASE_URL}?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error(`OpenWeatherMap API responded with status: ${response.status}`);
    }

    const data: WeatherApiResponse = await response.json();
    
    return {
      location: data.name,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      icon: getIoniconName(data.weather[0].icon),
      description: data.weather[0].description,
    };
  } catch (error) {
    console.error('Error fetching weather data from OpenWeatherMap:', error);
    
    // Fallback to wttr.in
    return fetchWeatherDataWttr();
  }
};

// Main weather service function - tries multiple sources with priority to OpenWeatherMap
export const fetchWeatherData = async (): Promise<WeatherData> => {
  try {
    // First try OpenWeatherMap with API key if available (more reliable and accurate)
    if (OPENWEATHER_API_KEY) {
      console.log('Using OpenWeatherMap API for real-time weather data');
      return await fetchWeatherDataOpenWeather(OPENWEATHER_API_KEY);
    }
    
    // Fallback to wttr.in (free, no API key required)
    console.log('Using wttr.in API for weather data');
    return await fetchWeatherDataWttr();
  } catch (error) {
    console.error('Primary weather service failed, trying backup:', error);
    
    try {
      // If OpenWeatherMap failed, try wttr.in
      if (OPENWEATHER_API_KEY) {
        console.log('OpenWeatherMap failed, falling back to wttr.in');
        return await fetchWeatherDataWttr();
      }
    } catch (fallbackError) {
      console.error('Backup weather service also failed:', fallbackError);
    }
    
    // Final fallback - return default data
    console.warn('All weather services failed, using fallback data');
    return {
      location: 'Accra, Ghana',
      temperature: 28,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      icon: 'partly-sunny',
      description: 'Weather data unavailable',
    };
  }
};
