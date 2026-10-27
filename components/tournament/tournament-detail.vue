<template>
  <!--
    2026-10-22: 대회 상세(관리자) — 조건 / 순위 탭. 챔피언십·매장대회 공용
    · 화면 형식: aiadmin 기존 상세(membership/shop/[slug])와 같은 표 형태(table type02), 순위는 목록 표(table type03)
    · aishop 상세 대비 보완: 대회 구분 표기 통일, '랭크 타입' 고정 문구 제거, 그린 조건·참가 매장 표시, 순위 페이지 넘김,
      넷스코어 = 평균 핸디캡 스코어 − 기준 타수(krshop ShopRank 정본)
  -->
  <div class="membership-member write tour-detail">
    <div class="write-wrap">
      <ul class="tab type01-b box" role="tablist">
        <li v-for="t in tabs" :key="t.key" class="tab-list" :class="{ 'is-active': tab === t.key }" role="tab" :aria-selected="tab === t.key" tabindex="0" @click="tab = t.key" @keyup.enter="tab = t.key">{{ t.name }}</li>
      </ul>

      <!-- 조건 -->
      <div class="table-wrap" v-if="tab === 'condition'">
        <div class="table type02">
          <table>
            <colgroup><col width="18%" /><col width="*" /></colgroup>
            <tbody>
              <tr><th>구분</th><td>
                <span class="badge" v-if="L.tourType(info.tourtype_fk)">{{ L.tourType(info.tourtype_fk) }}</span>
                <span class="badge" :class="L.tourStatusClass(info.status)" v-if="L.tourStatus(info.status)">{{ L.tourStatus(info.status) }}</span>
                <span class="badge kind">{{ isCompetition ? '매장대회' : '챔피언십' }}</span>
              </td></tr>
              <tr><th>대회명</th><td class="strong">{{ info.title || (loaded ? '-' : '') }}</td></tr>
              <tr><th>{{ isCompetition ? '매장' : '참가 매장' }}</th><td>{{ shopText }}</td></tr>
              <tr><th>기간</th><td><span class="u-date">{{ L.ymd(info.timezone_startdate) }}</span> ~ <span class="u-date">{{ L.ymd(info.timezone_enddate) }}</span></td></tr>
              <tr><th>참가 제한</th><td>{{ L.entryLimit(info.entrylimit) }}</td></tr>
              <tr v-if="info.remark"><th>대회 소개</th><td class="pre">{{ info.remark }}</td></tr>
              <tr><th>코스</th><td>{{ courseName }}</td></tr>
              <tr><th>서브코스</th><td>
                <template v-if="subcourses.length"><span class="pair" v-for="(sc, i) in subcourses" :key="i"><em>{{ Number(sc.seq) === 2 ? '후반' : '전반' }}</em><!-- 2026-10-26: 코스 이름(Out/In)과 겹쳐 전반/후반만 -->{{ sc.name }}</span></template>
                <template v-else>-</template>
              </td></tr>
              <tr><th>순위별 상품</th><td>
                <template v-if="prizerank.length"><span class="pair" v-for="(p, i) in prizerank" :key="i"><b>{{ p.rankno }}위</b>{{ p.rankprize || '-' }}</span></template>
                <template v-else>-</template>
              </td></tr>
              <tr><th>기타 시상</th><td>{{ prizeetc || '-' }}</td></tr>
              <tr><th>게임 조건</th><td>
                <span class="pair"><em>게임모드</em>{{ L.gameMode(info.mode) }}</span>
                <span class="pair"><em>플레이</em>{{ info.hole ? `${info.hole}홀` : '-' }}</span>
                <span class="pair"><em>레벨</em>{{ L.level(info.level) }}</span>
                <span class="pair"><em>바람</em>{{ L.wind(info.wind) }}</span>
                <span class="pair"><em>멀리건</em>{{ L.mulligan(info.mulligan) }}</span>
              </td></tr>
              <tr><th>그린</th><td>
                <span class="pair"><em>스피드</em>{{ L.greenSpeed(info.greenspeed_fk) }}</span>
                <span class="pair"><em>경사</em>{{ L.greenGravity(info.greengravity_fk) }}</span>
              </td></tr>
              <tr><th>티박스</th><td>
                <span class="pair"><em>남성</em>{{ L.tee(info.teeboxman) }}</span>
                <span class="pair"><em>여성</em>{{ L.tee(info.teeboxwoman) }}</span>
              </td></tr>
              <tr><th>등록일</th><td class="color-grey">{{ L.ymd(info.regdate) }}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 순위 -->
      <div v-else class="rank-area">
        <div class="seg-group" role="radiogroup" aria-label="순위 기준">
          <label v-for="(o, i) in scoreOptions" :key="i" class="seg" :class="{ on: scoretype === i + 1 }">
            <input type="radio" name="scoretype" :value="i + 1" v-model="scoretype" />{{ o }}
          </label>
        </div>
        <div class="table type03 mob-type02">
          <div class="table-head">
            <div class="table-head-col c-rank">순위</div>
            <div class="table-head-col c-nick">닉네임</div>
            <div class="table-head-col is-mob c-shop">매장</div>
            <div class="table-head-col is-mob c-course">코스</div>
            <div class="table-head-col is-mob c-score">{{ scoreOptions[scoretype - 1] }}</div>
            <div class="table-head-col is-mob c-cnt">참가 횟수</div>
          </div>
          <div class="table-body">
            <template v-if="rankRows.length">
              <div class="table-body-row is-move" v-for="(r, i) in rankRows" :key="i">
                <div class="table-body-flex">
                  <div class="table-body-col c-rank strong">{{ r.rank }}</div>
                  <div class="table-body-col c-nick" @click="toggleMob(i)">
                    <button type="button" class="link" @click.stop="player.open(r.playerno)">{{ r.nickname }}</button>
                    <button type="button" class="btn-arrow" :class="{ 'is-active': mobIndex === i }" :aria-label="mobIndex === i ? '상세 접기' : '상세 펼치기'" :aria-expanded="mobIndex === i"><img src="/images/icon/icon_arrow_down.png" alt="" /></button>
                  </div>
                  <div class="table-body-col is-mob c-shop">{{ r.shop }}</div>
                  <div class="table-body-col is-mob c-course">{{ r.course }}</div>
                  <div class="table-body-col is-mob c-score">{{ r.score }}</div>
                  <div class="table-body-col is-mob c-cnt">{{ r.playcnt }}</div>
                </div>
                <div class="table-body-mob" v-if="mobIndex === i">
                  <dl class="list"><dt class="tit">매장</dt><dd class="cnt">{{ r.shop }}</dd></dl>
                  <dl class="list"><dt class="tit">코스</dt><dd class="cnt">{{ r.course }}</dd></dl>
                  <dl class="list"><dt class="tit">{{ scoreOptions[scoretype - 1] }}</dt><dd class="cnt">{{ r.score }}</dd></dl>
                  <dl class="list"><dt class="tit">참가 횟수</dt><dd class="cnt">{{ r.playcnt }}</dd></dl>
                </div>
              </div>
            </template>
            <div class="table-body-row is-move" v-else>
              <div class="table-body-flex"><div class="no-data">{{ rankLoaded ? '아직 순위 기록이 없습니다.' : '' }}</div></div>
            </div>
          </div>
        </div>
        <ClientOnly>
          <VueAwesomePaginate v-if="rankTotal > 10" :items-per-page="10" :max-pages-shown="5" v-model="rankPage" :total-items="rankTotal" @click="loadRanking"
            pagination-container-class="pagination-container type02" paginate-buttons-class="paginate-buttons" active-page-class="active" back-button-class="paginate-buttons" next-button-class="paginate-buttons">
            <template #prev-button><img src="/images/icon/icon_prev.png" alt="이전 페이지" /></template>
            <template #next-button><img src="/images/icon/icon_next.png" alt="다음 페이지" /></template>
          </VueAwesomePaginate>
        </ClientOnly>
      </div>

      <div class="btn-wrap column-reverse">
        <nuxt-link :to="`/tournament/${kind}`" class="btn-md-line">목록 보기</nuxt-link>
        <nuxt-link :to="`/tournament/${kind}/edit/${tourPk}`" class="btn-md-fill btn-primary-purple">수정하기</nuxt-link>
      </div>
    </div>

    <modal-member-info :isOpen="player.isOpen.value" :item="player.item.value" @update:isOpen="player.isOpen.value = $event" />
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { useTournamentApi } from "~/api/tournament";
import { useCompetitionLabels } from "~/composables/useCompetitionLabels";
import { usePlayerInfoModal } from "~/composables/usePlayerInfoModal";

const props = defineProps({ kind: { type: String, default: "championship" } });
const isCompetition = computed(() => props.kind === "competition");
const route = useRoute();
const tourPk = Number(route.params.slug) || 0;
const api = useTournamentApi();
const L = useCompetitionLabels();
const player = usePlayerInfoModal();

const tabs = [{ key: "condition", name: "대회 조건" }, { key: "rank", name: "대회 순위" }];
const tab = ref(route.query.tab === "rank" ? "rank" : "condition");

const info = ref({});
const courses = ref([]);
const subcourseRaw = ref([]);
const prizerank = ref([]);
const prizeetc = ref("");
const shops = ref([]);
const loaded = ref(false);
const courseName = computed(() => courses.value?.[0]?.coursename || "-");
// 서브코스: aiadmin 은 subcourseselect*(seq = 1 Out / 2 In), aishop 은 subcourse*
const subcourses = computed(() => (subcourseRaw.value || []).map((s) => ({ seq: s.subcourseselectseq ?? s.subcourseseq ?? "", name: s.subcourseselectname ?? s.subcoursename ?? "-" })));
const shopText = computed(() => {
  const names = (shops.value || []).map((s) => s.shopname).filter(Boolean);
  if (names.length) return names.join(", ");
  return isCompetition.value ? "-" : "전체 매장";
});

const loadCondition = async () => {
  try {
    const d = (await api.condition(tourPk)) || {};
    info.value = d.tournamentinfo || {};
    courses.value = d.tournamentcourse || [];
    subcourseRaw.value = d.subcourselist || [];
    prizerank.value = d.tournamentprizerank || [];
    prizeetc.value = d.tournamentprizeetc?.etcprize || "";
    shops.value = d.tournamentshop || [];
  } catch (e) { console.error(e); } finally { loaded.value = true; }
};

const scoreOptions = ["스트로크", "스트로크(핸디캡)", "신페리오", "넷스코어"];
const scoretype = ref(1);
const rankList = ref([]);
const rankTotal = ref(0);
const rankPage = ref(1);
const rankLoaded = ref(false);
const val = (...vs) => { for (const v of vs) if (v !== null && v !== undefined && v !== "") return v; return null; };
const fmt = (v) => (v === null ? "-" : String(v));
const scoreOf = (ri, cs, basePar) => {
  switch (scoretype.value) {
    case 2: return fmt(val(cs.low_net, ri.low_net)); // 스트로크(핸디캡) = low_net (krshop ShopRank)
    case 3: return fmt(val(cs.newperioscore, ri.newperiolastscore));
    case 4: { // 넷스코어 = 평균 핸디캡 스코어 − 기준 타수 (krshop ShopRank)
      const a = Number(val(cs.avghandicapscore, ri.avghandicapscore)); const b = Number(basePar);
      if (!isNaN(a) && !isNaN(b) && b > 0) return String(Math.round((a - b) * 10) / 10);
      return fmt(val(ri.avgnetscore));
    }
    default: return fmt(val(cs.strokescore, ri.min_score, ri.strokelastscore));
  }
};
const rankRows = computed(() => rankList.value.map((row, i) => {
  const ri = row.tournamentrankinfo || {}; const cs = (row.coursescore || [])[0] || {}; const rank = Number(ri.rank);
  return { rank: rank > 0 ? rank : (rankPage.value - 1) * 10 + i + 1, playerno: ri.player_pk || ri.playerno, nickname: ri.nickname || ri.name || "-", shop: ri.shopinfo?.shopname || "-", course: cs.coursename || "-", score: scoreOf(ri, cs, row.base_par), playcnt: ri.playcnt ?? "-" };
}));
const loadRanking = async (p) => {
  if (typeof p === "number") rankPage.value = p;
  try {
    const d = (await api.ranking(tourPk, { scoretype: scoretype.value, pageno: rankPage.value })) || {};
    rankList.value = d.tournamentranklist || [];
    rankTotal.value = Number(d.tournamentranklistcnt || 0);
  } catch (e) { console.error(e); rankList.value = []; rankTotal.value = 0; } finally { rankLoaded.value = true; mobIndex.value = -1; }
};
watch(scoretype, () => { rankPage.value = 1; loadRanking(); });

const mobIndex = ref(-1);
const toggleMob = (i) => { if (window.innerWidth <= 768) mobIndex.value = mobIndex.value === i ? -1 : i; };

useHead({ title: computed(() => (info.value?.title ? `${info.value.title} - ${isCompetition.value ? "매장대회" : "챔피언십"}` : isCompetition.value ? "매장대회 상세" : "챔피언십 상세")) });
onMounted(() => { loadCondition(); loadRanking(); });
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/membership.scss';
@use '@/components/tournament/admin-common.scss';

.tab { margin: 0 0 20px; }
.rank-area { display: flex; flex-direction: column; gap: 14px; }
.c-nick { justify-content: center; gap: 6px; }
@media (min-width: 769px) {
  .table-head-col, .table-body-flex > .table-body-col { min-width: 0; }
  .c-rank { flex: 60 1 0; } .c-nick { flex: 160 1 0; } .c-shop { flex: 160 1 0; } .c-course { flex: 200 1 0; } .c-score { flex: 120 1 0; } .c-cnt { flex: 90 1 0; }
}
</style>
