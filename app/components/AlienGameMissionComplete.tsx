import {View, StyleSheet, Text} from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { useAudioPlayer } from 'expo-audio';


export default function AlienGameMissionComplete() {

   
    const [timeLeft, setTimeLeft] = useState(20);
  const [isRunning, setIsRunning] = useState(true);
    const [showTimer, setShowTimer] = useState(true);

  useEffect(() => {
    let interval:any;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setShowTimer(false)
    } 
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

    return(
        <View
            style={[{
                backgroundColor: 'rgb(236, 26, 26)',
                borderColor: 'rgb(255, 255, 255)',
            }, 
            style.styleView]}
        >
            <Text
                style={style.titleTextView}
            >
                Codice corretto
            </Text>
            {showTimer && (<Text
                style={style.textView}
            >
                {timeLeft} 
            </Text>)}
        </View>
    )
}

const style = StyleSheet.create({
    styleView:{
        flex: 1,
        
        height: 340,
        width: 600,
        position: 'absolute',
        zIndex: 1,
        marginTop: 30,   
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
        fontSize: 80,
        fontFamily: 'CallOfOpsDuty',
        textAlign: 'center',
        marginBottom: 10,
    }
})