import { emitter } from "src/boot/eventBus";
import { io } from "socket.io-client";

export function connect(context, address) {
  const socket = io(address, { transports: ["websocket"] });
  disconnect(context);

  socket.on("connect", () => {
    console.log("Socket connected, id: ", socket.id);
    context.commit("setAddress", address);
    context.commit("setSocket", socket);
  });

  socket.on("disconnect", () => {
    disconnect(context);
  });

  socket.on("cpu", (data) => {
    console.log("Got CPU", data);
    emitter.emit("cpu", data);
  });
}

export function disconnect(context) {
  if (context.state.socket) {
    context.commit("callDisconnect");
  }

  context.commit("setAddress", null);
  context.commit("setSocket", null);

  console.log("Socket disconnected");
}
