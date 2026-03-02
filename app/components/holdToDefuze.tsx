import {View, StyleSheet, Text, Pressable} from "react-native"
import Animated, { CSSAnimationKeyframes, useSharedValue } from 'react-native-reanimated';
import React,{useEffect, useRef} from "react";
import { useRouter } from "expo-router";
import MissionComplete from "./missionComplete";
import { useBle } from "@/useBleContext";



export default function HoldToDefuze() {

    const {sendDown} = useBle()
    const router = useRouter()

    const [startHolding, setStartHolding]= React.useState(false)
    const [completeHolding, setCompleteHolding] = React.useState(false)


    const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);


    function completeHold(){
        setCompleteHolding(true)
        sendDown()
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
                        left: -2,
                        height: 148,
                        width: 520,
                        position: 'absolute',
                        backgroundColor: 'rgba(255, 211, 33, 0.7)',
                        //borderRadius: 5, 
                        animationName: {
                                '100%': {
                                    transform: [{translateX:100}]
                                }
                            },
                        animationDuration: '1000ms'
                        },
                        {
                            animationName: holdingAnimation,
                            animationDuration: '1s',//mettere 5s in prod
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
        backgroundColor: 'rgb(179, 155, 19)',
        height: 150,
        width: 520,
        position: 'absolute',
        zIndex: 1,
        marginTop: 100,   
        //borderRadius: 8, 
        borderColor: 'rgb(255, 255, 255)',
        borderWidth: 1,
        alignItems: 'center',
        padding: 10,
    },
    styleText: {
        color: 'rgb(255, 255, 255)',
        fontSize: 35,
        fontFamily: 'CallOfOpsDuty',
        marginTop: 45,
        alignSelf: 'center',
        zIndex: 1,
    },
})