import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Card from "../components/Card";
export default function GuessingGame({ userData }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [multiples, setMultiples] = useState([]);
  const [guess, setGuess] = useState("");
  const [correctNumber, setCorrectNumber] = useState(
    Math.floor(Math.random() * 10) + 1020
  );

  const startGame = () => {
    const randomIndex = Math.floor(Math.random() * multiples.length);
    setCorrectNumber(multiples[randomIndex]);
    setGameStarted(true);
  };

  useEffect(() => {
    if (userData.phone) {
      const lastDigit = userData.phone[userData.phone.length - 1];
      const arr = Array.from(
        { length: 100 / lastDigit },
        (_, i) => lastDigit * (i + 1)
      );
      setMultiples(arr);
    }
  }, [userData]);

  return (
    <View style={styles.container}>
      <Card>
        {!gameStarted && (
          <View>
            <Text>Guess a number between 1 & 100 that is a multiple of 9</Text>
            <Button title="Start" onPress={startGame} color="blue" />
          </View>
        )}

        {gameStarted && !gameOver && (
          <View>
            <Text>Guess a number between 1 & 100 that is a multiple of 9</Text>
            <TextInput
              style={styles.input}
              value={guess}
              onChangeText={setGuess}
              placeholder="Enter your guess"
              keyboardType="numeric"
            />

            <View style={styles.buttonContainer}>
              <Button title="Use a hint" onPress={() => {}} />
              <Button title="Submit guess" onPress={() => {}} />
            </View>
          </View>
        )}
{/* 
        {gameOver && (
          <View>
            <Text>The game is over</Text>
            <Image
              source={require("../assets/sad-smiley.png")}
              style={styles.image}
            />
            <Text>
              {attemptsLeft === 0
                ? "You ran out of attempts."
                : "Time ran out."}
            </Text>
            <Button title="New Game" onPress={restartGame} />
          </View>
        )} */}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});
