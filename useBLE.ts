import { PermissionsAndroid, Platform } from "react-native";
import { useMemo, useState } from "react";
import {BleManager, Device} from "@sfourdrinier/react-native-ble-plx"

import * as ExpoDevice from "expo-device"


interface BluetoothLowEnergyApi{
    requestPermissions(): Promise<boolean>;
    scanForPeripherals(): void;
    allDevices: Device[];
    connectToDevice: (deviceId: Device) => Promise<void>;
    connectedDevice: Device | null;
}

function useBLE(): BluetoothLowEnergyApi{
    const bleManager = useMemo(()=> new BleManager(), []);

    const [allDevices, setAllDevices] = useState<Device[]>([])
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(null)
 
    
    const requestAndroid31Permissions = async () => {

        const bluetoothScanPermissions = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            {
                title: "BLUETOOTH Scan Permission",
                message: "Fornisci i permessi dalle impostazioni dell'applicazione",
                buttonPositive: "ok",
            }
        )

        const bluetoothConnectPermissions = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            {
                title: "BLUETOOTH Connect Permission",
                message: "Fornisci i permessi dalle impostazioni dell'applicazione",
                buttonPositive: "ok",
            }
        )

        const bluetoothFineLocationPermissions = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "LOCATION Permission",
                message: "Fornisci i permessi dalle impostazioni dell'applicazione",
                buttonPositive: "ok",
            }
        )



        return (
            bluetoothScanPermissions === "granted" &&
            bluetoothConnectPermissions === "granted" &&
            bluetoothFineLocationPermissions === "granted"
        );
    }


    const requestPermissions = async () => {
        if(Platform.OS === "android") {
            if((ExpoDevice.platformApiLevel ?? -1) < 31 ) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "LOCATION Permission",
                        message: "Fornisci i permessi dalle impostazioni dell'applicazione",
                        buttonPositive: "ok",
                    }
                )
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            }else{
                const isAndroid31PermissionGranted = await requestAndroid31Permissions();

                return isAndroid31PermissionGranted
            }
            
        }else{
            return true;
        }
    }

    const isDuplicateDevice = (devices: Device[], nextDevice: Device) => devices.findIndex((device)=>nextDevice.id === device.id) > -1;

    const scanForPeripherals = () => {
        bleManager.startDeviceScan(null, null, (error, device)=>{
            if(error) {
                console.log('error: ', error);
            }
            if(device && device.name?.includes('ESP-Attuatore')) {
                setAllDevices((prevState)=>{
                    if(!isDuplicateDevice(prevState, device)) {
                        return [...prevState, device]
                    }
                    return prevState;
                })
            }
        } )
    };

    const connectToDevice = async(device: Device) =>{
        try{
            const deviceConnection = await bleManager.connectToDevice(device.id);
            setConnectedDevice(deviceConnection);
            await deviceConnection.discoverAllServicesAndCharacteristics();
            bleManager.stopDeviceScan();
        } catch(e) {
            console.log("Error In connection", e);
        }
    };

    return {
        scanForPeripherals,
        requestPermissions,
        allDevices,
        connectToDevice,
        connectedDevice,
    };
}

export default useBLE;