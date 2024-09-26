import { useState } from "react";
import { Alert, Button, StyleSheet, Text, View, SafeAreaView } from "react-native";
import CheckRobot from "./../components/CheckRobot";
import StartHeader from "../components/StartHeader";
import Confirm from "./Confirm";
import Card from "../components/Card";
import UserInput from "../components/UserInput";
import InvalidTextError from "../components/InvalidTextError";
import * as color from "../Color";
export default function Start({ navigateToGame, userData, setUserData }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" });
  const [isChecked, setChecked] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleNameChange = (value) => {
    setName(value);
    setErrors((prev) => ({ ...prev, name: validateName(value) }));
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    setErrors((prev) => ({ ...prev, phone: validatePhone(value) }));
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setChecked(false);
    setErrors({ name: "", email: "", phone: "" });
  };

  const handleRegister = () => {
    if (errors.name || errors.email || errors.phone) {
      Alert.alert("Invalid Input", "Please check input values.");
      return;
    }
    setUserData({
      name,
      email,
      phone,
    });
    setModalVisible(true);
  };

  const validateName = (name) => {
    if (!name || name.length <= 1 || /\d/.test(name)) {
      return "Please enter a valid name.";
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Please enter a valid email.";
  };

  const validatePhone = (phone) => {
    if (
      phone.length !== 10 ||
      isNaN(phone) ||
      phone.endsWith("0") ||
      phone.endsWith("1")
    ) {
      return "Please enter a valid phone number.";
    }
    return "";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <StartHeader />
      </View>
      <View style={styles.bottonView}>
        <Card>
          <Text style={styles.text}>Name</Text>
          <UserInput value={name} onchange={handleNameChange}></UserInput>
          {errors.name ? <InvalidTextError errorInfo={errors.name} /> : null}

          <Text style={styles.text}>Email</Text>
          <UserInput value={email} onchange={handleEmailChange}></UserInput>
          {errors.email ? <InvalidTextError errorInfo={errors.email} /> : null}

          <Text style={styles.text}>Phone</Text>
          <UserInput value={phone} onchange={handlePhoneChange}></UserInput>
          {errors.phone ? <InvalidTextError errorInfo={errors.phone} /> : null}

          <CheckRobot value={isChecked} onCheckedChange={setChecked} />
          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Button title="Reset" onPress={handleReset} color="red" />
            <Button
              color="blue"
              title="Register"
              onPress={handleRegister}
              disabled={!isChecked}
            />
          </View>
          <Confirm
            visible={isModalVisible}
            setVisible={setModalVisible}
            navigateToGame={navigateToGame}
            userData={userData}
          ></Confirm>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: "90%",
    maxWidth: "90%",
  },
  topView: {
    marginTop: 30,
    flex: 1,
    alignItems: "center",
  },
  bottonView: {
    flex: 9,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 20,
    color: color.mainTextColor,
  },
});
