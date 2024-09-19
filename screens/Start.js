import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import StartHeader from "../components/StartHeader";

export default function Start() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" });

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
    setIsCheckboxSelected(false);
    setErrors({ name: "", email: "", phone: "" });
  };

  return (
    <View style={styles.container}>
      <StartHeader />
      <View style={styles.card}>
        {/* Name Input */}
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={handleNameChange}
          placeholder="Enter your name"
        />
        {errors.name ? (
          <Text style={styles.errorText}>{errors.name}</Text>
        ) : null}

        {/* Email Input */}
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}

        {/* Phone Input */}
        <Text>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={handlePhoneChange}
          placeholder="Enter your phone number"
          keyboardType="number-pad"
          maxLength={10}
        />
        {errors.phone ? (
          <Text style={styles.errorText}>{errors.phone}</Text>
        ) : null}

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button title="Reset" onPress={handleReset} />
          <Button title="Register" onPress={() => {}} />
        </View>
      </View>
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
