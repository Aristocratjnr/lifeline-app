# Weather Integration Guide

## Overview
The Lifeline app now uses real-time weather data instead of mock data. The integration supports multiple weather APIs with fallback options to ensure reliability.

## Weather APIs Used

### Primary: wttr.in (Free, No API Key Required)
- **URL**: https://wttr.in/
- **Features**: Free weather service, no registration required
- **Coverage**: Global weather data
- **Format**: JSON format support
- **Limitations**: Rate limiting may apply

### Fallback: OpenWeatherMap (Free Tier Available)
- **URL**: https://openweathermap.org/api
- **Features**: Comprehensive weather data
- **API Key**: Required (free tier available)
- **To setup**: 
  1. Sign up at https://openweathermap.org/api
  2. Get your free API key
  3. Add `OPENWEATHER_API_KEY=your_key` to your `.env` file

## Location Services

The app uses Expo Location to get the user's current position:
- **Permission**: Requests location permission on first use
- **Fallback**: Uses Accra, Ghana coordinates if permission denied
- **Accuracy**: Balanced accuracy for battery optimization

## Features

### Real-time Data
- Current temperature
- Weather conditions
- Humidity percentage
- Wind speed (km/h)
- Location name
- Weather description

### User Experience
- Loading indicators while fetching data
- Manual refresh button
- Graceful error handling
- Offline fallback data

### Weather Icons
Weather conditions are mapped to appropriate Ionicons:
- `sunny` - Clear sky
- `partly-sunny` - Few clouds
- `cloudy` - Overcast
- `rainy` - Rain/drizzle
- `thunderstorm` - Storms
- `snow` - Snow conditions

## Error Handling

The weather service implements multiple fallback layers:
1. **Primary API fails** → Try secondary API
2. **All APIs fail** → Show cached/default data
3. **Location denied** → Use default location (Accra, Ghana)
4. **Network issues** → Show appropriate error message

## Implementation Details

### Files Modified
- `services/weatherService.ts` - New weather service
- `components/DashboardScreen.tsx` - Updated to use real weather data

### Key Functions
- `fetchWeatherData()` - Main weather fetching function
- `getUserLocation()` - Location permission and coordinates
- `refreshWeatherData()` - Manual refresh functionality

## Usage

The weather widget automatically:
1. Requests location permission when first loaded
2. Fetches current weather data for user's location
3. Updates the dashboard with real-time information
4. Allows manual refresh via the refresh button

## Troubleshooting

### No Weather Data
- Check internet connection
- Verify location permissions are granted
- Check console for API errors

### Location Issues
- Ensure location services are enabled
- Grant location permission when prompted
- App will use default location (Accra) if permission denied

### API Rate Limits
- The primary service (wttr.in) is free but may have rate limits
- If using OpenWeatherMap, check your API key and usage limits

## Future Improvements

Potential enhancements:
- Weather forecasts (3-5 day)
- Weather alerts and warnings
- Multiple location support
- Weather-based health recommendations
- Caching for offline use
