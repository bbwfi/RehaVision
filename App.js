import { StyleSheet, Text } from 'react-native';
import { NavigationContainer, NavigationContext } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Linking from "expo-linking";
import HomeScreen from './app/Screens/HomeScreen';
import SettingsScreen from './app/Screens/SettingsScreen';
import MapPage from './app/Screens/MapPage';
import React, { useEffect, useRef } from 'react';
import {FontAwesome, MaterialIcons} from '@expo/vector-icons';
import {AuthProvider} from './app/Provider/FirebaseAuthProvider'

const Tab = createBottomTabNavigator();
const prefix = Linking.createURL('/');

const linking = {
  prefixes: [prefix], // use a URL prefix that you expect in your deep links
  config: {
    screens: {
      MapPage: 'mappage',
      Home: 'home',
      Settings: 'settings',
    },
  },
};

function App() {
  const getActiveRouteName = (state) => {
    const route = state.routes[state.index];
    if (route.state) {
      // Dive into nested navigators
      return getActiveRouteName(route.state);
    }
    return route.name;
  };

  const routeNameRef = useRef();
  const navigationRef = useRef();

  return (
    <AuthProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = getActiveRouteName(navigationRef.current.getRootState());
        }}
        onStateChange={() => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = getActiveRouteName(navigationRef.current.getRootState());
        
          if (previousRouteName !== currentRouteName) {
            // The line below uses the expo-linking module
            const fullDeepLink = Linking.createURL(linking.config.screens[currentRouteName]);
            console.log(`Switched to ${currentRouteName} tab. Full deep link: ${fullDeepLink}`);
          }
        
          // Save the current route name for later comparison
          routeNameRef.current = currentRouteName;
        }}
        linking={linking}
      >
        <Tab.Navigator initialRouteName='MapPage' screenOptions={{tabBarActiveTintColor: 'white',tabBarInactiveTintColor:"black",tabBarShowLabel:false , tabBarStyle: {backgroundColor: "#ffc107"}, headerStyle: {backgroundColor: "#ffc107", height: "4%"}}}>
          <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: ({ color }) => <MaterialIcons name="sensors" size={40} color={color} />}} />
          <Tab.Screen name="MapPage" component={MapPage} options={{tabBarIcon: ({ color }) => <MaterialIcons name="public" size={40} color={color} />}} />
          <Tab.Screen name="Settings" component={SettingsScreen} options={{tabBarIcon: ({ color }) => <MaterialIcons name="leaderboard" size={40} color={color} />}} />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;