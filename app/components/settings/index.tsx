import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function SettingsIco() {

  const router = useRouter()

  function toSettings(){
    console.log("settings")
    router.push("/settings")
  }

    return(
        <Pressable
                onPress={toSettings}
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 12,
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