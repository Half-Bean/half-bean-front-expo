import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default (props) => {
  const navigation = useNavigation();
  const nullCheck = (image) => {
    if (image === null) {
      return "./src/image/nop_image.png";
    } else {
      return image;
    }
  };

  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("MyProductRead", { post_id: item.post_id })
        }
      >
        <View style={[styles.view]}>
          <View style={[styles.viewRow]}>
            <View style={[styles.viewColumn]}>
              <View>
                <Text style={[styles.title]}>{item.title}</Text>
              </View>
              <View>
                <Text style={[styles.content]} numberOfLines={1}>
                  {item.content}
                </Text>
              </View>
              <View style={[styles.writeArea]}>
                {/* <Text style={[styles.write]}>{item.User.nickname}</Text> */}
              </View>
            </View>
            <View style={[styles.viewRow2]}>
              <Image
                style={[styles.image]}
                source={"./src/image/nop_image.png"}
              />
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    setData(props.post);
  };

  useEffect(() => {
    getData();
  }, [props, props.navigation]);

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: Colors.lime50,
  },
  view: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 5,
    margin: 5,
    elevation: 5,
    borderRadius: 10,
  },
  viewColumn: {
    padding: 5,
    flex: 1,
    flexDirection: "column",
  },
  viewRow: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
    marginTop: 5,
  },
  viewRow2: {
    padding: 5,
    flex: 0.4,
    flexDirection: "row",
    borderRadius: 10,
    marginTop: 5,
    justifyContent: "space-between",
  },
  viewColumn2: {
    padding: 5,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
    flexDirection: "column",
  },
  content: {
    fontSize: 11,
  },
  write: {
    paddingTop: 5,
    paddingLeft: 5,
    fontSize: 10,
    color: Colors.blue500,
    fontWeight: "bold",
  },
  write2: {
    margin: 1,
    fontSize: 11,
    color: Colors.blueGrey500,
  },
  writeArea: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 13,
  },
  image: {
    flex: 1,
    width: 10,
    height: 60,
    alignItems: "flex-end",
    borderRadius: 5,
  },
});
