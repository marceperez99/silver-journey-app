import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet } from "react-native";
import {
  View,
  TextField,
  Text,
  Button,
  Card,
  Colors,
  LoaderScreen,
  Carousel,
  TouchableOpacity,
  Toast,
} from "react-native-ui-lib";
import { ToastProvider } from "./hooks/useToast";
import Routes from "./screens/Routes";
Colors.loadSchemes({
  light: {
    primaryDark: "#236AD6",
    primary: "#2095F2",
    textPrimary: "black",
    textColor: Colors.grey70,
    textDark: Colors.grey20,
    danger: "#D7415D",
  },
  dark: {
    primaryDark: "#236AD6",
    primary: "#2095F2",
    textPrimary: "black",
    textColor: Colors.grey70,
    textDark: Colors.grey10,
    danger: "#D7415D",
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <ToastProvider>
        <StatusBar style="dark" />
        <Routes />
      </ToastProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
