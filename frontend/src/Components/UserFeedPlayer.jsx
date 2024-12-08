import {useEffect, useRef} from "react";

const UserFeedPlayer = ({stream}) => {

    const videoRef = useRef(null);
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);



    return (
        <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <video
                ref={videoRef}
                style={{width: '300px', height: '300px'}}
                muted={true}
                autoPlay={true}
            />
        </div>

    )
}

export default UserFeedPlayer;