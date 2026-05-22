import { Pressable, Text, View, TextInput, Button, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Index(){

    const router = useRouter();

    function adminRequestFunction(){
        router.replace("/(tabs)/admin/AlienGameAdminLogin")
    }
    
    function getBack (){
            console.log("alien game")
            router.replace("/(tabs)/alienGame")
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

                <Pressable
                    onPress={getBack}
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
                        {key: 'Admin settings', func: adminRequestFunction},

                    ]}
                    renderItem={({item, index})=>
                        <Pressable
                            style={{
                                width: '100%',
                                borderColor: 'black',
                                borderWidth: 1,
                                borderTopWidth: index === 0 ? 1 : 0,
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