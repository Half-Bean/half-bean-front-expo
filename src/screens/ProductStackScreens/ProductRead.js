import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRoute } from "@react-navigation/native";
import { Colors } from "react-native-paper";
import Api from "../../../Api";

export default (props) => {
  const route = useRoute();
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

  const [data, setData] = useState();
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const [post, setPost] = useState([]);

  const getData = async () => {
    await setLoading(true);
    //   fetch("http://jsonplaceholder.typicode.com/posts")
    //     .then((res) => res.json())
    //     .then((res) => setData(res));
    await setData(props.route.params.post_id);
  };
  const getProductDetailRead = async () => {
    let response = await Api.getProductDetailRead(data);
    let postObject = await response.data.response;
    await setPost(postObject);
  };
  useEffect(async () => {
    await getData();
    await getProductDetailRead(data);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[styles.view]}>
          <View>
            <Text style={[styles.title]}>{post.title}</Text>
          </View>
          <View>
            <Text style={[styles.content]} numberOfLines={4}>
              {post.content}
            </Text>
          </View>
          <View>
            <Text style={[styles.date]}>
              {post.createdAt.replace("T", " ").split(".")[0]}
            </Text>
          </View>
          <View style={[styles.component]}>
            <Image style={[styles.image]} source={{ uri: post.image }} />
          </View>
          <View style={styles.btn_s}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => props.navigation.push("ProductUpdate")}
            >
              <Text style={{ color: "black", fontSize: wp("4%") }}>수정</Text>
            </TouchableOpacity>
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
  btn: {
    flex: 1,
    padding: 10,
    margin: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BCD593",
  },
  btn_s: {
    alignItems: "flex-end",
    paddingTop: hp("15"),
  },
});
