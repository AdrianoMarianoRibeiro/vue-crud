<template>
    <v-navigation-drawer
      app
      v-model="value"
      :temporary="$vuetify.breakpoint.smAndDown"
    >
      <!-- Título do Menu -->
      <v-toolbar flat dense>
        <v-toolbar-title class="text-h6">CRUD DE USUÁRIOS</v-toolbar-title>
      </v-toolbar>
  
      <v-divider />
  
      <!-- Menu -->
      <v-list dense nav>
        <v-list-group prepend-icon="mdi-account" no-action>
          <template v-slot:activator>
            <v-list-item-title>Usuário</v-list-item-title>
          </template>
  
          <v-list-item :to="{ name: 'UserCreate' }" link>
            <v-list-item-icon>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Cadastrar</v-list-item-title>
          </v-list-item>
  
          <v-list-item :to="{ name: 'UserList' }" link>
            <v-list-item-icon>
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Listar</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  
  @Component
  export default class Sidebar extends Vue {
    @Prop({ type: Boolean, required: true }) readonly value!: boolean;
  }
  </script>
  