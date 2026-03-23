import { View, Text, StyleSheet, Pressable, FlatList } from "react-native"
import GoBack from "@/app/components/goBack"
import { useState } from "react"
import ChangeSecret from "./ChangeSecret"
import { useBle } from "@/useBleContext"


export default function ControlEsp() {

    const [visibleModal, setVisibleModal] = useState(false)
    const {connectedDevice, isReady} = useBle();
    



    function changeESPCode(){
        if(connectedDevice && isReady){
            setVisibleModal(true)
        }
    };

    function resetSecret(){
        if(connectedDevice && isReady){
        //se collegata resetto il codice e restituisco alert se ho successo

        }
    }

    function lowerActuator () {
        if(connectedDevice && isReady){

        }
    }

    function riseActuator () {
        if(connectedDevice && isReady){

        }
    }


    return(
        <>
            <View
                style={style.view}
            >

                <ChangeSecret 
                    closeModal={()=>setVisibleModal(false)}
                    visible={visibleModal}

                />


                <GoBack />

                <Text
                    style={{
                        color: 'white',
                        fontSize: 25,
                        fontWeight: 600,
                        marginTop: 50,
                        marginBottom: 0,
                    }}
                >Impostazioni</Text>
                <FlatList 
                    style={{
                        marginTop: '5%',
                        width: '70%'
                    }}
                    data={[
                        {key: 'Cambia codice ESP', func: changeESPCode},
                        {key: 'Resetta codice ESP', func: resetSecret},
                        {key: 'Abbassa attuatore', func: lowerActuator},
                        {key: 'Alza attuatore', func: riseActuator},

                    ]}
                    renderItem={({item})=>
                        <Pressable
                            style={{
                                width: '100%',
                                borderColor: 'black',
                                borderWidth: 1,
                            }}
                            onPress={item.func}
                        >
                        
                            <Text
                            style={{
                                color: 'white',
                                fontSize: 15,
                                margin: 15,
                                marginLeft: 30,
                            }}
                            >{item.key}</Text>
                        </Pressable>
                    } />
        </View>
    </>
)
}

const style = StyleSheet.create({
    view: {
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(56, 56, 56)",
    },
    })