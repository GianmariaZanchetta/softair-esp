import { Pressable, Text, View, TextInput, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function GoBack(){

    const router = useRouter()

    function getBack (){
        router.replace("/")
    }

    return(
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
    )
}