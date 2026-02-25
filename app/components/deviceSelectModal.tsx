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
            closeModal();
        }, [closeModal, connectToPeripheral, item.item]);

        return (
            <TouchableOpacity
            onPress={connectAndCloseModal}
            style={{
                backgroundColor: "rgb(255, 203, 5)",
                justifyContent: "center",
                alignItems: "center",
                height: 50,
                marginHorizontal: 20,
                marginTop: 10,
                marginBottom: 10,
                borderRadius: 8,
            }}
            >
            <Text style={{
                fontSize: 25,
                color: "rgb(0, 0, 0)",
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
          backgroundColor: "rgb(255, 203, 5)",
          borderRadius: 10,
          marginTop: 50,
          borderColor: "rgb(255, 203, 5)",
          borderWidth: 2,
          marginBottom: 50,
        }}
        onPress={closeModal}
      >
        <Text
          style={{
            fontSize: 35,
            color: "rgb(0, 0, 0)",
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

