<template>
    <div class="manager-list">
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
          <div class="table-head-col">이름</div>
          <div class="table-head-col">ID</div>
          <div class="table-head-col">부서</div>
          <div class="table-head-col">직책</div>
          <div class="table-head-col">번호</div>
          <div class="table-head-col">이메일</div>
          <div class="table-head-col">등록일</div>
          <div class="table-head-col">상태</div>
        </div>
        <div class="table-body">
          <div class="table-body-row" v-for="(item, index) in tableList" :key="index" :class="{ 'is-move': tableMove }" ref="tableRef">
            <div class="table-body-flex">
              <div class="table-body-col">{{ item.name }}</div>
              <div class="table-body-col">
                <nuxt-link :to="`/publish/manager/list/${index}`" class="link">{{ item.id }}</nuxt-link>
              </div>
              <div class="table-body-col">{{ item.part }}</div>
              <div class="table-body-col">{{ item.position }}</div>
              <div class="table-body-col">{{ item.phone }}</div>
              <div class="table-body-col">{{ item.email }}</div>
              <div class="table-body-col">{{ item.join }}</div>
              <div class="table-body-col">{{ item.status }}</div>
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
    name: 'webadminh',
    id: 'admin',
    part: 'Technology Research Center',
    position: 'Team Leader',
    phone: '010-1234-1234',
    email: 'abc@naver.com',
    join: '2026.08.08 09:00',
    status: '정상'
  },
]

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "publish-default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/manager.scss';
</style>