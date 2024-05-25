import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  DeviceEventEmitter,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppContext } from "../Context/AppContext";
import Collapsible from "react-native-collapsible";
import { loadUserData, saveUserData } from "../Functions/userDataManager";

import { startScanning } from "react-native-beacon-radar";

export function SettingsScreen({ navigation }) {
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
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor:"#313335" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#ffc107",
        }}
      >
        <Pressable onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text style={{ marginLeft: 10, color: "black", fontWeight: "bold", fontSize: 24 }}>Settings</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 20 }}>
        <Pressable
          onPress={() => navigation.navigate("IntroPage")}
          style={{ padding: 20, backgroundColor: "#ffc107", borderRadius: 10, marginBottom: 20 }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 24,
              textAlign: "center",
            }}
          >
            IntroPage
          </Text>
        </Pressable>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 24, marginBottom: 20 }}>Beacons Finder</Text>
        <Pressable
          style={{ padding: 20, backgroundColor: "#ffc107", borderRadius: 10, marginBottom: 20 }}
          onPress={handleBeaconScan}
        >
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 24, textAlign: "center" }}>Start Scanning</Text>
        </Pressable>
        {beacons
          .sort((a, b) => a.distance - b.distance)
          .map((beacon, index) => (
            <View
              key={index}
              style={{
                borderWidth: 1,
                borderColor: "#ffc107",
                borderRadius: 10,
                padding: 20,
                marginBottom: 20,
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
                    marginBottom: 10,
                    color: "white",
                  }}
                >
                  Beacon {index + 1}
                </Text>
              </Pressable>
              <Collapsible collapsed={index !== activeBeaconIndex}>
                <Text style={{ color: "white", marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>UUID:</Text>{" "}
                  {beacon.uuid}
                </Text>
                <Text style={{ color: "white", marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Major:</Text>{" "}
                  {beacon.major}
                </Text>
                <Text style={{ color: "white", marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Minor:</Text>{" "}
                  {beacon.minor}
                </Text>
                <Text style={{ color: "white", marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Distance:</Text>
                  {beacon.distance < 1
                    ? `${(beacon.distance * 100).toFixed(2)} cm`
                    : `${beacon.distance.toFixed(2)} m`}
                </Text>
              </Collapsible>
            </View>
          ))}
        <Pressable
          onPress={() => navigation.navigate("Disclaimer")}
          style={{ padding: 10, marginBottom: 10 }}
        >
          <Text style={{ color: "#ffc107", textDecorationLine: "underline", fontSize: 18 }}>
            Disclaimer
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("PrivacyPolicy")}
          style={{ padding: 10, marginBottom: 10 }}
        >
          <Text style={{ color: "#ffc107", textDecorationLine: "underline", fontSize: 18 }}>
            Datenschutz
          </Text>
        </Pressable>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 24, marginBottom: 10 }}>Debug Mode</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#ffc107" }}
          thumbColor={debugMode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={debugMode}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 24, marginBottom: 10 }}>Version 1.0.0</Text>
        {debugMode && (
          <View>
            <Pressable onPress={resetUserData}>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>Clear User Data</Text>
            </Pressable>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>User Data:</Text>
            <Text style={{ color: "white", marginBottom: 10 }}>
              {userData ? JSON.stringify(userData) : "No user data found"}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default SettingsScreen;