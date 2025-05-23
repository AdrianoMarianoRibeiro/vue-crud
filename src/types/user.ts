// src/types/user.ts
export interface IUser {
  id?: string;
  name: string;
  email: string;
  [key: string]: any; // Para propriedades adicionais que possam vir da API
}
