// stores/useauthstore.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    status: "ready",
    timezone: {
      timezone_name: "",
      timezone_offset: 0,
      state: "",
    },
    searchData: {},
    forceRerender: true,
    isAuthenticated: false,
  }),

  actions: {
    authRequest() {
      this.status = "loading";
    },

    authSuccess() {
      this.status = "success";
      this.searchData = {};
    },

    authError() {
      this.status = "error";
    },

    setTimezone(payload) {
      this.timezone = { ...this.timezone, ...payload };
    },

    logout() {
      // 2026-10-12(회귀 점검): 서버 토큰 폐기(POST /login/logout → jwt_revoked). 백엔드는 구현돼 있었으나
      //   화면 로그아웃이 호출하지 않아 로그아웃 후에도 같은 토큰이 만료 때까지 유효했음. 실패해도 로컬 정리는 계속.
      try {
        const token = useCookie("aiadmintoken").value;
        if (token && import.meta.client) {
          fetch(useRuntimeConfig().public.apiBase + "/login/logout", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
          }).catch(() => {});
        }
      } catch (e) {
        /* 무시 */
      }
      this.status = "ready";
      this.isAuthenticated = false;
      this.searchData = {};
      this.timezone = { timezone_name: "", timezone_offset: 0, state: "" };

      // 쿠키 전부 제거
      const keys = [
        "aiadmintoken",
        "aiadmin_name", // 2026-10-20: 헤더 관리자 이름
        "nickname",
        "expert_pk",
        "is_initialize",
        "binary_filepath",
      ];
      keys.forEach((key) => {
        const cookie = useCookie(key);
        cookie.value = null;
      });
    },

    login({ token, nickname, expert_pk, is_initialize, binary_filepath }) {
      this.authRequest();

      // 쿠키에 저장 (8시간)
      const opt = { maxAge: 60 * 60 * 8 };
      useCookie("aiadmintoken", opt).value = token;
      useCookie("nickname", opt).value = nickname;
      useCookie("expert_pk", opt).value = expert_pk;
      useCookie("is_initialize", opt).value = is_initialize;
      useCookie("binary_filepath", opt).value = binary_filepath;

      this.isAuthenticated = true;
      this.authSuccess();
    },

    checkLogin() {
      const token = useCookie("aiadmintoken").value;
      if (token) {
        this.status = "success";
        this.isAuthenticated = true;
      } else {
        this.status = "ready";
        this.isAuthenticated = false;
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

  // persist 제거 → 쿠키가 직접 담당하므로 불필요

  getters: {
    // SSR/CSR 모두 안전
    isLogin: (state) => {
      const token = useCookie("aiadmintoken").value;
      return state.status === "success" && !!token;
    },
  },
});
