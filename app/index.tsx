import { Pressable, Text, View, TextInput, Button, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import SettingsIco from "./components/settings"




export default function Index() {


  const router = useRouter()


    function missileGame (){
      console.log("missile game selected")
      router.push("/(tabs)/missileGame")
    }
    function alienGame (){
      console.log("alien game selected")
      router.push("/(tabs)/alienGame")
    }

  return (
    <View
      style={{
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(56, 56, 56)",
      }}
    >


      <Text
        style={{
          marginTop: 80,
          fontSize: 45,
          color: 'rgb(255, 255, 255)',
          fontFamily: 'CallOfOpsDuty',
          textAlign: "center",

        }}
      >Modalita operativa</Text>

      <FlatList 
        style={{
            marginTop: '3%',
            width: '70%'
        }}
        data={[
            {key: 'Lancio missile', func: missileGame},
            {key: 'Codice alieno', func: alienGame},
        ]}
        renderItem={({item, index})=>
            <Pressable
                style={{
                    width: '100%',
                    borderColor: 'black',
                    borderWidth: 1,
                    borderTopWidth: index === 0 ? 1 : 0,
                }}
                onPress={item.func}
            >
            
                <Text
                style={{
                    color: 'white',
                    fontSize: 15,
                    margin: 15,
                    marginLeft: 30,
                }}
                >{item.key}</Text>
            </Pressable>
            
        }
                      />





    </View>

  );
}

const style = StyleSheet.create({
  angle: {
    position: "absolute", width: 14, height: 14, borderColor: 'white',
  },
  tl: {
    top: -1, left: -1, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 0
  },
  tr:{
    top: -1, right: -1, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 0
  },
  bl:{
    bottom: -1, left: -1, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 0
  },
  br:{
    bottom: -1, right: -1, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 0
  }
})