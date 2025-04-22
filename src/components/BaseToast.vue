<!-- src/components/BaseToast.vue -->
<template>
    <v-snackbar
      v-model="visible"
      :color="color"
      :timeout="timeout"
      top
      right
      multi-line
    >
      <div class="d-flex justify-space-between align-center w-100">
        <span>{{ message }}</span>
        <v-btn icon @click="hide">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
  
      <template v-slot:action>
        <v-progress-linear
          :color="color"
          :value="100"
          :indeterminate="false"
          height="3"
          class="mt-2"
        ></v-progress-linear>
      </template>
    </v-snackbar>
  </template>
  
  <script lang="ts">
  import { mapState } from 'vuex';
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component({
    computed: {
      ...mapState({
        message: (state: any) => state.toast.message,
        color: (state: any) => state.toast.color,
        visible: (state: any) => state.toast.visible,
      }),
    },
  })
  export default class BaseToast extends Vue {
    timeout = 4000;
  
    get message(): string {
      return '';
    }
  
    get color(): string {
      return 'success';
    }
  
    get visible(): boolean {
      return false;
    }
  
    hide() {
      this.$store.dispatch('hide');
    }
  }
  </script>
  