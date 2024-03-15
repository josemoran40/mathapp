// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Welcome from "./pages/Welcome";
import Question from "./pages/Question";
import { Text } from "react-native";

import { initializeApp } from "firebase/app";
import SingUp from "./pages/SignUp";
import Tops from "./pages/Tops";
import LogOut from "./components/Logout";
import Menu from "./pages/Menu";
import ShowInstruccions from "./pages/ShowInstrucctions";
import Classes from "./pages/Classes";
import GoTo from "./components/GoTo";
import { ContextProvider } from "./components/Context";

initializeApp({
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Question" component={Question} />
          <Stack.Screen name="SingUp" component={SingUp} />
          <Stack.Screen name="Animation" component={ShowInstruccions} />
          <Stack.Screen
            name="Levels"
            component={Menu}
            options={({ navigation, route }) => ({
              headerRight: (props) => (
                <GoTo navigation={navigation} path={"Tops"} text={"Tops"} />
              ),
            })}
          />
          <Stack.Screen
            name="Classes"
            component={Classes}
            options={({ navigation, route }) => ({
              headerRight: (props) => <LogOut navigation={navigation} />,
            })}
          />
          <Tab.Screen name="Tops" component={Tops} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}

export default App;
