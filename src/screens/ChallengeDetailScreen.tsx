import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { Checkin, Challenge } from "../types";

const ChallengeDetailScreen = (
  props: NativeStackScreenProps<RootStackParamList, "ChallengeDetail">
) => {
  const { route, navigation } = props;
  const { id } = route.params;
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [checkins, setCheckins] = useState<Checkin[]>([]);

  const fetchData = async () => {
    const res = await fetch(`/api/challenges/${id}`);
    const json = await res.json();
    setChallenge(json.challenge);

    const res2 = await fetch(`/api/checkins?challengeId=${id}`);
    const json2 = await res2.json();
    setCheckins(json2.checkins);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!challenge) return null;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>{challenge.title}</Text>
      <Button
        title="打卡"
        onPress={() => navigation.navigate("Checkin", { id })}
      />
      <FlatList
        style={{ marginTop: 16 }}
        data={checkins}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{new Date(item.createdAt).toLocaleString()}</Text>
        )}
      />
    </View>
  );
};

export default ChallengeDetailScreen;