import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Challenge } from "../types";

interface Props {
  item: Challenge;
  onPress: () => void;
}

export default function ChallengeCard({ item, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>
        頻率: {item.frequency === "daily" ? "每日" : "每週"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: "600" },
  subtitle: { marginTop: 4, color: "#555" },
});