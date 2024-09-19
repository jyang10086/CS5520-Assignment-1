import React from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function Confirm({ visible, confirmMsg, setVisible }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setVisible(!visible);
      }}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{confirmMsg}</Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setVisible(!visible)}
            >
              <Text style={styles.textStyle}>Go back</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setVisible(!visible)}
            >
              <Text style={styles.textStyle}>Continue</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 50,
  },
  buttonContainer: {
    alignContent:'center',
    flexDirection: "row",
    columnGap: 10,
  },
  modalText: {
    fontSize: 15,
    color: "indigo",
  },
  modalView: {
    width: 300,
    height: 200,
    padding: 20,
    backgroundColor: "darkgray",
  },
});
