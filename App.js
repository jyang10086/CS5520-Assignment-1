import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Start from "./screens/Start";
import GuessingGame from "./screens/GuessingGame";

export default function App() {
  const [isGameReady, setIsGameReady] = useState(false);
  const [userData, setUserData] = useState({
    name: null,
    email: null,
    phone: null,
  });
  const navigateToGame = () => {
    setIsGameReady(true);
  };

  const backToStart = () => {
    setIsGameReady(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["blue", "red"]} style={styles.background} />
      {isGameReady ? (
        <View>
          <View style={styles.restartView}>
            <Button title="Restart" onPress={backToStart} />
          </View>
          <GuessingGame userData={userData}></GuessingGame>
        </View>
      ) : (
        <Start
          userData={userData}
          setUserData={setUserData}
          navigateToGame={navigateToGame}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  restartView: {
    alignSelf:'flex-end'
  }
});
