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
    const secColor = connected ? 'rgba(59, 206, 22, 0.3)' : 'rgba(218, 81, 81, 0.36)';

    return(
        <View style={{
            marginTop: 10,
            backgroundColor: 'rgb(31, 31, 31)',
            //borderRadius: 10,
            padding: 3,
            flexDirection: 'row',
            marginBottom: 0,
            position: 'absolute',

        }}>
                <View style={{
                position: 'absolute',
                backgroundColor: secColor,
                padding: 8,
                borderRadius: 8,
                width: 5,
                height: 5,
                margin: 5,
                //zIndex: 1,
            }}></View>
            <View style={{
                backgroundColor: color,
                padding: 5,
                borderRadius: 5,
                width: 5,
                height: 5,
                margin: 5,
                //zIndex: 2
            }}></View>

            <Text
                style={{
                    color: 'rgb(255, 255, 255)',
                    marginRight: 5,
                    marginLeft: 5,
                    margin: 4,
                    fontFamily: 'CallOfOpsDuty',
                    fontSize: 14,
                }}
            >{connected ? 'CONNESSO' : 'DISCONNESSO'}</Text>
        </View>
    )
}