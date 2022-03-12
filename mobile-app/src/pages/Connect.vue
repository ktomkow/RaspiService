<template>
  <q-page class="flex column justify-between">
    <div class="flex column">
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
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { inject } from 'vue';

export default {
  name: "Connect",
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



    const tryFunc = () => {
      emitter.emit('try', "jestem niemową, dupa dupa dupa")
    }

    return { ...toRefs(state), tryFunc};
  },
};
</script>

<style></style>
