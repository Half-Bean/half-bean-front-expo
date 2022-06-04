//import React from "react";
import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

const { height, width } = Dimensions.get("window");

export default (props) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "안녕하세요! 반가워요 :D",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    // console.log('previousMessages: ',previousMessages)
    console.log("messages: ", messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        placeholder={"메세지를 입력하세요..."}
        alwaysShowSend={true}
        messages={messages}
        textInputProps={{ keyboardAppearance: "dark", autoCorrect: false }}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
  // return (
  //   <SafeAreaView>
  //     {/* <ChatChannel /> */}
  //     {/* <Chatting /> */}
  //     {/* <MassageScreen /> */}
  //     {/* <Message /> */}
  //     <ChatScreen />
  //   </SafeAreaView>
  // );
};
