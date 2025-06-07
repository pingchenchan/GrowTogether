import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "./src/screens/DashboardScreen";
import ChallengeDetailScreen from "./src/screens/ChallengeDetailScreen";
import CreateChallengeScreen from "./src/screens/CreateChallengeScreen";
import CheckinScreen from "./src/screens/CheckinScreen";
import { makeMirageServer } from "./src/server";

makeMirageServer();

export type RootStackParamList = {
  Dashboard: undefined;
  CreateChallenge: undefined;
  ChallengeDetail: { id: string };
  Checkin: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="CreateChallenge" component={CreateChallengeScreen} />
        <Stack.Screen name="ChallengeDetail" component={ChallengeDetailScreen} />
        <Stack.Screen name="Checkin" component={CheckinScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
