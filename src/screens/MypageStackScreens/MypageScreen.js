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
import AppLoading from "expo-app-loading";
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

  const pressLogout = async () => {
    const response = await Api.postLogout(userId);
    if (response) {
      await AsyncStorage.removeItem("user");
      const test = await AsyncStorage.getItem("user");
      console.log(test);
      alert("로그아웃이 완료되었습니다.");
      props.navigation.push("Auth");
    }
  };

  const getMyDataRead = async (data) => {
    console.log("data  :: ", data);
    const mydata = await Api.getMyDataRead(data);
    const userObject = await mydata.response;
    setUser(userObject);
  };

  const getUserId = async () => {
    const id = await AsyncStorage.getItem("user", async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let UserInfo = JSON.parse(result);
        setUserId(UserInfo.login_id);
        console.log("login_id : " + UserInfo.login_id);
        await getMyDataRead(UserInfo.login_id);
      }
    });
  };

  useEffect(async () => {
    await getUserId();
  }, []);

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

  const [isReady, setIsReady] = useState(false);
  const onFinish = () => setIsReady(true);
  const startLoading = async () => {
    await getUserId();
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
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.topArea}>
            <View>
              <View style={styles.buttonContainer}>
                <View>{imageBox(user.profile_image)}</View>
              </View>

              {/* <View>
                <Text>{user.userId}</Text>
                </View> */}

              <View style={styles.TextArea}>
                <Text style={styles.Text}>
                  아이디 : {user.login_id}
                  {"\n"}
                  {"\n"}
                  닉네임 : {user.nickname}
                  {"\n"}
                  {"\n"}
                  이메일 : {user.email}
                  {"\n"}
                  {"\n"}
                  포인트 : {user.point} {"\n"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  padding: 5,
                  margin: 5,
                }}
              >
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => props.navigation.push("MypageUpdate")}
                >
                  <Text style={{ color: "black", fontSize: wp("4%") }}>
                    수정
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => pressLogout()}
                >
                  <Text style={{ color: "black", fontSize: wp("4%") }}>
                    로그아웃
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.TextArea_s}>
              <Text style={styles.Text}>
                <View style={styles.Ic}>
                  <Icon name="th-list" size={30} color="#696969" />
                </View>
                <TouchableOpacity
                  style={styles.btn_my}
                  onPress={() => props.navigation.push("MyProductListScreen")}
                >
                  <Text style={{ color: "black", fontSize: wp("4%") }}>
                    내가 등록한 상품 조회
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
            <View style={styles.TextArea_s}>
              <Text style={styles.Text}>
                <View style={styles.Ic}>
                  <Icon name="heart" size={30} color="#696969" />
                </View>
                <TouchableOpacity
                  style={styles.btn_my}
                  onPress={() => props.navigation.push("MyWishListScreen")}
                >
                  <Text style={{ color: "black", fontSize: wp("4%") }}>
                    내가 찜한 상품 조회
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>

            <View style={styles.TextArea_s}>
              <Text style={styles.Text}>
                <View style={styles.Ic}>
                  <Icon name="inbox" size={30} color="#696969" />
                </View>
                <TouchableOpacity
                  style={styles.btn_my}
                  onPress={() => props.navigation.push("MyProductDealScreen")}
                >
                  <Text style={{ color: "black", fontSize: wp("4%") }}>
                    내가 거래한 상품 조회
                  </Text>
                </TouchableOpacity>
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
    margin: 5,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginBottom: 10,
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
    width: 100,
    height: 100,
    marginTop: 18,
  },
});
