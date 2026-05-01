import { View, Text, ScrollView } from '@/src/tw';
import { useAppStore } from '@/src/hooks/useAppStore';
import { History as HistoryIcon, ExternalLink } from 'lucide-react-native';
import { Linking } from 'react-native';

export default function History() {
  const { history } = useAppStore();

  return (
    <View className="flex-1 bg-crypto-bg p-4">
      <ScrollView className="flex-1">
        {history.length === 0 ? (
          <View className="items-center justify-center py-20">
            <HistoryIcon color="#151921" size={48} />
            <Text className="text-crypto-muted font-mono text-center">No alerts in history yet</Text>
          </View>
        ) : (
          history.map((item, i) => (
            <View 
              key={`${item.mint}-${i}`}
              className="mb-3 p-4 rounded-xl border border-white/5 bg-crypto-card"
            >
              <View className="flex-row justify-between items-start mb-1">
                <Text className="text-white font-bold">{item.symbol}</Text>
                <Text className="text-crypto-priority font-mono text-xs">DETECTED</Text>
              </View>
              
              <Text className="text-crypto-muted text-[10px] mb-2">{item.name}</Text>
              
              <View className="flex-row justify-between items-center pt-2 border-t border-white/5">
                <Text className="text-crypto-muted text-[10px] font-mono">
                  {new Date(item.timestamp).toLocaleString()}
                </Text>
                <View className="flex-row items-center">
                  <ExternalLink 
                    size={14} 
                    color="#00FFBD" 
                    onPress={() => Linking.openURL(`https://solscan.io/token/${item.mint}`)}
                  />
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
