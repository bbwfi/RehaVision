/*  _____    ____
  /      \  |  o | 
 |    B   |/ ___\| 
 |_________/     
 |_|_| |_|_| 
 */

import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Linking from "expo-linking";

import { AppProvider } from "./app/Context/AppContext";
import { loadUserData } from "./app/Functions/userDataManager";
import { MainNavigator } from './app/Components/MainNavigator';

import LoadingScreen from "./app/Screens/LoadingScreen";
import IntroPage from "./app/Screens/IntroPage";
import DisclaimerScreen from "./app/Screens/DisclaimerScreen";
import PrivacyPolicyScreen from "./app/Screens/PrivacyPolicyScreen";
import SettingsScreen from "./app/Screens/SettingsScreen";

const Stack = createStackNavigator();
const prefix = Linking.createURL("/");

const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      MapPage: "mappage",
      Home: "home",
      Leaderboard: "leaderboard",
      Settings: "settings",
      Disclaimer: "disclaimer",
      PrivacyPolicy: "privacypolicy",
      IntroPage: "intro",
    },
  },
};


/**
 * Main component of the application.
 * @returns {JSX.Element} The rendered component.
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState(null);
  
  const routeNameRef = useRef();
  const navigationRef = useRef();

  /**
   * Recursively finds the name of the active route in the navigation state.
   * @param {object} state - The navigation state.
   * @returns {string} The name of the active route.
   */
  const getActiveRouteName = (state) => {
    const route = state.routes[state.index];
    if (route.state) {
      return getActiveRouteName(route.state);
    }
    return route.name;
  };

  useEffect(() => {
    const loadAndNavigate = async () => {
      const userData = await loadUserData();

      if (userData?.tutorialCompleted) {
        setInitialRoute("Main");
      } else {
        setInitialRoute("IntroPage");
      }

      setIsLoading(false);
    };

    loadAndNavigate();
  }, []);

  useEffect(() => {
    if (navigationRef.current) {
      routeNameRef.current = getActiveRouteName(
        navigationRef.current.getRootState()
      );
    }
  }, []);
  
  /**
   * Handles the state change event of the navigation.
  */
 const handleStateChange = () => {
   if (navigationRef.current) {
     const previousRouteName = routeNameRef.current;
     const currentRouteName = getActiveRouteName(
       navigationRef.current.getRootState()
      );
      
      if (previousRouteName !== currentRouteName) {
        const fullDeepLink = Linking.createURL(
          linking.config.screens[currentRouteName]
        );
        console.log(
          `Switched to ${currentRouteName} tab. Full deep link: ${fullDeepLink}`
        );
      }
      
      routeNameRef.current = currentRouteName;
    }
  };

  if (isLoading || initialRoute === null) {
    return <LoadingScreen/>; 
  }  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppProvider>
        <NavigationContainer
          ref={navigationRef}
          onStateChange={handleStateChange}
          linking={linking}
        >
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
            <Stack.Screen name="IntroPage" component={IntroPage} />
            <Stack.Screen name="Main" component={MainNavigator} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Disclaimer" component={DisclaimerScreen} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaView>
  );
}

export default App;
