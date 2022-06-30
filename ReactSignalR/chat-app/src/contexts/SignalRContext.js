import { createContext } from "react";
import { useSignalR } from "../hooks/useSignalR";

export const SignalRContext = createContext();

export const SignalRProvider = ({ children }) => {

    const {connection, online} = useSignalR("https://localhost:5002/chathub");

    return (
        <SignalRContext.Provider value={{ connection, online }}>
            { children }
        </SignalRContext.Provider>
    )
}