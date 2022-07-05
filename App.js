// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Welcome from './pages/Welcome';
import Question from './pages/Question';
import { Text } from 'react-native';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './key';
import SingUp from './pages/SignUp';
import Tops from './pages/Tops';
import LogOut from './components/Logout';
import Menu from './pages/Menu';
import ShowInstruccions from './pages/ShowInstrucctions';

initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  function Home() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Menu" component={Menu} options={({ navigation, route }) => (
          {
            headerRight: (props) => (
              <LogOut navigation={navigation} />
            ),
            headerBackVisible: false,
            tabBarIcon: () => <Text>🧩</Text>
          }
        )} />
        <Tab.Screen name="Tops" component={Tops} options={({ navigation, route }) => (
          {
            headerRight: (props) => (
              <LogOut navigation={navigation} />
            ),
            headerBackVisible: false,
            tabBarIcon: () => <Text>🔝</Text>
          }
        )} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen name="SingUp" component={SingUp} />
        <Stack.Screen name="Animation" component={ShowInstruccions} />
        <Stack.Screen name="Home" options={() => ({
          headerShown: false
        })} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;