import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
// MypageStackScreens
import MypageScreen from "../screens/MypageStackScreens/MypageScreen";
// ChatStackScreens
import ChatListScreen from "../screens/ChatStackScreens/ChatListScreen";
// NoticeStackScreens
import NoticeListScreen from "../screens/NoticeStackScreens/NoticeListScreen";
// ProductStackScreens
import ProductListScreen from "../screens/ProductStackScreens/ProductListScreen";
// HomeStackScreens
import ProductsAroundOfMe from "../screens/HomeStackScreens/ProductsAroundOfMe";
import MemberInfoUpdate from "../screens/MypageStackScreens/MemberInfoUpdate";

import BackBtn from "../components/BackBtn";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ProductStack = createStackNavigator();
const MypageStack = createStackNavigator();
const HomeStack = createStackNavigator();
const NoticeStack = createStackNavigator();
const ChatStack = createStackNavigator();

const ProductStackScreen = () => {
  return (
    <Stack.Navigator>
      <ProductStack.Screen
        name="Product"
        component={ProductListScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MypageStackScreen = () => {
  return (
    <Stack.Navigator>
      <MypageStack.Screen
        name="Mypage"
        component={MypageScreen}
        options={{ headerShown: false }}
      />
      <MypageStack.Screen
        name="MypageUpdate"
        component={MemberInfoUpdate}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={ProductsAroundOfMe}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const NoticeStackScreen = () => {
  return (
    <Stack.Navigator>
      <NoticeStack.Screen
        name="Notice"
        component={NoticeListScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ChatStackScreen = () => {
  return (
    <Stack.Navigator>
      <ChatStack.Screen
        name="Chat"
        component={ChatListScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MainTabScreen = ({ navigation, route }) => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "ProductStack") {
            iconName = focused ? "ios-cube" : "ios-cube-outline";
          } else if (route.name === "MypageStack") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "HomeStack") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "NoticeStack") {
            iconName = focused
              ? "notifications-circle"
              : "notifications-circle-outline";
          } else if (route.name === "ChatStack") {
            iconName = focused ? "ios-chatbubble" : "ios-chatbubble-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "lightgray",
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="ProductStack"
        component={ProductStackScreen}
        options={{
          gestureEnabled: false,
          title: "거래마켓",
          //headerBackTitleVisible: false,
          //headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="MypageStack"
        component={MypageStackScreen}
        options={{
          gestureEnabled: false,
          title: "마이페이지",
          //headerBackTitleVisible: false,
          //headerTitleAlign: "center",
          headerBackImage: BackBtn,
        }}
      />
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          gestureEnabled: false,
          title: "내 주변",
          //headerBackTitleVisible: false,
          //headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="NoticeStack"
        component={NoticeStackScreen}
        options={{
          gestureEnabled: false,
          title: "내 알람",
          //headerBackTitleVisible: false,
          //headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="ChatStack"
        component={ChatStackScreen}
        options={{
          gestureEnabled: false,
          title: "채팅",
          //headerBackTitleVisible: false,
          //headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
};

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          gestureEnabled: false,
          title: "",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          gestureEnabled: false,
          title: "",
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainTab"
        component={MainTabScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
