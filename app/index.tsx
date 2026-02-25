import { Pressable, Text, View, TextInput, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import SettingsIco from "./components/settings"
import DeviceModal from "./components/deviceSelectModal"

import useBLE from "../useBLE"



export default function Index() {

  const {
    scanForPeripherals, 
    requestPermissions,
    allDevices,
    connectToDevice,
    connectedDevice,
  } = useBLE();

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
      if(connectedDevice){
        router.replace("./(tabs)/securityCode")

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
          if(connectedDevice){
            router.push("./(tabs)/securityCode")
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
    }, [connectedDevice])
  


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
          backgroundColor: "rgb(255, 203, 5)",
          borderRadius: 10,
          marginTop: 50,
          borderColor: "rgb(255, 203, 5)",
          borderWidth: 2,
        }}
        onPress={connectDevice}
      >
        <Text
          style={{
            fontSize: 30,
            color: "rgb(0, 0, 0)",
            marginTop: 15,
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

