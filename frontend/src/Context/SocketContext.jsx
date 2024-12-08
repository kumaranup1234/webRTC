import React, { createContext, useEffect, useReducer, useState } from 'react';
import SocketIoClient from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import Peer from 'peerjs';
import { v4 as uuidv4 } from 'uuid';
import { peerReducers } from "../Reducers/peerReducers.js";
import { addPeerAction, removePeerAction } from "../Actions/peerActions.js";

const WS_Server = "http://localhost:5000";
export const SocketContext = createContext(null);
const socket = SocketIoClient(WS_Server);

const SocketProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [stream, setStream] = useState(null);
    const [peers, dispatch] = useReducer(peerReducers, {})

    const fetchParticipants = ({ roomId, participants }) => {
        console.log('Fetching participants');
        console.log(roomId, participants);
    }

    const fetchUserFeed = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(stream);
            console.log('User media stream obtained:', stream);
        } catch (error) {
            console.error("Failed to get user media:", error);
        }
    }

    useEffect(() => {
        const userId = uuidv4();
        const newPeer = new Peer(userId, {
            host: "localhost",
            port: 9000,
            path: "/myapp"
        });

        setUser(newPeer);
        fetchUserFeed();

        const enterRoom = (roomId) => {
            console.log('Received room-created event data:', roomId);
            if (roomId) {
                navigate(`/room/${roomId}`);
            } else {
                console.error('Room ID is undefined');
            }
        };

        socket.on('room-created', enterRoom);
        socket.on("get-users", fetchParticipants);

        return () => {
            socket.off('room-created', enterRoom);
            socket.off('get-users');
        };
    }, []);

    useEffect(() => {
        if (!user || !stream) return;

        socket.on("user-joined", ({ peerId }) => {
            console.log("User joined, calling the new peer", peerId);
            const call = user.call(peerId, stream);

            call.on("stream", () => {
                console.log(`Received stream from ${peerId}`);
                dispatch(addPeerAction(peerId, stream));
            });
        });

        user.on("call", (call) => {
            console.log("Received a call from:", call.peer);
            call.answer(stream);

            call.on("stream", () => {
                console.log(`Received stream from ${call.peer}`);
                dispatch(addPeerAction(call.peer, stream));
            });
        });

        socket.emit("ready");
    }, [user, stream]);

    return (
        <SocketContext.Provider value={{ socket, user, stream, peers }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
