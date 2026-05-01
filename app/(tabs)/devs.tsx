import { View, Text, ScrollView, TextInput, Pressable } from '@/src/tw';
import { useAppStore } from '@/src/hooks/useAppStore';
import { useState } from 'react';
import { Plus, Trash2, Star, Shield, ShieldOff } from 'lucide-react-native';

export default function TrackedDevs() {
  const { devs, addDev, removeDev, togglePriority, toggleDev } = useAppStore();
  const [newWallet, setNewWallet] = useState('');
  const [newName, setNewName] = useState('');

  const handleAdd = async () => {
    if (!newWallet) return;
    await addDev({
      wallet: newWallet,
      name: newName || 'Unnamed Dev',
      isPriority: false,
    });
    setNewWallet('');
    setNewName('');
  };

  return (
    <View className="flex-1 bg-crypto-bg p-4">
      {/* Add New Form */}
      <View className="bg-crypto-card p-4 rounded-2xl mb-6 border border-white/5">
        <Text className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Track New Developer</Text>
        <TextInput
          className="bg-crypto-bg border border-white/10 rounded-xl p-3 text-white font-mono text-sm mb-3"
          placeholder="Wallet Address"
          placeholderTextColor="#4b5563"
          value={newWallet}
          onChangeText={setNewWallet}
        />
        <TextInput
          className="bg-crypto-bg border border-white/10 rounded-xl p-3 text-white font-mono text-sm mb-4"
          placeholder="Friendly Name (Optional)"
          placeholderTextColor="#4b5563"
          value={newName}
          onChangeText={setNewName}
        />
        <Pressable 
          onPress={handleAdd}
          className="bg-crypto-accent p-4 rounded-xl flex-row items-center justify-center active:opacity-80"
        >
          <Plus size={20} color="#0a0b10" />
          <Text className="text-crypto-bg font-bold ml-2">ADD TO RADAR</Text>
        </Pressable>
      </View>

      <Text className="text-crypto-muted font-bold mb-4 uppercase tracking-widest text-[10px]">
        Tracked Entities ({devs.length})
      </Text>

      <ScrollView className="flex-1">
        {devs.map((dev) => (
          <View 
            key={dev.wallet}
            className={`mb-3 p-4 rounded-2xl border ${dev.isPriority ? 'border-crypto-priority/30' : 'border-white/5'} bg-crypto-card`}
          >
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="text-white font-bold text-base">{dev.name}</Text>
                <Text className="text-crypto-muted font-mono text-[10px]">{dev.wallet}</Text>
              </View>
              
              <View className="flex-row gap-3">
                <Pressable onPress={() => togglePriority(dev.wallet)}>
                  <Star size={20} color={dev.isPriority ? "#FF3E3E" : "#4b5563"} />
                </Pressable>
                <Pressable onPress={() => toggleDev(dev.wallet)}>
                  {dev.isActive !== false ? (
                    <Shield size={20} color="#00FFBD" />
                  ) : (
                    <ShieldOff size={20} color="#4b5563" />
                  )}
                </Pressable>
                <Pressable onPress={() => removeDev(dev.wallet)}>
                  <Trash2 size={20} color="#4b5563" />
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
