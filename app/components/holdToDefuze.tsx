import {View, StyleSheet, Text, Pressable} from "react-native"
import Animated, { CSSAnimationKeyframes, useSharedValue } from 'react-native-reanimated';
import React,{useEffect, useRef} from "react";
import { useRouter } from "expo-router";
import MissionComplete from "./missionComplete";

export default function HoldToDefuze() {

    const router = useRouter()

    const [startHolding, setStartHolding]= React.useState(false)
    const [completeHolding, setCompleteHolding] = React.useState(false)


    const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);


    function pressInAnim() {
        console.log('test')
        setStartHolding(true);
        setCompleteHolding(false)
          // evita timer doppi se l’utente preme di nuovo
        if (holdTimerRef.current) clearTimeout(holdTimerRef.current);

        holdTimerRef.current = setTimeout(()=>{setCompleteHolding(true)}, 5000)//capire come posso annullarlo se mollo il bottone, se completo far apparire modale di fine game 
    }


    function pressOutAnim() {
        setStartHolding(false);
        console.log(completeHolding)
        if (holdTimerRef.current) {
            clearTimeout(holdTimerRef.current);
            holdTimerRef.current = null;
        }
    }

    const holdingAnimation: CSSAnimationKeyframes ={
        '0%': {
            width: 0
        },
        '100%': {
            width: 515
        }
    }


return(
        
        <View
            style={style.styleView}
            
        >
            {completeHolding && <MissionComplete defuzeOrLounch={'disarmo'}/>}
            <Pressable
                onPressIn={pressInAnim}
                onPressOut={pressOutAnim}
                style={{
                    position:'absolute',
                    padding: 0,
                    margin: 0,
                    height: 150,
                    width: 515,
                }}
            >
                <Text
                    style={style.styleText}
                >
                    Tieni premuto per disinnescare
                </Text>
                {startHolding && (<Animated.View 
                    style={[{
                        //width,
                        alignSelf: 'flex-start',
                        height: 145,
                        width: 515,
                        position: 'absolute',
                        backgroundColor: 'rgba(175, 142, 12, 0.5)',
                        borderRadius: 5, 
                        animationName: {
                                '100%': {
                                    transform: [{translateX:100}]
                                }
                            },
                        animationDuration: '1000ms'
                        },
                        {
                            animationName: holdingAnimation,
                            animationDuration: '5s',
                            animationTimingFunction: 'linear',
                            animationIterationCount: 1,
                            animationDirection: 'normal',
                        }]}  
                /> )}
            </Pressable>
        </View>
    )
}


const style=StyleSheet.create({
    styleView: {
        flex: 1,
        backgroundColor: 'rgb(224, 178, 52)',
        height: 150,
        width: 520,
        position: 'absolute',
        zIndex: 1,
        marginTop: 100,   
        borderRadius: 8, 
        borderColor: 'rgb(143, 114, 33)',
        borderWidth: 3,
        alignItems: 'center',
        padding: 10,
    },
    styleText: {
        color: 'rgb(0, 0, 0)',
        fontSize: 35,
        fontFamily: 'CallOfOpsDuty',
        marginTop: 45,
        alignSelf: 'center',
        zIndex: 1,
    },
})