<template>
  <header
    class="header"
    :class="{ 'is-active': isScrolledDown }"
    ref="headerRef"
  >
    <div class="is-pc">
      <div class="header-bg" :class="{ 'is-active': isGnbDepth }"></div>
      <div class="header-wrap" ref="headerWrap">
        <nuxt-link to="/" class="logo">
          <img src="/images/default/img_logo.png" alt="x-coach" />
        </nuxt-link>
        <ul class="menu">
          <li
            class="menu-list"
            v-for="(item, i) in menuList"
            :key="i"
            @mouseleave="handleMouseLeave"
            @mouseover="handleMouseOver(i, item)"
          >
            <a
              @click="goToMenu(item)"
              class="menu-list-item"
              :class="{ 'is-active': gnbIndex === i || route.path.includes(item.link) || route.path.includes(item.path) }"
              >{{ item.name }}</a
            >
            <ul class="depth" v-if="gnbDepthIndex === i">
              <li
                class="depth-list"
                v-for="(depth, j) in item.children"
                :key="j"
              >
                <a
                  class="depth-list-item"
                  :class="{ 'is-active': gnbDepthIndex === j }"
                  @click="handleGnbDepth(depth, j)"
                  >{{ depth.name }}</a
                >
              </li>
            </ul>
          </li>
        </ul>
        <div class="login-user">
          <div class="login" v-if="!isLogin">
            <button
              type="button"
              class="btn-primary-teal btn-md-fill"
              @click="goToLogin"
            >
              로그인
            </button>
          </div>
          <div class="user" v-else>
            <div class="user-alarm">
              <div class="tooltip tooltip-alarm" ref="tooltipAlarmRef">
                <transition name="fade">
                  <div class="tooltip-container" v-if="tooltipShow">
                    <div class="tooltip-header">
                      <span class="tit">알림</span>
                    </div>
                    <div class="tooltip-body">
                      <div class="content">
                        <div class="content-list" v-for="(item, index) in notification" :key="index">
                          <p class="content-title">
                            <span 
                              class="label">[{{ item.not_type }}]</span>
                          </p>
                          <p class="content-desc" @click="_notificationRead(item)">
                            {{ item.not_message }}
                          </p>
                          <p class="content-date">{{common.dateformat(item.timezone_regdate)}}</p>
                        </div>
                        <div class="content-list" v-if="notification.length === 0">
                          <p class="no-data">알림이 없습니다.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
                <button
                  type="button"
                  class="btn-alarm"
                  @click="handleAlarmTooltip"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <mask
                      id="mask0_1354_18989"
                      style="mask-type: alpha"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                    >
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_1354_18989)">
                      <path
                        d="M4 19V17H6V10C6 8.61667 6.41667 7.3875 7.25 6.3125C8.08333 5.2375 9.16667 4.53333 10.5 4.2V3.5C10.5 3.08333 10.6458 2.72917 10.9375 2.4375C11.2292 2.14583 11.5833 2 12 2C12.4167 2 12.7708 2.14583 13.0625 2.4375C13.3542 2.72917 13.5 3.08333 13.5 3.5V4.2C14.8333 4.53333 15.9167 5.2375 16.75 6.3125C17.5833 7.3875 18 8.61667 18 10V17H20V19H4ZM12 22C11.45 22 10.9792 21.8042 10.5875 21.4125C10.1958 21.0208 10 20.55 10 20H14C14 20.55 13.8042 21.0208 13.4125 21.4125C13.0208 21.8042 12.55 22 12 22ZM8 17H16V10C16 8.9 15.6083 7.95833 14.825 7.175C14.0417 6.39167 13.1 6 12 6C10.9 6 9.95833 6.39167 9.175 7.175C8.39167 7.95833 8 8.9 8 10V17Z"
                        fill="#fff"
                      />
                    </g>
                  </svg>
                  <span class="num" v-if="!tooltipShow">1</span>
                </button>
              </div>
            </div>
            <div class="user-icon" @click="handleTooltip($event)" :style="{ backgroundImage: `url(${common.getImg(binary_filepath)})`}">
              <transition name="fade">
                <div class="tooltip" v-if="showTooltip" ref="tooltipInfoRef">
                  <div class="tooltip-wrap">
                    <span class="name">{{ nickname }}</span><span class="text">님</span>
                  </div>
                  <nuxt-link to="/" class="tooltip-wrap">
                    대시보드
                  </nuxt-link>
                  <nuxt-link
                    to="/membership/info"
                    class="tooltip-wrap"
                  >
                    나의정보
                  </nuxt-link>
                  <button
                    type="button"
                    class="tooltip-wrap"
                    @click="handleLogout"
                  >
                    로그아웃
                  </button>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mob-menu is-mob">
      <button type="button" class="btn-menu" @click="handleMenu" aria-label="메뉴">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M18 13C18 13.5523 17.4801 14 16.8387 14L1.16129 14C0.519928 14 -6.78526e-08 13.5523 -4.37114e-08 13C-1.95703e-08 12.4477 0.519928 12 1.16129 12L16.8387 12C17.4801 12 18 12.4477 18 13Z" fill="#fff"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M18 7C18 7.55228 17.5523 8 17 8L1 8C0.447716 8 -6.78525e-08 7.55228 -4.37114e-08 7C-1.95703e-08 6.44771 0.447716 6 1 6L17 6C17.5523 6 18 6.44772 18 7Z" fill="#fff"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M18 0.999998C18 1.55228 17.4801 2 16.8387 2L1.16129 2C0.519928 2 -6.78526e-08 1.55229 -4.37115e-08 1C-1.95704e-08 0.447719 0.519928 3.94468e-06 1.16129 3.7939e-06L16.8387 -5.07615e-08C17.4801 -2.61145e-07 18 0.447714 18 0.999998Z" fill="#fff"/>
        </svg>
      </button>
      <nuxt-link to="/" class="logo" v-if="route.name === 'index'">
        <img src="/public/images/default/img_logo.png" alt="img_logo" />
      </nuxt-link>
      <div class="title" v-else>{{ pageTitle }}</div>
      <div class="btn-wrapper">
        <div
          class="btn-wrapper-list tooltip tooltip-alarm"
          ref="tooltipRef"
          @click="handleAlarm"
          v-if="isLogin"
        >
          <button type="button" class="btn-alarm" aria-label="알림">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <mask
                id="mask0_1354_18989"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_1354_18989)">
                <path
                  d="M4 19V17H6V10C6 8.61667 6.41667 7.3875 7.25 6.3125C8.08333 5.2375 9.16667 4.53333 10.5 4.2V3.5C10.5 3.08333 10.6458 2.72917 10.9375 2.4375C11.2292 2.14583 11.5833 2 12 2C12.4167 2 12.7708 2.14583 13.0625 2.4375C13.3542 2.72917 13.5 3.08333 13.5 3.5V4.2C14.8333 4.53333 15.9167 5.2375 16.75 6.3125C17.5833 7.3875 18 8.61667 18 10V17H20V19H4ZM12 22C11.45 22 10.9792 21.8042 10.5875 21.4125C10.1958 21.0208 10 20.55 10 20H14C14 20.55 13.8042 21.0208 13.4125 21.4125C13.0208 21.8042 12.55 22 12 22ZM8 17H16V10C16 8.9 15.6083 7.95833 14.825 7.175C14.0417 6.39167 13.1 6 12 6C10.9 6 9.95833 6.39167 9.175 7.175C8.39167 7.95833 8 8.9 8 10V17Z"
                  fill="#fff"
                />
              </g>
            </svg>
            <span class="num" v-if="!tooltipShow">1</span>
          </button>
        </div>
        <nuxt-link
          to="/login"
          class="btn-wrapper-list btn-profile"
          v-if="!isLogin"
        >
          <div
            class="image no-data"
            :style="{
              backgroundImage: `url('/images/button/btn_profile_02.png')`,
            }"
          />
        </nuxt-link>
        <button
          type="button"
          class="btn-wrapper-list btn-profile"
          @click="handleProfile"
          v-else
        >
          <div
            class="image"
            :style="{ backgroundImage: `url(${common.getImg(binary_filepath)})` }"
          />
        </button>
      </div>
      <nav :class="{ 'is-active': showMenu }" class="nav">
        <div class="nav-wrap">
          <div class="header">
            <button type="button" class="logo" @click="goToMain" aria-label="로고">
              <img src="/public/images/default/img_logo.png" alt="img_logo" />
            </button>
            <button type="button" class="btn-close" @click="btnClose" aria-label="닫기">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="content" :class="{ 'is-active': !isLogin }">
            <ul class="menu">
              <li class="menu-list" v-for="(item, i) in menuList" :key="i">
                <a
                  class="menu-list-item left"
                  :class="{ 'is-active': gnbIndex === i }"
                  @click="handleGnb(item, i)"
                >
                  <span class="text">{{ item.name }}</span>
                  <img
                    src="/public/images/icon/icon_arrow_down_black.png" alt="icon_arrow_down_black"
                    v-if="item.children"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div class="footer">
            <div class="btn-wrap">
              <template v-if="!isLogin">
                <button type="button" class="btn-md-line" @click="goToLogin">
                  로그인
                </button>
                <button
                  type="button"
                  class="btn-primary-teal btn-md-fill"
                  @click="goToSignup"
                >
                  회원가입
                </button>
              </template>
              <template v-else>
                <button type="button" class="btn-md-line" @click="handleLogout">
                  로그아웃
                </button>
              </template>
            </div>
          </div>
        </div>
      </nav>
      <nav class="nav my-menu" :class="{ 'is-active': showMobMenu }">
        <div class="nav-wrap">
          <div class="header">
            <button type="button" class="btn-prev" @click="btnPrev" aria-label="이전">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                <mask id="mask0_366_51405" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="19" height="20">
                  <rect y="0.789062" width="18.421" height="18.421" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_366_51405)">
                  <path d="M7.6754 17.675L0 9.99962L7.6754 2.32422L9.03778 3.6866L2.72477 9.99962L9.03778 16.3126L7.6754 17.675Z" fill="white"/>
                </g>
              </svg>
            </button>
            <button type="button" class="logo" @click="goToMain" aria-label="로고">
              <img src="/public/images/default/img_logo.png" alt="img_logo" />
            </button>
          </div>
          <div class="content">
            <div class="profile">
              <div
                class="profile-image"
                :style="{ backgroundImage: `url(${common.getImg(binary_filepath)})`}"
              />
              <div class="profile-name">{{ nickname }}</div>
              <p class="profile-email">{{  }}</p>
            </div>
            <ul class="menu">
              <li class="menu-list" v-for="(item, i) in myMenuList" :key="i">
                <a
                  class="menu-list-item right"
                  :class="{
                    'is-active': profileGnbIndex === i || item.link === route.path
                  }"
                  @click="handleProfileGnb(item, i)"
                >
                  <span class="text">{{ item.name }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nav class="nav my-menu" :class="{ 'is-active': showMobAlarm }">
        <div class="nav-wrap">
          <div class="header">
            <button type="button" class="btn-prev" @click="btnAlarmPrev" aria-label="이전">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                <mask id="mask0_366_51405" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="19" height="20">
                  <rect y="0.789062" width="18.421" height="18.421" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_366_51405)">
                  <path d="M7.6754 17.675L0 9.99962L7.6754 2.32422L9.03778 3.6866L2.72477 9.99962L9.03778 16.3126L7.6754 17.675Z" fill="white"/>
                </g>
              </svg>
            </button>
            <span class="text">알림함</span>
          </div>
          <div class="content">
            <div class="content-list" v-for="(content, index) in notification" :key="index">
              <p class="content-title">[{{ content.not_type }}]</p>
              <p class="content-desc" @click="_notificationRead(item)">
                {{ content.not_message }}
              </p>
              <p class="content-date">{{common.dateformat(content?.timezone_regdate?.timezone_common)}}</p>
            </div>
            <div class="content-list" v-if="notification.length === 0">
                          <p class="no-data">알림이 없습니다.</p>
                        </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";
import { onClickOutside } from "@vueuse/core";
import { useCommon } from "@/utils/common";
import { useAuthApi } from "~/api/auth";

import useRouteTitleMap from '@/composable/useRouteTitleMap'

const router = useRouter();
const authApi = useAuthApi();
const route = useRoute();
const common = useCommon();

// 메뉴 리스트
const menuList = [
  {
    name: "아카데미",
    link: "/academy",
  },
  {
    name: "회원",
    link: "/member"
  },
  {
    name: "코칭",
    link: "/coaching"
  },
  {
    name: "통계",
    link: "/statistics"
  },
  {
    name: "고객지원",
    link: "/customer"
  },
];

const myMenuList = [
  {
    name: "대시보드",
    link: "/",
  },
  {
    name: "나의정보",
    link: "/membership/info",
  }
]

const routeTitleMap = useRouteTitleMap();
const pageTitle = computed(() => {
  return routeTitleMap[route.name] || "";
});

// 로그인 여부
const auth = useAuthStore();
const isLogin = computed(() => auth.isLogin);
const nickname = ref("");
const binary_filepath = ref("");
const isScrolledDown = ref(false);
let lastScrollTop = ref(0);
const notification = ref([]);

// 스크롤 이벤트
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const isMobile = window.innerWidth <= 1024;

  if (scrollTop > lastScrollTop.value) {
    isScrolledDown.value = true;

    if (showMenu.value) {
      isScrolledDown.value = false;
    }

    const academyLeft = document.querySelector(".academy-left");
    if (academyLeft) {
      academyLeft.style.top = "0px";
    }

    const coachingTab = document.querySelector(".my-coaching .tab");
    if (coachingTab) {
      coachingTab.style.top = isMobile ? "0px" : "0px";
    }
  } else {
    isScrolledDown.value = false;

    const academyLeft = document.querySelector(".academy-left");
    if (academyLeft) {
      academyLeft.style.top = isMobile ? "60px" : "97px";
    }

    const coachingTab = document.querySelector(".my-coaching .tab");
    if (coachingTab) {
      coachingTab.style.top = isMobile ? "60px" : "70px";
    }
  }

  lastScrollTop.value = scrollTop;
};

// 툴팁 이벤트
const showTooltip = ref(false);
const handleTooltip = (e) => {
  if(e.target.closest('.user-icon').children[0]) {
    showTooltip.value = false;
  } else {
    showTooltip.value = true;
  }
};

const tooltipShow = ref(false);
const handleAlarmTooltip = () => {
  tooltipShow.value = !tooltipShow.value;
}

// 로그아웃 이벤트
const handleLogout = () => {
  router.push("/logout");
  showMenu.value = false;
  showMobMenu.value = false;
  document.querySelector("body").classList.remove("is-hidden");
};

// 알림 외부 클릭 이벤트
const tooltipAlarmRef = ref();
onClickOutside(tooltipAlarmRef, (event) => {
  const parentTooltip = event.target.closest(".tooltip-alarm");

  if (!parentTooltip) {
    tooltipShow.value = false;
  }
});

// 나의정보 외부 클릭 이벤트
const tooltipInfoRef = ref();
onClickOutside(tooltipInfoRef, (event) => {
  const parentButton = event.target.closest(".user-icon");

  if (!parentButton) {
    showTooltip.value = false;
  }
});

// 로그인 페이지 이동
const goToLogin = () => {
  router.push("/login");
  //   showMenu.value = false;
  //   document.querySelector("body").classList.remove("is-hidden");
  //   isLogin.value = true;
};

const goToLogout = () => {
  router.push("/logout");
  showMenu.value = false;
  document.querySelector("body").classList.remove("is-hidden");
  // isLogin.value = false;
};

const goToSignup = () => {
  router.push("/signup");
  showMenu.value = false;
  document.querySelector("body").classList.remove("is-hidden");
};

const goToMain = () => {
  router.push("/");
  showMenu.value = false;
  document.querySelector("body").classList.remove("is-hidden");
};

onMounted(() => {
  handleScroll();

  // 스크롤 이벤트 등록
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleScroll);
  isScrolledDown.value = false;
  auth.checkLogin();
  nickname.value = sessionStorage.getItem("nickname") || "";
  binary_filepath.value = sessionStorage.getItem("binary_filepath") || "";

  const isMobile = window.innerWidth <= 1024;
  if(isMobile) {
    watch(
      () => route.path,
      (newPath) => {
        menuList.forEach((item, i) => {
          if(newPath === item.link) {
            gnbIndex.value = i;
          }
        })
      },
      { immediate: true }
    )
  }
});

onMounted(() => {
  setTimeout(() => {
    isScrolledDown.value = false;
  },100)
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleScroll);
});

const isGnbDepth = ref(false);

const handleMouseOver = (i, item) => {
  if (item.children) {
    gnbDepthIndex.value = i;
    isGnbDepth.value = true;
  }
};

const handleMouseLeave = () => {
  isGnbDepth.value = false;
  gnbDepthIndex.value = -1;
};

const showMenu = ref(false);
const showMobMenu = ref(false);
const showMobAlarm = ref(false);

const handleMenu = () => {
  showMenu.value = !showMenu.value;
  document.querySelector("body").classList.add("is-hidden");
};

const handleProfile = () => {
  showMobMenu.value = true;
  document.querySelector("body").classList.add("is-hidden");
  document.querySelector(".header").style.transform = "translateY(0)";
};

const handleAlarm = () => {
  showMobAlarm.value = true;
  document.querySelector("body").classList.add("is-hidden");
  document.querySelector(".header").style.transform = "translateY(0)";
};

const btnClose = () => {
  showMenu.value = false;
  document.querySelector("body").classList.remove("is-hidden");
};

const btnPrev = () => {
  showMobMenu.value = false;
  document.querySelector("body").classList.remove("is-hidden");
};

const btnAlarmPrev = () => {
  showMobAlarm.value = false;
  document.querySelector("body").classList.remove("is-hidden");
  tooltipShow.value = true;
};

const gnbIndex = ref(-1);
const handleGnb = (item, i) => {
  gnbIndex.value = gnbIndex.value === i ? -1 : i;
  if (item.link) {
    router.push(item.link);
    showMenu.value = false;
    document.querySelector("body").classList.remove("is-hidden");
  }
};

const profileGnbIndex = ref(-1);
const handleProfileGnb = (item, i) => {
  profileGnbIndex.value = i;
  router.push(item.link);
  document.querySelector("body").classList.remove("is-hidden");
  showMobMenu.value = false;
};

const gnbDepthIndex = ref(-1);
// const handleGnbDepth = (depth, j) => {
//   gnbDepthIndex.value = gnbDepthIndex.value === j ? -1 : j;
//   if(depth.link) {
//     router.push(depth.link);
//     showMenu.value = false;
//   }
// };
const handleGnbDepth = (depth, j) => {
  gnbDepthIndex.value = j;

  if (depth.link) {
    router.push(depth.link);
    gnbIndex.value = -1;
    gnbDepthIndex.value = -1;
    showMenu.value = false;
    isGnbDepth.value = false;
    document.querySelector("body").classList.remove("is-hidden");
  }
};

const goToMenu = (item) => {
  router.push(item.link);
};

const _notificationRead = async (item) => {
  
  try {
    const res = await authApi._notificationread({ not_pk : item.not_pk});

    const path = item.not_url;

    if (route.fullPath === path) {
      // 동일 경로 → 강제 갱신

      router.go(0);
  
    } else {
      await navigateTo(path)
    }
    
    
  } catch (err) {
    alert(err.message);
  }
};

const _notification = async () => {
  
  try {
    const res = await authApi._notification();

    notification.value = res.list;
  } catch (err) {
    alert(err.message);
  }
};

onMounted(() => {
  if (isLogin.value) _notification();
});
</script>
<style lang="scss" scoped>
@use "@/assets/scss/components/header.scss";
</style>
