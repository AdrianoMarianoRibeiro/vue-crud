<template>
  <v-container>
    <h1 class="mb-4">Criar Perfil</h1>
    <ProfileForm ref="profileForm" @submit="handleSubmit" />

  </v-container>
</template>

<script lang="ts">
import ProfileForm from '@/components/ProfileForm.vue';
import { handleApiError } from '@/services/errorHandler';
import { ProfileService } from '@/services/profile.service';
import { IProfile } from '@/types/profile';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  components: {
    ProfileForm,
  },
})
export default class UserCreateView extends Vue {
  async handleSubmit(payload: IProfile) {
    try {
      await ProfileService.create(payload);
      this.$store.dispatch('toast/success', 'Perfil criado com sucesso!');
      // Resetar os campos do formulário
      (this.$refs.profileForm as InstanceType<typeof ProfileForm>).reset();
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
