// Import React and Component
import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem("user_id").then((value) =>
        navigation.replace(value === null ? "Auth" : "MainTab")
      );
    }, 3000);
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

export default SplashScreen;

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
