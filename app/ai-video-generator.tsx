import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'; // HeyGen API configuration
const HEYGEN_API_KEY = process.env.EXPO_PUBLIC_HEYGEN_API_KEY;
const HEYGEN_API_URL = 'https://api.heygen.com/v2/video/generate';

interface VideoRequest {
  video_inputs: {
    character: {
      type: string;
      avatar_id: string;
    };
    voice: {
      type: string;
      voice_id: string;
      input_text: string;
    };
    background?: {
      type: string;
      color?: string;
    };
  }[];
  dimension?: {
    width: number;
    height: number;
  };
  aspect_ratio?: string;
  test?: boolean;
}

interface VideoResponse {
  code: number;
  data?: {
    video_id: string;
    video_url?: string;
    status?: string;
  };
  message?: string;
  error?: {
    code: string;
    message: string;
  };
}

export default function AIVideoGeneratorScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [request, setRequest] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoId, setGeneratedVideoId] = useState<string | null>(null);
  const [videoStatus, setVideoStatus] = useState<string>('');

  // Available avatar options (fallback system) - Updated with more current options
  const availableAvatars = [
    'Daisy-iF7WnQdcht',  // Newer format avatar
    'Tyler-incasualsuit-20220721',
    'Anna_public_3_20240108',
    'Susan_public_2_20240328',
    'josh_lite_20230714',  // lowercase variant
    'Eric_public_pro2_20230608',
    'Kristin_public_2_20240108',
    'Monica-inblackoutfit-20220721',
    'Wayne-20220721',
    'Jack_public_pro_20230619'
  ];

  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);

  // First aid topics for suggestions
  const firstAidTopics = [
    'CPR instructions for adults',
    'How to treat choking in children',
    'Basic wound cleaning and bandaging',
    'Treating burns and scalds',
    'Managing allergic reactions',
    'Handling unconscious patients',
    'Emergency response for heart attacks',
    'Treating bee stings and insect bites'
  ];

  // Generate script for first aid video
  const generateFirstAidScript = (topic: string): string => {
    const scripts: Record<string, string> = {
      'cpr': `Hello, I'm your first aid instructor. Today I'll show you how to perform CPR. First, check if the person is responsive by tapping their shoulders and shouting "Are you okay?" If they don't respond, call emergency services immediately. Place the heel of one hand on the center of their chest, between the nipples. Place your other hand on top, interlacing your fingers. Push hard and fast at least 2 inches deep at a rate of 100-120 compressions per minute. Allow complete chest recoil between compressions. After 30 compressions, tilt their head back, lift their chin, and give 2 rescue breaths. Continue this cycle until emergency help arrives. Remember, it's better to do something than nothing in an emergency.`,
      
      'choking': `I'll demonstrate how to help a choking person. First, encourage them to cough forcefully if they can still breathe or speak. If they cannot cough, speak, or breathe, perform the Heimlich maneuver. Stand behind them, place your arms around their waist. Make a fist with one hand and place it just above their navel. Grasp your fist with your other hand and thrust upward and inward forcefully. Repeat until the object is expelled or they become unconscious. For pregnant women or large individuals, place your hands on the chest instead of the abdomen. Call emergency services immediately if the obstruction doesn't clear.`,
      
      'wound': `Let me show you proper wound care. First, wash your hands thoroughly or use hand sanitizer. Control bleeding by applying direct pressure with a clean cloth or sterile gauze. If blood soaks through, add more layers without removing the first one. Once bleeding is controlled, clean the wound gently with clean water. Apply antibiotic ointment if available and the person has no allergies. Cover with a sterile bandage or clean cloth. Change the dressing daily and watch for signs of infection like increased redness, warmth, swelling, or pus. Seek medical attention for deep cuts, wounds that won't stop bleeding, or signs of infection.`,
      
      'burns': `Here's how to treat burns properly. For minor burns, immediately cool the burn with cool running water for at least 10 minutes. Remove any jewelry or tight clothing near the burned area before swelling occurs. Do not use ice, butter, or home remedies. For small burns, apply aloe vera or a moisturizing lotion. Cover with a sterile gauze bandage. Take over-the-counter pain medication if needed. For severe burns that are larger than 3 inches, involve the face, hands, feet, or genitals, or appear charred or white, call emergency services immediately. Do not break blisters or remove clothing stuck to the burn.`
    };

    // Simple keyword matching for script selection
    const lowerTopic = topic.toLowerCase();
    if (lowerTopic.includes('cpr')) return scripts.cpr;
    if (lowerTopic.includes('chok')) return scripts.choking;
    if (lowerTopic.includes('wound') || lowerTopic.includes('cut') || lowerTopic.includes('band')) return scripts.wound;
    if (lowerTopic.includes('burn')) return scripts.burns;
    
    // Default script for other topics
    return `Hello, I'm your first aid instructor. Today I'll guide you through ${topic}. Remember, in any emergency, the first step is to ensure your own safety, then assess the situation. Call emergency services if the situation is serious. I'll now demonstrate the proper steps to handle this medical situation safely and effectively. Always remember that proper first aid can save lives, but professional medical care should be sought when needed.`;
  };

  // Test API connection with avatar fallback
  const testAPIConnection = async () => {
    if (!HEYGEN_API_KEY) {
      Alert.alert('Error', 'API key not configured');
      return;
    }

    try {
      setVideoStatus('Testing API connection...');
      
      // First try to get available avatars from the API
      try {
        const avatarResponse = await fetch('https://api.heygen.com/v2/avatars', {
          method: 'GET',
          headers: {
            'X-API-Key': HEYGEN_API_KEY,
          }
        });

        if (avatarResponse.ok) {
          const avatarData = await avatarResponse.json();
          console.log('Available avatars from API:', avatarData);
          if (avatarData.data && avatarData.data.length > 0) {
            // Use the first available avatar
            const firstAvatar = avatarData.data[0];
            const workingAvatarId = firstAvatar.avatar_id;
            
            // Test this avatar
            const testRequest = {
              video_inputs: [
                {
                  character: {
                    type: 'avatar',
                    avatar_id: workingAvatarId
                  },
                  voice: {
                    type: 'text',
                    voice_id: '2d5b0e6cf36f460aa7fc47e3eee3f03e',
                    input_text: 'This is a test message.'
                  }
                }
              ],
              test: true
            };

            const testResponse = await fetch(HEYGEN_API_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-API-Key': HEYGEN_API_KEY,
              },
              body: JSON.stringify(testRequest)
            });

            if (testResponse.ok) {
              setVideoStatus(`API connection successful! Using avatar: ${workingAvatarId}`);
              setCurrentAvatarIndex(0); // Use first avatar
              // Update the first position with working avatar
              availableAvatars[0] = workingAvatarId;
              console.log('API test successful with dynamic avatar');
              return;
            }
          }
        }
      } catch (apiError) {
        console.log('Could not fetch avatars from API, trying predefined list...', apiError);
      }
      
      // Fallback to predefined list
      for (let i = 0; i < availableAvatars.length; i++) {
        const avatarId = availableAvatars[i];
        console.log(`Testing avatar: ${avatarId}`);
        
        const testRequest = {
          video_inputs: [
            {
              character: {
                type: 'avatar',
                avatar_id: avatarId
              },
              voice: {
                type: 'text',
                voice_id: '2d5b0e6cf36f460aa7fc47e3eee3f03e',
                input_text: 'This is a test message.'
              }
            }
          ],
          test: true
        };

        const response = await fetch(HEYGEN_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': HEYGEN_API_KEY,
          },
          body: JSON.stringify(testRequest)
        });

        const data = await response.json();
        
        if (response.ok) {
          setVideoStatus(`API connection successful! Using avatar: ${avatarId}`);
          setCurrentAvatarIndex(i); // Save working avatar
          console.log('API test successful:', data);
          return;
        } else if (data.error?.code === 'avatar_not_found') {
          console.log(`Avatar ${avatarId} not found, trying next...`);
          continue;
        } else {
          // Other error, stop trying
          setVideoStatus(`API test failed: ${data.error?.message || data.message || 'Unknown error'}`);
          console.error('API test failed:', data);
          return;
        }
      }
      
      // If we get here, no avatars worked
      setVideoStatus('No working avatars found. Please check your account or contact support.');
      
    } catch (error) {
      setVideoStatus('API connection failed');
      console.error('API test error:', error);
    }
  };

  const generateVideo = async () => {
    if (!request.trim()) {
      Alert.alert('Error', 'Please describe what first aid video you need');
      return;
    }

    if (!HEYGEN_API_KEY) {
      Alert.alert('Configuration Error', 'Video generation service is not configured. Please add your HeyGen API key to the .env file.');
      return;
    }

    setIsGenerating(true);
    setVideoStatus('Preparing video script...');

    try {
      // Generate appropriate script based on user request
      const script = generateFirstAidScript(request);
      
      setVideoStatus('Sending to video generation service...');

      const videoRequest: VideoRequest = {
        video_inputs: [
          {
            character: {
              type: 'avatar',
              avatar_id: availableAvatars[currentAvatarIndex]
            },
            voice: {
              type: 'text',
              voice_id: '2d5b0e6cf36f460aa7fc47e3eee3f03e',
              input_text: script
            },
            background: {
              type: 'color',
              color: '#FFFFFF'
            }
          }
        ],
        aspect_ratio: '16:9',
        test: true // Set to true for testing, false for production
      };

      console.log('Sending request to HeyGen API...');
      console.log('API Key present:', !!HEYGEN_API_KEY);
      console.log('Request payload:', JSON.stringify(videoRequest, null, 2));

      const response = await fetch(HEYGEN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': HEYGEN_API_KEY,
        },
        body: JSON.stringify(videoRequest)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const data: VideoResponse = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        const errorMessage = data.error?.message || data.message || `HTTP ${response.status}`;
        console.error('API Error:', errorMessage);
        
        // If avatar not found, suggest running test first
        if (data.error?.code === 'avatar_not_found') {
          throw new Error('Avatar not available. Please run "Test API Connection" first to find a working avatar.');
        }
        
        throw new Error(String(errorMessage));
      }

      if (!data.data?.video_id) {
        throw new Error('Invalid response: missing video_id');
      }

      setGeneratedVideoId(data.data.video_id);
      setVideoStatus('Video generation started. This may take a few minutes...');
      
      // Start polling for video status
      pollVideoStatus(data.data.video_id);

    } catch (error) {
      console.error('Video generation error:', error);
      let errorMessage = 'Unable to generate video. ';
      
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          errorMessage += 'Invalid API key. Please check your HeyGen API key configuration.';
        } else if (error.message.includes('403')) {
          errorMessage += 'Access denied. Please check your API key permissions.';
        } else if (error.message.includes('429')) {
          errorMessage += 'Rate limit exceeded. Please try again later.';
        } else if (error.message.includes('insufficient_credits')) {
          errorMessage += 'Insufficient credits. Please check your HeyGen account balance.';
        } else {
          errorMessage += error.message;
        }
      } else {
        errorMessage += 'Please check your internet connection and try again.';
      }
      
      Alert.alert('Generation Failed', errorMessage);
      setVideoStatus('');
    } finally {
      setIsGenerating(false);
    }
  };

  const pollVideoStatus = async (videoId: string) => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
          method: 'GET',
          headers: {
            'X-API-Key': HEYGEN_API_KEY!,
          }
        });

        if (!response.ok) {
          console.error('Status check failed:', response.status);
          setVideoStatus('Unable to check video status.');
          return;
        }

        const data = await response.json();
        console.log('Video status:', data);
        
        if (data.data?.status === 'completed') {
          setVideoStatus('Video ready! You can now view your first aid instruction video.');
          if (data.data.video_url) {
            console.log('Video URL:', data.data.video_url);
            // You could open the video URL or navigate to a video player screen here
          }
        } else if (data.data?.status === 'processing') {
          setVideoStatus('Video is being generated... Please wait.');
          setTimeout(checkStatus, 15000); // Check again in 15 seconds
        } else if (data.data?.status === 'failed') {
          setVideoStatus('Video generation failed. Please try again.');
          console.error('Video generation failed:', data.data?.error);
        } else {
          setVideoStatus(`Video status: ${data.data?.status || 'unknown'}`);
          // Continue polling for other statuses
          setTimeout(checkStatus, 15000);
        }
      } catch (error) {
        console.error('Status check error:', error);
        setVideoStatus('Unable to check video status.');
      }
    };

    // Start checking status after a short delay
    setTimeout(checkStatus, 5000);
  };

  const selectTopic = (topic: string) => {
    setRequest(topic);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
      <SafeAreaView edges={['top']} style={{ flex: 0 }} />
      
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={24} color={isDark ? '#fff' : '#111'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#111' }]}>
          AI Video Generator
        </Text>
        <Text style={[styles.headerSubtitle, { color: isDark ? '#ccc' : '#666' }]}>
          Generate first aid instruction videos
        </Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
      >
        <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
          
          {/* Quick topic selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#111' }]}>
              Quick Topics
            </Text>
            <View style={styles.topicsGrid}>
              {firstAidTopics.map((topic, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.topicButton,
                    { 
                      backgroundColor: isDark ? '#333' : '#f5f5f5',
                      borderColor: isDark ? '#555' : '#ddd'
                    }
                  ]}
                  onPress={() => selectTopic(topic)}
                >
                  <MaterialIcons 
                    name="video-library" 
                    size={20} 
                    color={isDark ? '#fff' : '#666'} 
                  />
                  <Text style={[
                    styles.topicText, 
                    { color: isDark ? '#fff' : '#666' }
                  ]}>
                    {topic}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Custom request input */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#111' }]}>
              Custom Request
            </Text>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: isDark ? '#333' : '#f9f9f9',
                  color: isDark ? '#fff' : '#111',
                  borderColor: isDark ? '#555' : '#ddd'
                }
              ]}
              placeholder="Describe the first aid procedure you need a video for..."
              placeholderTextColor={isDark ? '#aaa' : '#999'}
              value={request}
              onChangeText={setRequest}
              multiline
              numberOfLines={3}
              maxLength={200}
            />
          </View>

          {/* Status display */}
          {videoStatus && (
            <View style={[
              styles.statusContainer,
              { backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0' }
            ]}>
              <MaterialIcons 
                name="info" 
                size={20} 
                color={isDark ? '#4CAF50' : '#2196F3'} 
              />
              <Text style={[
                styles.statusText, 
                { color: isDark ? '#fff' : '#111' }
              ]}>
                {videoStatus}
              </Text>
            </View>
          )}

          {/* API Test Button */}
          <View style={styles.section}>
            <TouchableOpacity
              style={[
                styles.testButton,
                { 
                  backgroundColor: isDark ? '#444' : '#f0f0f0',
                  borderColor: isDark ? '#666' : '#ddd'
                }
              ]}
              onPress={testAPIConnection}
            >
              <MaterialIcons 
                name="wifi-protected-setup" 
                size={20} 
                color={isDark ? '#fff' : '#666'} 
              />
              <Text style={[
                styles.testButtonText, 
                { color: isDark ? '#fff' : '#666' }
              ]}>
                Test API Connection
              </Text>
            </TouchableOpacity>
          </View>

          {/* Generated video info */}
          {generatedVideoId && (
            <View style={[
              styles.videoInfoContainer,
              { backgroundColor: isDark ? '#2a2a2a' : '#f9f9f9' }
            ]}>
              <MaterialIcons name="video-call" size={24} color="#4CAF50" />
              <View style={styles.videoInfo}>
                <Text style={[
                  styles.videoInfoTitle, 
                  { color: isDark ? '#fff' : '#111' }
                ]}>
                  Video Generated
                </Text>
                <Text style={[
                  styles.videoInfoSubtitle, 
                  { color: isDark ? '#ccc' : '#666' }
                ]}>
                  ID: {generatedVideoId}
                </Text>
              </View>
            </View>
          )}

        </ScrollView>
        
        <View style={[
          styles.footer,
          { 
            backgroundColor: isDark ? '#2a2a2a' : '#fff',
            borderTopColor: isDark ? '#444' : '#eee',
            paddingBottom: Platform.OS === 'ios' ? insets.bottom : 16
          }
        ]}>
          <TouchableOpacity
            style={[
              styles.generateButton,
              { 
                backgroundColor: !request.trim() || isGenerating ? '#ccc' : '#E53935',
                opacity: !request.trim() || isGenerating ? 0.6 : 1
              }
            ]}
            onPress={generateVideo}
            disabled={!request.trim() || isGenerating}
          >
            <MaterialIcons 
              name={isGenerating ? "hourglass-empty" : "smart-display"} 
              size={20} 
              color="#fff" 
            />
            <Text style={styles.generateButtonText}>
              {isGenerating ? 'Generating...' : 'Generate Video'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  topicButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    minWidth: '48%',
  },
  topicText: {
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  statusText: {
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  videoInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  videoInfo: {
    marginLeft: 12,
    flex: 1,
  },
  videoInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  videoInfoSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  testButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
});
