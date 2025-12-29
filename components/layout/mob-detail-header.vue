<template>
    <div class="header is-mob" :class="{ 'is-active': isScrolledDown }" ref="headerRef">
        <button type="button" class="btn-back" @click="goBack" aria-label="이전">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
<mask id="mask0_927_9186" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="19" height="19">
<rect width="18.421" height="18.421" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_927_9186)">
<path d="M7.6754 16.886L0 9.21056L7.6754 1.53516L9.03778 2.89754L2.72477 9.21056L9.03778 15.5236L7.6754 16.886Z" fill="white"/>
</g>
</svg>
        </button>
        <div class="title">{{ pageTitle }}</div>
        <div class="btn-wrapper">
            <div
            class="btn-wrapper-list tooltip tooltip-alarm"
            ref="tooltipRef"
            @click="handleAlarm"
            v-if="isLogin"
            >
            <button type="button" class="btn-alarm" aria-label="알람">
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
                class="image"
                :style="{ backgroundImage: `url(${common.getImg(binary_filepath)})` }"
            />
            </nuxt-link>
            <button
            type="button"
            aria-label="프로필"
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
        <!-- <button type="button" class="btn-profile" @click="handleProfile" aria-label="프로필">
            <div class="image" :style="{ backgroundImage: `url(${common.getImg(binary_filepath)})` }" />
        </button> -->

        
        <!-- 마이메뉴(mobile) -->
        <nav class="nav my-menu" :class="{ 'is-active' : showMobMenu }">
            <div class="nav-wrap">
                <div class="header">
                    <button type="button" class="btn-prev" @click="btnPrev" aria-label="이전">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                            <mask id="mask0_927_9186" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="19" height="19">
                                <rect width="18.421" height="18.421" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_927_9186)">
                                <path d="M7.6754 16.886L0 9.21056L7.6754 1.53516L9.03778 2.89754L2.72477 9.21056L9.03778 15.5236L7.6754 16.886Z" fill="white"/>
                            </g>
                        </svg>
                    </button>
                    <button type="button" class="logo" @click="goToMain" aria-label="로고">
                    <img src="/public/images/default/img_logo.png" />
                    </button>
                </div>
                <div class="content">
                    <div class="profile">
                        <div class="profile-image" :style="{ backgroundImage: `url(${common.getImg(binary_filepath)})` }" />
                        <div class="profile-name">{{ nickname }} <small>님</small></div>
                        <!-- <p class="profile-email">{{ res.memberinfo.email }}</p> -->
                    </div>
                    <ul class="menu">
                        <li class="menu-list" v-for="(item, i) in mobMenuList" :key="i">
                            <button type="button" class="menu-list-item" :class="{ 'is-active': profileGnbIndex === i || item.link === route.path }" @click="handleProfileGnb(item, i)">
                                <span class="text">{{ item.name }}</span>
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="footer">
                    <div class="btn-wrap">
                        <button type="button" class="btn-md-line" @click="handleLogout">
                            로그아웃
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <nav class="nav my-menu" :class="{ 'is-active': showMobAlarm }">
            <div class="nav-wrap">
            <div class="header">
                <button type="button" class="btn-prev" @click="btnAlarmPrev" aria-label="다음">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                        <mask id="mask0_927_9186" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="19" height="19">
                            <rect width="18.421" height="18.421" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_927_9186)">
                            <path d="M7.6754 16.886L0 9.21056L7.6754 1.53516L9.03778 2.89754L2.72477 9.21056L9.03778 15.5236L7.6754 16.886Z" fill="white"/>
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
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import useRouteTitleMap from '@/composable/useRouteTitleMap'
import { useCommon } from "@/utils/common";
import { useAuthApi } from "~/api/auth";

const auth = useAuthStore();
const notification = ref([]);
const isLogin = computed(() => auth.isLogin);
const common = useCommon();
const nickname = ref("");
const binary_filepath = ref("");
const route = useRoute();
const router = useRouter();
const routeTitleMap = useRouteTitleMap();
const pageTitle = computed(() => routeTitleMap[route.name] || '');

const authApi = useAuthApi();

const mobMenuList = [
  {
    name: "대시보드",
    link: "/",
  },
  {
    name: "나의정보",
    link: "/membership/info",
  }
]

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/');
  }
}

const showMobMenu = ref(false);
const showMobAlarm = ref(false);

const handleProfile = () => {
    showMobMenu.value = true;
    document.querySelector('body').classList.add('is-hidden');
}

const handleAlarm = () => {
  showMobAlarm.value = true;
  document.querySelector("body").classList.add("is-hidden");
};

const btnPrev = () => {
    showMobMenu.value = false;
    document.querySelector("body").classList.remove("is-hidden");
};

const tooltipShow = ref(false);
const btnAlarmPrev = () => {
  showMobAlarm.value = false;
  document.querySelector("body").classList.remove("is-hidden");
  tooltipShow.value = true;
};

const goToMain = () => {
  router.push("/");
  showMenu.value = false;
  document.querySelector("body").classList.remove("is-hidden");
};

const profileGnbIndex = ref(-1);
const handleProfileGnb = (item, i) => {
  profileGnbIndex.value = i;
  router.push(item.link);
  document.querySelector("body").classList.remove("is-hidden");
  showMobMenu.value = false;
};

// 로그아웃 이벤트
const handleLogout = () => {
  router.push("/logout");
  isLogin.value = false;
  showMobMenu.value = false;
  document.querySelector("body").classList.remove("is-hidden");
};

// 스크롤 이벤트
let lastScrollTop = ref(0);
const headerRef = ref();
const isScrolledDown = ref(false);
const showMenu = ref(false);
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const isMobile = window.innerWidth <= 1024;

  if(isMobile) {
    if (scrollTop <= 0) {
      headerRef.value.classList.add("is-scroll-top");
      lastScrollTop.value = 0;
      return;
    } else {
      headerRef.value.classList.remove("is-scroll-top");
    }
  }

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
      coachingTab.style.top = isMobile ? "0" : "0px";
    }
  } else {
    isScrolledDown.value = false;

    const academyLeft = document.querySelector(".academy-left");
    if (academyLeft) {
      academyLeft.style.top = isMobile ? "60px" : "97px";
    }

    const coachingTab = document.querySelector(".my-coaching .tab");
    if (coachingTab) {
      coachingTab.style.top = isMobile ? "60px" : "97px";
    }
  }

  lastScrollTop.value = scrollTop;
};

onMounted(() => {
    auth.checkLogin();
    nickname.value = sessionStorage.getItem("nickname") || "";
    binary_filepath.value = sessionStorage.getItem("binary_filepath") || "";

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    isScrolledDown.value = false;
});

onMounted(() => {
    setTimeout(() => {
      isScrolledDown.value = false;
    },100)
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleScroll);
});

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
@use "@/assets/scss/components/mob-detail-header.scss";
</style>