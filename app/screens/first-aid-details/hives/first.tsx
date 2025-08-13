import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

const CutsIntroVideo: React.FC = () => {
  const router = useRouter();
  const videoRef = useRef<Video>(null);

  const handleStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;
    if ((status as any).didJustFinish) {
      router.replace('/screens/first-aid-details/hives/initial-assessment');
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../../../../assets/videos/hives.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        rate={1.5} 
        onPlaybackStatusUpdate={handleStatusUpdate}
        useNativeControls={false}
      />
    </View>
  );
};

export default CutsIntroVideo;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
});