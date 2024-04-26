// CacheModal.js
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";

export default function CacheModal({
  isVisible,
  onBackdropPress,
  selectedCache,
}) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      animationOut={"slideOutDown"}
      animationOutTiming={500}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={{ fontSize: 40, fontWeight: "600" }}>
            {selectedCache?.title}
          </Text>
          <Text
            style={{ fontSize: 20, fontStyle: "italic", alignSelf: "center" }}
          >
            {selectedCache?.description}
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.bottomContainer}>
          {/* Other cache details */}
          <>
            <Text style={{ color: "white", fontSize: 20 }}>Header</Text>
            <Text style={{ color: "white" }}>Details</Text>
          </>
          <>
            <Text style={{ color: "white", fontSize: 20 }}>Header</Text>
            <Text style={{ color: "white" }}>Details</Text>
          </>
          <>
            <Text style={{ color: "white", fontSize: 20 }}>Header</Text>
            <Text style={{ color: "white" }}>Details</Text>
          </>
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
    padding: 0,
    minHeight: "50%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  titleContainer: {
    backgroundColor: "#ffc107",
    padding: 22,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#000",
  },
  bottomContainer: {
    backgroundColor: "#313335",
    padding: 22,
    flexGrow: 1,
  },
});
