import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { makeServer } from './src/mirage/server';
import { RootStackParamList } from './src/types';
import Dashboard from './src/screens/Dashboard';
import CreateChallenge from './src/screens/CreateChallenge';
import ChallengeDetail from './src/screens/ChallengeDetail';
import Checkin from './src/screens/Checkin';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    // 初始化 MirageJS
    const server = makeServer();
    return () => {
      server.shutdown();
    };
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Dashboard" 
            component={Dashboard}
            options={{ title: '挑戰列表' }}
          />
          <Stack.Screen 
            name="CreateChallenge" 
            component={CreateChallenge}
            options={{ title: '新增挑戰' }}
          />
          <Stack.Screen 
            name="ChallengeDetail" 
            component={ChallengeDetail}
            options={{ title: '挑戰詳情' }}
          />
          <Stack.Screen 
            name="Checkin" 
            component={Checkin}
            options={{ title: '打卡' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}