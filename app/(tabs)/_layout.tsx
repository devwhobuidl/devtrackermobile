import { Tabs } from 'expo-router';
import React from 'react';
import { Activity, Users, History, Settings } from 'lucide-react-native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00FFBD',
        tabBarInactiveTintColor: '#8b949e',
        tabBarStyle: {
          backgroundColor: '#0a0b10',
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 10,
        },
        headerStyle: {
          backgroundColor: '#0a0b10',
        },
        headerTitleStyle: {
          color: '#00FFBD',
          fontFamily: 'SpaceMono',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Live Feed',
          tabBarIcon: ({ color }) => <Activity size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="devs"
        options={{
          title: 'Tracked',
          tabBarIcon: ({ color }) => <Users size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <History size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
