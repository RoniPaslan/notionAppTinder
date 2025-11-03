import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LikedListScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Liked People List</Text>
    </View>
  );
};

export default LikedListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
