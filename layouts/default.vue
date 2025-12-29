<template>
  <!-- 🔥 로그인 여부 확인되기 전까지는 아무 것도 렌더하지 않음 -->
  <div v-if="ready" id="wrapper">
    <layout-header />
    <div class="container">
      <slot />
      <transition name="fade">
        <button
          aria-label="top"
          ref="btnTopRef"
          v-show="isScrollToTop"
          type="button"
          class="btn-top type01"
          @click="scrollToTop"
        >
          <svg-top />
        </button>
    </transition>
    </div>
    <layout-footer />
  </div>

  <!-- 필요하면 로딩 넣기
  <div v-else class="loading">Loading...</div>
  -->
</template>
<script setup>
import { ref } from "vue";

const ready = ref(false);

if (process.client) {
  const route = useRoute();
  const publicPaths = ["/login", "/signup", "/login/find-id", "/login/find-pw"];
  const isPublic = publicPaths.includes(route.path);

  if (isPublic) {
    // 이 레이아웃이 public에서 쓰일 일은 거의 없겠지만, 혹시 모르니 열어둠
    ready.value = true;
  } else {
    const token = sessionStorage.getItem("aicoachtoken");

    if (!token) {
      // 🔒 토큰 없으면 → 바로 로그인으로
      await navigateTo("/login", { replace: true });
    } else {
      // 🔓 토큰 있으면 → 이 레이아웃/페이지 그려도 됨
      ready.value = true;
    }
  }
}

// 스크롤 이벤트
const btnTopRef = ref();
const isScrollToTop = ref(false);

// 탑 스크롤 버튼
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  isScrollToTop.value = scrollTop > 100;

  if(window.innerWidth >= 768) {
    if (btnTopRef.value) {
      if (documentHeight - (scrollTop + windowHeight) <= 270) {
        btnTopRef.value.classList.add("is-active");
      } else {
        btnTopRef.value.classList.remove("is-active");
      }
    } 
  } else {
    if (btnTopRef.value) {
      if (documentHeight - (scrollTop + windowHeight) <= 270) {
        btnTopRef.value.classList.add("is-active");
      } else {
        btnTopRef.value.classList.remove("is-active");
      }
    } 
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

</script>
<style lang="scss" scoped>
@use "@/assets/scss/components/btn-top.scss";
.container {
   min-height: calc(100svh - 238px);
}
</style>
