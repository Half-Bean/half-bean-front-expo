import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
// MypageStackScreens
import MypageScreen from "../screens/MypageStackScreens/MypageScreen";
import MemberInfoUpdate from "../screens/MypageStackScreens/MemberInfoUpdate";
import MyProductListScreen from "../screens/MypageStackScreens/MyProductListScreen";
import MyProductsList from "../screens/MypageStackScreens/MyProductsList";
import MyWishListScreen from "../screens/MypageStackScreens/MyWishListScreen";
import MyProductDealScreen from "../screens/MypageStackScreens/MyProductDealScreen";
import MyProductRead from "../screens/MypageStackScreens/MyProductRead";
// ChatStackScreens
import ChatListScreen from "../screens/ChatStackScreens/ChatListScreen";
import ChatScreen from "../screens/ChatStackScreens/ChatScreen";
// ProductStackScreens
import ProductListScreen from "../screens/ProductStackScreens/ProductListScreen";
import ProductEnroll from "../screens/ProductStackScreens/ProductEnroll";
import ProductUpdate from "../screens/ProductStackScreens/ProductUpdate";
import ProductRead from "../screens/ProductStackScreens/ProductRead";
import ProductsList from "../screens/ProductStackScreens/ProductsList";
// HomeStackScreens
import ProductsAroundOfMe from "../screens/HomeStackScreens/ProductsAroundOfMe";
import NewProductRead from "../screens/HomeStackScreens/NewProductRead";
import Peed from "../screens/HomeStackScreens/Peed";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ProductStack = createStackNavigator();
const MypageStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ChatStack = createStackNavigator();

const ProductStackScreen = () => {
  return (
    <Stack.Navigator>
      <ProductStack.Screen
        name="Product"
        component={ProductListScreen}
        options={{ headerShown: false }}
      />
      <ProductStack.Screen
        name="ProductsList"
        component={ProductsList}
        options={{ headerShown: false }}
      />
      <ProductStack.Screen
        name="ProductRead"
        component={ProductRead}
        options={{
          gestureEnabled: false,
          title: "",
          headerBackTitleVisible: false,
        }}
      />
      <ProductStack.Screen
        name="ProductEnroll"
        component={ProductEnroll}
        options={{
          gestureEnabled: false,
          title: "",
          headerBackTitleVisible: false,
        }}
      />
      <ProductStack.Screen
        name="ProductUpdate"
        component={ProductUpdate}
        options={{
          gestureEnabled: false,
          title: "",
          headerBackTitleVisible: false,
        }}
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
        options={{
          gestureEnabled: false,
          title: "",
          headerBackTitleVisible: false,
        }}
      />
      <MypageStack.Screen
        name="MyProductsList"
        component={MyProductsList}
        options={{
          gestureEnabled: false,
          title: "",
          headerBackTitleVisible: false,
        }}
      />
      <MypageStack.Screen
        name="MyProductListScreen"
        component={MyProductListScreen}
        options={{
          gestureEnabled: false,
          title: "",
          headerBackTitleVisible: false,
        }}
      />
      <MypageStack.Screen
        name="MyWishListScreen"
        component={MyWishListScreen}
        options={{
          gestureEnabled: false,
          title: "",
          headerBackTitleVisible: false,
        }}
      />
      <MypageStack.Screen
        name="MyProductDealScreen"
        component={MyProductDealScreen}
        options={{
          gestureEnabled: false,
          title: "",
          headerBackTitleVisible: false,
        }}
      />
      <MypageStack.Screen
        name="MyProductRead"
        component={MyProductRead}
        options={{
          gestureEnabled: false,
          title: "",
          headerBackTitleVisible: false,
        }}
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
      <HomeStack.Screen
        name="Peed"
        component={Peed}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="NewProductRead"
        component={NewProductRead}
        options={{
          gestureEnabled: false,
          title: "",
          headerBackTitleVisible: false,
        }}
      />
      <HomeStack.Screen
        name="ProductEnroll"
        component={ProductEnroll}
        options={{
          gestureEnabled: false,
          title: "",
          headerBackTitleVisible: false,
        }}
      />
      <HomeStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          gestureEnabled: false,
          title: "",
          headerBackTitleVisible: false,
        }}
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
      <ChatStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          gestureEnabled: false,
          title: "",
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const MainTabScreen = ({ navigation, route }) => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={({ route }) => ({
        activeTintColor: "black",
        inactiveTintColor: "lightgray",
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "ProductStack") {
            iconName = focused ? "ios-cube" : "ios-cube-outline";
          } else if (route.name === "MypageStack") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "HomeStack") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "ChatStack") {
            iconName = focused ? "ios-chatbubble" : "ios-chatbubble-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProductStack"
        component={ProductStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ChatStack"
        component={ChatStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MypageStack"
        component={MypageStackScreen}
        options={{
          headerShown: false,
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
