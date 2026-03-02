import React,{createContext, useContext} from "react";
import useBLE from "./useBLE";

type BleApi = ReturnType<typeof useBLE>

const BleContext = createContext<BleApi | null>(null)

export function BleProvider({children} : {children: React.ReactNode}){
    const ble = useBLE()
    return <BleContext.Provider value={ble}>{children}</BleContext.Provider>
}

export function useBle() {
    const ctx = useContext(BleContext)
    if(!ctx) throw new Error('error context ble')
    return ctx
}






