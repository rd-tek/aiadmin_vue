<template>
    <div class="membership-member">
      <div class="filter-box">
        <div class="col-2">
            <div class="col d-flex">
              <div class="select-default"> 
                <select>
                  <option>전체</option>
                </select>
              </div>
              <div class="select-default"> 
                <select>
                  <option>전체</option>
                </select>
              </div>
            </div>
            <div class="col d-flex flex-column">
                <div class="d-flex">
                    <select>
                        <option>이름</option>
                    </select>
                    <input type="text" v-model="nickname" placeholder="닉네임" @keyup.enter="handleSearch">
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
          <div class="table-head-col col-1 align-left">No</div>
          <div class="table-head-col">아이디</div>
          <div class="table-head-col is-mob">닉네임</div>
          <div class="table-head-col is-mob">이메일</div>
          <div class="table-head-col is-mob">인증</div>
          <div class="table-head-col is-mob">성별</div>
          <div class="table-head-col is-mob">단골매장</div>
          <div class="table-head-col is-mob">가입일</div>
          <div class="table-head-col is-mob">상태</div>
        </div>
        <div class="table-body">
          <div class="table-body-row" 
               v-for="(item, index) in tableList" 
               :key="index" 
               :class="{ 'is-move': tableMove }" 
               ref="tableRef">
            <div class="table-body-flex">
              <div class="table-body-col col-1 align-left">
                <span>{{ index + 1 }}</span>
              </div>
              <div class="table-body-col" @click="handleMobList(index)">
                <nuxt-link :to="`/publish/membership/member/${index}`" class="link text-underline">{{ item.id }}</nuxt-link>
                <button type="button" class="btn-arrow" :class="{ 'is-active': mobListIndex === index }">
                  <img
                    src="/public/images/icon/icon_arrow_down.png"
                    alt="icon_arrow_down"
                  />
                </button>
              </div>
              <div class="table-body-col is-mob">
                <button type="button" @click="modalOpen" class="color-purple text-underline">{{ item.nickname }}</button>
              </div>
              <div class="table-body-col is-mob">
                <span class="no-wrap">{{ item.email }}</span>
              </div>
              <div class="table-body-col is-mob">
                <b v-if="item.auth === '인증'">{{ item.auth }}</b>
                <span v-else-if="item.auth === '미인증'" class="color-grey">{{ item.auth }}</span>
              </div>
              <div class="table-body-col is-mob">{{ item.gender }}</div>
              <div class="table-body-col is-mob">{{ item.shop }}</div>
              <div class="table-body-col is-mob"><span class="color-grey">{{ item.join }}</span></div>
              <div class="table-body-col is-mob">
                <span v-if="item.status === '정상'" class="color-green">{{ item.status }}</span>
                <span v-else-if="item.status === '삭제'" class="color-red">{{ item.status }}</span>
              </div>
            </div>
            <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @before-leave="beforeLeave"
                @leave="leave">
              <div class="table-body-mob" v-if="mobListIndex === index">
                <dl class="list">
                  <dt class="tit">닉네임</dt>
                  <dd class="cnt">
                    <a class="color-purple" @click="modalOpen">{{ item.nickname }}</a>
                  </dd>
                </dl>
                <dl class="list">
                  <dt class="tit">이메일</dt>
                  <dd class="cnt">{{ item.email }}</dd>
                </dl>
                <dl class="list">
                  <dt class="tit">인증</dt>
                  <dd class="cnt">
                    <b>{{ item.auth }}</b>
                  </dd>
                </dl>
                <dl class="list">
                  <dt class="tit">성별</dt>
                  <dd class="cnt">{{ item.gender }}</dd>
                </dl>
                <dl class="list">
                  <dt class="tit">단골매장</dt>
                  <dd class="cnt">{{ item.shop }}</dd>
                </dl>
                <dl class="list">
                  <dt class="tit">가입일</dt>
                  <dd class="cnt">
                    <span class="color-grey">{{ item.join }}</span>
                  </dd>
                </dl>
                <dl class="list">
                  <dt class="tit">상태</dt>
                  <dd class="cnt">
                    <span class="color-green">{{ item.status }}</span>
                  </dd>
                </dl>
              </div>
            </transition>
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

    <modal-member-info
      :isOpen="modals.modalMemberInfo"
      @update:isOpen="modals.modalMemberInfo = $event"/>

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
    id: 'abc1234',
    nickname: '골프천재 골린이1',
    email: 'abc1234@naver.com',
    auth: '인증',
    gender: '남',
    shop: '강남스크린',
    join: '2026.08.08',
    status: '정상'
  },
  {
    id: 'abc1234',
    nickname: '골프천재 골린이1',
    email: 'abc1234@naver.com',
    auth: '인증',
    gender: '남',
    shop: '강남스크린',
    join: '2026.08.08',
    status: '삭제'
  },
  {
    id: 'abc1234',
    nickname: '골프천재 골린이1',
    email: 'abc1234@naver.com',
    auth: '미인증',
    gender: '남',
    shop: '강남스크린',
    join: '2026.08.08',
    status: '정상'
  }
]

const modals = reactive({ modalMemberInfo: false });
const modalOpen = () => {
    modals['modalMemberInfo'] = true;
    document.querySelector('body').classList.add('is-hidden');
}

const mobListIndex = ref(-1);
const handleMobList = (index) => {
  if (window.innerWidth <= 768) {
    mobListIndex.value = mobListIndex.value === index ? -1 : index;
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

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "publish-default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/membership.scss';
</style>