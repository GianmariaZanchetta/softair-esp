import { Pressable, Text, View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import SettingsIco from "../components/settings"
import WrongCodeModal from "../components/wrongCodeModal";
import CorrectCodeModal from "../components/correctCodeModal";
import IsEspConnected from '../components/isEspConnected'
import { useBle } from "@/useBleContext";



export default function SecurityCode() {

  const {connectedDevice, isReady} = useBle();

  /*useEffect(()=>{
    connectToDevice
    alert('dispositivo disconnesso')
  }, []);*/

  const router = useRouter()


  const [text, onChangeText] = React.useState("")
  const [showModal, setShowModal] = React.useState(false)
  const [showGraphics, setShowGraphic] = React.useState(false)

  function testPassword(){
    if (text==="123"){
      if(connectedDevice && isReady){
      console.log("correct psw")
      router.push("./engageTarget")//sistemare l'alert si vede per mezzo secondo poi va sotto
      }else{
        Alert.alert(
          'Dispositivo disconnesso',
          'Credenziali corrette ma dispositivo disconnesso',
          [{text: 'ok', onPress:()=>{router.replace('/')}}],
          { cancelable: false },
        )
      }

      /*setShowGraphic(true)  
        const timerGraphics = setTimeout(()=>{
          setShowGraphic(false)
          router.push("./engageTarget");
        }, 25000)*/

      
    } else{
      console.log("wrong psw")
      setShowModal(true)
    }
  }

  function retryPsw(){
    setShowModal(false)
    //console.log('demo')
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

      <IsEspConnected />

      {showModal &&( <WrongCodeModal retryPsw={retryPsw} /> )}

      {showGraphics && (<CorrectCodeModal showGraphicsOnPsw={showGraphics} />)}

      <Text
      style={{
        marginTop: 55,
        fontSize: 35,
        fontFamily: 'CallOfOpsDuty',
        color: "rgb(255, 255, 255)",
      }}
      >Dispositivo di lancio collegato</Text>
      <Text
      style={{
        marginTop: 30,
        color: "rgb(255, 255, 255)",
        fontFamily: ''
      }}>Inserire il codide segreto:</Text>



      <TextInput
        style={{
          height: 45,
          width: 210,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          //borderRadius: 10,
          borderColor: "rgb(255, 255, 255)",
          color: 'white',
          textAlign: "center",
          fontSize: 20,
          backgroundColor: 'rgb(15, 15, 15)',
        }}
        onChangeText={onChangeText}
        value={text}
        placeholder="123456"
        placeholderTextColor= "rgba(121, 121, 121, 0.73)"

      >

      </TextInput>

      <Pressable
      style={{
        marginTop: 60,
        width: 170,
        height: 60,
        alignItems: "center",
        backgroundColor: "rgb(44, 44, 44)",
        //borderRadius: 10,
        borderColor: "rgb(255, 255, 255)",
        borderWidth: 1,
      }}
      onPress={testPassword}
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