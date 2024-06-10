import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  DeviceEventEmitter,
  Pressable,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { startScanning } from "react-native-beacon-radar";
import Collapsible from "react-native-collapsible";

import { useAppContext } from "../Context/AppContext";
import { loadUserData, saveUserData } from "../Functions/userDataManager";

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

  const BeaconScanner = () => {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.hedding}>Beacons Finder</Text>
        <Pressable 
          accessibilityRole="button"
          style={styles.button} onPress={handleBeaconScan}>
          <Text style={styles.buttonText}>Nach Beacons scannen</Text>
        </Pressable>
        {beacons
          .sort((a, b) => a.distance - b.distance)
          .map((beacon, index) => (
            <View key={index} style={styles.box}>
              <Pressable
                accessibilityRole="button"
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
      </View>
    );
  };

  const PolicyInfoView = () => {
    return (
      <View style={styles.centeredView}>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate("Disclaimer")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Disclaimer anzeigen</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate("PrivacyPolicy")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Datenschutz anzeigen</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#313335" }}>
      <View style={styles.navViewContainer}>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          style={styles.navViewIconButton}
        >
          <MaterialIcons name="arrow-back" size={36} color="black" />
          <Text style={styles.navViewText}>Einstellungen</Text>
        </Pressable>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "#313335" }}>
        <View style={styles.centeredView}>
          <Text style={styles.hedding}>Version 1.0.3</Text>
        </View>

        <PolicyInfoView />

        <View style={styles.centeredView}>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate("IntroPage")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Intro erneut starten</Text>
          </Pressable>

          <Text style={styles.hedding}>Debug Mode</Text>
          <Switch
            accessibilityRole="switch"
            accessibilityLabel="Debug Mode Switch"
            trackColor={{ false: "#767577", true: "#ffc107" }}
            thumbColor={debugMode ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={debugMode}
            accessibilityLabelled="Debug Mode"
          />
        </View>

        {debugMode && <BeaconScanner />}

        {debugMode && (
          <View style={styles.centeredView}>
            <Pressable 
              accessibilityRole="button"
              onPress={resetUserData} style={styles.button}>
              <Text style={styles.buttonText}>Clear User Data</Text>
            </Pressable>
            <Text style={styles.hedding}>User Data:</Text>
            <Text style={{ color: "white", marginBottom: 10 }}>
              {userData ? JSON.stringify(userData) : "Keine Daten vorhanden"}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = {
  button: {
    padding: 10,
    backgroundColor: "#ffc107",
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  centeredView: { flex: 1, alignItems: "center", justifyContent: "center" },
  hedding: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
  },
  linkBox: { padding: 10, marginBottom: 10 },
  linkBoxText: {
    color: "#ffc107",
    textDecorationLine: "underline",
    fontSize: 18,
  },
  box: {
    borderWidth: 1,
    borderColor: "#ffc107",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  navViewContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: "#ffc107",
    marginBottom: 10,
  },
  navViewIconButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  navViewText: {
    marginLeft: 10,
    color: "black",
    fontWeight: "500",
    fontSize: 20,
  },
};

export default SettingsScreen;
