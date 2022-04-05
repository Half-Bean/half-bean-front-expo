import React from "react";
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MemberTextInput from "./MemberTextInput";

const MemberInfoUpdate = () => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.buttonContainer}>
            <Ionicons name="person-circle" size={100} color="#696969" />
          </Text>
          <MemberTextInput />
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
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
    marginBottom: 30,
  },
});

export default MemberInfoUpdate;
// import React from "react";
// import { SafeAreaView, ScrollView, Text } from "react-native";

// const MemberInfoUpdate = () => {
//   return (
//     <ScrollView>
//       <SafeAreaView>
//         <Text>MemberInfoUpdate</Text>
//       </SafeAreaView>
//     </ScrollView>
//   );
// };

// export default MemberInfoUpdate;
