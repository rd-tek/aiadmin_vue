<template>
  <div id="wrapper">
    <!-- 데스크탑 전용 헤더 -->
    <layout-header v-if="!isMobile" />

    <!-- 모바일 전용 헤더 -->
    <layout-mob-detail-header v-if="isMobile" />

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
import { ref, onMounted, onUnmounted } from 'vue'

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
  handleResize()
  window.addEventListener('resize', handleResize);
  window.addEventListener("scroll", handleScroll);
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener("scroll", handleScroll);
})
</script>

