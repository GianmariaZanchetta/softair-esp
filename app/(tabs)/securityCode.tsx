import { Pressable, Text, View, TextInput, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useRouter } from "expo-router";
import SettingsIco from "../components/settings"


export default function SecurityCode() {

  const router = useRouter()


  const [text, onChangeText] = React.useState("")

  function testPassword(){

    if (text==="123"){
      console.log("correct psw")
      router.push("./enagageTarget")
    } else{
      console.log("wrong psw")
    }
  }


  return (
    <View
      style={{
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(56, 56, 56)4)"

      }}
    >
      <SettingsIco />


      <Text
      style={{
        marginTop: 35,
        fontSize: 25,
        fontWeight: 600,
        color: "rgb(255, 255, 255)",
      }}
      >Dispositivo di lancio collegato</Text>
      <Text
      style={{
        marginTop: 20,
        color: "rgb(255, 255, 255)",
      }}>Inserire il codide segreto:</Text>



      <TextInput
        style={{
          height: 40,
          width: 200,
          margin: 12,
          borderWidth: 1.5,
          padding: 10,
          borderRadius: 10,
          borderColor: "rgb(255, 203, 5)",
          color: 'white',
          textAlign: "center"
        }}
        onChangeText={onChangeText}
        value={text}
        placeholder="123456"
        placeholderTextColor= "rgb(121, 121, 121)"

      >

      </TextInput>

      <Pressable
      style={{
        marginTop: 60,
        width: 150,
        height: 50,
        alignItems: "center",
        backgroundColor: "rgb(255, 203, 5)",
        borderRadius: 10,
        borderColor: "rgb(255, 203, 5)",
        borderWidth: 2,
      }}
      onPress={testPassword}
      >
        <Text
          style={{
            marginTop: 5,
            fontSize: 25,
            fontWeight: 600,
            color: "rgb(56, 56, 56)",
          }}
        >
          Verifica
        </Text>
      </Pressable>
    </View>

  );
}

