<template>
  <v-container>
    <h1 class="mb-4">Criar Usuário</h1>
    <UserForm @submit="handleSubmit" />
  </v-container>
</template>

<script lang="ts">
import UserForm from '@/components/UserForm.vue';
import { handleApiError } from '@/services/errorHandler';
import { UserService } from '@/services/user.service';
import { User } from '@/types/user';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  components: {
    UserForm,
  },
})
export default class UserCreateView extends Vue {
  async handleSubmit(payload: User) {
    try {
      await UserService.createUser(payload);
    } catch (error) {
      handleApiError(error);
    }
  }
}
</script>

<style scoped>
h1 {
  font-weight: 500;
}
</style>
