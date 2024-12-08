const { v4: UUIDv4 } = require("uuid");
// the below stores for a room all peers have joined
/**
 *
 * {1: {u1, u2, u3} 2: {u4, u5, u6}}
 */
const rooms = {};

const roomHandler = (socket) => {
    // Function to create a room
    const createRoom = () => {
        const roomId = UUIDv4(); // Generate a unique room ID
        socket.join(roomId); // Add the socket to the new room
        rooms[roomId] = []; // create a new entry or the room
        socket.emit("room-created", roomId);
        // Notify the client that the room has been created
        console.log(roomId);
    };

    /**
     *
     * the below function is executed everytime a user(creator or joinee)
     * joins a new room
     */

    const joinedRoom = ({roomId, peerId}) => {
        console.log("joined room call", rooms)
        if (rooms[roomId]){
            // if the given roomId exist in the memory
            console.log("New user has Joined room", roomId, "with peer id as", peerId);
            // add then into the key of roomId
            rooms[roomId].push(peerId);
            console.log("added peer to room", rooms)
            socket.join(roomId); // make the user join the socket room

            // whenever anyone joins the room

            socket.on("ready", () => {
                // from the frontend once someone joins the room we will emit a ready event
                // then from our server we will emit an event to all the client conn
                // that a new per has been added
                socket.to(roomId).emit("user-joined", {peerId});
            })

            // just for logging purposes
            socket.emit("get-users", {
                roomId,
                participants: rooms[roomId],
            })
        }
    }

    // we will call above two functions when client will emit event create room and join room

    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);
}

module.exports = roomHandler