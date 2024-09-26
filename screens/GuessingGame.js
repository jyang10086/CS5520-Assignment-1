import React, { useState, useEffect } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";
import UserInput from "../components/UserInput";
import * as color from "../Color";

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
  const [endReason, setEndReason] = useState(null);
  const [hint, setHint] = useState("");
  const [showHint, setShowHint] = useState(false);

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
    const number = multiples[randomIndex];
    const hint =
      number >= 50
        ? "The number is between 50 and 100."
        : "The number is less than 50.";
    setCorrectNumber(number);
    setTimeLeft(60);
    setAttemptsUsed(0);
    setGameStarted(true);
    setHint(hint);
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
    console.log("correct number:", correctNumber);
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

  const handleUseHint = () => {
    setShowHint(true);
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
    setEndReason(null);
    setFeedback("");
    setShowHint(false);
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
        <View style={styles.guessView}>
          <Text style={styles.text}>
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
          <View style={styles.guessView}>
            <Text style={styles.text}>
              Guess a number between 1 & 100 that is a multiple of {multiply}
            </Text>
            <UserInput
              value={inputValue}
              onchange={handleInputValue}
            ></UserInput>

            {showHint && <Text style={styles.hintText}>{hint}</Text>}
            <Text>Time left: {timeLeft}s</Text>
            <Text>Attempts left: {4 - attemptsUsed}</Text>

            <Button
              title="Use a hint"
              onPress={handleUseHint}
              disabled={showHint}
              color="blue"
            />
            <Button title="Submit guess" onPress={handleGuess} color="blue" />
          </View>
        )}

        {submittedGuess && gameWin && (
          <View style={styles.guessView}>
            <Text style={styles.text}>
              You guessed correctly!{"\n"} Attempts used: {attemptsUsed}{" "}
            </Text>
            <Image
              source={{
                uri: `https://picsum.photos/id/${correctNumber}/100/100`,
              }}
              style={styles.image}
            />
            <Button title="New Game" onPress={handleRestGame} color="blue" />
          </View>
        )}

        {submittedGuess && !gameWin && !gameOver && (
          <View style={styles.guessView}>
            <Text style={styles.text}>
              You did not guess correct! You should {feedback}.
            </Text>
            <Button title="Try Again" onPress={handleTryAgain} color="blue" />
            <Button title="End the Game" onPress={handleEndGame} color="blue" />
          </View>
        )}

        {submittedGuess && !gameWin && gameOver && (
          <View style={styles.guessView}>
            <Text style={styles.text}>The game is over!</Text>
            <Image
              source={require("../assets/sad-smiley.png")}
              style={styles.image}
            />
            {endReason && <Text style={styles.text}>You are {endReason}.</Text>}
            <Button title="New Game" onPress={handleRestGame} color="blue" />
          </View>
        )}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  guessView: {
    alignItems: "center",
    rowGap: 10,
  },
  text: {
    fontSize: 20,
    color: color.mainTextColor,
  },
  hintText: {
    fontSize: 18,
    color: color.hintText,
  },
  image: {
    width: 150,
    height: 150,
  },
});
