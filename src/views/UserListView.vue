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
            <p>Deseja realmente excluir o usuário <strong>{{ editedOrDeletedUser.name }}</strong>?</p>
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
import Vue from 'vue';
import { UserService } from '@/services/user.service';
import { IUser } from '@/types/user';



// Define a interface para as opções da tabela
interface DataTableOptions {
  page: number;
  itemsPerPage: number;
  sortBy?: string[];
  sortDesc?: boolean[];
  groupBy?: string[];
  groupDesc?: boolean[];
  multiSort?: boolean;
}

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
  name: 'UserListView',
  
  data() {
    return {
      users: [] as IUser[],
      loading: false,
      totalItems: 0,
      editDialog: false,
      deleteDialog: false,
      editedOrDeletedUser: null as IUser | null,
      options: {
        page: 1,
        itemsPerPage: 10,
      } as DataTableOptions,
      headers: [
        { text: 'Nome', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Ações', value: 'actions', sortable: false },
      ] as Header[]
    };
  },
  
  computed: {
    formTitle(): string {
      return this.editDialog ? 'Editar Usuário' : 'Excluir Usuário';
    }
  },
  
  watch: {
    options: {
      handler() {
        this.fetchUsers();
      },
      deep: true
    }
  },
  
  mounted() {
    this.fetchUsers();
  },
  
  methods: {
    async fetchUsers(): Promise<void> {
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
    },
    
    async openModal(userId: string, isDelete: boolean): Promise<void> {
      try {
        const response = await UserService.findById(userId);
        this.editedOrDeletedUser = response.data;
        isDelete ? this.deleteDialog = true : this.editDialog = true;
      } catch (error) {
        this.$store.dispatch('toast/error', 'Erro ao carregar usuário');
      }
    },
    
    closeModal(): void {
      this.editDialog = false;
      this.deleteDialog = false;
      this.editedOrDeletedUser = null;
    },
    
    async updateUser(): Promise<void> {
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
    },
    
    async deleteUser(): Promise<void> {
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
});
</script>

<style scoped>
.v-dialog .v-card {
  border-radius: 8px;
}
</style>