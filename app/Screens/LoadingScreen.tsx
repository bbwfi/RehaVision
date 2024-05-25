import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export function LoadingScreen() {
  return (
    <View style={styles.loadingAnimation}>
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );

}

const styles = StyleSheet.create( {
    loadingAnimation: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }
  });

export default LoadingScreen;