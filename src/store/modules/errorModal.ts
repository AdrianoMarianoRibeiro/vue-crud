// src/store/modules/errorModal.ts
import { Module } from "vuex";

interface ErrorModalState {
  visible: boolean;
  title: string;
  message: string;
}

const errorModal: Module<ErrorModalState, any> = {
  namespaced: true,
  state: (): ErrorModalState => ({
    visible: false,
    title: "",
    message: "",
  }),
  mutations: {
    showError(state, payload: { title: string; message: string }) {
      state.visible = true;
      state.title = payload.title;
      state.message = payload.message;
    },
    hideError(state) {
      state.visible = false;
      state.title = "";
      state.message = "";
    },
  },
};

export default errorModal;
