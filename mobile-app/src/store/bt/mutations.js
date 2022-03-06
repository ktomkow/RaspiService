export function setDevice(state, device) {
  state.id = device.device.deviceId;
  state.name = device.device.name;
}
