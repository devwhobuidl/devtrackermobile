import { View, Text, ScrollView } from '@/src/tw';
import { useAppStore } from '@/src/hooks/useAppStore';
import { Activity, Target } from 'lucide-react-native';

export default function LiveFeed() {
  const { launches, solPrice } = useAppStore();

  return (
    <View className="flex-1 bg-crypto-bg p-4">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-crypto-muted font-mono text-xs">
          SOL: <Text className="text-crypto-accent">${solPrice.toFixed(2)}</Text>
        </Text>
        <View className="flex-row items-center">
          <View className="w-2 h-2 rounded-full bg-crypto-accent animate-pulse mr-2" />
          <Text className="text-crypto-muted font-mono text-xs uppercase tracking-widest">Live</Text>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="pb-10">
        {launches.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Activity color="#151921" size={48} />
            <Text className="text-crypto-muted font-mono text-center">Waiting for launches...</Text>
          </View>
        ) : (
          launches.map((launch, i) => (
            <View 
              key={`${launch.mint}-${i}`}
              className={`mb-3 p-4 rounded-xl border ${launch.isTracked ? 'bg-crypto-accent/10 border-crypto-accent' : 'bg-crypto-card border-white/5'}`}
            >
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="text-white font-bold text-lg">{launch.symbol}</Text>
                    {launch.isTracked && <Target size={16} color="#00FFBD" />}
                  </View>
                  <Text className="text-crypto-muted text-xs font-mono" numberOfLines={1}>
                    {launch.traderPublicKey.slice(0, 4)}...{launch.traderPublicKey.slice(-4)}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-crypto-accent font-mono text-sm">
                    {launch.devBuy.toFixed(2)} SOL
                  </Text>
                  <Text className="text-crypto-muted text-[10px] uppercase font-mono">Buy</Text>
                </View>
              </View>
              
              <View className="flex-row justify-between items-center pt-2 border-t border-white/5 mt-2">
                <Text className="text-crypto-muted text-[10px] font-mono">
                  {launch.name}
                </Text>
                <Text className="text-crypto-muted text-[10px] font-mono">
                  {new Date(launch.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
