import { useState, FC, useCallback } from "react";
import { Pressable, Text, View, TextInput, Button, StyleSheet, Modal, Alert } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useBle } from "@/useBleContext";
import { useRouter } from "expo-router";


type AdminModalProps = {
    closeModal: () => void,
    visible: boolean,
}


const ChangeSecret: FC<AdminModalProps> = (props) => {

    const {closeModal, visible} = props

    const [code, setCode] = useState("")
    const {connectedDevice, isReady, sendString} = useBle();
    const router = useRouter()

    const sendNewCode = ()=>{
        if(code !== "") {
            if(connectedDevice && isReady){
                try{
                    const codeToSend = `SET_SECRET:${code}`
                    sendString(codeToSend)
                } catch(e){
                    console.error(e);
                    Alert.alert(
                        'Errore',
                        `Errore durante l'invio del codice`,
                        [{text: 'ok', onPress:()=>{router.replace('/')}}],
                        { cancelable: false },
                    )
                }
            } else {
                Alert.alert(
                  'Dispositivo disconnesso',
                  'Dispositivo disconnesso',
                  [{text: 'ok', onPress:()=>{router.replace('/')}}],
                  { cancelable: false },
                )
            }
            //invia il nuovo codice SE COLLEGATO E RESTITUIRE UN ALERT
        } else {
            alert("Codice non valido")
        }
    
    }

    return(
        <>
            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
        >
                <SafeAreaProvider
                    style={style.safeArea}
                >
                    <Pressable
                            onPress={closeModal}
                            style={{
                                position: "absolute",
                                top: 20,
                                left: 12,
                                padding: 10,
                                borderRadius: 1,
                            }}
                            hitSlop={10}
                        >

                            <Ionicons name="arrow-back-outline" size={22} 
                            style={{
                            color: "white",
                            }}
                            />
                        
                    </Pressable>

                    <Text
                        style={style.text}
                    >Inserisci il nuovo codice</Text>

                    <TextInput
                        style={style.textInput}
                            onChangeText={setCode}
                            value={code}
                            placeholder="123456"
                            placeholderTextColor= "rgba(121, 121, 121, 0.73)"  
                    >
                    </TextInput>

                    <Pressable
                        style={style.pressable}
                        onPress={sendNewCode}
                    >
                            <View pointerEvents="none" style={[style.angle, style.tl]}></View>
                            <View pointerEvents="none" style={[style.angle, style.tr]}></View>
                            <View pointerEvents="none" style={[style.angle, style.bl]}></View>
                            <View pointerEvents="none" style={[style.angle, style.br]}></View>
                    
                            <Text
                              style={{
                                marginTop: 16,
                                fontSize: 30,
                                fontFamily: 'CallOfOpsDuty',
                                color: "rgb(255, 255, 255)",
                              }}
                            >
                              Modifica
                            </Text>
                    

                    </Pressable>

                </SafeAreaProvider>
            </Modal>
        </>
    )
}
export default ChangeSecret

const style = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: "rgb(78, 78, 78)",
        alignItems: 'center',
    },
    safeArea: {
        flex: 1,
        backgroundColor: "rgb(78, 78, 78)",
        alignItems: 'center',
    },
    text: {
        fontFamily: 'CallOfOpsDuty',
        color: 'white',
        fontSize: 25,
        fontWeight: 600,
        marginTop: 40,
        marginBottom: 0,
    },
    textInput: {
        height: 45,
        width: 210,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        //borderRadius: 10,
        borderColor: "rgb(255, 255, 255)",
        color: 'white',
        textAlign: "center",
        fontSize: 20,
        backgroundColor: 'rgb(15, 15, 15)',
    },
    pressable: {
        marginTop: 60,
        width: 170,
        height: 60,
        alignItems: "center",
        backgroundColor: "rgb(44, 44, 44)",
        //borderRadius: 10,
        borderColor: "rgb(255, 255, 255)",
        borderWidth: 1,
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
})