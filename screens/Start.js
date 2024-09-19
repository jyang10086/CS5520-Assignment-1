import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from "react-native";
import CheckRobot from "./../components/CheckRobot";
import StartHeader from "../components/StartHeader";
import Confirm from "./Confirm";
import Card from "../components/Card";
export default function Start() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" });
  const [isChecked, setChecked] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("");
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
    const msg = `Hello ${name}\nHere is the information you entered:\n${email}\n${phone}\nIf it is not correct, please go back and edit them`;
    setConfirmMsg(msg);
    setModalVisible(true);
  };

  // Validation functions
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
          {/* Name Input */}
          <Text style={styles.text}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={handleNameChange}
          />
          {errors.name ? (
            <Text style={styles.errorText}>{errors.name}</Text>
          ) : null}

          {/* Email Input */}
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
          />
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}

          {/* Phone Input */}
          <Text style={styles.text}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={handlePhoneChange}
            keyboardType="number-pad"
            maxLength={10}
          />
          {errors.phone ? (
            <Text style={styles.errorText}>{errors.phone}</Text>
          ) : null}

          <CheckRobot value={isChecked} onCheckedChange={setChecked} />
          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Button title="Reset" onPress={handleReset} />
            <Button
              title="Register"
              onPress={handleRegister}
              disabled={!isChecked}
            />
          </View>
          <Confirm
            visible={isModalVisible}
            confirmMsg={confirmMsg}
            setVisible={setModalVisible}
          ></Confirm>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topView: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
  },
  bottonView: {
    flex: 9,
    // alignItems: "center",
  },
  card: {
    borderRadius: 10,
    backgroundColor: "darkgray",
    padding: 20,
    justifyContent: "space-around",
    rowGap: 20,
  },
  input: {
    borderBottomColor: "indigo",
    borderBottomWidth: 2,
    color: "indigo",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 20,
    color: "indigo",
    marginBottom: 10,
  },
  errorText: {
    color: "grey",
    fontSize: 15,
  },
});
