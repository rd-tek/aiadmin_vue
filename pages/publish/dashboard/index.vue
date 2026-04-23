<template>
    <div class="dashboard" :class="{ 'is-move': dashboardMove }" ref="dashboardRef">
      <div class="dashboard-grid">
        <div class="dashboard-grid-item">
          <p class="title">일반 회원(월누적: 300/ 총누적: 10,000)</p>
          <div class="chart">
             <chart-line
              :labels="['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']"
              :values1="[80, 100, 140, 200, 280, 360, 420, 380, 300, 220, 150, 100]"
              :values2="[60, 90, 150, 240, 350, 480, 600, 500, 360, 240, 150, 90]"
              height="250px">
            </chart-line>
          </div>
        </div>
        <div class="dashboard-grid-item">
          <p class="title">일반 회원(월누적: 300/ 총누적: 10,000)</p>
          <div class="chart">
             <chart-bar
              :labels="['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']"
              :values1="[50, 60, 70, 80, 90, 100, 110, 100, 90, 80, 70, 60]"
              :values2="[30, 40, 50, 60, 70, 80, 90, 80, 70, 60, 50, 40]"
              :values3="[20, 30, 40, 50, 60, 70, 80, 70, 60, 50, 40, 30]"
              height="250px">
            </chart-bar>
          </div>
        </div>
        <div class="dashboard-grid-item">
          <p class="title">일반 회원(월누적: 300/ 총누적: 10,000)</p>
          <div class="chart">
             <chart-line
              :labels="['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']"
              :values1="[80, 100, 140, 200, 280, 360, 420, 380, 300, 220, 150, 100]"
              :values2="[60, 90, 150, 240, 350, 480, 600, 500, 360, 240, 150, 90]"
              height="250px">
            </chart-line>
          </div>
        </div>
        <div class="dashboard-grid-item">
          <p class="title">일반 회원(월누적: 300/ 총누적: 10,000)</p>
          <div class="chart">
             <chart-bar
              :labels="['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']"
              :values1="[50, 60, 70, 80, 90, 100, 110, 100, 90, 80, 70, 60]"
              :values2="[30, 40, 50, 60, 70, 80, 90, 80, 70, 60, 50, 40]"
              :values3="[20, 30, 40, 50, 60, 70, 80, 70, 60, 50, 40, 30]"
              height="250px">
            </chart-bar>
          </div>
        </div>
        <div class="dashboard-grid-item">
          <p class="title">일반 회원(월누적: 300/ 총누적: 10,000)</p>
          <div class="chart">
             <chart-line
              :labels="['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']"
              :values1="[80, 100, 140, 200, 280, 360, 420, 380, 300, 220, 150, 100]"
              :values2="[60, 90, 150, 240, 350, 480, 600, 500, 360, 240, 150, 90]"
              height="250px">
            </chart-line>
          </div>
        </div>
        <div class="dashboard-grid-item">
          <p class="title">일반 회원(월누적: 300/ 총누적: 10,000)</p>
          <div class="chart">
             <chart-bar
              :labels="['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']"
              :values1="[50, 60, 70, 80, 90, 100, 110, 100, 90, 80, 70, 60]"
              :values2="[30, 40, 50, 60, 70, 80, 90, 80, 70, 60, 50, 40]"
              :values3="[20, 30, 40, 50, 60, 70, 80, 70, 60, 50, 40, 30]"
              height="250px">
            </chart-bar>
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