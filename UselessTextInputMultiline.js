import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Input, Button, Card, ListItem } from "@rneui/base";
import { AsyncStorage, ScrollView } from "react-native";

const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      //   editable
      maxLength={40}
    />
  );
};

const Separator = () => <View style={styles.separator} />;

const UselessTextInputMultiline = ({ route, navigation }) => {
  const { item, csrfToken } = route.params;
  const [title, onChangeTitle] = React.useState(item.title);
  const [message, onChangeMessage] = React.useState(item.message);

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // console.log(value);
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };
  const Save = async () => {
    var axios = require("axios");
    var qs = require("qs");
    var data = qs.stringify({
      title: title,
      message: message,
      id: item.id,
    });
    var config = {
      method: "post",
      url: "http://192.168.1.5:8000/expo/update",
      headers: {
        "X-CSRF-TOKEN": csrfToken,
        Authorization:
          "Bearer " + (await getData("@access_token").then((value) => value)),
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie:
          "XSRF-TOKEN=eyJpdiI6IndRSVB5UkRMb3JkMjE2a3VvVHhUc1E9PSIsInZhbHVlIjoiVjNWYXZKMU1Fb0Zvb25yU2diVUhRZnB3T1BsSlJDdkY4OWI1dy8yKzJ2UFM0SG14d3FZbGdvQzVTMUJ2NlJKcnFqZ0dROWVBREY5QzRCTVlnb25JL0JUb1Q2Vm84MThPT2NkeHNIZVNpblZOUjljeXBBWEtETnFXTkdlbXZUQ0kiLCJtYWMiOiIyOTU5NzlmYTE2ZTYzOTNlMmM3ZTg0MjA5MzE3NmI5YjQ0ZmM2MzMyNDYzNmQ5N2JhNzE3MDE5OWEyNTEyMWM5IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IkxYU0JoVDNxYkVuM1dDNzUraTVncnc9PSIsInZhbHVlIjoiQkh5K2ZUMGppRXk3Y0YxY3N1RWZuZmJ2eTNBN3cxV3FXNDJKUHZvRDNOalZVREs4N0pWeFFvcXB2Q0hET3JOdk81UnJ2V3AwVjJxQmgyeWlubitmd0tCMndNNXdmUmkxckgzN1NubEw5dVgvOW03TUM0dy9SMzFjSUJiOFdtc20iLCJtYWMiOiIxYzM1OWMxNjI4OTVlODcyNjBkYTQ4MjJkODZlMWM2NzIzMGE5YWFlZWEyODBiMmFhZjRiY2JjYzhlMzU5MDBhIiwidGFnIjoiIn0%3D",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigation.navigate("Chirps");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // If you type something in the text box that is a color, the background will change to that
  // color.
  return (
    <View>
      <Text style={styles.baseText}>Title</Text>

      <UselessTextInput
        multiline
        editable
        numberOfLines={4}
        onChangeText={(title) => onChangeTitle(title)}
        value={title}
      />
      <Separator />

      <Text style={styles.baseText}>Message</Text>
      <UselessTextInput
        multiline
        numberOfLines={4}
        onChangeText={(message) => onChangeMessage(message)}
        value={message}
      />
      <Separator />

      <PreviewLayout label="alignItems" selectedValue="center">
        <View
          style={{
            width: 200,
            height: 100,
          }}
        >
          <Button title="Save" onPress={() => Save()} />
          <Button
            title="Discard"
            // onPress={() => Alert.alert("Cannot press this one")}
          />
        </View>
      </PreviewLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  baseText: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

const PreviewLayout = ({ label, children, selectedValue }) => (
  <View style={{ padding: 10, flex: 1 }}>
    <View style={[stylesFlex.container, { [label]: selectedValue }]}>
      {children}
    </View>
  </View>
);

const stylesFlex = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "aliceblue",
    minHeight: 1000,
  },
});

export default UselessTextInputMultiline;
