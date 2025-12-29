<template>
  <div class="login pw-chk">
    <div class="login-wrap">
      <div class="title is-mob-show">비밀번호 확인</div>
      <p class="sub">회원정보 보호를 위해 비밀번호를 한 번 더 입력해주세요.</p>
      <form class="form" @submit.prevent="handleLogin">
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
          <div class="form-input-btn">
            <button type="submit" class="btn-primary-teal btn-lg-fill">
              확인
            </button>
          </div>
          <div class="form-input-sub">
            <span class="text">간편 로그인으로 비밀번호 인증하기</span>
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
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "login",
  name: "비밀번호 확인",
});
</script>
<style lang="scss" scoped>
@use "@/assets/scss/pages/login.scss";
</style>
