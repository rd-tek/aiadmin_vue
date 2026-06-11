<template>
    <div class="dashboard" :class="{ 'is-move': dashboardMove }" ref="dashboardRef">
      <div class="dashboard-grid">
        <div class="dashboard-grid-list">
          <div class="dashboard-grid-item">
            <p class="title">
              일반 회원
              (월누적: {{ dashboardData.playercntmonth.toLocaleString() }}
              / 총누적: {{ dashboardData.playercnttotal.toLocaleString() }})
            </p>
            <div class="chart" v-if="dashboardData.length > 0">
              <chart-line
                :labels="[
                  '1월','2월','3월','4월','5월','6월',
                  '7월','8월','9월','10월','11월','12월'
                ]"
                :values1="dashboardData.playerlist"
                :values2="dashboardData.ownerlist"
                height="250px"
              />
            </div>
            <div class="no-info" v-else>데이터가 없습니다.</div>
          </div>
          <div class="dashboard-grid-item">
            <p class="title">
              매장 회원
              (월누적: {{ dashboardData.ownercntmonth.toLocaleString() }}
              / 총누적: {{ dashboardData.ownercnttotal.toLocaleString() }})
            </p>
            <div class="chart" v-if="dashboardData.length > 0">
              <chart-bar
                :labels="[
                  '1월','2월','3월','4월','5월','6월',
                  '7월','8월','9월','10월','11월','12월'
                ]"
                :values1="dashboardData.playerlist"
                :values2="dashboardData.ownerlist"
                height="250px"
              />
            </div>
            <div class="no-info" v-else>데이터가 없습니다.</div>
          </div>
        </div>
        <div class="dashboard-grid-list">
          <div class="dashboard-grid-item">
            <p class="title">
              게임(중단) 회원
              (월누적: {{ dashboardData.gamestopcntmonth.toLocaleString() }}
              / 총누적: {{ dashboardData.gamestopcnttotal.toLocaleString() }})
            </p>
            <div class="chart" v-if="dashboardData.length > 0">
              <chart-line
                :labels="[
                  '1월','2월','3월','4월','5월','6월',
                  '7월','8월','9월','10월','11월','12월'
                ]"
                :values1="dashboardData.gamestoplist"
                :values2="dashboardData.gameendlist"
                height="250px"
              />
            </div>
            <div class="no-info" v-else>데이터가 없습니다.</div>
          </div>
          <div class="dashboard-grid-item">
            <p class="title">
              게임(완료) 회원
              (월누적: {{ dashboardData.gameendcntmonth.toLocaleString() }}
              / 총누적: {{ dashboardData.gameendcnttotal.toLocaleString() }})
            </p>
            <div class="chart" v-if="dashboardData.length > 0">
              <chart-bar
                :labels="[
                  '1월','2월','3월','4월','5월','6월',
                  '7월','8월','9월','10월','11월','12월'
                ]"
                :values1="dashboardData.gamestoplist"
                :values2="dashboardData.gameendlist"
                height="250px"
              />
            </div>
            <div class="no-info" v-else>데이터가 없습니다.</div>
          </div>
        </div>
        <div class="dashboard-grid-list">
          <div class="dashboard-grid-item">
            <p class="title">
              토너먼트 회원
              (월누적: {{ dashboardData.tournamentcntmonth.toLocaleString() }}
              / 총누적: {{ dashboardData.tournamentcnttotal.toLocaleString() }})
            </p>
            <div class="chart" v-if="dashboardData.length > 0">
              <chart-line
                :labels="[
                  '1월','2월','3월','4월','5월','6월',
                  '7월','8월','9월','10월','11월','12월'
                ]"
                :values1="dashboardData.tournamentlist"
                :values2="dashboardData.eventwinninglist"
                height="250px"
              />
            </div>
            <div class="no-info" v-else>데이터가 없습니다.</div>
          </div>
          <div class="dashboard-grid-item">
            <p class="title">
              미니게임 당첨자 회원
              (월누적: {{ dashboardData.eventwinningcntmonth.toLocaleString() }}
              / 총누적: {{ dashboardData.eventwinningcnttotal.toLocaleString() }})
            </p>
            <div class="chart" v-if="dashboardData.length > 0">
              <chart-bar
                :labels="[
                  '1월','2월','3월','4월','5월','6월',
                  '7월','8월','9월','10월','11월','12월'
                ]"
                :values1="dashboardData.tournamentlist"
                :values2="dashboardData.eventwinninglist"
                height="250px"
              />
            </div>
            <div class="no-info" v-else>데이터가 없습니다.</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import { useMainApi } from "~/api/main";

const { _getMain } = useMainApi();

const dashboardRef = ref(null);
const dashboardMove = ref(false);

const dashboardData = ref({
  
  // 일반 회원
  playercntmonth: 0,
  playercnttotal: 0,
  playerlist: [],
  chart1_labels: [],
  chart1_data: [],

  // 매장 회원
  ownercntmonth: 0,
  ownercnttotal: 0,
  ownerlist: [],
  chart2_labels: [],
  chart2_data: [],

  // 게임(중단)
  gamestopcntmonth: 0,
  gamestopcnttotal: 0,
  gamestoplist: [],
  chart3_labels: [],
  chart3_data: [],

  // 게임(완료)
  gameendcntmonth: 0,
  gameendcnttotal: 0,
  gameendlist: [],
  chart4_labels: [],
  chart4_data: [],

  // 토너먼트
  tournamentcntmonth: 0,
  tournamentcnttotal: 0,
  tournamentlist: [],
  chart5_labels: [],
  chart5_data: [],

  // 미니게임 당첨자
  eventwinningcntmonth: 0,
  eventwinningcnttotal: 0,
  eventwinninglist: [],
  chart6_labels: [],
  chart6_data: [],
});

// 메인 데이터 조회
const getMainData = async () => {
  try {
    const res = await _getMain();

    if (res.code === 200) {
      dashboardData.value = res;
    }
  } catch (err) {
    console.error(err);
  }
};

useIntersectionObserver(
  dashboardRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) dashboardMove.value = true;
  },
  { threshold: 0 }
);

onMounted(() => {
  getMainData();
});

definePageMeta({
  layout: "default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/dashboard.scss';
</style>