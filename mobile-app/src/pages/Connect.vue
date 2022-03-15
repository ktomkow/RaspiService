<template>
  <q-page class="flex column justify-around">
    <h5 class="text-center">Connect to Raspberry</h5>
    <div class="flex column full-width q-py-xl q-px-lg">
      <q-select
        class="q-pb-md"
        dense
        outlined
        label="Service address"
        v-model="address"
        :options="options"
      />
      <div class="flex row justify-between no-wrap q-mb-md">
        <q-input
          dense
          clearable
          outlined
          label="Service address"
          v-model="newAddress"
          :options="options"
        >
          <template v-slot:prepend class="flex column">
            <span class="text-overline">http://</span>
          </template>
        </q-input>
        <q-input
          style="width: 6em"
          class="q-mx-sm"
          dense
          outlined
          v-model="port"
          type="number"
          label="Port"
        />
        <q-btn
          round
          class="q-ma-none q-pa-none"
          color="positive"
          icon="add"
          size="md"
          @click="addOption"
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
import { toRefs, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { Storage } from "@capacitor/storage";

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
      address: "",
      options: [],
      newAddress: null,
    });

    const store = useStore();

    onMounted(async () => {
      await loadOptions();
    });

    const connect = () => {
      store.dispatch("socket/connect", "http://" + state.address);
    };

    const disconnect = () => {
      store.dispatch("socket/disconnect");
    };

    const addOption = () => {
      state.options.push(state.newAddress + ":" + state.port);
      state.port = 3003;
      state.newAddress = null;

      setTimeout(async () => {
        await saveOptions();
      }, 0);
    };

    const saveOptions = async () => {
      const json = JSON.stringify(state.options);
      await Storage.set({
        key: "options",
        value: json,
      });
    };

    const loadOptions = async () => {
      const { value } = await Storage.get({ key: "options" });
      const options = JSON.parse(value);
      state.options = options;
    };

    return { ...toRefs(state), connect, disconnect, addOption };
  },
};
</script>
