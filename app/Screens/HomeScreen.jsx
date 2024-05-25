import React, { useState, useEffect } from "react";
import {
  View,
  Pressable,
  Text,
  Vibration,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CacheModal from "../Components/CacheModal";
import QRScanner from "../Components/QRScanner";
import CachesJSON from "../../assets/json/Caches.json";
import { loadUserData, saveUserData } from "../Functions/userDataManager";
import Toast from "../Components/Toast";

export function HomeScreen({ debugMode }) {
  const [interactionState, setInteractionState] = useState("idle");
  const [activeCache, setActiveCache] = useState(null);
  const [foundCaches, setFoundCaches] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [toastKey, setToastKey] = useState(0);

  const caches = CachesJSON.markers;

  useEffect(() => {
    getPermissionsAsync();
    fetchData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      // Load existing user data
      const existingUserData = await loadUserData();

      // Merge existing data with new data
      const newUserData = {
        ...existingUserData,
        foundCaches,
      };

      // Save merged data
      await saveUserData(newUserData);
    };

    saveData();
  }, [foundCaches]);

// Custom toast component with timeout

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

  const showToast = () => {
    setToastVisible(true);
    setToastKey(toastKey + 1);
  };

  const openQRScanner = () => {
    setInteractionState("scanning");
    console.log("Opening QR scanner");
  };

  const handleBarCodeScanned = ({ type, data }) => {
    Vibration.vibrate(500);

    const scannedCacheIndex = caches.findIndex((cache) => cache.id === data);

    if (scannedCacheIndex === -1) {
      setToastMessage("Dieser QR Code ist nicht von unserem Spiel!")
      setToastType("error")
      setInteractionState("idle");
      showToast();
      return;
    }

    const nextCacheIndex = foundCaches.length;
    if (scannedCacheIndex !== nextCacheIndex) {
      setToastMessage("Bitte Scanne den nächsten Cache")
      setToastType("warning")
      setInteractionState("idle");
      showToast();
      return;
    }

    setToastMessage(
      `QR-Code wurde erfolgreich gescannt. Viel Glück mit dem nächsten Cache!`
    );
    setToastType("success")
    showToast();

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
    Alert.alert(
      "Spielstand zurücksetzen",
      "Möchtest du wirklich deinen Spielstand zurücksetzen?",
      [
        {
          text: "Nein",
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: "Ja",
          onPress: () => {
            setFoundCaches([]);
            closeModal();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const cancelScan = () => {
    setInteractionState("idle");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#313335" }}>
      {/* Cache List */}
      {caches.map((cache, index) => {
        const isFound = foundCaches.some(
          (foundCache) => foundCache.id === cache.id
        );
        const color = isFound ? "green" : "red";
        let lastFoundCacheIndex = -1;
        for (let i = caches.length - 1; i >= 0; i--) {
          if (
            foundCaches.some((foundCache) => foundCache.id === caches[i].id)
          ) {
            lastFoundCacheIndex = i;
            break;
          }
        }
        const showCache = index === 0 || index <= lastFoundCacheIndex + 1;
        return (
          showCache && (
            <Pressable
              key={cache.id}
              onPress={() => {
                setIsModalVisible(true);
                setActiveCache(cache);
              }}
              style={{
                backgroundColor: "white",
                width: "95%",
                alignSelf: "center",
                borderRadius: 10,
                margin: "2.5%",
              }}
            >
              <View
                style={{
                  flexGrow: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      backgroundColor: "#ffcc00",
                      padding: 10,
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {index + 1}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      padding: 10,
                      fontSize: 20,
                    }}
                  >
                    {cache.title}
                  </Text>
                </View>
                {isFound ? (
                  <MaterialIcons
                    name="check-circle"
                    size={30}
                    color="green"
                    style={{ alignSelf: "center", marginRight: 10 }}
                  />
                ) : (
                  <MaterialIcons
                    name="circle"
                    size={30}
                    color="red"
                    style={{ alignSelf: "center", marginRight: 10 }}
                  />
                )}
              </View>
              {debugMode && (
                <Text
                  style={{ color: "green", padding: "2.5%", paddingTop: 0 }}
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
        accessibilityLabel="QR-Code scannen"
      >
        <MaterialIcons
          size={42}
          name="qr-code-2"
          style={{
            backgroundColor: "#ffcc00",
            padding: "2.5%",
            borderRadius: 25,
          }}
        />
      </Pressable>

      {(foundCaches.length === caches.length || debugMode) && (
        <Pressable
          onPress={resetProgress}
          style={{ position: "absolute", bottom: "5%", right: "5%" }}
          accessibilityLabel="Spielstand zurücksetzen"
        >
          <MaterialIcons
            size={20}
            name="refresh"
            style={{
              backgroundColor: "#ffcc00",
              padding: "2.5%",
              borderRadius: 25,
            }}
          />
        </Pressable>
      )}

      {interactionState === "scanning" && (
        <QRScanner
          onBarCodeScanned={handleBarCodeScanned}
          onCancelScan={cancelScan}
          debugMode={debugMode}
        />
      )}


    <Toast key={toastKey} visible={toastVisible} message={toastMessage} duration={2000} type={toastType} />

    </View>
  );
}

export default HomeScreen;