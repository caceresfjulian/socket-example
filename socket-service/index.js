const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173/" }));

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const messages = [
  "Hi there!",
  "Guys, pay attention",
  "Im booored",
  "this is awful",
  "xD",
  "LOL",
];

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);
  setInterval(() => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    socket.emit("message", randomMessage);
  }, 1000);

  socket.on("disconnecting", (reason) => {
    console.log(`Disconnected: ${socket.id}`);
    console.log(`Reason: ${reason}`);
  });
});
