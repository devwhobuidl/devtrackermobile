import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TrackedDev {
  wallet: string;
  name: string;
  isPriority: boolean;
  isActive?: boolean;
  addedAt: number;
}

export interface AppSettings {
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  volume: number;
  soundId: string;
  currencyDisplay: 'SOL' | 'USD';
}

const KEYS = {
  DEVS: 'dev_tracker_devs',
  SETTINGS: 'dev_tracker_settings',
  HISTORY: 'dev_tracker_history'
};

export const storeService = {
  async getTrackedDevs(): Promise<TrackedDev[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.DEVS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load devs', e);
      return [];
    }
  },

  async saveTrackedDevs(devs: TrackedDev[]): Promise<void> {
    await AsyncStorage.setItem(KEYS.DEVS, JSON.stringify(devs));
  },

  async getSettings(): Promise<AppSettings> {
    try {
      const data = await AsyncStorage.getItem(KEYS.SETTINGS);
      return data ? JSON.parse(data) : {
        soundEnabled: true,
        notificationsEnabled: true,
        volume: 1.0,
        soundId: 'default',
        currencyDisplay: 'SOL'
      };
    } catch (e) {
      return {
        soundEnabled: true,
        notificationsEnabled: true,
        volume: 1.0,
        soundId: 'default',
        currencyDisplay: 'SOL'
      };
    }
  },

  async saveSettings(settings: AppSettings): Promise<void> {
    await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  },

  async getHistory(): Promise<any[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  async saveHistory(history: any[]): Promise<void> {
    await AsyncStorage.setItem(KEYS.HISTORY, JSON.stringify(history.slice(0, 100)));
  }
};
