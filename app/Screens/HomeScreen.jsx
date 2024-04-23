import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Vibration,
  Modal,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import CachesJSON from "../../assets/json/Caches.json";
import { CameraView, Camera } from "expo-camera/next";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


export default function HomeScreen() {
  const [isScanning, setIsScanning] = useState(false); // Fix: Correctly destructure the useState hook
  const [scanned, setScanned] = useState(false); // Fix: Correctly destructure the useState hook

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCache, setSelectedCache] = useState(null);

  const Caches = CachesJSON.markers;
  console.log(Caches);

  const getPermissionsAsync = async () => {
    console.log("Getting permissions");
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log(status);
  };

  const openQRScanner = () => {
    // Fix: Add missing 'const' keyword
    console.log("Opening QR Scanner");
    getPermissionsAsync();
    setIsScanning(true);
  };

  handleBarCodeScanned = ({ type, data }) => {
    console.log("Scanned", data);
    setScanned(true);
    Vibration.vibrate(500);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    if (Caches.find((cache) => cache.id === data)) {
      const index = Caches.findIndex((cache) => cache.id === data);
      console.log("Found cache: ", Caches[index].title);
      Caches[index].found = true;
    }

    setTimeout(() => {
      // Code to be executed after the wait time
      setIsScanning(false);
      setScanned(false);
    }, 2000); // Wait for 2 seconds (2000 milliseconds)
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      {Caches.map((cache, index) => {
        const color = cache.found ? "green" : "red";
        return (
          <Pressable
            key={index}
            onPress={() => {
              setModalVisible(true);
              setSelectedCache(cache);
            }}
            style={{ backgroundColor: "black", width: "75%" }}
          >
            <Text style={{ color }}>{cache.title}</Text>
          </Pressable>
        );
      })}

      {modalVisible && (
      <View style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={styles.centeredView}
          >
            <View
              style={styles.modalView}
            >
              <Text
                style={{ alignSelf: "center", fontSize: 25, fontWeight: "bold" }}
              >
                {selectedCache?.title}
              </Text>

              {/* Add more information about the cache here */}
              <Pressable
                onPress={() => setModalVisible(false)}
                style={{ position: "absolute", alignSelf: "flex-end" }}
              >
                <MaterialIcons
                  size={32}
                  name="close"
                  style={{ color: "black" }}
                />
              </Pressable>

              <Text>{selectedCache?.description}</Text>
            </View>
          </View>
        </Modal>
      </View>
      )}

      <Pressable
        onPress={openQRScanner}
        style={{ position: "absolute", bottom: "5%" }}
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

      {isScanning && (
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Pressable
            onPress={() => setIsScanning(false)}
            style={{ position: "absolute", bottom: "5%", alignSelf: "center" }}
          >
            <MaterialIcons
              size={42}
              name="close"
              style={{
                backgroundColor: "#ffc107",
                padding: "2.5%",
                borderRadius: 25,
              }}
            />
          </Pressable>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});