import React, { useState, useEffect } from "react";
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
import ProductsList from "./ProductsList.js";
import Api from "../../../Api";

export default (props) => {
  const [posts, setPosts] = useState();

  useEffect(async () => {
    await getProductsListRead();
  }, []);

  const getProductsListRead = async () => {
    let response = await Api.getProductsListRead();
    const post = await response.data.response.posts;
    setPosts(post);
    console.log(response);
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <ProductsList post={posts} />
        <View style={styles.container}>
          <View style={styles.btn_s}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => props.navigation.push("ProductEnroll")}
            >
              <Text style={{ color: "black", fontSize: wp("4%") }}>글쓰기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    //배경 공간
    flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: "column",
    backgroundColor: "white",
    paddingLeft: wp(7),
    paddingRight: wp(7),
  },
  topArea: {
    //상단탭..?
    flex: 1,
    paddingTop: wp(4),
    paddingBottom: wp(4),
  },
  TextArea: {
    //글배경..?
    flex: 0.3,
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: wp(4),
    paddingBottom: wp(4),
    alignItems: "center", //추가 - 여기서 가운데정렬됨
  },
  TitleText: {
    fontSize: wp(8),
    paddingBottom: wp("1%"),
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
