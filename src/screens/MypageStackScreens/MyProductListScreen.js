import React, { useState, useEffect, useSyncExternalStore } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MyProductsList from "./MyProductsList.js";
import Api from "../../../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default (props) => {
  const [posts, setPosts] = useState();
  const [userId, setUserId] = useState();

  const getUserId = async () => {
    const id = await AsyncStorage.getItem("user", async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let UserInfo = JSON.parse(result);
        setUserId(UserInfo.user_id);
        console.log("user_id : " + UserInfo.user_id);
        await postMyProduct(UserInfo.user_id);
      }
    });
  };

  useEffect(async () => {
    await getUserId();
  }, []);

  const postMyProduct = async (userId) => {
    // const post = await response.data.response.posts;
    // setPosts(post);
    // console.log("=============");
    // console.log(response);

    let response = await Api.postMyProduct(userId);
    console.log(response);
    console.log("=============");
    const post = await response.response.posts;
    console.log(post);
    setPosts(post);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.formArea}>
          <View style={styles.titleArea}>
            <Text style={styles.TitleText}>내가 등록한 상품 조회</Text>
          </View>
          <MyProductsList post={posts} />
          <View style={styles.container}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: "column",
    backgroundColor: "white",
    paddingLeft: wp(7),
    paddingRight: wp(7),
  },
  topArea: {
    flex: 1.5,
    paddingTop: wp(4),
    marginTop: wp(4),
  },
  titleArea: {
    flex: 0.7,
    justifyContent: "center",
  },
  TitleText: {
    fontSize: wp(8),
  },
  Text: {
    fontSize: wp("4"),
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
  btn_s1: {
    alignItems: "center",
    paddingTop: hp("5"),
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
  Ic: {
    paddingRight: 10,
    paddingTop: 10,
  },
  TextArea_s: {
    flex: 0.3,
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: wp(3),
    paddingBottom: wp(3),
    alignItems: "center", //추가 - 여기서 가운데정렬됨
  },
});
