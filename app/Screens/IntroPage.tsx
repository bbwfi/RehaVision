import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

import { loadUserData, saveUserData } from "../Functions/userDataManager";
import { IntroViewCard } from "../Models/IntroViewCard";

import { intro_world, intro_puzzle, intro_map, intro_attention } from '../assets'
import { getCameraPermissionsAsync, getLocationPermissionsAsync } from "../Functions/permissions";

const IntroViewCards: IntroViewCard[] = [
  {
    id: 1,
    title: "Was ist GEOCACHING?",
    text: "Geocaching ist eine moderne Schatzsuche, bei der Teilnehmer mithilfe von GPS-Geräten versteckte Behälter finden.",
    image: intro_world,
  },
  {
    id: 2,
    title: "Das Rätsel",
    text: "Der Ort des Schatzes ist hinter einem Rätsel versteckt, löse diese um ihn zu finden.",
    image: intro_puzzle,
  },
  {
    id: 3,
    title: "Die Suche",
    text: "Nachdem du das erste Rätsel gelöst hast, musst du nur noch den Schatz finden. Hierfür bekommst du einen Tipp von deinem Handy.",
    image: intro_map,
  },
  {
    id: 4,
    title: "HINWEIS",
    text: "Das Betreten von Gebäuden ist im Rahmen dieser Aktivität nicht notwendig. Teile den exakten Standort der Caches anderen Teilnehmern bitte nicht mit.",
    image: intro_attention,
  },
  {
    id: 5,
    title: "Kamera",
    text: "Damit die App QR-Codes zum Abschließen der Caches Scannen kann, musst du die Kamerafreigabe aktivieren.",
    image: intro_world,
  },
  {
    id: 6,
    title: "Standort",
    text: "Damit die App ermiteln kann wo du dich befindest, musst du uns erlauben deinen Standort im Hintergrund abzurufen. Standortfreigabe aktivieren.",
    image: intro_map,
  },
];

export default function IntroPage({ navigation }) {
  const [index, setIndex] = useState(0);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchData();
    checkTutorialCompletion();
  }, []);

  const fetchData = async () => {
    try {
      const userData = await loadUserData();
      setUserData(userData);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const checkTutorialCompletion = async () => {
    console.log("Checking tutorial completion...");
    console.log("User data:", userData);
    try {
      if (userData && userData.tutorialCompleted) {
        navigation.navigate("Main");
      }
    } catch (error) {
      console.error("Error checking tutorial completion:", error);
    }
  }
  
  const handleFinish = async () => {
    try {
      if (index == 5) {
        console.log("Requesting location permissions...");
        await getLocationPermissionsAsync();
      }
  
      await saveUserData({ tutorialCompleted: true });
      navigation.navigate("Main");
    } catch (error) {
      console.error("Error saving tutorial completion:", error);
    }
  }

  const handleNext = () => {
    if (index == 4) {
      getCameraPermissionsAsync();
    }

    if (index == 5) {
      console.log("Requesting location permissions...");
      (async () => { 
        getLocationPermissionsAsync();
      })();
    }

    if (index < IntroViewCards.length - 1) {
      setIndex((prevIndex) => (prevIndex + 1) % IntroViewCards.length);
    }
  };

  const handleBack = () => {
    if (index > 0) {
      setIndex((prevIndex) => (prevIndex - 1 + IntroViewCards.length) % IntroViewCards.length);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}> {IntroViewCards[index].title}</Text>
        <Image source={IntroViewCards[index].image} style={styles.image} />
        <Text style={styles.text}> {IntroViewCards[index].text}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
      {index == 0 && (
          <Pressable onPress={handleFinish} style={{ padding: 10, width: "40%" }}>
            <Text style={styles.button}>Ende</Text>
          </Pressable>
        )}
        {index > 0 && (
          <Pressable onPress={handleBack} style={{ padding: 10, width: "40%" }}>
            <Text style={styles.button}>Zurück</Text>
          </Pressable>
        )}
        {index !== 5 && (
          <Pressable onPress={handleNext} style={{ padding: 10, width: "40%" }}>
            <Text style={styles.button}>Weiter</Text>
          </Pressable>
        )}
        {index == 5 && (
          <Pressable onPress={handleFinish} style={{ padding: 10, width: "40%" }}>
            <Text style={styles.button}>zur App</Text>
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
  header: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 40,
    color: "#ffc107",
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    borderTopColor: "white",
    borderTopWidth: 4,
    paddingTop: 20,
  },
  image: { width: 150, height: 150, marginBottom: 30, marginLeft: 20 },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    backgroundColor: "#ffc107",
    justifyContent: 'space-between'
  },
  button:{
    padding: 10,
    backgroundColor: "#222020",
    borderRadius: 17,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  }
  
});
