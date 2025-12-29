<template>
  <div class="customer">
    <div class="customer-wrap">
      <div class="customer-head">고객지원</div>
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
            <span class="point">({{ customerData.listcnt }})</span>
          </div>
          <button
            type="button"
            class="col-2 btn-recent"
            :class="{ 'is-active': isRecent }"
            @click="handleRecent"
          >
            <span>{{ isRecent ? `오래된순` : `등록일순` }}</span>
            <img src="/public/images/icon/icon_filter.png" alt="icon_filter" />
          </button>
        </div>
        <div class="table">
          <div class="table-head is-mob">
            <div class="table-head-col">내용</div>
            <div class="table-head-col is-mob">수강생</div>
            <div class="table-head-col is-mob">일시</div>
            <div class="table-head-col">코칭 상태</div>
          </div>
          <div class="table-body">
            <div
              class="table-body-row"
              :class="{ 'is-move': tableMove }"
              ref="tableRef"
              v-for="(row, index) in customerData.list"
              :key="index"
            >
              <div class="table-body-flex">
                <div class="table-body-col align-left">
                  <span class="state type01 is-mob-show">
                    <span
                      class="state-list"
                      :class="{
                        'color-grey': row.has_answer == '1',
                        'color-green': row.has_answer == '0',
                      }"
                      >{{ row.has_answer == 1 ? "완료" : "진행" }}</span
                    >
                  </span>
                  <button
                    type="button"
                    class="title link"
                    @click="goToReview(row)"
                  >
                    {{ row.content }}
                  </button>
                </div>
                <div class="table-body-col is-mob">
                  <button type="button" class="name" @click="onModalPlayerEdit(row.player_fk)">
                    {{ row.nickname }}
                  </button>
                </div>
                <div class="table-body-col is-mob">
                  <span class="is-grey">{{ row.regdate }}</span>
                </div>
                <div class="table-body-col is-mob">
                  <span class="state type01">
                    <span
                      class="state-list"
                      :class="{
                        'color-grey': row.has_answer == '1',
                        'color-green': row.has_answer == '0',
                      }"
                      >{{ row.has_answer == "1" ? "완료" : "진행" }}</span
                    >
                  </span>
                </div>
              </div>
              <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @before-leave="beforeLeave"
                @leave="leave"
              >
                <div class="table-body-mob">
                  <div class="row">
                    <span class="row-list">
                      <span class="name" @click="onModalPlayerEdit(row.player_fk)">{{ row.nickname }}</span>
                    </span>
                    <span class="row-list"
                      ><span class="is-grey">{{ row.regdate }}</span></span
                    >
                  </div>
                </div>
              </transition>
            </div>
            <div v-if="customerData.list.length === 0" class="no-info">데이터가 없습니다.</div>
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
              :total-items="customerData.listcnt || 1"
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
    @update:isOpen="modals.modalMemberInfo = $event"
    :item="selectedItem"
  />

</template>
<script setup>
import { useRouter } from "vue-router";
import { useCustomerApi } from "~/api/customer";
import { useMembersApi } from "~/api/members";
import { useRouteQuery } from "@vueuse/router";
import { useIntersectionObserver } from "@vueuse/core";

import { useHead } from "#app";
import { onClickOutside } from '@vueuse/core';

const modals = reactive({ });
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
    name: '전체',
    value: 'all'
  },
  {
    name: '내용',
    value: 'c.content'
  },
  {
    name: '닉네임',
    value: 'p.nickname'
  },
]

const selectInput = computed(() => {
  switch(searchData.searchtype) {
    case 'all':
      return '전체'

    case 'c.content':
      return '내용'

    case 'p.nickname':
      return '닉네임'
  }
});

const router = useRouter();
const customerApi = useCustomerApi();
const membersApi = useMembersApi();
const pagenoRef = useRouteQuery("pageno", 1); // 원본 Ref
const searchData = reactive({
  pageno: computed({
    get: () => Number(pagenoRef.value) || 1,
    set: (v) => {
      pagenoRef.value = v;
    },
  }),

  searchtype: useRouteQuery("searchtype", "c.content"),
  searchname: useRouteQuery("searchname", ""),
});

const customerData = ref({
  listcnt: 0,
  list: [],
});

const _customerList = async () => {
  try {
    const res = await customerApi._customerlist(searchData);

    customerData.value.list = res.list;

    customerData.value.listcnt = Number(res.listcnt);

  } catch (err) {
    
    handleErrorToast(err.message);
  }
};

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

const goToReview = async (item) => {
  await router.push({
    path: `/coaching/${item.academy_fk}`,
    query: {
      searchtype: searchData.searchtype, // useRouteQuery라 자동 언래핑됨
      searchname: searchData.searchname,
      // 필요하면 페이지도 같이 넘겨놓을 수 있음 (뒤로가기용)
      pageno: searchData.pageno,
      qnapageno: item.qnaPageno,
    },
  });

  // hash 요소가 렌더링될 시간을 약간 기다림
  setTimeout(() => {
    const el = document.querySelector("#review");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, 300);
};

// 최신순 정렬 이벤트
const isRecent = ref(true);
const sortByRecent = () => {
  customerData.value.list.sort((a, b) => {
    const dateA = new Date(a.regdate);
    const dateB = new Date(b.regdate);

    return isRecent.value
      ? dateB - dateA // 최신순
      : dateA - dateB; // 오래된순
  });
};

const handleRecent = () => {
  isRecent.value = !isRecent.value;
  sortByRecent();
};

const tableRef = ref();
const tableMove = ref(false);
useIntersectionObserver(
  tableRef,
  ([entry]) => {
    if (entry.isIntersecting) {
      tableMove.value = true;
    }
  },
  {
    threshold: 0,
  }
)

const onClickHandler = (page) => {
  _customerList();
  // const item = preferShop.value[page - 1];
  // if (item) emit("itemChg", item);
  // return false;
};

const handleSearch = async () => {
  searchData.pageno = 1;

  // ✅ 여기서 API 호출
  await _customerList(); // 페이지 1로 초기화
};

const selectedItem = ref();
const onModalPlayerEdit = async (val) => {
  try {
    const res = await membersApi._playerview({ player_pk: val });

    const data = res.view;

    // 🔥 1) player_memo JSON 파싱
    let memoText = "";
    if (data.player_memo) {
      try {
        const memoObj = JSON.parse(data.player_memo);
        memoText = memoObj[val] || "";
      } catch (e) {
        memoText = "";
      }
    }

    // 🔥 2) selectedItem에 filtered_memo 추가
    selectedItem.value = {
      ...data,
      filtered_memo: memoText, // ← 이걸 props로 넘김
    };

    modals["modalMemberInfo"] = true;
  } catch (err) {
    alert(err.message);
  }
};

onMounted(async () => {
  await _customerList();
});

definePageMeta({
  layout: "sub-page",
});

useHead({
  htmlAttrs: {
    lang: "ko",
  },
  title: "고객지원",
  meta: [{ name: "description", content: "고객지원 리스트 페이지 입니다." }],
});
</script>
<style lang="scss" scoped>
@use "@/assets/scss/pages/customer.scss";
</style>
