<template>
    <div class="game-data game-info-v2">
      <!-- 2026-10-13: 게임정보 개편 — 요약 카드 + 그룹 표(플레이어별 열) -->
      <div class="game-data-wrap">
        <div class="game-data-title">게임정보</div>
        <div class="game-data-cont">
          <div class="no-data" v-if="!players.length">데이터가 없습니다.</div>
          <template v-else>
            <div class="gi-summary">
              <div class="gi-sum-item"><span class="k">게임 번호</span><span class="v">{{ g.gameno || '-' }}</span></div>
              <div class="gi-sum-item"><span class="k">매장</span><span class="v">{{ g.shopname || '-' }}</span></div>
              <div class="gi-sum-item"><span class="k">코스</span><span class="v">{{ g.coursename || '-' }}<small v-if="g.coursecode"> ({{ g.coursecode }})</small></span></div>
              <div class="gi-sum-item"><span class="k">시작</span><span class="v">{{ g.regdate || '-' }}</span></div>
              <div class="gi-sum-item"><span class="k">완료(중단)</span><span class="v">{{ g.enddate || '-' }}</span></div>
              <div class="gi-sum-item"><span class="k">플레이어</span><span class="v">{{ players.length }}명</span></div>
            </div>
            <div class="gi-table-wrap">
              <table class="gi-table">
                <colgroup>
                  <col style="width:160px">
                  <col v-for="(p, i) in players" :key="'c' + i">
                </colgroup>
                <thead>
                  <tr>
                    <th>플레이어</th>
                    <th v-for="(p, i) in players" :key="'h' + i">
                      <div class="gi-player">{{ p.playernickname || p.playername || '-' }}</div>
                      <div class="gi-player-sub">{{ p.playername || '-' }} · 회원 {{ p.playerno || '-' }}</div>
                    </th>
                  </tr>
                </thead>
                <tbody v-for="grp in groups" :key="grp.title">
                  <tr class="gi-group"><td :colspan="players.length + 1">{{ grp.title }}</td></tr>
                  <tr v-for="row in grp.rows" :key="row.label">
                    <th>{{ row.label }}</th>
                    <td v-for="(p, i) in players" :key="row.label + i">{{ row.fmt(p) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
          <div class="btn-wrap">
            <nuxt-link to="/manager/game-data" class="btn-md-line">목록 보기</nuxt-link>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import { useIntersectionObserver } from "@vueuse/core";
import { useGameDataApi } from "@/api/gamedata";
import { useRoute } from "vue-router";

// 2026.03.04[cgnoh]: 라우터 설정
const route = useRoute();

// 2026.06.16[cgnoh]: api 관련
const { _gameInfo } = useGameDataApi();

// 2026.06.17[cgnoh]: 게임리스트 조회
const handleGameInfo = async () => {
  const gameno = route.params.slug;

  if (!gameno) {
    console.error("gameno 없음");
    return;
  }

  const res = await _gameInfo(gameno);
  gameinfoList.value = res.playerlist

};

// 2026.06.17[cgnoh]: 원샷정보 인터렉션
const gameinfoList = ref({});
const gameinfoListRef = ref();
const gameinfoListMove = ref(false);
useIntersectionObserver(gameinfoListRef, ([{ isIntersecting }]) => {
    if (isIntersecting) gameinfoListMove.value = true;
}, { threshold: 0 });


// 2026-10-13: 게임정보 표시 가공(코드→라벨, 단위)
const players = computed(() => (Array.isArray(gameinfoList.value) ? gameinfoList.value : []));
const g = computed(() => players.value[0] || {});
const dash = (v) => (v === null || v === undefined || v === '' ? '-' : v);
const n2 = (v) => { const n = Number(v); return v === null || v === undefined || v === '' || !Number.isFinite(n) ? '-' : String(Math.floor(n * 100 + 1e-9) / 100); };
const unit = (v, u) => (n2(v) === '-' ? '-' : `${n2(v)}${u}`);
const TEE = { 1: '프로(블루)', 2: '일반(화이트)', 3: '레이디(레드)', 4: '시니어(옐로우)', 5: '챔피언(블랙)' };
const LEVEL = { 1: '프로', 2: '준프로', 3: '숙련', 4: '일반', 5: '입문' };
const GENDER = { M: '남', F: '여', m: '남', f: '여', 1: '남', 2: '여' };
const groups = [
  { title: '플레이 설정', rows: [
    { label: '플레이어 번호', fmt: (p) => dash(p.gameplayerno) },
    { label: '성별', fmt: (p) => GENDER[p.gender] || dash(p.gender) },
    { label: '티박스', fmt: (p) => TEE[p.teebox] || dash(p.teebox) },
    { label: '난이도', fmt: (p) => LEVEL[p.gamelevel] || dash(p.gamelevel) },
    { label: '멀리건', fmt: (p) => (p.mulliganflag == 1 ? '사용' : p.mulliganflag == 0 ? '미사용' : dash(p.mulliganflag)) },
    { label: '완료 홀', fmt: (p) => (dash(p.holedone) === '-' ? '-' : `${p.holedone}홀`) },
  ] },
  { title: '샷 기록', rows: [
    { label: '평균 비거리', fmt: (p) => unit(p.avgdistance, 'm') },
    { label: '최대 비거리', fmt: (p) => unit(p.maxdistance, 'm') },
    { label: '홀당 퍼트 수', fmt: (p) => n2(p.avgput) },
    { label: '그린 적중률', fmt: (p) => unit(p.greenrate, '%') },
    { label: '페어웨이 안착률', fmt: (p) => unit(p.farewayrate, '%') },
    { label: '파세이브율', fmt: (p) => unit(p.parsave, '%') },
  ] },
  { title: '스코어 성과', rows: [
    { label: '홀인원', fmt: (p) => dash(p.holeinone) },
    { label: '알바트로스', fmt: (p) => dash(p.albatross) },
    { label: '이글', fmt: (p) => dash(p.eagle) },
    { label: '버디', fmt: (p) => dash(p.birdie) },
    { label: '파', fmt: (p) => dash(p.par) },
  ] },
];

onMounted(() => {
  handleGameInfo();
});

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  // 2026-10-20: 번호(숫자)만 상세로 — 그 외 주소는 404 (예: /academy/test 가 상세로 들어가 오류 창이 뜨던 것)
  validate: (route) => /^\d+$/.test(String(route.params.slug ?? '')),
  layout: "default",
});

useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  title: '게임데이터 관리',
  meta: [
    { name: 'description', content: '게임데이터 관리 페이지 입니다.' }
  ]
})
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/game-data.scss';

/* 2026-10-08(UI 검토): 좁은 화면·글자 확대 시 게임정보 표가 페이지를 가로로 넘치던 문제(날짜 줄바꿈 금지 후 +10px) → 표 영역만 가로 스크롤 */
@media screen and (max-width: 768px) {
  .game-data-cont:has(> .table.type04) { overflow-x: auto; -webkit-overflow-scrolling: touch; }
}

/* 2026-10-13: 게임정보 개편 */
.game-info-v2 .no-data { padding: 40px 0; text-align: center; color: #8a8f98; }
.game-info-v2 .gi-summary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-bottom: 24px; }
.game-info-v2 .gi-sum-item { background: #f6f7fb; border: 1px solid #eceef3; border-radius: 12px; padding: 14px 18px; display: flex; flex-direction: column; gap: 6px; }
.game-info-v2 .gi-sum-item .k { font-size: 13px; color: #7a8088; }
.game-info-v2 .gi-sum-item .v { font-size: 17px; font-weight: 700; color: #1b2559; word-break: break-all; }
.game-info-v2 .gi-sum-item .v small { font-size: 12px; font-weight: 500; color: #8a8f98; }
.game-info-v2 .gi-table-wrap { overflow-x: auto; border: 1px solid #eceef3; border-radius: 12px; }
.game-info-v2 .gi-table { opacity: 1 !important; transform: none !important; /* 공통 table 진입 애니메이션(opacity 0) 제외 */ width: 100%; border-collapse: collapse; font-size: 14px; }
.game-info-v2 .gi-table th, .game-info-v2 .gi-table td { padding: 12px 16px; border-bottom: 1px solid #f0f1f5; text-align: left; }
.game-info-v2 .gi-table tbody th { color: #676d73; font-weight: 500; background: #fbfbfd; white-space: nowrap; }
.game-info-v2 .gi-table td { color: #1b1d1f; font-variant-numeric: tabular-nums; }
.game-info-v2 .gi-table thead th { background: #1b2559; color: #fff; font-weight: 600; }
.game-info-v2 .gi-player { font-size: 15px; font-weight: 700; }
.game-info-v2 .gi-player-sub { font-size: 12px; opacity: .75; margin-top: 2px; }
.game-info-v2 .gi-group td { background: #eef0ff; color: #4318FF; font-weight: 700; font-size: 13px; padding: 8px 16px; }
.game-info-v2 .btn-wrap { display: flex; justify-content: center; margin-top: 28px; }
@media screen and (max-width: 768px) {
  .game-info-v2 .gi-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .game-info-v2 .gi-table th, .game-info-v2 .gi-table td { padding: 10px 12px; }
}
</style>