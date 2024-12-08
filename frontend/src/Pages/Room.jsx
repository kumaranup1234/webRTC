import { useParams } from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import { SocketContext } from '../Context/SocketContext.jsx';
import UserFeedPlayer from '../Components/UserFeedPlayer.jsx';
import Controls from "../Components/Controls.jsx";

const Room = () => {
    const { id } = useParams();
    const { socket, user, stream, peers } = useContext(SocketContext);
    const [localStream, setLocalStream] = useState(null);

    console.log('Room component rendered with ID:', id);

    useEffect(() => {
        if (user) {
            console.log('New user with ID', user.id, 'has joined room', id);
            socket.emit('joined-room', { roomId: id, peerId: user.id });
        }
    }, [id, user, socket]);

    useEffect(() => {
        if (stream) {
            setLocalStream(stream);
        }
    }, [stream]);

    // Update peer connections with new video track
    const handleTrackUpdate = (newVideoTrack) => {
        setLocalStream((prevStream) => {
            const newStream = new MediaStream(prevStream.getTracks());
            newStream.removeTrack(prevStream.getVideoTracks()[0]);
            newStream.addTrack(newVideoTrack);
            return newStream;
        });

        // Update peers with the new track
        Object.values(peers).forEach(({ peerConnection }) => {
            const sender = peerConnection.getSenders().find(s => s.track.kind === 'video');
            if (sender) {
                sender.replaceTrack(newVideoTrack);
            } else {
                peerConnection.addTrack(newVideoTrack, localStream);
            }
        });
    };

    return (
        <div>
            <h2>Room ID: {id}</h2>
            <h3>Your Feed:</h3>
            {stream ? (
                <UserFeedPlayer stream={stream} />
            ) : (
                <p>Loading your stream...</p>
            )}
            <div>
                <h3>Other Users' Feeds:</h3>
                {Object.keys(peers).length > 0 ? (
                    Object.keys(peers).map((peerId) => (
                        <UserFeedPlayer
                            key={peerId}
                            stream={peers[peerId].stream}
                        />
                    ))
                ) : (
                    <p>No other users are currently in the room.</p>
                )}
            </div>
            <Controls localStream={stream} handleTrackUpdate={handleTrackUpdate}/>
        </div>
    );
};

export default Room;
