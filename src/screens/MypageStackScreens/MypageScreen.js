import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../../Api";

export default (props) => {
  const route = useRoute();

  const [user, setUser] = useState("");
  const [userId, setUserId] = useState();

  const getUserId = async () => {
    const id = await AsyncStorage.getItem("user_id", (err, result) => {
      console.log(result); // User1 출력
      getMyDataRead(props.login_id);
    });
    setUserId(id);
    console.log(id);
  };

  const getMyDataRead = async (data) => {
    console.log("data  :: ", data);
    let response = await Api.getMyDataRead(data);
    let userObject = await response.data.response.User;
    console.log(postObject);
    setUser(userObject);
  };

  useEffect(async () => {
    await getUserId();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.topArea}>
            <View>
              <View style={styles.buttonContainer}>
                <View>
                  <Image
                    style={[styles.user_image]}
                    source={"./src/image/profile.png"}
                  />
                </View>
              </View>

              {/* <View>
                <Text>{user.userId}</Text>
                </View> */}

              <View style={styles.TextArea}>
                <Text style={styles.Text}>
                  닉네임 : nickname{"\n"}
                  {"\n"}
                  ID : aaa2 {"\n"}
                  {"\n"}
                  Email : aaa2@kumoh.ac.kr {"\n"}
                  {"\n"}
                  등급 : 강낭콩
                </Text>
              </View>

              <TouchableOpacity
                style={styles.btn}
                onPress={() => props.navigation.push("MypageUpdate")}
              >
                <Text style={{ color: "black", fontSize: wp("4%") }}>수정</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.TextArea_s}>
              <Text style={styles.Text}>
                <View style={styles.Ic}>
                  <Icon name="th-list" size={30} color="#696969" />
                </View>
                내가 등록한 상품 조회
              </Text>
            </View>
            <View style={styles.TextArea_s}>
              <Text style={styles.Text}>
                <View style={styles.Ic}>
                  <Icon name="heart" size={30} color="#696969" />
                </View>
                내가 찜한 상품 조회
              </Text>
            </View>
            <View style={styles.TextArea_s}>
              <Text style={styles.Text}>
                <View style={styles.Ic}>
                  <Icon name="inbox" size={30} color="#696969" />
                </View>
                내가 거래한 상품 조회
              </Text>
            </View>
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
    paddingTop: wp(3),
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
    width: "100%",
    height: hp(5),
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BCD593",
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
    paddingTop: wp(4),
    paddingBottom: wp(5),
    alignItems: "center", //추가 - 여기서 가운데정렬됨
  },
  user_image: {
    borderRadius: 100,
    width: wp(30),
    height: hp(18),
    marginTop: 18,
  },
});
