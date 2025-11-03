// src/screens/LoginScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Toast from "react-native-toast-message";
import { useLogin } from "../api/useAuth";

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginMutation = useLogin();

    // handleLogin
    const handleLogin = async () => {
        if (!email || !password) {
            Toast.show({ type: "error", text1: "Login Failed", text2: "Email and password are required" });
            return;
        }

        try {
            const data = await loginMutation.mutateAsync({ email, password });
            Toast.show({ type: "success", text1: "Login Success" });
            // Bisa simpan token jika nanti pakai
            navigation.replace("Home");
        } catch (err: any) {
            Toast.show({
            type: "error",
            text1: "Login Failed",
            text2: err.response?.data?.message || err.message,
            });
        }
    };


  return (
    <View style={styles.container}>
      {/* Background Gradasi Lembut */}
      <View style={styles.gradientBackground} />

      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back!</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.socialContainer}>
          <Text style={styles.socialText}>Or login with</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Text>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.registerContainer}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradientBackground: { ...StyleSheet.absoluteFillObject, backgroundColor: "#fff" },
  content: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 24 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 32, color: "#FF5864" },
  input: {
    width: width - 48,
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  forgot: { alignSelf: "flex-end", marginBottom: 24, color: "#FF5864", fontWeight: "500" },
  loginButton: { width: width - 48, height: 50, backgroundColor: "#FF5864", borderRadius: 12, justifyContent: "center", alignItems: "center", marginBottom: 24 },
  loginText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  socialContainer: { alignItems: "center", marginBottom: 24 },
  socialText: { marginBottom: 12, color: "#888" },
  socialButtons: { flexDirection: "row", gap: 16 },
  socialButton: { width: 120, height: 44, backgroundColor: "#eee", borderRadius: 12, justifyContent: "center", alignItems: "center" },
  registerContainer: { flexDirection: "row" },
  registerText: { color: "#FF5864", fontWeight: "bold" },
});
