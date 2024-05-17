import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Switch,
  DeviceEventEmitter,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppContext } from "../Context/AppContext";
import Collapsible from "react-native-collapsible";
import { loadUserData, saveUserData } from "../Functions/userDataManager";

import {
  startRadar,
  startScanning,
  stopScanning,
} from "react-native-beacon-radar";

function SettingsScreen({ navigation }) {
  const { debugMode, setDebugMode } = useAppContext();
  const [beacons, setBeacons] = useState([]);
  const [activeBeaconIndex, setActiveBeaconIndex] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchData(); // Load user data when the component mounts
  }, []);


  const toggleSwitch = () => {
    setDebugMode(!debugMode); // Toggle debugMode state
  };

  const resetUserData = async () => {
    await saveUserData(null); // Clear user data
    setUserData(null); // Clear user data from state
  };

  const handleBeaconScan = (data) => {
    startScanning("8484FC61-31FA-4D20-BD65-FF663B28670F", {
      useForegroundService: true,
    });

    DeviceEventEmitter.addListener("onBeaconsDetected", (beac) => {
      // Store beacon data in state
      console.log(beac);
      setBeacons(beac);
    });
  };

  const fetchData = async () => {
    const userData = await loadUserData();
    if (userData) {
      setUserData(userData);
    }};


  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "#ffc107" }}>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={{ marginLeft: 10 }}>Settings</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ marginBottom: 20 }}>
        <Pressable onPress={() => navigation.navigate('IntroPage')} style={{ padding: 10 }}>
          <Text 
            style={{ 
              padding: 10, 
              backgroundColor: "#2196F3", 
              borderRadius: 5, 
              color: 'white',
              fontWeight: 'bold', 
              fontSize: 35 }}>IntroPage</Text>
        </Pressable>
        </View>
        <View style={{ marginBottom: 20 }}>
          {/* Beacons Finder */}
          <Text>Beacons Finder</Text>
          <Pressable
            style={{ padding: 10, backgroundColor: "#2196F3", borderRadius: 5 }}
            onPress={handleBeaconScan}
          >
            <Text style={{ color: "white" }}>Start Scanning</Text>
          </Pressable>
          {beacons
            .sort((a, b) => a.distance - b.distance)
            .map((beacon, index) => (
              <View
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: "#000",
                  borderRadius: 5,
                  padding: 10,
                  marginBottom: 10,
                }}
              >
                <Pressable
                  onPress={() =>
                    setActiveBeaconIndex(
                      index === activeBeaconIndex ? null : index
                    )
                  }
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      marginBottom: 5,
                    }}
                  >
                    Beacon {index + 1}
                  </Text>
                </Pressable>
                <Collapsible collapsed={index !== activeBeaconIndex}>
                  <Text style={{ color: "black" }}>
                    <Text style={{ fontWeight: "bold" }}>UUID:</Text>{" "}
                    {beacon.uuid}
                  </Text>
                  <Text style={{ color: "black" }}>
                    <Text style={{ fontWeight: "bold" }}>Major:</Text>{" "}
                    {beacon.major}
                  </Text>
                  <Text style={{ color: "black" }}>
                    <Text style={{ fontWeight: "bold" }}>Minor:</Text>{" "}
                    {beacon.minor}
                  </Text>
                  <Text style={{ color: "black" }}>
                    <Text style={{ fontWeight: "bold" }}>Distance:</Text>
                    {beacon.distance < 1
                      ? `${(beacon.distance * 100).toFixed(2)} cm`
                      : `${beacon.distance.toFixed(2)} m`}
                  </Text>
                </Collapsible>
              </View>
            ))}
        </View>
        <Pressable onPress={() => navigation.navigate('Disclaimer')} style={{ padding: 10 }}>
          <Text style={{ color: "#2196F3", textDecorationLine: "underline" }}>Disclaimer</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('PrivacyPolicy')} style={{ padding: 10 }}>
          <Text style={{ color: "#2196F3", textDecorationLine: "underline" }}>Datenschutz</Text>
        </Pressable>
        <Text>Debug Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={debugMode ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={debugMode}
          />
      </View>

      <View>
  <Text>Version 1.0.0</Text>
  {debugMode && (


    <View>
      <Pressable onPress={resetUserData}>
        <Text>Clear User Data</Text>
      </Pressable>
      <Text>User Data:</Text>
      <Text>
        {userData ? JSON.stringify(userData) : "No user data found"}
      </Text>

    </View>
)}
</View>




    </View>
  );
}

export default SettingsScreen;
