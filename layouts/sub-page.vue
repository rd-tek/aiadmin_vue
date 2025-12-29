<template>
  <div id="wrapper">
    <layout-sub-header />
    <div class="container">
      <slot />
    </div>
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
    <layout-footer />
  </div>
</template>
<script setup>
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