<template>
  <!--
    2026-10-22: 이벤트관리 > 미니게임 당첨자(관리자, 전체 매장의 당첨 기록) — aishop event/winner 를 바탕으로 aiadmin 목록 형식에 맞춤
    매장 = 기록이 달성된 매장(ta_awardrecord.owner_fk), 당첨일 기간 검색
  -->
  <div class="membership-member winner-list">
    <div class="filter-box">
      <div class="col-2">
        <div class="col d-flex">
          <div class="select-default">
            <select aria-label="미니게임 종류 선택" v-model="form.type" @change="search">
              <option value="">전체 종류</option>
              <option v-for="t in typeOptions" :key="t" :value="t">{{ L.awardType(t) }}</option>
            </select>
          </div>
          <div class="d-flex date-range">
            <ClientOnly>
              <VueDatePicker v-model="startDate" :format="L.pickerFormat" :enable-time-picker="false" auto-apply placeholder="당첨일 시작" aria-label="당첨일 시작" />
            </ClientOnly>
            <span class="wave">~</span>
            <ClientOnly>
              <VueDatePicker v-model="endDate" :format="L.pickerFormat" :enable-time-picker="false" auto-apply placeholder="당첨일 종료" aria-label="당첨일 종료" />
            </ClientOnly>
          </div>
        </div>
        <div class="col d-flex">
          <div class="d-flex">
            <select aria-label="검색 구분 선택" v-model="form.searchtype">
              <option value="1">이벤트명</option>
              <option value="2">매장</option>
              <option value="3">코스</option>
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
        <div class="table-head-col c-title">이벤트</div>
        <div class="table-head-col is-mob c-nick">닉네임</div>
        <div class="table-head-col is-mob c-shop">매장</div>
        <div class="table-head-col is-mob c-course">코스 · 홀</div>
        <div class="table-head-col is-mob c-rec">기록</div>
        <div class="table-head-col is-mob c-prize">경품</div>
        <div class="table-head-col is-mob c-date">당첨일</div>
      </div>
      <div class="table-body">
        <template v-if="rows.length">
          <div class="table-body-row is-move" v-for="(r, i) in rows" :key="r.key">
            <div class="table-body-flex">
              <div class="table-body-col col-1 align-left c-no">{{ r.no }}</div>
              <div class="table-body-col title-col c-title" @click="toggleMob(i)">
                <div class="title-wrap">
                  <span class="badges"><span class="badge">{{ L.awardType(r.type) }}</span></span>
                  <span class="title-text">{{ r.title || '-' }}</span>
                </div>
                <button type="button" class="btn-arrow" :class="{ 'is-active': mobIndex === i }" :aria-label="mobIndex === i ? '상세 접기' : '상세 펼치기'" :aria-expanded="mobIndex === i">
                  <img src="/images/icon/icon_arrow_down.png" alt="" />
                </button>
              </div>
              <div class="table-body-col is-mob c-nick"><button type="button" class="link" @click.stop="player.open(r.playerno)">{{ r.nickname || '-' }}</button></div>
              <div class="table-body-col is-mob c-shop">{{ r.shop }}</div>
              <div class="table-body-col is-mob c-course">{{ r.course }}</div>
              <div class="table-body-col is-mob c-rec">{{ r.record }}</div>
              <div class="table-body-col is-mob c-prize"><span class="prize">{{ r.prize }}</span></div>
              <div class="table-body-col is-mob c-date"><span class="color-grey u-date">{{ r.date }}</span></div>
            </div>
            <transition @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
              <div class="table-body-mob" v-if="mobIndex === i">
                <dl class="list"><dt class="tit">닉네임</dt><dd class="cnt"><button type="button" class="link" @click.stop="player.open(r.playerno)">{{ r.nickname || '-' }}</button></dd></dl>
                <dl class="list"><dt class="tit">매장</dt><dd class="cnt">{{ r.shop }}</dd></dl>
                <dl class="list"><dt class="tit">코스 · 홀</dt><dd class="cnt">{{ r.course }}</dd></dl>
                <dl class="list"><dt class="tit">기록</dt><dd class="cnt">{{ r.record }}</dd></dl>
                <dl class="list"><dt class="tit">경품</dt><dd class="cnt">{{ r.prize }}</dd></dl>
                <dl class="list"><dt class="tit">당첨일</dt><dd class="cnt">{{ r.date }}</dd></dl>
              </div>
            </transition>
          </div>
        </template>
        <div class="table-body-row is-move" v-else>
          <div class="table-body-flex">
            <div class="no-data">{{ loaded ? '조건에 맞는 당첨 기록이 없습니다.' : '' }}</div>
          </div>
        </div>
      </div>
      <div class="btn-wrap">
        <ClientOnly>
          <VueAwesomePaginate v-if="total > pageSize" :items-per-page="pageSize" :max-pages-shown="5" v-model="form.pageno" :total-items="total" @click="onPage"
            pagination-container-class="pagination-container type02" paginate-buttons-class="paginate-buttons" active-page-class="active" back-button-class="paginate-buttons" next-button-class="paginate-buttons">
            <template #prev-button><img src="/images/icon/icon_prev.png" alt="이전 페이지" /></template>
            <template #next-button><img src="/images/icon/icon_next.png" alt="다음 페이지" /></template>
          </VueAwesomePaginate>
        </ClientOnly>
      </div>
    </div>

    <modal-member-info :isOpen="player.isOpen.value" :item="player.item.value" @update:isOpen="player.isOpen.value = $event" />
    <toast-warn-modal :isOpen="warnOpen" :toastWarnMessage="warnMessage" @update:isOpen="warnOpen = $event" />
  </div>
</template>
<script setup>
import { useEventApi } from "~/api/event";
import { useCompetitionLabels } from "~/composables/useCompetitionLabels";
import { usePlayerInfoModal } from "~/composables/usePlayerInfoModal";
import toastWarnModal from "@/components/toast-ui/toast-warn-modal.vue";

const api = useEventApi();
const L = useCompetitionLabels();
const player = usePlayerInfoModal();
const typeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const pageSize = 10;
const form = reactive({ type: "", searchtype: "1", searchname: "", pageno: 1 });
const startDate = ref(null);
const endDate = ref(null);
const list = ref([]);
const total = ref(0);
const loaded = ref(false);
const warnOpen = ref(false);
const warnMessage = ref("");

// 기록: 롱기스트·니어핀 계열은 m, 그 외(홀인원·이글 등)는 달성 표시
const recordText = (type, v) => {
  const t = Number(type);
  if ([9, 10, 11, 12].includes(t)) return v === null || v === undefined || v === "" || Number(v) === 0 ? "-" : `${Math.round(Number(v) * 10) / 10}m`;
  return "달성";
};
const rows = computed(() =>
  list.value.map((w, i) => ({
    key: w.eventwinningno || i,
    no: w.no,
    type: w.type,
    title: w.title,
    playerno: w.playerno,
    nickname: w.nickname,
    shop: w.shopname || "-",
    course: [w.coursename, w.hole ? `${w.hole}번 홀` : ""].filter(Boolean).join(" · ") || "-",
    record: recordText(w.type, w.record),
    prize: w.point || "-",
    date: L.ymdhm(w.timezone_date),
  }))
);

const load = async () => {
  try {
    const res = await api.allWinningList({ ...form, startdate: L.apiDate(startDate.value), enddate: L.apiDate(endDate.value) });
    list.value = res?.eventwvinninglist || [];
    total.value = Number(res?.eventwvinninglistcnt || 0);
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
  form.pageno = 1;
  await load();
};
watch([startDate, endDate], ([s, e]) => { if (!(s && e && s > e)) search(); });
const onPage = async (p) => { form.pageno = p; await load(); };

const mobIndex = ref(-1);
const toggleMob = (i) => { if (window.innerWidth <= 768) mobIndex.value = mobIndex.value === i ? -1 : i; };
const beforeEnter = (el) => { el.style.height = "0"; };
const enter = (el) => { el.style.transition = "all .4s ease"; el.style.height = el.scrollHeight + "px"; };
const beforeLeave = (el) => { el.style.height = el.scrollHeight + "px"; };
const leave = (el) => { el.style.transition = "all .4s ease"; el.style.height = "0"; };

onMounted(load);

definePageMeta({ layout: "default" });
useHead({ htmlAttrs: { lang: "ko" }, title: "미니게임 당첨자", meta: [{ name: "description", content: "미니게임 당첨자 페이지 입니다." }] });
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/membership.scss';

.date-range { align-items: center; gap: 6px; .wave { color: #72777A; } :deep(.dp__main) { width: 150px; } }
.title-col { justify-content: flex-start; text-align: left; }
.title-wrap { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; min-width: 0; }
.title-text { display: block; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.badges { display: flex; gap: 4px; flex-wrap: wrap; }
.badge { display: inline-block; padding: 1px 6px; border-radius: 4px; border: 1px solid #E5E7E8; font-size: 12px; line-height: 1.5; color: #35383B; background: #fff; }
.c-course { word-break: keep-all; } /* "1번 홀" 이 "1번/홀" 로 갈리지 않게 */
.prize { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; word-break: keep-all; }
.link { background: none; border: 0; padding: 0; cursor: pointer; font: inherit; color: #4318FF; text-decoration: underline; text-underline-offset: 2px; }

@media (min-width: 769px) {
  .table-head-col, .table-body-flex > .table-body-col { min-width: 0; }
  .c-no { flex: 50 1 0; }
  .c-title { flex: 260 1 0; }
  .c-nick { flex: 110 1 0; }
  .c-shop { flex: 120 1 0; }
  .c-course { flex: 150 1 0; }
  .c-rec { flex: 70 1 0; }
  .c-prize { flex: 150 1 0; }
  .c-date { flex: 130 1 0; }
}
@media (max-width: 768px) {
  .filter-box .col-2 .col:first-child { flex-wrap: wrap; }
  .filter-box .col-2 .col .date-range {
    flex: 1 1 100% !important; width: 100%; flex-direction: row !important; flex-wrap: nowrap !important; align-items: center; gap: 6px;
    .wave { flex: 0 0 auto !important; width: auto !important; }
    :deep(.dp__main) { flex: 1 1 0 !important; width: calc(50% - 12px) !important; min-width: 0; }
    :deep(.dp__input) { width: 100%; }
  }
}
</style>
