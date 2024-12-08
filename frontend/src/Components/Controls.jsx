import React, { useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';

const Controls = ({ localStream, handleTrackUpdate }) => {
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    const toggleAudio = () => {
        const audioTracks = localStream.getAudioTracks();
        if (audioTracks.length > 0) {
            const isEnabled = audioTracks[0].enabled;
            audioTracks[0].enabled = !isEnabled;
            setIsAudioMuted(!isEnabled);
        }
    };

    const toggleVideo = async () => {
        const videoTracks = localStream.getVideoTracks();
        if (videoTracks.length > 0) {
            const videoTrack = videoTracks[0];
            if (videoTrack.enabled) {
                // Stop the video track to turn off the camera completely
                videoTrack.stop();
                localStream.removeTrack(videoTrack);
                setIsVideoOff(true);
            } else {
                try {
                    // Restart video by obtaining a new track
                    const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
                    const newVideoTrack = newStream.getVideoTracks()[0];
                    localStream.addTrack(newVideoTrack);
                    handleTrackUpdate(newVideoTrack); // Notify parent about the new track
                    console.log("info done")
                    setIsVideoOff(false);
                } catch (error) {
                    console.error("Error accessing camera:", error);
                }
            }
        }
    };

    return (
        <div className="flex space-x-4 justify-center">
            {/* Audio Button */}
            <button
                onClick={toggleAudio}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-none"
            >
                {isAudioMuted ? (
                    <FaMicrophoneSlash className="text-red-500" />
                ) : (
                    <FaMicrophone className="text-green-500" />
                )}
            </button>

            {/* Video Button */}
            <button
                onClick={toggleVideo}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-none"
            >
                {isVideoOff ? (
                    <FaVideoSlash className="text-red-500" />
                ) : (
                    <FaVideo className="text-green-500" />
                )}
            </button>
        </div>
    );
};

export default Controls;
