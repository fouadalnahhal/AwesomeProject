import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { AsyncStorage } from "react-native";
import { Input, Button } from "@rneui/base";

function Login({ navigation }) {
  const [email, onChangeText1] = useState("");
  const [password, onChangeText2] = useState("");
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };

  const login = async () => {
    require("axios")({
      method: "post",
      url: "http://192.168.1.5:8000/api/auth/login",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: require("qs").stringify({
        email: email,
        password: password,
      }),
    })
      .then(function (response) {
        storeData("@access_token", response.data.access_token);
        console.log(response.data.access_token);
        navigation.navigate("Chirps");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Username"
        onChangeText={onChangeText1}
        // errorStyle={{ color: "red" }}
        // errorMessage="ENTER A VALID ERROR HERE"
      />
      <Input
        placeholder="Password"
        onChangeText={onChangeText2}
        secureTextEntry={true}
        // errorStyle={{ color: "red" }}
        // errorMessage="ENTER A VALID ERROR HERE"
      />
      <Button
        title="Log in"
        loading={false}
        loadingProps={{ size: "small", color: "white" }}
        buttonStyle={{
          backgroundColor: "rgba(111, 202, 186, 1)",
          borderRadius: 5,
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 23 }}
        containerStyle={{
          marginHorizontal: 50,
          height: 100,
          width: 200,
          marginVertical: 10,
        }}
        onPress={() => login()}
      />
      <Button
        title="SIGN UP"
        disabled={true}
        titleStyle={{ fontWeight: "bold", fontSize: 23 }}
        buttonStyle={{
          backgroundColor: "rgba(92, 99,216, 1)",
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 5,
        }}
        containerStyle={{
          width: 200,
          height: 100,
          marginHorizontal: 50,
          marginVertical: 0,
        }}
      />
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
