// /middleware/auth.global.js
import { useAuthStore } from "@/stores/useauthstore";

export default defineNuxtRouteMiddleware((to, from) => {
  // SSR 에선 localStorage 접근 불가 → 아무 것도 하지 않음
  if (!process.client) return;

  const authStore = useAuthStore();

  // 비회원 허용 경로
  const publicPaths = ["/login", "/signup", "/login/find-id", "/login/find-pw"];

  const isPublic = publicPaths.includes(to.path);

  // sessionStorage token 읽기
  const token = sessionStorage.getItem("aicoachtoken");

  // 1) 로그인 안 됐고, public이 아니면 → 로그인
  if (!token && !isPublic) {
    return navigateTo("/login");
  }

  // 2) 로그인 되어 있는데 /login 접근 → 메인으로
  if (token && to.path === "/login") {
    return navigateTo("/");
  }

  // 3) 나머지는 통과
  return;
});
