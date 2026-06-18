<template>
    <div class="game-data">

      <!-- 스코어보드(홀) -->
      <div class="game-data-wrap">
        <div class="game-data-title">
          스코어보드(홀)
        </div>
        <div class="game-data-cont">
          <div class="table type03 mob-type02">
          <div class="table-head">
            <div class="table-head-col">닉네임</div>
            <div class="table-head-col">홀</div>
            <div class="table-head-col">파</div>
            <div class="table-head-col is-mob">타수</div>
            <div class="table-head-col is-mob">점수</div>
            <div class="table-head-col is-mob">날짜</div>
            <div class="table-head-col is-mob">완료</div>
          </div>
          <div class="table-body">
            <template v-if="scoreboardList.length > 0">
              <div class="table-body-row" 
                  :class="{ 'is-move': scoreBoardListMove }" 
                  ref="scoreBoardListRef" 
                  v-for="(item, index) in scoreboardList" 
                  :key="index">
                <div v-for="(data, j) in item.holelist" :key="j">
                  <div class="table-body-flex">
                    <div class="table-body-col">
                      {{ item.gameplayerinfo.nickname || '-' }}
                    </div>
                    <div class="table-body-col">
                      {{ data.hole || '-' }}
                    </div>
                    <div class="table-body-col" @click="handleMobHoleList(index)">
                      <span>{{ data.par || '-' }}</span>
                      <button type="button" class="btn-arrow" :class="{ 'is-active': mobHoleListIndex === index }">
                        <img
                          src="/public/images/icon/icon_arrow_down.png"
                          alt="icon_arrow_down"
                        />
                      </button>
                    </div>
                    <div class="table-body-col is-mob">
                      {{ data.shot || '-' }}
                    </div>
                    <div class="table-body-col is-mob">
                      {{ data.score || '-' }}
                    </div>
                    <div class="table-body-col is-mob">
                      <span class="color-grey">{{ data.date || '-' }}</span>
                    </div>
                    <div class="table-body-col is-mob">
                      <span :class="{ 'color-grey': data.flag === '1', 'color-red': data.flag === '2' }">{{ data.flag === '1' ? 'O' : 'X' }}</span>
                    </div>
                  </div>
                  <transition
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @before-leave="beforeLeave"
                    @leave="leave">
                    <div class="table-body-mob" v-if="mobHoleListIndex === index">
                      <dl class="list">
                        <dt class="tit">타수</dt>
                        <dd class="cnt">{{ data.shot || '-' }}</dd>
                      </dl>
                      <dl class="list">
                        <dt class="tit">점수</dt>
                        <dd class="cnt">{{ data.score  || '-' }}</dd>
                      </dl>
                      <dl class="list">
                        <dt class="tit">날짜</dt>
                        <dd class="cnt">
                          <span class="color-grey">{{ data.date || '-' }}</span>
                        </dd>
                      </dl>
                      <dl class="list">
                        <dt class="tit">완료</dt>
                        <dd class="cnt">
                          <span :class="{ 'color-grey': data.flag === '1', 'color-red': data.flag === '2' }">{{ data.flag === '1' ? 'O' : 'X' }}</span>
                        </dd>
                      </dl>
                    </div> 
                  </transition>
                </div>
              </div>
            </template>
            <div class="table-body-row is-move" v-else>
              <div class="no-data">데이터가 없습니다.</div>
            </div>
          </div>
          </div>
        </div>
      </div>

      <!-- 스코어보드(게임) -->
      <div class="game-data-wrap">
        <div class="game-data-title">
          스코어보드(게임)
        </div>
        <div class="game-data-cont">
          <div class="table type03 mob-type02">
          <div class="table-head">
            <div class="table-head-col">닉네임</div>
            <div class="table-head-col">매장명</div>
            <div class="table-head-col is-mob">홀</div>
            <div class="table-head-col is-mob">파</div>
            <div class="table-head-col is-mob">타수</div>
            <div class="table-head-col is-mob">점수</div>
            <div class="table-head-col is-mob">멀리건</div>
            <div class="table-head-col is-mob">날짜</div>
          </div>
          <div class="table-body">
            <template v-if="scoreboardGameList.length > 0">
              <div class="table-body-row" :class="{ 'is-move': scoreBoardGameMove }" ref="scoreBoardGameRef" v-for="(item, index) in scoreboardGameList" :key="index">
                <div class="table-body-flex">
                  <div class="table-body-col">
                    {{ item.total.nickname }}
                  </div>
                  <div class="table-body-col" @click="handleMobGameList(index)">
                    <span>{{ item.total.shopname }}</span>
                    <button type="button" class="btn-arrow" :class="{ 'is-active': mobGameListIndex === index }">
                      <img
                        src="/public/images/icon/icon_arrow_down.png"
                        alt="icon_arrow_down"
                      />
                    </button>
                  </div>
                  <div class="table-body-col is-mob">
                    {{ item.total.totalhole }}
                  </div>
                  <div class="table-body-col is-mob">
                    {{ item.total.totalpar }}
                  </div>
                  <div class="table-body-col is-mob">
                    {{ item.total.totalshot }}
                  </div>
                  <div class="table-body-col is-mob">
                    {{ item.total.totalscore }}
                  </div>
                  <div class="table-body-col is-mob">
                    {{ item.total.totalmulligan }}
                  </div>
                  <div class="table-body-col is-mob">
                    <span class="color-grey">{{ item.total.date }}</span>
                  </div>
                </div>
                <transition
                  @before-enter="beforeEnter"
                  @enter="enter"
                  @before-leave="beforeLeave"
                  @leave="leave">
                  <div class="table-body-mob" v-if="mobGameListIndex === index">
                    <dl class="list">
                      <dt class="tit">홀</dt>
                      <dd class="cnt">{{ item.total.totalhole }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">파</dt>
                      <dd class="cnt">{{ item.total.totalpar }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">타수</dt>
                      <dd class="cnt">{{ item.total.totalshot }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">점수</dt>
                      <dd class="cnt">{{ item.total.totalscore }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">멀리건</dt>
                      <dd class="cnt">{{ item.total.totalmulligan }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">날짜</dt>
                      <dd class="cnt">
                        <span class="color-grey">{{ item.total.date }}</span>
                      </dd>
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
            <nuxt-link to="/manager/game-data" class="btn-md-line">목록보기</nuxt-link>
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
const { _gameDataScore } = useGameDataApi();

// 2026.06.17[cgnoh]: 스코어보드(홀) 리스트
const scoreboardList = ref([]);

// 2026.06.17[cgnoh]: 스코어보드(게임) 리스트
const scoreboardGameList = ref([]);

// 2026.06.17[cgnoh]: 게임리스트 조회
const handleScoreboard = async () => {
  const gameno = route.params.slug;

  if (!gameno) {
    console.error("gameno 없음");
    return;
  }

  const res = await _gameDataScore(gameno);
  scoreboardList.value = res.playerlist;
  scoreboardGameList.value = res.playerlist;

  console.log(res);
};

// 2026.06.17[cgnoh]: 게밍 조회 인터렉션
const tableRef  = ref();
const tableMove = ref(false);
useIntersectionObserver(tableRef, ([{ isIntersecting }]) => {
    if (isIntersecting) tableMove.value = true;
}, { threshold: 0 });

// 2026.06.17[cgnoh]: 스코어보드(홀) 인터렉션
const scoreBoardListRef = ref();
const scoreBoardListMove = ref(false);
useIntersectionObserver(scoreBoardListRef, ([{ isIntersecting }]) => {
    if (isIntersecting) scoreBoardListMove.value = true;
}, { threshold: 0 });

// 2026.06.17[cgnoh]: 스코어보드(게임) 인터렉션
const scoreBoardGameRef = ref();
const scoreBoardGameMove = ref(false);
useIntersectionObserver(scoreBoardGameRef, ([{ isIntersecting }]) => {
    if (isIntersecting) scoreBoardGameMove.value = true;
}, { threshold: 0 });

// 2026.06.17[cgnoh]: 원샷정보 인터렉션
const oneshotListRef = ref();
const oneshotListMove = ref(false);
useIntersectionObserver(oneshotListRef, ([{ isIntersecting }]) => {
    if (isIntersecting) oneshotListMove.value = true;
}, { threshold: 0 });

// 2026.06.17[cgnoh]: 게임정보 인터렉션
const gameinfoListRef = ref();
const gameinfoListMove = ref(false);
useIntersectionObserver(gameinfoListRef, ([{ isIntersecting }]) => {
    if (isIntersecting) gameinfoListMove.value = true;
}, { threshold: 0 });

// 2026.06.17[cgnoh]: 스코어보드(홀) 아코디언
const mobHoleListIndex = ref(-1);
const handleMobHoleList = (index) => {
  if (window.innerWidth <= 768) {
    mobHoleListIndex.value = mobHoleListIndex.value === index ? -1 : index;
  }
};

// 2026.06.17[cgnoh]: 스코어보드(게임) 아코디언
const mobGameListIndex = ref(-1);
const handleMobGameList = (index) => {
  if (window.innerWidth <= 768) {
    mobGameListIndex.value = mobGameListIndex.value === index ? -1 : index;
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

onMounted(() => {
  handleScoreboard();
});

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/game-data.scss';
</style>