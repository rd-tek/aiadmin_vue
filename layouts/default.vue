<template>
  <div id="wrapper">
    <layout-gnb v-model:isOpen="isOpen" @close-gnb="handleClose"></layout-gnb>
    <section @click.self="handleClose">
      <layout-header 
        @toggle-gnb="toggleGnb"
        ></layout-header>
      <div class="container">
        <slot />
      </div>
    </section>
  </div>
</template>
<script setup>
import { useWindowSize } from '@vueuse/core'

// 2026.05.19[cgnoh]: 열림 여부
const isOpen = ref(true)

// 2026.05.19[cgnoh]: 토글 이벤트
const toggleGnb = () => {
  isOpen.value = !isOpen.value;
}

// 2026.05.19[cgnoh]: 닫기 이벤트
const handleClose = () => {
  if(window.innerWidth < 1300) {
    isOpen.value = false;
    document.querySelector('section').classList.remove('is-on');
    document.querySelector('body').classList.remove('is-hidden');
  }
}

// 2026.05.19[cgnoh]: 반응형 이벤트
const { width } = useWindowSize();
watch(width, (w) => {
  isOpen.value = w > 1300
}, { immediate: true });

definePageMeta({
  middleware: 'auth'
})

</script>
<style lang="scss" scoped>
#wrapper {
  height: 100vh;
  
  section {
    padding: 30px 30px 30px 30px;
    margin: 0 0 0 262px;
    transition: all ease .2s;
    width: calc(100% - 264px);
    min-height: 100%;
    background: #F4F7FE;

    &.is-on {
      &:after {
        display: block;
      }
    }

    &:after {
      content: '';
      display: none;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      backdrop-filter: blur(3px);
      position: absolute;
      left: 0;
      top: 0;
      transition: all ease .2s;
      z-index: 1;
    }
  }
}

@media screen and (max-width: 1300px) {
    #wrapper {
      section {
        width: 100%;
        margin: 0;
      }
    }
}

@media screen and (max-width: 768px) {
    #wrapper {
      section {
        padding: 0;

        .container {
          padding: 0 20px 20px;

          &:has(.booking) {
            padding: 0;
          }

          &:has(.settings) {
            padding: 0;
          }
        }
      }
    }
}

</style>