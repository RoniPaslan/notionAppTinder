import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import LikedListScreen from "../screens/LikedListScreen";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FF5864",
        tabBarInactiveTintColor: "#aaa",
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="flame" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Likes"
        component={LikedListScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="heart" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
