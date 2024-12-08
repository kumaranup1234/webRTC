// src/Components/VideoGrid.jsx

import React from 'react';
import UserFeedPlayer from './UserFeedPlayer';

const VideoGrid = ({ localStream, peers }) => {
    const gridClasses = Object.keys(peers).length === 0
        ? 'grid-cols-1'
        : `grid-cols-${Math.min(Object.keys(peers).length + 1, 4)}`;

    return (
        <div className={`grid ${gridClasses} gap-4 p-4`}>
            {/* Local User */}
            <UserFeedPlayer stream={localStream}  />

            {/* Remote Peers */}
            {Object.keys(peers).map(peerId => (
                <UserFeedPlayer
                    key={peerId}
                    stream={peers[peerId].stream}
                />
            ))}
        </div>
    );
};

export default VideoGrid;
