import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { images } from "../assets/images";

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace("Login"), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Base putih */}
      <View style={styles.whiteBackground} />

      {/* Layer gradasi tipis untuk smooth */}
      <View style={[styles.gradientLayer, { backgroundColor: "rgba(255, 125, 136, 0.08)" }]} />
      <View style={[styles.gradientLayer, { backgroundColor: "rgba(255, 125, 136, 0.06)" }]} />
      <View style={[styles.gradientLayer, { backgroundColor: "rgba(255, 125, 136, 0.04)" }]} />
      <View style={[styles.gradientLayer, { backgroundColor: "rgba(255, 125, 136, 0.02)" }]} />
      <View style={[styles.gradientLayer, { backgroundColor: "rgba(255, 125, 136, 0.01)" }]} />

      {/* Logo */}
      <Image source={images.logo} style={styles.logo} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  whiteBackground: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "#ffffff",
  },

  gradientLayer: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
  },

  logo: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    zIndex: 1,
  },
});
