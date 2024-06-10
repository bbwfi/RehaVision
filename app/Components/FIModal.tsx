import React from "react"
import { Modal, View, StyleSheet, Pressable, Text} from "react-native"

export function FIModal ({visible, setVisible, children}) {
    return (
        <View>
            <Modal visible={visible} transparent={true}>
                <View style={styles.content}>
                    {children}   
                    <Pressable
                        style={styles.button}
                        onPress={() => setVisible(!visible)}>
                        <Text style={styles.buttonText}>zurück</Text>
                    </Pressable>
                </View>
            </Modal>    
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
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
    }   
})

export default FIModal;