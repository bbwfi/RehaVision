import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import MapView, {Circle} from "react-native-maps";
import { useEffect, useState } from "react";

import MapStyle from "../../assets/json/MapStyle.json"

import Loading from "../Components/Loading";

export default function SettingsScreen() {
  const [initialLocation, setInitialLocation] = useState(null);
  const [actualLocation, setActualLocation] = useState(null); // [latitude, longitude
  const [errorMsg, setErrorMsg] = useState(null);



  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setInitialLocation(location);
    })();
  }, []);


  const onLocationChange = (location) => {
    setActualLocation(location.nativeEvent.coordiante);
    console.log(location.nativeEvent.coordiante);
  };



  return (
    <View style={styles.container}>
      {errorMsg ? <Text>{errorMsg}</Text> : null}

      {!initialLocation && !errorMsg ? <Loading/> : null}

      {initialLocation && (
        <MapView
          style={{ flex: 1, width: "100%" }}
          initialRegion={{
            latitude: initialLocation.coords.latitude,
            longitude: initialLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={MapStyle}
          showsMyLocationButton={true}
          showsUserLocation={true}
          onLocationChange={onLocationChange}
        >
            {actualLocation && (
              <Circle center={{longitude: actualLocation.longitude, latitude: actualLocation.latitude}} radius={50} strokeColor="#4c669f" fillColor="rgba(75,105,189,0.3)" />
            )}
        </MapView>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});