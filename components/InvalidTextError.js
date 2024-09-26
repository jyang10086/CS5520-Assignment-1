import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as color from "../Color";

export default function InvalidTextError({ errorInfo }) {
  return (
    <View>
      <Text style={styles.text}>{errorInfo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: color.invaidText,
  },
});
