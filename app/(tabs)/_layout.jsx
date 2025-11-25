// src/navigation/StackLayout.jsx
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import SuggestionScreen from "./SuggetionScreen";
import RagaDetectionScreen from "./RagaDetectionScreen";
import PracticeLoopsScreen from "./PracticeLoopsScreen";
import TheoryLessonsScreen from "./TheoryLessonsScreen";
import LoginRegister from './index';
import LandingPage from '../LandingPage';
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "../../hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { signOut } from 'firebase/auth';
import { Alert } from 'react-native';
import { auth } from "../../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Bottom Tab Navigator Component
const BottomTabs = () => {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Suggestions") {
            iconName = focused ? "musical-notes" : "musical-notes-outline";
          } else if (route.name === "RagaDetection") {
            iconName = focused ? "mic" : "mic-outline";
          } else if (route.name === "Practice") {
            iconName = focused ? "play-circle" : "play-circle-outline";
          } else if (route.name === "Theory") {
            iconName = focused ? "book" : "book-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Suggestions"
        component={SuggestionScreen}
        options={{ title: "Suggestions" }}
      />
      <Tab.Screen
        name="RagaDetection"
        component={RagaDetectionScreen}
        options={{ title: "Raga Detection" }}
      />
      <Tab.Screen
        name="Practice"
        component={PracticeLoopsScreen}
        options={{ title: "Practice" }}
      />
      <Tab.Screen
        name="Theory"
        component={TheoryLessonsScreen}
        options={{ title: "Theory" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
};

// Drawer Navigator Component
const DrawerNavigator = () => {
  const navigation = useNavigation();
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert("Success", "Logged out successfully!");
      })
      .catch((err) => {
        console.error("Logout Error:", err);
        Alert.alert("Error", "Failed to logout. Please try again.");
      });
  };

  const handleLogin = () => {
    navigation.navigate("LoginRegister");
  };

  return (
    <Drawer.Navigator initialRouteName="MainTabs">
      <Drawer.Screen name="MainTabs" component={BottomTabs} options={{ title: 'Home' }} />
      
      {user ? (
        <Drawer.Screen
          name="Logout"
          component={BottomTabs}
          options={{
            title: 'Logout',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="log-out-outline" size={size} color={color} />
            ),
          }}
          listeners={{
            drawerItemPress: (e) => {
              e.preventDefault();
              handleLogout();
            },
          }}
        />
      ) : (
        <Drawer.Screen
          name="Login"
          component={LoginRegister}
          options={{
            title: 'Login',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="log-in-outline" size={size} color={color} />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
};

// Stack Navigator Component
export default function StackLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
      }}
    >
      <Stack.Screen name="Landing" component={LandingPage} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="LoginRegister" component={LoginRegister} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
}
