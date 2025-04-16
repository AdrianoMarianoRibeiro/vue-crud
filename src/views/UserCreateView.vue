<template>
  <v-container>
    <h1 class="mb-4">Criar Usuário</h1>
    <UserForm @submit="handleSubmit" />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import UserForm from '@/components/UserForm.vue';
import api from "@/plugins/api";
import { User } from '@/types/user';

@Component({
  components: {
    UserForm,
  },
})
export default class UserCreateView extends Vue {
  async handleSubmit(payload: User) {
    try {
      // Exemplo de chamada a API
      const response = await api.post('user', payload);
      console.log('Usuário criado com sucesso:', response.data);

      // Aqui você pode redirecionar, limpar, ou mostrar sucesso
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  }
}
</script>

<style scoped>
h1 {
  font-weight: 500;
}
</style>
