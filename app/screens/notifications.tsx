import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Load JetBrains Mono font
const loadFonts = async () => {
  await Font.loadAsync({
    'JetBrainsMono': require('../../assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('../../assets/fonts/JetBrainsMono-Bold.ttf'),
  });
};

type NotificationItemProps = {
  icon: React.ReactNode;
  title: string;
  isToggle: boolean;
  value?: boolean;
  onValueChange?: (newValue: boolean) => void;
  subtitle?: string;
};

const NotificationItem = ({ 
  icon, 
  title, 
  isToggle, 
  value = false, 
  onValueChange,
  subtitle
}: NotificationItemProps) => (
  <View style={styles.notificationItem}>
    <View style={styles.leftContent}>
      {icon}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
    {isToggle ? (
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#e0e0e0', true: '#e0e0e0' }}
        thumbColor={value ? '#000' : '#f4f3f4'}
      />
    ) : null}
  </View>
);

export default function Notifications() {
  const navigation = useNavigation();
  const [generalNotifications, setGeneralNotifications] = useState(true);
  const [dailyTips, setDailyTips] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <ImageBackground 
      source={require('../../assets/images/blur.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>NOTIFICATIONS</Text>
        </View>
        
        <View style={styles.divider} />

        {/* Notification Settings */}
        <View style={styles.contentContainer}>
          <ScrollView>
            <View style={styles.card}>
              <NotificationItem
                icon={<Ionicons name="notifications-outline" size={22} color="black" />}
                title="General Notifications"
                isToggle={true}
                value={generalNotifications}
                onValueChange={setGeneralNotifications}
              />
              
              <View style={styles.itemDivider} />
              
              <NotificationItem
                icon={<FontAwesome name="comment" size={22} color="black" />}
                title="Daily Tips"
                isToggle={true}
                value={dailyTips}
                onValueChange={setDailyTips}
              />
              
              <View style={styles.itemDivider} />
              
              <NotificationItem
                icon={<Feather name="settings" size={22} color="black" />}
                title="App Update"
                subtitle="(Up-to-date)"
                isToggle={false}
              />
              
              <View style={styles.itemDivider} />
              
              <NotificationItem
                icon={<MaterialIcons name="mail-outline" size={22} color="black" />}
                title="Email Notifications"
                isToggle={true}
                value={emailNotifications}
                onValueChange={setEmailNotifications}
              />
              
              <View style={styles.itemDivider} />
              
              <NotificationItem
                icon={<Ionicons name="volume-medium-outline" size={22} color="black" />}
                title="Sound"
                isToggle={true}
                value={sound}
                onValueChange={setSound}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.89)',
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Bold',
    marginRight: 30,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
    fontFamily: 'JetBrainsMono',
    color: '#333',
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'JetBrainsMono',
    color: '#888',
    marginTop: 2,
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 15,
  },
});