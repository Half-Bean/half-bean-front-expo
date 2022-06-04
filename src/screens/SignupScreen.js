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
  // 회원가입 정보 선언
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userNickName, setUserNickName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordchk, setUserPasswordchk] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userEmailchk, setUserEmailchk] = useState("");
  const [userIsMaster, setUserIsMaster] = useState(false);
  // 화면 로딩
  const [loading, setLoading] = useState(false);
  // 에러메세지 선언
  const [errortext, setErrortext] = useState("");
  const [errortext2, setErrortext2] = useState("");
  const [errortext3, setErrortext3] = useState("");
  const [errortext4, setErrortext4] = useState("");
  const [errortext5, setErrortext5] = useState("");
  // 확인 여부 상태값
  const [idCheck, setIdCheck] = useState(0);
  const [nickCheck, setNickCheck] = useState(0);
  const [emailCheck, setEmailCheck] = useState(0);
  const [codeCheck, setCodeCheck] = useState(0);
  // 회원가입 성공 여부 상태값
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  // 키보드 입력 Ref 선언
  const idInputRef = createRef();
  const passwordInputRef = createRef();
  const passwordchkInputRef = createRef();
  const emailInputRef = createRef();
  const emailchkInputRef = createRef();

  // 아이디 중복 확인 버튼 클릭 함수
  const idCheckButton = async (props) => {
    // 오류 예외 처리
    setErrortext("");
    if (!userId) {
      setErrortext("아이디를 입력해주세요");
      return;
    } else {
      if (userId.length < 5) {
        setErrortext("아이디를 5자 이상 입력해주세요");
        return;
      }
    }
    // 오류가 없다면
    // api 호출
    const response = await Api.getDoubleCheckId(userId);
    // api 예외 처리
    if (response.success === true) {
      if (response.response.isDouble === true) {
        setErrortext("중복된 아이디 입니다.");
        return;
      } else {
        setIdCheck(1);
        setErrortext("사용가능한 아이디 입니다.");
        return;
      }
    } else {
      alert("다시 시도해주세요");
      return;
    }
  };

  // 닉네임 중복 확인 버튼 클릭 함수
  const nickCheckButton = async (props) => {
    // 오류 예외 처리
    setErrortext4("");
    if (!userNickName) {
      setErrortext4("닉네임을 입력해주세요");
      return;
    }
    // 오류가 없다면
    // api 호출
    const response = await Api.getDoubleCheckNickName(userNickName);
    // api 예외 처리
    if (response.success === true) {
      if (response.response.isDouble === true) {
        setErrortext4("중복된 닉네임 입니다.");
        return;
      } else {
        setNickCheck(1);
        setErrortext4("사용가능한 닉네임 입니다.");
        return;
      }
    } else {
      alert("다시 시도해주세요");
      return;
    }
  };

  // 이메일 인증 코드 확인 버튼 클릭 함수
  const emailCodeCheck = async (props) => {
    // 오류 예외 처리
    setErrortext5("");
    if (!userEmail) {
      setErrortext5("이메일을 입력해주세요");
      return;
    }
    if (emailCheck === 0) {
      setErrortext5("이메일 인증을 해주세요");
      return;
    }
    if (!userEmailchk) {
      setErrortext5("인증코드를 입력해주세요");
      return;
    }
    // 오류가 없다면
    // api 호출
    const response = await Api.postAuthEmailCheck(userEmail, userEmailchk);
    // api 예외 처리
    if (!response) {
      setErrortext5("다시 시도해주세요");
      return;
    } else if (response.success === true) {
      if (response.response.isVerify === true) {
        setCodeCheck(1);
        setErrortext5("이메일 인증에 성공하였습니다");
        return;
      } else {
        setErrortext5("인증 코드가 일치하지 않습니다");
        return;
      }
    } else {
      setErrortext5("다시 시도해주세요");
      return;
    }
  };

  // 이메일 인증 코드 전송 버튼 클릭 함수
  const emailCheckButton = async (props) => {
    // 오류 예외 처리
    setErrortext5("");
    if (!userEmail) {
      setErrortext5("이메일을 입력해주세요");
      return;
    } else {
      if (!userEmail.includes("@")) {
        setErrortext5("올바른 이메일 형식이 아닙니다");
        return;
      }
      if (!userEmail.includes("kumoh")) {
        setErrortext5("금오 웹메일 주소로만 인증이 가능합니다");
        return;
      }
      if (!userEmail.includes(".ac.kr")) {
        setErrortext5("금오 웹메일 주소로만 인증이 가능합니다");
        return;
      }
      if (userEmail.includes("@kumoh.ac.kr")) {
        setErrortext5("올바른 주소 형식입니다");
      }
    }
    // 오류가 없다면
    // api 호출
    const response = await Api.postAuthEmail(userEmail);
    // api 예외 처리
    if (response.success === true) {
      setEmailCheck(1);
      setErrortext5("인증 코드가 발송되었습니다");
      return;
    } else {
      setErrortext5("다시 시도해주세요");
      return;
    }
  };

  // 회원가입 버튼 클릭 함수
  const handleSubmitButton = async (props) => {
    // 오류 예외 처리
    setErrortext("");
    setErrortext2("");
    setErrortext3("");
    setErrortext4("");
    setErrortext5("");
    if (!userId) {
      setErrortext("아이디를 입력해주세요");
      return;
    } else {
      if (userId.length < 5) {
        setErrortext("아이디를 5자 이상 입력해주세요");
        return;
      }
    }
    if (idCheck === 0) {
      setErrortext("아이디 중복 확인을 해주세요");
      return;
    }
    if (!userPassword) {
      setErrortext2("비밀번호를 입력해주세요");
      return;
    } else {
      if (userPassword.length < 8) {
        setErrortext2("비밀번호를 8자 이상 입력해주세요.");
        return;
      }
    }
    if (!userPasswordchk) {
      setErrortext2("비밀번호를 한번 더 입력해주세요");
      return;
    } else {
      if (userPassword !== userPasswordchk) {
        setErrortext2("비밀번호가 일치하지 않습니다");
        return;
      }
    }
    if (!userName) {
      setErrortext3("이름을 입력해주세요");
      return;
    }
    if (!userNickName) {
      setErrortext4("닉네임을 입력해주세요");
      return;
    }
    if (nickCheck === 0) {
      setErrortext4("닉네임 중복 확인을 해주세요");
      return;
    }
    if (!userEmail) {
      setErrortext5("이메일을 입력해주세요");
      return;
    }
    if (emailCheck === 0) {
      setErrortext5("이메일 인증을 해주세요");
      return;
    }
    if (!userEmailchk) {
      setErrortext5("인증코드를 입력해주세요");
      return;
    }
    if (codeCheck === 0) {
      setErrortext5("인증 코드를 확인해주세요");
      return;
    }
    // 오류가 없다면
    // 잠시 대기
    setLoading(true);
    // 입력된 정보를 바탕으로 user 객체 생성
    var user_data = {
      login_id: userId,
      password: userPassword,
      name: userName,
      nickname: userNickName,
      email: userEmail,
      is_master: userIsMaster,
    };
    // api 호출
    const response = await Api.postUser(user_data);
    // 회원가입 성공 시
    if (response.success === true) {
      // 회원가입 성공 여부 상태 true로 set
      setIsRegistraionSuccess(true);
    }
  };

  // 회원가입이 성공하면
  if (isRegistraionSuccess) {
    // 회원가입 성공 화면을 반환한다
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
              source={"../image/success.png"}
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
          <Text style={styles.Text}>콩반쪽을 사용해보세요 :D</Text>
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
            idInputRef.current && idInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        {errortext != "" ? (
          <Text style={styles.TextValidation}> {errortext}</Text>
        ) : null}
        <View style={{ flex: 0.75 }}>
          <View style={styles.checkBtnArea}>
            <TouchableOpacity style={styles.checkBtn} onPress={idCheckButton}>
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
            passwordInputRef.current && passwordInputRef.current.focus()
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
            passwordchkInputRef.current && passwordchkInputRef.current.focus()
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
          {errortext2 != "" ? (
            <Text style={styles.TextValidation}> {errortext2}</Text>
          ) : null}
        </View>
        <TextInput
          style={styles.textFormAll}
          placeholder={"이름"}
          value={userName}
          onChangeText={(UserName) => setUserName(UserName)}
          blurOnSubmit={false}
        />
        {errortext3 != "" ? (
          <Text style={styles.TextValidation}> {errortext3}</Text>
        ) : null}
        <TextInput
          style={styles.textFormAll}
          placeholder={"닉네임"}
          value={userNickName}
          onChangeText={(UserNickName) => setUserNickName(UserNickName)}
          blurOnSubmit={false}
        />
        {errortext4 != "" ? (
          <Text style={styles.TextValidation}> {errortext4}</Text>
        ) : null}
        <View style={{ flex: 0.75 }}>
          <View style={styles.checkBtnArea}>
            <TouchableOpacity style={styles.checkBtn} onPress={nickCheckButton}>
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
          style={styles.textFormTop}
          placeholder={"이메일"}
          onChangeText={(UserEmail) => setUserEmail(UserEmail)}
          ref={emailInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            emailInputRef.current && emailInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        <TextInput
          style={styles.textFormBottom}
          placeholder={"인증 코드를 입력하세요"}
          onChangeText={(UserEmailchk) => setUserEmailchk(UserEmailchk)}
          ref={emailchkInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            emailchkInputRef.current && emailchkInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        <View
          style={{ flex: 0.5, justifyContent: "center", paddingTop: hp(1) }}
        >
          {errortext5 != "" ? (
            <Text style={styles.TextValidation}> {errortext5}</Text>
          ) : null}
        </View>
      </View>
      <View style={{ flex: 0.75 }}>
        <View style={styles.checkBtnArea}>
          <TouchableOpacity style={styles.checkBtn} onPress={emailCheckButton}>
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
      <View style={{ flex: 0.75 }}>
        <View style={styles.checkBtnArea}>
          <TouchableOpacity style={styles.checkBtn} onPress={emailCodeCheck}>
            <Text
              style={{
                color: "black",
                fontSize: wp("4%"),
                //fontWeight: 'bold',
              }}
            >
              인증코드 확인
            </Text>
          </TouchableOpacity>
        </View>
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
