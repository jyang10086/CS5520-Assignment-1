import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import * as color from "../Color";

export default function UserInput({ value, onchange }) {
  const handleTextChange = (input) => {
    onchange(input);
  };

  return (
    <View style={styles.input}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={handleTextChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: color.mainTextColor,
    borderBottomWidth: 1,
    color: color.mainTextColor,
    fontWeight: "bold",
  },
});
