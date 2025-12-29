<template>
  <div class="login index">
    <div class="login-wrap">
      <nuxt-link to="/" class="logo">
        <img src="/images/default/img_bi.png" alt="bi" />
      </nuxt-link>
      <div class="title is-mob-show">코치 로그인</div>
      <form class="form" @submit.prevent="handleLogin">
        <div class="form-input">
          <div class="input-text">
            <input
              type="text"
              v-model="form.expert_id"
              required
              autocomplete="username"
            />
            <label>아이디</label>
            <span class="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div class="form-input">
          <div class="input-text">
            <input
              type="password"
              required
              v-model="form.password"
              autocomplete="current-password"
            />
            <label>비밀번호</label>
            <span class="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div class="form-input">
          <div class="form-input-flex">
            <div class="check-box">
              <input
                type="checkbox"
                id="chk_0"
                name="chk_0"
                v-model="form.remember_yn"
              />
              <label for="chk_0">
                <span class="check-box-item">
                  <span class="item-blur" />
                  <i class="item-line" />
                </span>
                <span class="check-box-txt">로그인 저장</span>
              </label>
            </div>
            <ul class="find-box">
              <li class="find-box-list">
                <nuxt-link to="/login/find-id" class="find-box-list-link"
                  >아이디 찾기</nuxt-link
                >
              </li>
              <li class="find-box-list">
                <nuxt-link to="/login/find-pw" class="find-box-list-link"
                  >비밀번호 찾기</nuxt-link
                >
              </li>
            </ul>
          </div>
          <div class="form-input-btn">
            <button type="submit" class="btn-primary-teal btn-lg-fill">
              로그인
            </button>
          </div>
          <ul class="form-input-sns">
            <li class="sns-list google">
              <button type="button" class="sns-list-btn">
                <img src="/images/icon/icon_google.png" alt="google" />
              </button>
            </li>
            <li class="sns-list facebook">
              <button type="button" class="sns-list-btn">
                <img src="/images/icon/icon_facebook.png" alt="facebook" />
              </button>
            </li>
            <li class="sns-list apple">
              <button type="button" class="sns-list-btn">
                <img src="/images/icon/icon_apple.png" alt="apple" />
              </button>
            </li>
          </ul>
          <div class="form-input-sub">
            <img src="/public/images/icon/icon_error_grey.png" alt="error" />
            <span class="text">X-COACH 회원이 아니신가요?</span>
            <nuxt-link to="/signup" class="link">회원가입</nuxt-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";
import { useAuthApi } from "~/api/auth";

const router = useRouter();
const authApi = useAuthApi();
const defaultForm = {
  expert_id: process.client ? localStorage.getItem("remember_id") : "",
  password: "",
  remember_yn: process.client ? localStorage.getItem("remember_yn") : false,
};

const form = ref({ ...defaultForm });

definePageMeta({
  layout: "login",
  name: "로그인",
});

const handleLogin = async () => {
  try {
    const { message } = await authApi._login(form.value);

    // alert(message);
    router.push("/"); // ✅ 메인 페이지로 이동
  } catch (err) {
    alert(err.message);
  }
};

useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  title: '로그인',
  meta: [
    { name: 'description', content: '로그인 페이지 입니다.' }
  ]
})

</script>
<style lang="scss" scoped>
@use "@/assets/scss/pages/login.scss";
</style>
