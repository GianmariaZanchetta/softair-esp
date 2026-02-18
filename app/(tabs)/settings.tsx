import { Pressable, Text, View, TextInput, Button, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import GoBack from "../components/goBack";

export default function Index(){



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
                    }}
                >Impostazioni</Text>

            </View>

            <View 
                style={{
                        marginTop: 0,
                        flex: 2,
                    }}
                >
                
                <FlatList 
                    data={[
                        {key: 'settings1'},
                        {key: 'settings2'},
                        {key: 'settings3'},
                        {key: 'settings4'},
                        {key: 'settings5'},
                        {key: 'settings6'},
                    ]}
                    renderItem={({item})=>
                        <Pressable
                            style={{
                                width: '100%',
                                borderColor: 'black',
                                borderWidth: 1,
                            }}
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