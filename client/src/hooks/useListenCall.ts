import { useSocketContext } from '@/context/SocketContext';
import { useEffect, useState, } from 'react';
import CallTune from "../assets/call.mp3";
import { IIncomingCallData } from '@/types';

// Define a custom type for the error
interface IError {
    message: string;
    code?: string; // Optional error code
}

const useListenCall = () => {
    const {socket} = useSocketContext();
    const [incomingCall, setIncomingCall] = useState(false);
    const [callData, setCallData] = useState({} as IIncomingCallData);

    useEffect(() => {
        if (!socket) return;

        // Handle incoming events
        socket.on('incoming_call', (data) => {
            onCallStarted(data);
        });

        socket.on('callEnded', (data) => {
            onCallEnded(data);
        });

        socket.on('error', (error) => {
            onError(error);
        });

        return () => {
            // Clean up the event listeners when the component unmounts
            socket.off('incoming_call');
            socket.off('callEnded');
            socket.off('error');
        };
    }, [socket]);

    // const startCall = (callData: ICallData) => {
    //     if (socket) {
    //         socket.emit('incoming_call', { ...callData });
    //     }
    // };

    // const endCall = (callData:ICallData ) => {
    //     if (socket) {
    //         socket.emit('endCall', callData);
    //     }
    // };
    const onCallStarted = (data:IIncomingCallData) => {
        console.log('Call started:', data);
        const sound = new Audio(CallTune);
        sound.play();
        setIncomingCall(true);
        setCallData(data);
        // Handle the call started event (e.g., show a notification, update UI, etc.)
    };      
    const onCallEnded = (data: IIncomingCallData) => {
        console.log('Call ended:', data);
        // Handle the call ended event (e.g., show a notification, update UI, etc.)
    };
    const onError = (error: IError) => {   
        console.error('Error:', error);

    }

    return { incomingCall, setIncomingCall, callData };
};

export default useListenCall;