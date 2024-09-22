import React from "react";
import { Alert, Modal, Button, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";
import * as color from "../Color";

export default function Confirm({
  visible,
  setVisible,
  navigateToGame,
  userData,
}) {
  const { name, email, phone } = userData;
  const msg = `Hello ${name}\nHere is the information you entered:\n${email}\n${phone}\nIf it is not correct, please go back and edit them.`;
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.container}>
        <Card style={styles.modalView}>
          <Text style={styles.modalText}>{msg}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Go back"
              onPress={() => setVisible(!visible)}
              color="red"
            />
            <Button title="Continue" onPress={navigateToGame} color="blue" />
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
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  modalText: {
    fontSize: 20,
    color: color.mainTextColor,
  },
  modalView: {
    width: 300,
    height: 200,
    padding: 20,
    backgroundColor: color.cardBgColor,
  },
});
