import {View, StyleSheet, Text} from "react-native"
import React, { useEffect } from "react"

export default function MissionComplete({defuzeOrLounch}: {defuzeOrLounch: string}) {


    const [winningMessage, setWinningMessage] = React.useState(defuzeOrLounch)
    const [isAreaSafe, setIsAreaSafe] =React.useState(true)
    useEffect(()=>{
        if(winningMessage==='disarmo'){setIsAreaSafe(true)} else {setIsAreaSafe(false)}
    }, [isAreaSafe])
    


    return(
        <View
            style={[{
                backgroundColor: isAreaSafe ? 'rgb(179, 155, 19)' : 'rgb(236, 26, 26)',
                borderColor: 'rgb(255, 255, 255)',
            }, 
            style.styleView]}
        >
            <Text
                style={style.titleTextView}
            >
                Missione compiuta
            </Text>
            <Text
                style={style.textView}
            >
                Inizio la procedura di {winningMessage}, 
            </Text>
           <Text
                style={style.textView}
            >
                mantenere le distanze di sicurezza.
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    styleView:{
        flex: 1,
        
        height: 257,
        width: 600,
        position: 'absolute',
        zIndex: 1,
        marginTop: -80,   
        //borderRadius: 8, 
        borderWidth: 1,
        alignItems: 'center',
        padding: 10,
        //justifyContent: 'center',
        textAlign: 'center',
    },
    titleTextView:{
        color: 'rgb(0, 0, 0)',
        fontSize: 45,
        fontFamily: 'CallOfOpsDuty',
        marginTop: 45,
        alignSelf: 'center',
        marginBottom: 50,
        //zIndex: 1,
    },
    textView:{
        //marginTop: 50,
        fontSize: 25,
        fontFamily: 'CallOfOpsDuty',
        textAlign: 'center',
        marginBottom: 10,
    }
})