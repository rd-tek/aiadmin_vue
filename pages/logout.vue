<!-- /pages/logout.vue -->
<script setup>
import { useAuthStore } from "@/stores/useauthstore"; // 실제 경로에 맞게 조정
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();


if (import.meta.client) {
  onMounted(async () => {
    try {
      await auth.logout() // 토큰/스토어/쿠키 정리 (비동기 가정)
    } finally {
      await navigateTo('/', { replace: true })
    }
  })
}

// onBeforeMount(() => {
//   auth.logout();
//   router.replace("/"); // 또는 원하는 경로
// });
</script>

<template>
  <div>로그아웃 중입니다...</div>
</template>
