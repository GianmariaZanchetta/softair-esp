import {View, StyleSheet, Text, Pressable} from "react-native"
import Animated, { CSSAnimationKeyframes, useSharedValue } from 'react-native-reanimated';
import React,{useEffect, useRef} from "react";
import { useRouter } from "expo-router";
import MissionComplete from "./missionComplete";
import useBLE from "@/useBLE";

export default function HoldToLounch() {

    const router = useRouter()
    const{sendUp} = useBLE()

    const [startHolding, setStartHolding]= React.useState(false)
    const [completeHolding, setCompleteHolding] = React.useState(false)


    const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);


    function completeHold(){
        setCompleteHolding(true)
        sendUp()
    }

    function pressInAnim() {
        console.log('test')
        setStartHolding(true);
        setCompleteHolding(false)
          // evita timer doppi se l’utente preme di nuovo
        if (holdTimerRef.current) clearTimeout(holdTimerRef.current);

        holdTimerRef.current = setTimeout(()=>{completeHold()}, 1000)//mettere 5000 in prod
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
            {completeHolding && <MissionComplete defuzeOrLounch={'lancio'}/>}
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
                    Tieni premuto per lanciare
                </Text>
                {startHolding && (<Animated.View 
                    style={[{
                        //width,
                        alignSelf: 'flex-start',
                        height: 145,
                        width: 515,
                        position: 'absolute',
                        backgroundColor: 'rgba(187, 40, 40, 0.5)',
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
        backgroundColor: 'rgb(255, 59, 59)',
        height: 150,
        width: 520,
        position: 'absolute',
        zIndex: 1,
        marginTop: 100,   
        borderRadius: 8, 
        borderColor: 'rgb(187, 40, 40)',
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