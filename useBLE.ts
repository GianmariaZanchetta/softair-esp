import { PermissionsAndroid, Platform } from "react-native";
import { useMemo, useState, useRef } from "react";
import {BleError, BleManager, Characteristic, Device, Subscription} from "@sfourdrinier/react-native-ble-plx"
//import { Base64 } from "@sfourdrinier/react-native-ble-plx";
import { Buffer } from "buffer";

import * as ExpoDevice from "expo-device"

const SERVICE_UUID= "12345678-1234-1234-1234-1234567890ab";
const CMD_UUID = "12345678-1234-1234-1234-1234567890ac";
const STATE_UUID = "12345678-1234-1234-1234-1234567890ad";

interface BluetoothLowEnergyApi{
    requestPermissions(): Promise<boolean>;
    scanForPeripherals(): void;
    allDevices: Device[];
    connectToDevice: (device: Device) => Promise<void>;
    connectedDevice: Device | null;
    command: string;
    disconnectFromDevice(): void;
    sendCommand: (cmd: "UP" | "DOWN" | "STOP") => Promise<void>;
    sendStop: () => Promise<void>;
    sendUp: () => Promise<void>;
    sendDown: () => Promise<void>;
    isReady: boolean;
}

function useBLE(): BluetoothLowEnergyApi{
    const bleManager = useMemo(()=> new BleManager(), []);

    const [allDevices, setAllDevices] = useState<Device[]>([])
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(null)
    const [command, setCommand] = useState<string>('stop')
    const [deviceState, setDeviceState]= useState<string | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false)


    const lastStateAtRef = useRef<number>(0)
    const stateSubRef = useRef<Subscription | null>(null)

    const decodeB64 = (b64: string) =>Buffer.from(b64, 'base64').toString('utf-8');
    const encodeB64 = (txt: string) =>Buffer.from(txt, 'utf-8').toString('base64')

    
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
        console.log('1')
        bleManager.startDeviceScan(null, null, (error, device)=>{
            if(error) {
                console.log('error: ', error);
            }
            
            if(device && device.name?.includes('ESP-Attuatore')) {
                setAllDevices((prevState)=>{
                    if(!isDuplicateDevice(prevState, device)) {
                        console.log('scanForPeripherals', ...prevState, device)
                        return [...prevState, device]
                    }
                    return prevState;
                })
            }
        } )
    };



    //connettere dispositivi
    const connectToDevice = async(device: Device) =>{
        console.log('2')
        try{
            const deviceConnection = await bleManager.connectToDevice(device.id);
            setConnectedDevice(deviceConnection);
            console.log('connectedDevice: ', connectedDevice, 'deviceConnection: ', deviceConnection)
            //alert('dispositivo')
            await deviceConnection.discoverAllServicesAndCharacteristics();
            bleManager.stopDeviceScan();

            await startStreamingService(deviceConnection);//servirà veramente? verificare....
            await handshake(deviceConnection);
        } catch(e) {
            console.log("Error In connection", e);
            alert('device disconnesso errore')
        }
    };

    const onStateUpdate = (
        error: BleError | null,
        characteristic: Characteristic | null
    ) =>{
        console.log('3')
        console.log("NOTIFY from:", characteristic?.serviceUUID, characteristic?.uuid);
        console.log("RAW:", characteristic?.value);
        console.log("DEC:", characteristic?.value ? decodeB64(characteristic.value) : null);
        console.log('error: ', error, 'characteristic: ', characteristic)
        if( error ){
            console.log('onStateUpdate: ', error)
            alert('onStateUpdate alert 1')
            return
        } else if (!characteristic?.value) {
            console.log('onStateUpdate no data recived')
            return
        }
        const rawData = decodeB64(characteristic.value)
        setDeviceState(rawData)
        setIsReady(true)
        lastStateAtRef.current = Date.now()
        console.log('rawData: ', rawData)
    }


    const startStreamingData = async (device: Device) =>{
        if (device) {
            device.monitorCharacteristicForService(
            SERVICE_UUID,
            STATE_UUID,
            onStateUpdate
            )
        } else {
            'no device connected'
        }
    }

    const disconnectFromDevice = ()=>{
        console.log('4')
            stateSubRef.current?.remove();
            stateSubRef.current = null;

        if(connectedDevice){
            bleManager.cancelDeviceConnection(connectedDevice.id);
            setConnectedDevice(null);
            setCommand('stop')
            setIsReady(false);
            setDeviceState(null);
            //alert('device disconnesso')
        }
    }



    //send command
    type Cmd = "UP" | "DOWN" | "STOP";

    const sendCommand = async (cmd: Cmd) => {
        console.log('5')
        console.log('connectedDevice: ', connectedDevice)
        if (!connectedDevice) {
            console.log("sendCommand Nessun device connesso");
            return;
        }
        try {
            console.log('try to send')
            const valueBase64 = Buffer.from(cmd, "utf8").toString("base64");

            await connectedDevice.writeCharacteristicWithResponseForService(
            SERVICE_UUID,
            CMD_UUID,
            valueBase64
            );

            setCommand(cmd.toLowerCase()); // se vuoi tenere il tuo state come 'stop'
            console.log("Inviato comando: ", cmd);
        } catch (e) {
            console.log("Errore invio comando: ", e);
        }
    };

    const sendStop = () => sendCommand("STOP");
    const sendUp = () => sendCommand("UP");
    const sendDown = () => sendCommand("DOWN");


    //check connection
    const startStreamingService = (device: Device) => {
        console.log('6')
        console.log('device startStreamingService: ', device)
        console.log(' stateSubRef startStreamingService1: ', stateSubRef.current)
        stateSubRef.current?.remove();

        stateSubRef.current = device.monitorCharacteristicForService(
            SERVICE_UUID,
            STATE_UUID,
            onStateUpdate,
        )
        console.log('stateSubRef startStreamingService2: ', stateSubRef.current)
    }


    const readStateOnce = async (device: Device) => {
        console.log('7')
        const ch = await device.readCharacteristicForService(
            SERVICE_UUID,
            STATE_UUID,
        )
        console.log('ch: ', ch)
        if(!ch.value) return null;  
        const s = decodeB64(ch.value);
        setDeviceState(s)
        console.log('s: ', s)
        return s
    }

    //const state = await readStateOnce(deviceConnection)

    const waitForStateChange = async (timeoutMs = 2000) => {
        console.log('8')
        const start = lastStateAtRef.current;
        const t0 = Date.now();

        while (Date.now() - t0 < timeoutMs) {
            if (lastStateAtRef.current > start) return true;
            await new Promise((r) => setTimeout(r, 50));
        }
        return false;
        };

        const handshake = async (device: Device) => {
            console.log('9')
            console.log('device handshake: ', device)
            try{
                // 1) subscribe notify
                startStreamingService(device);//viene inviato anche dal 6 è corretto?

                // 2) read stato attuale (molto importante nel tuo firmware)
                const initial = await readStateOnce(device);
                console.log("Initial STATE (read):", initial);

                // 3) invia STOP e aspetta una notify (di solito torna IDLE)
                await device.writeCharacteristicWithResponseForService(
                    SERVICE_UUID,
                    CMD_UUID,
                    encodeB64("STOP")
                );

                const changed = await waitForStateChange(2000);
                if (!changed) {
                    throw new Error("Handshake fallito: nessuna notify dopo STOP");
                }

                // opzionale: verifica contenuto
                // se vuoi essere strict:
                // if (deviceState !== "IDLE") ...

                setIsReady(true);
            } catch(e){
                console.log('handshake e: ', e)
                alert('handshake')
            }
        };



    return {
        scanForPeripherals,
        requestPermissions,
        allDevices,
        connectToDevice,
        connectedDevice,
        command,
        disconnectFromDevice,
        sendCommand,
        sendStop,
        sendUp,
        sendDown,
        isReady,
    };
}

export default useBLE;