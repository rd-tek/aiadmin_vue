import { defineStore } from "pinia";

export const useRequestStore = defineStore("request", {
  state: () => ({
    pending: 0,
    lastError: null,
  }),
  actions: {
    requestStart() {
      this.pending++;
    },
    requestSuccess() {
      this.pending = Math.max(0, this.pending - 1);
      this.lastError = null;
    },
    requestError(err) {
      this.pending = Math.max(0, this.pending - 1);
      this.lastError = {
        message: err?.message ?? "Unknown Error",
        code: err?.code ?? null,
      };
    },
  },
});
