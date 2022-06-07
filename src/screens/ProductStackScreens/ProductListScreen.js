import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import ProductsList from "./ProductsList.js";
import { Colors, FAB } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Api from "../../../Api";

export default (props) => {
  const [groundValue, setGroundValue] = useState("초소량 거래");
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
    let response = await Api.getProductsOfCategoryListRead(groundValue);
    const post = await response.data.response.posts;
    //console.log(post);
    setPosts(post);
  };

  // 위치가 바뀌면
  const onChangeGround = async (value) => {
    setGroundValue(value);
    let response = await Api.getProductsOfCategoryListRead(value);
    const post = await response.data.response.posts;
    //console.log(post);
    setPosts(post);
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
                { label: "초소량 거래", value: "초소량 거래" },
                { label: "대여", value: "대여" },
                { label: "배달비 쉐어", value: "배달비 쉐어" },
                { label: "슈퍼맨", value: "슈퍼맨" },
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
        <ProductsList post={posts} category={groundValue} />
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
    backgroundColor: Colors.lime50,
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
    paddingRight: 10,
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
