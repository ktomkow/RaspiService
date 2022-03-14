<template>
  <q-page class="q-pa-lg">
    <div v-for="item in cpuData" :key="item.key">
      <span class="text-overline">{{ item.key }}</span> :
      <span>{{ item.value }}</span>
    </div>
  </q-page>
</template>

<script>
import { inject, onMounted, onUnmounted, toRefs, reactive } from "vue";

export default {
  name: "Cpu",
  setup() {
    const state = reactive({
      cpuData: [],
    });

    const emitter = inject("emitter");

    onMounted(() => {
      emitter.on("cpu", (data) => {
        console.warn("data", data);
        state.cpuData = [];
        Object.keys(data).forEach((key) => {
          state.cpuData.push({ key: key, value: data[key] });
        });
      });
    });

    onUnmounted(() => {
      emitter.off("cpu");
    });

    return { ...toRefs(state) };
  },
};
</script>
