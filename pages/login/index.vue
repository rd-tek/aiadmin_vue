<template>
  <div class="login index">
    <div class="login-wrap">
      <nuxt-link to="/" class="logo">
        <img src="/images/default/img_bi.png" alt="X-COACH" />
      </nuxt-link>
      <div role="heading" aria-level="1" class="title is-mob-show">관리자 로그인</div>
      <form class="form" @submit.prevent="handleLogin">
        <div class="form-input">
          <div class="input-text">
            <input id="login-index-id"
              type="text"
              v-model="form.id"
              required
              autocomplete="username"
            />
            <label for="login-index-id">아이디</label>
            <span class="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div class="form-input">
          <div class="input-text">
            <input id="login-index-password-1"
              type="password"
              v-model="form.password"
              required
              autocomplete="current-password"
            />
            <label for="login-index-password-1">비밀번호</label>
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
          </div>
          <div class="form-input-btn">
            <button type="submit" class="btn-primary-purple btn-lg-fill">
              로그인
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- 토스트 에러 모달 -->
    <toast-error-modal 
      :isOpen="modals.toastErrorModal"
      :toastErrorMessage="toastErrorMessage"
      @update:isOpen="modals.toastErrorModal = $event"/>

  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useAuthApi } from "~/api/auth";
import ToastErrorModal from "@/components/toast-ui/toast-error-modal.vue";

const router = useRouter();
const authApi = useAuthApi();

// 로그인 폼 초기값 설정
const defaultForm = {
  id: "",
  password: "",
  remember_yn: false,
};

// 로그인 입력값 바인딩용
const form = ref({ ...defaultForm });
// 2026-10-23: 저장된 아이디는 화면이 뜬 뒤 채움 — 첫 렌더에서 localStorage 를 읽으면
// 서버(빈 값)와 브라우저(저장값) 화면이 달라 hydration 경고가 났음(아이디 저장을 켠 사용자)
onMounted(() => {
  const savedId = localStorage.getItem("remember_id");
  if (savedId && !form.value.id) {
    form.value.id = savedId;
    form.value.remember_yn = !!localStorage.getItem("remember_yn");
  }
});

// 로그인 처리 함수
const modals = reactive({});
const toastErrorMessage = ref();
const handleLogin = async () => {
  try {
    const { message } = await authApi._login(form.value)
    await router.push('/')
  } catch (err) {
    document.querySelector('body').classList.add('is-hidden');
    modals['toastErrorModal'] = true;
    toastErrorMessage.value = err.message;
  }
}

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "login",
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