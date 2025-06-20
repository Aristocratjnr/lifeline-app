import { useSegments } from 'expo-router';
import React, { ReactNode, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import Loader from './Loader';

interface LoaderWrapperProps {
  children: ReactNode;
}

export default function LoaderWrapper({ children }: LoaderWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const segments = useSegments();

  // Listen for app state changes (background/foreground)
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        // App came to foreground, show loader briefly
        setIsLoading(true);
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 500);
        
        return () => clearTimeout(timer);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    return () => {
      subscription?.remove();
    };
  }, []);

  // Initial loading effect
  useEffect(() => {
    // Initial loading with safety timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Safety mechanism - ensure loader disappears after max time
    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(safetyTimer);
    };
  }, []);

  // Show loader on navigation (route change)
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Slightly shorter for better mobile UX

    // Safety mechanism - ensure loader disappears after max time
    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Shorter safety timeout for mobile

    return () => {
      clearTimeout(timer);
      clearTimeout(safetyTimer);
    };
  }, [segments]); // segments change when route changes in expo-router

  return (
    <>
      <Loader isLoading={isLoading} />
      {children}
    </>
  );
}