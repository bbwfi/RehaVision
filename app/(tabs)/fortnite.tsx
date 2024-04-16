import React, {useEffect, useState} from 'react';
import { View, Text, Button, Pressable, Animated, StyleSheet, Dimensions, Image} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Callout, Marker } from 'react-native-maps';
import Loading from '../../assets/Components/Loading';

import mapStyle from '../../assets/Components/Map/mapStyle.json'

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;




export default function Tab(this: any) {
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [region, setRegion] = useState("");

  const markers = [
    {
      coordinate: {
        latitude: 50.8417,
        longitude: 12.875,
      },
      title: "Capybara",
      description: "The largest rodent in the world",
    },
    {
      coordinate: {
        latitude: 50.8421,
        longitude: 12.8761
      },
      title: "Quokka",
      description: "The happiest animal in the world",
    }
  ];
  




  useEffect(() => {
    (async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
      setUserLocation(location);
    })();
  });

  const onRegionChange = (region: any) => {
    setRegion(region);
  }


  return (
    <View style={{ flex: 1, width:"100%", height:"100%", justifyContent: "center" }}>
      {errorMsg && <Text style={{alignSelf: "center"}}>{errorMsg}</Text>}
      {errorMsg && 
      <Pressable onPress={() => setErrorMsg(null)}>
        <Text style={{alignSelf: "center", color: "#0000ff"}}>Try Again</Text>
      </Pressable>
        }
      
      {!userLocation && !errorMsg && <Loading/>}
      
      {userLocation && (
        <View>
          <MapView
            style={{ alignSelf: 'stretch', height: '100%' }}
            customMapStyle={mapStyle}
            
            initialRegion={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            minZoomLevel={16}
            maxZoomLevel={20}
            showsUserLocation={true}
            showsCompass={false}
            //mapType='satellite'

            
            
            onRegionChange={this.onRegionChange}
          >
            {markers.map((marker: any, index: any) => {
              return (
                <Marker key={index} coordinate={marker.coordinate}>
                  <Animated.View style={[styles.markerWrap]}>
                    <Animated.View style={[styles.ring]}/>

                    <View style={styles.marker}/>
                  </Animated.View>
                </Marker>
              );
            })}
          </MapView>
          <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {markers.map((marker: any, index: any) => (
            <View style={styles.card} key={index}>
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>

          <Text style={{position:"absolute", bottom: 50, color: "#ffffff"}}>{userLocation.coords.longitude} - {userLocation.coords.latitude}</Text>
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


      const styles = StyleSheet.create({
        container: {
          flex: 1,
        },
        scrollView: {
          position: "absolute",
          bottom: 30,
          left: 0,
          right: 0,
          paddingVertical: 10,
        },
        endPadding: {
          paddingRight: width - CARD_WIDTH,
        },
        card: {
          padding: 10,
          elevation: 2,
          backgroundColor: "#FFF",
          marginHorizontal: 10,
          shadowColor: "#000",
          shadowRadius: 5,
          shadowOpacity: 0.3,
          shadowOffset: { x: 2, y: -2 },
          height: CARD_HEIGHT,
          width: CARD_WIDTH,
          overflow: "hidden",
        },
        cardImage: {
          flex: 3,
          width: "100%",
          height: "100%",
          alignSelf: "center",
        },
        textContent: {
          flex: 1,
        },
        cardtitle: {
          fontSize: 12,
          marginTop: 5,
          fontWeight: "bold",
        },
        cardDescription: {
          fontSize: 12,
          color: "#444",
        },
        markerWrap: {
          alignItems: "center",
          justifyContent: "center",
        },
        marker: {
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: "rgba(130,4,150, 0.9)",
        },
        ring: {
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: "rgba(130,4,150, 0.3)",
          position: "absolute",
          borderWidth: 1,
          borderColor: "rgba(130,4,150, 0.5)",
        },
      });