<template>
  <v-container>
    <v-card>
      <v-card-title>
        Lista de Perfis
        <v-spacer></v-spacer>
        <v-btn color="primary" :to="{ name: 'ProfileCreate' }">
          <v-icon left>mdi-account-plus</v-icon>
          Cadastrar
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="profiles"
        :loading="loading"
        class="elevation-1"
        loading-text="Carregando perfis..."
        no-data-text="Nenhum perfil encontrado"
        @update:options="fetchProfiles"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" color="primary" @click="openModal(item.id, false)">
            mdi-pencil
          </v-icon>
          <v-icon small color="red" @click="openModal(item.id, true)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <!-- Modal de Edição -->
    <v-dialog v-model="editDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>Editar Perfil</v-card-title>
        <v-card-text>
          <v-form ref="editForm" v-if="editedOrDeletedProfile">
            <v-text-field v-model="editedOrDeletedProfile.name" label="Nome" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="closeModal">Cancelar</v-btn>
          <v-btn color="green darken-1" text @click="updateProfile">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de Exclusão -->
    <v-dialog v-model="deleteDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>Excluir Perfil</v-card-title>
        <v-card-text>
          <v-form ref="deleteForm" v-if="editedOrDeletedProfile">
            <p>Deseja realmente excluir o perfil <strong>{{ editedOrDeletedProfile.name }}</strong>?</p>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="closeModal">Não</v-btn>
          <v-btn color="green darken-1" text @click="deleteProfile">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { ProfileService } from '@/services/profile.service';
import { IProfile } from '@/types/profile';

// Define a interface para os cabeçalhos da tabela
interface Header {
  text: string;
  value: string;
  align?: string;
  sortable?: boolean;
  filterable?: boolean;
  groupable?: boolean;
  divider?: boolean;
  class?: string;
  cellClass?: string;
  width?: string;
}

export default Vue.extend({
  name: 'ProfileListView',
  
  data() {
    return {
      profiles: [] as IProfile[],
      loading: false,
      editDialog: false,
      deleteDialog: false,
      editedOrDeletedProfile: null as IProfile | null,
      headers: [
        { text: 'Nome', value: 'name' },
        { text: 'Ações', value: 'actions', sortable: false },
      ] as Header[]
    };
  },
  
  computed: {
    formTitle(): string {
      return this.editDialog ? 'Editar Perfil' : 'Excluir Perfil';
    }
  },
  
  watch: {
    options: {
      handler() {
        this.fetchProfiles();
      },
      deep: true
    }
  },
  
  mounted() {
    this.fetchProfiles();
  },
  
  methods: {
    async fetchProfiles(): Promise<void> {
      this.loading = true;
      try {
        const response = await ProfileService.findAll();
        this.profiles = response.data;
      } catch (error) {
        this.$store.dispatch('toast/error', error);
      } finally {
        this.loading = false;
      }
    },
    
    async openModal(id: string, isDelete: boolean): Promise<void> {
      try {
        const response = await ProfileService.findById(id);
        this.editedOrDeletedProfile = response.data;
        isDelete ? this.deleteDialog = true : this.editDialog = true;
      } catch (error) {
        this.$store.dispatch('toast/error', 'Erro ao carregar perfil');
      }
    },
    
    closeModal(): void {
      this.editDialog = false;
      this.deleteDialog = false;
      this.editedOrDeletedProfile = null;
    },
    
    async updateProfile(): Promise<void> {
      if (!this.editedOrDeletedProfile) return;

      try {
        await ProfileService.update(this.editedOrDeletedProfile.id!, {
          name: this.editedOrDeletedProfile.name,
        });
        this.$store.dispatch('toast/success', 'Usuário atualizado com sucesso!');
        this.closeModal();
        this.fetchProfiles();
      } catch (error) {
        this.$store.dispatch('toast/error', 'Erro ao atualizar usuário');
      }
    },
    
    async deleteProfile(): Promise<void> {
      if (!this.editedOrDeletedProfile) return;

      try {
        await ProfileService.delete(this.editedOrDeletedProfile.id!);
        this.$store.dispatch('toast/success', 'Usuário removido com sucesso!');
        this.closeModal();
        this.fetchProfiles();
      } catch (error) {
        this.$store.dispatch('toast/error', 'Erro ao remover usuário');
      }
    }
  }
});
</script>

<style scoped>
.v-dialog .v-card {
  border-radius: 8px;
}
</style>