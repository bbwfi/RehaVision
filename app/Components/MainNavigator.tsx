import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import { useAppContext } from "../Context/AppContext";
import { CustomHeader } from './CustomHeader';

import { HomeScreen } from "../Screens/HomeScreen";
import { MapPage } from "../Screens/MapPage";
import { LeaderboardScreen } from "../Screens/LeaderboardScreen";


export function MainNavigator() {
    const Tab = createBottomTabNavigator();
    const { debugMode } = useAppContext();
  
    return (
      <Tab.Navigator
        initialRouteName="MapPage"
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "black",
          tabBarShowLabel: true,
          tabBarStyle: { backgroundColor: "#ffc107" },
          headerShown: true,
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="sensors" size={40} color={color} />
            ),
            header: ({ navigation }) => <CustomHeader navigation={navigation} />,
          }}
        >
          {() => <HomeScreen debugMode={debugMode} />}
        </Tab.Screen>
        <Tab.Screen
          name="Karte"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="public" size={40} color={color} />
            ),
            header: ({ navigation }) => <CustomHeader navigation={navigation} />,
          }}
        >
          {() => <MapPage debugMode={debugMode} />}
        </Tab.Screen>
        <Tab.Screen
          name="Leaderboard"
          component={LeaderboardScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="leaderboard" size={40} color={color} />
            ),
            header: ({ navigation }) => <CustomHeader navigation={navigation} />,
          }}
        />
      </Tab.Navigator>
    );
  }

export default MainNavigator;