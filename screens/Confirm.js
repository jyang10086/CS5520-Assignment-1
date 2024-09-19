import React from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";

export default function Confirm({
  visible,
  confirmMsg,
  setVisible,
  navigateToGame,
}) {
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
        <Card style={styles.modalView}>
          <Text style={styles.modalText}>{confirmMsg}</Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setVisible(!visible)}
              color="red"
            >
              <Text style={styles.textStyle}>Go back</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={navigateToGame}
              color="blue"
            >
              <Text style={styles.textStyle}>Continue</Text>
            </Pressable>
          </View>
        </Card>
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
    alignContent: "center",
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
