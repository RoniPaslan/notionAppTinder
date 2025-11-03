import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "../atoms/Text";
import { images } from "../../assets/images";

interface OpponentCardProps {
  name: string;
  age?: number;
  location?: string;
  picture?: string;
}

export const OpponentCard = ({ name, age, location, picture }: OpponentCardProps) => (
  <View style={styles.card}>
    <Image
      source={picture ? { uri: picture } : images.defaultPeople}
      style={styles.image}
    />
    <View style={styles.info}>
      <Text style={styles.name}>{name}, {age ?? "??"}</Text>
      <Text style={styles.location}>{location ?? "Unknown"}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: "70%",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  info: {
    position: "absolute",
    bottom: 20,
    left: 15,
  },
  name: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  location: {
    color: "#fff",
    fontSize: 16,
  },
});
