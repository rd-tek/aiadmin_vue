<template>
  <!--
    2026-10-22: 대회관리 목록(관리자) — 챔피언십(kind=championship, 본사 대회·전체 매장) / 매장대회(kind=competition, 전체 매장의 매장 대회)
    aishop tournament/championship·competition 목록을 바탕으로 aiadmin 목록 형식(검색 상자 + 표 + 페이지 번호)에 맞춤
  -->
  <div class="membership-member tournament-list">
    <div class="filter-box">
      <div class="col-2">
        <div class="col d-flex">
          <div class="select-default">
            <select aria-label="진행 상태 선택" v-model="form.status" @change="search">
              <option value="">전체 상태</option>
              <option value="1">예정</option>
              <option value="2">진행중</option>
              <option value="3">완료</option>
              <option value="4">취소</option>
            </select>
          </div>
          <div class="d-flex date-range">
            <ClientOnly>
              <VueDatePicker v-model="startDate" :format="L.pickerFormat" :enable-time-picker="false" auto-apply placeholder="시작일" aria-label="기간 시작일" />
            </ClientOnly>
            <span class="wave">~</span>
            <ClientOnly>
              <VueDatePicker v-model="endDate" :format="L.pickerFormat" :enable-time-picker="false" auto-apply placeholder="종료일" aria-label="기간 종료일" />
            </ClientOnly>
          </div>
        </div>
        <div class="col d-flex">
          <div class="d-flex">
            <select aria-label="검색 구분 선택" v-model="form.searchtype">
              <option value="1">대회명</option>
              <option value="2">코스</option>
            </select>
            <input aria-label="검색어 입력" type="text" v-model="form.searchname" placeholder="검색어 입력" @keyup.enter="search" />
          </div>
          <button type="button" class="btn" @click="search">검색</button>
        </div>
      </div>
    </div>

    <div class="top-area">
      <div class="total">전체 <span class="num">{{ total }}</span></div>
    </div>

    <div class="table type03 mob-type02">
      <div class="table-head">
        <div class="table-head-col col-1 align-left c-no">No</div>
        <div class="table-head-col c-title">대회명</div>
        <div class="table-head-col is-mob c-shop" v-if="isCompetition">매장</div>
        <div class="table-head-col is-mob c-course">코스</div>
        <div class="table-head-col is-mob c-period">기간</div>
        <div class="table-head-col is-mob c-limit">참가 제한</div>
        <div class="table-head-col is-mob c-reg">등록일</div>
        <div class="table-head-col is-mob c-rank">순위</div>
      </div>
      <div class="table-body">
        <template v-if="rows.length">
          <div class="table-body-row is-move" v-for="(row, i) in rows" :key="row.no">
            <div class="table-body-flex">
              <div class="table-body-col col-1 align-left c-no">{{ row.no }}</div>
              <div class="table-body-col title-col c-title" @click="toggleMob(i)">
                <div class="title-wrap">
                  <span class="badges">
                    <span class="badge" v-if="L.tourType(row.info.tourtype_fk || row.info.type)">{{ L.tourType(row.info.tourtype_fk || row.info.type) }}</span>
                    <span class="badge" :class="L.tourStatusClass(row.info.status)" v-if="L.tourStatus(row.info.status)">{{ L.tourStatus(row.info.status) }}</span>
                  </span>
                  <nuxt-link :to="detailPath(row)" class="color-purple link text-underline title-link" @click.stop>{{ row.info.title || '-' }}</nuxt-link>
                </div>
                <button type="button" class="btn-arrow" :class="{ 'is-active': mobIndex === i }" :aria-label="mobIndex === i ? '상세 접기' : '상세 펼치기'" :aria-expanded="mobIndex === i">
                  <img src="/images/icon/icon_arrow_down.png" alt="" />
                </button>
              </div>
              <div class="table-body-col is-mob c-shop" v-if="isCompetition">{{ row.shop }}</div>
              <div class="table-body-col is-mob c-course">{{ row.course }}</div>
              <div class="table-body-col is-mob c-period"><span class="u-date">{{ L.ymd(row.info.timezone_startdate) }}</span> ~ <span class="u-date">{{ L.ymd(row.info.timezone_enddate) }}</span></div>
              <div class="table-body-col is-mob c-limit">{{ L.entryLimit(row.info.entrylimit) }}</div>
              <div class="table-body-col is-mob c-reg"><span class="color-grey u-date">{{ L.ymd(row.info.timezone_regdate) }}</span></div>
              <div class="table-body-col is-mob c-rank">
                <nuxt-link :to="detailPath(row, 'rank')" class="btn-sm-line">순위</nuxt-link>
              </div>
            </div>
            <transition @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
              <div class="table-body-mob" v-if="mobIndex === i">
                <dl class="list" v-if="isCompetition"><dt class="tit">매장</dt><dd class="cnt">{{ row.shop }}</dd></dl>
                <dl class="list"><dt class="tit">코스</dt><dd class="cnt">{{ row.course }}</dd></dl>
                <dl class="list"><dt class="tit">기간</dt><dd class="cnt">{{ L.ymd(row.info.timezone_startdate) }} ~ {{ L.ymd(row.info.timezone_enddate) }}</dd></dl>
                <dl class="list"><dt class="tit">참가 제한</dt><dd class="cnt">{{ L.entryLimit(row.info.entrylimit) }}</dd></dl>
                <dl class="list"><dt class="tit">등록일</dt><dd class="cnt">{{ L.ymd(row.info.timezone_regdate) }}</dd></dl>
                <dl class="list"><dt class="tit">순위</dt><dd class="cnt"><nuxt-link :to="detailPath(row, 'rank')" class="btn-sm-line">순위 보기</nuxt-link></dd></dl>
              </div>
            </transition>
          </div>
        </template>
        <div class="table-body-row is-move" v-else>
          <div class="table-body-flex">
            <div class="no-data">{{ loaded ? '조건에 맞는 대회가 없습니다.' : '' }}</div>
          </div>
        </div>
      </div>
      <div class="btn-wrap">
        <ClientOnly>
          <VueAwesomePaginate
            v-if="total > pageSize"
            :items-per-page="pageSize"
            :max-pages-shown="5"
            v-model="form.pageno"
            :total-items="total"
            @click="onPage"
            pagination-container-class="pagination-container type02"
            paginate-buttons-class="paginate-buttons"
            active-page-class="active"
            back-button-class="paginate-buttons"
            next-button-class="paginate-buttons">
            <template #prev-button><img src="/images/icon/icon_prev.png" alt="이전 페이지" /></template>
            <template #next-button><img src="/images/icon/icon_next.png" alt="다음 페이지" /></template>
          </VueAwesomePaginate>
        </ClientOnly>
        <div class="btn-group">
          <nuxt-link :to="`/tournament/${kind}/edit/0`" class="btn-primary-purple btn-md-fill">대회 등록</nuxt-link><!-- 2026-10-22: 매장대회도 관리자 등록 가능(매장 선택) -->
        </div>
      </div>
    </div>

    <toast-warn-modal :isOpen="warnOpen" :toastWarnMessage="warnMessage" @update:isOpen="warnOpen = $event" />
  </div>
</template>
<script setup>
import { useTournamentApi } from "~/api/tournament";
import { useCompetitionLabels } from "~/composables/useCompetitionLabels";
import toastWarnModal from "@/components/toast-ui/toast-warn-modal.vue"; // toast-ui 폴더는 자동 등록 안 됨(다른 화면도 직접 import)

const props = defineProps({
  kind: { type: String, default: "championship" }, // championship | competition
});
const isCompetition = computed(() => props.kind === "competition");
const api = useTournamentApi();
const L = useCompetitionLabels();

const pageSize = 10; // 백엔드 고정 10
const form = reactive({ status: "", searchtype: "1", searchname: "", pageno: 1 });
const startDate = ref(null);
const endDate = ref(null);
const list = ref([]);
const total = ref(0);
const loaded = ref(false);
const warnOpen = ref(false);
const warnMessage = ref("");

const rows = computed(() =>
  list.value.map((it) => ({
    no: it.no,
    info: it.tournamentinfo || {},
    course: it.tournamentcourse?.[0]?.coursename || it.tournamentinfo?.coursename || "-",
    // 매장대회 = 등록 매장(tt_tourowner). 매장 정보가 없으면 '-'
    shop: (it.tournamentshop || []).map((s) => s.shopname).filter(Boolean).join(", ") || "-",
  }))
);

const detailPath = (row, tab) => {
  const base = `/tournament/${props.kind}/${row.info.tournamentno}`;
  return tab === "rank" ? { path: base, query: { tab: "rank" } } : base;
};

const load = async () => {
  try {
    const p = { ...form, startdate: L.apiDate(startDate.value), enddate: L.apiDate(endDate.value) };
    const res = isCompetition.value ? await api.competitionList(p) : await api.championshipList(p);
    list.value = res?.tournamentlist || [];
    total.value = Number(res?.tournamentlistcnt || 0);
  } catch (e) {
    console.error(e);
    list.value = [];
    total.value = 0;
  } finally {
    loaded.value = true;
    mobIndex.value = -1;
  }
};

const search = async () => {
  if (startDate.value && endDate.value && startDate.value > endDate.value) {
    warnMessage.value = "시작일은 종료일보다 이전이어야 합니다.";
    warnOpen.value = true;
    return;
  }
  if ((startDate.value && !endDate.value) || (!startDate.value && endDate.value)) {
    warnMessage.value = "기간은 시작일과 종료일을 모두 선택해 주세요.";
    warnOpen.value = true;
    return;
  }
  form.pageno = 1;
  await load();
};
watch([startDate, endDate], ([s, e]) => {
  if ((s && e && s <= e) || (!s && !e)) search();
});
const onPage = async (p) => {
  form.pageno = p;
  await load();
};

// 모바일 행 펼침(768 이하)
const mobIndex = ref(-1);
const toggleMob = (i) => {
  if (window.innerWidth <= 768) mobIndex.value = mobIndex.value === i ? -1 : i;
};
const beforeEnter = (el) => { el.style.height = "0"; };
const enter = (el) => { el.style.transition = "all .4s ease"; el.style.height = el.scrollHeight + "px"; };
const beforeLeave = (el) => { el.style.height = el.scrollHeight + "px"; };
const leave = (el) => { el.style.transition = "all .4s ease"; el.style.height = "0"; };

onMounted(load);
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/membership.scss';

.date-range {
  align-items: center;
  gap: 6px;
  .wave { color: #72777A; }
  :deep(.dp__main) { width: 150px; }
}
.title-col {
  justify-content: flex-start;
  text-align: left;
}
.title-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  min-width: 0;
}
.badges { display: flex; gap: 4px; flex-wrap: wrap; }
.badge {
  display: inline-block;
  padding: 1px 6px;
  border-radius: 4px;
  border: 1px solid #E5E7E8;
  font-size: 12px;
  line-height: 1.5;
  color: #35383B;
  background: #fff;
  &.color-green { color: #00702F; border-color: #b9e3c8; background: #f0faf3; }
  &.color-red { color: #D81E3C; border-color: #f5c2cb; background: #fff4f6; }
  &.color-grey { color: #6e6e6e; }
}
.title-link {
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.btn-group { display: flex; justify-content: flex-end; }
/* 순위 버튼: 좁은 폭(1024)에서 칸을 넘지 않게 */
.c-rank .btn-sm-line, .table-body-mob .btn-sm-line { min-width: 0; width: auto; padding: 0 12px; white-space: nowrap; }

/* 열 비율(데스크톱) — 열 이름 기준(매장대회는 매장 열이 하나 더 있음) */
@media (min-width: 769px) {
  .table-head-col, .table-body-flex > .table-body-col { min-width: 0; }
  .c-no { flex: 50 1 0; }
  .c-title { flex: 320 1 0; }
  .c-shop { flex: 130 1 0; }
  .c-course { flex: 160 1 0; }
  .c-period { flex: 200 1 0; }
  .c-limit { flex: 90 1 0; }
  .c-reg { flex: 100 1 0; }
  .c-rank { flex: 80 1 0; }
}
@media (max-width: 768px) {
  /* 모바일: 상태 선택 한 줄, 기간(시작~종료) 한 줄에 나란히 */
  .filter-box .col-2 .col:first-child { flex-wrap: wrap; }
  .filter-box .col-2 .col .date-range {
    flex: 1 1 100% !important;
    width: 100%;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    align-items: center;
    gap: 6px;
    .wave { flex: 0 0 auto !important; width: auto !important; }
    :deep(.dp__main) { flex: 1 1 0 !important; width: calc(50% - 12px) !important; min-width: 0; }
    :deep(.dp__input) { width: 100%; }
  }
}
</style>
