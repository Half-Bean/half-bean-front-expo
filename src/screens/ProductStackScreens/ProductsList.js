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
  const posts = [
    {
      post_id: 1,
      title: "쿠로미 인형 팝니다",
      content:
        "솔직히 귀여운거 인정하자니까?@?@?@솔직히 귀여운거 인정하자니까?@?@?@솔직히 귀여운거 인정하자니까?@?@?@솔직히 귀여운거 인정하자니까?@?@?@솔직히 귀여운거 인정하자니까?@?@?@",
      category: "초소량거래",
      hit: 0,
      blame_count: 0,
      visual_open: true,
      ishurry: false,
      image:
        "https://i.pinimg.com/736x/a2/48/0a/a2480aceb3d0881e5aaa921209cf61c8.jpg",
      createdAt: "2022-03-29T06:38:48.000Z",
      updatedAt: "2022-03-29T06:38:48.000Z",
      deletedAt: null,
      User: {
        user_id: 1,
        login_id: "aaa64",
        profile_image:
          "https://t1.daumcdn.net/cfile/tistory/9969EB415D2DB3C52F",
        nickname: "마이멜로디가잃어버린핸드폰",
      },
    },
    {
      post_id: 2,
      title: "제목2",
      content: "글 내용2",
      category: "초소량거래",
      hit: 0,
      blame_count: 0,
      visual_open: true,
      ishurry: false,
      image:
        "data:image/jpeg;base64,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",
      createdAt: "2022-03-29T06:38:48.000Z",
      updatedAt: "2022-03-29T06:38:48.000Z",
      deletedAt: null,
      User: {
        user_id: 1,
        login_id: "aaa64",
        profile_image: null,
        nickname: "마",
      },
    },
    {
      post_id: 2,
      title: "제목2",
      content: "글 내용2",
      category: "초소량거래",
      hit: 0,
      blame_count: 0,
      visual_open: true,
      ishurry: false,
      image:
        "data:image/jpeg;base64,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",
      createdAt: "2022-03-29T06:38:48.000Z",
      updatedAt: "2022-03-29T06:38:48.000Z",
      deletedAt: null,
      User: {
        user_id: 1,
        login_id: "aaa64",
        profile_image: null,
        nickname: "마",
      },
    },
    {
      post_id: 2,
      title: "제목2",
      content: "글 내용2",
      category: "초소량거래",
      hit: 0,
      blame_count: 0,
      visual_open: true,
      ishurry: false,
      image:
        "data:image/jpeg;base64,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",
      createdAt: "2022-03-29T06:38:48.000Z",
      updatedAt: "2022-03-29T06:38:48.000Z",
      deletedAt: null,
      User: {
        user_id: 1,
        login_id: "aaa64",
        profile_image: null,
        nickname: "마",
      },
    },
  ];

  const navigation = useNavigation();

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
              <View>
                <Text style={[styles.title]}>{item.title}</Text>
              </View>
              <View>
                <Text style={[styles.content]} numberOfLines={1}>
                  {item.content}
                </Text>
              </View>
              <View style={[styles.writeArea]}>
                <Text style={[styles.write]}>{item.User.nickname}</Text>
              </View>
            </View>
            <View style={[styles.viewRow2]}>
              <Image style={[styles.image]} source={{ uri: item.image }} />
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
    //   fetch("http://jsonplaceholder.typicode.com/posts")
    //     .then((res) => res.json())
    //     .then((res) => setData(res));
    setData(posts);
  };

  useEffect(() => {
    getData();
  }, [props, props.navigation]);

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
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
