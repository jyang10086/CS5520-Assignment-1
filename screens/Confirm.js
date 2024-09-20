import React from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";

export default function Confirm({
  visible,
  setVisible,
  navigateToGame,
  userData,
}) {
  const { name, email, phone } = userData;
  const msg = `Hello ${name}\nHere is the information you entered:\n${email}\n${phone}\nIf it is not correct, please go back and edit them`;
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.container}>
        <Card style={styles.modalView}>
          <Text style={styles.modalText}>{msg}</Text>
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
