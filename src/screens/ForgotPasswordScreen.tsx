import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Toast from "react-native-toast-message";
import { useForgotPassword } from "../api/useAuth";

const { width } = Dimensions.get("window");

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const forgotMutation = useForgotPassword();

  const handleSendReset = async () => {
    if (!email) {
      Toast.show({ type: "error", text1: "Error", text2: "Email is required" });
      return;
    }

    try {
      await forgotMutation.mutateAsync({ email });
      Toast.show({ type: "success", text1: "Reset Link Sent" });
      navigation.goBack();
    } catch (err: any) {
      Toast.show({ type: "error", text1: "Failed", text2: err.response?.data?.message || err.message });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password</Text>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />

        <TouchableOpacity style={styles.button} onPress={handleSendReset}>
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.linkText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  content: { width: width - 48 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 32, color: "#FF5864" },
  input: { height: 50, borderColor: "#ddd", borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, marginBottom: 16 },
  button: { height: 50, backgroundColor: "#FF5864", borderRadius: 12, justifyContent: "center", alignItems: "center", marginBottom: 16 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  linkText: { color: "#FF5864", textAlign: "center" },
});
