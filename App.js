import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Start from "./screens/Start";
import GuessingGame from "./screens/GuessingGame";

export default function App() {
  const [isGameReady, setIsGameReady] = useState(false);

  const navigateToGame = () => {
    setIsGameReady(true);
  };
  return (
    <View style={styles.container}>
      {isGameReady ? (
        <GuessingGame></GuessingGame>
      ) : (
        <Start navigateToGame={navigateToGame} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
