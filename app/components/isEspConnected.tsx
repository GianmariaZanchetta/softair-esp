import {View, Text} from 'react-native'
import useBLE from '@/useBLE'




export default function IsEspConnected(){

    const {isReady} = useBLE()


    return(
        <View>
            <Text
                style={{

                }}
            >{isReady ? 'Connesso' : 'Disconnesso'}</Text>
        </View>
    )
}