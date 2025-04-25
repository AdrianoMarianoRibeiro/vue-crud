<template>
    <v-form ref="form" @submit.prevent="submitForm" v-model="isFormValid">
      <v-text-field
        v-model="localProfile.name"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>
  
      <v-alert v-if="errorMessage" type="error" dense>
        {{ errorMessage }}
    </v-alert>
  
      <v-btn type="submit" color="primary">Submit</v-btn>
    </v-form>
  </template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from 'vue-property-decorator';
import { IProfile } from '@/types/profile';

@Component
export default class ProfileForm extends Vue {
    @Prop({ default: () => ({ name: ''}) })
    readonly profile!: IProfile;

    @Prop({ default: '' })
    readonly errorMessage!: string;

    localProfile: IProfile = { name: ''};
    isFormValid = false;

    @Ref('form') readonly form!: HTMLFormElement;

    get nameRules() {
        return [
            (value: string) => !!value || 'Nome é obrigatório',
        ];
    }
  
    created() {
        this.localProfile = { ...this.profile };
    }

    reset() {
      this.localProfile = { name: ''};
      (this.$refs.form as any).resetValidation();
    }

    // Método de envio do formulário
    submitForm() {
        const isValid = (this.$refs.form as any).validate();
        if (!isValid) return;

        this.$emit('submit', {
            name: this.localProfile.name,
        });
    }
}
</script>

<style scoped>
/* Aqui você pode adicionar estilo específico para o componente */
</style>
