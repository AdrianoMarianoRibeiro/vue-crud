<template>
    <v-dialog v-model="visible" max-width="500" transition="dialog-bottom-transition" persistent>
      <v-card class="pa-4">
        <v-card-title class="headline red--text">
          <v-icon left color="red" class="mr-2">mdi-alert-circle</v-icon>
          {{ title }}
        </v-card-title>
  
        <v-card-text class="body-1">{{ message }}</v-card-text>
  
        <v-card-actions>
          <v-spacer />
  
          <v-btn text color="primary" @click="retry" v-if="canRetry">
            <v-icon left>mdi-reload</v-icon>
            Tentar novamente
          </v-btn>
  
          <v-btn color="error" text @click="close">
            <v-icon left>mdi-close</v-icon>
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  
  @Component
  export default class ErrorModal extends Vue {
    // Optional prop to show retry button
    @Prop({ default: false }) readonly canRetry!: boolean;
  
    get visible(): boolean {
      return this.$store.state.errorModal.visible;
    }
  
    get title(): string {
      return this.$store.state.errorModal.title;
    }
  
    get message(): string {
      return this.$store.state.errorModal.message;
    }
  
    close() {
      this.$store.commit('errorModal/hideError');
    }
  
    retry() {
      this.close();
      this.$emit('retry');
    }
  }
  </script>
  
  <style scoped>
  .v-card-title {
    align-items: center;
  }
  </style>
  