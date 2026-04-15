<template>
  <div class="login index">
    <div class="login-wrap">
      <nuxt-link to="/publish/dashboard" class="logo">
        <img src="/images/default/img_bi.png" alt="bi" />
      </nuxt-link>
      <div class="title is-mob-show">관리자 로그인</div>
      <form class="form" @submit.prevent="handleLogin">
        <div class="form-input">
          <div class="input-text">
            <input
              type="text"
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
              />
              <label for="chk_0">
                <span class="check-box-item">
                  <span class="item-blur" />
                  <i class="item-line" />
                </span>
                <span class="check-box-txt">로그인 저장</span>
              </label>
            </div>
          </div>
          <div class="form-input-btn">
            <button type="submit" class="btn-primary-purple btn-lg-fill">
              로그인
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
 
const router = useRouter();
const handleLogin = () => {
  router.push('/publish/dashboard')
}

definePageMeta({
  layout: "publish-login",
});

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
