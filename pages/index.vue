<template>
    <div class="dashboard" :class="{ 'is-move': dashboardMove }" ref="dashboardRef">
      <div class="dashboard-grid">
        <div class="dashboard-grid-list">
          <div class="dashboard-grid-item">
            <p class="title">
              일반 회원
              (월누적: {{ dashboardData.playercntmonth }}
              / 총누적: {{ dashboardData.playercnttotal }})
            </p>
            <div class="chart" v-if="dashboardData !== ''">
              <chart-line
                :labels="dashboardData.playerlist.map(v => v.date)"
                :values1="dashboardData.playerlist.map(v => v.cnt)"
                :values2="[]"
                name1="월누적"
                height="250px"
              />
            </div>
            <div class="no-info" v-else>데이터가 없습니다.</div>
          </div>
          <div class="dashboard-grid-item">
            <p class="title">
              매장 회원
              (월누적: {{ dashboardData.ownercntmonth }}
              / 총누적: {{ dashboardData.ownercnttotal }})
            </p>
            <div class="chart" v-if="dashboardData !== ''">
              <chart-bar
  :labels="dashboardData.ownerlist.map(v => v.date)"
  :values1="dashboardData.ownerlist.map(v => v.cnt)"
  name1="월누적"
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
              (월누적: {{ dashboardData.gamestopcntmonth }}
              / 총누적: {{ dashboardData.gamestopcnttotal }})
            </p>
            <div class="chart" v-if="dashboardData !== ''">
              <chart-line
  :labels="dashboardData.gamestoplist.map(v => v.date)"
  :values1="dashboardData.gamestoplist.map(v => v.cnt)"
  name1="월누적"
  height="250px"
/>
            </div>
            <div class="no-info" v-else>데이터가 없습니다.</div>
          </div>
          <div class="dashboard-grid-item">
            <p class="title">
              게임(완료) 회원
              (월누적: {{ dashboardData.gameendcntmonth }}
              / 총누적: {{ dashboardData.gameendcnttotal }})
            </p>
            <div class="chart" v-if="dashboardData !== ''">
              <chart-bar
  :labels="dashboardData.gameendlist.map(v => v.date)"
  :values1="dashboardData.gameendlist.map(v => v.cnt)"
    name1="월누적"
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
              (월누적: {{ dashboardData.tournamentcntmonth }}
              / 총누적: {{ dashboardData.tournamentcnttotal }})
            </p>
            <div class="chart" v-if="dashboardData !== ''">
              <chart-line
  :labels="dashboardData.tournamentlist.map(v => v.date)"
  :values1="dashboardData.tournamentlist.map(v => v.cnt)"
  name1="월누적"
  height="250px"
/>
            </div>
            <div class="no-info" v-else>데이터가 없습니다.</div>
          </div>
          <div class="dashboard-grid-item">
            <p class="title">
              미니게임 당첨자 회원
              (월누적: {{ dashboardData.eventwinningcntmonth }}
              / 총누적: {{ dashboardData.eventwinningcnttotal }})
            </p>
            <div class="chart" v-if="dashboardData !== ''">
              <chart-bar
  :labels="dashboardData.eventwinninglist.map(v => v.date)"
  :values1="dashboardData.eventwinninglist.map(v => v.cnt)"
  name1="월누적"
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

// 2026.06.18[cgnoh]: api 관련
const { _getMain } = useMainApi();
const month = useMonth();
// 2026.06.18[cgnoh]: 대시보드 데이터 조회
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

// 2026.06.18[cgnoh]: 메인 데이터 조회
const getMainData = async (date = month.value) => {

  let d
  if (date?.year !== undefined) {
    d = new Date(date.year, date.month, 1)
  } else {
    d = date instanceof Date ? date : new Date(date)
  }

  const year = d.getFullYear()
  const mon = `${d.getMonth() + 1}`.padStart(2, '0')
  const regdate = `${year}-${mon}-01`

  try {
    

    const res = await _getMain({
      regdate,
    });

    if (res.code === 200) {
      dashboardData.value = res;
    }
  } catch (err) {
    console.error(err);
  }
};

// 2026.06.18[cgnoh]: 인터렉션 관련
const dashboardRef = ref(null);
const dashboardMove = ref(false);
useIntersectionObserver(
  dashboardRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) dashboardMove.value = true;
  },
  { threshold: 0 }
);

watch(month, (newVal) => {
  getMainData(newVal)
})

onMounted(() => {
  getMainData();
});

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "default",
});

useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  title: '대시보드',
  meta: [
    { name: 'description', content: '대시보드 페이지 입니다.' }
  ]
})
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/dashboard.scss';
</style>