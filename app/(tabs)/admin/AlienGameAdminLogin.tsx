import { useRouter } from "expo-router";
import React, { useState } from "react";
import {View, StyleSheet, TextInput, Pressable, Text, Alert} from "react-native";
import GoBack from "@/app/components/goBack";
import { Ionicons } from "@expo/vector-icons";



export default function AlienGameAdminLogin () {

    const router = useRouter()

    const [text, setText] = useState("")

    const verifyAdmin = () =>{
        if (text === "BucoModellista02") {//psw prod: BucoModellista02, non è sicura ovviamenete, per provare la tengo così
            router.replace("/(tabs)/admin/AlienGameChangeSecret")
        } else {
            Alert.alert(
                'Credenziali errate',
                'Ritenta, sarai più fortunato...',
                [{text: 'Ok', 
                    onPress: ()=>{}
                }],
                {cancelable: false},
            )
        }
    }

    function getBack (){
        router.replace("/(tabs)/alienGame")
    }

    return(
        <>
            <View
                style={style.view}
            >
                <Pressable
                        onPress={getBack}
                        style={{
                            position: "absolute",
                            top: 20,
                            left: 12,
                            padding: 10,
                            borderRadius: 1,
                        }}
                        hitSlop={10}
                    >

                        <Ionicons name="arrow-back-outline" size={22} 
                        style={{
                        color: "white",
                        }}
                        />
                    
                </Pressable>

                <TextInput
                    style={style.textInput}
                    onChangeText={setText}
                ></TextInput>


                <Pressable
                    style={style.pressable}
                    onPress={verifyAdmin}
                >
                    <View pointerEvents="none" style={[style.angle, style.tl]}></View>
                    <View pointerEvents="none" style={[style.angle, style.tr]}></View>
                    <View pointerEvents="none" style={[style.angle, style.bl]}></View>
                    <View pointerEvents="none" style={[style.angle, style.br]}></View>
                    <Text
                      style={{
                        marginTop: 16,
                        fontSize: 30,
                        fontFamily: 'CallOfOpsDuty',
                        color: "rgb(255, 255, 255)",
                      }}
                    >
                      Verifica
                    </Text>

                </Pressable>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    view: {
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(56, 56, 56)",
    },
    textInput: {
        height: 45,
        width: 210,
        marginTop: 120,
        borderWidth: 1,
        padding: 10,
        //borderRadius: 10,
        borderColor: "rgb(255, 255, 255)",
        color: 'white',
        textAlign: "center",
        fontSize: 20,
        backgroundColor: 'rgb(15, 15, 15)',
    },
    pressable: {
        marginTop: 40,
        width: 170,
        height: 60,
        alignItems: "center",
        backgroundColor: "rgb(185, 31, 31)",
        //borderRadius: 10,
        borderColor: "rgb(255, 255, 255)",
        borderWidth: 1,
    },
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