<template>
    <div class="swing-list">
      <div class="filter-box">
        <div class="col-2 flex-end">
            <div class="col d-flex">
                <div class="d-flex">
                  <div class="datepicker">
                    <VueDatePicker 
                      v-model="startDate"
                      :format="formatDate" 
                      date-picker
                      auto-apply
                      @open="isFocused = true"
                      @closed="isFocused = false"
                    />
                  </div>
                  <span class="wave">~</span>
                  <div class="datepicker">
                    <VueDatePicker 
                      v-model="endDate"
                      :format="formatDate" 
                      date-picker
                      auto-apply
                      @open="isFocused = true"
                      @closed="isFocused = false"
                    />
                  </div>
                </div>
                <button type="button" class="btn" @click="handleSearch">검색</button>
            </div>
        </div>
      </div>
      <div class="row">
        <template v-if="rowList.length > 0">
          <div class="row-list" :class="{ 'is-move': rowListMove }" v-for="(item, index) in rowList" :key="index" ref="rowListRef">
            <div class="row-list-item col-1 is-mob">
              <span class="color-grey">{{ index + 1 }}</span>
            </div>
            <div class="row-list-item">
              <div class="cont-wrap">
                <div class="img-area">
                  <div class="image" :style="{ backgroundImage: `url('/images/default/img_coach_01.png')` }"></div>
                </div>
                <nuxt-link :to="`/swing/list/${index}`" class="info-area">
                  <div class="label" :class="{ 'color-green': item.state === '공개' }">{{ item.state }}</div>
                  <button type="button" class="title">{{ item.title }}</button>
                  <div class="desc">
                    <span class="desc-list">
                      <span class="name">{{ item.name }}</span>
                    </span>
                    <span class="desc-list">
                      <span class="date">{{ item.date }}</span>
                    </span>
                    <span class="desc-list">
                      <span class="location">{{ item.location }}</span>
                    </span>
                  </div>
                </nuxt-link>
                <div class="btn-area">
                  <button type="button" class="btn-md-line btn-primary-purple" @click="modalOpen">수정</button>
                  <button type="button" class="btn-md-line btn-delete">삭제</button>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="row-list is-move" v-else>
          <div class="row-list-item">
            <div class="no-data">데이터가 없습니다.</div>
          </div>
        </div>
        <ul class="pagination-container type02">
          <li>
              <button type="button" class="paginate-buttons" aria-label="이전">
                  <img src="/images/icon/icon_prev.png" alt="icon_prev"/>
              </button>
          </li>
          <li>
              <button type="button" class="paginate-buttons active">1</button>
          </li>
          <li>
              <button type="button" class="paginate-buttons">2</button>
          </li>
          <li>
              <button type="button" class="paginate-buttons">3</button>
          </li> 
          <li>
              <button type="button" class="paginate-buttons" aria-label="더보기">
                  <img src="/images/icon/icon_more_horiz.png" alt="icon_more_horiz" />
              </button>
          </li>
          <li>
              <button type="button" class="paginate-buttons" aria-label="다음">
                  <img src="/images/icon/icon_next.png" alt="icon_next"/>
              </button>
          </li>
        </ul>
      </div>
    </div>

    <modal-swing-info
      :isOpen="modals.modalSwingInfo"
      @update:isOpen="modals.modalSwingInfo = $event"/>

</template>
<script setup>
import { useRouter } from "vue-router";
import { useIntersectionObserver } from "@vueuse/core";
import { useSwingApi } from "~/api/swing";

const startDate = ref(new Date());
const endDate = ref(new Date());
const formatDate = (date) => {
  if (!date) return "";
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}.${month}.${day}`
};
const isFocused = ref(false);
const { _swingList } = useSwingApi();
const router = useRouter();
const rowListRef = ref();
const rowListMove = ref(false);
useIntersectionObserver(
    rowListRef,
    ([{ isIntersecting }]) => {
        if (isIntersecting) {
            rowListMove.value = true;
        }
    },
    {
        threshold: 0
    }
);

const rowList = ref([]);
const pageNo = ref(1);

const getSwingList = async () => {
  try {
    const res = await _swingList({
      pageno: pageNo.value,
      pagesize: 10,
    });

    if (res.code === 200) {
      rowList.value = res.swinglist || [];
    }
  } catch (err) {
    console.error("스윙 리스트 조회 실패", err);
  }
};

const handleSearch = () => {
  pageNo.value = 1;
  getSwingList();
};

onMounted(() => {
  getSwingList();
});

const handleDetail = () => {
  router.push('/swing/list/0')
}

const modals = reactive({ modalMemberInfo: false });
const modalOpen = () => {
  modals['modalSwingInfo'] = true;
  document.querySelector('body').classList.add('is-hidden');
}

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/swing-list.scss';
</style>