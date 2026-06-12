export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("aiadmintoken");

  // 로그인 페이지
  if (to.path === "/login") {
    if (token.value) {
      return navigateTo("/");
    }
    return;
  }

  // 로그인 안된 경우
  if (!token.value) {
    return navigateTo("/login");
  }
});