// Import React and Component
import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default (props) => {
  const [animating, setAnimating] = useState(true);

  const isLogin = async () => {
    const user = await AsyncStorage.getItem("user");
    console.log(user === null);
    if (user) {
      props.navigation.navigate("MainTab", { loading: false });
    } else {
      props.navigation.navigate("Auth", { loading: false });
      //props.navigation.navigate("MainTab", { loading: false });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      isLogin();
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../image/logo_white.png")}
        style={{
          width: wp(55),
          resizeMode: "contain",
          marginTop: 30,
          marginBottom: -100,
        }}
      />
      <Image
        source={require("../image/logoTitle.png")}
        style={{ width: wp(50), resizeMode: "contain", marginTop: 20 }}
      />
      <Text style={{ marginTop: -75, paddingBottom: 20 }}>
        금오공대 초소형 거래마켓
      </Text>
      <ActivityIndicator
        animating={animating}
        color="#6990F7"
        size="large"
        style={styles.activityIndicator}
      />
      <Text
        style={{
          fontStyle: "italic",
          fontSize: wp(4),
          color: "gray",
          paddingTop: 40,
        }}
      >
        from 콩반쪽제작팀
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  activityIndicator: {
    alignItems: "center",
    height: 30,
  },
});
