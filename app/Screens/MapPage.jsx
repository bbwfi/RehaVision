import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import MapView, { Circle } from "react-native-maps";
import { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

import MapStyle from "../../assets/json/MapStyle.json";
import CachesJSON from "../../assets/json/Caches.json";
import Loading from "../Components/Loading";
import CacheModal from "../Components/CacheModal";

import { loadUserData } from "../Functions/userDataManager";

export default function MapPage({ debugMode }) {
  const [initialLocation, setInitialLocation] = useState(null);
  const [actualLocation, setActualLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [visibleCaches, setVisibleCaches] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentCache, setCurrentCache] = useState(null);
  const [foundCaches, setFoundCaches] = useState([]);
  const [nextCache, setNextCache] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const mapViewRef = useRef(null);
  const caches = CachesJSON.markers || []; // Ensure caches is an array

  // Request location permissions and fetch initial location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
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

  // Load user data and set found caches
  useEffect(() => {
    loadUserData().then((data) => {
      if (data !== null) {
        setFoundCaches(data.foundCaches || []); // Ensure foundCaches is an array
      }
    });
  }, []);

  // Set the next cache based on found caches
  useEffect(() => {
    if (caches.length > 0) {
      const foundCacheIds = (foundCaches || []).map((cache) => cache.id);
      const nextCache = caches.find((cache) => !foundCacheIds.includes(cache.id));
      setNextCache(nextCache);
    }
  }, [foundCaches]);

  // Update visible caches and popup visibility based on location
  useEffect(() => {
    setPopupVisible(false);
    if (actualLocation) {
      updateVisibleCaches();
    }
  }, [actualLocation, foundCaches]);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon1 - lon2) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // Update visible caches based on the actual location
  const updateVisibleCaches = () => {
    if (caches.length > 0 && actualLocation) {
      const foundCacheIds = (foundCaches || []).map((cache) => cache.id);
      const visibleCaches = caches.filter((cache) => {
        const distance = calculateDistance(
          actualLocation.latitude,
          actualLocation.longitude,
          cache.coordinate.latitude,
          cache.coordinate.longitude
        );
        if (distance <= cache.radius) {
          setCurrentCache(cache);
          setPopupVisible(true);
        }
        return distance <= cache.radius;
      });
      setVisibleCaches(visibleCaches);
    }
  };

  // Center the map on the user's location
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
      {errorMsg && <Text>{errorMsg}</Text>}
      {!initialLocation && !errorMsg && <Loading />}

      {popupVisible && (
        <View style={styles.popup}>
          <Text style={[styles.popupTitle, { color: "#FFFFFF" }]}>
            Cache Nearby
          </Text>
          <Text style={[styles.popupText, { color: "#FFFFFF" }]}>
            {currentCache
              ? foundCaches.some((cache) => cache.id === currentCache.id) ||
                currentCache === nextCache
                ? currentCache.title
                : "???"
              : "???"}
          </Text>
          {currentCache &&
            !foundCaches.some((cache) => cache.id === currentCache.id) &&
            currentCache === nextCache && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setIsModalVisible(true);
                    console.log(currentCache.id);
                  }}
                >
                  <Text style={[styles.buttonText, { color: "#333333" }]}>
                    Info
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    // Navigate to the CacheModal screen
                  }}
                >
                  <Text style={[styles.buttonText, { color: "#333333" }]}>
                    Tipp
                  </Text>
                </TouchableOpacity>
              </View>
            )}
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
            showsMyLocationButton={false}
            showsUserLocation={true}
            showsCompass={false}
            onUserLocationChange={(location) =>
              setActualLocation(location.nativeEvent.coordinate)
            }
          >
            {(visibleCaches || []).map((cache) => (
              <Circle
                key={cache.id}
                center={cache.coordinate}
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

      <CacheModal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        selectedCache={currentCache}
        onClose={closeModal}
      />

      {debugMode && (
        <View style={styles.debugContainer}>
          {errorMsg && <Text style={styles.debugText}>Error: {errorMsg}</Text>}
          {initialLocation && (
            <Text style={styles.debugText}>
              Initial Location: {`\n`}
              Latitude: {initialLocation.coords.latitude.toFixed(6)} {`\n`}
              Longitude: {initialLocation.coords.longitude.toFixed(6)}
            </Text>
          )}
          {actualLocation && (
            <Text style={styles.debugText}>
              Actual Location: {`\n`}
              Latitude: {actualLocation.latitude.toFixed(6)} {`\n`}
              Longitude: {actualLocation.longitude.toFixed(6)}
            </Text>
          )}
          {visibleCaches.length > 0 && (
            <Text style={styles.debugText}>
              Visible Caches: {`\n`}
              {visibleCaches
                .map((cache) => `${cache.title} (${cache.id})`)
                .join(", ")}
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
    backgroundColor: "#313335", // Greyish background color
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#2c3e50",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 2,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF", // White color for the title text
    marginBottom: 10, // Add some spacing between title and text
  },
  popupText: {
    fontSize: 16,
    color: "#FFFFFF", // White color for the text
    textAlign: "center", // Center-align the text
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between", // evenly space buttons
    width: "100%", // make the container stretch across the popup
  },
  button: {
    backgroundColor: "#ffc107",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    // remove marginLeft to allow evenly spaced buttons
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
