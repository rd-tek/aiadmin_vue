<template>
    <div class="game-data">

      <!-- 원샷정보 -->
      <div class="game-data-wrap">
        <div class="game-data-title">
          원샷정보
        </div>
        <div class="game-data-cont">
          <div class="table type03 mob-type02">
          <div class="table-head">
            <div class="table-head-col">닉네임</div>
            <div class="table-head-col">홀번호</div>
            <div class="table-head-col">샷번호</div>
            <div class="table-head-col is-mob">클럽</div>
            <div class="table-head-col is-mob">비거리</div>
            <div class="table-head-col is-mob">남은거리</div>
            <div class="table-head-col is-mob">스코어</div>
            <div class="table-head-col is-mob">지형</div>
            <div class="table-head-col is-mob">등록일</div>
            <div class="table-head-col is-mob">멀리건</div>
          </div>
          <div class="table-body">
            <template v-if="oneshotList.length > 0">
              <div class="table-body-row" 
                  :class="{ 'is-move': oneshotListMove }" 
                  ref="oneshotListRef" 
                  v-for="(item, index) in oneshotList" 
                  :key="index">
                <div class="table-body-flex">
                  <div class="table-body-col">
                    {{ item.playernickname }}
                  </div>
                  <div class="table-body-col">
                    {{ item.hole }}
                  </div>
                  <div class="table-body-col" @click="handleMobOneshotList(index)">
                    <span>{{ item.shotno }}</span>
                    <button type="button" class="btn-arrow" :class="{ 'is-active': mobOneshotListIndex === index }">
                      <img
                        src="/public/images/icon/icon_arrow_down.png"
                        alt="icon_arrow_down"
                      />
                    </button>
                  </div>
                  <div class="table-body-col is-mob">
                    {{ item.club }}
                  </div>
                  <div class="table-body-col is-mob">
                    {{ item.distance }}
                  </div>
                  <div class="table-body-col is-mob">
                    {{ item.remain }}
                  </div>
                  <div class="table-body-col is-mob">
                    {{ item.shotscore }}
                  </div>
                  <div class="table-body-col is-mob">
                    {{ item.terrain }}
                  </div>
                  <div class="table-body-col is-mob">
                    <span class="color-grey">{{ item.date }}</span>
                  </div>
                  <div class="table-body-col is-mob">
                    {{ item.mulliganflag }}
                  </div>
                </div>
                <transition
                  @before-enter="beforeEnter"
                  @enter="enter"
                  @before-leave="beforeLeave"
                  @leave="leave">
                  <div class="table-body-mob" v-if="mobOneshotListIndex === index">
                    <dl class="list">
                      <dt class="tit">클럽</dt>
                      <dd class="cnt">{{ item.playernickname }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">비거리</dt>
                      <dd class="cnt">{{ item.distance }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">남은거리</dt>
                      <dd class="cnt">{{ item.remain }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">스코어</dt>
                      <dd class="cnt">{{ item.shotscore }}</dd>
                    </dl> 
                    <dl class="list">
                      <dt class="tit">멀리건</dt>
                      <dd class="cnt">{{ item.mulliganflag }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">지형</dt>
                      <dd class="cnt">{{ item.terrain }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">등록일</dt>
                      <dd class="cnt">
                        <span class="color-grey">{{ item.date }}</span>
                      </dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">클럽</dt>
                      <dd class="cnt">{{ item.club }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">홀</dt>
                      <dd class="cnt">{{ item.hole }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">샷 번호</dt>
                      <dd class="cnt">{{ item.shotno }}</dd>
                    </dl>
                  </div>
                </transition>
              </div>
            </template>
            <div class="table-body-row is-move" v-else>
              <div class="no-data">데이터가 없습니다.</div>
            </div>
          </div>
          </div>
          <div class="btn-wrap">
            <nuxt-link to="/manager/game-data" class="btn-md-line">목록 보기</nuxt-link>
          </div>
        </div>
      </div>

    </div>
</template>
<script setup>
import { useIntersectionObserver } from "@vueuse/core";
import { useGameDataApi } from "@/api/gamedata";
import { useRoute } from "vue-router";

// 2026.03.04[cgnoh]: 라우터 설정
const route = useRoute();

// 2026.06.16[cgnoh]: api 관련
const { _gameOneShot } = useGameDataApi();

// 2026.06.17[cgnoh]: 게임리스트 조회
const handleGameOneShot = async () => {
  const gameno = route.params.slug;

  if (!gameno) {
    console.error("gameno 없음");
    return;
  }

  const res = await _gameOneShot(gameno);
  oneshotList.value = res.shotlist

  console.log(res);
};

// 2026.06.17[cgnoh]: 원샷정보 인터렉션
const oneshotList = ref({});
const oneshotListRef = ref();
const oneshotListMove = ref(false);
useIntersectionObserver(oneshotListRef, ([{ isIntersecting }]) => {
    if (isIntersecting) oneshotListMove.value = true;
}, { threshold: 0 });

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

const mobOneshotListIndex = ref(-1);
const handleMobOneshotList = (index) => {
  if (window.innerWidth <= 768) {
    mobOneshotListIndex.value = mobOneshotListIndex.value === index ? -1 : index;
  }
};

onMounted(() => {
  handleGameOneShot();
});

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/game-data.scss';
</style>