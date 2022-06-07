import React, { useState, useEffect } from "react";
import AppLoading from "expo-app-loading";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Colors } from "react-native-paper";
import Api from "../../../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default (props) => {
  const route = useRoute();
  const navigation = useNavigation();

  const deleteProduct = async () => {
    const response = await Api.deleteProduct(props.route.params.post_id);
    if (response) {
      alert("상품이 삭제되었습니다.");
      props.navigation.push("MainTab");
    }
  };

  // Button
  // 채팅 버튼
  const chatBtn = () => {
    return (
      <TouchableOpacity style={styles.btn} onPress={() => chatStart()}>
        <Text style={{ color: "black", fontSize: wp("4%") }}>채팅하기</Text>
      </TouchableOpacity>
    );
  };
  // 수정 버튼
  const updateBtn = () => {
    return (
      <View>
        <View style={styles.btn_s}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate("ProductUpdate", {
                post_id: props.route.params.post_id,
              })
            }
          >
            <Text style={{ color: "black", fontSize: wp("4%") }}>수정</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btn_s}>
          <TouchableOpacity style={styles.btn} onPress={() => deleteProduct()}>
            <Text style={{ color: "black", fontSize: wp("4%") }}>삭제</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  // 신고 버튼
  const blameBtn = () => {
    return (
      <View
        style={{
          elevation: 5,
          marginTop: 20,
        }}
      >
        <TouchableOpacity onPress={() => goAlert()}>
          <Text style={{ color: "black", fontSize: 15 }}>이 상품 신고하기</Text>
        </TouchableOpacity>
      </View>
    );
  };
  // 신고 알림
  const trueAlert = async () => {
    const blameObject = {
      user_id: user_id,
      post_id: post.post_id,
      reason: "확인 요망",
    };
    const response = await Api.postBlame(blameObject);
    if (response) {
      if (response.success === true) {
        Alert.alert("감사합니다", "신고가 완료되었습니다.");
      } else {
        Alert.alert("오류", "이미 신고한 게시물입니다.");
      }
    } else {
      Alert.alert("오류", "다시 한 번 시도해주십니오.");
    }
  };

  const goAlert = () => {
    Alert.alert(
      "이 상품을 신고하시겠습니까?",
      "허위 신고가 확인 될 경우 제재가 있을 수 있습니다.",
      [
        {
          text: "취소",
          onPress: () => console.log("신고 취소"),
          style: "cancel",
        },
        { text: "신고", onPress: () => trueAlert() },
      ],
      { cancelable: false }
    );
  };

  // 이미지 예외처리 함수
  // 프로필 이미지
  const imageBox = (image) => {
    let profile = "data:image/png;base64," + image;
    return (
      <View style={[styles.profile]}>
        <Image
          style={[styles.user_image]}
          source={{
            uri: profile,
          }}
        />
      </View>
    );
  };
  // 상품 이미지
  const ImageView = (image) => {
    let images = "data:image/png;base64," + image;
    return (
      <View style={[styles.component]}>
        <Image style={[styles.image]} source={{ uri: images }} />
      </View>
    );
  };
  const noImage = () => {
    return (
      <View style={[styles.component]}>
        <Image
          style={[styles.image]}
          source={require(".\\src\\image\\nop_image.png")}
        />
      </View>
    );
  };

  // 조회수 증가 api
  const putPostHit = async () => {
    const response = await Api.putPostHit(props.route.params.post_id);
  };

  const [data, setData] = useState();
  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]);

  // 상품 상세조회
  const getData = async () => {
    await setData(props.route.params.post_id);
    console.log(props.route.params.post_id);
    console.log("----------------------");
    await getProductDetailRead(props.route.params.post_id);
  };

  const getProductDetailRead = async (data) => {
    console.log("data  :: ", data);
    let response = await Api.getProductDetailRead(data);
    let postObject = await response.data.response;
    let userObject = await response.data.response.User;
    await setPost(postObject);
    await setUser(userObject);
  };

  const [user_id, setUser_id] = useState("");

  useEffect(async () => {
    await putPostHit();
    await getData();
    await AsyncStorage.getItem("user", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let UserInfo = JSON.parse(result);
        setUser_id(UserInfo.user_id);
        console.log("user_id : " + UserInfo.user_id);
      }
    });
  }, []);

  // 채팅하기 버튼 눌렀을 때
  const chatStart = async () => {
    const userObj = {
      user1: user_id,
      user2: user.user_id,
    };
    console.log(userObj);
    const response = await Api.postCreateChatroom(userObj);
    console.log(response);
    const chatroom_id = await response.response;
    console.log(chatroom_id);
    navigation.navigate("ChatScreen", {
      chatroom_id: chatroom_id,
      post_title: post.title,
      nickname: user.nickname,
    });
  };

  const [isReady, setIsReady] = useState(false);
  const onFinish = () => setIsReady(true);
  const startLoading = async () => {
    await putPostHit();
    await getData();
    await AsyncStorage.getItem("user", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let UserInfo = JSON.parse(result);
        setUser_id(UserInfo.user_id);
        console.log("user_id : " + UserInfo.user_id);
      }
    });
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  return (
    <SafeAreaView>
      <ScrollView style={[styles.bg]}>
        <View>
          {post.image ? ImageView(post.image) : noImage()}
          <View style={[styles.nickborder]}>
            <View style={[styles.nickprofile]}>
              {imageBox(user.profile_image)}
              <View style={[styles.nickText]}>
                <View style={[styles.nicknameArea]}>
                  <Text style={[styles.nickname]}>{user.nickname}</Text>
                </View>
                <View style={[styles.areaArea]}>
                  <Text style={[styles.area]}>{post.Area.name}</Text>
                </View>
              </View>
            </View>
            <View style={[styles.chatBtn]}>
              {user.user_id === user_id ? null : chatBtn()}
            </View>
          </View>
        </View>
        <View style={[styles.view]}>
          <View>
            <Text style={[styles.title]}>{post.title}</Text>
          </View>
          <View>
            <Text style={[styles.category]}>
              가격 [ {post.price} ] 원 / 분류 [ {post.category} ]
            </Text>
          </View>
          <View>
            <Text style={[styles.content]} numberOfLines={4}>
              {post.content}
            </Text>
            <View>
              <Text style={[styles.minidata]}>조회 · {post.hit}</Text>
            </View>
            <View>
              <Text style={[styles.date]}>
                {post.createdAt.replace("T", " ").split(".")[0]}
              </Text>
            </View>
          </View>
          <View style={[styles.btnArea]}>
            {user.user_id === user_id ? updateBtn() : blameBtn()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "white",
  },
  view: {
    flex: 1,
    flexDirection: "column",
    marginTop: -30,
    padding: 20,
    margin: 10,
    elevation: 1,
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
  },
  chatBtn: {
    margin: 10,
    alignItems: "flex-end",
  },
  title: {
    color: "#000",
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  category: {
    color: "#000",
    fontSize: 15,
    marginBottom: 15,
    color: Colors.blueGrey900,
  },
  content: {
    color: "#000",
    fontSize: 15,
    marginBottom: 30,
    padding: 15,
    paddingBottom: 20,
    borderRadius: 10,
    backgroundColor: Colors.blueGrey50,
  },
  date: {
    textAlign: "right",
    fontSize: 12,
    fontStyle: "italic",
    color: Colors.blue400,
  },
  user_image: {
    borderRadius: 100,
    width: 60,
    height: 60,
    borderColor: "black",
    borderWidth: 2,
  },
  nickname: {
    color: Colors.green300,
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "left",
  },
  nickprofile: {
    backgroundColor: "white",
    textAlign: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  nickborder: {
    backgroundColor: "white",
    marginBottom: 50,
    textAlign: "center",
    alignItems: "center",
    height: 90,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 1,
  },
  profile: {
    padding: 5,
    marginLeft: 20,
  },
  nicknameArea: {
    padding: 10,
  },
  area: {
    color: Colors.blueGrey500,
    fontSize: 14,
  },
  areaArea: {
    paddingLeft: 10,
    paddingBottom: 10,
    marginTop: -5,
  },
  nickText: {
    flexDirection: "column",
    //marginLeft: -50,
  },
  minidata: {
    marginTop: -10,
    textAlign: "left",
    fontSize: 13,
    color: Colors.blueGrey500,
  },
  btnArea: {
    marginTop: 20,
    elevation: 5,
  },
});
