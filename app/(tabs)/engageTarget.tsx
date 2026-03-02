import { Pressable, Text, View, TextInput, Button, Image, StyleSheet } from "react-native";
import React,{useState, useEffect} from "react";
import MapView, {LocalTile} from 'react-native-maps';
import * as FileSystem from 'expo-file-system';
import {unzip} from 'react-native-zip-archive'
import { useVideoPlayer, VideoView } from 'expo-video';
import CorrectCodeModal from "../components/correctCodeModal";
import HoldToDefuze from "../components/holdToDefuze";
import HoldToLounch from "../components/holdToLounch";
import IsEspConnected from "../components/isEspConnected";





export default function EnagageTarget(){

    const videoSource = require('../../assets/demo.mp4')

    const player = useVideoPlayer(videoSource, player =>{
        player.loop = true;
        player.play();
        player.staysActiveInBackground = false;

    })


    const [showGraphics, setShowGraphic] = React.useState(true)
    const [afterModal, setAfterModal] = React.useState(false)
    const [defuzeModal, setDefuzeModal] = React.useState(false)
    const [lounchModal, setLounchModal] = React.useState(false)


        const timerGraphics = setTimeout(()=>{
          setShowGraphic(false)
          setAfterModal(true)
        }, 2000)//impostare 25000, tenere 2000 solo in dev

        function defuzeFunc(){
            setLounchModal(false)
            if(defuzeModal){
                setDefuzeModal(false)
            } else{setDefuzeModal(true)}
        }

        function lounchFunc(){
            setDefuzeModal(false)
            if(lounchModal){
                setLounchModal(false)
            } else{setLounchModal(true)}
        }

    return(
        <View
            style={styles.viewPage}
        >
            
            {showGraphics && (<CorrectCodeModal showGraphicsOnPsw={showGraphics}/>)}

            {defuzeModal && (<HoldToDefuze />)}

            {lounchModal && (<HoldToLounch />)}

            {afterModal &&(<View
                style={styles.viewModal}
            >
                <VideoView style={styles.video} player={player} nativeControls={false} />
                <View
                    style={styles.viewButton}
                >
                    <Pressable
                        style={{
                            margin: 10,
                            padding: 0,
                            backgroundColor: 'rgb(179, 155, 19)',
                            width: 220,
                            borderWidth: 1,
                            borderColor: 'rgb(255, 255, 255)',
                            marginRight: 60,
                        }}
                        onPress={defuzeFunc}
                    >
                                <View pointerEvents="none" style={[styles.angle, styles.tl]}></View>
                                <View pointerEvents="none" style={[styles.angle, styles.tr]}></View>
                                <View pointerEvents="none" style={[styles.angle, styles.bl]}></View>
                                <View pointerEvents="none" style={[styles.angle, styles.br]}></View>
                        <Text
                            style={{
                                flexDirection: 'row',
                                margin: 0,
                                fontSize: 35,
                                fontFamily: 'CallOfOpsDuty',
                                padding: 20,
                                textAlign: 'center',
                                //borderRadius: 10,
                                height: 70,
                                color: 'rgb(255, 255, 255)',
                            }}
                        >
                            Disinnesca
                        </Text>
                    </Pressable>


                    <Pressable
                        style={{
                            margin: 10,
                            padding: 0,
                            backgroundColor: 'rgb(182, 12, 12)',
                            width: 220,
                            borderWidth: 1,
                            borderColor: 'rgb(255, 255, 255)',
                            //marginRight: 60,
                        }}
                        onPress={lounchFunc}
                    > 
                                <View pointerEvents="none" style={[styles.angle, styles.tl]}></View>
                                <View pointerEvents="none" style={[styles.angle, styles.tr]}></View>
                                <View pointerEvents="none" style={[styles.angle, styles.bl]}></View>
                                <View pointerEvents="none" style={[styles.angle, styles.br]}></View>
                        <Text
                            style={{
                                flexDirection: 'row',
                                margin: 0,
                                fontSize: 35,
                                fontFamily: 'CallOfOpsDuty',
                                padding: 20,
                                textAlign: 'center',
                                //borderRadius: 10,
                                height: 70,
                                color: 'rgb(255, 255, 255)',
                            }}
                        >
                            Lancia
                        </Text>
                    </Pressable>
                </View>
            </View>)}

        </View>
    )
}



const styles = StyleSheet.create({
    viewPage: {
        flex: 1,
        backgroundColor: 'rgb(56, 56, 56)',
        alignItems: 'center',
        
    },
    viewModal: {
        flex: 3,
        margin: 10,   
        backgroundColor: 'rgb(63, 63, 63)', //'rgb(90, 90, 90)',
        padding: 10,
        width: 650,
        alignItems: 'center',
        borderRadius: 10,
    },
    viewButton: {
        flexDirection: 'row',
        //alignItems: 'center',
    },
    video: {
        width: 350,
        height: 275,
        
    },
    angle: {
        position: "absolute", width: 14, height: 14, borderColor: 'white',
    },
    tl: {
        top: -1, left: -1, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 0
    },
    tr:{
        top: -1, right: -1, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 0
    },
    bl:{
        bottom: -1, left: -1, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 0
    },
    br:{
        bottom: -1, right: -1, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 0
    }

});