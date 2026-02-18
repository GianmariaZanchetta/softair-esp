import { Pressable, Text, View, TextInput, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useRouter } from "expo-router";
import SettingsIco from "./components/settings"



export default function Index() {

  const router = useRouter()

  const [isConnected, setIsConnected] = React.useState(true)//dovrebbe essere false ma senza esp uso true

  function connectDevice(){
    if(isConnected){
      router.push("./(tabs)/securityCode")
    } else {
      alert("Dispositivo non connesso")
    }
  }


  return (
    <View
      style={{
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(56, 56, 56)4)",
      }}
    >
      <SettingsIco />


      <Text
        style={{
          marginTop: 80,
          fontSize: 30,
          fontWeight: 700,
          color: "white"
        }}
      >Connetti il Dispositivo</Text>
      

      <Pressable
        style={{
          width: 200,
          height: 60,
          alignItems: "center",
          //backgroundColor: "rgb(255, 255, 255)",
          borderRadius: 10,
          marginTop: 50,
          borderColor: "rgb(255, 203, 5)",
          borderWidth: 2,
        }}
        onPress={connectDevice}
      >
        <Text
          style={{
            fontSize: 25,
            color: "rgb(255, 255, 255)",
            marginTop: 10,
            fontWeight: 600,
          }}
        >
          Cerca
        </Text>
      </Pressable>


    </View>

  );
}

