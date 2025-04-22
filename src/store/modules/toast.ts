export interface ToastState {
  message: string;
  visible: boolean;
  color: string;
}

const state: ToastState = {
  message: "",
  visible: false,
  color: "success",
};

const mutations = {
  SHOW_TOAST(
    state: ToastState,
    { message, color }: { message: string; color: string }
  ) {
    state.message = message;
    state.color = color;
    state.visible = true;
  },
  HIDE_TOAST(state: ToastState) {
    state.visible = false;
  },
};

const actions = {
  success({ commit }: any, message: string) {
    commit("SHOW_TOAST", { message, color: "success" });
  },
  error({ commit }: any, message: string) {
    commit("SHOW_TOAST", { message, color: "error" });
  },
  hide({ commit }: any) {
    commit("HIDE_TOAST");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
