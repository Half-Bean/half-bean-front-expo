import React, { useState, createRef } from "react";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import "react-native-gesture-handler";
import Api from "../../Api";
import Loader from "../components/Loader";

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

export default (props) => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userNickName, setUserNickName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordchk, setUserPasswordchk] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userIsMaster, setUserIsMaster] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [errortext2, setErrortext2] = useState("");
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const idInputRef = createRef();
  const nicknameInputRef = createRef();
  const passwordInputRef = createRef();
  const passwordchkInputRef = createRef();
  const nameInputRef = createRef();
  const emailInputRef = createRef();

  const handleSubmitButton = async (props) => {
    setErrortext("");

    if (!userName) {
      alert("이름을 입력해주세요");
      return;
    }
    if (!userId) {
      alert("id를 입력해주세요");
      return;
    }
    if (!userNickName) {
      alert("닉네임을 입력해주세요");
      return;
    }

    if (!userPassword) {
      alert("비밀번호를 입력해주세요");
      return;
    }
    if (userPasswordchk != userPassword) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }
    if (!userEmail) {
      alert("이메일을 입력해주세요");
      return;
    }

    //Show Loader
    setLoading(true);

    var user_data = {
      login_id: userId,
      password: userPassword,
      name: userName,
      nickname: userNickName,
      email: userEmail,
      is_master: userIsMaster,
    };
    console.log(user_data);
    const response = await Api.postUser(user_data);
    console.log(response);
    if (response.success === true) {
      setIsRegistraionSuccess(true);
    }
  };
  if (isRegistraionSuccess) {
    //setLoading(false);
    console.log("성공");
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 2 }}>
          <View
            style={{
              height: hp(13),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../image/success.png")}
              style={{
                height: wp(20),
                resizeMode: "contain",
                alignSelf: "center",
              }}
            />
          </View>
          <View
            style={{
              height: hp(7),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "black", fontSize: wp("4%") }}>
              회원가입이 완료되었습니다.
            </Text>
          </View>

          <View style={{ height: hp(20), justifyContent: "center" }}>
            <View style={styles.btnArea}>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.5}
                onPress={() => props.navigation.navigate("Login")}
              >
                <Text style={{ color: "black", fontSize: wp("4%") }}>
                  로그인하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <Loader loading={loading} />
      <View style={styles.topArea}>
        <View style={styles.titleArea}>
          <Text style={styles.TitleText}>회원가입</Text>
        </View>
        <View style={styles.TextArea}>
          <Text style={styles.Text}>회원가입하여 금오공대 초소량 거래마켓</Text>
          <Text style={styles.Text}>콩반쪽을 사용해보세요 :)</Text>
        </View>
      </View>

      <View style={styles.formArea}>
        <TextInput
          style={styles.textFormAll}
          placeholder={"아이디(5자 이상, 영문, 숫자)"}
          onChangeText={(userId) => setUserId(userId)}
          ref={idInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordInputRef.current && passwordInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        <View style={{ flex: 0.75 }}>
          <View style={styles.checkBtnArea}>
            <TouchableOpacity
              style={styles.checkBtn}
              onPress={handleSubmitButton}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: wp("4%"),
                  //fontWeight: 'bold',
                }}
              >
                아이디 중복확인
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          style={styles.textFormTop}
          secureTextEntry={true}
          placeholder={"비밀번호(8자 이상)"}
          onChangeText={(UserPassword) => setUserPassword(UserPassword)}
          ref={passwordInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordchkInputRef.current && passwordchkInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        <TextInput
          style={styles.textFormBottom}
          secureTextEntry={true}
          placeholder={"비밀번호 확인"}
          onChangeText={(UserPasswordchk) =>
            setUserPasswordchk(UserPasswordchk)
          }
          ref={passwordchkInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            nameInputRef.current && nameInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        <View
          style={{ flex: 0.5, justifyContent: "center", paddingTop: hp(1) }}
        >
          {userPassword !== userPasswordchk ? (
            <Text style={styles.TextValidation}>
              비밀번호가 일치하지 않습니다.
            </Text>
          ) : null}
        </View>
        <TextInput
          style={styles.textFormAll}
          placeholder={"이름"}
          onChangeText={(UserName) => setUserName(UserName)}
          ref={nameInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            nameInputRef.current && nameInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        <TextInput
          style={styles.textFormAll}
          placeholder={"닉네임"}
          onChangeText={(UserNickName) => setUserNickName(UserNickName)}
          ref={nicknameInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            nicknameInputRef.current && nicknameInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        <View style={{ flex: 0.75 }}>
          <View style={styles.checkBtnArea}>
            <TouchableOpacity
              style={styles.checkBtn}
              onPress={handleSubmitButton}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: wp("4%"),
                  //fontWeight: 'bold',
                }}
              >
                닉네임 중복확인
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          style={styles.textFormAll}
          placeholder={"이메일"}
          onChangeText={(UserEmail) => setUserEmail(UserEmail)}
          ref={emailInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            emailInputRef.current && emailInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
      </View>
      <View style={{ flex: 0.75 }}>
        <View style={styles.checkBtnArea}>
          <TouchableOpacity
            style={styles.checkBtn}
            onPress={handleSubmitButton}
          >
            <Text
              style={{
                color: "black",
                fontSize: wp("4%"),
                //fontWeight: 'bold',
              }}
            >
              인증메일 전송
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 0.7, justifyContent: "center" }}>
        {errortext2 !== "" ? (
          <Text style={styles.TextValidation}>{errortext2}</Text>
        ) : null}
      </View>

      <View style={{ flex: 0.75 }}>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={handleSubmitButton}>
            <Text
              style={{
                color: "black",
                fontSize: wp("4%"),
                //fontWeight: 'bold',
              }}
            >
              회원가입
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 3 }} />
    </ScrollView>
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
  TextArea: {
    flex: 0.3,
    justifyContent: "center",
  },
  alertArea: {
    height: wp(150),
  },
  TitleText: {
    fontSize: wp(8),
  },
  Text: {
    fontSize: wp(4),
  },
  TextValidation: {
    fontSize: wp("4%"),
    color: "red",
  },

  formArea: {
    flex: 4,
    justifyContent: "center",
    paddingTop: hp(3),
  },

  formArea2: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
    marginBottom: hp(-2),
    // alignSelf: 'stretch',
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
  textFormMiddle: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "black",
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
  textFormAll: {
    borderWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderColor: "black",
    width: "100%",
    height: hp(7),
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    //marginBottom: 10,
  },
  btnArea: {
    height: hp(8),
    // backgroundColor: 'orange',
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(5),
    paddingTop: hp(1),
    paddingBottom: hp(-1),
    //marginTop: 10,
    marginBottom: 10,
  },
  checkBtnArea: {
    height: hp(8),
    //backgroundColor: "orange",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingTop: hp(2),
    paddingBottom: hp(-1),
    //marginTop: 10,
    marginBottom: 10,
  },
  btn: {
    flex: 1,
    width: "100%",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BCD593",
  },
  checkBtn: {
    flex: 1,
    width: "50%",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B3D1F0",
  },
  inputIOS: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: "black",
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    width: "100%",
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: "black",
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    width: "100%",
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },

  inputAndroid: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: "black",
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    color: "black",
    height: hp(6),
    width: wp(86),
    paddingLeft: 10,
    paddingRight: 10,
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
});
