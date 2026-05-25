import { Pressable, Text, View, TextInput, Button, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as data from '../../assets/fonts/alienFont.js'
import Svg, {Path} from 'react-native-svg';
import { useRouter } from "expo-router";
import SettingIcoAlienGame from "../components/settings/SettingIcoAlienGame";
import * as SecureStore from 'expo-secure-store';
import { useFonts } from 'expo-font';
import AlienGameMissionComplete from "../components/AlienGameMissionComplete";


export default function alienGame() {
    const router = useRouter()

    const [fontsLoaded] = useFonts({
        predator: require('../../assets/fonts/predator.ttf'),
    });

    const [text, onChangeText] = React.useState("")

    const [showModal, setShowModal] = React.useState(false)

    const [endGame, setEndGame] = React.useState(false)

    if(!fontsLoaded) {
        return null
    }

    
    const alienNumbers = data.alienNumbers
    const alienFontFristLine = data.alienFontFristLine
    const alienFontSecondLine = data.alienFontSecondLine
    const alienFontThirdLine = data.alienFontThirdLine


    type ItemProps = {title: string};

    const Item = ({title}: ItemProps) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
    );

    async function checkCode(){
        let result = await SecureStore.getItemAsync("alienGameKey");
        if(text === result){
            console.log("code correct")
            onChangeText("")
            setEndGame(true)
        } else {
            console.log("Wrong code")
            setShowModal(true)
        }
    }


    return(
        <View
            style={styles.container}>

            {endGame &&(<AlienGameMissionComplete />)}
            
            {showModal && (<View
                style={{
                    flex: 1,
                    alignItems: "center",
                    position: "absolute",
                    backgroundColor: 'rgb(27, 27, 27)',
                    height: 170,
                    width: 450,
                    marginTop: 110,
                    zIndex: 1,
                    //borderRadius: 8,
                    borderColor: 'rgb(255, 255, 255)',
                    borderWidth: 1,
                }}
                
            >
                <Text
                    style={{
                        color: 'rgb(255,255,255)',
                        fontSize: 40,
                        fontFamily: 'CallOfOpsDuty',
                        marginTop: 10,
                    }}
                >Codice Errato!</Text>
    
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
    
                    <Pressable
                        style={styles.styleViewRetry}
                        onPress={()=>{setShowModal(false)}}
                    >
                        <View pointerEvents="none" style={[styles.angle, styles.tl]}></View>
                        <View pointerEvents="none" style={[styles.angle, styles.tr]}></View>
                        <View pointerEvents="none" style={[styles.angle, styles.bl]}></View>
                        <View pointerEvents="none" style={[styles.angle, styles.br]}></View>
    
                        <Text
                            style={styles.styleText}
                        >Riprova</Text>
                    </Pressable>
    
                </View>
    
            </View>)}






            <Text
                style={{
                      marginTop: 40,
                      fontSize: 25,
                      color: 'rgb(255, 255, 255)',
                      fontFamily: 'CallOfOpsDuty',
                      textAlign: "center",
            
                    }}>
                Inserisci il codice
            </Text>

            <SettingIcoAlienGame />

            <View style={{flexDirection: 'row'}}>
                <Pressable
                    onPress={checkCode}
                    style={{
                        backgroundColor: '#55bd00',
                        marginRight: 60,
                        //paddingBottom: 20,
                        paddingHorizontal: 60,
                        paddingTop: 3,
                        marginTop: 21,
                        height: 45,
                    }}
                >
                    <Svg
                        width={40}
                        height={40}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth={2}
                        >
                            <Path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                            />
                    </Svg>
                </Pressable>

                <TextInput
                        style={{
                            height: 45,
                            width: 280,
                            marginTop: 20,
                            borderWidth: 1,
                            padding: 10,
                            //borderRadius: 10,
                            borderColor: "rgb(255, 255, 255)",
                            color: 'white',
                            textAlign: "center",
                            fontFamily: 'predator',
                            fontSize: 25,
                            backgroundColor: 'rgb(15, 15, 15)',
                            //marginLeft: 220,
                        }}
                        editable={false}
                        onChangeText={onChangeText}
                        value={text}
                        //placeholder="123456"
                        placeholderTextColor= "rgba(121, 121, 121, 0.73)"
                ></TextInput>

                <Pressable
                    onPress={()=>onChangeText(text.slice(0, -1))}
                    style={{
                        marginLeft: 60,
                        backgroundColor: '#797979',
                        //paddingBottom: 20,
                        paddingHorizontal: 60,
                        paddingTop: 3,
                        marginTop: 21,
                        height: 45,
                    }}
                >
                    <Svg
                        width={40}
                        height={40}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth={2}
                    >
                        <Path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                        />
                    </Svg>

                </Pressable>
            </View>


            
            <FlatList
                horizontal={true}
                style={{
                    height: 0,
                }}
                data={alienNumbers}
                contentContainerStyle={{
                    
                    alignItems: 'center',
                    width: 830,
                    marginTop: 20,
                    paddingBottom: 0,
                    height: 50,
                }}
                renderItem={({item}) => 
                    <Pressable
                     onPress={()=>{onChangeText(text + item.id)}}
                    >
                        <Item 
                            title={item.title}
                        />
                    </Pressable>}
                keyExtractor={item => item.id}
            />


            <FlatList
                horizontal={true}
                style={{
                    height: 0,
                }}
                data={alienFontFristLine}
                contentContainerStyle={{
                    alignItems: 'center',
                    width: 830,
                    marginTop: 12,
                    paddingBottom: 0,
                    height: 50,
                }}
                renderItem={({item}) => 
                    <Pressable
                     onPress={()=>{onChangeText(text + item.id)}}
                    >
                        <Item 
                            title={item.title}
                            
                        />
                    </Pressable>}
                keyExtractor={item => item.id}
            />


            <FlatList
                horizontal={true}
                style={{
                    height: 0,
                }}
                data={alienFontSecondLine}
                contentContainerStyle={{
                    alignItems: 'center',
                    width: 750,
                    marginTop: 10,
                    paddingBottom: 0,
                    height: 50,
                }}
                renderItem={({item}) => 
                    <Pressable
                     onPress={()=>{onChangeText(text + item.id)}}
                    >
                        <Item 
                            title={item.title}
                            
                        />
                    </Pressable>}
                keyExtractor={item => item.id}
            />



            <FlatList
                horizontal={true}
                style={{
                    height: 0,
                }}
                data={alienFontThirdLine}
                contentContainerStyle={{
                    alignItems: 'center',
                    width: 550,
                    marginTop: 8,
                    paddingBottom: 0,
                    height: 50,
                }}
                renderItem={({item}) => 
                    <Pressable
                     onPress={()=>{onChangeText(text + item.id)}}
                    >
                        <Item 
                            title={item.title}
                            
                        />
                    </Pressable>}
                keyExtractor={item => item.id}
            />


           

        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(56, 56, 56)",
    margin: 0,
    padding: 0,  
    alignItems: 'center',
    alignContent: 'center'
  },
  flatList: {
    textAlign: "center",
    alignItems: 'center',
    
  },
  item: {
    
    backgroundColor: '#70c08900',
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginHorizontal: 13,
    height: 45
  },
  title: {
    fontFamily: 'predator',
    fontSize: 34,
    //fontWeight: 500,
    color: '#ffffff',
  },
  styleViewAbort: {
        backgroundColor: 'rgb(63, 134, 30)',
        width: 150,
        textAlign:'center',
        height: 50,
        margin: 30,
        borderWidth: 1,
        borderColor: 'rgb(255, 255, 255)'
    },
    styleViewRetry: {
        backgroundColor: 'rgb(179, 155, 19)',
        width: 150,
        textAlign:'center',
        height: 50,
        margin: 30,
        borderWidth: 1,
        borderColor: 'rgb(255, 255, 255)'
    },
    styleText: {
        margin: 0,
        fontSize: 30,
        padding: 12,
        //borderRadius: 6,
        fontFamily: 'CallOfOpsDuty',
        color: 'rgb(255, 255, 255)',
        alignSelf: 'center',
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