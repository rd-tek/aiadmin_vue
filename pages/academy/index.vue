<template>
  <div class="academy">
    <div class="academy-wrap">
      <div class="academy-head">아카데미</div>
      <div class="filter-box">
        <div class="search-area">
          <div class="search-area-flex">
            <div class="select-default">
              <!-- <select class="lg" v-model="searchData.searchtype">
                <option value="title">전체</option>
              </select> -->
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
            <div class="check-box">
              <input
                type="checkbox"
                id="chk_all"
                v-model="allSelected"
                @change="toggleAll"
                name="chk_all"
              />
              <label for="chk_all">
                <span class="check-box-item">
                  <span class="item-blur"></span>
                  <i class="item-line"></i>
                </span>
                <span class="check-box-txt">전체선택</span>
              </label>
            </div>
          </div>
          <button type="button" class="col-2 btn-recent" :class="{ 'is-active': isRecent }" @click="handleRecent">
            <span>{{ isRecent ? `오래된순` : `최신순`}}</span>
            <img src="/public/images/icon/icon_filter.png" alt="icon_filter" />
          </button>
        </div>
        <div
          class="cont-list"
          ref="academyRef"
          :class="{ 'is-move': academyMove }"
          v-for="(item, index) in academyData.list"
          :key="index"
        >
          <div class="cont-list-link hover-none">
            <div class="check-box">
              <input
                type="checkbox"
                :id="`check_${index}`"
                v-model="selectedAcademyPks"
                :value="item.academy_pk"
              />
              <label :for="`check_${index}`">
                <span class="check-box-item">
                  <span class="item-blur"></span>
                  <i class="item-line"></i>
                </span>
              </label>
            </div>
            <div class="image-wrap">
              <nuxt-link :to="`/academy/${item.academy_pk}`"
                class="image-area"
                :class="{ 'no-data': !item.thumbnail }"
                :style="{
                  backgroundImage: `url(${
                    common.getImg(item.thumbnail)
                  })`,
                }"
              ></nuxt-link>
            </div>
            <div class="cont-list-flex">
              <div class="info-area">
                <ul class="label">
                  <li class="label-list">
                    <span>{{ item.target_audience }}</span>
                  </li>
                  <li class="label-list">
                    <span>클래스 {{ item.class_list.length }}개</span>
                  </li>
                  <li class="label-list">
                    <span>{{ item.regdate }}</span>
                  </li>
                </ul>
                <div class="title">
                  <nuxt-link
                    :to="`/academy/${item.academy_pk}`"
                    class="text"
                  >
                    {{ item.title }}
                  </nuxt-link>
                </div>
                <div class="info">
                  <div class="info-list">
                    <img
                      src="/public/images/icon/icon_favorite.png"
                      alt="icon_favorite"
                    />
                    <span>{{ item.academy_like }}</span>
                  </div>
                  <div class="info-list">
                    <img
                      src="/public/images/icon/icon_person.png"
                      alt="icon_person"
                    />
                    <span>{{ item.enroll_count }}</span>
                  </div>
                  <div class="info-list">
                    <div class="state type01">
                      <div class="state-list color-green">
                        {{ item.status == "1" ? "공개" : "비공개" }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn-wrap">
                <div class="btn-group">
                  <nuxt-link
                    :to="`/academy/edit/${item.academy_pk}`"
                    class="btn-primary-orange btn-md-line"
                    >수정</nuxt-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="no-info" v-if="academyData.list.length === 0">
          내역이 없습니다.
        </div>
      </div>
      <div class="btn-wrap">
        <div class="btn-group">
          <button
            type="button"
            class="btn-primary btn-lg-line"
            @click="_academyDrop"
          >
            삭제
          </button>

          <client-only>
            <VueAwesomePaginate
              :items-per-page="10"
              :max-pages-shown="3"
              v-model="searchData.pageno"
              :total-items="academyData.listcnt || 1"
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

          <nuxt-link to="/academy/write" class="btn-primary-teal btn-lg-fill"
            >등록하기</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>

  <!-- 토스트 삭제 모달 -->
  <toast-delete-modal
    :isOpen="modals.toastDeleteModal"
    :toastDeleteMessage="toastDeleteMessage"
    @delete="handleDelete"
    @update:isOpen="modals.toastDeleteModal = $event"
  />

  <!-- 토스트 경고 모달 -->
  <toast-warn-modal
    :isOpen="modals.toastWarnModal"
    :toastWarnMessage="toastWarnMessage"
    @update:isOpen="modals.toastWarnModal = $event"
  />

  <!-- 토스트 에러 모달 -->
  <toast-error-modal
    :isOpen="modals.toastErrorModal"
    :toastErrorMessage="toastErrorMessage"
    @update:isOpen="modals.toastErrorModal = $event"
  />
</template>
<script setup>
import { useAcademyApi } from "~/api/academy";
import { useRouteQuery } from "@vueuse/router";
import { useCommon } from "~/utils/common";
import { useIntersectionObserver } from "@vueuse/core";
import toastDeleteModal from "@/components/toast-ui/toast-delete-modal.vue";
import toastErrorModal from "@/components/toast-ui/toast-error-modal.vue";
import toastWarnModal from "@/components/toast-ui/toast-warn-modal.vue";
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
    name: '전체',
  },
]

const selectInput = computed(() => {
  return '전체'
});

const common = useCommon();
const academyApi = useAcademyApi();
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

const allSelected = ref(false);
const selectedAcademyPks = ref([]);

const toggleAll = () => {
  if (allSelected.value) {
    selectedAcademyPks.value = academyData.value.list.map(v => v.academy_pk);
  } else {
    selectedAcademyPks.value = [];
  }
};

// 개별 체크 변화 감지
watch(selectedAcademyPks, (newVal) => {
  allSelected.value = newVal.length === academyData.value.list.length;
});

const hasChecked = computed(() => selectedAcademyPks.value.length > 0);

const academyData = ref({
  listcnt: 0,
  list: [],
});

const _academyList = async () => {
  try {
    const res = await academyApi._academylist(searchData);

    academyData.value.list = res.list;
    academyData.value.listcnt = Number(res.listcnt);
  } catch (err) {
    handleErrorToast(err.message);
  }
};

const onClickHandler = (page) => {
  _academyList();
  // const item = preferShop.value[page - 1];
  // if (item) emit("itemChg", item);
  // return false;
};

const handleSearch = async () => {
  searchData.pageno = 1;
  // ✅ 여기서 API 호출
  await _academyList(); // 페이지 1로 초기화
};

const modals = reactive({});

// 토스트 삭제 모달
const delKey = ref(null);
const toastDeleteMessage = ref();
const handleDeleteToast = (message, key) => {
  if (!hasChecked.value) {
    if (process.client) {
      handleWarnToast("항목을 하나 이상 선택해주세요.");
      return;
    }
  }

  document.querySelector("body").classList.add("is-hidden");
  modals["toastDeleteModal"] = true;
  toastDeleteMessage.value = message;
  delKey.value = key;
};

// 삭제 로직
const handleDelete = async () => {
  try {
    const res = await academyApi._academydrop({
      academy_pks: selectedAcademyPks.value,
    });

    _academyList(); // 페이지 1로 초기화
  } catch (err) {
    handleErrorToast(err.message);
  }
};

// 토스트 에러 모달
const toastErrorMessage = ref();
const handleErrorToast = (message) => {
  document.querySelector("body").classList.add("is-hidden");
  modals["toastErrorModal"] = true;
  toastErrorMessage.value = message;
};

// 토스트 경고 모달
const toastWarnMessage = ref();
const handleWarnToast = (message) => {
  document.querySelector("body").classList.add("is-hidden");
  modals["toastWarnModal"] = true;
  toastWarnMessage.value = message;
};

onMounted(async () => {
  await _academyList();
});

const newacademyList = computed(
  () => academyData.value.list.filter((v) => v.is_new == "1"), // 숫자라면 이렇게
);

const academyList = computed(
  () => academyData.value.list.filter((v) => v.is_new == "0"), // 숫자라면 이렇게
);

const _academyDrop = async () => {
  handleDeleteToast("아카데미 리스트에서 삭제됩니다.");
};

watch(
  () => [searchData.status, searchData.regtype], // 두 값 같이 관찰
  ([newStatus, newRegtype], [oldStatus, oldRegtype]) => {
    // 필요하면 조건 체크
    if (newStatus != null && newRegtype != null) {
      // 옵션: 페이지 리셋
      searchData.pageno = 1;
      _academyList();
    }
  },
  { immediate: false }, // 처음 마운트 때도 호출하려면 true
);

const academyRef = ref();
const academyMove = ref(false);
useIntersectionObserver(
  academyRef,
  ([entry]) => {
    if (entry.isIntersecting) {
      academyMove.value = true;
    }
  },
  {
    threshold: 0,
  }
)

// 최신순 정렬 이벤트
const isRecent = ref(true);
const sortByRecent = () => {
  academyData.value.list.sort((a, b) => {
    const dateA = new Date(a.regdate);
    const dateB = new Date(b.regdate);

    return isRecent.value
      ? dateB - dateA   // 최신순
      : dateA - dateB;  // 오래된순
  });
};

const handleRecent = () => {
  isRecent.value = !isRecent.value; // 최신 ⇄ 오래된 순 토글
  sortByRecent();
};

definePageMeta({
  layout: "sub-page",
});

useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  title: '아카데미',
  meta: [
    { name: 'description', content: '아카데미 상세 페이지 입니다.' }
  ]
})

</script>
<style lang="scss" scoped>
@use "@/assets/scss/pages/academy.scss";
</style>
