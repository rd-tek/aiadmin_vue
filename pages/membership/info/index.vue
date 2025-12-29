<template>
  <div class="membership">
    <div class="membership-wrap">
      <div class="content">
        <div class="membership-info">
          <form class="form" @submit.prevent="handleSubmit">
            <div class="form-section">
              <p class="title">나의 정보</p>
              <div class="cont">
                <div class="cont-list col-2">
                  <label>회원 ID<span class="required"></span></label>
                  <div class="cont-list-box">
                    <input type="text" :value="form.expert_id" disabled />
                  </div>
                </div>
                <!-- <div class="cont-list col-2">
                      <label>이름<span class="required"></span></label>
                      <div class="cont-list-box">
                          <span class="text">김길동</span>
                      </div>
                    </div> -->
                <div class="cont-list col-2">
                  <label>닉네임<span class="required"></span></label>
                  <div class="cont-list-box">
                    <input
                      type="text"
                      placeholder="닉네임"
                      autocomplete="nickname"
                      v-model="form.nickname"
                    />
                    <button
                      type="button"
                      class="btn-default btn-lg-fill"
                      @click="nicknameCeck()"
                    >
                      중복확인
                    </button>
                  </div>
                  <transition name="fade">
                    <span class="required"
                      >공백없이 영문, 숫자를 포함하여 최소 2자, 최대 20자 이내로
                      입력해주세요.</span
                    >
                  </transition>
                </div>
                <div class="cont-list col-2">
                  <label>프로필 이미지</label>
                  <div class="cont-list-box">
                    <div class="profile">
                      <div class="btn-profile">
                        <div
                          class="btn-profile-image"
                          :style="{
                            backgroundImage: `url('${getPreviewImage(
                              previewImage,
                            )}')`,
                          }"
                        ></div>
                        <span class="btn-profile-edit">
                          <input
                            type="file"
                            accept="image/*"
                            @change="onFileChange"
                          />
                          <img src="/images/icon/icon_pensil.png" alt="edit" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="cont-list col-2">
                  <div class="cont-list-col">
                    <label>현재 비밀번호<span class="required"></span></label>
                    <div class="cont-list-box align-center">
                      <input
                        placeholder="비밀번호"
                        type="password"
                        autocomplete="current-password"
                      />
                      <div class="check-box">
                        <input
                          type="checkbox"
                          id="chk_change"
                          name="chk_change"
                          v-model="form.passwordchk"
                        />
                        <label for="chk_change" class="label">
                          <span class="check-box-item">
                            <span class="item-blur" />
                            <i class="item-line" />
                          </span>
                          <span class="check-box-txt">비밀번호 변경</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cont-list col-2" v-if="form.passwordchk">
                  <label>새 비밀번호<span class="required"></span></label>
                  <div class="cont-list-box">
                    <input
                      type="password"
                      placeholder="비밀번호"
                      autocomplete="new-password"
                      v-model="form.newpassword"
                    />
                  </div>
                  <transition name="fade">
                    <span class="required"
                      >영문, 숫자를 포함하여 최소 8자, 최대 30자 이내로
                      입력해주세요.</span
                    >
                  </transition>
                </div>
                <div class="cont-list col-2" v-if="form.passwordchk">
                  <label>새 비밀번호 확인<span class="required"></span></label>
                  <div class="cont-list-box">
                    <input
                      type="password"
                      placeholder="비밀번호"
                      autocomplete="new-password"
                      v-model="form.newpassword_re"
                    />
                  </div>
                  <transition name="fade">
                    <span class="required">확인/불일치</span>
                  </transition>
                </div>

                <div class="cont-list col-2">
                  <div class="cont-list-col">
                    <label>핸드폰<span class="required"></span></label>
                    <div class="cont-list-box align-center">
                      <input type="text" v-model="form.handphone" />
                      <div class="check-box">
                        <input
                          type="checkbox"
                          id="chk_change_phone"
                          v-model="form.handphonechk"
                        />
                        <label for="chk_change_phone" class="label">
                          <span class="check-box-item">
                            <span class="item-blur" />
                            <i class="item-line" />
                          </span>
                          <span class="check-box-txt">핸드폰 변경</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="cont-list" v-if="form.handphonechk">
                  <label>새 핸드폰<span class="required"></span></label>
                  <div class="cont-list-box">
                    <div class="col-2">
                      <input
                        type="text"
                        placeholder="핸드폰"
                        v-model="form.newhandphone"
                      />
                      <button
                        type="button"
                        class="btn-default btn-lg-fill"
                        @click="sms_send()"
                      >
                        인증문자발송
                      </button>
                    </div>
                    <div class="col-2">
                      <input
                        type="text"
                        placeholder="인증번호"
                        v-model="form.auth_number"
                      />
                      <button
                        type="button"
                        class="btn-default btn-lg-fill"
                        @click="auth_number_chk()"
                      >
                        확인
                      </button>
                    </div>
                  </div>
                </div>
                <!-- <div class="cont-list">
                  <label>주소<span class="required"></span></label>
                  <div class="cont-list-box">
                    <div class="col-2">
                      <input type="text" placeholder="동 주소" />
                      <button type="button" class="btn-default btn-lg-fill">
                        주소검색
                      </button>
                    </div>
                    <div class="col-2">
                      <input type="text" placeholder="상세 주소" />
                    </div>
                  </div>
                </div> -->
                <div class="cont-list col-2">
                  <label>이메일<span class="required"></span></label>
                  <div class="cont-list-box">
                    <input
                      type="text"
                      placeholder="이메일"
                      v-model="form.email"
                    />
                    <button
                      type="button"
                      class="btn-default btn-lg-fill"
                      @click="emailCheck"
                    >
                      중복확인
                    </button>
                  </div>
                </div>

                <div class="cont-list col-2">
                  <label>이메일<span class="required"></span></label>
                  <div class="cont-list-box">
                    <input
                      type="text"
                      placeholder="이메일"
                      v-model="form.email"
                    />
                    <button
                      type="button"
                      class="btn-default btn-lg-fill"
                      @click="emailCheck"
                    >
                      중복확인
                    </button>
                  </div>
                </div>

                <div class="cont-list col-2">
                  <label>자기소개<span></span></label>
                  <div class="cont-list-box">
                    <textarea
                      v-model="form.intro"
                      placeholder="자기소개"
                      plaintext
                    ></textarea>
                  </div>
                </div>
                <div class="cont-list col-2">
                  <label>주요 경력<span></span></label>
                  <div class="cont-list-box">
                    <textarea
                      v-model="form.record"
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
                    :checked="form.agree_email === '1'"
                  />
                  <label for="chk_0">
                    <span class="check-box-item">
                      <span class="item-blur" />
                      <i class="item-line" />
                    </span>
                    <span class="check-box-txt"
                      >X-GOLF로부터 프로모션 및 혜택에 대한 이메일을 받는 것에
                      동의합니다.</span
                    >
                  </label>
                </div>
              </div>
            </div>
            <div class="btn-wrap align-right">
              <button
                type="button"
                class="btn-retire"
                @click="modalOpen('modalRetire')"
              >
                <span class="text">계정 탈퇴</span>
                <img
                  src="/public/images/icon/icon_chevron_right_grey.png"
                  alt="icon_chevron_right_grey"
                />
              </button>
            </div>
            <div class="btn-wrap">
              <button type="submit" class="btn-primary-teal btn-lg-fill">
                확인
              </button>
            </div>
          </form>
          <modal-retire
            :isOpen="modals.modalRetire"
            @update:isOpen="modals.modalRetire = $event"
          />
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

  <!-- 토스트 경고 모달 -->
  <toast-warn-modal
    :isOpen="modals.toastWarnModal"
    :toastWarnMessage="toastWarnMessage"
    @update:isOpen="modals.toastWarnModal = $event"
  />

  <!-- 토스트 에러 모달 -->
  <toast-error-modal
    :isOpen="modals.toastErrorModal"
    :toastErrorMessage="toastErrorMessage"
    @update:isOpen="modals.toastErrorModal = $event"
  />
</template>

<script setup>
import { useMemberApi } from "~/api/membership";
import { useCommon } from "@/utils/common";
import toastModal from "@/components/toast-ui/toast-modal.vue";
import toastErrorModal from "@/components/toast-ui/toast-error-modal.vue";
import toastWarnModal from "@/components/toast-ui/toast-warn-modal.vue";
import { useHead } from "#app";

const memberApi = useMemberApi();
const common = useCommon();
const modals = reactive({ modalSample: false });
const defaultForm = ref({});
const form = ref({});
const toastMessage = ref();

// 토스트 확인 모달
const handleToast = (message) => {
  document.querySelector("body").classList.add("is-hidden");
  modals["toastModal"] = true;
  toastMessage.value = message;
};

// 토스트 에러 모달
const toastErrorMessage = ref();
const handleErrorToast = (message) => {
  document.querySelector("body").classList.add("is-hidden");
  modals["toastErrorModal"] = true;
  toastErrorMessage.value = message;
};

// 토스트 경고 모달
const toastWarnMessage = ref();
const handleWarnToast = (message) => {
  document.querySelector("body").classList.add("is-hidden");
  modals["toastWarnModal"] = true;
  toastWarnMessage.value = message;
};

const modalOpen = (modalName) => {
  modals[modalName] = !modals[modalName];
  document.querySelector("body").classList.add("is-hidden");
};

const beforeEnter = (el) => {
  el.style.height = "0";
};

const enter = (el) => {
  el.style.transition = "all .4s ease";
  el.style.height = el.scrollHeight + "px";
};

const beforeLeave = (el) => {
  el.style.height = el.scrollHeight + "px";
};

const leave = (el) => {
  el.style.transition = "all .4s ease";
  el.style.height = "0";
};

// 프로필 이미지 변경
const previewImage = ref(null);

const getPreviewImage = (src) => {
  if (!src) return "";

  // base64일 경우: data:image/... 로 시작
  if (typeof src === "string" && src.startsWith("data:image")) {
    return src;
  }

  // 절대 URL인지 확인
  if (
    typeof src === "string" &&
    (src.startsWith("http://") || src.startsWith("https://"))
  ) {
    return src;
  }

  // 상대경로일 경우 prefix 붙이기
  return common.getImg(src);
};

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

const nicknameCeck = async () => {
  if (!form.value.nickname) {
    handleToast("닉네임을 입력해주세요.");
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
    const { message } = await memberApi._membermodify(form.value);
    handleToast(message);

    const updated = await memberInfo();

    // ✅ 여기서 sessionStorage 갱신
    if (updated.binary_filepath) {
      sessionStorage.setItem("binary_filepath", updated.binary_filepath);
    }

    setTimeout(() => {
      if (import.meta.client) window.location.reload();
    }, 1200); // 1~1.5초 권장

    // form.value = { ...defaultForm }; // ✅ 초기값으로 초기화
  } catch (err) {
    handleErrorToast(err.message);
  }
};

const memberInfo = async () => {
  try {
    const res = await memberApi._memberinfo(); // await 기반으로 수정

    // 원본 보존용
    defaultForm.value = {
      ...res.memberinfo,
      agree_email: res.memberinfo.agree_email === "1",
      newpassword: "",
      newemail: "",
      passwordchk: false,
      handphonechk: false,
      newhandphone: "",
      auth_number: "",
      filename: null,
      recaptcha_token: "",
    };

    // 프리뷰 이미지 세팅
    previewImage.value = res.memberinfo.binary_filepath;

    // 화면 출력용 form 복사
    form.value = { ...defaultForm.value };
    console.log("form.value", form.value);
    return res.memberinfo;
  } catch (err) {
    console.error("get_memberinfo error:", err);
    handleErrorToast("서버와의 통신에 문제가 발생했습니다.");
  }
};

onMounted(() => {
  // _preferShopList();
  memberInfo();
});

definePageMeta({
  layout: "sub-page",
});

useHead({
  htmlAttrs: {
    lang: "ko",
  },
  title: "나의 정보",
  meta: [{ name: "description", content: "나의 정보 페이지 입니다." }],
});
</script>
<style lang="scss" scoped>
@use "@/assets/scss/pages/membership.scss";
</style>
