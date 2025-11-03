import React from "react";
import { Image, StyleSheet } from "react-native";
import { images } from "../../assets/images";

interface AvatarProps {
  uri?: string;
  size?: number;
}

export const Avatar = ({ uri, size = 60 }: AvatarProps) => (
  <Image
    source={uri ? { uri } : images.defaultPeople}
    style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
  />
);

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,
    borderColor: "#fff",
  },
});
