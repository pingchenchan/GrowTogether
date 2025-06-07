import  { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type CheckinScreenRouteProp = RouteProp<RootStackParamList, 'Checkin'>;
type CheckinScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Checkin'>;

export default function Checkin() {
  const [note, setNote] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const route = useRoute<CheckinScreenRouteProp>();
  const navigation = useNavigation<CheckinScreenNavigationProp>();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/checkins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          challengeId: route.params.challengeId,
          note,
          imageUrl: image,
        }),
      });

      if (response.ok) {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error creating checkin:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="備註"
        value={note}
        onChangeText={setNote}
        multiline
        numberOfLines={4}
        style={styles.input}
      />

      <Button
        mode="outlined"
        onPress={pickImage}
        style={styles.imageButton}
        icon="image"
      >
        選擇照片
      </Button>

      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.submitButton}
        disabled={!note.trim() && !image}
      >
        完成打卡
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 16,
  },
  imageButton: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#f4511e',
  },
}); 