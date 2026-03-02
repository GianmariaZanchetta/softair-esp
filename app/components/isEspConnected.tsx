import {View, Text} from 'react-native'
import { useBle } from '@/useBleContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'




export default function IsEspConnected(){

    const router = useRouter()

    const {isReady, connectedDevice, disconnectFromDevice} = useBle()
    console.log('connectedDevice: ', isReady)

    //let disconnectDevice;
    const [connected, isConnected] = useState(isReady)
    const [device, setDevice] = useState(connectedDevice)
    useEffect(()=>{
        isConnected(isReady)
        /*if(!isReady){
            disconnectFromDevice()
            router.push('/')
        }*/  //----------------------------------------------------------------non funziona un cazzo
        /*if(!connected){
            disconnectDevice = setTimeout(()=>{disconnectFromDevice}, 10000)
        } else{
            clearTimeout(disconnectDevice);
        }*/
    }, [isReady])

    useEffect(()=>{
        setDevice(connectedDevice)
        console.log('device: ', device)
    }, [connectedDevice])

    

    const color = connected ? 'green' : 'red';
    

    return(
        <View style={{
            marginTop: 10,
            backgroundColor: 'rgb(255, 255, 255)',
            borderRadius: 10,
            padding: 3,
            flexDirection: 'row',
        }}>
            <View style={{
                backgroundColor: color,
                padding: 5,
                borderRadius: 5,
                width: 5,
                height: 5,
                margin: 5,
            }}></View>
            <Text
                style={{
                    marginRight: 5,
                }}
            >{connected ? 'Connesso' : 'Disconnesso'}</Text>
        </View>
    )
}