import { Pressable, Text, View, TextInput, Button, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import GoBack from "../components/goBack";
import { useBle } from "@/useBleContext";

export default function Index(){

    const router = useRouter();

const {disconnectFromDevice} = useBle()

const adminRequestFunction=()=>{
    router.push("/(tabs)/admin/AdminLogin")
}

    return(
        <View
            style={{
                flex: 1,
                backgroundColor: "rgb(56, 56, 56)",
                margin: 0,
                padding: 0,
            }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >

                <GoBack />

                <Text
                    style={{
                        color: 'white',
                        fontSize: 25,
                        fontWeight: 600,
                        marginTop: 0,
                        marginBottom: 0,
                    }}
                >Impostazioni</Text>

            </View>

            <View 
                style={{
                        alignItems: 'center',
                        marginTop: 0,
                        flex: 2,
                        margin: 0,
                    }}
                >
                
                <FlatList 
                    style={{
                        marginTop: '0%',
                        width: '70%'
                    }}
                    data={[
                        {key: 'Disconnetti ble device', func: disconnectFromDevice},
                        {key: 'Admin settings', func: adminRequestFunction},

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
                        
                    }
                />

                </View>
        </View>
    )
}