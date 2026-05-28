import {View, StyleSheet, Text} from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { useAudioPlayer } from 'expo-audio';
import { useFonts } from 'expo-font';

const audioSource = require('../../assets/alienSound.mp3')
const evilLaugh = require('../../assets/evilLaugh.mp3')


export default function AlienGameMissionComplete() {

    const player = useAudioPlayer(audioSource);
    const playerLaugh = useAudioPlayer(evilLaugh);

    const [audio, setAudio] = React.useState(false)
    //const [audioLaugh, setAudioLaugh] = React.useState(false)
    const [timeLeft, setTimeLeft] = useState(30);
    const [isRunning, setIsRunning] = useState(true);
    const [showTimer, setShowTimer] = useState(true);
    const [fontsLoaded] = useFonts({
            predator: require('../../assets/fonts/predator.ttf'),
        });

    if(!fontsLoaded) {
        return null
    }

    //effetto alieno
    useEffect(()=>{
            if(!showTimer) {
                
                return
            }
            const time = setInterval(()=>{
            setAudio(true)
            })
    
            setTimeout(()=>{
                clearInterval(time)
                setAudio(false)
            }, 30000)//l'audio è un loop infinito, modificare il tempo in ms per decidere la lunghezza
    
        }, [showTimer])

    useEffect(()=>{
            if(!showTimer) return
            if(audio){
                player.loop=true;
                player.seekTo(0);
                player.play();  
            }
            if(!audio){
                player.pause()
            }
    
        }, [audio, showTimer])




        // risata finale(che socondo me fa cacare ma la vogliono così...)


    useEffect(()=>{
            if(showTimer) return
            if(!showTimer){
                playerLaugh.loop=false;
                playerLaugh.seekTo(0);
                playerLaugh.play();  
            }
            
    
        }, [showTimer])




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
        fontSize: 60,
        fontFamily: 'predator',
        marginTop: 45,
        alignSelf: 'center',
        marginBottom: 50,
        //zIndex: 1,
        textAlign: 'center',
    },
    textView:{
        //marginTop: 50,
        fontSize: 100,
        fontFamily: 'predator',
        textAlign: 'center',
        marginBottom: 10,
    }
})