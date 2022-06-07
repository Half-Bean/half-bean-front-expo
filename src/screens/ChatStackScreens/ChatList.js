import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Api from "../../../Api";

export default (props) => {
  const navigation = useNavigation();

  const imageBox = (image) => {
    let profile = "data:image/png;base64," + image;
    return (
      <View style={[styles.profile]}>
        <Image
          style={[styles.user_image]}
          source={{
            uri: profile,
          }}
        />
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("ChatScreen", {
            chatroom_id: item.chatroom_id,
            nickname: item.user.nickname,
          })
        }
      >
        <View style={[styles.view]}>
          <View style={[styles.nickborder]}>
            {imageBox(item.user.profile_image)}
            <View style={[styles.nickText]}>
              <View style={[styles.nicknameArea]}>
                <Text style={[styles.nickname]}>{item.user.nickname}</Text>
              </View>
              <View style={[styles.areaArea]}>
                <Text style={[styles.area]}>{item.chatmessage}</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getChatListRead();
    setIsRefreshing(false);
  };

  const getChatListRead = async () => {
    let response = await Api.postChatroomListRead(props.me);
    console.log(response);
    const post = await response.response.chatRooms;
    setData(post);
  };

  const getData = () => {
    setLoading(true);
    setData(props.crl);
    console.log(props.crl);
  };

  useEffect(() => {
    getData();
  }, [props, props.navigation]);

  return (
    <View style={[styles.back]}>
      <FlatList
        data={data}
        renderItem={renderItem}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <View style={[styles.empty]}>
            <Text style={[styles.emptyText]}> 생성된 채팅방이 없습니다...</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: Colors.blueGrey50,
    height: "94%",
    paddingBottom: 50,
    marginBottom: 10,
  },
  view: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 1,
    margin: 10,
    marginBottom: 1,
    elevation: 5,
    borderRadius: 10,
  },
  image: {
    flex: 1,
    width: 10,
    height: 60,
    alignItems: "flex-end",
    borderRadius: 5,
  },
  empty: {
    backgroundColor: Colors.blueGrey50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "50%",
  },
  emptyText: {
    fontSize: 15,
    fontStyle: "italic",
    color: Colors.grey700,
    fontWeight: "bold",
  },
  user_image: {
    borderRadius: 100,
    width: 60,
    height: 60,
    borderColor: "black",
    borderWidth: 2,
  },
  nickname: {
    color: Colors.blueGrey900,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  nickborder: {
    backgroundColor: "white",
    textAlign: "center",
    alignItems: "center",
    height: 90,
    flexDirection: "row",
  },
  profile: {
    padding: 5,
    marginLeft: 20,
  },
  nicknameArea: {
    padding: 10,
  },
  area: {
    color: Colors.blueGrey500,
    fontSize: 14,
  },
  areaArea: {
    paddingLeft: 10,
    paddingBottom: 10,
    marginTop: -5,
  },
  nickText: {
    flexDirection: "column",
    marginLeft: 10,
  },
});
