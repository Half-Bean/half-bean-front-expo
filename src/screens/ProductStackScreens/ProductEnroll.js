import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "react-native-paper";

import Api from "../../../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState();

  const getUserId = async () => {
    const id = await AsyncStorage.getItem("user_id", (err, result) => {
      console.log(result); // User1 출력
    });
    await setUserId(id);
    console.log(id);
  };

  useEffect(async () => {
    await getUserId();
  }, []);

  const postEnroll = async () => {
    const postObject = {
      user_id: 2,
      title: title,
      content: content,
      category: "초소량거래",
      isSoldout: "거래중",
      image: null,
      visual_open: true,
      isHurry: false,
      hit: 0,
      blame_count: 0,
      area_id: 1,
    };
    console.log(postObject);
    console.log("=============");
    const response = await Api.postProductEnroll(postObject);
    console.log(response);
    if (response.success === true) {
      alert("상품 등록 성공!");
    } else {
      alert("올바른 값을 입력하세요");
    }
  };

  const goAlert = () =>
    Alert.alert(
      "게시글",
      "게시글을 등록하시겠습니까?",
      [
        {
          text: "네",
          onPress: () => postEnroll(),
        },
        {
          text: "아니요",
          onPress: () => console.log("게시글 등록을 취소하였습니다."),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );

  return (
    <SafeAreaView>
      <ScrollView style={styles.back}>
        <View style={styles.container}>
          <View style={styles.topArea}>
            <TextInput
              placeholder="제목을 입력하세요"
              style={styles.textFormTop}
              onChangeText={(title) => setTitle(title)}
              returnKeyType="next"
              keyboardType="default"
              onSubmitEditing={Keyboard.dismiss}
              value={title}
            />
          </View>
          <View style={styles.textArea}>
            <TextInput
              placeholder="내용을 입력하세요"
              style={styles.textFormTop_s}
              onChangeText={(content) => setContent(content)}
              returnKeyType="next"
              keyboardType="default"
              onSubmitEditing={Keyboard.dismiss}
              value={content}
              multiline={true}
            />
          </View>
          <View style={styles.hurryArea}>
            <Text style={styles.Text}>ㅁ 긴급</Text>
          </View>
          <View style={styles.textArea}>
            <Text style={styles.flexbox}>
              긴급에 체크하시면 작성자 주변에 거주하는 이웃들에게 알림이
              전송됩니다! 빠른 거래를 원하신다면 적립된 콩 포인트를 이용해서
              긴급 게시글로 등록해보세요! 긴급 거래는 주 @일 하루 한 번 올릴 수
              있는 횟수 제약이 있으니 참고 바랍니다 (❁´▽`❁)
            </Text>
          </View>
          <View style={styles.btn_s}>
            <TouchableOpacity
              style={styles.btn}
              // onPress={() =>props.navigation.push("ProductListScreen")}
              onPress={() => postEnroll()}
            >
              <Text style={{ color: "black", fontSize: 12 }}>완료</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: Colors.lime100,
  },
  container: {
    //배경 공간
    flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: "column",
    backgroundColor: "white",
    padding: 10,
    margin: 10,
  },
  topArea: {
    //상단탭..?
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  textArea: {
    //글배경..?
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    alignItems: "center", //추가 - 여기서 가운데정렬됨
  },
  TitleText: {
    fontSize: wp(8),
    paddingBottom: wp("1%"),
  },
  Text: {
    fontSize: 12,
  },
  formArea: {
    justifyContent: "center",
    flex: 1.5,
  },
  Ic: {
    paddingLeft: 10,
  },
  input: {
    width: "50%",
    backgroundColor: "#f5f5f5",
    left: 100,
    marginBottom: 20,
  },
  textFormTop: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: "black",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    width: "100%",
    height: hp(7),
    padding: 10,
  },
  textFormTop_s: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: "black",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    width: "100%",
    height: 200,
    padding: 10,
    textAlignVertical: "top",
  },
  checkbox: {
    alignSelf: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexbox: {
    marginTop: 10,
    backgroundColor: "#fff0f5",
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
    alignItems: "center",
    paddingTop: 5,
    alignItems: "flex-end",
  },
  hurryArea: {
    flex: 1,
    alignItems: "flex-end",
    paddingTop: 5,
    marginRight: 10,
  },
});
