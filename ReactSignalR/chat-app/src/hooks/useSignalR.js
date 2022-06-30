import * as signalR from '@microsoft/signalr';
import { useEffect, useMemo, useState } from 'react';

export const useSignalR = (serverPath) => {
    
    const connection = useMemo(() => {
        return new signalR.HubConnectionBuilder()
            .withUrl(serverPath)
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();
    }, [serverPath]);

    const [ online, setOnline ] = useState(false);

    useEffect(() => {
        connection.onclose(() => {
            setOnline(false);
        });
    
    }, [connection])
    
    useEffect(() => {
    if (connection.state === signalR.HubConnectionState.Disconnected) {
        connection.start().then(() => {
            setOnline(true);
        }).catch((err) => {
            setOnline(false);
            console.error(err.toString())
        });
    }
    
    }, [connection])
        
    
    return {
        connection,
        online
    };
}