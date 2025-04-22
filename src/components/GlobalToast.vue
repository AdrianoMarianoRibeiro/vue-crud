<template>
    <v-snackbar
      v-model="visible"
      :color="color"
      timeout="5000"
      top
      right
      multi-line
    >
      <div class="d-flex justify-space-between align-center" style="width: 100%;">
        <span>{{ message }}</span>
        <v-btn icon @click="visible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
  
      <template v-slot:action>
        <!-- Progresso visual da duração -->
        <v-progress-linear
          indeterminate
          color="white"
          height="2"
          absolute
          bottom
        />
      </template>
    </v-snackbar>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class GlobalToast extends Vue {
    get message() {
      return this.$store.state.toast.message;
    }
  
    get color() {
      return this.$store.state.toast.color;
    }
  
    get visible() {
      return this.$store.state.toast.visible;
    }
  
    set visible(value: boolean) {
      if (!value) this.$store.dispatch('toast/hide');
    }
  }
  </script>
  