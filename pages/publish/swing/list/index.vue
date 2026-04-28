<template>
    <div class="swing-list">
      <div class="filter-box">
        <div class="col-2 flex-end">
            <div class="col d-flex">
                <div class="d-flex">
                  <div class="datepicker">
                    <VueDatePicker 
                      v-model="month"
                      :format="formatMonth" 
                      date-picker
                      auto-apply
                      @open="isFocused = true"
                      @closed="isFocused = false"
                    />
                  </div>
                  <span class="wave">~</span>
                  <div class="datepicker">
                    <VueDatePicker 
                      v-model="month"
                      :format="formatMonth" 
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
        <div class="row-list" :class="{ 'is-move': rowListMove }" v-for="(item, index) in rowList" :key="index" ref="rowListRef">
          <div class="row-list-item col-1">
            <div class="checkbox">
              <div class="check-box">
                <input type="checkbox" :id="`chk_${index}`" :name="`chk_${index}`">
                <label :for="`chk_${index}`">
                  <span class="check-box-item">
                      <i class="item-line" />
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div class="row-list-item">
            <div class="cont-wrap">
              <div class="img-area">
                <div class="image" :style="{ backgroundImage: `url('/images/default/img_coach_01.png')` }"></div>
              </div>
              <nuxt-link :to="`/publish/swing/list/${index}`" class="info-area">
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

const rowList = [
  {
    state: '공개',
    title: '굿샷입니다.',
    name: '골프왕',
    date: '2024.10.12 09:10:00',
    location: 'XGOLF 대전'
  },
  {
    state: '비공개',
    title: '굿샷입니다.',
    name: '골프왕',
    date: '2024.10.12 09:10:00',
    location: 'XGOLF 대전'
  },
  {
    state: '공개',
    title: '굿샷입니다.',
    name: '골프왕',
    date: '2024.10.12 09:10:00',
    location: 'XGOLF 대전'
  }
]

const handleDetail = () => {
  router.push('/publish/swing/list/0')
}

const modals = reactive({ modalMemberInfo: false });
const modalOpen = () => {
  modals['modalSwingInfo'] = true;
  document.querySelector('body').classList.add('is-hidden');
}

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "publish-default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/swing-list.scss';
</style>