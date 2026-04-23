<template>
    <div class="customer-member">
      <div class="filter-box">
        <div class="col-2 flex-end">
            <div class="col d-flex">
                <div class="d-flex">
                    <select>
                        <option>제목</option>
                    </select>
                    <input type="text" v-model="nickname" placeholder="검색어" @keyup.enter="handleSearch">
                </div>
                <button type="button" class="btn" @click="handleSearch">검색</button>
            </div>
        </div>
      </div>
      <div class="top-area">
        <div class="total">전체 <span class="num">{{ tableList.length }}</span></div>
        <div class="select-default"> 
            <select>
                <option value="10">10개씩 보기</option>
                <option value="20">20개씩 보기</option>
                <option value="30">30개씩 보기</option>
                <option value="40">40개씩 보기</option>
                <option value="50">50개씩 보기</option>
                <option value="60">60개씩 보기</option>
                <option value="70">70개씩 보기</option>
                <option value="80">80개씩 보기</option>
                <option value="90">90개씩 보기</option>
                <option value="100">100개씩 보기</option>
            </select>
        </div>
      </div>
      <div class="table type03 mob-type02">
        <div class="table-head">
          <div class="table-head-col col-1">No</div>
          <div class="table-head-col col-1">구분</div>
          <div class="table-head-col">제목</div>
          <div class="table-head-col col-1">등록일</div>
          <div class="table-head-col col-1">조회수</div>
          <div class="table-head-col col-1">상태</div>
          <div class="table-head-col col-1">비고</div>
        </div>
        <div class="table-body">
          <div class="table-body-row" v-for="(item, index) in tableList" :key="index" :class="{ 'is-move': tableMove }" ref="tableRef">
            <div class="table-body-flex">
              <div class="table-body-col col-1">
                <span class="color-grey">{{ index + 1 }}</span>
              </div>
              <div class="table-body-col col-1">
                <span class="label" :class="{ 'color-purple': item.type === '공지', 'color-blue': item.type === '뉴스' }">{{ item.type }}</span>
              </div>
              <div class="table-body-col align-left">
                <nuxt-link :to="`/publish/customer/member/${index}`" class="link" :class="{ 'line-through': item.note === '삭제' }">{{ item.title }}</nuxt-link>
              </div>
              <div class="table-body-col col-1">
                <span class="color-grey">{{ item.date }}</span>
              </div>
              <div class="table-body-col col-1">
                <span class="color-grey">{{ item.count }}</span>
              </div>
              <div class="table-body-col col-1">
                <span class="color-green">{{ item.status }}</span>
              </div>
              <div class="table-body-col col-1">
                <span class="color-green">{{ item.note }}</span>
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
        <div class="btn-wrap">
          <button type="button" class="btn-md-fill btn-primary-purple">등록</button>
        </div>
      </div>
    </div>
</template>
<script setup>
import { useIntersectionObserver } from "@vueuse/core";

const tableRef  = ref();
const tableMove = ref(false);
useIntersectionObserver(tableRef, ([{ isIntersecting }]) => {
    if (isIntersecting) tableMove.value = true;
}, { threshold: 0 });

const tableList = [
  {
    type: '공지',
    title: '[우승자 통계] 매킬로우 미국PGA투어 30승, 메이저 대회 4승',
    date: '2026.08.08',
    count: 44,
    status: '게시',
    note: '정상'
  },
  {
    type: '뉴스',
    title: '[우승자 통계] 매킬로우 미국PGA투어 30승, 메이저 대회 4승',
    date: '2026.08.08',
    count: 44,
    status: '대기',
    note: '정상'
  },
  {
    type: '공지',
    title: '[우승자 통계] 매킬로우 미국PGA투어 30승, 메이저 대회 4승',
    date: '2026.08.08',
    count: 44,
    status: '게시',
    note: '삭제'
  },
]

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "publish-default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/customer.scss';
</style>