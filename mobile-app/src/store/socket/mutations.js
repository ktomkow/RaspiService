export function setAddress(state, address) {
  state.raspberryService = address;
}

export function setSocket(state, socket) {
  state.socket = socket;
}

export function callDisconnect(state) {
  state.socket.disconnect();
}
