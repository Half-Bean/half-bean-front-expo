// import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// const MemberTextInput = () => {

//     state = {
//         text: '',
//         inputText: ''
//     }

//     submitBtn = () => {
//         this.setState({text: this.state.inputText});
//     }

class MemberTextInput extends Component {
  state = {
    myTextInput: "",
  };

  onChangeInput = (event) => {
    this.setState({
      myTextInput: event,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topArea}> 
          <SafeAreaView>
            <Text style={styles.TextArea}>
              닉네임 수정
              <View style={styles.Ic}>
              <Icon name="pencil" size={25} color="#696969" />
              </View>
            </Text>

            <TextInput
              value={this.state.myTextInput}
              style={styles.input}
              onChangeText={this.onChangeInput}
            />

            <Text style={styles.TextArea}>
              ID 수정
              <View style={styles.Ic}>
                <Icon name="pencil" size={25} color="#696969" />
              </View>
            </Text>

            <View style={styles.formArea}>
            <TextInput
              value={this.state.myTextInput}
              style={styles.input}
              onChangeText={this.onChangeInput}
            />
            </View>

            <Text style={styles.TextArea}>Email : abc@kumoh.ac.kr</Text>
            <Text style={styles.TextArea}>등급 : 강낭콩</Text>
{/* 
            <View style={styles.btn}>
              <Button title={"수정 완료"} />
            </View> */}

            <TouchableOpacity
              style={styles.btn}
              onPress={() =>props.navigation.push("MypageScreen")}
            >
              <Text style={{ color: "black", fontSize: wp("4%") }}>수정 완료</Text>
            </TouchableOpacity>

          </SafeAreaView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { //배경 공간
    flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: "column",
    backgroundColor: "white",
    paddingLeft: wp(7),
    paddingRight: wp(7),
  }, 
  topArea: { //상단탭..?
    flex: 1,
    paddingTop: wp(4),
    paddingBottom: wp(4),
  },
  TextArea: { //글배경..?
    flex: 0.3,
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: wp(1),
    paddingBottom: wp(7),
    alignItems: "center" //추가 - 여기서 가운데정렬됨
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
    height: hp(6),
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BCD593",
  },
  formArea: {
    justifyContent: "center",
    flex: 1.5,
  },
  Ic: {
    paddingLeft: 10,
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  // },
  // pont: {
  //   height: 25,
  //   color: "#696969",
  //   fontSize: 20,
  //   marginTop: 0,
  //   marginBottom: 10,
  //   fontWeight: "500",
  //   textAlign: "center",
  // },
  // button: {
  //   marginTop: 30,
  //   marginLeft: 150,
  //   width: 100,
  // },
  // textInput: {
  //   marginTop: 20,
  //   marginBottom: 10,
  //   paddingHorizontal: 10,
  //   height: 40,
  //   borderRadius: 10,
  //   borderColor: "gray",
  //   borderWidth: 1,
  // },
  // showText: {
  //   marginTop: 10,
  //   fontSize: 25,
  // },
  input: {
    width: "50%",
    backgroundColor: "#f5f5f5",
    left: 100,
    marginBottom: 20,
  },
});

export default MemberTextInput;
