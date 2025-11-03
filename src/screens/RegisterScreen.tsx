import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Toast from "react-native-toast-message";
import { useRegister } from "../api/useAuth";

const { width } = Dimensions.get("window");

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerMutation = useRegister();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Toast.show({ type: "error", text1: "Registration Failed", text2: "All fields are required" });
      return;
    }

    try {
      await registerMutation.mutateAsync({ name, email, password });
      Toast.show({ type: "success", text1: "Registration Success" });
      navigation.replace("Login");
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: err.response?.data?.message || err.message,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  content: { width: width - 48 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 32, color: "#FF5864" },
  input: { height: 50, borderColor: "#ddd", borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, marginBottom: 16 },
  button: { height: 50, backgroundColor: "#FF5864", borderRadius: 12, justifyContent: "center", alignItems: "center", marginBottom: 16 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  linkText: { color: "#FF5864", textAlign: "center" },
});
