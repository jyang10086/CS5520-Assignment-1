import { StyleSheet, Text, View } from "react-native";
import React from "react";
export default function StartHeader() {
  return (
    <View>
      <Text style={styles.header}>Welcome</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: 'darkblue',
    fontSize: 25,
    fontWeight: 'bold'
  },
});
