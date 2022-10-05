import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { Input, Button, Card, ListItem } from "@rneui/base";
import { AsyncStorage, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";

function Chirps({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [dataExpoR, setDataExpoR] = useState([]);
  const [csrfToken, setCSRFToken] = useState([]);
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
  const Delete = async (id) => {
    var axios = require("axios");
    var qs = require("qs");
    var data = qs.stringify({
      id: id,
    });
    var config = {
      method: "delete",
      url: "http://192.168.1.5:8000/expo/delete",
      headers: {
        "X-CSRF-TOKEN": csrfToken.replace(/["]/g, ""),
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
        console.log("Delete Succesfully");
        navigation.navigate("Chirps");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getChirps = async () => {
    try {
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({});
      // var t = await getData("@access_token").then((value) => {
      //   return value;
      // });
      var config = {
        method: "get",
        url: "http://192.168.1.5:8000/expo/",
        headers: {
          // "X-CSRF-TOKEN": "dZrOHcUAsAKzqAtWJ2N19BJX9k8DPQaNw7R1AhpU",
          Authorization:
            "Bearer " + (await getData("@access_token").then((value) => value)),
          Cookie:
            "XSRF-TOKEN=eyJpdiI6IlZuYWpOTTZBZnBJMlNkYjBrdFhEclE9PSIsInZhbHVlIjoiZW5JZHZld09TYlF3czVndkNtdzRYdkk4OEFockRGZXFnTndGenNHL1N0VUJ3MWg4anJBRXpDYWZKZzNpU29nT2dSRm91WUhleTdKRTZhaHlvTmN6cGRVQ0Jqamowc043NDRzY2cxVEJzdCtPWTVuUmNqSFhPRktMNEppZDFCMlkiLCJtYWMiOiJhMWNmYWMwYmVhYTRhY2ViYTJmMWJkN2UyMjY3ODM4ZDkxYThjNWI3ZjJmNDAzZDRkMjFmMzlhY2EwNDkxYTBiIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlorSzBRT0xhMU5zV2RRK1U2WmNEamc9PSIsInZhbHVlIjoiR2xLV25CSGFuWmVqRHRBL0FKd3VUZjlPRTR2Y2FKazhKZHc1aGpRREdmNTZTYmtoNTJQUGdvT0R4SEZlSDRCMENmL3VZVmczbXNtMnpjTEZIb3NLR28wcTcxemlHQUNwMkhMaFRtSFJHN0phelQ4ZUlZREhYUUlJTEJmMk4vYzkiLCJtYWMiOiIzMGIzNzg3ZjI1MGY0MjU2ZmE1YzAwZjAxZTNhNWI1YjkwZTNlYjc0ODdjNTY2NmI2Y2JhY2FlMDg3Yzk3MThkIiwidGFnIjoiIn0%3D",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setDataExpoR(response.data.chirps);
          setCSRFToken(response.data.csrf_token);
          console.log(response.data.chirps);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChirps();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.container}>
            <FlatList
              data={dataExpoR}
              renderItem={({ item }) => (
                <ListItem key={item.id} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{item.title}</ListItem.Title>
                    <ListItem.Subtitle>{item.message}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Content right>
                    <Button>
                      <Icon
                        name="edit"
                        onPress={() => {
                          navigation.navigate("UselessTextInputMultiline", {
                            item: item,
                            csrfToken: csrfToken,
                          });
                        }}
                      ></Icon>
                    </Button>

                    <ListItem.Title></ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Content right>
                    <Button>
                      <IconFontAwesome
                        name="remove"
                        onPress={() => Delete()}
                      ></IconFontAwesome>
                    </Button>
                  </ListItem.Content>
                </ListItem>
              )}
            />
          </View>
        </>
      )}
    </View>
  );
}

export default Chirps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
});
