import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Text, FAB } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Challenge, Checkin } from '../types';

type ChallengeDetailScreenRouteProp = RouteProp<RootStackParamList, 'ChallengeDetail'>;
type ChallengeDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ChallengeDetail'>;

export default function ChallengeDetail() {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const route = useRoute<ChallengeDetailScreenRouteProp>();
  const navigation = useNavigation<ChallengeDetailScreenNavigationProp>();

  const fetchChallengeDetails = useCallback(async () => {
    try {
      const [challengeResponse, checkinsResponse] = await Promise.all([
        fetch(`/api/challenges/${route.params.challengeId}`),
        fetch(`/api/challenges/${route.params.challengeId}/checkins`),
      ]);

      const challengeData = await challengeResponse.json();
      const checkinsData = await checkinsResponse.json();

      setChallenge(challengeData);
      setCheckins(checkinsData);
    } catch (error) {
      console.error('Error fetching challenge details:', error);
    }
  }, [route.params.challengeId]);

  useEffect(() => {
    fetchChallengeDetails();
  }, [fetchChallengeDetails]);

  const renderCheckinCard = ({ item }: { item: Checkin }) => (
    <Card style={styles.checkinCard}>
      <Card.Content>
        <Text variant="bodyMedium">{item.note}</Text>
        <Text variant="bodySmall" style={styles.timestamp}>
          {new Date(item.createdAt).toLocaleString()}
        </Text>
      </Card.Content>
    </Card>
  );

  if (!challenge) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Card style={styles.challengeCard}>
        <Card.Content>
          <Text variant="headlineMedium">{challenge.title}</Text>
          <Text variant="bodyLarge">
            頻率: {challenge.frequency === 'daily' ? '每日' : '每週'}
          </Text>
        </Card.Content>
      </Card>

      <FlatList
        data={checkins}
        renderItem={renderCheckinCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('Checkin', { challengeId: challenge.id })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  challengeCard: {
    margin: 16,
  },
  list: {
    padding: 16,
  },
  checkinCard: {
    marginBottom: 16,
  },
  timestamp: {
    marginTop: 8,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#f4511e',
  },
}); 