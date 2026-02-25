import { Pressable, Text, View, TextInput, Button, Image, StyleSheet } from "react-native";
import React,{useState, useEffect} from "react";
import MapView, {LocalTile} from 'react-native-maps';
import * as FileSystem from 'expo-file-system';
import {unzip} from 'react-native-zip-archive'
import { useVideoPlayer, VideoView } from 'expo-video';
import CorrectCodeModal from "../components/correctCodeModal";
import HoldToDefuze from "../components/holdToDefuze";
import HoldToLounch from "../components/holdToLounch";





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
        }, 25000)//impostare 25000, tenere 2000 solo in dev

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

                        }}
                        onPress={defuzeFunc}
                    >
                        <Text
                            style={{
                                flexDirection: 'row',
                                margin: 10,
                                backgroundColor: 'rgb(255, 203, 5)',
                                fontSize: 35,
                                fontFamily: 'CallOfOpsDuty',
                                padding: 20,
                                width: 210,
                                textAlign: 'center',
                                borderRadius: 10,
                                marginRight: 60,
                                height: 70,
                            }}
                        >
                            Disinnesca
                        </Text>
                    </Pressable>


                    <Pressable
                        style={{

                        }}
                        onPress={lounchFunc}
                    > 
                        <Text
                            style={{
                                flexDirection: 'row',
                                margin: 10,
                                backgroundColor: 'rgb(255, 59, 59)',
                                fontSize: 35,
                                fontFamily: 'CallOfOpsDuty',
                                padding: 20,
                                width: 200,
                                textAlign: 'center',
                                borderRadius: 10,
                                marginLeft: 60,
                                height: 70,
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
        width: 550,
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

});