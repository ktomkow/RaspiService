<template>
  <q-page class="bg-red-1"> </q-page>
</template>

<script>
import { inject, onMounted, onUnmounted } from "vue";

export default {
  name: "Cpu",
  setup() {
    const emitter = inject("emitter");

    onMounted(() => {
      emitter.on("cpu", (data) => {
        console.warn("data", data);
      });
    });

    onUnmounted(() => {
      emitter.off("cpu");
    });
  },
};
</script>
