<template>
    <v-form ref="form" @submit.prevent="submitForm" v-model="isFormValid">
      <v-text-field
        v-model="localUser.name"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>
  
      <v-text-field
        v-model="localUser.email"
        :rules="emailRules"
        label="Email"
        type="email"
        required
      ></v-text-field>
  
      <v-btn type="submit" color="primary">Submit</v-btn>
    </v-form>
  </template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from 'vue-property-decorator';
import { User } from '@/types/user';

@Component
export default class UserForm extends Vue {
    @Prop({ default: () => ({ name: '', email: '' }) })
    readonly user!: User;

    localUser: User = { name: '', email: '' };
    isFormValid = false;

    @Ref('form') readonly form!: HTMLFormElement;

    get nameRules() {
    return [
      (v: string) => !!v || 'Nome é obrigatório',
      (v: string) => v.length >= 3 || 'Nome precisa ter pelo menos 3 caracteres',
    ];
  }

  get emailRules() {
    return [
      (v: string) => !!v || 'Email é obrigatório',
      (v: string) => /.+@.+\..+/.test(v) || 'Email inválido',
    ];
  }

    // Método de envio do formulário
    submitForm() {
        const isValid = (this.$refs.form as any).validate();
        if (!isValid) return;

        this.$emit('submit', {
        name: this.localUser.name,
        email: this.localUser.email,
        });
    }
}
</script>

<style scoped>
/* Aqui você pode adicionar estilo específico para o componente */
</style>
