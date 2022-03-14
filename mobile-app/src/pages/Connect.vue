<template>
  <q-page class="flex column justify-around">
    <h5 class="text-center">Connect to Raspberry</h5>
    <div class="flex column full-width q-py-xl q-px-lg">
      <div class="flex row justify-between q-mb-md">
        <q-select
          class="col-9"
          dense
          outlined
          label="Service address"
          v-model="address"
          :options="options"
        >
          <template v-slot:prepend class="flex column">
            <span class="text-overline">http://</span>
          </template>
        </q-select>
        <q-input
          class="col-3 q-pl-sm"
          dense
          outlined
          v-model="port"
          type="number"
          label="Port"
        />
      </div>
      <q-btn
        outline
        rounded
        size="xl"
        class="q-mb-md"
        color="positive"
        label="connect"
        @click="connect"
      />
      <q-btn
        outline
        rounded
        color="negative"
        label="disconnect"
        @click="disconnect"
      />
    </div>
  </q-page>
</template>

<script>
import { toRefs, reactive } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { inject } from "vue";

export default {
  name: "Connect",
  setup() {
    const state = reactive({
      disconnecting: false,
      connecting: false,
      selected: null,
      isLoading: false,
      found: [],
      port: 3003,
      address: "192.168.0.168",
      options: ["192.168.0.168"],
    });

    const store = useStore();
    const $q = useQuasar();
    const router = useRouter();

    const connect = () => {
      store.dispatch("socket/connect", "http://" + state.address + ":" + state.port);
    };

    const disconnect = () => {
      store.dispatch("socket/disconnect");
    };

    return { ...toRefs(state), connect, disconnect };
  },
};
</script>
