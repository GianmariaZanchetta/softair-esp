import { PermissionsAndroid, Platform, Alert } from "react-native";
import { useMemo, useState, useRef, useEffect } from "react";
import {BleError, BleManager, Characteristic, Device, Subscription} from "@sfourdrinier/react-native-ble-plx"
//import { Base64 } from "@sfourdrinier/react-native-ble-plx";
import { Buffer } from "buffer";
import { useRouter } from "expo-router";

import * as ExpoDevice from "expo-device"

const SERVICE_UUID= "12345678-1234-1234-1234-1234567890ab";
const CMD_UUID = "12345678-1234-1234-1234-1234567890ac";
const STATE_UUID = "12345678-1234-1234-1234-1234567890ad";
const RESP_UUID  = "12345678-1234-1234-1234-1234567890ae";//risponde se il codice segreto inviato è true o false

interface BluetoothLowEnergyApi{
    requestPermissions(): Promise<boolean>;
    scanForPeripherals(): void;
    allDevices: Device[];
    connectToDevice: (device: Device) => Promise<void>;
    connectedDevice: Device | null;
    command: string;
    disconnectFromDevice(): void;
    sendCommand: (cmd: "CMD:UP" | "CMD:DOWN" | "CMD:STOP") => Promise<void>;//comandi per attuatore
    sendString: (str: string) => Promise<void>;//invia stringa 
    sendStop: () => Promise<void>;
    sendUp: () => Promise<void>;
    sendDown: () => Promise<void>;
    isReady: boolean;
    verifiedEsp: boolean | null;
    pswAttempt: number;
    verifyPassword: (password: string) => Promise<boolean>;

}

function useBLE(): BluetoothLowEnergyApi{



    const instanceId = useRef(Math.random().toString(16).slice(2)).current;
    console.log("useBLE instance:", instanceId);

    const bleManager = useMemo(()=> new BleManager(), []);

    const [allDevices, setAllDevices] = useState<Device[]>([])
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(null)
    const [command, setCommand] = useState<string>('stop')
    const [deviceState, setDeviceState]= useState<string | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false)
    const [verifiedEsp, setVerifiedEsp] = useState<boolean | null>(null)
    const [pswAttempt, setPswAttempt] = useState<number>(0);

    type PendingVerify = {
        resolve: (value: boolean) => void;
        reject: (reason?: unknown) => void;
        timeoutId: ReturnType<typeof setTimeout>;
    };
    const pendingVerifyRef = useRef<PendingVerify | null>(null);


    const lastStateAtRef = useRef<number>(0)
    const stateSubRef = useRef<Subscription | null>(null)
    const secretSubRef = useRef<Subscription | null>(null)

    const connectedDeviceRef = useRef<Device | null>(null)

    /*const verifyPendingRef = useRef<{
        resolve: (ok: boolean) => void;
        reject: (e: Error) => void;
        timeoutId: ReturnType<typeof setTimeout>;
    } | null>(null)*/

    const decodeB64 = (b64: string) =>Buffer.from(b64, 'base64').toString('utf-8');
    const encodeB64 = (txt: string) =>Buffer.from(txt, 'utf-8').toString('base64')

    const router = useRouter()
    function alertToHome(){
        Alert.alert(
            'Device disconnesso',
            `In caso di problemi si consiglia il riavvio dell'applicazione e del dispositivo remoto`,
            [{text: 'Ok', 
                onPress: ()=>{/*router.replace('/')*/}

            }],
            {cancelable: false},
        )
    }


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
                console.log('error scanForPeripherals: ', error);
                
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
        //setTimeout(()=> bleManager.stopDeviceScan(), 60000) //crea problemi
    };



    //connettere dispositivi
    const connectToDevice = async(device: Device) =>{
        console.log('2')
        try{
            const deviceConnection = await bleManager.connectToDevice(device.id);
            connectedDeviceRef.current = deviceConnection
            setConnectedDevice(deviceConnection);
            console.log('connectedDevice: ', deviceConnection, 'deviceConnection: ', deviceConnection)
            //alert('dispositivo')
            await deviceConnection.discoverAllServicesAndCharacteristics();
            await bleManager.stopDeviceScan();

            //await startStreamingService(deviceConnection);//servirà veramente? verificare....
            await handshake(deviceConnection);
        } catch(e) {
            console.log("2 Error In connection", e);
            //alert('device disconnesso errore')
            setIsReady(false);
            alertToHome()
                    //---------------------------errore qui
                }
            };


    function checkKonownMessages(rawData: string): void {
        console.log("rawData messages: ", rawData)
        if(rawData === 'RESET_SECRET:TRUE') {
            Alert.alert(
                'Codice segreto ripristinato',
                'Adesso puoi inserire il codice di default',
                [{text: 'ok'}],
                {cancelable: false}
            )
        } else if(rawData.includes('SET_SECRET:')){
            Alert.alert(
                'Codice segreto modificato',
                'Adesso puoi inserire il tuo codice',
                [{text: 'ok'}],
                {cancelable: false}
            )  
        }  
        //da abilitare solo in debug(altrimenti escono a fine game)
        /* else if(rawData === 'CMD:UP') {
            Alert.alert(
                'Comando inviato correttamente',
                'Allungo attuatore',
                [{text: 'ok'}],
                {cancelable: false}
            )
        } else if(rawData === 'CMD:DOWN') {
            Alert.alert(
                'Comando inviato correttamente',
                'Accorcio attuatore',
                [{text: 'ok'}],
                {cancelable: false}
            )
        } else if(rawData === 'CMD:STOP') {
            Alert.alert(
                'Comando inviato correttamente',
                'Fermo attuatore',
                [{text: 'ok'}],
                {cancelable: false}
            )
        } */
    }


    const onStateUpdate = (
        error: BleError | null,
        characteristic: Characteristic | null
    ) =>{
        console.log('3')
        console.log("NOTIFY from:", characteristic?.serviceUUID, characteristic?.uuid);
        console.log("RAW:", characteristic?.value);
        console.log("DECIFRATO:", characteristic?.value ? decodeB64(characteristic.value) : null);
        console.log('error: ', error, 'characteristic: ', characteristic)
        if(error){
            console.log('1 onStateUpdate: ', error)
            //alert('onStateUpdate alert ')
            
            setIsReady(false);
            Alert.alert(
                'Device disconnesso',
                `In caso di problemi si consiglia il riavvio dell'applicazione e del dispositivo remoto`,
                [{text: 'Ok', 
                    onPress: ()=>{}

                }],
                {cancelable: false},
            )
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
        checkKonownMessages(rawData);
    }




    const verifyPassword = async (password: string, timeoutMs = 5000): Promise<boolean> => {
        const dev = connectedDeviceRef.current;

        if (!dev || !isReady) {
            throw new Error("DEVICE_NOT_READY");
        }

        if (pendingVerifyRef.current) {
            throw new Error("VERIFY_ALREADY_PENDING");
        }

        return new Promise<boolean>(async (resolve, reject) => {
            const timeoutId = setTimeout(() => {
            pendingVerifyRef.current = null;
            reject(new Error("VERIFY_TIMEOUT"));
            }, timeoutMs);

            pendingVerifyRef.current = {
            resolve,
            reject,
            timeoutId,
            };

            try {
            await sendString(`VERIFY_SECRET:${password}`);
            } catch (err) {
            clearTimeout(timeoutId);
            pendingVerifyRef.current = null;
            reject(err);
            }
        });
    };



    const onResponseUpdate = (
        error: BleError | null,
        characteristic: Characteristic | null
    ) => {
        console.log('11')
        console.log("NOTIFY from:", characteristic?.serviceUUID, characteristic?.uuid);
        console.log("RAW:", characteristic?.value);
        console.log("DECIFRATO:", characteristic?.value ? decodeB64(characteristic.value) : null);
        console.log('error: ', error, 'characteristic: ', characteristic)
        if(error){
            console.log('1 onResponseUpdate: ', error)
            //alert('onResponseUpdate alert ')

            const pending = pendingVerifyRef.current;
                if (pending) {
                clearTimeout(pending.timeoutId);
                pendingVerifyRef.current = null;
                pending.reject(error);
            }
            
            setIsReady(false);
            Alert.alert(
                'Device disconnesso',
                `In caso di problemi si consiglia il riavvio dell'applicazione e del dispositivo remoto`,
                [{text: 'Ok', 
                    onPress: ()=>{}

                }],
                {cancelable: false},
            )
            return
        } 
        if (!characteristic?.value) {
            console.log('onResponseUpdate no data recived')
            return
        }
        const rawData = decodeB64(characteristic.value)
        console.log('rawData: ', rawData)

        /*if (rawData === "VERIFY_OK" || "VERIFY_FALSE"){//togliere verify false
            const ok = rawData === "VERIFY_OK"

            if(verifyPendingRef.current) {
                clearTimeout(verifyPendingRef.current.timeoutId);
                verifyPendingRef.current.resolve(ok);
                verifyPendingRef.current = null;
            }
            return
        }*/



        if (rawData !== "VERIFY_OK" && rawData !== "VERIFY_FALSE") return
            const ok = rawData === "VERIFY_OK";

            setVerifiedEsp(ok);
            setPswAttempt(prev => prev + 1);

            const pending = pendingVerifyRef.current;
            if (pending) {
                clearTimeout(pending.timeoutId);
                pendingVerifyRef.current = null;
                pending.resolve(ok);
            }

        /*if(rawData === "VERIFY_OK") {
            setPswAttempt(prev => prev+1)
            console.log("pswAttempt: ", pswAttempt)
            setVerifiedEsp(true)
            console.log("verificato psw")
        } else {
            setPswAttempt(prev => prev+1)
            console.log("pswAttempt: ", pswAttempt)
            setVerifiedEsp(false)
            console.log("psw errata")
        }*/
        //-----------------------------------------------------------------------
    }


    /*const startStreamingData = async (device: Device) =>{
        if (device) {
            device.monitorCharacteristicForService(
            SERVICE_UUID,
            STATE_UUID,
            onStateUpdate
            )
        } else {
            'no device connected'
        }
    }*/

    const disconnectFromDevice = ()=>{
        console.log('4')
            stateSubRef.current?.remove();
            stateSubRef.current = null;

            secretSubRef.current?.remove();
            stateSubRef.current = null;

        const pending = pendingVerifyRef.current;
        if (pending) {
            clearTimeout(pending.timeoutId);
            pendingVerifyRef.current = null;
            pending.reject(new Error("DEVICE_DISCONNECTED"));
        }

        if (connectedDevice) {
            bleManager.cancelDeviceConnection(connectedDevice.id);
            connectedDeviceRef.current = null;
            setConnectedDevice(null);
            setCommand('stop');
            setIsReady(false);
            setDeviceState(null);
            alertToHome();
        }
    }



    //send command
    type Cmd = "CMD:UP" | "CMD:DOWN" | "CMD:STOP";

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

            const dev = connectedDeviceRef.current
            if(!dev) return

            await dev.writeCharacteristicWithResponseForService(
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

    const sendStop = () => sendCommand("CMD:STOP");
    const sendUp = () => sendCommand("CMD:UP");
    const sendDown = () => sendCommand("CMD:DOWN");

    //invia una stringa generica
    const sendString = async (str: string) => {
        console.log('12')
        console.log('connectedDevice: ', connectedDevice)
        if (!connectedDevice) {
            console.log("sendCommand Nessun device connesso");
            return;
        }
        try {
            console.log('try to send')
            const valueBase64 = Buffer.from(str, "utf8").toString("base64");

            const dev = connectedDeviceRef.current
            if(!dev) return

            await dev.writeCharacteristicWithResponseForService(
            SERVICE_UUID,
            CMD_UUID,
            valueBase64
            );

            setCommand(str.toUpperCase()); 
            console.log("Inviato comando: ", str);
        } catch (e) {
            console.log("Errore invio comando: ", e);
            
        }
    };

    const verifySecret =(str: string)=>sendString(str)


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



    //response verify credential--------------------------------------
    const monitorResponseSecret = (device: Device) => {
        console.log('10')
        console.log('device monitorResponseSecret: ', device)
        console.log(' secretSubRef monitorResponseSecret1: ', secretSubRef.current)
        secretSubRef.current?.remove();

        secretSubRef.current = device.monitorCharacteristicForService(
            SERVICE_UUID,
            RESP_UUID,
            onResponseUpdate,
        )
        console.log('secretSubRef monitorResponseSecret2: ', secretSubRef.current)
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
            //try{
                // 1) subscribe notify
                startStreamingService(device);//viene inviato anche dal 6 è corretto?
                monitorResponseSecret(device);

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
            //} catch(e){
            //    console.log('handshake e: ', e)
                //alert('handshake')  //-------------------------------------------
            //}
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
        sendString,
        sendStop,
        sendUp,
        sendDown,
        isReady,
        verifiedEsp,
        pswAttempt,
        verifyPassword,
    };
}

export default useBLE;