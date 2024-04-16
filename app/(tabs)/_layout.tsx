import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'white', tabBarShowLabel: false, tabBarStyle: {backgroundColor: "#ffc107"}, headerTitleAlign: "center", headerStyle: {backgroundColor: "#ffc107", height: "4%"}, headerTitleStyle: {fontSize: 2} }}>
    
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
            <Tabs.Screen
        name="fortnite"
        options={{
          title: 'fortnite',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Toplist',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="list" color={color} />,
        }}
      />
    </Tabs>
  );
}
