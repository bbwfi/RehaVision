import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import CachesJSON from '../../assets/json/Caches.json'
import { CameraView, Camera } from "expo-camera/next";

export default function HomeScreen() {
  const [isScanning, setIsScanning] = useState(false); // Fix: Correctly destructure the useState hook
  const [scanned, setScanned] = useState(false); // Fix: Correctly destructure the useState hook

  const Caches = CachesJSON.markers;
  console.log(Caches);

  const getPermissionsAsync = async () => {
    console.log("Getting permissions");
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log(status);
  }

  const openQRScanner = () => { // Fix: Add missing 'const' keyword
    console.log("Opening QR Scanner - Fortnite" );
    getPermissionsAsync();
    setIsScanning(true);
  }

  handleBarCodeScanned = ({ type, data }) => {
    console.log("Scanned", data);
    setScanned(true);
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      {Caches.map((cache, index) => {
        const color = cache.found ? 'green' : 'red';
        return (
          <View key={index}>
            <Text style={{color}}>{cache.title}</Text>
          </View>
        )
      })}
      {isScanning && 
      <CameraView
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
      
      > 
      <Pressable onPress={() => setIsScanning(false)}>
        <Text>Close</Text>
      </Pressable>
      <Text style={{}}>SCAN</Text>
      </CameraView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
