// import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
} from "react-native";
import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

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
      <SafeAreaView>
        <Text style={styles.pont}>
          닉네임 수정
          <Icon name="pencil" size={25} color="#696969" />
        </Text>

        <TextInput
          value={this.state.myTextInput}
          style={styles.input}
          onChangeText={this.onChangeInput}
        />

        <Text style={styles.pont}>
          ID 수정
          <Icon name="pencil" size={25} color="#696969" />
        </Text>
        <TextInput
          value={this.state.myTextInput}
          style={styles.input}
          onChangeText={this.onChangeInput}
        />

        <Text style={styles.pont}>Email : abc@kumoh.ac.kr</Text>
        <Text style={styles.pont}>등급 : 강낭콩</Text>

        <View style={styles.button}>
          <Button title={"수정 완료"} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pont: {
    height: 25,
    color: "#696969",
    fontSize: 20,
    marginTop: 0,
    marginBottom: 10,
    fontWeight: "500",
    textAlign: "center",
  },
  button: {
    marginTop: 30,
    marginLeft: 150,
    width: 100,
  },
  textInput: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
  showText: {
    marginTop: 10,
    fontSize: 25,
  },
  input: {
    width: "50%",
    backgroundColor: "#f5f5f5",
    left: 100,
    marginBottom: 20,
  },
});

export default MemberTextInput;
