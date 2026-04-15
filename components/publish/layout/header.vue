<template>
  <header>
    <div class="left-area">
      <button type="button" class="btn-open" @click="handleGnb">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 1V19M12 7L15 10L12 13M3 1H17C18.1046 1 19 1.89543 19 3V17C19 18.1046 18.1046 19 17 19H3C1.89543 19 1 18.1046 1 17V3C1 1.89543 1.89543 1 3 1Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="title">
        <span class="text">
          <transition name="title-slide" mode="out-in">
            <span
              :key="route.fullPath"
              class="name"
            >
              {{ pageTitle }}
            </span>
          </transition>
        </span>
        <span class="sub">
          {{ typedText }}<span class="cursor">|</span>
        </span>
      </div>
    </div>
    <div class="right-area" v-if="route.path === '/publish/dashboard'">
      <div class="datepicker" 
          :class="{ active: isFocused }">
      <client-only>
        <VueDatePicker 
          v-model="month"
          :format="formatMonth" 
          month-picker
          auto-apply
          @open="isFocused = true"
          @closed="isFocused = false"
        />
      </client-only>
      </div>
    </div>
  </header>
</template>
<script setup>
import { useRoute } from "vue-router";
import useRouteTitleMap from '@/composable/publish/useRouteTitleMap'

// 2026.03.04[cgnoh]: 라이브러리 관련
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// 2026.03.04[cgnoh]: 라우터 설정
const route = useRoute(); 
const routeTitleMap = useRouteTitleMap();

const pageTitle = computed(() => {
  const name = route.name?.toString() ?? '';
  const key = Object.keys(routeTitleMap).find(k =>
    name.startsWith(k)
  );

  return routeTitleMap[key] ?? '';
});

// 2026.03.04[cgnoh]: GNB 토글
const emit = defineEmits(['toggle-gnb'])
const handleGnb = () => {
  emit('toggle-gnb');

  if(window.innerWidth < 1300) {
    document.querySelector('section').classList.add('is-on');
    document.querySelector('body').classList.add('is-hidden');
  }
}

// 2026.03.04[cgnoh]: 달력 상태
const isFocused = ref(false);
const month = ref(new Date());
const formatMonth = (date) => {
  const year = date.getFullYear();
  const month =  `${date.getMonth() + 1}`.padStart(2, "0");
  return `${year}.${month}`;
}

// 2026.03.04[cgnoh]: 타이핑 애니메이션
const fullText = "안녕하세요. X-golf Seoul";
const typedText = ref("");

let typingInterval = null;
let deletingInterval = null;

const startTyping = () => {
  let index = 0;

  typingInterval = setInterval(() => {
    typedText.value += fullText[index];
    index++;

    if (index === fullText.length) {
      clearInterval(typingInterval);
      setTimeout(startDeleting, 1000);
    }
  }, 80);
};

const startDeleting = () => {
  deletingInterval = setInterval(() => {
    typedText.value = typedText.value.slice(0, -1);

    if (typedText.value.length === 0) {
      clearInterval(deletingInterval);
      setTimeout(startTyping, 500);
    }
  }, 50);
};

// 2026.03.04[cgnoh]: 컴포넌트 라이프사이클
onMounted(() => {
  startTyping();
});

onBeforeUnmount(() => {
  clearInterval(typingInterval);
  clearInterval(deletingInterval);
});

</script>
<style lang="scss" scoped>
@use '@/assets/scss/layouts/header.scss';
</style>