import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./src/api/queryClient";
import SplashScreen from "./src/screens/SplashScreen";
import HomeTabs from "./src/navigation/HomeTabs";
import Toast from "react-native-toast-message";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";

const Stack = createNativeStackNavigator();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Home" component={HomeTabs} />
      </Stack.Navigator>

      {/* ✅ Toast global yang selalu di atas */}
      <View style={styles.toastContainer}>
        <Toast topOffset={100} />
      </View>
    </NavigationContainer>
  </QueryClientProvider>
);

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    elevation: 9999, // untuk Android
  },
});

export default App;
