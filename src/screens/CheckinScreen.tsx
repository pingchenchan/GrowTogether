import React, { useState } from "react";
import { View, Button, Image, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

const CheckinScreen = (
  props: NativeStackScreenProps<RootStackParamList, "Checkin">
) => {
  const { route, navigation } = props;
  const { id } = route.params;
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [note, setNote] = useState("");

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ base64: false });
    if (!res.canceled) {
      setImageUri(res.assets[0].uri);
    }
  };

  const submit = async () => {
    await fetch("/api/checkins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        challengeId: id,
        imageUri,
        note,
        createdAt: new Date(),
      }),
    });
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: "100%", height: 200, borderRadius: 8 }}
        />
      )}
      <Button title="選擇照片" onPress={pickImage} />
      <TextInput
        placeholder="心得備註 (選填)"
        value={note}
        onChangeText={setNote}
        style={{ borderWidth: 1, padding: 8, borderRadius: 6 }}
      />
      <Button title="送出" onPress={submit} />
    </View>
  );
};

export default CheckinScreen;