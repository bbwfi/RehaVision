import React, { useState, useEffect } from "react";
import { View, Pressable, Text, Vibration } from "react-native";
import { Camera } from "expo-camera";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CacheModal from "../Components/CacheModal";
import QRScanner from "../Components/QRScanner";
import CachesJSON from "../../assets/json/Caches.json";
import { loadUserData, saveUserData } from "../Functions/userDataManager";

export default function HomeScreen({ debugMode }) {
  const [interactionState, setInteractionState] = useState("idle");
  const [activeCache, setActiveCache] = useState(null);
  const [foundCaches, setFoundCaches] = useState([]);

  const caches = CachesJSON.markers;

  useEffect(() => {
    getPermissionsAsync();
    fetchData();
  }, []);

  useEffect(() => {
    const allCachesFound = foundCaches.length === caches.length;
    saveUserData(foundCaches);
  }, [foundCaches]);

  const getPermissionsAsync = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
    }
  };

  const fetchData = async () => {
    const userData = await loadUserData();
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
    foundCache.found = true;
    setFoundCaches([...foundCaches, scannedCacheIndex]);
    setInteractionState("idle");
  };

  const closeModal = () => {
    setInteractionState("idle");
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
    <View style={{ flex: 1, backgroundColor: "#313335" }}>
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
            <Pressable
              onPress={resetProgress}
              style={{
                backgroundColor: "black",
                width: "100%",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  color: "green",
                  padding: "2.5%",
                  alignSelf: "center",
                  fontSize: 35,
                }}
              >
                All caches found!
              </Text>
            </Pressable>
          )}
        </View>
      )}

      {interactionState === "modalVisible" && (
        <CacheModal
          isVisible={true} // Assuming the modal is always visible when this state is active
          onBackdropPress={closeModal}
          selectedCache={activeCache}
        />
      )}

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

      {interactionState === "scanning" && (
        <QRScanner
          onBarCodeScanned={handleBarCodeScanned}
          onCancelScan={cancelScan}
          debugMode={debugMode}
        />
      )}
    </View>
  );
}
