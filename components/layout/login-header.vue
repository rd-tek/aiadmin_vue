<template>
  <header class="header">
    <button type="button" class="btn-menu" @click="handleMenu">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18 13C18 13.5523 17.4801 14 16.8387 14L1.16129 14C0.519928 14 -6.78526e-08 13.5523 -4.37114e-08 13C-1.95703e-08 12.4477 0.519928 12 1.16129 12L16.8387 12C17.4801 12 18 12.4477 18 13Z"
          fill="#fff"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18 7C18 7.55228 17.5523 8 17 8L1 8C0.447716 8 -6.78525e-08 7.55228 -4.37114e-08 7C-1.95703e-08 6.44771 0.447716 6 1 6L17 6C17.5523 6 18 6.44772 18 7Z"
          fill="#fff"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18 0.999998C18 1.55228 17.4801 2 16.8387 2L1.16129 2C0.519928 2 -6.78526e-08 1.55229 -4.37115e-08 1C-1.95704e-08 0.447719 0.519928 3.94468e-06 1.16129 3.7939e-06L16.8387 -5.07615e-08C17.4801 -2.61145e-07 18 0.447714 18 0.999998Z"
          fill="#fff"
        />
      </svg>
    </button>
    <div class="title">{{ route.name }}</div>
    <nuxt-link to="/login" class="btn-profile" v-if="isLogin">
      <div
        class="image"
        :style="{ backgroundImage: `url('/images/button/btn_profile_02.png')` }"
      />
    </nuxt-link>
    <button type="button" class="btn-profile" aria-label="프로필" @click="handleProfile" v-else>
      <div
        class="image"
        :style="{
          backgroundImage: `url('/images/button/btn_profile_02.png')`,
        }"
      />
    </button>
    <nav :class="{ 'is-active': showMenu }" class="nav">
      <div class="nav-wrap">
        <div class="header">
          <button type="button" class="logo" @click="goToMain" aria-label="로고">
            <img src="/public/images/default/img_logo.png" alt="img_logo" />
          </button>
          <button type="button" class="btn-close" @click="menuClose" aria-label="닫기">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <div class="content" :class="{ 'is-active': isLogin }">
          <ul class="menu">
            <li class="menu-list" v-for="(item, i) in menuList" :key="i">
              <a
                class="menu-list-item"
                :class="{ 'is-active': gnbIndex === i }"
                @click="handleGnb(item, i)"
              >
                <span class="text">{{ item.name }}</span>
                <img
                  src="/public/images/icon/icon_arrow_down_black.png"
                  alt="icon_arrow_down_black"
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
  </header>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const showMenu = ref(false);
const isLogin = ref(false);
const showMobMenu = ref(false);

const handleMenu = () => {
  showMenu.value = !showMenu.value;
  document.querySelector("body").classList.add("is-hidden");
};

const handleProfile = () => {
  showMobMenu.value = !showMobMenu.value;
  document.querySelector("body").classList.add("is-hidden");
};

const menuClose = () => {
  showMenu.value = false;
  document.querySelector("body").classList.remove("is-hidden");
};

// 메뉴 리스트
const menuList = [
  {
    name: "아카데미",
    link: "/academy",
  },
  {
    name: "회원",
  },
  {
    name: "코칭",
  },
  {
    name: "통계",
  },
  {
    name: "고객지원",
  },
];

const gnbIndex = ref(-1);
const handleGnb = (item, i) => {
  gnbIndex.value = gnbIndex.value === i ? -1 : i;
  if (item.link) {
    router.push(item.link);
    showMenu.value = false;
  }
};

const goToLogin = () => {
  router.push("/");
  showMenu.value = false;
  document.querySelector("body").classList.remove("is-hidden");
  isLogin.value = true;
};

const handleLogout = () => {
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

</script>
<style lang="scss" scoped>
@use "@/assets/scss/pages/login.scss";
</style>
