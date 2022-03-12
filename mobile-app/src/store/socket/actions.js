import { emitter } from "src/boot/eventBus";
import { io } from "socket.io-client";

export function connect(context, address) {
  const socket = io(address, {transports: ['websocket']});


  socket.on("connect", () => {
    console.log("Socket connected, id: ", socket.id);
    context.commit("setAddress", address);
    context.commit("setSocket", socket);
  });
}

export function disconnect(context) {
  context.commit("setAddress", null);
  context.commit("setSocket", null);
}
