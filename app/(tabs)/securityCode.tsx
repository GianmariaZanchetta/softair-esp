import { Pressable, Text, View, TextInput, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import SettingsIco from "../components/settings"
import WrongCodeModal from "../components/wrongCodeModal";
import CorrectCodeModal from "../components/correctCodeModal";
import useBLE from "@/useBLE";
import IsEspConnected from '../components/isEspConnected'



export default function SecurityCode() {

  const {connectToDevice} = useBLE();

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
      console.log("correct psw")
      router.push("./engageTarget")
      
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
        marginTop: 35,
        fontSize: 30,
        fontFamily: 'CallOfOpsDuty',
        color: "rgb(255, 255, 255)",
      }}
      >Dispositivo di lancio collegato</Text>
      <Text
      style={{
        marginTop: 30,
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
            marginTop: 10,
            fontSize: 30,
            fontFamily: 'CallOfOpsDuty',
            color: "rgb(0, 0, 0)",
          }}
        >
          Verifica
        </Text>
      </Pressable>
    </View>

  );
}

