<template>
  <!--
    2026-10-22: 이벤트관리 > 미니게임 상세(관리자) — 이벤트 정보 / 당첨자 / 순위(랭킹형만)
    · 화면 형식: 대회 상세·aiadmin 기존 상세와 같은 표(table type02), 당첨자·순위는 목록 표(table type03)
    · aishop event/mini-game(정보 팝업) + prize/[slug](당첨자) + rank/[slug](순위)를 한 화면 탭으로 묶음
  -->
  <div class="membership-member write mg-detail">
    <div class="write-wrap">
      <ul class="tab type01-b box" role="tablist">
        <li v-for="t in tabs" :key="t.key" class="tab-list" :class="{ 'is-active': tab === t.key }" role="tab" :aria-selected="tab === t.key" tabindex="0" @click="tab = t.key" @keyup.enter="tab = t.key">{{ t.name }}</li>
      </ul>

      <!-- 이벤트 정보 -->
      <div class="table-wrap" v-if="tab === 'info'">
        <div class="table type02">
          <table>
            <colgroup><col width="18%" /><col width="*" /></colgroup>
            <tbody>
              <tr><th>구분</th><td>
                <span class="badge kind">{{ L.awardType(info.type) }}</span>
                <span class="badge" :class="L.eventStatusClass(info.status)" v-if="L.eventStatus(info.status)">{{ L.eventStatus(info.status) }}</span>
              </td></tr>
              <tr><th>이벤트명</th><td class="strong">{{ info.title || (loaded ? '-' : '') }}</td></tr>
              <tr><th>매장</th><td>{{ info.shopname || (loaded ? '-' : '') }}</td></tr>
              <tr><th>기간</th><td><span class="u-date">{{ L.ymd(info.timezone_startdate) }}</span> ~ <span class="u-date">{{ L.ymd(info.timezone_enddate) }}</span></td></tr>
              <tr><th>참가 제한</th><td>{{ L.entryLimit(info.entrylimit) }}</td></tr>
              <tr v-if="info.message"><th>안내 문구</th><td class="pre">{{ info.message }}</td></tr>
              <tr v-if="info.successmessage"><th>달성 문구</th><td class="pre">{{ info.successmessage }}</td></tr>
              <tr><th>코스</th><td>
                <span class="pair"><em>코스</em>{{ info.coursename || '-' }}</span>
                <span class="pair"><em>서브코스</em>{{ info.subcoursename || '-' }}</span>
                <span class="pair"><em>홀</em>{{ info.hole_no ? `${info.hole_no}번 홀` : '-' }}</span>
              </td></tr>
              <tr v-if="distanceText"><th>{{ distanceLabel }}</th><td>{{ distanceText }}</td></tr>
              <tr><th>{{ isRank ? '순위별 상품' : '경품' }}</th><td>
                <template v-if="isRank">
                  <template v-if="prizerank.length"><span class="pair" v-for="(p, i) in prizerank" :key="i"><b>{{ p.rank_no }}위</b>{{ p.prize || '-' }}</span></template>
                  <template v-else>-</template>
                </template>
                <template v-else>{{ info.point || '-' }}</template>
              </td></tr>
              <tr><th>게임 조건</th><td>
                <span class="pair"><em>레벨</em>{{ L.level(info.level_fk) }}</span>
                <span class="pair"><em>그린 스피드</em>{{ L.greenSpeed(info.greenspeed_fk) }}</span>
                <span class="pair"><em>그린 경사</em>{{ L.greenGravity(info.greengravity_fk) }}</span>
              </td></tr>
              <tr><th>티박스</th><td>
                <template v-if="Number(info.isteebox) === 1">
                  <span class="pair"><em>남성</em>{{ L.tee(info.teeboxman) }}</span>
                  <span class="pair"><em>여성</em>{{ L.tee(info.teeboxwoman) }}</span>
                </template>
                <template v-else>지정 안 함</template>
              </td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 당첨자 -->
      <div v-else-if="tab === 'winner'" class="list-area">
        <div class="table type03 mob-type02">
          <div class="table-head">
            <div class="table-head-col c-no">No</div>
            <div class="table-head-col c-nick">닉네임</div>
            <div class="table-head-col is-mob c-shop">매장</div>
            <div class="table-head-col is-mob c-rec">기록</div>
            <div class="table-head-col is-mob c-prize">경품</div>
            <div class="table-head-col is-mob c-date">당첨일</div>
          </div>
          <div class="table-body">
            <template v-if="winners.length">
              <div class="table-body-row is-move" v-for="(w, i) in winners" :key="i">
                <div class="table-body-flex">
                  <div class="table-body-col c-no">{{ w.no }}</div>
                  <div class="table-body-col c-nick" @click="toggleMob(i)">
                    <button type="button" class="link" @click.stop="player.open(w.playerno)">{{ w.nickname || '-' }}</button>
                    <button type="button" class="btn-arrow" :class="{ 'is-active': mobIndex === i }" :aria-label="mobIndex === i ? '상세 접기' : '상세 펼치기'" :aria-expanded="mobIndex === i"><img src="/images/icon/icon_arrow_down.png" alt="" /></button>
                  </div>
                  <div class="table-body-col is-mob c-shop">{{ w.shopname || '-' }}</div>
                  <div class="table-body-col is-mob c-rec">{{ recordText(w.record) }}</div>
                  <div class="table-body-col is-mob c-prize">{{ w.point || '-' }}</div>
                  <div class="table-body-col is-mob c-date"><span class="u-date">{{ L.ymdhm(w.timezone_date) }}</span></div>
                </div>
                <div class="table-body-mob" v-if="mobIndex === i">
                  <dl class="list"><dt class="tit">매장</dt><dd class="cnt">{{ w.shopname || '-' }}</dd></dl>
                  <dl class="list"><dt class="tit">기록</dt><dd class="cnt">{{ recordText(w.record) }}</dd></dl>
                  <dl class="list"><dt class="tit">경품</dt><dd class="cnt">{{ w.point || '-' }}</dd></dl>
                  <dl class="list"><dt class="tit">당첨일</dt><dd class="cnt">{{ L.ymdhm(w.timezone_date) }}</dd></dl>
                </div>
              </div>
            </template>
            <div class="table-body-row is-move" v-else>
              <div class="table-body-flex"><div class="no-data">{{ winLoaded ? '아직 당첨자가 없습니다.' : '' }}</div></div>
            </div>
          </div>
        </div>
        <ClientOnly>
          <VueAwesomePaginate v-if="winTotal > 10" :items-per-page="10" :max-pages-shown="5" v-model="winPage" :total-items="winTotal" @click="loadWinners"
            pagination-container-class="pagination-container type02" paginate-buttons-class="paginate-buttons" active-page-class="active" back-button-class="paginate-buttons" next-button-class="paginate-buttons">
            <template #prev-button><img src="/images/icon/icon_prev.png" alt="이전 페이지" /></template>
            <template #next-button><img src="/images/icon/icon_next.png" alt="다음 페이지" /></template>
          </VueAwesomePaginate>
        </ClientOnly>
      </div>

      <!-- 순위(랭킹형) -->
      <div v-else class="list-area">
        <div class="table type03 mob-type02">
          <div class="table-head">
            <div class="table-head-col c-no">순위</div>
            <div class="table-head-col c-nick">닉네임</div>
            <div class="table-head-col is-mob c-shop">매장</div>
            <div class="table-head-col is-mob c-rec">{{ isLongest ? '비거리' : '남은 거리' }}</div>
            <div class="table-head-col is-mob c-date">참가 횟수</div>
            <div class="table-head-col is-mob c-prize">시상</div>
          </div>
          <div class="table-body">
            <template v-if="ranks.length">
              <div class="table-body-row is-move" v-for="(r, i) in ranks" :key="i">
                <div class="table-body-flex">
                  <div class="table-body-col c-no strong">{{ r.rank || '-' }}</div>
                  <div class="table-body-col c-nick" @click="toggleMob(i)">
                    <button type="button" class="link" @click.stop="player.open(r.player_pk || r.playerno)">{{ r.nickname || '-' }}</button>
                    <button type="button" class="btn-arrow" :class="{ 'is-active': mobIndex === i }" :aria-label="mobIndex === i ? '상세 접기' : '상세 펼치기'" :aria-expanded="mobIndex === i"><img src="/images/icon/icon_arrow_down.png" alt="" /></button>
                  </div>
                  <div class="table-body-col is-mob c-shop">{{ r.shopname || '-' }}</div>
                  <div class="table-body-col is-mob c-rec">{{ recordText(isLongest ? r.longest : r.nearpin) }}</div>
                  <div class="table-body-col is-mob c-date">{{ r.entrycnt ?? '-' }}</div>
                  <div class="table-body-col is-mob c-prize">{{ prizeOfRank(r.rank) }}</div>
                </div>
                <div class="table-body-mob" v-if="mobIndex === i">
                  <dl class="list"><dt class="tit">매장</dt><dd class="cnt">{{ r.shopname || '-' }}</dd></dl>
                  <dl class="list"><dt class="tit">{{ isLongest ? '비거리' : '남은 거리' }}</dt><dd class="cnt">{{ recordText(isLongest ? r.longest : r.nearpin) }}</dd></dl>
                  <dl class="list"><dt class="tit">참가 횟수</dt><dd class="cnt">{{ r.entrycnt ?? '-' }}</dd></dl>
                  <dl class="list"><dt class="tit">시상</dt><dd class="cnt">{{ prizeOfRank(r.rank) }}</dd></dl>
                </div>
              </div>
            </template>
            <div class="table-body-row is-move" v-else>
              <div class="table-body-flex"><div class="no-data">{{ rankLoaded ? '아직 순위 기록이 없습니다.' : '' }}</div></div>
            </div>
          </div>
        </div>
      </div>

      <div class="btn-wrap column-reverse">
        <nuxt-link to="/event/mini-game" class="btn-md-line">목록 보기</nuxt-link>
        <nuxt-link :to="`/event/mini-game/edit/${eventNo}`" class="btn-md-fill btn-primary-purple">수정하기</nuxt-link>
      </div>
    </div>

    <modal-member-info :isOpen="player.isOpen.value" :item="player.item.value" @update:isOpen="player.isOpen.value = $event" />
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { useEventApi } from "~/api/event";
import { useCompetitionLabels } from "~/composables/useCompetitionLabels";
import { usePlayerInfoModal } from "~/composables/usePlayerInfoModal";

const route = useRoute();
const eventNo = Number(route.params.slug) || 0;
const api = useEventApi();
const L = useCompetitionLabels();
const player = usePlayerInfoModal();

const info = ref({});
const prizerank = ref([]);
const loaded = ref(false);

const isRank = computed(() => L.isRankAward(info.value.type));
const isLongest = computed(() => [9, 11].includes(Number(info.value.type)));
const tabs = computed(() => [
  { key: "info", name: "이벤트 정보" },
  { key: "winner", name: "당첨자" },
  ...(isRank.value ? [{ key: "rank", name: "순위" }] : []),
]);
const tab = ref(["winner", "rank"].includes(route.query.tab) ? route.query.tab : "info");
watch(tab, () => { mobIndex.value = -1; });

// 기준 거리: 롱기스트 = 최소 비거리, 니어핀 = 핀까지 남은 거리 기준
const distanceLabel = computed(() => (isLongest.value ? "기준 비거리" : "기준 거리"));
const distanceText = computed(() => {
  const d = Number(info.value.distance);
  if (![9, 10, 11, 12].includes(Number(info.value.type)) || !d) return "";
  return isLongest.value ? `${d}m 이상` : `${d}m 이내`;
});
const recordText = (v) => (v === null || v === undefined || v === "" || Number(v) === 0 ? "-" : `${Math.round(Number(v) * 10) / 10}m`);
const prizeOfRank = (rank) => prizerank.value.find((p) => Number(p.rank_no) === Number(rank))?.prize || "-";

const loadView = async () => {
  try {
    const d = (await api.view(eventNo)) || {};
    info.value = d.eventinfo || {};
    prizerank.value = d.awardprizerank || [];
  } catch (e) {
    console.error(e);
  } finally {
    loaded.value = true;
  }
};

const winners = ref([]);
const winTotal = ref(0);
const winPage = ref(1);
const winLoaded = ref(false);
const loadWinners = async (p) => {
  if (typeof p === "number") winPage.value = p;
  try {
    const d = (await api.winningList(eventNo, { pageno: winPage.value })) || {};
    winners.value = d.eventwvinninglist || [];
    winTotal.value = Number(d.eventwvinninglistcnt || 0);
  } catch (e) {
    console.error(e);
    winners.value = [];
  } finally {
    winLoaded.value = true;
    mobIndex.value = -1;
  }
};

const ranks = ref([]);
const rankLoaded = ref(false);
const loadRanks = async () => {
  try {
    const d = (await api.winningRankList(eventNo)) || {};
    ranks.value = (d.eventwinningranklist || []).map((x) => x.eventwinningrankinfo || {});
  } catch (e) {
    console.error(e);
    ranks.value = [];
  } finally {
    rankLoaded.value = true;
  }
};

const mobIndex = ref(-1);
const toggleMob = (i) => { if (window.innerWidth <= 768) mobIndex.value = mobIndex.value === i ? -1 : i; };

useHead({ title: computed(() => (info.value?.title ? `${info.value.title} - 미니게임` : "미니게임 상세")) });

onMounted(async () => {
  await loadView();
  loadWinners();
  if (isRank.value) loadRanks();
  else if (tab.value === "rank") tab.value = "winner";
});

definePageMeta({ layout: "default" });
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/membership.scss';
@use '@/components/tournament/admin-common.scss';

.tab { margin: 0 0 20px; }
.list-area { display: flex; flex-direction: column; gap: 14px; }
.c-nick { justify-content: center; gap: 6px; }
.c-prize { word-break: keep-all; }
@media (min-width: 769px) {
  .table-head-col, .table-body-flex > .table-body-col { min-width: 0; }
  .c-no { flex: 60 1 0; } .c-nick { flex: 160 1 0; } .c-shop { flex: 160 1 0; } .c-rec { flex: 100 1 0; } .c-prize { flex: 200 1 0; } .c-date { flex: 150 1 0; }
}
</style>
