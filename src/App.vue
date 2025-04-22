<template>
  <v-app>
    <!-- AppBar com botão para abrir o menu em telas pequenas -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>CRUD DE USUÁRIOS</v-toolbar-title>
    </v-app-bar>

    <!-- Sidebar -->
    <Sidebar v-model="drawer" />

    <v-main>
      <router-view />
      <ErrorModal />
      <GlobalToast />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import ErrorModal from '@/components/ErrorModal.vue';
import GlobalToast from '@/components/GlobalToast.vue';
import Sidebar from '@/components/Sidebar.vue';
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    drawer: true,
  }),
  components: {
    Sidebar,
    ErrorModal,
    GlobalToast,
  },
});
</script>
