import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default (props) => {
  const navigation = useNavigation();

  const isHurryTag = () => {
    return <Text style={[styles.type]}>긴급</Text>;
  };

  const categoryTag = (tag) => {
    if (tag === "초소량 거래") {
      return <Text style={[styles.type1]}>{tag}</Text>;
    }
    if (tag === "대여") {
      return <Text style={[styles.type2]}>{tag}</Text>;
    }
    if (tag === "배달비 쉐어") {
      return <Text style={[styles.type3]}>{tag}</Text>;
    }
    if (tag === "슈퍼맨") {
      return <Text style={[styles.type4]}>{tag}</Text>;
    }
  };

  const imageBox = (image) => {
    let i =
      "data:image/png;base64," +
      "iVBORw0KGgoAAAANSUhEUgAAAMQAAAC3CAIAAADCcmZTAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATYSURBVHhe7d29ayRlAMfxxDuMoKKgoKCn2NkIVhYKVwgWl0LxBURPREREEJTjrAULr7CwOCtFtFYs/AtsFMRK4UBBTVL4UpgEQZOrfXZnTHYnG/PiL8m8fB4+hN3ZSViYL89Mdh6SubXNZYgQEzFiIkZMxIiJGDERIyZixESMmIgREzFiIkZMxIiJGDERIyZixESMmIgREzFiIkZMxIiJGDERIyZixESMmIgREzFiIkZMxIiJGDERIyZixESMmIgREzFiIkZMxAwlptXNpbXNlbXR1+ZLpAxwZtLTURlITAI6Dp2PqZy/1refjh5PPOVYdTumUtKvf1+pHuxsaObGMRPVkeh2TLtPQuVau7GFI9fHa6arSjoZPYtJRiepjzMTJ6QPMW1daI+/duni+pPPP77r7juL995/p/FSF5mZTsyXP396zan5uWrMz517+0xjh87pdkzrV1fKtDR5n+Tyh5fKoakO0usXXxlvnHkhdfITWJmWxh3VY35+ruvzU59mpqXrbz1dH5mJsWO3VigllXoaY+G6hcZu3dLtmMbT0vbT+phMj8kd2qNcJ9Xvb3o0duuWPs1MXYrp5YvP1u9vYrzw0vnGbt0iphPz6OPn6rc4Hvc/fUtjh87pXEyTnwI0r6yfee7J+sj8Ox5+5GzZs50fGfy2/sNjTyxW77MHJRXdiqkZxB8bP04+LYenOjbVePHNxV/+Gt0GbrPvl79pbOmuXp3mijfefb4q6aFXb5t+qZ13Wnp1/6ejMc08BvXGclL7ae3r6WmsV8estTo7M9VLA/ZTiZKOSd9OczPTqW7etfMyvE/6F9PI+nZS5cGsgKx5OgKdjGn3OWYqkVnLdjV0hPo5M+1icrra2kjMMGJyUjsWQ4hpj5Ke+uCeMw/ckF1OVH7mTXdcW/RgldL+9T6mveekauHK6YX5xvZDKyUt3Hiq+uw0+GPbr98x7evsVh31MhrbD2eypDL6cdNtn4ZxzfSfyuRRHfgHm3dgDmzIJRVDj2l1c+mL7z7bWm7wf3oql0dDLqkwM438/uf2coND9FRdbtffPx4DLKkQU+21t87XIRywp8aprYxhllSIaWS0lnxj6cryV5PL6/b8xX7nhHTv4s0Xvr2vsdtwiGlk667L5PnuoGOwE9IWMTVd+uhCXcdBhpIKMdXWp2+5nL1we53JXkNGW8REjJi2NSYnDkpMUyZW1XFgYtphPD+p6hDERIyYiBETMWIiRkzEiIkYMREjJmLERIyYiBETMWIiRkzEiIkYMREjpo5Z3WjvX1IUUweM/0XMytqu/7+6LcREjJiIERMxYmq1WX8wuL3ERIyY2mzGpwDj3+yaG1tCTC01M5o2l1SIiRgxESOmNmr56Ww3YiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJiIERMxYiJGTMSIiRgxESMmYsREjJgI2Vz+B/0FiQ6CNpa1AAAAAElFTkSuQmCC";
    return (
      <View style={[styles.viewColumn]}>
        <Image
          style={[styles.image]}
          source={{
            uri: i,
          }}
        />
      </View>
    );
  };

  const displayedAt = (createdAt) => {
    const milliSeconds = new Date() - Date.parse(createdAt);
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("NewProductRead", { post_id: item.post_id })
        }
      >
        <View style={[styles.view]}>
          <View style={[styles.viewRow2]}>
            {item.isHurry === true ? isHurryTag() : null}
            {categoryTag(item.category)}
            <Text style={[styles.title]} numberOfLines={1}>
              {item.title}
            </Text>
          </View>
          <View style={[styles.writeArea]}>
            <Text style={[styles.write]}>{item.User.nickname}</Text>
            <Text style={[styles.write2]}>님이</Text>
            <Text style={[styles.date]}> {displayedAt(item.createdAt)} </Text>
            <Text style={[styles.write2]}>등록한 상품입니다.</Text>
          </View>
          <View style={[styles.viewRow]}>
            <View style={[styles.viewColumn2]}>
              <View>
                <Text style={[styles.content]} numberOfLines={4}>
                  {item.content}
                </Text>
              </View>
            </View>
            {!item.image ? imageBox(item.image) : null}
          </View>
        </View>
      </Pressable>
    );
  };

  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    setData(props.post);
  };

  useEffect(() => {
    getData();
  }, [props, props.navigation]);

  return (
    <View style={[styles.bg]}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <View style={[styles.empty]}>
            <Text style={[styles.emptyText]}> 등록된 상품이 없습니다....</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: Colors.blueGrey50,
    height: "94%",
    paddingBottom: 50,
    marginBottom: 10,
  },
  view: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 20,
    marginTop: 20,
    marginBottom: -5,
    margin: 10,
    elevation: 5,
    borderRadius: 10,
  },
  viewColumn: {
    //padding: 5,
    flex: 1,
    flexDirection: "column",
  },
  viewRow2: {
    //padding: 5,
    flex: 1,
    flexDirection: "row",
  },
  viewRow: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.blue100,
    borderRadius: 10,
    marginTop: 5,
  },
  viewColumn2: {
    padding: 5,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flexDirection: "column",
  },
  type: {
    fontSize: 15,
    backgroundColor: Colors.red300,
    borderRadius: 5,
    fontWeight: "bold",
    padding: 3,
    paddingLeft: 2,
    paddingRight: 2,
    marginRight: 5,
  },
  type1: {
    fontSize: 15,
    backgroundColor: Colors.green200,
    borderRadius: 5,
    fontWeight: "bold",
    padding: 3,
    paddingLeft: 2,
    paddingRight: 2,
    marginRight: 5,
  },
  type2: {
    fontSize: 15,
    backgroundColor: Colors.amber200,
    borderRadius: 5,
    fontWeight: "bold",
    padding: 3,
    paddingLeft: 2,
    paddingRight: 2,
    marginRight: 5,
  },
  type3: {
    fontSize: 15,
    backgroundColor: Colors.purple200,
    borderRadius: 5,
    fontWeight: "bold",
    padding: 3,
    paddingLeft: 2,
    paddingRight: 2,
    marginRight: 5,
  },
  type4: {
    fontSize: 15,
    backgroundColor: Colors.blue400,
    borderRadius: 5,
    fontWeight: "bold",
    padding: 3,
    paddingLeft: 2,
    paddingRight: 2,
    marginRight: 5,
  },
  content: {
    fontSize: 15,
  },
  write: {
    marginRight: 5,
    fontSize: 15,
    color: Colors.blue500,
    fontWeight: "bold",
  },
  write2: {
    margin: 2,
    fontSize: 13,
    color: Colors.blueGrey500,
  },
  writeArea: {
    paddingLeft: 1,
    flex: 1,
    flexDirection: "row",
  },
  image: {
    flex: 1,
    height: 100,
    width: "100%",
    alignItems: "flex-end",
    backgroundColor: Colors.amber500,
  },
  date: {
    fontSize: 14,
    color: Colors.amber700,
    marginTop: 1,
    fontWeight: "bold",
  },
  dateArea: {
    paddingTop: 10,
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
});
