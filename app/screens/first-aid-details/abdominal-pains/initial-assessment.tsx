import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

const BeeStingsIntroVideo: React.FC = () => {
  const router = useRouter();
  const videoRef = useRef<Video>(null);

  const handleStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;
    if ((status as any).didJustFinish) {
      router.replace('/screens/first-aid-details/abdominal-pains/guide');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={require('../../../../assets/videos/abdominal.mp4')}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          rate={1.5} 
          onPlaybackStatusUpdate={handleStatusUpdate}
          useNativeControls={false}
          isLooping
        />
      </View>
    </View>
  );
};

export default BeeStingsIntroVideo;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000',
  },
  videoContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});