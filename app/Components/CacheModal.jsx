import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { loadUserData } from "../Functions/userDataManager";

export default function CacheModal({
  isVisible,
  onBackdropPress,
  selectedCache,
  onClose,
}) {
  const [userData, setUserData] = useState(null);
  const [selectedCacheUserData, setSelectedCacheUserData] = useState(null);
  const [showTip, setShowTip] = useState(false); // New state for showing tip

  useEffect(() => {
    if (isVisible) {
      fetchData();
    } else {
      setShowTip(false); // Reset showTip when modal is closed
    }
  }, [isVisible]);

  useEffect(() => {
    if (userData && userData.foundCaches && selectedCache) {
      const foundCache = userData.foundCaches.find(cache => cache.id === selectedCache.id);
      setSelectedCacheUserData(foundCache);
    }
  }, [userData, selectedCache]);

  const fetchData = async () => {
    try {
      const userData = await loadUserData();
      setUserData(userData);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const toggleTip = () => {
    setShowTip(!showTip);
  };

  return (
    <>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onBackdropPress}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        animationInTiming={500}
        animationOutTiming={500}
        backdropOpacity={0.5}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{selectedCache?.title}</Text>
            <Text style={styles.description}>{selectedCache?.description}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.bottomContainer}>
            <View style={styles.section}>
              <Text style={[styles.header, styles.riddleHeader]}>Rätsel</Text>
              <Text style={styles.riddleText}>{selectedCache?.riddleText}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>Gefunden</Text>
              <Text style={styles.details}>
                {selectedCacheUserData ? new Date(selectedCacheUserData?.timestamp).toLocaleString() : "Noch nicht gefunden"}
              </Text>
            </View>
            <View style={styles.section}>
              <TouchableOpacity onPress={toggleTip} style={styles.button}>
                <Text style={[styles.buttonText]}>
                  {showTip ? selectedCache?.tip : "Tip anzeigen"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
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
  button: { padding: 10, backgroundColor: "#ffc107", borderRadius: 10, marginBottom: 20 },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  }
});
