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
          <div class="table-head-col">No</div>
          <div class="table-head-col">이름</div>
          <div class="table-head-col is-mob">ID</div>
          <div class="table-head-col is-mob">부서</div>
          <div class="table-head-col is-mob">직급</div>
          <div class="table-head-col is-mob">연락처</div>
          <div class="table-head-col is-mob">이메일</div>
          <div class="table-head-col is-mob">등록일</div>
          <div class="table-head-col is-mob">상태</div>
        </div>
        <div class="table-body">
          <div class="table-body-row" v-for="(item, index) in tableList" :key="index" :class="{ 'is-move': tableMove }" ref="tableRef">
            <div class="table-body-flex" :class="{ 'is-active': mobListIndex === index }">
              <div class="table-body-col">{{ index + 1 }}</div>
              <div class="table-body-col" @click="handleMobList(index)">
                <span>{{ item.name }}</span>
                <button type="button" class="btn-arrow" :class="{ 'is-active': mobListIndex === index }">
                  <img
                    src="/public/images/icon/icon_arrow_down.png"
                    alt="icon_arrow_down"
                  />
                </button>
              </div>
              <div class="table-body-col is-mob">
                <nuxt-link :to="`/publish/manager/list/${index}`" class="link">{{ item.id }}</nuxt-link>
              </div>
              <div class="table-body-col is-mob">{{ item.part }}</div>
              <div class="table-body-col is-mob">{{ item.position }}</div>
              <div class="table-body-col is-mob">{{ item.phone }}</div>
              <div class="table-body-col is-mob">{{ item.email }}</div>
              <div class="table-body-col is-mob">
                <span class="color-grey">{{ item.join }}</span>
              </div>
              <div class="table-body-col is-mob">
                <span class="color-green">{{ item.status }}</span>
              </div>
            </div>
            <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @before-leave="beforeLeave"
                @leave="leave">
              <div class="table-body-mob" v-if="mobListIndex === index">
                <dl class="list">
                  <dt class="tit">아이디</dt>
                  <dd class="cnt">
                    <nuxt-link :to="`/publish/manager/list/${index}`" class="link">{{ item.id }}</nuxt-link>
                  </dd>
                </dl>
                <dl class="list">
                  <dt class="tit">부서</dt>
                  <dd class="cnt">{{ item.part }}</dd>
                </dl>
                <dl class="list"> 
                  <dt class="tit">직급</dt>
                  <dd class="cnt">{{ item.position }}</dd>
                </dl>
                <dl class="list">
                  <dt class="tit">연락처</dt>
                  <dd class="cnt">{{ item.phone }}</dd>
                </dl>
                <dl class="list">
                  <dt class="tit">이메일</dt>
                  <dd class="cnt">{{ item.email }}</dd>
                </dl>
                <dl class="list">
                  <dt class="tit">등록일</dt>
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
        <div class="btn-wrap">
          <button type="button" class="btn-primary-purple btn-md-fill" @click="handleRegister">등록</button>
        </div>
      </div>
    </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useIntersectionObserver } from "@vueuse/core";

const router = useRouter();
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

const handleRegister = () => {
  router.push(`/publish/manager/write`)
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
@use '@/assets/scss/pages/manager.scss';
</style>