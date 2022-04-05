import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigation/MainStack";

export default function App() {
  return (
    <>
      <StatusBar />
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          paddingTop: Platform.OS === "android" ? 25 : 0,
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            maxWidth: 720,
          }}
        >
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
