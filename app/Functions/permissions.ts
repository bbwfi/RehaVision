import { Camera } from "expo-camera";
import * as Location from "expo-location";

export const getCameraPermissionsAsync = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
        console.log("Permission denied")
    }
}

export const getLocationPermissionsAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    return status;
}
