import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Card from "../components/Card";
export default function GuessingGame({ userData }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [submittedGuess, setSubmittedGuess] = useState(false);

  const [multiply, setMultiply] = useState(null);
  const [multiples, setMultiples] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [correctNumber, setCorrectNumber] = useState(
    Math.floor(Math.random() * 10) + 1020
  );
  const [timeLeft, setTimeLeft] = useState(60);
  const [attemptsUsed, setAttemptsUsed] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [endReason, setEndReason] = useState("");

  const gameInit = () => {
    const lastDigit = userData.phone[userData.phone.length - 1];
    const arr = Array.from(
      { length: 100 / lastDigit },
      (_, i) => lastDigit * (i + 1)
    );
    setMultiply(lastDigit);
    setMultiples(arr);
  };

  const startGame = () => {
    const randomIndex = Math.floor(Math.random() * multiples.length);
    setCorrectNumber(multiples[randomIndex]);
    setTimeLeft(60);
    setAttemptsUsed(0);
    setGameStarted(true);
  };

  const endGame = (endReason = "") => {
    setSubmittedGuess(true);
    setGameOver(true);
    setEndReason(endReason);
  };

  const handleInputValue = (value) => {
    setInputValue(value);
  };

  const handleGuess = () => {
    const value = parseInt(inputValue);
    if (isNaN(value) || value < 1 || value > 100) {
      Alert.alert("Invalid Input", "Please enter a number between 1 and 100");
      return;
    }
    console.log("win", correctNumber);
    if (value === correctNumber) {
      setGameWin(true);
    } else {
      setAttemptsUsed(attemptsUsed + 1);
      if (attemptsUsed + 1 === 4) {
        endGame("out of attempts");
      } else {
        setFeedback(
          inputValue < correctNumber ? "guess higher" : "guess lower"
        );
      }
    }
    setSubmittedGuess(true);
  };

  const handleTryAgain = () => {
    setSubmittedGuess(false);
    setInputValue("");
  };

  const handleEndGame = () => {
    setGameOver(true);
  };

  const handleRestGame = () => {
    setInputValue("");
    setEndReason("");
    setFeedback("");
    setSubmittedGuess(false);
    setGameWin(false);
    setGameOver(false);
    startGame();
  };

  useEffect(() => {
    gameInit();
  }, []);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endGame("out of time");
    }
  }, [timeLeft, gameStarted]);
  if (!gameStarted) {
    return (
      <Card>
        <View>
          <Text>
            Guess a number between 1 & 100 that is a multiple of {multiply}
          </Text>
          <Button title="Start" onPress={startGame} color="blue" />
        </View>
      </Card>
    );
  }

  return (
    <View style={styles.container}>
      <Card>
        {!submittedGuess && (
          <View>
            <Text>
              Guess a number between 1 & 100 that is a multiple of {multiply}
            </Text>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={handleInputValue}
              keyboardType="numeric"
            />
            <Text>Time left: {timeLeft}s</Text>
            <Text>Attempts left: {4 - attemptsUsed}</Text>

            <View style={styles.buttonContainer}>
              <Button
                title="Use a hint"
                onPress={() => {}}
                disabled={!inputValue}
              />
              <Button title="Submit guess" onPress={handleGuess} />
            </View>
          </View>
        )}

        {submittedGuess && gameWin && (
          <View>
            <Text>
              Congratulations! You guessed the number in {attemptsUsed}{" "}
              attempts!
            </Text>
            <Image
              source={{
                uri: `https://picsum.photos/id/${correctNumber}/100/100`,
              }}
              style={{ width: 100, height: 100 }}
            />
            <Button title="New Game" onPress={handleRestGame} color="blue" />
          </View>
        )}

        {submittedGuess && !gameWin && !gameOver && (
          <View>
            <Text>You did not guess correct! You should {feedback}.</Text>
            <Button title="Try Again" onPress={handleTryAgain} color="blue" />
            <Button title="End the Game" onPress={handleEndGame} color="blue" />
          </View>
        )}

        {submittedGuess && !gameWin && gameOver && (
          <View>
            <Text>The game is over!</Text>
            <Image
              source={require("../assets/sad-smiley.png")}
              style={{ width: 150, height: 150 }}
            />
            <Text>{endReason}</Text>
            <Button title="New Game" onPress={handleRestGame} color="blue" />
          </View>
        )}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});
