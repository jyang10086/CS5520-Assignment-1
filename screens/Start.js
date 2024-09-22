import { useState } from "react";
import { Button, StyleSheet, Text, View, SafeAreaView } from "react-native";
import CheckRobot from "./../components/CheckRobot";
import StartHeader from "../components/StartHeader";
import Confirm from "./Confirm";
import Card from "../components/Card";
import UserInput from "../components/UserInput";
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
    setUserData({
      name,
      email,
      phone,
    });
    setModalVisible(true);
  };

  const validateName = (name) => {
    if (!name || /\d/.test(name)) {
      return "Name must be more than 1 character and non-numeric.";
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email format.";
  };

  const validatePhone = (phone) => {
    if (
      phone.length !== 10 ||
      isNaN(phone) ||
      phone.endsWith("0") ||
      phone.endsWith("1")
    ) {
      return "Phone must be 10 digits and not end with 0 or 1.";
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
          {errors.name ? (
            <Text style={styles.errorText}>{errors.name}</Text>
          ) : null}

          <Text style={styles.text}>Email</Text>
          <UserInput value={email} onchange={handleEmailChange}></UserInput>
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}

          <Text style={styles.text}>Phone</Text>
          <UserInput value={phone} onchange={handlePhoneChange}></UserInput>
          {errors.phone ? (
            <Text style={styles.errorText}>{errors.phone}</Text>
          ) : null}

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
    marginTop: 10,
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
    color: "indigo",
  },
  errorText: {
    color: "grey",
    fontSize: 15,
  },
});
