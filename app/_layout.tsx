import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import * as NavigationBar from 'expo-navigation-bar';
import { useFonts } from "expo-font";
import { BleProvider } from "@/useBleContext";


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
    <BleProvider>
      <Stack screenOptions={{
        headerShown: false, 
        headerTitleStyle: { fontFamily: "CallOfOpsDuty" }}}
      />
    </BleProvider>
  );
}
