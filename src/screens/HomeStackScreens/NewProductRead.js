import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
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

  const getProductDetailRead = async (data) => {
    console.log("data  :: ", data);
    let response = await Api.getProductDetailRead(data);
    let postObject = await response.data.response;
    let userObject = await response.data.response.User;
    console.log(postObject);
    await setPost(postObject);
    await setUser(userObject);
  };

  useEffect(async () => {
    await getData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[styles.view]}>
          <View>
            <Text style={[styles.title]}>{post.title}</Text>
          </View>
          <View>
            <Text style={[styles.mid_title]} numberOfLines={4}>
              {post.content}
            </Text>
          </View>

          <View style={[styles.component]}>
            <Image style={[styles.image]} source={{ uri: item.image }} />
          </View>

          <View>
            <Text style={[styles.date]}>
              {post.createdAt}
            </Text>
          </View>
          
          <View style={[styles.nickborder]}>
           <Image style={[styles.user_image]} source = {require(".\\static\\public\\image.png")}/>
           <Text style={[styles.nickname]}>{user.nickname}</Text>
          </View>
          
    

          <View style={styles.btn_s}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => props.navigation.push("ProductUpdate")}
            >
              <Text style={{ color: "black", fontSize: wp("4%") }}>수정</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.blue100,
    padding: 10,
    margin: 10,
    elevation: 5,
    borderRadius: 10,
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
    height: 60,
    color: "#000",
    fontSize: 35,
    marginTop: 0,
    marginBottom: 30,
    fontWeight: "400",
    textAlign: "center",
    alignItems:"center",
    backgroundColor: Colors.blue50,
    borderRadius: 10,
  },
  mid_title: {
    height: 60,
    color: "#000",
    fontSize: 20,
    marginTop: 0,
    marginBottom: 15,
    fontWeight: "300",
    textAlign: "left",
    backgroundColor: Colors.blue50,
    borderRadius: 10,
    paddingLeft: 10,
  
  },
  date: {
    textAlign: "right",
    
  },
  user_image: {
    borderRadius: 100,
    width: wp(15),
    height: hp(8),
    marginTop: 18,
  },
  nickname: {
    height: 60,
    color: "#000",
    fontSize: 15,
    marginTop: 0,
    marginBottom: 15,
    fontWeight: "300",
    textAlign: "left",
  },
  nickborder: {
    backgroundColor: Colors.blue50,
    // marginTop: 20,
    // paddingBottom: 80,
    marginTop: 60,
    textAlign: "center",
    alignItems:"center",
    borderRadius: 20,
    height: 100,
    marginTop: 50,
  }
  }
);
