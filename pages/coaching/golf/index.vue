<template>
  <div class="coaching golf">
    <div class="filter-box">
      <div class="col-2 flex-end">
        <div class="col d-flex">
          <div class="d-flex">
            <div class="select-default">
              <select aria-label="검색 구분 선택" v-model="searchData.searchtype">
                <option value="title">아카데미</option>
              </select>
            </div>
            <div class="input-text">
              <input aria-label="검색어 입력"
                type="text"
                v-model="searchData.searchname"
                placeholder="검색어 입력"
                @keyup.enter="handleSearch"
              />
            </div>
          </div>
          <button type="button" class="btn" @click="handleSearch">검색</button>
        </div>
      </div>
    </div>
    <div class="top-area">
      <div class="total">
        전체 <span class="num">({{ coachingData.listcnt }})</span>
      </div>
      <button
        type="button"
        class="btn-recent"
        :class="{ 'is-active': isRecent }"
        @click="handleRecent"
      >
        <span>{{ isRecent ? `최신순` : `오래된순` }}</span>
        <img src="/images/icon/icon_filter.png" alt="" />
      </button>
    </div>
    <div class="table type03 mob-type01">
      <div class="table-head">
        <div class="table-head-col is-mob">No</div>
        <div class="table-head-col is-mob">아카데미</div>
        <div class="table-head-col">닉네임</div>
        <div class="table-head-col is-mob">매장</div>
        <div class="table-head-col is-mob">일시</div>
        <div class="table-head-col">상태</div>
      </div>
      <div class="table-body">
        <div
          class="table-body-row"
          :class="{ 'is-move': coachingMove }"
          ref="coachingRef"
          v-for="(item, index) in coachingData.list"
          :key="index"
        >
          <div class="table-body-flex">
            <div class="table-body-col is-mob">{{ item.no }}</div>
            <div class="table-body-col is-mob">
              <div class="item-wrap">
                <nuxt-link
                  :to="{ path: `/coaching/golf/${item.enroll_pk}` }"
                  class="class-name"
                  >{{ item.title }}</nuxt-link
                >
              </div>
            </div>
            <div class="table-body-col">
              <span class="link" @click="onModalPlayerEdit(item.player_fk)">{{
                item.nickname
              }}</span>
            </div>
            <div class="table-body-col is-mob">
              {{ item.shopname || "-" }}
            </div>
            <div class="table-body-col is-mob">
              {{ common.dateformat(item.timezone_enroll_date) }}
            </div>
            <div class="table-body-col" @click="handleMobList(index)">
              <span class="state type01">
                <span
                  class="state-list"
                  :class="{
                    'color-grey': item.status == '2',
                    'color-green': item.status == '1',
                  }"
                  >{{ item.status == "1" ? "진행중" : "완료" }}</span
                >
              </span>
              <button
                type="button"
                class="btn-arrow"
                :class="{ 'is-active': mobListIndex === index }"
              >
                <img
                  src="/images/icon/icon_arrow_down.png"
                  alt="펼치기"
                />
              </button>
            </div>
          </div>
          <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @before-leave="beforeLeave"
            @leave="leave"
          >
            <div class="table-body-mob" v-if="mobListIndex === index">
              <dl class="list">
                <dt class="tit">아카데미</dt>
                <dd class="cnt">
                  <nuxt-link
                    :to="{ path: `/coaching/golf/${item.enroll_pk}` }"
                    class="link"
                    >{{ item.title }}</nuxt-link
                  >
                </dd>
              </dl>
              <dl class="list">
                <dt class="tit">매장</dt>
                <dd class="cnt">{{ item.shopname || "-" }}</dd>
              </dl>
              <dl class="list">
                <dt class="tit">일시</dt>
                <dd class="cnt">
                  {{ common.dateformat(item.timezone_enroll_date) }}
                </dd>
              </dl>
            </div>
          </transition>
        </div>
        <div class="no-info" v-if="coachingData.list.length === 0">
          데이터가 없습니다.
        </div>
      </div>
      <ul class="pagination-container type02">
        <li>
          <button
            type="button"
            class="paginate-buttons"
            :disabled="searchData.pageno === 1"
            @click="changePage(searchData.pageno - 1)"
            aria-label="이전"
          >
            <img src="/images/icon/icon_prev.png" alt="" />
          </button>
        </li>
        <li v-for="page in visiblePages" :key="page">
          <button
            type="button"
            class="paginate-buttons"
            :class="{ active: searchData.pageno === page }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
        </li>
        <li>
          <button
            type="button"
            class="paginate-buttons"
            :disabled="searchData.pageno === totalPage"
            @click="changePage(searchData.pageno + 1)"
            aria-label="다음"
          >
            <img src="/images/icon/icon_next.png" alt="" />
          </button>
        </li>
      </ul>
    </div>
  </div>

  <modal-member-info
    :isOpen="modals.modalMemberInfo"
    :item="selectedPlayerItem"
    @update:isOpen="modals.modalMemberInfo = $event"
  />

  <!-- 토스트 에러 모달 -->
  <toast-error-modal
    :isOpen="modals.toastErrorModal"
    :toastErrorMessage="toastErrorMessage"
    @update:isOpen="modals.toastErrorModal = $event"
  />
</template>
<script setup>
import { useCoachingApi } from "~/api/coaching";
import { useMembersApi } from "~/api/members";
import toastErrorModal from "@/components/toast-ui/toast-error-modal.vue";
import { useRouteQuery } from "@vueuse/router";
import { useCommon } from "~/utils/common";
import { useIntersectionObserver } from "@vueuse/core";
import { useHead } from "#app";

const coachingRef = ref();
const coachingMove = ref(false);
useIntersectionObserver(
  coachingRef,
  ([entry]) => {
    if (entry.isIntersecting) {
      if (import.meta.client) coachingMove.value = true;
    }
  },
  {
    threshold: 0,
  },
);

const membersApi = useMembersApi();
const selectedPlayerItem = ref(null);
const modals = reactive({ modalMemberInfo: false, toastErrorModal: false });
const toastErrorMessage = ref();
const onModalPlayerEdit = async (player_fk) => {
  try {
    const res = await membersApi._commonPlayerinfo(player_fk);
    const basic = res?.playerbasicinfo || {};
    const play = res?.playerpalyinfo || {};

    // aiadmin의 modal-member-info.vue는 item.playerinfo.* 형태를 기대하므로
    // /common/playerinfo 응답(playerbasicinfo/playerpalyinfo)을 그 모양으로 변환
    selectedPlayerItem.value = {
      playerinfo: {
        nickname: basic.nickname,
        gender: basic.gender,
        shopname: basic.shopname,
        regdate: basic.date,
        avg_putt_distance: play.avggreenhit,
        total_rounds: play.playcnt,
        avg_driver_distance: play.avgdriver,
        fairway_hit_rate: play.farewayrate,
        gir: play.greenrate,
        par_save_rate: play.parsaverate,
        avg_strokes: play.avgshot,
        best_strokes: play.minshot,
      },
    };
  } catch (err) {
    selectedPlayerItem.value = null;
  }
  modals["modalMemberInfo"] = true;
  document.querySelector("body").classList.add("is-hidden");
};

const common = useCommon();
const coachingApi = useCoachingApi();
const pagenoRef = useRouteQuery("pageno", 1); // 원본 Ref
const searchData = reactive({
  pageno: computed({
    get: () => Number(pagenoRef.value) || 1,
    set: (v) => {
      pagenoRef.value = v;
    },
  }),

  searchtype: useRouteQuery("searchtype", "title"),
  searchname: useRouteQuery("searchname", ""),
});

const coachingData = ref({
  listcnt: 0,
  list: [],
});

const _coachingList = async () => {
  try {
    const res = await coachingApi._coachinglist(searchData);

    coachingData.value.list = res.list;
    coachingData.value.listcnt = Number(res.listcnt);
  } catch (err) {
    document.querySelector("body").classList.add("is-hidden");
    modals["toastErrorModal"] = true;
    toastErrorMessage.value = err.message;
  }
};

const totalPage = computed(() =>
  Math.max(1, Math.ceil((coachingData.value.listcnt || 0) / 10)),
);

const changePage = (page) => {
  if (page < 1 || page > totalPage.value) return;

  searchData.pageno = page;
  _coachingList();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const visiblePages = computed(() => {
  const current = searchData.pageno;
  const total = totalPage.value;

  let start = Math.max(1, current - 2);
  let end = Math.min(total, start + 4);

  if (end - start < 4) {
    start = Math.max(1, end - 4);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const handleSearch = async () => {
  searchData.pageno = 1;
  await _coachingList(); // 페이지 1로 초기화
};

onMounted(async () => {
  await _coachingList();
});

const beforeEnter = (el) => {
  el.style.height = "0";
};

const enter = (el) => {
  el.style.transition = "all .4s ease";
  el.style.height = el.scrollHeight + "px";
};

const beforeLeave = (el) => {
  el.style.height = el.scrollHeight + "px";
};

const leave = (el) => {
  el.style.transition = "all .4s ease";
  el.style.height = "0";
};

const mobListIndex = ref(-1);
const handleMobList = (index) => {
  if (window.innerWidth <= 768) {
    mobListIndex.value = mobListIndex.value === index ? -1 : index;
  }
};

// 최신순 정렬 이벤트
const isRecent = ref(true);
const sortByRecent = () => {
  coachingData.value.list.sort((a, b) => {
    const dateA = parseServerDate(a.timezone_enroll_date);
    const dateB = parseServerDate(b.timezone_enroll_date);

    return isRecent.value
      ? dateB - dateA // 최신순
      : dateA - dateB; // 오래된순
  });
};

const handleRecent = () => {
  isRecent.value = !isRecent.value;
  sortByRecent();
};

useHead({
  htmlAttrs: {
    lang: "ko",
  },
  title: "코칭",
  meta: [{ name: "description", content: "코칭 리스트 페이지 입니다." }],
});
</script>
<style lang="scss" scoped>
@use "@/assets/scss/pages/coaching.scss";

/* 2026-09-14: 컬럼 폭을 실측 자연폭(px)에 비례 재분배해 개행 최소화 (데스크톱 한정).
   컬럼: No/아카데미·클래스/닉네임/매장/일시/상태 — 긴 제목(아카데미)에 폭 집중 */
@media (min-width: 769px) {
  .table-head-col, .table-body-flex > .table-body-col { min-width: 0; }
  .table-head-col:nth-child(1), .table-body-flex > .table-body-col:nth-child(1) { flex: 32 1 0; }
  .table-head-col:nth-child(2), .table-body-flex > .table-body-col:nth-child(2) { flex: 290 1 0; }
  .table-head-col:nth-child(3), .table-body-flex > .table-body-col:nth-child(3) { flex: 66 1 0; }
  .table-head-col:nth-child(4), .table-body-flex > .table-body-col:nth-child(4) { flex: 114 1 0; }
  .table-head-col:nth-child(5), .table-body-flex > .table-body-col:nth-child(5) { flex: 84 1 0; }
  .table-head-col:nth-child(6), .table-body-flex > .table-body-col:nth-child(6) { flex: 52 1 0; }
}

/* 2026-10-08(UI 2차 검토): 모바일 상태 칸 — 펼치기 화살표가 칸 오른쪽 끝에 겹쳐 놓여 글자 확대 시 '진행중' 배지를 덮음
   → 화살표 자리만큼 칸 오른쪽 여백(머리글 '상태'도 같게), 칸 사이 8px (aishop 코칭 목록과 동일) */
@media screen and (max-width: 768px) {
  .coaching .table-body-col:has(> .btn-arrow) { padding-right: 26px; }
  .coaching .table-head-col:last-child { padding-right: 26px; }
  .coaching .table-body-flex, .coaching .table-head { column-gap: 8px; }
}

/* 2026-10-20: 아카데미명 왼쪽 정렬(길이가 제각각), 매장명 한 줄 */
@media screen and (min-width: 769px) {
  .table-head-col:nth-child(2), .table-body-flex > .table-body-col:nth-child(2) { justify-content: flex-start; text-align: left; padding-left: 24px; }
  .table-body-flex > .table-body-col:nth-child(2) .item-wrap { width: 100%; justify-content: flex-start; text-align: left; }
  .table-body-flex > .table-body-col:nth-child(4) { white-space: nowrap; }
}
</style>
