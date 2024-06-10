import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { icon_app } from "../assets";

export function CustomHeader({ navigation }) {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Image source={icon_app} style={styles.headerIcon} />
          <Text style={styles.headerText}>RehaVision</Text>
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => {
            navigation.navigate("Settings");
          }}
          accessibilityLabel="Einstellungen"
        >
          <MaterialIcons name="settings" size={36} color="black" />
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      height: 50,
      backgroundColor: "#ffc107",
    },
    headerIcon: {
        width: 40,
        height: 40,
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerText: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: "500",
    },
});

export default CustomHeader;