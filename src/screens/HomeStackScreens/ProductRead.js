import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Colors } from "react-native-paper";

export default (props) => {
  const route = useRoute();
  useEffect(() => {}, []);

  const item = {
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
      profile_image: "https://t1.daumcdn.net/cfile/tistory/9969EB415D2DB3C52F",
      nickname: "마이멜로디가잃어버린핸드폰",
    },
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>{props.route.params.post_id}</Text>
        <View style={[styles.view]}>
          <View>
            <Text style={[styles.title]}>{item.title}</Text>
          </View>
          <View>
            <Text style={[styles.content]} numberOfLines={4}>
              {item.content}
            </Text>
          </View>
          <View>
            <Text style={[styles.date]}>
              {item.createdAt.replace("T", " ").split(".")[0]}
            </Text>
          </View>
          <View style={[styles.component]}>
            <Image style={[styles.image]} source={{ uri: item.image }} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.blueGrey50,
    padding: 10,
    margin: 10,
    elevation: 5,
    borderRadius: 10,
  },
  image: {
    flex: 1,
    height: 150,
  },
  component: {
    flex: 1,
  },
});
