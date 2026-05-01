import { View, Text, ScrollView, Pressable } from '@/src/tw';
import { useAppStore } from '@/src/hooks/useAppStore';
import { Bell, Volume2, Shield, Trash2, Terminal } from 'lucide-react-native';

export default function Settings() {
  const { settings, updateSettings, clearHistory } = useAppStore();

  return (
    <View className="flex-1 bg-crypto-bg">
      <ScrollView className="p-4">
        <View className="mb-8">
          <Text className="text-crypto-muted font-bold mb-4 uppercase tracking-widest text-[10px]">Alert Preferences</Text>
          
          <View className="bg-crypto-card rounded-2xl border border-white/5 overflow-hidden">
            <View className="p-4 flex-row justify-between items-center border-b border-white/5">
              <View className="flex-row items-center">
                <Bell size={20} color="#00FFBD" />
                <Text className="text-white ml-3">Push Notifications</Text>
              </View>
              <Pressable 
                onPress={() => updateSettings({ notificationsEnabled: !settings.notificationsEnabled })}
                className={`w-12 h-6 rounded-full p-1 ${settings.notificationsEnabled ? 'bg-crypto-accent' : 'bg-white/10'}`}
              >
                <View className={`w-4 h-4 rounded-full bg-white ${settings.notificationsEnabled ? 'self-end' : 'self-start'}`} />
              </Pressable>
            </View>

            <View className="p-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Volume2 size={20} color="#00FFBD" />
                <Text className="text-white ml-3">Sound Alerts</Text>
              </View>
              <Pressable 
                onPress={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`w-12 h-6 rounded-full p-1 ${settings.soundEnabled ? 'bg-crypto-accent' : 'bg-white/10'}`}
              >
                <View className={`w-4 h-4 rounded-full bg-white ${settings.soundEnabled ? 'self-end' : 'self-start'}`} />
              </Pressable>
            </View>
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-crypto-muted font-bold mb-4 uppercase tracking-widest text-[10px]">Maintenance</Text>
          
          <Pressable 
            onPress={clearHistory}
            className="bg-crypto-card p-4 rounded-2xl border border-white/5 flex-row items-center active:bg-white/5"
          >
            <Trash2 size={20} color="#ff3e3e" />
            <Text className="text-white ml-3">Clear History</Text>
          </Pressable>
        </View>

        <View className="bg-crypto-card/30 p-6 rounded-3xl border border-white/5">
          <View className="flex-row justify-between mb-2">
            <Text className="text-crypto-muted text-xs">System Status</Text>
            <View className="flex-row items-center">
              <View className="w-1.5 h-1.5 rounded-full bg-crypto-accent mr-2" />
              <Text className="text-crypto-accent text-[10px] font-mono">NOMINAL</Text>
            </View>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-crypto-muted text-xs">WebSocket</Text>
            <Text className="text-crypto-accent text-xs font-mono">PumpPortal.fun</Text>
          </View>
        </View>

        <View className="items-center py-10">
          <View className="flex-row items-center mb-2">
            <Terminal size={14} color="#8b949e" />
            <Text className="text-crypto-muted font-mono text-[10px] ml-2 tracking-widest uppercase">
              Dev Tracker v1.0.0
            </Text>
          </View>
          <Text className="text-crypto-muted font-mono text-[8px] uppercase opacity-30">
            Powered by Vibe Code
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
