const express = require("express");
const serverConfig = require("./config/serverConfig")
const http =  require("http");
const { Server } = require("socket.io");
const cors = require("cors")
const roomHandler = require("./handlers/roomHandler");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    console.log("Client connected");
    roomHandler(socket); // pass the socket conn to the room handler for room creation and joining

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    })
});

server.listen(serverConfig.PORT, () => {
    console.log(`Server listening on port ${serverConfig.PORT}`);
});
