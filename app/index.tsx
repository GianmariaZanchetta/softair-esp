import { Pressable, Text, View, TextInput, Button, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import SettingsIco from "./components/settings"
import DeviceModal from "./components/deviceSelectModal"

import { useBle } from "@/useBleContext";



export default function Index() {

  const {
    scanForPeripherals, 
    requestPermissions,
    allDevices,
    connectToDevice,
    connectedDevice,
    isReady,
  } = useBle();

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      //console.log(isPermissionsEnabled)
      scanForPeripherals();
    }
  };

  const router = useRouter()

  const [isConnected, setIsConnected] = React.useState(true)//dovrebbe essere false ma senza esp uso true
  const [showModal, setShowModal] = React.useState<boolean>(false)

  console.log(connectDevice)
  async function connectDevice(){
    const isPermissionsEnabled = await requestPermissions();
    if(isPermissionsEnabled){
      if(connectedDevice && await isReady){
        setShowModal(false)
        router.push("./(tabs)/securityCode")

      } else {
            console.log(connectToDevice)
            scanForDevices()
            setShowModal(true)
      }
    } 
  }


    useEffect(()=>{
      async function connectDevice(){
        const isPermissionsEnabled = await requestPermissions();
        if(isPermissionsEnabled){
          if(connectedDevice && await isReady){
            setShowModal(false)
            router.push("/(tabs)/securityCode")
            console.log('mandato')
          } else {
            console.log(connectToDevice)
            scanForDevices()
            setShowModal(true)
          }
        } 
      }
      connectDevice()
      console.log('eseguito')
    }, [connectedDevice, isReady])
  


  return (
    <View
      style={{
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(56, 56, 56)",
      }}
    >

      <SettingsIco />

      <DeviceModal  
        closeModal={()=>setShowModal(false)}
        visible={showModal}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      //è una prova
      /> 

      <Text
        style={{
          marginTop: 80,
          fontSize: 45,
          color: 'rgb(255, 255, 255)',
          fontFamily: 'CallOfOpsDuty',
          textAlign: "center",

        }}
      >Connetti il Dispositivo</Text>
      

      <Pressable
        style={{
          width: 200,
          height: 60,
          alignItems: "center",
          backgroundColor: "rgb(44, 44, 44)",
          //borderRadius: 10,
          marginTop: 50,
          borderColor: "rgb(255, 255, 255)",
          borderWidth: 1,
        }}
        onPress={connectDevice}
      >
        <View pointerEvents="none" style={[style.angle, style.tl]}></View>
        <View pointerEvents="none" style={[style.angle, style.tr]}></View>
        <View pointerEvents="none" style={[style.angle, style.bl]}></View>
        <View pointerEvents="none" style={[style.angle, style.br]}></View>
        <Text
          style={{
            fontSize: 30,
            color: "rgb(255, 255, 255)",
            marginTop: 17,
            fontWeight: 600,
            fontFamily: 'CallOfOpsDuty',
          }}
        >
          Cerca
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