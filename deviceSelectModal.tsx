import React, { FC, useCallback } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Modal,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
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
                marginBottom: 5,
                borderRadius: 8,
            }}
            >
            <Text style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "rgb(109, 109, 109)",
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
        backgroundColor: "rgb(109, 109, 109)",
      }}
      animationType="slide"
      transparent={false}
      visible={visible}
    >
      <SafeAreaProvider style={{
            flex: 1,
            backgroundColor: "rgb(109, 109, 109)",
      }}>
        <Text 
            style={{
                marginTop: 40,
                fontSize: 30,
                fontWeight: "bold",
                marginHorizontal: 20,
                textAlign: "center",
            }}>
          Connettiti a un dispositivo
        </Text>

        <FlatList
          style={{
                flex: 1,
                //justifyContent: "center",
          }}
          data={devices}
          renderItem={renderDeviceModalListItem}
        />



      </SafeAreaProvider>
    </Modal>
  );
};

export default DeviceModal;

