<template>
  <router-view />
</template>
<script>
import { defineComponent, onMounted } from "vue";
import { BleClient } from "@capacitor-community/bluetooth-le";

export default defineComponent({
  name: "App",
  setup() {
    onMounted(async () => {
      await BleClient.initialize();
    });
  },
});
</script>
