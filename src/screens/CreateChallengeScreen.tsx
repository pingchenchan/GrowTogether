import React, { useState } from "react";
import { View, TextInput, Button, Picker, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

const CreateChallengeScreen = (
  props: NativeStackScreenProps<RootStackParamList, "CreateChallenge">
) => {
  const { navigation } = props;
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");

  const handleSubmit = async () => {
    if (!title) return Alert.alert("請填寫標題");
    await fetch("/api/challenges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, frequency, createdAt: new Date() }),
    });
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <TextInput
        placeholder="挑戰標題"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, padding: 8, borderRadius: 6 }}
      />
      {/* @ts-ignore - RN picker community type */}
      <Picker
        selectedValue={frequency}
        onValueChange={(itemValue) => setFrequency(itemValue)}
      >
        <Picker.Item label="每日" value="daily" />
        <Picker.Item label="每週" value="weekly" />
      </Picker>
      <Button title="建立" onPress={handleSubmit} />
    </View>
  );
};

export default CreateChallengeScreen;