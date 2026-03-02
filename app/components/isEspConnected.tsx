import {View, Text} from 'react-native'
import { useBle } from '@/useBleContext'
import { useEffect, useState } from 'react'




export default function IsEspConnected(){

    const {isReady} = useBle()
    console.log('connectedDevice: ', isReady)

    const [connected, isConnected] = useState(isReady)
    useEffect(()=>{
        isConnected(isReady)
    }, [isReady])

    return(
        <View>
            <Text
                style={{

                }}
            >{connected ? 'Connesso' : 'Disconnesso'}</Text>
        </View>
    )
}