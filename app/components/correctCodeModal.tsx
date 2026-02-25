import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native"
import Animated, { CSSAnimationKeyframes, useSharedValue } from 'react-native-reanimated';

export default function CorrectCodeModal({showGraphicsOnPsw}: {showGraphicsOnPsw: any}){


    //const width = useSharedValue(0)
    //useEffect(()=>{
     //   width.value = 
    //        width.value + 1
    //    
    //}, [showGraphicsOnPsw])

    const [text, setText] = React.useState('Caricamento...')

    useEffect(()=>{
        const firstText = setTimeout(()=>{setText('Avvio connesione Sicura...')}, 5000)
        const secondText = setTimeout(()=>{setText('Accesso in corso...')}, 80000)
        const thirdText = setTimeout(()=>{setText('Acquisizione bersaglio...')}, 11000)
        const fourthText = setTimeout(()=>{setText('Sincronizzo flusso video...')}, 18000)


        return ()=>{
            clearTimeout(firstText);
            clearTimeout(secondText);
            clearTimeout(thirdText);
            clearTimeout(fourthText);
        }
    }, [showGraphicsOnPsw])




    const fakeLoadingBar: CSSAnimationKeyframes = {
        '0%': {
            width: 20
        },
        '15%': {
            width: 40
        },
        '20%': {
            width: 200
        },
        '30%': {
            width: 205
        },
        '55%': {
            width: 350
        },
        '80%': {
            width: 370
        },
        '85%': {
            width: 505
        },
        '100%': {
            width: 520
        }
    }

    return(
        <View
            style={style.styleView}
        >
            <Text
                style={style.styleText}
            >
                {text}
            </Text>
            <Animated.View 
                style={[{
                    //width,
                    alignSelf: 'flex-start',
                    height: 30,
                    backgroundColor: 'rgb(103, 170, 41)',
                    borderRadius: 3,
                    borderColor: 'rgb(82, 139, 29)',
                    borderWidth: 2,
                    marginTop: 50,
                    animationName: {
                            '100%': {
                                transform: [{translateX:100}]
                            }
                        },
                    animationDuration: '1000ms'
                    },
                    {
                        animationName: fakeLoadingBar,
                        animationDuration: '25s',//impostare 25s, tenere 2 solo in dev
                        animationTimingFunction: 'linear',
                        animationIterationCount: 1,
                        animationDirection: 'normal',
                    }]}  
            />

        </View>
    )
}


const style=StyleSheet.create({
    styleView: {
        flex: 1,
        backgroundColor: 'rgb(224, 178, 52)',
        height: 200,
        width: 550,
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
        color: 'rgb(255, 253, 253)',
        fontSize: 40,
        fontFamily: 'CallOfOpsDuty',
        marginTop: 10,
    },
})