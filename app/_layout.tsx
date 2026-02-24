import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import * as NavigationBar from 'expo-navigation-bar';


export default function RootLayout() {
  useEffect(()=>{
    if (Platform.OS==='android'){
      NavigationBar.setStyle('dark')
    }
  },[])
  return <Stack screenOptions={{headerShown: false}}/>;
}
