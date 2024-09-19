import { StyleSheet, Text, View } from "react-native";
import CheckBox from "expo-checkbox";
import React from "react";

export default function CheckRobot({ value, onCheckedChange }) {
  const changeValueHandler = (isChecked) => {
    onCheckedChange(isChecked);
  }

  return (
    <View style={styles.container}>
      <CheckBox value={value} onValueChange={changeValueHandler} />
      <Text style={styles.text}>I am not a robot</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 10,
  },
  text: {
    fontSize: 15,
    color: 'indigo',
  },
});
