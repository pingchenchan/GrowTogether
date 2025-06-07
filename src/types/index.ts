export interface Challenge {
  id: string;
  title: string;
  frequency: 'daily' | 'weekly';
  createdAt: string;
}

export interface Checkin {
  id: string;
  challengeId: string;
  note: string;
  imageUrl: string | null;
  createdAt: string;
}

export type RootStackParamList = {
  Dashboard: undefined;
  CreateChallenge: undefined;
  ChallengeDetail: { challengeId: string };
  Checkin: { challengeId: string };
}; 