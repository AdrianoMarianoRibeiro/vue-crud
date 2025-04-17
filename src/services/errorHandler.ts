// src/services/errorHandler.ts
import axios from "axios";
import store from "@/store";

export function handleApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      "Erro inesperado ao se comunicar com o servidor.";

    store.commit("errorModal/showError", {
      title: `Erro ${status || ""}`,
      message,
    });
  } else {
    // Erro genérico não Axios
    store.commit("errorModal/showError", {
      title: "Erro inesperado",
      message: "Ocorreu um erro desconhecido.",
    });
  }

  // Se quiser propagar o erro adiante (opcional)
  // throw error;
}
