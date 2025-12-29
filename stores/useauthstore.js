import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    status: "ready", // ready, loading, error, success
    timezone: {
      timezone_name: "",
      timezone_offset: 0,
      state: "",
    },
    searchData: {},
    forceRerender: true,
    isAuthenticated: false, // ✅ 로그인 여부
  }),
  actions: {
    authRequest() {
      this.status = "loading";
      console.log(this.status);
    },
    authSuccess() {
      this.status = "success";
      this.searchData = {};
      console.log(this.status);
    },
    authError() {
      this.status = "error";
      console.log(this.status);
    },
    setTimezone(payload) {
      console.log("payload", payload);
      this.timezone = { ...this.timezone, ...payload };
    },
    logout() {
      this.status = "ready";
      this.isAuthenticated = false; // ✅ 로그아웃 시 false
      this.searchData = {};
      this.timezone = {
        timezone_name: "",
        timezone_offset: 0,
        state: "",
      };
      sessionStorage.removeItem("aicoachtoken");
      sessionStorage.removeItem("nickname");
      sessionStorage.removeItem("expert_pk");
      sessionStorage.removeItem("is_initialize");
      sessionStorage.removeItem("binary_filepath");
      // sessionStorage.removeItem("member_img");
    },
    login({ token, nickname, expert_pk, is_initialize, binary_filepath }) {
      this.authRequest();
      sessionStorage.setItem("aicoachtoken", token);
      sessionStorage.setItem("nickname", nickname);
      sessionStorage.setItem("expert_pk", expert_pk);
      sessionStorage.setItem("is_initialize", is_initialize);
      sessionStorage.setItem("binary_filepath", binary_filepath);
      // sessionStorage.setItem("member_img", member_img);
      this.isAuthenticated = true; // ✅ 로그인 시 true
      this.authSuccess();
    },
    checkLogin() {
      if (process.client) {
        const token = sessionStorage.getItem("aicoachtoken");
        if (token) {
          this.status = "success";
          this.isAuthenticated = true;
        } else {
          this.status = "ready";
          this.isAuthenticated = false;
        }
      }
    },
    setSearchData(payload) {
      if (Object.keys(payload).length === 0) this.searchData = {};
      this.searchData = { ...this.searchData, ...payload };
    },
    triggerRerender() {
      this.forceRerender = !this.forceRerender;
    },
  },
  persist: {
    storage: "sessionStorage", // ✅ 이게 가장 안전하고 SSR-safe 방식
  },
  getters: {
    isLogin: (state) =>
      process.client &&
      state.status === "success" &&
      !!sessionStorage.getItem("aicoachtoken"),
  },
});
