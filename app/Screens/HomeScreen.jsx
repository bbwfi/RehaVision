import React, { useState, useEffect } from "react";
import { View, Pressable, Text, Vibration } from "react-native";
import { Camera } from "expo-camera";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CacheModal from "../Components/CacheModal";
import QRScanner from "../Components/QRScanner";
import CachesJSON from "../../assets/json/Caches.json";

/**
 * Represents the HomeScreen component.
 * This component displays a list of caches and provides functionality for scanning QR codes.
 */
export default function HomeScreen({debugMode}) {
  const [isScanning, setIsScanning] = useState(false); // State to track if QR scanning is active
  const [modalVisible, setModalVisible] = useState(false); // State to control the visibility of the cache details modal
  const [selectedCache, setSelectedCache] = useState(null); // State to store the selected cache object
  const [foundCaches, setFoundCaches] = useState([]); // State to store the indices of found caches

  const Caches = CachesJSON.markers; // Array of cache objects

  useEffect(() => {
    getPermissionsAsync();
  }, []);

  /**
   * Requests camera permissions asynchronously.
   * If permission is not granted, handle permission denied.
   */
  const getPermissionsAsync = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      // Handle permission denied
      console.log("Permission denied");
    }
  };

  /**
   * Sets the isScanning state to true, activating the QR scanner.
   */
  const openQRScanner = () => {
    setIsScanning(true);
    console.log("Opening QR scanner");
  };

  /**
   * Handles the scanned barcodes from the QR scanner.
   * @param {Object} barcode - The scanned barcode object containing type and data.
   */
  const handleBarCodeScanned = ({ type, data }) => {
    console.log("Scanned", data);
    Vibration.vibrate(500);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    if (Caches.find((cache) => cache.id === data)) {
      const index = Caches.findIndex((cache) => cache.id === data);
      console.log("Found cache: ", Caches[index].title);
      if (foundCaches.includes(index)) {
        alert("Cache already found!");
      } else {
        alert("Cache found!");
      }
      Caches[index].found = true;
      setFoundCaches([...foundCaches, index]);
      setIsScanning(false);
    }
  };

  /**
   * Closes the cache details modal and resets the selectedCache state.
   */
  const closeModal = () => {
    setModalVisible(false);
    setSelectedCache(null);
  };

  /**
   * Cancels the QR scanning process by setting isScanning state to false.
   */
  const cancelScan = () => {
    setIsScanning(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#313335" }}>
      {/* Render the list of caches */}

      {!isScanning && (
        <View>
          {Caches.map((cache, index) => {
            const color = foundCaches.includes(index) ? "green" : "red";
            const lastFoundCacheIndex =
              foundCaches.length > 0 ? Math.max(...foundCaches) : -1;
            return foundCaches.includes(index) ||
              index === lastFoundCacheIndex + 1 ? (
              <Pressable
                key={index}
                onPress={() => {
                  setModalVisible(true);
                  setSelectedCache(cache);
                }}
                style={{
                  backgroundColor: "black",
                  width: "100%",
                  alignSelf: "center",
                }}
              >
                <Text style={{ color, padding: "2.5%", alignSelf: "center" }}>
                  {cache.title}
                </Text>
              </Pressable>
            ) : null;
          })}
        </View>
      )}

      <CacheModal
        isVisible={modalVisible}
        onBackdropPress={closeModal}
        selectedCache={selectedCache}
      />

      {/* Render  the QR scanner button */}
      <Pressable
        onPress={() => openQRScanner()}
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

      {/* Render the QR scanner component if isScanning state is true */}
      {isScanning && (
        <QRScanner
          onBarCodeScanned={handleBarCodeScanned}
          onCancelScan={cancelScan}
          debugMode={debugMode}
        />
      )}
    </View>
  );
}
