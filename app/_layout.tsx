import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import * as NavigationBar from 'expo-navigation-bar';
import { useFonts } from "expo-font";


export default function RootLayout() {
  useEffect(()=>{
    if (Platform.OS==='android'){
      NavigationBar.setStyle('dark')
    }
  },[])
  
  const [loaded] = useFonts({
    CallOfOpsDuty: require("../assets/fonts/CallOfOpsDuty.otf"),
  });

  if (!loaded) return null;
  return (
    <Stack screenOptions={{
      headerShown: false, 
      headerTitleStyle: { fontFamily: "CallOfOpsDuty" }}}
    />
    
  );
}
