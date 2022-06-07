import React, { useState, useEffect } from "react";
import { CommonActions } from "@react-navigation/native";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors, Checkbox, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import Api from "../../../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { useRoute, useNavigation } from "@react-navigation/native";

export default (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [checked, setChecked] = React.useState(false);

  const [userId, setUserId] = useState();

  const getUserId = async () => {
    await AsyncStorage.getItem("user", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let UserInfo = JSON.parse(result);
        setUserId(UserInfo.user_id);
        console.log("user_id : " + UserInfo.user_id);
      }
    });
  };

  const getProductDetailRead = async (postId) => {
    const response = await Api.getProductDetailRead(postId);
    console.log(response.data.response);
    const post = await response.data.response;
    console.log(post);
    setTitle(post.title);
    setCategoryValue(post.category);
    setGroundValue(post.Area.name);
    setPrice(String(post.price));
    setContent(post.content);
    setImage(post.image);
    let i = "data:image/png;base64," + post.image;
    setImageUrl(i);
    setChecked(post.isHurry);
  };

  useEffect(async () => {
    console.log(props.route.params.post_id);
    await getUserId();
    await getProductDetailRead(props.route.params.post_id);
  }, []);

  // 이미지 부분
  // 이미지 미리보기 clear
  const clearImage = () => {
    setImageUrl("");
    setImage("");
  };
  // 이미지 not null일 때 view
  const imageBox = (image) => {
    return (
      <View style={[styles.viewRow]}>
        <View style={[styles.groundArea]}>
          <Text>미리보기 {">>"}</Text>
        </View>
        <View style={[styles.viewColumn]}>
          <Image
            style={[styles.image]}
            source={{
              uri: imageUrl,
            }}
          />
        </View>
        <View style={styles.btnArea2}>
          <Button icon="close" mode="outline" onPress={() => clearImage()} />
        </View>
      </View>
    );
  };

  // 권한 요청 hook
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const uploadImage = async () => {
    // 권한 확인 코드 : 없으면 물어보고, 승인하지 않으면 종료
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }
    // 이미지 업로드 기능
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });
    if (result.cancelled) {
      return null;
    }
    // 이미지 업로드 결과 및 이미지 경로 업데이트
    console.log(result);
    setImageUrl(result.uri);

    const blob = await FileSystem.readAsStringAsync(result.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    setImage(blob);
  };

  const [groundValue, setGroundValue] = useState("전체");
  const [areaId, setAreaId] = useState(1);

  // 위치가 바뀌면
  const onChangeGround = (value) => {
    //console.warn(value);
    setGroundValue(value);
    if (value) {
      if (value === "전체") {
        setAreaId(1);
      }
      if (value === "학교앞") {
        setAreaId(2);
      }
      if (value === "기숙사") {
        setAreaId(3);
      }
      if (value === "구옥계") {
        setAreaId(4);
      }
      if (value === "옥계중") {
        setAreaId(5);
      }
      if (value === "거상빌딩") {
        setAreaId(6);
      }
    }
  };

  const [categoryValue, setCategoryValue] = useState("초소량 거래");

  const onChangeCategory = async (value) => {
    setCategoryValue(value);
  };

  const postEnroll = async () => {
    // 오류 예외 처리
    if (!title) {
      alert("제목이 입력되지 않았습니다.");
      return;
    }
    if (!content) {
      alert("내용이 입력되지 않았습니다.");
      return;
    }
    if (!price) {
      alert("가격을 입력해주세요.");
      return;
    }
    if (title.length < 3) {
      alert("제목이 너무 짧습니다. 최소 3자 이상으로 입력해주세요.");
      return;
    }
    if (content.length < 5) {
      alert("내용이 너무 짧습니다. 최소 5자 이상으로 입력해주세요.");
      return;
    }
    if (!(parseInt(price) >= 0)) {
      alert("가격 값이 잘못되었습니다. 올바른 값을 입력해주세요.");
      return;
    }

    // 오류가 없다면
    const postObject = {
      user_id: userId,
      modification: {
        title: title,
        content: content,
        category: categoryValue,
        isSoldout: false,
        image: image,
        price: price,
        visual_open: true,
        isHurry: checked,
        area_id: areaId,
      },
    };
    console.log(postObject);
    console.log("=============");
    const response = await Api.putProductUpdate(
      props.route.params.post_id,
      postObject
    );
    console.log(response);
    if (response.success === true) {
      alert("상품 수정이 정상적으로 완료되었습니다.");
      props.navigation.dispatch(CommonActions.navigate("Home"));
      return;
    } else {
      alert("상품 수정에 실패하였습니다.");
    }
  };

  const goAlert = () =>
    Alert.alert(
      "게시글",
      "게시글을 수정하시겠습니까?",
      [
        {
          text: "네",
          onPress: () => postEnroll(),
        },
        {
          text: "아니요",
          onPress: () => console.log("게시글 수정을 취소하였습니다."),
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
          <View style={[styles.viewRow]}>
            <View style={[styles.groundArea]}>
              <Text>분류 {">>"}</Text>
            </View>
            <View style={[styles.groundArea]}>
              <RNPickerSelect
                textInputProps={{ underlineColorAndroid: "transparent" }}
                useNativeAndroidPickerStyle={false}
                fixAndroidTouchableBug={true}
                items={[
                  { label: "초소량 거래", value: "초소량 거래" },
                  { label: "대여", value: "대여" },
                  { label: "배달비 쉐어", value: "배달비 쉐어" },
                  { label: "슈퍼맨", value: "슈퍼맨" },
                ]}
                value={categoryValue}
                onValueChange={(value) => onChangeCategory(value)}
              >
                <Text style={[styles.ground]}>{categoryValue}</Text>
              </RNPickerSelect>
            </View>
            <View style={[styles.groundArea]}>
              <Text>거래지역 {">>"}</Text>
            </View>
            <View style={[styles.groundArea]}>
              <RNPickerSelect
                textInputProps={{ underlineColorAndroid: "transparent" }}
                useNativeAndroidPickerStyle={false}
                fixAndroidTouchableBug={true}
                items={[
                  { label: "전체", value: "전체" },
                  { label: "학교앞", value: "학교앞" },
                  { label: "기숙사", value: "기숙사" },
                  { label: "구옥계", value: "구옥계" },
                  { label: "옥계중", value: "옥계중" },
                  { label: "거상빌딩", value: "거상빌딩" },
                ]}
                value={groundValue}
                onValueChange={(value) => onChangeGround(value)}
              >
                <Text style={[styles.ground]}>{groundValue}</Text>
              </RNPickerSelect>
            </View>
          </View>
          <View style={[styles.viewRow]}>
            <View style={[styles.groundArea]}>
              <Text>가격 {">>"}</Text>
            </View>
            <View style={styles.topArea}>
              <TextInput
                placeholder="가격을 입력하세요"
                style={styles.textFormTop}
                onChangeText={(price) => setPrice(price)}
                returnKeyType="next"
                keyboardType="default"
                onSubmitEditing={Keyboard.dismiss}
                value={price}
              />
            </View>
            <View style={[styles.groundArea]}>
              <Text style={{ marginRight: 10 }}> 원 </Text>
            </View>
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
          <View style={styles.btnArea}>
            <Button
              icon="camera"
              mode="contained"
              color="#F4D76E"
              onPress={() => uploadImage()}
            >
              사진 등록
            </Button>
          </View>
          {imageUrl ? imageBox(imageUrl) : null}
          <View style={styles.hurryArea}>
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={styles.hurryText}>긴급</Text>
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
    backgroundColor: Colors.pink50,
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
  viewRow: {
    flexDirection: "row",
    paddingLeft: 15,
    borderRadius: 7,
  },
  viewColumn: {
    padding: 15,
    flex: 1,
    marginRight: -20,
  },
  image: {
    height: 120,
    width: "100%",
  },
  groundArea: { margin: 1, justifyContent: "center" },
  ground: {
    backgroundColor: Colors.white,
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.blueGrey700,
    borderRadius: 12,
    margin: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 15,
    paddingTop: 10,
    elevation: 10,
    borderRadius: 7,
    justifyContent: "center",
  },
  textArea: {
    //글배경..?
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    alignItems: "center", //추가 - 여기서 가운데정렬됨
  },
  btnArea: {
    marginTop: -10,
    padding: 10,
    width: "40%",
  },
  btnArea2: {
    marginTop: -10,
    padding: 10,
    width: "10%",
    marginRight: 30,
  },
  TitleText: {
    fontSize: wp(8),
    paddingBottom: wp("1%"),
  },
  hurryText: {
    fontSize: 15,
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
    borderRadius: 7,
    width: "100%",
    height: hp(7),
    padding: 10,
  },
  textFormTop_s: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: "black",
    borderRadius: 7,
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
    fontSize: 13,
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
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 5,
    marginRight: 10,
  },
});
