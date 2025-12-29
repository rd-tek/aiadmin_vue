<template>
  <div class="member">
    <div class="member-wrap">
      <div class="member-head">회원</div>
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
          <div class="col-1">
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
            <span>{{ isRecent ? `등록일순` : `오래된순` }}</span>
            <img src="/public/images/icon/icon_filter.png" alt="icon_filter" />
          </button>
        </div>
        <div class="table">
          <div class="table-head">
            <div class="table-head-col col-1"></div>
            <div class="table-head-col col-2 is-mob">번호</div>
            <div class="table-head-col">닉네임</div>
            <div class="table-head-col is-mob">성별</div>
            <div class="table-head-col is-mob">휴대전화</div>
            <div class="table-head-col is-mob">매장</div>
            <div class="table-head-col is-mob">코칭진행</div>
            <div class="table-head-col is-mob">코칭완료</div>
          </div>
          <div class="table-body">
            <div
                class="table-body-row"
                :class="{ 'is-move': playerMove }" 
                ref="playerRef"
                v-for="(item, index) in playerData.list"
                :key="index"
            >
              <div class="table-body-flex align-start">
                <div class="table-body-col col-1">
                  <div class="check-box">
                    <input
                      type="checkbox"
                      :id="`check_${index}`"
                      v-model="selectedPlayerPks"
                      :value="item.player_pk"
                    />
                    <label :for="`check_${index}`">
                      <span class="check-box-item">
                        <span class="item-blur"></span>
                        <i class="item-line"></i>
                      </span>
                    </label>
                  </div>
                </div>
                <div class="table-body-col col-2 is-mob">{{ item.no }}</div>
                <div class="table-body-col" @click="handleMobList(index)">
                  <button
                    type="button"
                    class="name"
                    @click="onModalPlayerEdit(item.player_pk)"
                  >
                    {{ item.nickname }}
                  </button>
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
                <div class="table-body-col is-mob">
                  {{ item.gender == "M" ? "남자" : "여자" }}
                </div>
                <div class="table-body-col is-mob">
                  {{ item.handphone || "-" }}
                </div>
                <div class="table-body-col is-mob">{{ item.shopname }}</div>
                <div class="table-body-col is-mob">
                  <span class="box color-green">{{ item.progress_cnt }}</span>
                </div>
                <div class="table-body-col is-mob">
                  <span class="box color-grey">{{ item.complete_cnt }}</span>
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
                    <dt class="tit">성별</dt>
                    <dd class="cnt">
                      {{ item.gender == "M" ? "남자" : "여자" }}
                    </dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">휴대전화</dt>
                    <dd class="cnt">{{ item.handphone || "-" }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">매장</dt>
                    <dd class="cnt">{{ item.shopname }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">코칭진행</dt>
                    <dd class="cnt">
                      <span class="box color-green">{{
                        item.progress_cnt
                      }}</span>
                    </dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">코칭완료</dt>
                    <dd class="cnt">
                      <span class="box color-grey">{{
                        item.complete_cnt
                      }}</span>
                    </dd>
                  </dl>
                </div>
              </transition>
            </div>
            <div class="no-info" v-if="playerData.list.length === 0">
              내역이 없습니다.
            </div>
          </div>
        </div>
      </div>
      <div class="btn-wrap">
        <div class="btn-group align-left">
          <button
            type="button"
            class="btn-primary btn-lg-line"
            @click="mailSend"
          >
            이메일 보내기
          </button>
          <client-only>
            <VueAwesomePaginate
              :items-per-page="10"
              :max-pages-shown="3"
              v-model="searchData.pageno"
              :total-items="playerData.listcnt || 1"
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

    <!-- 토스트 경고 모달 -->
    <toast-warn-modal 
      :isOpen="modals.toastWarnModal"
      :toastWarnMessage="toastWarnMessage"
      @update:isOpen="modals.toastWarnModal = $event"/>

  </div>

  <modal-member-info
    :isOpen="modals.modalMemberInfo"
    @update:isOpen="modals.modalMemberInfo = $event"
    :item="selectedItem"
  />
  <modal-mail-send
    :isOpen="modals.modalMailSend"
    @update:isOpen="modals.modalMailSend = $event"
    :item="selectedItem"
  />

  <!-- 토스트 에러 모달 -->
  <toast-error-modal 
    :isOpen="modals.toastErrorModal"
    :toastErrorMessage="toastErrorMessage"
    @update:isOpen="modals.toastErrorModal = $event"/>

</template>
<script setup>
import { useMembersApi } from "~/api/members";
import { useRouteQuery } from "@vueuse/router";
import { useElementVisibility } from "@vueuse/core";
import toastErrorModal from '@/components/toast-ui/toast-error-modal.vue';
import toastWarnModal from '@/components/toast-ui/toast-warn-modal.vue';
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
    name: '회원명',
    value: 'P.nickname'
  },
  {
    name: '매장명',
    value: 'O.nickname'
  }
]

const selectInput = computed(() => {
  switch(searchData.searchtype) {
    case 'P.nickname':
    return '회원명'

    case 'O.nickname':
    return '매장명'
  }
});

const membersApi = useMembersApi();
const pagenoRef = useRouteQuery("pageno", 1); // 원본 Ref
const searchData = reactive({
  pageno: computed({
    get: () => Number(pagenoRef.value) || 1,
    set: (v) => {
      pagenoRef.value = v;
    },
  }),

  searchtype: useRouteQuery("searchtype", "P.nickname"),
  searchname: useRouteQuery("searchname", ""),
});

const selectedPlayerPks = ref([]);
const hasChecked = computed(() => selectedPlayerPks.value.length > 0);
const allSelected = ref(false);
const toggleAll = () => {
  playerData.value.list.forEach((v) => {
    if (allSelected.value) {
      selectedPlayerPks.value.push(v.player_pk);
    } else {
      selectedPlayerPks.value = [];
    }
  });
};

// 개별 체크 변화 감지
watch(selectedPlayerPks, (newVal) => {
  allSelected.value = newVal.length === playerData.value.list.length;
})

const playerData = ref({
  listcnt: 0,
  list: [],
});

const expertData = ref({});
const _playerList = async () => {
  try {
    const res = await membersApi._playerlist(searchData);

    expertData.value = res.expert_master;
    playerData.value.list = res.list;
    playerData.value.listcnt = Number(res.listcnt);
  } catch (err) {
    handleErrorToast(err.message);
  }
};

const onClickHandler = (page) => {
  _playerList();
  // const item = preferShop.value[page - 1];
  // if (item) emit("itemChg", item);
  // return false;
};

const handleSearch = async () => {
  searchData.pageno = 1;
  // ✅ 여기서 API 호출
  await _playerList(); // 페이지 1로 초기화
};

onMounted(async () => {
  await _playerList();
});

const modals = reactive({ modalSample: false });

// 토스트 경고 모달
const toastWarnMessage = ref();
const handleWarnToast = (message) => {
    document.querySelector('body').classList.add('is-hidden');
    modals['toastWarnModal'] = true;
    toastWarnMessage.value = message;
}

// 토스트 에러 모달
const toastErrorMessage = ref();
const handleErrorToast = (message) => {
    document.querySelector('body').classList.add('is-hidden');
    modals['toastErrorModal'] = true;
    toastErrorMessage.value = message;
}

const selectedItem = ref({});
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
    handleErrorToast(err.message);
  }
};

const mailSend = async () => {
  if (!hasChecked.value) {
    if (process.client) {
      handleWarnToast("항목을 하나 이상 선택해주세요.");
    }
    return;
  }

  const receivers = playerData.value.list
    .filter((v) => selectedPlayerPks.value.includes(v.player_pk))
    .map((v) => v.nickname);

  selectedItem.value = {
    send_email: expertData.value.email,
    receiver: receivers,
    player_pks: selectedPlayerPks.value,
  };

  modals["modalMailSend"] = true;
};

const _sendEmail = async () => {
  if (!hasChecked.value) {
    if (process.client) {
      handleWarnToast("하나 이상 선택해주세요.");
    }
    return;
  }

  try {
    const res = await membersApi._sendemail({
      academy_pks: selectedPlayerPks.value,
    });
  } catch (err) {
    handleErrorToast(err.message);
  }
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

const playerRef = ref();
const playerMove = ref(false);
const isVisiblePlayer = useElementVisibility(playerRef);
watch(() => isVisiblePlayer.value, () => {
    playerMove.value = true;
})

// 최신순 정렬 이벤트
const isRecent = ref(true);
const sortByRecent = () => {
  playerData.value.list.sort((a, b) => {
    const dateA = new Date(a.no);
    const dateB = new Date(b.no);

    return isRecent.value
      ? dateB - dateA   // 최신순
      : dateA - dateB;  // 오래된순
  });
};

const handleRecent = () => {
  isRecent.value = !isRecent.value;
  sortByRecent();
};

definePageMeta({
  layout: "sub-page",
});

useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  title: '회원',
  meta: [
    { name: 'description', content: '회원 페이지 입니다.' }
  ]
})
</script>
<style lang="scss" scoped>
@use "@/assets/scss/pages/member.scss";
</style>
