import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default (props) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.topArea}>
            <View style={styles.TextArea_s}>
              <Text style={styles.Text}>
                <View style={styles.Ic}>
                  <Icon name="photo" size={30} color="#696969" />
                </View>
                등록 게시물 1
              </Text>
            </View>
            <View style={styles.TextArea_s}>
              <Text style={styles.Text}>
                <View style={styles.Ic}>
                  <Icon name="photo" size={30} color="#696969" />
                </View>
                등록 게시물 2
              </Text>
            </View>
            <View style={styles.TextArea_s}>
              <Text style={styles.Text}>
                <View style={styles.Ic}>
                  <Icon name="photo" size={30} color="#696969" />
                </View>
                등록 게시물 3
              </Text>
            </View>
            <View style={styles.TextArea_s}>
              <Text style={styles.Text}>
                <View style={styles.Ic}>
                  <Icon name="photo" size={30} color="#696969" />
                </View>
                등록 게시물 4
              </Text>
            </View>

            <View style={styles.btn_s}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => props.navigation.push("ProductEnroll")}
              >
                <Text style={{ color: "black", fontSize: wp("4%") }}>등록</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.btn_s1}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => props.navigation.push("ProductUpdate")}
              >
                <Text style={{ color: "black", fontSize: wp("4%") }}>수정</Text>
              </TouchableOpacity>
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
    paddingTop: wp(4),
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
    width: "50%",
    height: hp(6),
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BCD593",
  },
  btn_s: {
    alignItems: "center",
    paddingTop: hp("15"),
  },
  btn_s1: {
    alignItems: "center",
    paddingTop: hp("5"),
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
    paddingTop: wp(3),
    paddingBottom: wp(3),
    alignItems: "center", //추가 - 여기서 가운데정렬됨
  },
});
