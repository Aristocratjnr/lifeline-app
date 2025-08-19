import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ProfileData {
  username: string;
  location: string;
  email: string;
  phone: string;
  password: string;
  gender: string;
  age: string;
}

interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => Promise<void>;
  loading: boolean;
}

const defaultProfile: ProfileData = {
  username: '',
  location: '',
  email: '',
  phone: '',
  password: '',
  gender: 'Select Gender',
  age: ''
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [loading, setLoading] = useState(true);

  // Load profile data from AsyncStorage on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedData = await AsyncStorage.getItem('profileSettings');
        if (savedData) {
          setProfile(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('Failed to load profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // Update profile data in state and AsyncStorage
  const updateProfile = async (data: Partial<ProfileData>) => {
    const updatedProfile = { ...profile, ...data };
    setProfile(updatedProfile);
    try {
      await AsyncStorage.setItem('profileSettings', JSON.stringify(updatedProfile));
    } catch (error) {
      console.error('Failed to save profile data:', error);
      // Revert the state if save fails
      setProfile(profile);
      throw error;
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
