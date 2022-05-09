import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import Peed from "./Peed.js";
import { Colors } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Api from "../../../Api";

export default (props) => {
  const [groundValue, setGroundValue] = useState("전체");
  const [posts, setPosts] = useState();
  const onChangeGround = (value) => {
    console.warn(value);
    setGroundValue(value);
  };

  useEffect(async () => {
    await getProductsListRead();
  }, []);

  const getProductsListRead = async () => {
    let response = await Api.getProductsListRead();
    const post = await response.data.response.posts;
    setPosts(post);
    console.log(response);
  };
  return (
    <SafeAreaView style={[styles.bg]}>
      <ScrollView>
        <View style={[styles.viewRow]}>
          <View style={[styles.groundArea]}>
            <RNPickerSelect
              textInputProps={{ underlineColorAndroid: "transparent" }}
              useNativeAndroidPickerStyle={false}
              fixAndroidTouchableBug={true}
              items={[
                { label: "전체", value: "전체" },
                { label: "학교 앞", value: "학교 앞" },
                { label: "구옥계", value: "구옥계" },
                { label: "옥계중", value: "옥계중" },
                { label: "기숙사", value: "기숙사" },
              ]}
              value={groundValue}
              onValueChange={(value) => onChangeGround(value)}
            >
              <Text style={[styles.ground]}>{groundValue}</Text>
            </RNPickerSelect>
          </View>
          <View>
            <View style={[styles.iconArea]}></View>
            <View style={[styles.icon]}>
              <MaterialCommunityIcons
                name="cursor-default-click-outline"
                size={20}
                color="black"
              />
            </View>
          </View>
        </View>
        <Peed post={posts} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: Colors.blue50,
  },
  groundArea: { paddingTop: 10, margin: 10 },
  ground: {
    backgroundColor: Colors.white,
    fontSize: 16,
    width: "100%",
    fontWeight: "bold",
    color: Colors.blueGrey700,
    borderRadius: 12,
    padding: 15,
    elevation: 5,
    justifyContent: "center",
  },
  viewRow: {
    padding: 5,
    flex: 1,
    flexDirection: "row",
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconArea: { paddingTop: 30, margin: 10 },
});
