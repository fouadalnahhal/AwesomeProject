import React, { useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import Login from "./Login.js";
import Chirps from "./Chirps.js";
import UselessTextInputMultiline from "./UselessTextInputMultiline.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

export default function App() {
  const [isLoading, setLoading] = useState(true);

  const auth = async () => {
    console.log((await getData("@access_token").then((value) => value)));
    setLoading(
      (await getData("@access_token").then((value) => value)) === null
    );
  };

  useEffect(() => {
    auth();
  }, []);

  return (
    isLoading ? (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Chirps" component={Chirps} />
        </Stack.Navigator>
      </NavigationContainer>
    ) : (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Chirps" component={Chirps} />
          <Stack.Screen name="UselessTextInputMultiline" component={UselessTextInputMultiline} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
}