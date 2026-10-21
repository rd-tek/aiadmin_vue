<template>
  <div id="wrapper">
    <!-- 2026-10-21: 강좌 강의실은 GNB 없이(4앱 공통). 모바일·태블릿은 PC 왼쪽 패널의 '돌아가기'와 같은 뒤로가기 줄만 둠 -->
    <!-- 강의실은 GNB 가 없어 글자 크기만 오른쪽 아래 고정 버튼으로 -->
    <ClientOnly><font-size-control floating /></ClientOnly>
    <div class="lecture-topbar">
      <nuxt-link to="/coaching/golf" class="lecture-topbar-back" aria-label="코칭 리스트 돌아가기">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M15.5 5 8.5 12l7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span>코칭 리스트 돌아가기</span>
      </nuxt-link>
    </div>
    <div class="container">
      <slot />
      <transition name="fade">
        <button
          aria-label="top"
          ref="btnTopRef"
          v-show="isScrollToTop"
          type="button"
          class="btn-top type01"
          @click="scrollToTop">
          <svg-top />
        </button>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 2026-09-18: aishop layouts/detail.vue 참고 — 코칭 강의실(코칭 상세)에서 좌측 GNB 없이 전체화면.
//   Nuxt layout 정본대로 <slot/> 사용(aishop 은 <NuxtPage/> 였으나 layout 은 slot 이 표준).
const btnTopRef = ref();
const isScrollToTop = ref(false);
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  isScrollToTop.value = scrollTop > 100;

  if (btnTopRef.value) {
    if (documentHeight - (scrollTop + windowHeight) <= 270) {
      btnTopRef.value.classList.add("is-active");
    } else {
      btnTopRef.value.classList.remove("is-active");
    }
  }
};

// 탑 스크롤 버튼
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
})
</script>

<style scoped lang="scss">
.container {
  min-height: 100svh;
}

.btn-top {
    position: fixed;
    right: 60px;
    bottom: 30px;
    overflow: hidden;
    z-index: 99;
    transform: translateY(-30px);

    &.is-active {
        position: absolute;
        bottom: auto;
    }
}

@media screen and (max-width: 1024px) {
  .btn-top {
      width: 50px;
      height: 50px;
      right: 30px;
      transform: translateY(-25px);

      &.type01 {
          svg {
              height: 30px;
          }
      }
  }
}
</style>

<style lang="scss" scoped>
/* 2026-10-21: 강의실 뒤로가기 줄 — PC(1025~)는 왼쪽 패널에 '돌아가기'가 있어 숨김 */
.lecture-topbar { display: none; }
@media screen and (max-width: 1024px) {
  .lecture-topbar {
    display: flex; align-items: center; height: 52px; padding: 0 16px;
    background: #298097; position: sticky; top: 0; z-index: 50;
  }
  .lecture-topbar-back { display: inline-flex; align-items: center; gap: 6px; color: #fff; font-size: 15px; font-weight: 600; }
}
</style>
