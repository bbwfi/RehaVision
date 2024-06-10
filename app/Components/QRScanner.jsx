import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { Pressable, View, StyleSheet, Text, Dimensions } from 'react-native';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function QRScanner({ onBarCodeScanned, onCancelScan, debugMode }) {
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRatio, setCameraRatio] = useState('4:3');
  const [successScan, setSuccessScan] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setSuccessScan(true);
    onBarCodeScanned({ type, data });
  };

  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    // Calculate aspect ratio based on screen dimensions
    const aspectRatio = screenHeight / screenWidth;

    // Set camera aspect ratio based on screen dimensions
    if (aspectRatio >= 1.77) {
      setCameraRatio('16:9');
    } else {
      setCameraRatio('4:3');
    }
  }, []);

  useEffect(() => {
    // Reset successScan state after 1 second
    const timeout = setTimeout(() => {
      setSuccessScan(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [successScan]);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Camera
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}
      type={Camera.Constants.Type.back}
      autoFocus={Camera.Constants.AutoFocus.on}
      ratio={cameraRatio}
    >
      <View style={styles.overlay}>
        <View style={styles.topOverlay} />
        <View style={styles.middleRow}>
          <View style={styles.sideOverlay} />
          <View style={[styles.scanningBox, successScan && styles.successScan]}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          <View style={styles.sideOverlay} />
        </View>
        <View style={styles.bottomOverlay} />
      </View>

      <Pressable
        accessibilityRole='button'
        onPress={() => onCancelScan()}
        style={styles.cancelButton}
      >
        <MaterialIcons
          size={50}
          name="close"
          style={styles.closeIcon}
        />
      </Pressable>

      {debugMode && (
        <>
          <View style={styles.debugTextTop}>
            <Text style={{ color: 'white' }}>Debug Mode: On</Text>
          </View>
          <View style={styles.debugText}>
            <Text style={{ color: 'white' }}>Scanned Data: {scanned ? "No data" : "Waiting for scan..."}</Text>
          </View>
        </>
      )}
    </Camera>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topOverlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  middleRow: {
    flexDirection: 'row',
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scanningBox: {
    width: '60%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red', // Default border color
    borderWidth: 2,
  },
  successScan: {
    borderColor: 'green', // Change border color on success
  },
  bottomOverlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#fff',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  cancelButton: {
    position: 'absolute',
    bottom: '5%',
    alignSelf: 'center',
  },
  closeIcon: {
    backgroundColor: '#ffc107',
    padding: '2.5%',
    borderRadius: 25,
  },
  debugTextTop: {
    position: 'absolute',
    top: '5%',
    alignSelf: 'center',
  },
  debugText: {
    position: 'absolute',
    top: '10%',
    alignSelf: 'center',
  },
});
