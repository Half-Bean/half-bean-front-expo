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

  const isHurryTag = () => {
    return <Text style={[styles.hurrytag]}> 긴급 </Text>;
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("ProductRead", { post_id: item.post_id })
        }
      >
        <View style={[styles.view]}>
          <View style={[styles.viewRow]}>
            <View style={[styles.viewColumn]}>
              <View style={[styles.viewRow]}>
                {item.isHurry === true ? isHurryTag() : null}
                <Text style={[styles.tag]}> {item.price} 원 </Text>
                <Text style={[styles.title]}>{item.title}</Text>
              </View>
              <View>
                <Text style={[styles.content]} numberOfLines={2}>
                  {item.content}
                </Text>
              </View>
            </View>
            <View style={[styles.viewRow2]}>
              <Image
                style={[styles.image]}
                source={require(".\\src\\image\\nop_image.png")}
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
    <View style={[styles.back]}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <View style={[styles.empty]}>
            <Text style={[styles.emptyText]}> 등록된 상품이 없습니다....</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: Colors.lime50,
    height: "94%",
    paddingBottom: 50,
    marginBottom: 10,
  },
  view: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 10,
    margin: 15,
    marginBottom: -4,
    elevation: 5,
    borderRadius: 10,
  },
  viewColumn: {
    padding: 5,
    flex: 1,
    flexDirection: "column",
  },
  viewRow: {
    flexDirection: "row",
    borderRadius: 10,
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
  hurrytag: {
    backgroundColor: Colors.red200,
    fontSize: 14,
    padding: 3,
    fontWeight: "bold",
    borderRadius: 10,
    paddingLeft: 3,
    paddingRight: 2,
    marginRight: 5,
  },
  tag: {
    backgroundColor: Colors.amber300,
    fontSize: 15,
    padding: 2,
    fontWeight: "bold",
    borderRadius: 10,
    paddingLeft: 2,
    paddingRight: 2,
    marginRight: 7,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  content: {
    fontSize: 15,
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
  empty: {
    backgroundColor: Colors.lime50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "50%",
  },
  emptyText: {
    fontSize: 15,
    fontStyle: "italic",
    color: Colors.grey700,
    fontWeight: "bold",
  },
});
