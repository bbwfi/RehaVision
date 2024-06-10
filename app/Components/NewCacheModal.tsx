import React, { useState } from 'react'
import { FIModal } from "./FIModal"
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { useUserData } from '../Hooks/useUserData'

import GeoCache from '../Models/GeoCache'

type Props = {
    visible: boolean
    setVisible: (visible: boolean) => void
    cache: GeoCache
}

export const NewCacheModal: React.FC<Props> = ({visible, setVisible, cache}) => {

    const userData = useUserData()
    const [showHint, setShowHint] = useState(false)

    const toggleHint = () => {
        setShowHint(!showHint)
    }

    return (
        <FIModal visible={visible} setVisible={setVisible}>
            <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{cache?.name}</Text>
                <Text style={styles.description}>{cache?.description}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.bottomContainer}>
                <View style={styles.section}>
                <Text style={[styles.header, styles.riddleHeader]}>Rätsel</Text>
                <Text style={styles.riddleText}>{cache?.riddle.description}</Text>
                </View>
                <View style={styles.section}>
                <Text style={styles.header}>Gefunden</Text>
                <Text style={styles.details}>
                    { userData && userData.timestamp ? 
                    new Date(userData?.timestamp).toLocaleString()
                    : "Noch nicht gefunden" }
                </Text>
                </View>
                <View style={styles.section}>
                    <TouchableOpacity
                        accessibilityRole="button"
                        onPress={toggleHint}
                        style={styles.button}
                    >
                        <Text style={[styles.buttonText]}>
                            {showHint ? cache?.riddle.hint : "Tip anzeigen"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        </FIModal>
    )
}

const styles = StyleSheet.create({
    modal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    modalContent: {
      backgroundColor: "#313335",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    closeButton: {
      alignSelf: "flex-end",
      padding: 10,
    },
    closeButtonText: {
      fontSize: 16,
      color: "#FFFFFF",
      fontWeight: "bold",
    },
    titleContainer: {
      marginBottom: 10,
    },
    title: {
      fontSize: 24,
      color: "#FFFFFF",
      fontWeight: "bold",
    },
    description: {
      fontSize: 14,
      color: "#CCCCCC",
    },
    separator: {
      height: 1,
      width: "100%",
      backgroundColor: "#FFFFFF",
      marginVertical: 10,
    },
    bottomContainer: {
      paddingBottom: 10,
    },
    section: {
      marginBottom: 20,
    },
    header: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 6,
      color: "#FFFFFF",
    },
    riddleHeader: {
      fontSize: 22,
      color: "#ffc107", // Adjust color for riddle header
    },
    riddleText: {
      fontSize: 20, // Increase font size for riddle text
      color: "#FFFFFF",
      marginBottom: 10, // Add more margin for better separation
    },
    details: {
      fontSize: 16,
      color: "#FFFFFF",
    },
    spoilerText: {
      fontSize: 20,
      color: "#ffc107",
      textDecorationLine: "underline",
    },
    revealedText: {
      textDecorationLine: "none",
      color: "#FFFFFF",
    },
    button: {
      padding: 10,
      backgroundColor: "#ffc107",
      borderRadius: 10,
      marginBottom: 20,
    },
    buttonText: {
      color: "black",
      fontWeight: "bold",
      fontSize: 18,
      textAlign: "center",
    },
  });