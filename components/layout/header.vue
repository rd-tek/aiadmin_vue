<template>
  <header>
    <div class="left-area">
      <button type="button" class="btn-open" @click="handleGnb" aria-label="메뉴 열기">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 1V19M12 7L15 10L12 13M3 1H17C18.1046 1 19 1.89543 19 3V17C19 18.1046 18.1046 19 17 19H3C1.89543 19 1 18.1046 1 17V3C1 1.89543 1.89543 1 3 1Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="title">
        <span class="text">
          <transition name="title-slide" mode="out-in">
            <span
              :key="route.fullPath"
              class="name" role="heading" aria-level="1"
            >
              {{ pageTitle }}
            </span>
          </transition>
        </span>
        <span class="sub">
          <client-only>
            <span class="greet">안녕하세요, <b>{{ displayName }}</b>님</span><span class="dot" aria-hidden="true">·</span><span class="today">{{ todayText }}</span>
          </client-only>
        </span>
      </div>
      <!-- 2026-10-21: 화면 크기 — 모바일(≤768) 상단바: 메뉴 버튼 옆 아이콘 --><font-size-control compact pop-align="left" class="header-fs header-fs--mob" />
      <!-- 2026-10-20: 모바일 이름 = PC 인사말과 같은 관리자 이름 -->
      <div class="nickname">
        <client-only>{{ displayName }}님</client-only>
      </div>
    </div>
    <!-- 2026-10-21: 오른쪽 영역 항상 표시 — 화면 크기(정부24 방식)는 헤더 오른쪽 끝 고정, 달력은 대시보드에서만 -->
    <div class="right-area" :class="{ 'is-empty': route.path !== '/' }">
      <template v-if="route.path === '/'">
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
      </template>
      <font-size-control class="header-fs header-fs--pc" />
    </div>
  </header>
</template>
<script setup>
import { useRoute } from "vue-router";
import useRouteTitleMap from '@/composable/useRouteTitleMap'

// 2026.03.04[cgnoh]: 라이브러리 관련
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const defaultForm = {
  id: process.client ? localStorage.getItem("remember_id") : "",
};
const form = ref({ ...defaultForm });

// 2026.03.04[cgnoh]: 라우터 설정
const route = useRoute(); 
const routeTitleMap = useRouteTitleMap();
const pageTitle = computed(() => {
  const name = route.name?.toString() ?? "";

  const key = Object.keys(routeTitleMap)
    .sort((a, b) => b.length - a.length)
    .find(k => name.startsWith(k));

  const title = routeTitleMap[key] ?? "대시보드";
  // 2026-10-22: 대회·미니게임 등록/수정은 한 화면(edit/0 = 신규) → 번호 0 이면 '등록'으로
  if (/^(tournament|event)-.*-edit-slug$/.test(name) && String(route.params.slug) === "0") return title.replace(/수정$/, "등록");
  return title;
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
const month = useMonth();
const formatMonth = (date) => {
  const year = date.getFullYear();
  const month =  `${date.getMonth() + 1}`.padStart(2, "0");
  return `${year}.${month}`; 
}

// 2026.10.15: 반복 타이핑 애니메이션 → 고정 인사말 + 오늘 날짜(KST)
const adminName = useCookie('aiadmin_name'); // 2026-10-20: 로그인한 관리자 이름(api/auth.js, 앱 전용 쿠키)
const displayName = computed(() => adminName.value || form.value.id || '관리자');
const todayText = computed(() => {
  const d = new Date();
  const w = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()];
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${w})`;
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/layouts/header.scss';
</style>