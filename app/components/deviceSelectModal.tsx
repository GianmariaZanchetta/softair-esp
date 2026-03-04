import React, { FC, useCallback } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Modal,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";


import { Device } from "@sfourdrinier/react-native-ble-plx";




    type DeviceModalListItemProps = {
        item: ListRenderItemInfo<Device>;
        connectToPeripheral: (device: Device) => void;
        closeModal: () => void;
    };

    type DeviceModalProps = {
        devices: Device[];
        visible: boolean;
        connectToPeripheral: (device: Device) => void;
        closeModal: () => void;
    };

    const DeviceModalListItem: FC<DeviceModalListItemProps> = (props) => {
        const { item, connectToPeripheral, closeModal } = props;

        const connectAndCloseModal = useCallback(() => {
          //console.log(item)
            connectToPeripheral(item.item);
            //closeModal();
        }, [closeModal, connectToPeripheral, item.item]);

        return (
            <TouchableOpacity
            onPress={connectAndCloseModal}
            style={{
                backgroundColor: "rgb(65, 64, 64)",
                justifyContent: "center",
                alignItems: "center",
                height: 50,
                marginHorizontal: 20,
                marginTop: 10,
                marginBottom: 10,
                borderWidth: 1,
                borderColor: 'rgb(255, 255, 255)'
                //borderRadius: 8,
            }}
            >
                      <View pointerEvents="none" style={[style.angle, style.tl]}></View>
                      <View pointerEvents="none" style={[style.angle, style.tr]}></View>
                      <View pointerEvents="none" style={[style.angle, style.bl]}></View>
                      <View pointerEvents="none" style={[style.angle, style.br]}></View>
            <Text style={{
                fontSize: 25,
                color: "rgb(255, 255, 255)",
                fontFamily: 'CallOfOpsDuty',
            }}>{item.item.name}</Text>
            </TouchableOpacity>
        );
    };

    const DeviceModal: FC<DeviceModalProps> = (props) => {
    const { devices, visible, connectToPeripheral, closeModal } = props;

    const renderDeviceModalListItem = useCallback(
      
        (item: ListRenderItemInfo<Device>) => {
        return (
            <DeviceModalListItem
            item={item}
            connectToPeripheral={connectToPeripheral}
            closeModal={closeModal}
            />
        );
        },
        [closeModal, connectToPeripheral]
    );




    return(
      <Modal
        style={{
          flex: 1,
          backgroundColor: "rgb(78, 78, 78)",
          alignItems: 'center',
        }}
        animationType="slide"
        transparent={false}
        visible={visible}
      >
        <SafeAreaProvider style={{
              flex: 1,
              backgroundColor: "rgb(78, 78, 78)",
              alignItems: 'center',
        }}>
          <Text 
              style={{
                  marginTop: 40,
                  fontSize: 40,
                  fontWeight: 600,
                  marginHorizontal: 20,
                  textAlign: "center",
                  color: 'rgb(255, 255, 255)',
                  fontFamily: 'CallOfOpsDuty',
                  
              }}>
            Connetti un dispositivo
          </Text>

          <FlatList
            style={{
                  flex: 1,
                  //justifyContent: "center",
                  backgroundColor: 'rgb(78, 78, 78)',
                  height: 10,
                  width: 300,
                  marginTop: 10,
            }}
            data={devices}
            renderItem={renderDeviceModalListItem}
          />

        <Pressable
          style={{
            
            width: 200,
            height: 70,
            alignItems: "center",
            backgroundColor: "rgb(65, 64, 64)",
            //borderRadius: 10,
            marginTop: 50,
            borderColor: "rgb(255, 255, 255)",
            borderWidth: 1,
            marginBottom: 50,
          }}
          onPress={closeModal}
        >
                        <View pointerEvents="none" style={[style.angle, style.tl]}></View>
                        <View pointerEvents="none" style={[style.angle, style.tr]}></View>
                        <View pointerEvents="none" style={[style.angle, style.bl]}></View>
                        <View pointerEvents="none" style={[style.angle, style.br]}></View>
          <Text
            style={{
              fontSize: 35,
              color: "rgb(255, 255, 255)",
              marginTop: 20,
              fontFamily: 'CallOfOpsDuty',
            }}
          >
            Annulla
          </Text>
        </Pressable>

        </SafeAreaProvider>
      </Modal>
  );
};

export default DeviceModal;

const style = StyleSheet.create({
  angle: {
    position: "absolute", width: 14, height: 14, borderColor: 'rgb(255, 255, 255)',
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