// src/plugins/axios.ts
import axios from 'axios';
import Vue from 'vue';

const api = axios.create({
  baseURL: 'http://localhost:3000', // substitua pela real
});

// Torna `$api` acessível em todos os componentes
Vue.prototype.$api = api;

export default api;
