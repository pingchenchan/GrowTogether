import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

export default function ChallengeCard({ challenge, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text>{challenge.title}</Text>
        <Text>{challenge.frequency}</Text>
      </View>
    </TouchableOpacity>
  );
}