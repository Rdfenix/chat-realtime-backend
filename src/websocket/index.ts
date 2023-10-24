import { io } from "../http";

const connectInWebsocket = () => {
  io.on("connection", (socket) => {
    console.log("ws connected", socket.id);

    socket.on("joinRoom", (room) => {
      socket.join(room);
    });

    socket.on("leaveRoom", (room) => {
      socket.leave(room);
    });

    socket.on("sendMessage", (data) => {
      const { room, message } = data;
      sendRoomMessage(room, message);
    });

    socket.on("disconnect", () => {
      console.log(`socket ${socket.id} disconnected`);
    });
  });
};

const sendRoomMessage = (room: string, data: any) => {
  io.sockets.in(room).emit("message", data);
};

export default { connectInWebsocket, sendRoomMessage };
