import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import HomeScreen from "./app/Screens/HomeScreen";
import LeaderboardScreen from "./app/Screens/LeaderboardScreen";
import MapPage from "./app/Screens/MapPage";
import DisclaimerScreen from "./app/Screens/DisclaimerScreen";
import PrivacyPolicyScreen from "./app/Screens/PrivacyPolicyScreen";
import SettingsScreen from "./app/Screens/SettingsScreen";
import { AppProvider, useAppContext } from "./app/Context/AppContext";
import icon from "./assets/adaptive-icon_rehavision.png";
import { SafeAreaView } from "react-native-safe-area-context";
import IntroPage from "./app/Screens/IntroPage";
import { loadUserData } from "./app/Functions/userDataManager";

const Tab = createBottomTabNavigator();
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

function CustomHeader({ navigation }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <Image source={icon} style={styles.headerIcon} />
        <Text style={styles.headerText}>RehaVision</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Settings");
        }}
      >
        <MaterialIcons name="settings" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
}

function MainNavigator() {
  const { debugMode } = useAppContext();

  return (
    <Tab.Navigator
      initialRouteName="MapPage"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",
        tabBarShowLabel: false,
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
        name="MapPage"
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
      console.log("User data:", userData);

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

  if (isLoading || initialRoute === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ); // Replace with your actual loading screen component
  }

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

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: "#ffc107",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    width: 40,
    height: 40,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "500",
  },
});

export default App;
