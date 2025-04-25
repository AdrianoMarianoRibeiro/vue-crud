// src/types/user.ts
export interface IProfile {
  id?: string;
  name: string;
  [key: string]: any; // Para propriedades adicionais que possam vir da API
}
