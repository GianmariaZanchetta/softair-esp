import { Pressable, Text, View, TextInput, Button, Image, StyleSheet } from "react-native";
import React,{useState, useEffect} from "react";
import MapView, {LocalTile} from 'react-native-maps';
import * as FileSystem from 'expo-file-system';
import {unzip} from 'react-native-zip-archive'
import { useVideoPlayer, VideoView } from 'expo-video';





export default function EnagageTarget(){

    const videoSource = require('../../assets/demo.mp4')

    const player = useVideoPlayer(videoSource, player =>{
        player.loop = true;
        player.play();
        player.staysActiveInBackground = false;

    })

    return(
        <View
            style={styles.viewPage}
        >
            <View
                style={styles.viewModal}
            >
                <VideoView style={styles.video} player={player} nativeControls={false} />
                <View
                    style={styles.viewButton}
                >
                    <Pressable
                        style={{

                        }}
                    >
                        <Text
                            style={{
                                flexDirection: 'row',
                                margin: 10,
                                backgroundColor: 'rgb(255, 203, 5)',
                                fontSize: 30,
                                fontWeight: 700,
                                padding: 10,
                                width: 170,
                                textAlign: 'center',
                                borderRadius: 10,
                                marginRight: 60,
                            }}
                        >
                            Disinnesca
                        </Text>
                    </Pressable>


                    <Pressable
                        style={{

                        }}
                    > 
                        <Text
                            style={{
                                flexDirection: 'row',
                                margin: 10,
                                backgroundColor: 'rgb(255, 59, 59)',
                                fontSize: 30,
                                fontWeight: 700,
                                padding: 10,
                                width: 170,
                                textAlign: 'center',
                                borderRadius: 10,
                                marginLeft: 60,
                            }}
                        >
                            Lancia
                        </Text>
                    </Pressable>
                </View>
            </View>
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