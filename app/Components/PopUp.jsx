// Popup.js

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Popup({ cacheName, onClose }) {
  return (
    <View style={styles.container}>
      <Text style={styles.cacheName}>{cacheName}</Text>
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: "#fff",
    padding: 10,
    elevation: 2,
    width: "100%",
  },
  cacheName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    color: "blue",
    textDecorationLine: "underline",
  },
};
