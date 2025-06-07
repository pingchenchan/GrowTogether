import React, { useCallback, useState } from "react";
import { View, FlatList, Button, RefreshControl } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import ChallengeCard from "../components/ChallengeCard";
import { Challenge } from "../types";

const DashboardScreen = (
  props: NativeStackScreenProps<RootStackParamList, "Dashboard">
) => {
  const { navigation } = props;
  const [data, setData] = useState<Challenge[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    setRefreshing(true);
    const res = await fetch("/api/challenges");
    const json = await res.json();
    setData(json.challenges);
    setRefreshing(false);
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button
        title="新增挑戰"
        onPress={() => navigation.navigate("CreateChallenge")}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChallengeCard
            item={item}
            onPress={() =>
              navigation.navigate("ChallengeDetail", { id: item.id })
            }
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      />
    </View>
  );
};

export default DashboardScreen;