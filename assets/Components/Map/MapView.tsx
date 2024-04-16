import React, { useEffect, useState } from "react";
import { View, ViewProps } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview"; // Import the correct type for WebView
import { map } from "./Map";

type Payload = {
    code: string;
    content: any;
};

type Props = {
    clickListener: (cords: string) => void;
    markersListener: (markerID: string) => void;
    animateToPosition?: [number, number];
    markersList?: {
        ID: any;
        cords: { lat: number; long: number };
        icon: string;
    }[];
};

const code_to_function: { [key: string]: (payload: Payload, props: Props) => void } = {
    "1": clickCallback,
    "2": markerCallback,
};

function clickCallback(payload: Payload, props: Props) {
    const cords = JSON.stringify(payload.content);
    console.log("payload content: " + cords);
    props.clickListener(cords);
}

function markerCallback(payload: Payload, props: Props) {
    const markerID = JSON.stringify(payload.content);
    console.log("payload content: " + JSON.stringify(payload.content));
    props.markersListener(markerID);
}

function parseInput(event: string, props: Props) {
    const payload = JSON.parse(event);
    code_to_function[payload.code](payload, props);
}

async function insertMarker(mapRef: WebView | null, ID: any, cords: { lat: number; long: number }, icon: string) {
    mapRef?.injectJavaScript(`
        var customIcon = L.divIcon({
            className: 'marker-class',
            html: \`<body>${icon}</body>\`,
            iconSize: 50
        });

        // Check if there is no other marker with same ID already in map
        if (!(${ID} in markers)) {
            // Creates marker object
            markers[${ID}] = L.marker([${cords.lat}, ${cords.long}], {icon: customIcon, ID: ${ID}});

            // Add marker to map and bind callback event to its function
            markers[${ID}].addTo(mymap).on('click', onPopupClick);
        }
    `);
}

function goToPosition(mapRef: WebView | null, lat: number, long: number) {
    mapRef?.injectJavaScript(`mymap.setView([${lat}, ${long}], 13);`);
}

export default function MapView(props: Props) {
    const [mapRef, setMapRef] = useState<WebView | null>(null);
    const [finishedLoad, setFinishedLoad] = useState(false);

    if (props.animateToPosition != null) {
        goToPosition(mapRef, ...props.animateToPosition);
    }


    // ...

    return (
        <View>
            <WebView
                ref={(webViewRef: WebView | null) => {
                    setMapRef(webViewRef);
                }}
                onMessage={(event: WebViewMessageEvent) => {
                    parseInput(event.nativeEvent.data, props);
                }}
                javaScriptEnabled={true}
                source={{ html: map }}
                onLoad={() => {
                    setFinishedLoad(true);
                }}
            />
        </View>
    );
}