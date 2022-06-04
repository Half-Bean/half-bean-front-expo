import React, { useState, createRef } from "react";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import "react-native-gesture-handler";
import Loader from "../components/Loader";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";

import Api from "../../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default (props) => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errortext, setErrortext] = useState("");

  const [user_id, setUser_id] = useState("");
  const [login_id, setLogin_id] = useState("");
  const [token, setToken] = useState("");

  const passwordInputRef = createRef();

  const handleSubmitPress = async (props) => {
    setErrortext("");
    // 예외 처리
    if (!userId) {
      setErrortext("아이디를 입력해주세요");
      return;
    } else {
      if (userId.length < 5) {
        setErrortext("아이디를 5자 이상 입력해주세요");
        return;
      }
    }
    if (!userPassword) {
      setErrortext("비밀번호를 입력해주세요");
      return;
    } else {
      if (userPassword.length < 8) {
        setErrortext("비밀번호는 8자 이상 입니다.");
        return;
      }
    }
    setLoading(true);

    const response = await Api.postLogin(userId, userPassword);
    console.log(response);
    if (!response) {
      //setErrortext("아이디와 비밀번호를 다시 한 번 확인해주세요.");
      alert("아이디와 비밀번호를 다시 한 번 확인해주세요.");
      setLoading(false);
      return;
    } else {
      if (response.success === true) {
        alert(response.response.nickname + "님 반가워요 :)");
        //await AsyncStorage.setItem("token", response.token);
        let user = {
          user_id: response.response.user_id,
          login_id: response.response.login_id,
          token: response.token,
        };
        await AsyncStorage.setItem("user", JSON.stringify(user), (err) => {
          if (err) {
            console.log(err);
          }
        });
        await AsyncStorage.getItem("user", (err, result) => {
          if (err) {
            console.log(err);
          } else {
            let UserInfo = JSON.parse(result);
            setUser_id(UserInfo.user_id);
            setLogin_id(UserInfo.login_id);
            setToken(UserInfo.token);
            console.log("user_id : " + UserInfo.user_id);
            console.log("login_id : " + UserInfo.login_id);
            console.log("token : " + UserInfo.token);
          }
        });

        setLoading(false);
        props.navigation.navigate("MainTab");
        return;
      } else {
        console.log("로그인 실패");
        alert("아이디와 비밀번호를 다시 한 번 확인해주세요.");
        setLoading(false);
        return;
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Loader loading={loading} />
        <View style={styles.topArea}>
          <View style={styles.titleArea}>
            <Text style={styles.TitleText}>로그인</Text>
          </View>
          <View style={styles.TextArea}>
            <Text style={styles.Text}>
              로그인하여 금오공대 학우들간의 초소형 거래마켓
            </Text>
            <Text style={styles.Text}>콩반쪽을 사용해보세요!</Text>
          </View>
        </View>

        <View style={styles.formArea}>
          <TextInput
            style={styles.textFormTop}
            placeholder={"아이디"}
            onChangeText={(userId) => setUserId(userId)}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() =>
              passwordInputRef.current && passwordInputRef.current.focus()
            }
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.textFormBottom}
            onChangeText={(userPassword) => setUserPassword(userPassword)}
            secureTextEntry={true}
            placeholder={"비밀번호"}
            returnKeyType="next"
            keyboardType="default"
            ref={passwordInputRef}
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
          />
          {errortext != "" ? (
            <Text style={styles.TextValidation}> {errortext}</Text>
          ) : null}
        </View>
        <View style={{ flex: 0.75 }}>
          <View style={styles.btnArea}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleSubmitPress(props)}
            >
              <Text style={{ color: "black", fontSize: wp("4%") }}>로그인</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={styles.TextRegister}
            onPress={() => props.navigation.navigate("Signup")}
          >
            앱 사용이 처음이시라면, 회원가입이 필요해요 :D
          </Text>
        </View>
        <View style={{ flex: 3 }} />
      </View>
    </>
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
    flex: 1,
    paddingTop: wp(4),
    paddingBottom: wp(4),
  },
  titleArea: {
    flex: 0.7,
    justifyContent: "center",
    paddingTop: wp(3),
  },
  TextArea: {
    flex: 0.3,
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: 3,
  },
  TitleText: {
    fontSize: 25,
    paddingBottom: 5,
  },
  Text: {
    fontSize: wp("4"),
  },
  TextValidation: {
    fontSize: wp("4%"),
    color: "red",
    paddingTop: wp(2),
  },
  TextRegister: {
    fontSize: wp("4%"),
    color: "grey",
    textDecorationLine: "underline",
    //paddingTop: wp(5),
    paddingTop: 10,
  },
  formArea: {
    justifyContent: "center",
    flex: 1.5,
    paddingTop: 10,
  },
  textFormTop: {
    borderWidth: 2,
    borderBottomWidth: 1,
    borderColor: "black",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    width: "100%",
    height: hp(7),
    paddingLeft: 10,
    paddingRight: 10,
  },
  textFormBottom: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: "black",
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    width: "100%",
    height: hp(7),
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnArea: {
    height: hp(8),
    // backgroundColor: 'orange',
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp(2),
    paddingBottom: hp(-1),
  },
  btn: {
    flex: 1,
    width: "100%",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BCD593",
  },
});
