import React, { createContext, useContext, useState, useEffect } from 'react';
import { storeService, TrackedDev, AppSettings } from '../lib/store';
import { alertService } from '../lib/alerts';

interface AppContextType {
  devs: TrackedDev[];
  settings: AppSettings;
  launches: any[];
  history: any[];
  addDev: (dev: Omit<TrackedDev, 'addedAt'>) => Promise<void>;
  bulkAddDevs: (devs: Omit<TrackedDev, 'addedAt'>[]) => Promise<void>;
  removeDev: (wallet: string) => Promise<void>;
  togglePriority: (wallet: string) => Promise<void>;
  toggleDev: (wallet: string) => Promise<void>;
  updateDev: (wallet: string, updates: Partial<TrackedDev>) => Promise<void>;
  updateSettings: (settings: Partial<AppSettings>) => Promise<void>;
  clearHistory: () => Promise<void>;
  isLoaded: boolean;
  solPrice: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [devs, setDevs] = useState<TrackedDev[]>([]);
  const [settings, setSettings] = useState<AppSettings>({
    soundEnabled: true,
    notificationsEnabled: true,
    volume: 1.0,
    soundId: 'default',
    currencyDisplay: 'SOL'
  });
  const [launches, setLaunches] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [solPrice, setSolPrice] = useState(0);

  useEffect(() => {
    const init = async () => {
      const [savedDevs, savedSettings, savedHistory] = await Promise.all([
        storeService.getTrackedDevs(),
        storeService.getSettings(),
        storeService.getHistory()
      ]);
      setDevs(savedDevs);
      setSettings(savedSettings);
      setHistory(savedHistory);
      setIsLoaded(true);
      
      await alertService.init();
      connect();
    };
    init();
  }, []);

  const connect = () => {
    const ws = new WebSocket('wss://pumpportal.fun/api/data');
    
    ws.onopen = () => {
      ws.send(JSON.stringify({ method: 'subscribeNewToken' }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.txType === 'create') {
        const isTracked = devs.some(d => d.wallet === data.traderPublicKey && d.isActive !== false);
        const launch = { ...data, timestamp: Date.now(), isTracked };
        
        setLaunches(prev => [launch, ...prev].slice(0, 100));
        
        if (isTracked) {
          const dev = devs.find(d => d.wallet === data.traderPublicKey);
          setHistory(prev => {
            const updated = [launch, ...prev].slice(0, 100);
            storeService.saveHistory(updated);
            return updated;
          });

          alertService.triggerAlert(
            `🚀 TRACKED LAUNCH: ${data.symbol}`,
            `${dev?.name || 'Developer'} just launched ${data.name}!`,
            settings.soundEnabled,
            settings.notificationsEnabled,
            settings.volume,
            settings.soundId,
            dev?.isPriority
          );
        }
      }
    };

    ws.onclose = () => {
      setTimeout(connect, 5000);
    };
  };

  const addDev = async (dev: Omit<TrackedDev, 'addedAt'>) => {
    const newDev = { ...dev, addedAt: Date.now() };
    const updated = [...devs, newDev];
    setDevs(updated);
    await storeService.saveTrackedDevs(updated);
  };

  const bulkAddDevs = async (newDevs: Omit<TrackedDev, 'addedAt'>[]) => {
    const formatted = newDevs.map(d => ({ ...d, addedAt: Date.now() }));
    const updated = [...devs, ...formatted];
    setDevs(updated);
    await storeService.saveTrackedDevs(updated);
  };

  const removeDev = async (wallet: string) => {
    const updated = devs.filter(d => d.wallet !== wallet);
    setDevs(updated);
    await storeService.saveTrackedDevs(updated);
  };

  const togglePriority = async (wallet: string) => {
    const updated = devs.map(d => 
      d.wallet === wallet ? { ...d, isPriority: !d.isPriority } : d
    );
    setDevs(updated);
    await storeService.saveTrackedDevs(updated);
  };

  const toggleDev = async (wallet: string) => {
    const updated = devs.map(d => 
      d.wallet === wallet ? { ...d, isActive: d.isActive === false } : d
    );
    setDevs(updated);
    await storeService.saveTrackedDevs(updated);
  };

  const updateDev = async (wallet: string, updates: Partial<TrackedDev>) => {
    const updated = devs.map(d => 
      d.wallet === wallet ? { ...d, ...updates } : d
    );
    setDevs(updated);
    await storeService.saveTrackedDevs(updated);
  };

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    await storeService.saveSettings(updated);
  };

  const clearHistory = async () => {
    setHistory([]);
    await storeService.saveHistory([]);
  };

  return (
    <AppContext.Provider value={{ devs, settings, launches, history, addDev, bulkAddDevs, removeDev, togglePriority, toggleDev, updateDev, updateSettings, clearHistory, isLoaded, solPrice }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
};
