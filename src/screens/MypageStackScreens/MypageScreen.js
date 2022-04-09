import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/AntDesign";

export default (props) => {
  return (
    <ScrollView>
      <SafeAreaView>
        <Ionicons name="person-circle" size={100} color="#696969" />
        <View>
          <Text style={styles.membersty}>
            닉네임 : 막걸리에 파전{"\n"}
            ID : abc {"\n"}
            Email : abc@kumoh.ac.kr {"\n"}
            등급 : 강낭콩
          </Text>

          <Button
            title={"수정"}
            onPress={() => props.navigation.push("MypageUpdate")}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.buttonContainer}>
            <Icon name="form" size={30} color="#696969" />
            내가 등록한 상품 조회
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.buttonContainer}>
            <Icon name="hearto" size={30} color="#696969" />
            내가 찜한 상품 조회
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.buttonContainer}>
            <Icon name="inbox" size={30} color="#696969" />
            내가 거래한 상품 조회
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  Title: {
    height: 60,
    color: "#fff",
    fontSize: 35,
    marginTop: 0,
    marginBottom: 30,
    fontWeight: "500",
    textAlign: "center",
    backgroundColor: "#48d1cc",
  },
  card: {
    backgroundColor: "#b0e0e6",
    flex: 1,
    borderTopLeftRadius: 10, // to provide rounded corners
    borderTopRightRadius: 10, // to provide rounded corners
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 24,
    marginLeft: 20,
  },
});
