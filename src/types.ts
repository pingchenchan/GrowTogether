export type Challenge = {
  id: string;
  title: string;
  frequency: "daily" | "weekly";
  createdAt: string;
};

export type Checkin = {
  id: string;
  challengeId: string;
  imageUri?: string;
  note?: string;
  createdAt: string;
};