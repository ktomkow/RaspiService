import { emitter } from "src/boot/eventBus";

export function connect(context, address) {
  const socket = io(address);
  context.commit("setAddress", address);
  context.commit("setSocket", socket);
}

export function disconnect(context) {
  context.commit("setAddress", null);
  context.commit("setSocket", null);
}
