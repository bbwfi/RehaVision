import React, { useState, useEffect } from "react";
import { View, Pressable, Text, Vibration } from "react-native";
import { Camera } from "expo-camera";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CacheModal from "../Components/CacheModal";
import QRScanner from "../Components/QRScanner";
import CachesJSON from "../../assets/json/Caches.json";
import { loadUserData, saveUserData } from "../Functions/userDataManager";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen({ debugMode }) {
  const [interactionState, setInteractionState] = useState("idle");
  const [activeCache, setActiveCache] = useState(null);
  const [foundCaches, setFoundCaches] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const caches = CachesJSON.markers;

  useEffect(() => {
    getPermissionsAsync();
    fetchData();
  }, []);

  useEffect(() => {
    saveUserData({ foundCaches });
  }, [foundCaches]);

  const getPermissionsAsync = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
    }
  };

  const fetchData = async () => {
    const userData = await loadUserData();
    console.log("User data:", userData);
    if (userData?.foundCaches) {
      setFoundCaches(userData.foundCaches);
    }
  };

  const openQRScanner = () => {
    setInteractionState("scanning");
    console.log("Opening QR scanner");
  };

  const handleBarCodeScanned = ({ type, data }) => {
    Vibration.vibrate(500);

    const scannedCacheIndex = caches.findIndex((cache) => cache.id === data);

    if (scannedCacheIndex === -1) {
      alert("Invalid cache! Please scan a valid cache.");
      return;
    }

    const nextCacheIndex = foundCaches.length;
    if (scannedCacheIndex !== nextCacheIndex) {
      alert("Please scan the next cache!");
      return;
    }

    alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    const foundCache = caches[scannedCacheIndex];
    console.log("Found cache:", foundCache);
    setFoundCaches([
      ...foundCaches,
      { id: caches[scannedCacheIndex].id, timestamp: Date.now() },
    ]);
    setInteractionState("idle");
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setActiveCache(null);
  };

  const resetProgress = () => {
    setFoundCaches([]);
    closeModal();
  };

  const cancelScan = () => {
    setInteractionState("idle");
  };

  return (
<<<<<<< Updated upstream
    <View style={{ flex: 1, backgroundColor: "#222020" }}>
      {interactionState === "idle" && (
        <View>
          {caches.map((cache, index) => {
            const color = foundCaches.includes(index) ? "green" : "red";
            const lastFoundCacheIndex = foundCaches.length > 0 ? Math.max(...foundCaches) : -1;
            const previousCacheFound = foundCaches.includes(index - 1);
            const allowScan = index === 0 || previousCacheFound;

            return (
              allowScan && (
                <Pressable
                  key={index}
                  onPress={() => {
                    setInteractionState("modalVisible");
                    setActiveCache(cache);
                  }}
                  style={{
                    backgroundColor: "black",
                    width: "100%",
                    alignSelf: "center",
                  }}
                >
                  <View
                    style={{
                      flexGrow: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color,
                        padding: "2.5%",
                        alignSelf: "center",
                        fontSize: 35,
                      }}
                    >
                      {cache.title}
                    </Text>
                    {foundCaches.includes(index) ? (
                      <MaterialIcons
                        name="check-circle"
                        size={24}
                        color="green"
                        style={{ alignSelf: "center" }}
                      />
                    ) : (
                      <MaterialIcons
                        name="circle"
                        size={24}
                        color="red"
                        style={{ alignSelf: "center" }}
                      />
                    )}
                  </View>
                  {debugMode && (
                    <Text style={{ color: "white", padding: "2.5%", paddingTop: 0 }}>
                      {cache.id}
                    </Text>
                  )}
                </Pressable>
              )
            );
          })}
          {foundCaches.length === caches.length && (
=======
    <View style={{ flex: 1, backgroundColor: "#313335" }}>
      {caches.map((cache, index) => {
        const isFound = foundCaches.some((foundCache) => foundCache.id === cache.id);
        const color = isFound ? "green" : "red";
        let lastFoundCacheIndex = -1;
        for (let i = caches.length - 1; i >= 0; i--) {
          if (foundCaches.some((foundCache) => foundCache.id === caches[i].id)) {
            lastFoundCacheIndex = i;
            break;
          }
        }
        const showCache = index === 0 || index <= lastFoundCacheIndex + 1;
        return (
          showCache && (
>>>>>>> Stashed changes
            <Pressable
              key={cache.id}
              onPress={() => {
                setIsModalVisible(true);
                setActiveCache(cache);
              }}
              style={{
                backgroundColor: "black",
                width: "100%",
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  flexGrow: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color,
                    padding: "2.5%",
                    alignSelf: "center",
                    fontSize: 35,
                  }}
                >
                  {cache.title}
                </Text>
                {isFound ? (
                  <MaterialIcons
                    name="check-circle"
                    size={24}
                    color="green"
                    style={{ alignSelf: "center" }}
                  />
                ) : (
                  <MaterialIcons
                    name="circle"
                    size={24}
                    color="red"
                    style={{ alignSelf: "center" }}
                  />
                )}
              </View>
              {debugMode && (
                <Text
                  style={{ color: "white", padding: "2.5%", paddingTop: 0 }}
                >
                  {cache.id}
                </Text>
              )}
            </Pressable>
          )
        );
      })}

      <CacheModal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        selectedCache={activeCache}
        onClose={closeModal}
      />

      <Pressable
        onPress={openQRScanner}
        style={{ position: "absolute", bottom: "5%", alignSelf: "center" }}
      >
        <MaterialIcons
          size={42}
          name="qr-code-2"
          style={{
            backgroundColor: "#ffc107",
            padding: "2.5%",
            borderRadius: 25,
          }}
        />
      </Pressable>

      <Pressable
        onPress={resetProgress}
        style={{ position: "absolute", bottom: "5%", right: "5%" }}
      >
        <MaterialIcons
          size={20}
          name="refresh"
          style={{
            backgroundColor: "#ffc107",
            padding: "2.5%",
            borderRadius: 25,
          }}
        />
      </Pressable>

      {interactionState === "scanning" && (
        <QRScanner
          onBarCodeScanned={handleBarCodeScanned}
          onCancelScan={cancelScan}
          debugMode={debugMode}
        />
      )}

      {isModalVisible && <StatusBar style="light" backgroundColor="#313335" />}
    </View>
  );
}
