import { createAnimations, loaderStyles } from '@/styles/Loader.modules';
import { Image } from 'expo-image';
import React, { useEffect, useMemo } from 'react';
import {
    Animated,
    Modal,
    View
} from 'react-native';

interface LoaderProps {
  isLoading: boolean;
  overlay?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ 
  isLoading, 
  overlay = true
}) => {
  const animations = useMemo(() => createAnimations(), []);

  useEffect(() => {
    if (isLoading) {
      animations.heartbeatAnimation.start();
    } else {
      animations.heartbeatAnimation.stop();
    }
  }, [isLoading, animations]);

  if (!isLoading) return null;

  const LoaderContent = () => (
    <View style={loaderStyles.loaderContainer}>
      <View style={loaderStyles.loaderContent}>
        <Animated.View
          style={[
            loaderStyles.logoImage,
            { transform: [{ scale: animations.heartbeatValue }] }
          ]}
        >
          <Image
            source={require('@/assets/images/lifeline.jpeg')}
            style={loaderStyles.logoImage}
            contentFit="contain"
            priority="high"
            onError={() => {
              console.error('Failed to load lifeline logo');
            }}
          />
        </Animated.View>
      </View>
    </View>
  );

  if (overlay) {
    return (
      <Modal 
        transparent 
        visible={isLoading} 
        animationType="fade"
        statusBarTranslucent
      >
        <LoaderContent />
      </Modal>
    );
  }

  return <LoaderContent />;
};

export default Loader;