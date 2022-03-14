<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <span>Raspberry Bluetooth Service</span>
          <q-icon
            name="swap_horiz"
            size="sm"
            class="q-px-sm"
            :color="connectionStatusColor"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Navigation </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Home",
    caption: "",
    icon: "home",
    link: "/",
  },
  {
    title: "Connect",
    caption: "Find and connect to Raspberry",
    icon: "link",
    link: "connect",
  },
  {
    title: "Cpu",
    caption: "Cpu related stuff",
    icon: "bolt",
    link: "cpu",
  },
];

import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const store = useStore();

    const leftDrawerOpen = ref(false);
    const connectionStatusColor = computed(() => {
      const isAlive = store.getters["socket/isAlive"];

      return isAlive ? "positive" : "negative";
    });

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      connectionStatusColor,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
