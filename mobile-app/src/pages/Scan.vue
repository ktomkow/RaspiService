<template>
  <q-page class="flex column justify-between">
    <q-list bordered>
      <q-item
        v-for="item in found"
        :key="item"
        clickable
        v-ripple
        @click="select(item)"
        :class="{
          'bg-green-4':
            selected && selected.device.deviceId === item.device.deviceId,
        }"
      >
        <q-item-section avatar>
          <q-icon color="primary" name="bluetooth" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.device.name ?? "Undefined" }}</q-item-label>
          <q-item-label caption>{{ item.device.deviceId }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="flex column">
      <q-btn
        color="positive"
        icon="bluetooth"
        label="Connect"
        @click="connect"
        v-show="selected"
        :loading="connecting"
      />
      <q-btn
        color="primary"
        icon="refresh"
        label="refresh"
        @click="scan"
        :loading="isLoading"
      />
      <q-btn
        color="negative"
        icon="bluetooth_disabled"
        label="disconnect"
        @click="disconnect"
        :loading="disconnecting"
      />
      <q-btn
        color="warning"
        label="tryFunc"
        @click="tryFunc"
      />
    </div>
  </q-page>
</template>

<script>
import { toRefs, reactive } from "vue";
import { useStore } from "vuex";
import { BleClient } from "@capacitor-community/bluetooth-le";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { inject } from 'vue';

export default {
  name: "Scan",
  setup() {
    const state = reactive({
      disconnecting: false,
      connecting: false,
      selected: null,
      isLoading: false,
      found: [],
    });
    const store = useStore();
    const $q = useQuasar();
    const router = useRouter();
    const emitter = inject('emitter');
    const scan = async () => {
      try {
        state.isLoading = true;
        state.found = [];
        state.selected = null;
        await BleClient.requestLEScan(
          {
            allowDuplicates: false,
            scanMode: 2,
          },
          (result) => {
            console.log("received new scan result", result);
            if (result && result.device && result.device.name) {
              state.found.push(result);
            }
          }
        );

        setTimeout(async () => {
          await BleClient.stopLEScan();
          console.log("stopped scanning");
          state.isLoading = false;
        }, 5000);
      } catch (e) {
        console.error(e);
        state.isLoading = false;
      }
    };

    const select = (item) => {
      console.log("choose", item);
      state.selected = item;
    };

    const connect = async () => {
      try {
        state.connecting = true;
        await BleClient.connect(state.selected.device.deviceId, () => {
          $q.notify({
            type: "negative",
            message: "Disconnected!",
            progress: true,
            actions: [{ icon: "close" }],
          });
        });

        $q.notify({
          type: "positive",
          message: `Connected to ${state.selected.device.name}`,
          progress: true,
          actions: [{ icon: "close" }],
        });

        store.dispatch("bt/selectDevice", state.selected);

        router.push({ path: "/" });
      } catch (e) {
        $q.notify({
          type: "info",
          message: `Disconnected ${state.selected.device.name}`,
          progress: true,
          actions: [{ icon: "close" }],
        });
      } finally {
        state.connecting = false;
      }
    };

    const disconnect = async () => {
      try {
        state.disconnecting = true;
        const connected = await BleClient.getConnectedDevices();
        console.log(connected);
        for (let unit of connected) {
          await BleClient.disconnect(unit.deviceId);
          $q.notify({
            type: "info",
            message: `Disconnected ${unit.name}`,
            progress: true,
            actions: [{ icon: "close" }],
          });
        }
      } catch (e) {
        $q.notify({
          type: "negative",
          message: e.message,
          progress: true,
          actions: [{ icon: "close" }],
        });
      } finally {
        state.disconnecting = false;
      }
    };

    const tryFunc = () => {
      emitter.emit('try', "jestem niemową, dupa dupa dupa")
    }

    return { ...toRefs(state), scan, select, connect, disconnect, tryFunc };
  },
};
</script>

<style></style>
