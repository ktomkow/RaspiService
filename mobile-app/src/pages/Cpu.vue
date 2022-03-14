<template>
  <q-page class="bg-red-1"> {{ cpuData }} </q-page>
</template>

<script>
import { inject, onMounted, onUnmounted, toRefs, reactive } from "vue";

export default {
  name: "Cpu",
  setup() {
    const state = reactive({
      cpuData: null,
    });

    const emitter = inject("emitter");

    onMounted(() => {
      emitter.on("cpu", (data) => {
        console.warn("data", data);
        state.cpuData = data;
      });
    });

    onUnmounted(() => {
      emitter.off("cpu");
    });

    return { ...toRefs(state) };
  },
};
</script>
