import {useContext, useState} from 'react';
import { SocketContext } from '../Context/SocketContext';
import videoImage from "../assets/videoCall.svg";

const CreateRoom = () => {
    const { socket } = useContext(SocketContext);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const initRoom = () => {
        if (socket) {
            console.log('Client: Emitting createRoom event');
            socket.emit('create-room');
        } else {
            console.error('Client: Socket not initialized');
        }
    };
    const isButtonDisabled = inputValue.trim() === '';


    return (
            <div className="flex flex-row space-x-6 ml-14 mt-14">
                <div>
                    <button
                        onClick={initRoom}
                        className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded">
                        <img src={videoImage} alt="logo" className="h-5 w-5 mr-2 mt-1"/> New meeting
                    </button>
                </div>

                <div>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter a new code or link"
                        className="px-6 py-3 text-gray-600 placeholder-gray-500 border border-black rounded focus:outline-none focus:ring-blue-700 focus:ring-2 transition-all"
                    />

                    <button
                        disabled={isButtonDisabled}
                        className={`py-3 px-5 ml-3 font-bold rounded ${
                            isButtonDisabled
                                ? 'text-gray-600'
                                : 'hover:bg-gray-100 text-blue-700'
                        }`}
                    >
                        Join
                    </button>
                </div>
            </div>
    );
};

export default CreateRoom;
