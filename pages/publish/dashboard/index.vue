<template>
    <div class="dashboard" :class="{ 'is-move': dashboardMove }" ref="dashboardRef">
      <div class="dashboard-grid">
        <div class="dashboard-grid-item" v-for="(item, index) in 6" :key="index">
          <p class="title">일반 회원(월누적: 300/ 총누적: 10,000)</p>
          <div class="chart">
             <chart-e-chart></chart-e-chart>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import { useIntersectionObserver } from '@vueuse/core'

// 2026.03.26[cgnoh]: 인터렉션 관련
const dashboardRef = ref(null);
const dashboardMove = ref(false);

useIntersectionObserver(
  dashboardRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) dashboardMove.value = true
  },
  { threshold: 0 }
);

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "publish-default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/dashboard.scss';

</style>