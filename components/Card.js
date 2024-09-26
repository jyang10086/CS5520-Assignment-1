import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import * as color from "../Color";
export default function Card({ cardStyles, children }) {
  const systemStyle =
    Platform.OS === "ios" ? styles.cardIOS : styles.cardAndroid;

  return <View style={[styles.card,systemStyle, cardStyles]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: color.cardBgColor,
    padding: 20,
    justifyContent: "space-around",
    rowGap: 20,
  },
  cardAndroid: {
    elevation: 5,
  },
  cardIOS: {
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});
