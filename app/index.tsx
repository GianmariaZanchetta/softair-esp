import { Pressable, Text, View, TextInput, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useRouter } from "expo-router";


export default function Index() {

  const router = useRouter()


  const [text, onChangeText] = React.useState("")

  function testPassword(){

    if (text==="123"){
      console.log("correct psw")
      router.push("./dashboard")
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
      }}
    >
      <Pressable
        onPress={()=> console.log("click")}
          style={{
            position: "absolute",
            top: 20,
            right: 12,
            padding: 10,
            borderRadius: 1,
          }}
          hitSlop={10}
      >
        <Ionicons name="settings-outline" size={22} />
      
      </Pressable>


      <Text
      style={{
        marginTop: 40,
        fontSize: 20,
      }}
      >Dispositivo di lancio</Text>
      <Text
      style={{
        marginTop: 20,
      }}>Inserire il codide:</Text>



      <TextInput
        style={{
          height: 40,
          width: 200,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
        }}
        onChangeText={onChangeText}
        value={text}
      >

      </TextInput>

      <Pressable
      style={{
        width: 120,
        height: 40,
        alignItems: "center",
        backgroundColor: "gray",
        borderRadius: 10,
      }}
      onPress={testPassword}
      >
        <Text
          style={{
            fontSize: 25,
          }}
        >
          Verifica
        </Text>
      </Pressable>
    </View>

  );
}

