import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import Peed from "./Peed.js";
import { Colors, FAB } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Api from "../../../Api";

export default (props) => {
  const [groundValue, setGroundValue] = useState("전체");
  const [posts, setPosts] = useState();
  const [areaId, setAreaId] = useState(1);

  useEffect(async () => {
    await getProductsListRead();
  }, []);

  const NewProduct = () => (
    <FAB
      style={styles.fab}
      icon="plus"
      onPress={() => props.navigation.push("ProductEnroll")}
      //onPress={() => console.log("Pressed")}
    />
  );

  // Peed Load
  const getProductsListRead = async () => {
    //console.log(areaId);
    if (areaId === 1) {
      let response = await Api.getProductsListRead();
      const post = await response.data.response.posts;
      setPosts(post);
    } else {
      let response = await Api.getProductsOfAreaListRead(areaId);
      const post = await response.data.response.posts;
      //console.log(post);
      setPosts(post);
    }
  };

  const goApi = async () => {
    await getProductsListRead();
  };

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
      goApi();
    }
  };

  return (
    <SafeAreaView style={[styles.bg]}>
      <View style={{ height: "11%" }}>
        <View style={[styles.viewRow]}>
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
          <View style={[styles.viewRow]}>
            <View style={[styles.iconArea]}>
              <View style={[styles.icon]}>
                <MaterialCommunityIcons
                  name="cursor-default-click-outline"
                  size={20}
                  color="black"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flexGrow: 1 }}>
        <Peed post={posts} area={areaId} />
      </View>
      {NewProduct()}
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
    backgroundColor: Colors.blue50,
  },
  groundArea: { paddingTop: -5, margin: 1, marginTop: -5 },
  ground: {
    backgroundColor: Colors.white,
    fontSize: 20,
    width: "80%",
    height: "55%",
    fontWeight: "bold",
    color: Colors.blueGrey700,
    borderRadius: 12,
    margin: 20,
    padding: 20,
    paddingTop: 10,
    paddingBottom: -10,
    paddingRight: 5,
    elevation: 10,
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
