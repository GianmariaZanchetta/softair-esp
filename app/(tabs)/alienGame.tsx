import { Pressable, Text, View, TextInput, Button, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";




export default function alienGame() {

    const [text, onChangeText] = React.useState("")
    const DATA = [
        {
            id: 'a',
            title: 'a',
        },
        {
            id: 'b',
            title: 'b',
        },
        {
            id: 'c',
            title: 'c',
        },
        {
            id: 'd',
            title: 'd',
        },
        {
            id: 'e',
            title: 'e',
        },
        {
            id: 'f',
            title: 'f',
        },
        {
            id: 'g',
            title: 'g',
        },
        {
            id: 'h',
            title: 'h',
        },
        {
            id: 'i',
            title: 'i',
        },
    ];

    type ItemProps = {title: string};

    const Item = ({title}: ItemProps) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
    );


    return(
        <View
            style={{
                flex: 1,
                backgroundColor: "rgb(56, 56, 56)",
                margin: 0,
                padding: 0,
                alignItems: "center"
        }}>
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
                    }}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="123456"
                    placeholderTextColor= "rgba(121, 121, 121, 0.73)"
            
                  ></TextInput>

            <FlatList
                style={[styles.flatList]}
                data={DATA}
                renderItem={({item}) => <Item title={item.title} />}
                keyExtractor={item => item.id}
            />


        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    borderColor: "red",
    borderWidth: 1,
    flexDirection: "row",
  },
  item: {
    
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,

  },
  title: {
    fontSize: 32,
  },
});