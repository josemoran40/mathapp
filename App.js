// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './key';

import Menu from './pages/Menu';
import SingUp from './pages/SignUp';
import LogOut from './components/Logout';
import Tops from './pages/Tops';
import Welcome from './pages/Welcome';
import Question from './pages/Question';
import { Text } from 'react-native';

initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  function Home() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Menu" component={Menu} options={({ navigation, route }) => (
          {
            headerRight: (props ) => (
              <LogOut navigation={navigation} />
            ),
            headerBackVisible: false,
            tabBarIcon: () => <Text>🧩</Text>
          }
        )}/>
        <Tab.Screen name="Tops" component={Tops} options={({ navigation, route }) => (
          {
            headerRight: (props ) => (
              <LogOut navigation={navigation} />
            ),
            headerBackVisible: false,
            tabBarIcon: () => <Text>🔝</Text>
          }
        )}/>
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SingUp" component={SingUp} />
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen name="Home" options={()=>({
          headerShown:false
        })} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;