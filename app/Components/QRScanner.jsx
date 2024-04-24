import React, { useState } from 'react';
import { Camera } from 'expo-camera';
import { Pressable, Text } from 'react-native';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function QRScanner({ onBarCodeScanned, onCancelScan, debugMode }) {
  const [scanned, setScanned] = useState(false);

  // Function to handle barcode scanning
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    onBarCodeScanned({ type, data });
  };

  return (
    // Camera component for scanning QR codes
    <Camera
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}
      type={Camera.Constants.Type.back}
      autoFocus={Camera.Constants.AutoFocus.on}
    >
      {/* Pressable component for canceling the scan */}
      <Pressable
        onPress={() => onCancelScan()}
        style={{ position: "absolute", bottom: "5%", alignSelf: "center" }}
      >
        {/* MaterialIcons component for close icon */}
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

      {/* Debug mode */}
      {debugMode && (
        <>
          <Text style={{ position: "absolute", top: "5%", alignSelf: "center", color: "white" }}>
            Debug Mode: On
          </Text>
          {/* Add additional debug information here */}
          {/* For example, you can display the scanned data */}
          <Text style={{ position: "absolute", top: "10%", alignSelf: "center", color: "white" }}>
            Scanned Data: {scanned ? "No data" : "Waiting for scan..."}
          </Text>
        </>
      )}
    </Camera>
  );
}
