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
                backgroundColor: 'rgb(255, 0, 0)',
                height: 170,
                width: 450,
                marginTop: 110,
                zIndex: 1,
                borderRadius: 8,

            }}
            
        >
            <Text
                style={{
                    color: 'rgb(255,255,255)',
                    fontSize: 40,
                    fontWeight: 600,
                }}
            >Codice Errato!</Text>

            <View
                style={{
                    flexDirection: 'row',
                }}
            >

                <Pressable
                    style={style.styleView}
                    onPress={abort}
                >
                    <Text
                        style={style.styleTextAbort}
                    >Esci</Text>
                </Pressable>


                <Pressable
                    style={style.styleView}
                    onPress={retry}
                >
                    <Text
                        style={style.styleTextRetry}
                    >Riprova</Text>
                </Pressable>

            </View>

        </View>
    )
}

const style = StyleSheet.create({
    styleView: {
        flexDirection: 'row',
        

    },
    styleTextAbort: {
        margin: 50,
        fontSize: 24,
        backgroundColor: 'rgb(106, 224, 52)',
        padding: 10,
        borderRadius: 6,
    },
    styleTextRetry: {
        margin: 50,
        fontSize: 24,
        backgroundColor: 'rgb(224, 178, 52)',
        padding: 10,
        borderRadius: 6,
    }
})