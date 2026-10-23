<template>
  <!--
    2026-10-22: 이벤트관리 > 미니게임(관리자, 전체 매장) — aishop event/mini-game 을 바탕으로 aiadmin 목록 형식에 맞춤
    만든 매장(0 = 전체 매장 배포), 종류·상태 배지, 시상, 당첨자·순위 바로가기
  -->
  <div class="membership-member minigame-list">
    <div class="filter-box">
      <div class="col-2">
        <div class="col d-flex">
          <div class="select-default">
            <select aria-label="진행 상태 선택" v-model="form.status_cd" @change="search">
              <option value="">전체 상태</option>
              <option value="0">대기</option>
              <option value="1">진행중</option>
              <option value="2">완료</option>
              <option value="3">취소</option>
            </select>
          </div>
          <div class="select-default">
            <select aria-label="미니게임 종류 선택" v-model="form.type" @change="search">
              <option value="">전체 종류</option>
              <option v-for="t in typeOptions" :key="t" :value="t">{{ L.awardType(t) }}</option>
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
              <option value="1">이벤트명</option>
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
        <div class="table-head-col c-title">이벤트명</div>
        <div class="table-head-col is-mob c-shop">만든 매장</div>
        <div class="table-head-col is-mob c-course">코스 · 홀</div>
        <div class="table-head-col is-mob c-period">기간</div>
        <div class="table-head-col is-mob c-prize">시상</div>
        <div class="table-head-col is-mob c-act">결과</div>
      </div>
      <div class="table-body">
        <template v-if="rows.length">
          <div class="table-body-row is-move" v-for="(r, i) in rows" :key="r.eventno">
            <div class="table-body-flex">
              <div class="table-body-col col-1 align-left c-no">{{ r.no }}</div>
              <div class="table-body-col title-col c-title" @click="toggleMob(i)">
                <div class="title-wrap">
                  <span class="badges">
                    <span class="badge">{{ L.awardType(r.type) }}</span>
                    <span class="badge" :class="L.eventStatusClass(r.status)" v-if="L.eventStatus(r.status)">{{ L.eventStatus(r.status) }}</span>
                  </span>
                  <nuxt-link :to="`/event/mini-game/${r.eventno}`" class="color-purple link text-underline title-link" @click.stop>{{ r.title || '-' }}</nuxt-link>
                </div>
                <button type="button" class="btn-arrow" :class="{ 'is-active': mobIndex === i }" :aria-label="mobIndex === i ? '상세 접기' : '상세 펼치기'" :aria-expanded="mobIndex === i">
                  <img src="/images/icon/icon_arrow_down.png" alt="" />
                </button>
              </div>
              <div class="table-body-col is-mob c-shop">{{ r.shop }}</div>
              <div class="table-body-col is-mob c-course">{{ r.course }}</div>
              <div class="table-body-col is-mob c-period"><span class="u-date">{{ L.ymd(r.start) }}</span> ~ <span class="u-date">{{ L.ymd(r.end) }}</span></div>
              <div class="table-body-col is-mob c-prize"><span class="prize">{{ r.prize }}</span></div>
              <div class="table-body-col is-mob c-act">
                <nuxt-link :to="{ path: `/event/mini-game/${r.eventno}`, query: { tab: r.rankType ? 'rank' : 'winner' } }" class="btn-sm-line">{{ r.rankType ? '순위' : '당첨자' }}</nuxt-link>
              </div>
            </div>
            <transition @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
              <div class="table-body-mob" v-if="mobIndex === i">
                <dl class="list"><dt class="tit">만든 매장</dt><dd class="cnt">{{ r.shop }}</dd></dl>
                <dl class="list"><dt class="tit">코스 · 홀</dt><dd class="cnt">{{ r.course }}</dd></dl>
                <dl class="list"><dt class="tit">기간</dt><dd class="cnt">{{ L.ymd(r.start) }} ~ {{ L.ymd(r.end) }}</dd></dl>
                <dl class="list"><dt class="tit">시상</dt><dd class="cnt">{{ r.prize }}</dd></dl>
                <dl class="list"><dt class="tit">결과</dt><dd class="cnt"><nuxt-link :to="{ path: `/event/mini-game/${r.eventno}`, query: { tab: r.rankType ? 'rank' : 'winner' } }" class="btn-sm-line">{{ r.rankType ? '순위 보기' : '당첨자 보기' }}</nuxt-link></dd></dl>
              </div>
            </transition>
          </div>
        </template>
        <div class="table-body-row is-move" v-else>
          <div class="table-body-flex">
            <div class="no-data">{{ loaded ? '조건에 맞는 미니게임이 없습니다.' : '' }}</div>
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
          <nuxt-link to="/event/mini-game/edit/0" class="btn-primary-purple btn-md-fill">미니게임 등록</nuxt-link><!-- 2026-10-22: 관리자 등록(매장 선택, 0 = 전체 매장) -->
        </div>
      </div>
    </div>

    <toast-warn-modal :isOpen="warnOpen" :toastWarnMessage="warnMessage" @update:isOpen="warnOpen = $event" />
  </div>
</template>
<script setup>
import { useEventApi } from "~/api/event";
import { useCompetitionLabels } from "~/composables/useCompetitionLabels";
import toastWarnModal from "@/components/toast-ui/toast-warn-modal.vue";

const api = useEventApi();
const L = useCompetitionLabels();
const typeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const pageSize = 10;
const form = reactive({ status_cd: "", type: "", searchtype: "1", searchname: "", pageno: 1 });
const startDate = ref(null);
const endDate = ref(null);
const list = ref([]);
const total = ref(0);
const loaded = ref(false);
const warnOpen = ref(false);
const warnMessage = ref("");

const rows = computed(() =>
  list.value.map((it) => {
    const rankType = L.isRankAward(it.type);
    const ranks = (it.awardprizerank || []).map((p) => `${p.rank_no}위 ${p.prize}`);
    return {
      no: it.no,
      eventno: it.eventno,
      type: it.type,
      status: it.status,
      title: it.title,
      // 만든 매장: owner 0 = 전체 매장 배포
      shop: Number(it.owner_fk) === 0 ? "전체 매장" : it.shopname || "-",
      course: [it.coursename, it.subcoursename, it.hole ? `${it.hole}번 홀` : ""].filter(Boolean).join(" · ") || "-",
      start: it.timezone_startdate,
      end: it.timezone_enddate,
      prize: rankType && ranks.length ? ranks.join(" / ") : it.point || "-",
      rankType,
    };
  })
);

const load = async () => {
  try {
    const res = await api.miniGameList({ ...form, startdate: L.apiDate(startDate.value), enddate: L.apiDate(endDate.value) });
    list.value = res?.eventlist || [];
    total.value = Number(res?.eventlistcnt || 0);
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
  if ((startDate.value && !endDate.value) || (!startDate.value && endDate.value)) return;
  form.pageno = 1;
  await load();
};
watch([startDate, endDate], ([s, e]) => { if ((s && e && s <= e) || (!s && !e)) search(); });
const onPage = async (p) => { form.pageno = p; await load(); };

const mobIndex = ref(-1);
const toggleMob = (i) => { if (window.innerWidth <= 768) mobIndex.value = mobIndex.value === i ? -1 : i; };
const beforeEnter = (el) => { el.style.height = "0"; };
const enter = (el) => { el.style.transition = "all .4s ease"; el.style.height = el.scrollHeight + "px"; };
const beforeLeave = (el) => { el.style.height = el.scrollHeight + "px"; };
const leave = (el) => { el.style.transition = "all .4s ease"; el.style.height = "0"; };

onMounted(load);

definePageMeta({ layout: "default" });
useHead({ htmlAttrs: { lang: "ko" }, title: "미니게임", meta: [{ name: "description", content: "미니게임 목록 페이지 입니다." }] });
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/membership.scss';

.date-range { align-items: center; gap: 6px; .wave { color: #72777A; } :deep(.dp__main) { width: 140px; } }
.title-col { justify-content: flex-start; text-align: left; }
.title-wrap { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; min-width: 0; }
.badges { display: flex; gap: 4px; flex-wrap: wrap; }
.badge {
  display: inline-block; padding: 1px 6px; border-radius: 4px; border: 1px solid #E5E7E8; font-size: 12px; line-height: 1.5; color: #35383B; background: #fff;
  &.color-green { color: #00702F; border-color: #b9e3c8; background: #f0faf3; }
  &.color-red { color: #D81E3C; border-color: #f5c2cb; background: #fff4f6; }
  &.color-grey { color: #6e6e6e; }
}
.title-link { display: block; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.c-course { word-break: keep-all; } /* "1번 홀" 이 "1번/홀" 로 갈리지 않게 */
.prize { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; word-break: keep-all; }
.c-act .btn-sm-line, .table-body-mob .btn-sm-line { min-width: 0; width: auto; padding: 0 12px; white-space: nowrap; }

@media (min-width: 769px) {
  .table-head-col, .table-body-flex > .table-body-col { min-width: 0; }
  .c-no { flex: 50 1 0; }
  .c-title { flex: 300 1 0; }
  .c-shop { flex: 120 1 0; }
  .c-course { flex: 190 1 0; }
  .c-period { flex: 190 1 0; }
  .c-prize { flex: 170 1 0; }
  .c-act { flex: 90 1 0; }
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
