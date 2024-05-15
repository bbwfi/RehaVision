import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import Intro1 from "../../assets/Intro 1 World.png";

export default function IntroPage() {
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
          Was ist GEOCACHING ?
        </Text>
        <Image
          source={Intro1}
          style={{ width: 240, height: 240, marginBottom: 40, marginLeft: 20}}
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
          Geocaching ist eine moderne Schatzsuche, bei der Teilnehmer mithilfe
          von GPS-Geräten versteckte Behälter finden.
        </Text>
        <View style={{ display: "flex", flexDirection: "row", marginBottom: -20, marginTop: 20, backgroundColor: '#222020'}}>
          <View style={{ width: 35, height: 35, backgroundColor: "#ffc107", borderRadius: 25, marginLeft: 0 }} />
          <View style={{ width: 35, height: 35, backgroundColor: "#ffc107", borderRadius: 25, marginLeft: 30 }} />
          <View style={{ width: 35, height: 35, backgroundColor: "#ffc107", borderRadius: 25, marginLeft: 30 }} />
          <View style={{ width: 35, height: 35, backgroundColor: "#ffc107", borderRadius: 25, marginLeft: 30 }} />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 3,
          backgroundColor: "#ffc107",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          onPress={() => Hallo()}
          style={{ padding: 10, width: "40%" }}
        >
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
        <Pressable
          onPress={() => Hallo()}
          style={{ padding: 10, width: "40%" }}
        >
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
