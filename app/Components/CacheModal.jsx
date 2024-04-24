// CacheModal.js
import React from 'react';
import { Text, View } from 'react-native';
import Modal from "react-native-modal";

export default function CacheModal({ isVisible, onBackdropPress, selectedCache }) {
  
  return (
  <Modal
    isVisible={isVisible} // Determines if the modal is visible or not
    onBackdropPress={onBackdropPress} // Function to be called when the backdrop is pressed
    animationOut={"slideOutDown"} // Animation type for modal closing
    animationOutTiming={500} // Animation duration for modal closing
    style={{ justifyContent: 'flex-end', margin: 0 }} // Style for the modal container
  >
    <View
    style={{
      backgroundColor: 'white',
      padding: 22,
      minHeight: "50%",
      justifyContent: 'center',
      alignItems: 'center',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    }}
    >
    {/* Displaying the title of the selected cache*/}
    <Text>{selectedCache?.title}</Text> 
    {/* Other cache details */}
    </View>
  </Modal>
  );
}
