import Vue from "vue";
import Vuex from "vuex";
import errorModal from "./modules/errorModal";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    errorModal,
  },
});
