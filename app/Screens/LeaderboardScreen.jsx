import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import Crown from "../../assets/Crown.png";
import Fancy from "../../assets/Fancy.png";

export default function SettingsScreen({ navigation }) {
  const leaderboardData = [
    { position: "1st", name: "PlaceHolder", score: "NaN" },
    { position: "2nd", name: "PlaceHolder", score: "NaN" },
    { position: "3rd", name: "PlaceHolder", score: "NaN" },
    { position: "4th", name: "PlaceHolder", score: "NaN" },
    { position: "5th", name: "PlaceHolder", score: "NaN" },
  ];

  const getRowStyle = (position) => {
    switch (position) {
      case "1st":
        return [styles.row, styles.firstRow];
      default:
        return styles.row;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={Fancy} style={styles.backgroundImage} resizeMode="contain">
        <View style={styles.leaderboard}>
          {leaderboardData.map((item, index) => (
            <View key={index} style={[styles.row, getRowStyle(item.position)]}>
              <View style={styles.positionContainer}>
                <Text style={styles.positionText}>{item.position}</Text>
              </View>
              <View style={styles.infoContainer}>
                {item.position === "1st" && (
                  <Image source={Crown} style={styles.crown} />
                )}
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.scoreText}>{item.score}</Text>
              </View>
            </View>
          ))}
        </View>
      </ImageBackground>
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>TO BE ADDED</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222020",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  leaderboard: {
    width: "90%",
    alignItems: "center",
    marginTop: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    height: 80,
  },
  positionContainer: {
    backgroundColor: "#ffcc00",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  positionText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoContainer: {
    borderColor: "#ffcc00",
    borderWidth: 4,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    minWidth: 150,
    alignItems: "center",
  },
  crown: {
    position: "absolute",
    top: -59,
    left: -25,
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  scoreText: {
    fontSize: 14,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.9)', // semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 70,
    color: 'red',
    fontWeight: 'bold',
  },
});
