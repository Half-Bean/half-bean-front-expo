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
import { useRoute } from "@react-navigation/native";
import { Colors } from "react-native-paper";
import Api from "../../../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default (props) => {
  const route = useRoute();

  const imageBox = (image) => {
    let profile;
    if (!image) {
      profile =
        "data:image/png;base64," +
        "iVBORw0KGgoAAAANSUhEUgAAAMQAAAC3CAIAAADCcmZTAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATYSURBVHhe7d29ayRlAMfxxDuMoKKgoKCn2NkIVhYKVwgWl0LxBURPREREEJTjrAULr7CwOCtFtFYs/AtsFMRK4UBBTVL4UpgEQZOrfXZnTHYnG/PiL8m8fB4+hN3ZSViYL89Mdh6SubXNZYgQEzFiIkZMxIiJGDERIyZixESMmIgREzFiIkZMxIiJGDERIyZixESMmIgREzFiIkZMxIiJGDERIyZixESMmIgREzFiIkZMxIiJGDERIyZixESMmIgREzFiIkZMxAwlptXNpbXNlbXR1+ZLpAxwZtLTURlITAI6Dp2PqZy/1refjh5PPOVYdTumUtKvf1+pHuxsaObGMRPVkeh2TLtPQuVau7GFI9fHa6arSjoZPYtJRiepjzMTJ6QPMW1daI+/duni+pPPP77r7juL995/p/FSF5mZTsyXP396zan5uWrMz517+0xjh87pdkzrV1fKtDR5n+Tyh5fKoakO0usXXxlvnHkhdfITWJmWxh3VY35+ruvzU59mpqXrbz1dH5mJsWO3VigllXoaY+G6hcZu3dLtmMbT0vbT+phMj8kd2qNcJ9Xvb3o0duuWPs1MXYrp5YvP1u9vYrzw0vnGbt0iphPz6OPn6rc4Hvc/fUtjh87pXEyTnwI0r6yfee7J+sj8Ox5+5GzZs50fGfy2/sNjTyxW77MHJRXdiqkZxB8bP04+LYenOjbVePHNxV/+Gt0GbrPvl79pbOmuXp3mijfefb4q6aFXb5t+qZ13Wnp1/6ejMc08BvXGclL7ae3r6WmsV8estTo7M9VLA/ZTiZKOSd9OczPTqW7etfMyvE/6F9PI+nZS5cGsgKx5OgKdjGn3OWYqkVnLdjV0hPo5M+1icrra2kjMMGJyUjsWQ4hpj5Ke+uCeMw/ckF1OVH7mTXdcW/RgldL+9T6mveekauHK6YX5xvZDKyUt3Hiq+uw0+GPbr98x7evsVh31MhrbD2eypDL6cdNtn4ZxzfSfyuRRHfgHm3dgDmzIJRVDj2l1c+mL7z7bWm7wf3oql0dDLqkwM438/uf2coND9FRdbtffPx4DLKkQU+21t87XIRywp8aprYxhllSIaWS0lnxj6cryV5PL6/b8xX7nhHTv4s0Xvr2vsdtwiGlk667L5PnuoGOwE9IWMTVd+uhCXcdBhpIKMdXWp2+5nL1we53JXkNGW8REjJi2NSYnDkpMUyZW1XFgYtphPD+p6hDERIyYiBETMWIiRkzEiIkYMREjJmLERIyYiBETMWIiRkzEiIkYMREjpo5Z3WjvX1IUUweM/0XMytqu/7+6LcREjJiIERMxYmq1WX8wuL3ERIyY2mzGpwDj3+yaG1tCTC01M5o2l1SIiRgxESOmNmr56Ww3YiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJgI2Vz+B/0FiQ6CNpa1AAAAAElFTkSuQmCC";
    } else {
      profile = "data:image/png;base64," + image;
    }
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

  const updateBtn = () => {
    return (
      <View style={styles.btn_s}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => props.navigation.push("ProductUpdate")}
        >
          <Text style={{ color: "black", fontSize: wp("4%") }}>수정</Text>
        </TouchableOpacity>
      </View>
    );
  };

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

  const [user_id, setUser_id] = useState("");

  const [data, setData] = useState();
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]);

  const getData = async () => {
    await setLoading(true);
    //   fetch("http://jsonplaceholder.typicode.com/posts")
    //     .then((res) => res.json())
    //     .then((res) => setData(res));
    await setData(props.route.params.post_id);
    console.log(props.route.params.post_id);
    console.log("----------------------");
    await getProductDetailRead(props.route.params.post_id);
  };

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

  const putPostHit = async () => {
    const response = await Api.putPostHit(props.route.params.post_id);
  };

  const getProductDetailRead = async (data) => {
    console.log("data  :: ", data);
    let response = await Api.getProductDetailRead(data);
    let postObject = await response.data.response;
    let userObject = await response.data.response.User;
    await setPost(postObject);
    await setUser(userObject);
  };

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
          <View style={[styles.component]}>
            <Image
              style={[styles.image]}
              source={require(".\\src\\image\\nop_image.png")}
            />
          </View>
          <View style={[styles.nickborder]}>
            {imageBox(user.profile_image)}
            <View style={[styles.nickText]}>
              <View style={[styles.nicknameArea]}>
                <Text style={[styles.nickname]}>{user.nickname}</Text>
              </View>
              <View style={[styles.areaArea]}>
                <Text style={[styles.area]}>{post.Area.name}</Text>
              </View>
            </View>
            <View style={[styles.chatBtn]}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => props.navigation.push("ChatScreen")}
              >
                <Text style={{ color: "black", fontSize: wp("4%") }}>
                  채팅하기
                </Text>
              </TouchableOpacity>
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
    width: wp(15),
    height: hp(9),
    borderColor: "black",
    borderWidth: 2,
  },
  nickname: {
    color: Colors.green300,
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "left",
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
    paddingRight: 120,
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
