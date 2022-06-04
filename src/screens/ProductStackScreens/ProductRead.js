import React, { useState, useEffect } from "react";
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
  const [user, setUser] = useState([]);
  const [date, setDate] = useState("");

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

  const trueAlert = () => {
    Alert.alert("감사합니다", "신고가 완료되었습니다.");
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

  const getProductDetailRead = async (data) => {
    console.log("data  :: ", data);
    let response = await Api.getProductDetailRead(data);
    let postObject = await response.data.response;
    let userObject = await response.data.response.User;
    console.log(postObject);
    await setPost(postObject);
    await setUser(userObject);
    let datetype = await response.data.response.createdAt;
    const date = datetype.toString();
    await setDate(date);
  };

  useEffect(async () => {
    await getData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={[styles.bg]}>
        <View>
          <View style={[styles.component]}>
            <Image
              style={[styles.image]}
              source={"./src/image/nop_image.png"}
            />
          </View>
          <View style={[styles.nickborder]}>
            <View style={[styles.profile]}>
              <Image
                style={[styles.user_image]}
                source={"./src/image/profile.png"}
              />
            </View>
            <View style={[styles.nickText]}>
              <View style={[styles.nicknameArea]}>
                <Text style={[styles.nickname]}>{user.nickname}</Text>
              </View>
              <View style={[styles.areaArea]}>
                <Text style={[styles.area]}>학교 앞</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.view]}>
          <View>
            <Text style={[styles.title]}>{post.title}</Text>
          </View>
          <View>
            <Text style={[styles.category]}>분류 [ {post.category} ]</Text>
          </View>
          <View>
            <Text style={[styles.content]} numberOfLines={4}>
              {post.content}
            </Text>
          </View>

          <View>
            <Text style={[styles.date]}>{date}</Text>
          </View>

          <View style={styles.btn_s}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => props.navigation.push("ProductUpdate")}
            >
              <Text style={{ color: "black", fontSize: wp("4%") }}>수정</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => goAlert()}>
              <Text style={{ color: "black", fontSize: 13 }}>
                이 상품 신고하기
              </Text>
            </TouchableOpacity>
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
    padding: 10,
    margin: 10,
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
  title: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  category: {
    color: "#000",
    fontSize: 12,
    marginBottom: 15,
    color: Colors.blueGrey900,
  },
  content: {
    color: "#000",
    fontSize: 13,
    marginBottom: 15,
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
    color: "#000",
    fontSize: 14,
    fontWeight: "300",
    textAlign: "left",
  },
  nickborder: {
    backgroundColor: "white",
    // marginTop: 20,
    // paddingBottom: 80,
    marginBottom: 50,
    textAlign: "center",
    alignItems: "center",
    height: 80,
    flexDirection: "row",
    elevation: 1,
  },
  profile: {
    padding: 5,
    marginLeft: 10,
  },
  nicknameArea: {
    padding: 10,
  },
  area: {
    color: Colors.blueGrey500,
    fontSize: 12,
  },
  areaArea: {
    paddingLeft: 10,
    paddingBottom: 10,
    marginTop: -5,
  },
  nickText: {
    flexDirection: "column",
  },
});
