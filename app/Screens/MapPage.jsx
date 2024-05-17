import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Circle } from "react-native-maps";
import { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons

import MapStyle from "../../assets/json/MapStyle.json";
import CacheList from "../../assets/json/Caches.json";
import Loading from "../Components/Loading";

import { loadUserData } from "../Functions/userDataManager";


export default function SettingsScreen({ debugMode }) {
  const [initialLocation, setInitialLocation] = useState(null);
  const [actualLocation, setActualLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [visibleCaches, setVisibleCaches] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentCache, setCurrentCache] = useState(null);
  const [foundCaches, setFoundCaches] = useState([]);

  const mapViewRef = useRef(null);


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
    fetchData(); // Load user data when the component mounts
  }, []);

  useEffect(() => {
    // Update visible caches and check for nearby cache
    updateVisibleCaches();
  }, [actualLocation, foundCaches]);

  const fetchData = async () => {
    const userData = await loadUserData();
    if (userData?.foundCaches) {
      setFoundCaches(userData.foundCaches);
    }
  };

  const updateVisibleCaches = () => {
    if (actualLocation) {
      // Update visible caches based on actual location
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

      // Check if user is near a cache
      const nearbyCache = visibleCaches.find(
        (cache) =>
          calculateDistance(
            actualLocation.latitude,
            actualLocation.longitude,
            cache.coordinate.latitude,
            cache.coordinate.longitude
          ) <= cache.radius
      );
      if (nearbyCache) {
        const isNextCache = foundCaches.length === 0 || foundCaches.includes(nearbyCache.id - 1);
        if (nearbyCache.found || isNextCache) {
          setCurrentCache(nearbyCache);
          setPopupVisible(true);
          //console.log("Nearby cache:", nearbyCache);
        } else {
          setCurrentCache(null); // Set current cache for the question mark popup
          setPopupVisible(true); // Set popup visible for the question mark
          console.log("???")
        }
      } else {
        setCurrentCache(null);
        setPopupVisible(false);
      }
    } else {
      setPopupVisible(false);
    }
  };


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

  const centerMapOnUser = () => {
    if (actualLocation) {
      const { latitude, longitude } = actualLocation;
      mapViewRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  };

  return (
    <View style={styles.container}>
      {errorMsg ? <Text>{errorMsg}</Text> : null}
      {!initialLocation && !errorMsg ? <Loading /> : null}

      {popupVisible && (
        <View style={styles.popup}>
  <View style={{ flex: 1, flexDirection: "row" }}>
    <View>
      <Text style={styles.popupText}>
        Cache in der Nähe:
      </Text>
      {currentCache && foundCaches.includes(currentCache.id) ? (
        <Text style={styles.popupText}>
          {currentCache.title}
        </Text>
      ) : (
        <Text style={styles.popupText}>
          ???
        </Text>
      )}
    </View>
    <Pressable>
      <MaterialIcons
        style={{ alignSelf: "flex-end" }}
        name="info-outline"
        size={24}
        color="black"
      />
    </Pressable>
  </View>
</View>

    )}


      <View style={styles.mapContainer}>
        {initialLocation && (
          <MapView
            style={styles.map}
            ref={mapViewRef}
            initialRegion={{
              latitude: initialLocation.coords.latitude,
              longitude: initialLocation.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            customMapStyle={MapStyle}
            showsMyLocationButton={false} // Disable default my location button
            showsUserLocation={true}
            showsCompass={false}
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
        <Pressable style={styles.myLocationButton} onPress={centerMapOnUser}>
          <MaterialIcons name="my-location" size={30} color="white" />
        </Pressable>
      </View>

      {debugMode && (
        <View style={styles.debugContainer}>
          {errorMsg && (
            <Text style={styles.debugText}>Error Message: {errorMsg}</Text>
          )}
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
              Name: {visibleCaches.map((cache) => cache.title).join(", ")}{" "}
              {"\n"}
              Id: {visibleCaches.map((cache) => cache.id).join(", ")} {"\n"}
              Found: {visibleCaches.map((cache) => cache.found).join(", ")}
            </Text>
          )}
          {!errorMsg &&
            !initialLocation &&
            !actualLocation &&
            visibleCaches.length === 0 && (
              <Text style={styles.debugText}>
                No debug information available.
              </Text>
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
  myLocationButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
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
  },
  popup: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: "#ffc107",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    borderWidth: 2, // Add border width
    borderColor: "#000", // Add border color
    zIndex: 2, // Ensure popup stays above map
  },

  popupText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
