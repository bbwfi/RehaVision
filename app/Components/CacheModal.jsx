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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userData = await loadUserData();
      setUserData(userData);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const selectedCacheUserData = userData?.foundCaches.find(cache => cache.id === selectedCache?.id);


  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      animationIn={"slideInUp"} // Changed animationIn to slideInUp
      animationOut={"slideOutDown"} // Changed animationOut to slideOutDown
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropOpacity={0.5} // Reduced backdrop opacity
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{selectedCache?.title}</Text>
          <Text style={styles.description}>{selectedCache?.description}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.bottomContainer}>
          <View style={styles.section}>
            <Text style={styles.header}>Riddle</Text>
            <Text style={styles.riddleText}>{selectedCache?.riddleText}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.header}>Found On</Text>
            <Text style={styles.details}>
              {new Date(selectedCacheUserData?.timestamp).toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
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
    color: "#ffc107",
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffc107",
  },
  description: {
    fontSize: 16,
    color: "#f2f2f2",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ffc107",
    marginVertical: 20,
  },
  bottomContainer: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#ffc107",
  },
  riddleText: {
    fontSize: 16,
    color: "#f2f2f2",
  },
  details: {
    fontSize: 16,
    color: "#f2f2f2",
  },
});
