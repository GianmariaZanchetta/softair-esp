import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import { useRouter } from "expo-router";



export default function WrongCodeModal({retryPsw}: {retryPsw: any}){

    const router = useRouter()

    async function abort(){
        console.log('abort')
        router.push('/')
    }

    async function retry(){
        console.log('retry')
        retryPsw()
    }

    return(
        
        <View
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
                    style={style.styleViewAbort}
                    onPress={abort}
                >
                    <View pointerEvents="none" style={[style.angle, style.tl]}></View>
                    <View pointerEvents="none" style={[style.angle, style.tr]}></View>
                    <View pointerEvents="none" style={[style.angle, style.bl]}></View>
                    <View pointerEvents="none" style={[style.angle, style.br]}></View>
                    
                    <Text
                        style={style.styleText}
                    >Esci</Text>
                </Pressable>


                <Pressable
                    style={style.styleViewRetry}
                    onPress={retry}
                >
                    <View pointerEvents="none" style={[style.angle, style.tl]}></View>
                    <View pointerEvents="none" style={[style.angle, style.tr]}></View>
                    <View pointerEvents="none" style={[style.angle, style.bl]}></View>
                    <View pointerEvents="none" style={[style.angle, style.br]}></View>

                    <Text
                        style={style.styleText}
                    >Riprova</Text>
                </Pressable>

            </View>

        </View>
    )
}

const style = StyleSheet.create({
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
})