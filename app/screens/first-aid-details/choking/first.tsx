import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

const ChokingIntroVideo: React.FC = () => {
  const router = useRouter();
  const videoRef = useRef<Video>(null);

  const handleStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;
    if ((status as any).didJustFinish) {
      router.replace('/screens/first-aid-details/choking/initial-assessment');
    }
  };

  return (
    <View style={styles.fullScreenContainer}>
      <Video
        ref={videoRef}
        source={require('../../../../assets/videos/fever.mp4')}
        style={styles.fullScreenVideo}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        rate={1.5}
        onPlaybackStatusUpdate={handleStatusUpdate}
        useNativeControls={false}
        isLooping
      />
    </View>
  );
};

export default ChokingIntroVideo;

const styles = StyleSheet.create({
  fullScreenContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  fullScreenVideo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
