import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type CreateChallengeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateChallenge'>;

export default function CreateChallenge() {
  const [title, setTitle] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const navigation = useNavigation<CreateChallengeScreenNavigationProp>();

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/challenges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          frequency,
        }),
      });

      if (response.ok) {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error creating challenge:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="挑戰標題"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <SegmentedButtons
        value={frequency}
        onValueChange={(value) => setFrequency(value as 'daily' | 'weekly')}
        buttons={[
          { value: 'daily', label: '每日' },
          { value: 'weekly', label: '每週' },
        ]}
        style={styles.segmentedButtons}
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        disabled={!title.trim()}
      >
        建立挑戰
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
  segmentedButtons: {
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#f4511e',
  },
});