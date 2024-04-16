import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Pressable,
  Animated,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Callout, Marker } from "react-native-maps";
import Loading from "../../assets/Components/Loading";

import mapStyle from "../../assets/Components/Map/mapStyle.json";

import markersJSON from "../../assets/Components/Markers/markers.json";

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 10;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default function Tab(this: any) {
  const [userLocation, setUserLocation] =
    useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [region, setRegion] = useState("");

  const markers = markersJSON.markers;

  console.log(markers[1].coordinate.latitude);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setUserLocation(location);
    })();
  }, []);

  const onRegionChange = (region: any) => {
    setRegion(region);
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
      }}
    >
      {errorMsg && <Text style={{ alignSelf: "center" }}>{errorMsg}</Text>}
      {errorMsg && (
        <Pressable onPress={() => setErrorMsg(null)}>
          <Text style={{ alignSelf: "center", color: "#0000ff" }}>
            Try Again
          </Text>
        </Pressable>
      )}

      {!userLocation && !errorMsg && <Loading />}

      {userLocation && (
        <View>
          <MapView
            style={{ alignSelf: "stretch", height: "100%" }}
            customMapStyle={mapStyle}
            initialRegion={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            minZoomLevel={10}
            maxZoomLevel={20}
            showsUserLocation={true}
            showsCompass={false}
            onRegionChange={this.onRegionChange}
          >
            {markers.map((marker: any, index: any) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.coordinate.latitude,
                    longitude: marker.coordinate.longitude,
                  }}
                  title={marker.title}
                  description={marker.description}
                >
                  <Callout>
                    <View>
                      <View>
                        <Text>{marker.title}</Text>
                        <Text>{marker.description}</Text>
                      </View>
                    </View>
                  </Callout>
                </Marker>
              );
            })}
          </MapView>

          <Text style={{ position: "absolute", bottom: 50, color: "#ffffff" }}>
            {userLocation.coords.longitude} - {userLocation.coords.latitude}
          </Text>
        </View>
      )}
    </View>
  );
}

/*
      {userLocation && (
        <View>
          <MapView
            style={{ alignSelf: 'stretch', height: '100%' }}
            customMapStyle={mapStyle}
            region={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            minZoomLevel={16}
            maxZoomLevel={20}
            showsUserLocation={true}

            
            onRegionChange={this.onRegionChange}
          />
          <Text style={{position:"absolute", bottom: 50, color: "#ffffff"}}>{region}</Text>
        </View>
      )}
      */
