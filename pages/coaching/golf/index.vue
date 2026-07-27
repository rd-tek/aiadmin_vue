<template>
  <div class="coaching">
    <div class="coaching-wrap">
      <div class="coaching-head">코칭</div>
      <div class="filter-box">
        <div class="search-area">
          <div class="search-area-flex">
            <div class="select-default">
              <div class="form-list">
                <div class="input-text type-select">
                  <input
                    type="text"
                    :placeholder="optionList[0].name"
                    class="lg"
                    :class="{ 'is-active': selectShow === true }"
                    readonly
                    :value="selectInput"
                    @click="selectShow = !selectShow">
                </div>
                <img src="/images/icon/icon_arrow_down.png" alt="icon_arrow_down" :class="{ 'is-active' : selectShow }">
                <transition name="slide">
                  <ul class="select-list" ref="inputContRef" v-if="selectShow">
                    <li class="select-list-item" v-for="(item, index) in optionList" :key="index">
                      <div class="select-item">
                        <input type="radio" :id="`radio_${index}`" name="radio_custom" :value="item.value" v-model="searchData.searchtype" @click="selectShow = false">
                        <label :for="`radio_${index}`">{{ item.name }}</label>
                      </div>
                    </li>
                  </ul>
                </transition>
              </div>
            </div>
            <div class="input-text">
              <input
                type="text"
                v-model="searchData.searchname"
                placeholder="검색어를 입력해 주세요."
                @keyup.enter="handleSearch"
              />
            </div>
          </div>
          <button type="button" class="btn-search" @click="handleSearch">
            검색
          </button>
        </div>
      </div>
      <div class="cont">
        <div class="top-area">
          <div class="col-2">
            <span>전체</span>
            <span class="point">({{ coachingData.listcnt }})</span>
          </div>
          <button type="button" class="col-2 btn-recent" :class="{ 'is-active': isRecent }" @click="handleRecent">
            <span>{{ isRecent ? `오래된순` : `등록일순` }}</span>
            <img src="/public/images/icon/icon_filter.png" alt="icon_filter" />
          </button>
        </div>
        <div class="table">
          <div class="table-head">
            <div class="table-head-col is-mob col-2">번호</div>
            <div class="table-head-col is-mob">클래스</div>
            <div class="table-head-col">수강생</div>
            <div class="table-head-col is-mob">매장</div>
            <div class="table-head-col is-mob">일시</div>
            <div class="table-head-col">코칭 상태</div>
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
                <div class="table-body-col is-mob col-2">{{ item.no }}</div>
                <div class="table-body-col is-mob">
                  <nuxt-link :to="{ path: `/coaching/golf/${item.enroll_pk}` }" class="link">{{ item.title }}</nuxt-link>
                </div>
                <div class="table-body-col">
                  <button type="button"
                    @click="onModalPlayerEdit(item.player_fk)"
                    class="name"
                    >{{ item.nickname }}</button
                  >
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
                      src="/public/images/icon/icon_arrow_down.png"
                      alt="icon_arrow_down"
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
                    <dt class="tit">클래스</dt>
                    <dd class="cnt">
                      <nuxt-link :to="{ path: `/coaching/golf/${item.enroll_pk}` }" class="link">{{ item.title }}</nuxt-link>
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
              내역이 없습니다.
            </div>
          </div>
        </div>
      </div>
      <div class="btn-wrap">
        <div class="btn-group align-left">
          <client-only>
            <VueAwesomePaginate
              :items-per-page="10"
              :max-pages-shown="3"
              v-model="searchData.pageno"
              :total-items="coachingData.listcnt || 1"
              @click="onClickHandler"
              pagination-container-class="pagination-container type02"
              paginate-buttons-class="paginate-buttons"
              active-page-class="active"
              back-button-class="paginate-buttons"
              next-button-class="paginate-buttons"
            >
              <template #prev-button>
                <img src="/images/icon/icon_prev.png" alt="icon_prev" />
              </template>
              <template #next-button>
                <img src="/images/icon/icon_next.png" alt="icon_next" />
              </template>
            </VueAwesomePaginate>
          </client-only>
        </div>
      </div>
    </div>
  </div>

  <modal-member-info
    :isOpen="modals.modalMemberInfo"
    :item="selectedPlayerItem"
    @update:isOpen="modals.modalMemberInfo = $event" />

  <!-- 토스트 에러 모달 -->
  <toast-error-modal
    :isOpen="modals.toastErrorModal"
    :toastErrorMessage="toastErrorMessage"
    @update:isOpen="modals.toastErrorModal = $event"/>

</template>
<script setup>
import { useCoachingApi } from "~/api/coaching";
import { useMembersApi } from "~/api/members";
import toastErrorModal from '@/components/toast-ui/toast-error-modal.vue';
import { useRouteQuery } from "@vueuse/router";
import { useCommon } from "~/utils/common";
import { useIntersectionObserver } from "@vueuse/core";
import { useHead } from '#app'
import { onClickOutside } from '@vueuse/core';

const selectShow = ref(false);
const inputContRef = ref();
onClickOutside(inputContRef, event => {
  const parent = event.target.closest('.input-text');
  if(parent === null) {
    selectShow.value = false;
  }
});

// 실적 셀렉트 값
const optionList = [
  {
    name: '커리큘럼'
  },
]

const selectInput = computed(() => {
  return '커리큘럼'
});

const coachingRef = ref();
const coachingMove = ref(false);
useIntersectionObserver(
  coachingRef,
  ([entry]) => {
    if (entry.isIntersecting) {
      coachingMove.value = true;
    }
  },
  {
    threshold: 0,
  }
)

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
    document.querySelector('body').classList.add('is-hidden');
    modals['toastErrorModal'] = true;
    toastErrorMessage.value = err.message;
  }
};

const onClickHandler = (page) => {
  _coachingList();
};

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
    const dateA = new Date(a.timezone_enroll_date);
    const dateB = new Date(b.timezone_enroll_date);

    return isRecent.value
      ? dateB - dateA   // 최신순
      : dateA - dateB;  // 오래된순
  });
};

const handleRecent = () => {
  isRecent.value = !isRecent.value;
  sortByRecent();
};

useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  title: '코칭',
  meta: [
    { name: 'description', content: '코칭 리스트 페이지 입니다.' }
  ]
})
</script>
<style lang="scss" scoped>
@use "@/assets/scss/pages/coaching.scss";
</style>
