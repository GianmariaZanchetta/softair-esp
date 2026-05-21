import { Pressable, Text, View, TextInput, Button, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as data from '../../assets/fonts/alienFont.js'



export default function alienGame() {

    const [text, onChangeText] = React.useState("")

    const DATA = data.alienFont

    type ItemProps = {title: string};

    const Item = ({title}: ItemProps) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
    );


    return(
        <View
            style={styles.container}>
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

            <View style={{flexDirection: 'row'}}>
                <TextInput
                        style={{
                            height: 45,
                            width: 210,
                            marginTop: 20,
                            borderWidth: 1,
                            padding: 10,
                            //borderRadius: 10,
                            borderColor: "rgb(255, 255, 255)",
                            color: 'white',
                            textAlign: "center",
                            fontSize: 20,
                            backgroundColor: 'rgb(15, 15, 15)',
                            marginLeft: 220,
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
                        paddingBottom: 20,
                        paddingHorizontal: 60,
                    }}
                >
                    <Text
                        style={{
                            color: '#ffffff',
                            fontSize: 45,
                            padding: 0,
                            margin: 0,
                        }}
                    >←</Text>
                </Pressable>
            </View>


            <FlatList
                horizontal={false}
                style={[styles.flatList]}
                data={DATA}
                numColumns={9}
                contentContainerStyle={{
                    alignItems: 'center',
                    //borderColor: "red",
                    //borderWidth: 1,
                    width: 600,
                    height: 205,
                    marginTop: 30,
                    
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
    alignItems: "center",
    textAlign: "center",
    flexGrow: 1,
    justifyContent: "center",
    
  },
  flatList: {
    
  },
  item: {
    
    backgroundColor: '#70c08900',
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
    height: 60
  },
  title: {
    fontSize: 32,
    color: '#ffffff',
  },
});