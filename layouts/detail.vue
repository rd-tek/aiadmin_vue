<template>
  <div id="wrapper">
    <layout-header v-if="isMobile" />

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

    <layout-footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isMobile = ref(false)

// 스크롤 이벤트
const btnTopRef = ref();
const isScrollToTop = ref(false);
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

// 탑 스크롤 버튼
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const handleResize = () => {
  isMobile.value = window.innerWidth <= 1024
}

onMounted(() => {
  handleResize() // 초기 상태 체크
  window.addEventListener('resize', handleResize);
  window.addEventListener("scroll", handleScroll);
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener("scroll", handleScroll);
})
</script>

<style scoped lang="scss">
.container {
  min-height: calc(100svh - 310px);
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
