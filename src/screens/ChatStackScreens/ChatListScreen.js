import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import ChatList from "./ChatList.js";
import { Colors } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../../Api";

export default (props) => {
  const [userId, setUserId] = useState();

  useEffect(async () => {
    await AsyncStorage.getItem("user", async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let UserInfo = JSON.parse(result);
        setUserId(UserInfo.user_id);
        console.log("user_id : " + UserInfo.user_id);
        await getChatroomListRead(UserInfo.user_id);
      }
    });
  }, []);

  const [crList, setCrList] = useState([]);
  // chatroom list Load
  const getChatroomListRead = async (user_id) => {
    let response = await Api.postChatroomListRead(user_id);
    const crl = await response.response.chatRooms;
    setCrList(crl);
  };

  return (
    <SafeAreaView style={[styles.bg]}>
      <View style={{ height: "11%" }}>
        <View style={[styles.viewRow]}>
          <Text style={[styles.ground]}>내 채팅 목록</Text>
        </View>
      </View>
      <View style={{ flexGrow: 1 }}>
        <ChatList crl={crList} me={userId} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fab: {
    flex: 1,
    position: "absolute",
    margin: 16,
    right: 10,
    bottom: 50,
  },
  bg: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  groundArea: { paddingTop: -5, margin: 1, marginTop: -5 },
  ground: {
    fontSize: 20,
    width: "80%",
    height: "55%",
    fontWeight: "bold",
    color: Colors.black,
    margin: 20,
    padding: 20,
    paddingTop: 10,
    paddingBottom: -10,
    paddingRight: 10,
    justifyContent: "center",
  },
  viewRow: {
    padding: -5,
    flex: 1,
    flexDirection: "row",
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconArea: { paddingTop: 30, margin: 10, marginLeft: 10 },
});
