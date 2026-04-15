<template>
    <div class="dashboard" :class="{ 'is-move': dashboardMove }" ref="dashboardRef">
      <div class="dashboard-wrap">
        <div class="dashboard-row">
          <div class="dashboard-row-list col-2">
            <div class="title">라운드 요약</div>
            <div class="cont">
              <div class="cont-wrap col-2">
                <div class="cont-wrap-list" v-for="(item, index) in roundList" :key="index">
                  <div class="cont-title">
                    <span>{{ item.type }}</span>
                    <span class="br"> (오늘 / 전체)</span>
                  </div>
                  <div class="cont-info">
                    <div class="cont-data">
                      <strong class="today">{{ item.current }}</strong>
                      <span class="total"> / {{ addComma(item.total) }}</span>
                    </div>
                    <div class="cont-rate">
                      <span class="rate" :class="{ 'is-up': item.rate > 0, 'is-down': item.rate < 0 }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" v-if="item.rate > 0">
                          <path d="M7.21326 4.79675C7.06248 4.94753 6.97012 5.15705 6.97042 5.38716L6.97042 5.48844C6.97042 5.94924 7.34346 6.32227 7.80366 6.32168L12.3566 6.32168L4.65483 14.0234C4.32956 14.3487 4.32956 14.8767 4.65483 15.2019C4.9801 15.5272 5.50807 15.5272 5.83334 15.2019L13.5351 7.50019V12.0531C13.5351 12.5139 13.9081 12.8869 14.3683 12.8864H14.4696C14.9304 12.8864 15.3035 12.5133 15.3029 12.0531V5.38716C15.3029 4.92636 14.9298 4.55333 14.4696 4.55391L7.80366 4.55391C7.57326 4.55391 7.36403 4.64598 7.21326 4.79675Z" fill="#00B34A"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" v-else-if="item.rate < 0">
                          <path d="M12.4996 15.2019C12.6504 15.0511 12.7428 14.8416 12.7425 14.6115L12.7425 14.5102C12.7425 14.0494 12.3694 13.6764 11.9092 13.677L7.35631 13.677L15.0581 5.97522C15.3833 5.64995 15.3833 5.12198 15.0581 4.79671C14.7328 4.47144 14.2048 4.47144 13.8796 4.79671L6.1778 12.4985V7.94554C6.1778 7.48475 5.80476 7.11171 5.34455 7.1123H5.24327C4.78248 7.1123 4.40944 7.48534 4.41003 7.94554V14.6115C4.41003 15.0723 4.78306 15.4453 5.24327 15.4447L11.9092 15.4447C12.1396 15.4447 12.3489 15.3527 12.4996 15.2019Z" fill="#EF2B49"/>
                        </svg>
                        <span class="text">
                          <span v-if="item.rate > 0">+</span>
                          <span v-else-if="item.rate < 0">+</span>
                          {{ item.rate }}% 지난주 대비
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="dashboard-row-list flex-column">
            <div class="title">토너먼트 요약</div>
            <div class="cont">
              <div class="cont-wrap flex-column">
                <div class="cont-wrap-list" v-for="(item, index) in tournamentList" :key="index">
                  <div class="cont-title">
                    <span>{{ item.type }}</span>
                    <span class="br"> (오늘 / 전체)</span>
                  </div>
                  <div class="cont-info">
                    <div class="cont-data">
                      <strong class="today">{{ item.current }}</strong>
                      <span class="total"> / {{ addComma(item.total) }}</span>
                    </div>
                    <div class="cont-rate">
                      <span class="rate" :class="{ 'is-up': item.rate > 0, 'is-down': item.rate < 0 }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" v-if="item.rate > 0">
                          <path d="M7.21326 4.79675C7.06248 4.94753 6.97012 5.15705 6.97042 5.38716L6.97042 5.48844C6.97042 5.94924 7.34346 6.32227 7.80366 6.32168L12.3566 6.32168L4.65483 14.0234C4.32956 14.3487 4.32956 14.8767 4.65483 15.2019C4.9801 15.5272 5.50807 15.5272 5.83334 15.2019L13.5351 7.50019V12.0531C13.5351 12.5139 13.9081 12.8869 14.3683 12.8864H14.4696C14.9304 12.8864 15.3035 12.5133 15.3029 12.0531V5.38716C15.3029 4.92636 14.9298 4.55333 14.4696 4.55391L7.80366 4.55391C7.57326 4.55391 7.36403 4.64598 7.21326 4.79675Z" fill="#00B34A"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" v-else-if="item.rate < 0">
                          <path d="M12.4996 15.2019C12.6504 15.0511 12.7428 14.8416 12.7425 14.6115L12.7425 14.5102C12.7425 14.0494 12.3694 13.6764 11.9092 13.677L7.35631 13.677L15.0581 5.97522C15.3833 5.64995 15.3833 5.12198 15.0581 4.79671C14.7328 4.47144 14.2048 4.47144 13.8796 4.79671L6.1778 12.4985V7.94554C6.1778 7.48475 5.80476 7.11171 5.34455 7.1123H5.24327C4.78248 7.1123 4.40944 7.48534 4.41003 7.94554V14.6115C4.41003 15.0723 4.78306 15.4453 5.24327 15.4447L11.9092 15.4447C12.1396 15.4447 12.3489 15.3527 12.4996 15.2019Z" fill="#EF2B49"/>
                        </svg>
                        <span class="text">
                          <span v-if="item.rate > 0">+</span>
                          <span v-else-if="item.rate < 0">+</span>
                          {{ item.rate }}% 지난주 대비
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dashboard-row">
          <div class="dashboard-row-list col-2">
            <div class="title">예약</div>
            <div class="cont">
              <div class="cont-wrap col-2">
                <div class="cont-wrap-list" v-for="(item, index) in reservationList" :key="index">
                  <div class="cont-title">
                    <span>{{ item.type }}</span>
                    <span class="br"> (오늘 / 전체)</span>
                  </div>
                  <div class="cont-data">
                    <strong class="today">{{ item.current }}</strong>
                    <span class="total"> / {{ addComma(item.total) }}</span>
                  </div>
                  <div class="cont-rate">
                    <span class="rate" :class="{ 'is-up': item.rate > 0, 'is-down': item.rate < 0 }">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" v-if="item.rate > 0">
                        <path d="M7.21326 4.79675C7.06248 4.94753 6.97012 5.15705 6.97042 5.38716L6.97042 5.48844C6.97042 5.94924 7.34346 6.32227 7.80366 6.32168L12.3566 6.32168L4.65483 14.0234C4.32956 14.3487 4.32956 14.8767 4.65483 15.2019C4.9801 15.5272 5.50807 15.5272 5.83334 15.2019L13.5351 7.50019V12.0531C13.5351 12.5139 13.9081 12.8869 14.3683 12.8864H14.4696C14.9304 12.8864 15.3035 12.5133 15.3029 12.0531V5.38716C15.3029 4.92636 14.9298 4.55333 14.4696 4.55391L7.80366 4.55391C7.57326 4.55391 7.36403 4.64598 7.21326 4.79675Z" fill="#00B34A"/>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" v-else-if="item.rate < 0">
                        <path d="M12.4996 15.2019C12.6504 15.0511 12.7428 14.8416 12.7425 14.6115L12.7425 14.5102C12.7425 14.0494 12.3694 13.6764 11.9092 13.677L7.35631 13.677L15.0581 5.97522C15.3833 5.64995 15.3833 5.12198 15.0581 4.79671C14.7328 4.47144 14.2048 4.47144 13.8796 4.79671L6.1778 12.4985V7.94554C6.1778 7.48475 5.80476 7.11171 5.34455 7.1123H5.24327C4.78248 7.1123 4.40944 7.48534 4.41003 7.94554V14.6115C4.41003 15.0723 4.78306 15.4453 5.24327 15.4447L11.9092 15.4447C12.1396 15.4447 12.3489 15.3527 12.4996 15.2019Z" fill="#EF2B49"/>
                      </svg>
                      <span class="text">
                        <span v-if="item.rate > 0">+</span>
                        <span v-else-if="item.rate < 0">+</span>
                        {{ item.rate }}% 지난주 대비
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="dashboard-row-list col-3">
            <div class="title">이벤트</div>
            <div class="cont">
              <div class="cont-wrap flex-column">
                <div class="cont-wrap-list" v-for="(item, index) in eventList" :key="index">
                  <div class="cont-title">
                    <span>{{ item.type }}</span>
                    <span class="br"> (오늘 / 전체)</span>
                  </div>
                  <div class="cont-info">
                    <div class="cont-data">
                      <strong class="today">{{ item.current }}</strong>
                      <span class="total"> / {{ addComma(item.total) }}</span>
                    </div>
                    <div class="cont-rate">
                      <span class="rate" :class="{ 'is-up': item.rate > 0, 'is-down': item.rate < 0 }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" v-if="item.rate > 0">
                          <path d="M7.21326 4.79675C7.06248 4.94753 6.97012 5.15705 6.97042 5.38716L6.97042 5.48844C6.97042 5.94924 7.34346 6.32227 7.80366 6.32168L12.3566 6.32168L4.65483 14.0234C4.32956 14.3487 4.32956 14.8767 4.65483 15.2019C4.9801 15.5272 5.50807 15.5272 5.83334 15.2019L13.5351 7.50019V12.0531C13.5351 12.5139 13.9081 12.8869 14.3683 12.8864H14.4696C14.9304 12.8864 15.3035 12.5133 15.3029 12.0531V5.38716C15.3029 4.92636 14.9298 4.55333 14.4696 4.55391L7.80366 4.55391C7.57326 4.55391 7.36403 4.64598 7.21326 4.79675Z" fill="#00B34A"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" v-else-if="item.rate < 0">
                          <path d="M12.4996 15.2019C12.6504 15.0511 12.7428 14.8416 12.7425 14.6115L12.7425 14.5102C12.7425 14.0494 12.3694 13.6764 11.9092 13.677L7.35631 13.677L15.0581 5.97522C15.3833 5.64995 15.3833 5.12198 15.0581 4.79671C14.7328 4.47144 14.2048 4.47144 13.8796 4.79671L6.1778 12.4985V7.94554C6.1778 7.48475 5.80476 7.11171 5.34455 7.1123H5.24327C4.78248 7.1123 4.40944 7.48534 4.41003 7.94554V14.6115C4.41003 15.0723 4.78306 15.4453 5.24327 15.4447L11.9092 15.4447C12.1396 15.4447 12.3489 15.3527 12.4996 15.2019Z" fill="#EF2B49"/>
                        </svg>
                        <span class="text">
                          <span v-if="item.rate > 0">+</span>
                          <span v-else-if="item.rate < 0">+</span>
                          {{ item.rate }}% 지난주 대비
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dashboard-wrap">
        <div class="dashboard-row">
          <div class="dashboard-row-list">
            <div class="title">공지</div>
            <div class="table type03 mob-type01">
              <div class="table-head is-mob">
                <div class="table-head-col col-2">No</div>
                <div class="table-head-col col-2">카테고리</div>
                <div class="table-head-col">제목</div>
                <div class="table-head-col col-2">날짜</div>
              </div>
              <div class="table-body">
                <div class="table-body-row" v-for="(item, index) in tableList" :key="index">
                  <div class="table-body-flex">
                    <div class="table-body-col col-2 is-pc">
                      <span>{{ index + 1 }}</span>
                    </div>
                    <div class="table-body-col col-2">
                      <span class="fs-12">{{ item.category }}</span>
                    </div>
                    <div class="table-body-col align-left">
                      <nuxt-link :to="`/publish/settings/post/${index}`" class="text">{{ item.title }}</nuxt-link>
                    </div>
                    <div class="table-body-col col-2">
                      <span class="color-grey">{{ item.date }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import { useIntersectionObserver } from '@vueuse/core'

// 2026.03.26[cgnoh]: 인터렉션 관련
const dashboardRef = ref(null);
const dashboardMove = ref(false);

useIntersectionObserver(
  dashboardRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) dashboardMove.value = true
  },
  { threshold: 0 }
);

// 2026.03.04[cgnoh]: 라운드 요약
const roundList = ref([
  {
    type: '전체 라운드',
    current: 56,
    total: 89935,
    rate: 1.01
  },
  {
    type: '전체 회원',
    current: 102,
    total: 89935,
    rate: -1.01
  }
]);

// 2026.03.04[cgnoh]: 토너먼트 요약
const tournamentList = ref([
  {
    type: '토너먼트',
    current: 12,
    total: 89935,
    rate: 1.01
  },
  {
    type: '라운딩',
    current: 55,
    total: 89935,
    rate: -1.01
  },
  {
    type: '전체 회원',
    current: 99,
    total: 89935,
    rate: 1.01
  }
]);

// 2026.03.04[cgnoh]: 예약
const reservationList = ref([
  {
    type: '전체 라운드',
    current: 55,
    total: 89935,
    rate: 1.01
  },
  {
    type: '전체 회원',
    current: 102,
    total: 89935,
    rate: -1.01
  }
]);

// 2026.03.04[cgnoh]: 이벤트
const eventList = ref([
  {
    type: '토너먼트',
    current: 12,
    total: 89935,
    rate: 1.01
  },
  {
    type: '라운딩',
    current: 55,
    total: 89935,
    rate: -1.01
  },
  {
    type: '전체 회원',
    current: 99,
    total: 89935,
    rate: 1.01
  }
]);

// 2026.03.04[cgnoh]: 공지
const tableList = ref([
  {
    category: 'Category 1',
    title: '경기도 용인의 수원 컨트리클럽(파72/6597야드)에서  한국여자프로골프(KLPGA) 투어 NH투자증권 레이디스 챔피언십 경기경기도 용인의 수원 컨트리클럽(파72/6597야드)에서  한국여자프로골프(KLPGA) 투어 NH투자증권 레이디스 챔피언십 경기경기도 용인의 수원 컨트리클럽(파72/6597야드)에서  한국여자프로골프(KLPGA) 투어 NH투자증권 레이디스 챔피언십 경기',
    date: '2026.08.08'
  },
  {
    category: 'Category 2',
    title: '경기도 용인의 수원 컨트리클럽(파72/6597야드)에서  한국여자프로골프(KLPGA) 투어 NH투자증권 레이디스 챔피언십 경기경기도 용인의 수원 컨트리클럽(파72/6597야드)에서  한국여자프로골프(KLPGA) 투어 NH투자증권 레이디스 챔피언십 경기',
    date: '2026.08.08'
  },
  {
    category: 'Category 3',
    title: '경기도 용인의 수원 컨트리클럽(파72/6597야드)에서  한국여자프로골프(KLPGA) 투어 NH투자증권 레이디스 챔피언십 경기경기도 용인의 수원 컨트리클럽(파72/6597야드)에서  한국여자프로골프(KLPGA) 투어 NH투자증권 레이디스 챔피언십 경기',
    date: '2026.08.08'
  },
  {
    category: 'Category 4',
    title: '경기도 용인의 수원 컨트리클럽(파72/6597야드)에서  한국여자프로골프(KLPGA) 투어 NH투자증권 레이디스 챔피언십 경기경기도 용인의 수원 컨트리클럽(파72/6597야드)에서  한국여자프로골프(KLPGA) 투어 NH투자증권 레이디스 챔피언십 경기',
    date: '2026.08.08'
  }
])

// 2026.03.04[cgnoh]: 천단위 콤마
const addComma = (number) => {
  return String(number)
    .toString()
    .replaceAll(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "publish-default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/dashboard.scss';

</style>