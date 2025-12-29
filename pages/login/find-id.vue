<template>
  <div class="login find-id">
    <div class="login-wrap">
      <nuxt-link to="/" class="logo">
        <img src="/images/default/img_bi.png" alt="bi" />
      </nuxt-link>
      <div class="title">코치 로그인</div>
      <div class="form">
        <div class="form-title">
          아이디 찾기
        </div>
        <div class="form-input">
          <div class="form-input-sub align-left">핸드폰 번호를 입력합니다.</div>
        </div>
        <div class="form-input type-phone">
          <div class="form-input-wrap">
            <div class="input-text">
              <input type="text" required v-model="form.handphone" />
              <label>핸드폰</label>
              <span class="focus-border">
                <i></i>
              </span>
            </div>
          </div>
        </div>
        <div class="form-input type-btn">
          <div class="form-input-btn">
            <button
              @click="handleFindId"
              class="btn-primary-teal btn-lg-fill"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 토스트 알림 모달 -->
  <toast-modal
      :isOpen="modals.toastModal"
      :toastMessage="toastMessage"
      @update:isOpen="modals.toastModal = $event"
  />

  <!-- 토스트 에러 모달 -->
  <toast-error-modal 
    :isOpen="modals.toastErrorModal"
    :toastErrorMessage="toastErrorMessage"
    @update:isOpen="modals.toastErrorModal = $event"/>

</template>
<script setup>
import { useRouter } from 'vue-router';
import { useAuthApi } from "~/api/auth";
import toastErrorModal from '@/components/toast-ui/toast-error-modal.vue';
import toastModal from '@/components/toast-ui/toast-modal.vue';
import { useHead } from '#app'

const router = useRouter();
const authApi = useAuthApi();
const defaultForm = {
  expert_id: "",
  handphone: "",
};

// 토스트 확인 모달
const modals = reactive({});
const toastMessage = ref();
const handleToast = (message) => {
  document.querySelector('body').classList.add('is-hidden');
  modals['toastModal'] = true;
  toastMessage.value = message;
}

// 토스트 에러 모달
const toastErrorMessage = ref();
const handleErrorToast = (message) => {
    document.querySelector('body').classList.add('is-hidden');
    modals['toastErrorModal'] = true;
    toastErrorMessage.value = message;
}

const form = ref({ ...defaultForm });
const handleFindId = async () => {
  try {
    const { message } = await authApi._findId(form.value);

    handleToast(message);
    router.push("/login"); // ✅ 메인 페이지로 이동
  } catch (err) {
    handleErrorToast(err.message);
  }
};

definePageMeta({
  layout: "login",
  name: "아이디 찾기",
});

useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  title: '아이디 찾기',
  meta: [
    { name: 'description', content: '아이디 찾기 페이지 입니다.' }
  ]
})

</script>
<style lang="scss" scoped>
@use "@/assets/scss/pages/login.scss";
</style>
