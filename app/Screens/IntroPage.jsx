import { StatusBar } from "expo-status-bar";
import Intro1 from "../../assets/Intro 1 World.png";
import Intro2 from "../../assets/Intro 2 Puzzle.png";
import Intro3 from "../../assets/Intro 3 Map.png";
import Intro4 from "../../assets/Intro 4 Ausrufezeichen.png";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Switch,
  DeviceEventEmitter,
  Pressable,
  Image,
  StyleSheet
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppContext } from "../Context/AppContext";
import Collapsible from "react-native-collapsible";

export default function IntroPage({ navigation }) {
  const [index, setIndex] = useState(0);

  const header = [
    "Was ist GEOCACHING?",
    "Das Rätsel",
    "Die Suche",
    "HINWEIS",
  ];

  const icon = [Intro1, Intro2, Intro3, Intro4];

  const textInhalt = [
    "Geocaching ist eine moderne Schatzsuche, bei der Teilnehmer mithilfe von GPS-Geräten versteckte Behälter finden.",
    "Der Ort des Schatzes ist hinter einem Rätsel versteckt, löse diese um ihn zu finden.",
    "Nachdem du das erste Rätsel gelöst hast, musst du nur noch den Schatz finden. Hierfür bekommst du einen Tipp von deinem Handy.",
    "Das Betreten von Gebäuden ist im Rahmen dieser Aktivität untersagt. Teilen Sie den exakten Standort der Caches anderen Teilnehmern nicht mit.",
  ];

  const handleNext = () => {
    if (index < header.length - 1) {
      setIndex((prevIndex) => (prevIndex + 1) % header.length);
    }
  };

  const handleBack = () => {
    if (index > 0) {
      setIndex((prevIndex) => (prevIndex - 1 + header.length) % header.length);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            marginTop: -40,
            marginBottom: 40,
            color: "#ffc107",
            textAlign: "center",
          }}
        >
          {header[index]}
        </Text>
        <Image
          source={icon[index]}
          style={{ width: 240, height: 240, marginBottom: 40, marginLeft: 20 }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
            borderTopColor: "white",
            borderTopWidth: 4,
            paddingTop: 20,
          }}
        >
          {textInhalt[index]}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: -20,
            marginTop: 20,
            backgroundColor: "#222020",
          }}
        >
          {header.map((_, idx) => (
            <View
              key={idx}
              style={{
                width: 35,
                height: 35,
                backgroundColor: idx === index ? "#ffc107" : "white",
                borderRadius: 25,
                marginLeft: idx === 0 ? 0 : 30,
              }}
            />
          ))}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 3,
          backgroundColor: "#ffc107",
          justifyContent: 'space-between'
        }}
      >
      {index == 0 && (
          <Pressable onPress={() => navigation.navigate('Main')} style={{ padding: 10, width: "40%" }}>
            <Text
              style={{
                padding: 10,
                backgroundColor: "#222020",
                borderRadius: 17,
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Ende
            </Text>
          </Pressable>
        )}
        {index > 0 && (
          <Pressable onPress={handleBack} style={{ padding: 10, width: "40%" }}>
            <Text
              style={{
                padding: 10,
                backgroundColor: "#222020",
                borderRadius: 17,
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Zurück
            </Text>
          </Pressable>
        )}
        {index !== 3 && (
          <Pressable onPress={handleNext} style={{ padding: 10, width: "40%" }}>
            <Text
              style={{
                padding: 10,
                backgroundColor: "#222020",
                borderRadius: 17,
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Weiter
            </Text>
          </Pressable>
        )}
        {index == 3 && (
          <Pressable onPress={() => navigation.navigate('Main')} style={{ padding: 10, width: "40%" }}>
            <Text
              style={{
                padding: 10,
                backgroundColor: "#222020",
                borderRadius: 17,
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Ende
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222020",
    alignItems: "center",
    justifyContent: "center",
  },
});
