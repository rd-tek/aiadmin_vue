<template>
  <div class="signup">
    <div class="signup-wrap">
      <nuxt-link to="/" class="logo">
        <img src="/images/default/img_logo_black.png" alt="img_logo_black" />
      </nuxt-link>
      <div class="title">
        <span>코치 회원가입</span>
      </div>
      <div class="form-area">
        <div class="sub">
          <span class="required">*</span>로 표시된 항목을 완료 해야합니다. 다른
          모든 항목은 선택 사항입니다.
        </div>
        <form class="form" @submit.prevent="handleSubmit">
          <div class="form-section">
            <div class="cont">
              <div class="cont-list">
                <label>회원 ID<span class="required"></span></label>
                <div class="cont-list-box">
                  <input
                    type="text"
                    autocomplete="username"
                    placeholder="회원 ID"
                    v-model="form.expert_id"
                  />
                  <button
                    type="button"
                    class="btn-default btn-md-fill"
                    @click="expertIdCheck"
                  >
                    중복확인
                  </button>
                </div>
                <transition name="fade">
                  <span class="required"
                    >공백없이 영문, 숫자, '_'만 3글자 이상 20글자 미만으로
                    입력해주세요.</span
                  >
                </transition>
              </div>
              <!-- <div class="cont-list">
                <label>이름<span class="required"></span></label>
                <div class="cont-list-box">
                  <input type="text" placeholder="이름">
                </div>
              </div> -->
              <div class="cont-list">
                <label>닉네임<span class="required"></span></label>
                <div class="cont-list-box">
                  <input
                    type="text"
                    autocomplete="username"
                    placeholder="닉네임"
                    v-model="form.nickname"
                  />
                  <button
                    type="button"
                    class="btn-default btn-md-fill"
                    @click="nicknameCeck()"
                  >
                    중복확인
                  </button>
                </div>
                <transition name="fade">
                  <span class="required"
                    >공백없이 영문, 숫자, '_'만 3글자 이상 20글자 미만으로
                    입력해주세요.</span
                  >
                </transition>
              </div>
              <div class="cont-list">
                <label>프로필 이미지</label>
                <div class="cont-list-box">
                  <div class="profile">
                    <div class="btn-profile">
                      <div
                        class="btn-profile-image" 
                        :class="{ 'no-data' : previewImage === null }" 
                        :style="previewImage ? { backgroundImage: `url('${previewImage}')` } : {}"
                      ></div>
                      <span class="btn-profile-edit">
                        <input
                          type="file"
                          @change="onFileChange"
                          accept="image/*"
                        />
                        <img
                          src="/images/icon/icon_pensil.png"
                          alt="edit"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cont-list">
                <label>비밀번호<span class="required"></span></label>
                <input
                  type="password"
                  autocomplete="current-password"
                  placeholder="비밀번호"
                  v-model="form.password"
                />
                <transition name="fade">
                  <span class="required"
                    >영문, 숫자를 포함하여 최소 8자, 최대 30자 이내로
                    입력해주세요.</span
                  >
                </transition>
              </div>
              <div class="cont-list">
                <label>비밀번호 확인<span class="required"></span></label>
                <input
                  type="password"
                  autocomplete="current-password"
                  placeholder="비밀번호"
                  v-model="form.password_re"
                />
              </div>
              <div class="cont-list">
                <label>핸드폰<span class="required"></span></label>
                <div class="cont-list-box">
                  <input
                    type="text"
                    placeholder="01012345678"
                    v-model="form.handphone"
                  />
                  <button
                    type="button"
                    class="btn-default btn-md-fill"
                    @click="sms_send()"
                  >
                    인증문자발송
                  </button>
                </div>
                <div class="cont-list-box">
                  <input
                    type="text"
                    placeholder="인증번호"
                    v-model="form.auth_number"
                  />
                  <button
                    type="button"
                    class="btn-default btn-md-fill"
                    @click="auth_number_chk()"
                  >
                    확인
                  </button>
                  <!-- <span class="required mt-0">남은시간 04:58</span> -->
                </div>
              </div>
              <!-- <div class="cont-list">
                <label>주소<span class="required"></span></label>
                <div class="cont-list-box">
                  <input
                    type="text"
                    placeholder="동 주소"
                  />
                  <button
                    type="button"
                    class="btn-default btn-md-fill"
                  >
                    주소검색
                  </button>
                </div>
                <div class="cont-list-box">
                  <input
                    type="text"
                    placeholder="상세 주소"
                  />
                </div>
              </div> -->
              <div class="cont-list">
                <label>이메일<span class="required"></span></label>
                <div class="cont-list-box">
                  <input
                    type="text"
                    autocomplete="username"
                    placeholder="이메일"
                    v-model="form.email"
                  />
                  <button
                    type="button"
                    class="btn-default btn-md-fill"
                    @click="emailCheck"
                  >
                    중복확인
                  </button>
                </div>
              </div>

              <div class="cont-list">
                <label>자기소개</label>
                <div class="cont-list-box">
                  <textarea
                  
                  :value="form.intro"
                  placeholder="자기소개"
                  plaintext
                  ></textarea>
                </div>
              </div>

              <div class="cont-list">
                <label>주요 경력</label>
                <div class="cont-list-box">
                  <textarea
                  
                  :value="form.record"
                  placeholder="주요 경력 및 기록"
                  plaintext
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="checkbox">
              <div class="check-box">
                <input
                  type="checkbox"
                  id="chk_0"
                  name="chk_0"
                  v-model="form.agree_email"
                />
                <label for="chk_0">
                  <span class="check-box-item">
                    <span class="item-blur" />
                    <i class="item-line" />
                  </span>
                  <span class="check-box-txt"
                    >X-GOLF에서 프로모션 행사와 이메일을 받아 보시겠습니까?
                    (당신은 언제든지 구독을 취소하실 수 있습니다.)</span
                  >
                </label>
              </div>
              <div class="check-box">
                <input
                  type="checkbox"
                  id="chk_1"
                  name="chk_1"
                  v-model="form.privacy"
                />
                <label for="chk_1">
                  <span class="check-box-item">
                    <span class="item-blur" />
                    <i class="item-line" />
                  </span>
                  <span class="check-box-txt"
                    >X-GOLF 온라인 서비스 이용 약관 및 개인 정보 보호 정책에
                    동의 하십니까? (Terms & Policy)</span
                  >
                </label>
              </div>
            </div>
          </div>
          <div class="btn-wrap">
            <button type="submit" class="btn-primary-teal btn-lg-fill">
              확인
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- 토스트 알림 모달 -->
  <toast-modal
      :isOpen="modals.toastModal"
      :toastMessage="toastMessage"
      @update:isOpen="modals.toastModal = $event"
  />

  <!-- 토스트 경고 모달 -->
  <toast-warn-modal 
      :isOpen="modals.toastWarnModal"
      :toastWarnMessage="toastWarnMessage"
      @update:isOpen="modals.toastWarnModal = $event"/>

  <!-- 토스트 에러 모달 -->
  <toast-error-modal 
      :isOpen="modals.toastErrorModal"
      :toastErrorMessage="toastErrorMessage"
      @update:isOpen="modals.toastErrorModal = $event"/>
  
</template>
<script setup>
import { useRouter } from 'vue-router';
import { useMemberApi } from "~/api/membership";
import toastModal from '@/components/toast-ui/toast-modal.vue';
import toastErrorModal from '@/components/toast-ui/toast-error-modal.vue';
import toastWarnModal from '@/components/toast-ui/toast-warn-modal.vue';
import { useHead } from '#app'

const router = useRouter();
const memberApi = useMemberApi();
// 토스트 확인 모달
const toastMessage = ref();
const modals = reactive({});

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

// 토스트 경고 모달
const toastWarnMessage = ref();
const handleWarnToast = (message) => {
    document.querySelector('body').classList.add('is-hidden');
    modals['toastWarnModal'] = true;
    toastWarnMessage.value = message;
}


const defaultForm = {
  expert_id: "",
  password: "",
  password_re: "",
  handphone: "",
  auth_number: "",
  nickname: "",
  email: "",
  firstname: "",
  intro: "",
  record: "",
  agree_email: false,
  privacy: false,
  states_fk: "",
  recaptcha_token: "",
};

const form = ref({ ...defaultForm });

const previewImage = ref(null);
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = () => {
      previewImage.value = reader.result;
      form.value.filename = file;
    };
    reader.readAsDataURL(file);
  }
};


// 회원 ID 중복확인
const expertIdCheck = async () => {
  try {
    const { message } = await memberApi._expertidcheck(form.value);
    handleToast(message);
  } catch (err) {
    handleErrorToast(err.message);
  }
};

const nicknameCeck = async () => {
  if (!form.value.nickname) {
    handleWarnToast("닉네임을 입력해주세요.");
    return;
  }
  try {
    const { message } = await memberApi._nicknamecheck(form.value);
    handleToast(message);
  } catch (err) {
    handleErrorToast(err.message);
  }

  //console.log("중복확인");
};

const sms_send = async () => {
  // if (form.value.handphone === "") {
  //   alert("핸드폰 번호를 입력해주세요.");
  //   return;
  // }

  try {
    const { message } = await memberApi._sms_send(form.value);
    handleToast(message);
  } catch (err) {
    handleErrorToast(err.message);
  }
};

const auth_number_chk = async () => {
  try {
    const { message } = await memberApi._auth_number_chk(form.value);
    handleToast(message);
    // 인증 성공 시 처리 가능 (예: form.auth_passed = true)
  } catch (err) {
    handleErrorToast(err.message || "인증 실패");
    form.auth_number = ""; // 실패 시 인증번호 초기화
  }
};

const emailCheck = async () => {
  try {
    const { message } = await memberApi._emailcheck(form.value);
    handleToast(message);
  } catch (err) {
    handleErrorToast(err.message);
  }
};

const handleSubmit = async () => {
  // 회원 가입

  // if (!recaptcha) return;
  // form.value.recaptcha_token = await recaptcha.execute("signup");
  // console.log("reCAPTCHA token:", form.value.recaptcha_token);

  try {
    const { message } = await memberApi._signup(form.value);
    handleToast(message);
    
    form.value = { ...defaultForm }; // ✅ 초기값으로 초기화
    router.push("/login");
  } catch (err) {
    handleErrorToast(err.message);
  }
};


definePageMeta({
  layout: "login",
  name: "회원가입",
});

useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  title: '회원가입',
  meta: [
    { name: 'description', content: '회원가입 페이지 입니다.' }
  ]
})
</script>
<style lang="scss" scoped>
@use "@/assets/scss/pages/signup.scss";
</style>
