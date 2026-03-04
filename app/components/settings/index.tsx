import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";


export default function SettingsIco() {

  const router = useRouter()

  function toSettings(){
    console.log("settings")
    router.replace("/settings")
  }

    return(
        <Pressable
                onPress={toSettings}
                  style={{
                    position: "absolute",
                    top: 30,
                    right: 40,
                    padding: 10,
                    borderRadius: 1,
                  }}
                  hitSlop={10}
              >
                <Ionicons name="settings-outline" size={22} 
                style={{
                  color: "white",
                }}
                />
              
        </Pressable>
    )
}