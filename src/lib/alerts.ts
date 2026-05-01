import * as Notifications from 'expo-notifications';
import { Audio } from 'expo-av';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async (notification) => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const alertService = {
  async init() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#00FFBD',
      });
      
      Notifications.setNotificationChannelAsync('priority', {
        name: 'Priority Alerts',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 500, 200, 500],
        lightColor: '#FF3E3E',
      });
    }
  },

  async triggerAlert(
    title: string,
    body: string,
    soundEnabled: boolean,
    notificationsEnabled: boolean,
    volume: number,
    soundId: string,
    isPriority: boolean = false
  ) {
    if (notificationsEnabled) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: { isPriority },
          sound: soundEnabled ? 'default' : undefined,
        },
        trigger: null,
      });
    }

    if (soundEnabled) {
      try {
        // Simple ping sound for mobile or priority alert
        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/sounds/alert.mp3'),
          { volume }
        );
        await sound.playAsync();
      } catch (e) {
        console.error('Failed to play sound', e);
      }
    }
  }
};
