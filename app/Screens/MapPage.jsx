import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Circle } from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

import MapStyle from "../../assets/json/MapStyle.json";
import CacheList from "../../assets/json/Caches.json";
import Loading from "../Components/Loading";
import Popup from "../Components/PopUp";

export default function SettingsScreen({ debugMode }) {
  const [initialLocation, setInitialLocation] = useState(null);
  const [actualLocation, setActualLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [visibleCaches, setVisibleCaches] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentCache, setCurrentCache] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        setInitialLocation(location);
      } catch (error) {
        setErrorMsg("Error fetching location: " + error.message);
      }
    })();
  }, []);

  useEffect(() => {
    if (actualLocation) {
      const visibleCaches = CacheList.markers.filter((cache) => {
        const distance = calculateDistance(
          actualLocation.latitude,
          actualLocation.longitude,
          cache.coordinate.latitude,
          cache.coordinate.longitude
        );
        return distance <= cache.radius;
      });
      setVisibleCaches(visibleCaches);

      console.log("Visible caches: ", visibleCaches);
      // Check if user is near a cache
      const nearbyCache = visibleCaches.find(cache =>
        calculateDistance(
          actualLocation.latitude,
          actualLocation.longitude,
          cache.coordinate.latitude,
          cache.coordinate.longitude
        ) <= cache.radius
      );
      if (nearbyCache) {
        setCurrentCache(nearbyCache);
        setPopupVisible(true);
      } else {
        setPopupVisible(false);
      }
    }
  }, [actualLocation]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  };

  const onLocationChange = (location) => {
    setActualLocation(location.nativeEvent.coordinate);
  };

  return (
    <View style={styles.container}>
      {errorMsg ? <Text>{errorMsg}</Text> : null}
      {!initialLocation && !errorMsg ? <Loading /> : null}

      <View style={styles.mapContainer}>
        {initialLocation && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: initialLocation.coords.latitude,
              longitude: initialLocation.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            customMapStyle={MapStyle}
            showsMyLocationButton={true}
            showsUserLocation={true}
            onUserLocationChange={onLocationChange}
          >
            {visibleCaches.map((cache) => (
              <Circle
                key={cache.id}
                center={{
                  latitude: cache.coordinate.latitude,
                  longitude: cache.coordinate.longitude,
                }}
                radius={cache.radius}
                strokeColor="#ffc107"
                fillColor="rgba(255,193,7,0.3)"
              />
            ))}
          </MapView>
        )}
        {popupVisible && (
          <View style={styles.popupContainer}>
            <Popup cacheName={currentCache.title} onClose={() => setPopupVisible(false)} />
          </View>
        )}
      </View>

      {debugMode && (
  <View style={styles.debugContainer}>
    {errorMsg && <Text style={styles.debugText}>Error Message: {errorMsg}</Text>}
    {initialLocation && (
      <Text style={styles.debugText}>
        Initial Location: {"\n"}
        Latitude: {initialLocation.coords.latitude.toFixed(6)} {"\n"}
        Longitude: {initialLocation.coords.longitude.toFixed(6)}
      </Text>
    )}
    {actualLocation && (
      <Text style={styles.debugText}>
        Actual Location: {"\n"}
        Latitude: {actualLocation.latitude.toFixed(6)} {"\n"}
        Longitude: {actualLocation.longitude.toFixed(6)}
      </Text>
    )}
    {visibleCaches.length > 0 && (
      <Text style={styles.debugText}>
        Visible Caches:{"\n"} 
        Name: {visibleCaches.map(cache => cache.title).join(", ")} {"\n"}
        Id: {visibleCaches.map(cache => cache.id).join(", ")} {"\n"}
        Found: {visibleCaches.map(cache => cache.found).join(", ")}
      </Text>
    )}
    {!errorMsg && !initialLocation && !actualLocation && visibleCaches.length === 0 && (
      <Text style={styles.debugText}>No debug information available.</Text>
    )}
  </View>
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
  mapContainer: {
    flex: 1,
    width: "100%",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  popupContainer: {
    position: "absolute",
    top: 50, // Adjust as needed to position the popup between the map and header
    left: 0,
    right: 0,
    alignItems: "center",
    with: "100%",
    zIndex: 2,
  },
  debugContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  debugText: {
    marginBottom: 5,
  }
  
  
});
