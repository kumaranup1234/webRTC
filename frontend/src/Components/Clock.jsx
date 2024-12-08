import React, { useState, useEffect } from 'react';

function Clock() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const dayOfMonth = currentTime.getDate();
    const dayName = currentTime.toLocaleString('en-US', { weekday: 'long' }).slice(0,3);
    const monthName = currentTime.toLocaleString('en-US', { month: 'long' }).slice(0,3);

    return (
        <div className="flex flex-row space-x-2 mb-3 font-medium text-gray-600">
            <h1>{`${hours}:${minutes < 10 ? `0${minutes}` : minutes}`}
                <span className="font-medium ml-2">•</span>
            </h1>
            <div className="flex flex-row space-x-1">
                <p>{dayName}</p>,
                <p>{dayOfMonth}</p>
                <p>{monthName}</p>
            </div>
        </div>
    );
}

export default Clock;
