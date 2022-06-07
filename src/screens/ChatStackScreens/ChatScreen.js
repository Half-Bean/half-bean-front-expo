//import React from "react";
import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useRoute } from "@react-navigation/native";
import { getTotalDiskCapacityAsync } from "expo-file-system";
import client from "../../socket-io/client";
import Api from "../../../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

export default (props) => {
  const route = useRoute();
  const [userId, setUserId] = useState("");
  const [data, setData] = useState();
  const [messages, setMessages] = useState([]);

  const getData = async (userId) => {
    const response = await Api.postChatRead(props.route.params.chatroom_id);
    const chattings = await response.response.chattings;
    console.log(chattings);
    console.log("==================");
    console.log(response.response.count);
    setData(chattings);
    if (response.response.count === 0) {
      if (props.route.params.post_title) {
        setMessages([
          {
            _id: 1,
            text:
              "이 글은 [[" +
              props.route.params.post_title +
              "]] 글로부터 시작된 채팅입니다.",
            createdAt: new Date(),
            user: {
              _id: 2,
              //name: "React Native",
              avatar:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAAC3CAIAAADCcmZTAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATYSURBVHhe7d29ayRlAMfxxDuMoKKgoKCn2NkIVhYKVwgWl0LxBURPREREEJTjrAULr7CwOCtFtFYs/AtsFMRK4UBBTVL4UpgEQZOrfXZnTHYnG/PiL8m8fB4+hN3ZSViYL89Mdh6SubXNZYgQEzFiIkZMxIiJGDERIyZixESMmIgREzFiIkZMxIiJGDERIyZixESMmIgREzFiIkZMxIiJGDERIyZixESMmIgREzFiIkZMxIiJGDERIyZixESMmIgREzFiIkZMxAwlptXNpbXNlbXR1+ZLpAxwZtLTURlITAI6Dp2PqZy/1refjh5PPOVYdTumUtKvf1+pHuxsaObGMRPVkeh2TLtPQuVau7GFI9fHa6arSjoZPYtJRiepjzMTJ6QPMW1daI+/duni+pPPP77r7juL995/p/FSF5mZTsyXP396zan5uWrMz517+0xjh87pdkzrV1fKtDR5n+Tyh5fKoakO0usXXxlvnHkhdfITWJmWxh3VY35+ruvzU59mpqXrbz1dH5mJsWO3VigllXoaY+G6hcZu3dLtmMbT0vbT+phMj8kd2qNcJ9Xvb3o0duuWPs1MXYrp5YvP1u9vYrzw0vnGbt0iphPz6OPn6rc4Hvc/fUtjh87pXEyTnwI0r6yfee7J+sj8Ox5+5GzZs50fGfy2/sNjTyxW77MHJRXdiqkZxB8bP04+LYenOjbVePHNxV/+Gt0GbrPvl79pbOmuXp3mijfefb4q6aFXb5t+qZ13Wnp1/6ejMc08BvXGclL7ae3r6WmsV8estTo7M9VLA/ZTiZKOSd9OczPTqW7etfMyvE/6F9PI+nZS5cGsgKx5OgKdjGn3OWYqkVnLdjV0hPo5M+1icrra2kjMMGJyUjsWQ4hpj5Ke+uCeMw/ckF1OVH7mTXdcW/RgldL+9T6mveekauHK6YX5xvZDKyUt3Hiq+uw0+GPbr98x7evsVh31MhrbD2eypDL6cdNtn4ZxzfSfyuRRHfgHm3dgDmzIJRVDj2l1c+mL7z7bWm7wf3oql0dDLqkwM438/uf2coND9FRdbtffPx4DLKkQU+21t87XIRywp8aprYxhllSIaWS0lnxj6cryV5PL6/b8xX7nhHTv4s0Xvr2vsdtwiGlk667L5PnuoGOwE9IWMTVd+uhCXcdBhpIKMdXWp2+5nL1we53JXkNGW8REjJi2NSYnDkpMUyZW1XFgYtphPD+p6hDERIyYiBETMWIiRkzEiIkYMREjJmLERIyYiBETMWIiRkzEiIkYMREjpo5Z3WjvX1IUUweM/0XMytqu/7+6LcREjJiIERMxYmq1WX8wuL3ERIyY2mzGpwDj3+yaG1tCTC01M5o2l1SIiRgxESOmNmr56Ww3YiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJgI2Vz+B/0FiQ6CNpa1AAAAAElFTkSuQmCC",
            },
          },
        ]);

        client.emit("message", {
          receiver_nickname: props.route.params.nickname,
          message:
            "이 글은 [[" +
            props.route.params.post_title +
            "]] 글로부터 시작된 채팅입니다.",
          user_id: userId,
          chatroom_id: props.route.params.chatroom_id,
        });
      }
    } else {
      console.log(chattings);
      const message = chattings.map((i, idx) => {
        console.log(i.user_id, userId);
        if (i.user_id === userId) {
          const m = {
            _id: 2,
            text: i.message,
            createdAt: new Date(i.createdAt),
            user: {
              _id: 1,
            },
          };
          return m;
        } else {
          console.log("in");
          const m = {
            _id: 1,
            text: i.message,
            createdAt: new Date(i.createdAt),
            user: {
              _id: 2,
              avatar:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAAC3CAIAAADCcmZTAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATYSURBVHhe7d29ayRlAMfxxDuMoKKgoKCn2NkIVhYKVwgWl0LxBURPREREEJTjrAULr7CwOCtFtFYs/AtsFMRK4UBBTVL4UpgEQZOrfXZnTHYnG/PiL8m8fB4+hN3ZSViYL89Mdh6SubXNZYgQEzFiIkZMxIiJGDERIyZixESMmIgREzFiIkZMxIiJGDERIyZixESMmIgREzFiIkZMxIiJGDERIyZixESMmIgREzFiIkZMxIiJGDERIyZixESMmIgREzFiIkZMxAwlptXNpbXNlbXR1+ZLpAxwZtLTURlITAI6Dp2PqZy/1refjh5PPOVYdTumUtKvf1+pHuxsaObGMRPVkeh2TLtPQuVau7GFI9fHa6arSjoZPYtJRiepjzMTJ6QPMW1daI+/duni+pPPP77r7juL995/p/FSF5mZTsyXP396zan5uWrMz517+0xjh87pdkzrV1fKtDR5n+Tyh5fKoakO0usXXxlvnHkhdfITWJmWxh3VY35+ruvzU59mpqXrbz1dH5mJsWO3VigllXoaY+G6hcZu3dLtmMbT0vbT+phMj8kd2qNcJ9Xvb3o0duuWPs1MXYrp5YvP1u9vYrzw0vnGbt0iphPz6OPn6rc4Hvc/fUtjh87pXEyTnwI0r6yfee7J+sj8Ox5+5GzZs50fGfy2/sNjTyxW77MHJRXdiqkZxB8bP04+LYenOjbVePHNxV/+Gt0GbrPvl79pbOmuXp3mijfefb4q6aFXb5t+qZ13Wnp1/6ejMc08BvXGclL7ae3r6WmsV8estTo7M9VLA/ZTiZKOSd9OczPTqW7etfMyvE/6F9PI+nZS5cGsgKx5OgKdjGn3OWYqkVnLdjV0hPo5M+1icrra2kjMMGJyUjsWQ4hpj5Ke+uCeMw/ckF1OVH7mTXdcW/RgldL+9T6mveekauHK6YX5xvZDKyUt3Hiq+uw0+GPbr98x7evsVh31MhrbD2eypDL6cdNtn4ZxzfSfyuRRHfgHm3dgDmzIJRVDj2l1c+mL7z7bWm7wf3oql0dDLqkwM438/uf2coND9FRdbtffPx4DLKkQU+21t87XIRywp8aprYxhllSIaWS0lnxj6cryV5PL6/b8xX7nhHTv4s0Xvr2vsdtwiGlk667L5PnuoGOwE9IWMTVd+uhCXcdBhpIKMdXWp2+5nL1we53JXkNGW8REjJi2NSYnDkpMUyZW1XFgYtphPD+p6hDERIyYiBETMWIiRkzEiIkYMREjJmLERIyYiBETMWIiRkzEiIkYMREjpo5Z3WjvX1IUUweM/0XMytqu/7+6LcREjJiIERMxYmq1WX8wuL3ERIyY2mzGpwDj3+yaG1tCTC01M5o2l1SIiRgxESOmNmr56Ww3YiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJgI2Vz+B/0FiQ6CNpa1AAAAAElFTkSuQmCC",
            },
          };
          return m;
        }
      });
      setMessages(message);
    }
  };

  useEffect(async () => {
    await AsyncStorage.getItem("user", async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let UserInfo = JSON.parse(result);
        setUserId(UserInfo.user_id);
        console.log("user_id : " + UserInfo.user_id);
        await getData(UserInfo.user_id);
      }
    });
  }, []);

  const onSend = useCallback(async (messages = []) => {
    await AsyncStorage.getItem("user", async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let UserInfo = JSON.parse(result);
        console.log("user_id : " + UserInfo.user_id);
        client.emit("message", {
          receiver_nickname: props.route.params.nickname,
          message: messages[0].text,
          user_id: UserInfo.user_id,
          chatroom_id: props.route.params.chatroom_id,
        });
      }
    });
    //console.log("previousMessages: ", previousMessages);
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
};
