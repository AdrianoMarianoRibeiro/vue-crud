<template>
  <v-container>
    <v-card>
      <v-card-title>
        Lista de Usuários
        <v-spacer></v-spacer>
        <v-btn color="primary" :to="{ name: 'UserCreate' }">
          <v-icon left>mdi-account-plus</v-icon>
          Cadastrar
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="users"
        :loading="loading"
        :options.sync="options"
        :server-items-length="totalItems"
        :items-per-page="options.itemsPerPage"
        class="elevation-1"
        loading-text="Carregando usuários..."
        no-data-text="Nenhum usuário encontrado"
        @update:options="fetchUsers"
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
        <v-card-title>Editar Usuário</v-card-title>
        <v-card-text>
          <v-form ref="editForm" v-if="editedOrDeletedUser">
            <v-text-field v-model="editedOrDeletedUser.name" label="Nome" required></v-text-field>
            <v-text-field v-model="editedOrDeletedUser.email" label="Email" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="closeModal">Cancelar</v-btn>
          <v-btn color="green darken-1" text @click="updateUser">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de Exclusão -->
    <v-dialog v-model="deleteDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>Excluir Usuário</v-card-title>
        <v-card-text>
          <v-form ref="deleteForm" v-if="editedOrDeletedUser">
            <p>Nome: {{ editedOrDeletedUser.name }}</p>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="closeModal">Não</v-btn>
          <v-btn color="green darken-1" text @click="deleteUser">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script lang="ts">
import { UserService } from '@/services/user.service';
import { User } from '@/types/user';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class UserListView extends Vue {
  users: Array<User> = [];
  loading = false;
  totalItems = 0;
  editDialog = false;
  deleteDialog = false;
  editedOrDeletedUser: User | null = null;

  options = {
    page: 1,
    itemsPerPage: 10,
  };

  headers = [
    { text: 'Nome', value: 'name' },
    { text: 'Email', value: 'email' },
    { text: 'Ações', value: 'actions', sortable: false },
  ];

  mounted() {
    this.fetchUsers();
  }

  async fetchUsers() {
    this.loading = true;
    try {
      const { page, itemsPerPage } = this.options;
      const response = await UserService.findAll(page, itemsPerPage);
      this.users = response.data;
      this.totalItems = response.meta.itemCount;
    } catch (error) {
      this.$store.dispatch('toast/error', error);
    } finally {
      this.loading = false;
    }
  }

  async openModal(userId: string, isDelete: boolean) {
    try {
      const response = await UserService.findById(userId);
      this.editedOrDeletedUser = response.data;
      isDelete ? this.deleteDialog = true : this.editDialog = true;
    } catch (error) {
      this.$store.dispatch('toast/error', 'Erro ao carregar usuário');
    }
  }

  closeModal() {
    this.editDialog = false;
    this.deleteDialog = false;
    this.editedOrDeletedUser = null;
  }

  async updateUser() {
    if (!this.editedOrDeletedUser) return;

    try {
      await UserService.update(this.editedOrDeletedUser.id!, {
        name: this.editedOrDeletedUser.name,
        email: this.editedOrDeletedUser.email,
      });
      this.$store.dispatch('toast/success', 'Usuário atualizado com sucesso!');
      this.closeModal();
      this.fetchUsers();
    } catch (error) {
      this.$store.dispatch('toast/error', 'Erro ao atualizar usuário');
    }
  }

  async deleteUser() {
    if (!this.editedOrDeletedUser) return;

    try {
      await UserService.delete(this.editedOrDeletedUser.id!);
      this.$store.dispatch('toast/success', 'Usuário removido com sucesso!');
      this.closeModal();
      this.fetchUsers();
    } catch (error) {
      this.$store.dispatch('toast/error', 'Erro ao remover usuário');
    }
  }
}
</script>

<style scoped>
.v-dialog .v-card {
  border-radius: 8px;
}
</style>
