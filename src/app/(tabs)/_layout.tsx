// TabLayout.tsx
import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Icon } from '@/components/ui/Icon';
import { BookOpen, Settings } from 'lucide-react-native';
import CustomTabBar from '@/components/shared/custom-tab-bar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Histórias',
          tabBarLabel: 'Histórias',
          tabBarIcon: ({ focused, color }) => (
            <Icon className={`text-${focused ? 'primary-500' : 'gray-400'}`} as={BookOpen} size={'md'} />
          ),
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: 'Configurações',
          tabBarLabel: 'Configurações',
          tabBarIcon: ({ focused, color }) => (
            <Icon className={`text-${focused ? 'primary-500' : 'gray-400'}`} as={Settings} size={'md'} />
          ),
        }}
      />
    </Tabs>
  );
}
