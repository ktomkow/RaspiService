import { boot } from "quasar/wrappers";
import { emitter } from "src/boot/eventBus";

export default boot(({ app }) => {
  emitter.on("try", (v) => {
    console.log("*** try ***", v);
  });

  const socket = {};
  app.provide("socket", socket);

  return socket;
});
