import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { OpponentCard } from "../molecules/OpponentCard";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { usePeople, useLikePerson, useDislikePerson } from "../../api/usePeople";

export const OpponentStack = () => {
  const { data: people = [], isLoading } = usePeople();
  const likePerson = useLikePerson();
  const dislikePerson = useDislikePerson();

  const [current, setCurrent] = useState(0);
  const userId = 1;

  if (isLoading) return null;

  const person = people[current];
  if (!person) return null;

  const next = () => setCurrent((p) => (p + 1 < people.length ? p + 1 : 0));

  return (
    <View style={styles.container}>
      <OpponentCard {...person} />
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.no]}
          onPress={() => {
            dislikePerson.mutate({ personId: person.id, userId });
            next();
          }}>
          <Icon name="close" size={32} color="#FF5864" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.heart]}
          onPress={() => {
            likePerson.mutate({ personId: person.id, userId });
            next();
          }}>
          <FontAwesome name="heart" size={28} color="#4DED30" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "80%",
    position: "absolute",
    bottom: 40,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 20,
    elevation: 5,
  },
  no: { borderColor: "#FF5864", borderWidth: 2 },
  heart: { borderColor: "#4DED30", borderWidth: 2 },
});
