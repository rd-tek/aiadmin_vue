<template>
  <div
    class="modal modal-mail-send"
    :class="{ 'is-active': isOpen }"
    @click.self="modalClose"
  >
    <div class="modal-container">
      <div class="modal-header">
        <p class="title">메일 보내기</p>
        <button type="button" class="btn-close" @click="modalClose" aria-label="닫기">
          <img src="/images/icon/icon_close_grey.png" alt="icon_close_grey" />
        </button>
      </div>
      <div class="modal-body">
        <div class="content">
          <div class="content-section">
            <div class="head">기본정보</div>
            <div class="cont">
              <div class="table">
                <div class="table-body">
                  <div class="table-row">
                    <div class="table-row-flex">
                      <div class="table-row-head">보내는 사람</div>
                      <div class="table-row-data">
                        <input
                          type="text"
                          placeholder="보내는 사람"
                          v-model="form.send_email"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="table-row">
                    <div class="table-row-flex">
                      <div class="table-row-head">받는 사람</div>
                      <div class="table-row-data">
                        <div class="input-text">
                          <input type="text" v-model="form.receiver" readonly />
                          <span class="text"
                            >총 {{ form.receiver?.length }}명</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="table-row">
                    <div class="table-row-flex">
                      <div class="table-row-head">제목</div>
                      <div class="table-row-data">
                        <div class="input-text">
                          <input
                            type="text"
                            v-model="form.title"
                            placeholder="제목"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="table-row">
                    <div class="table-row-flex">
                      <div class="table-row-head">내용</div>
                      <div class="table-row-data">
                        <div class="text-area">
                          <textarea
                            placeholder="내용을 입력하세요"
                            v-model="form.content"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <ul class="info">
                <li class="info-list">
                  * 파일 총 용량은 최대 26MB까지 (파일당 최대 4MB 등록 가능)
                </li>
                <li class="info-list">* JPG, JPEG, PNG, ZIP 유형만 가능</li>
              </ul> -->
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="btn-wrap">
          <button type="button" class="btn-lg-line" @click="modalClose">
            취소
          </button>
          <button
            type="button"
            class="btn-primary-teal btn-lg-fill"
            @click="handleSubmit"
          >
            보내기
          </button>
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
import { useMembersApi } from "~/api/members";
import toastModal from '@/components/toast-ui/toast-modal.vue';
import toastErrorModal from '@/components/toast-ui/toast-error-modal.vue';

const modals = reactive({});
const membersApi = useMembersApi();
const form = ref({});
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:isOpen", "refresh"]);
const modalClose = () => {
  emit("update:isOpen", false);
  document.querySelector("body").classList.remove("is-hidden");
};

const handleSubmit = async () => {
  try {
    // 문자열 → 배열 변환
    // const receiverArray = form.value.receiver
    //   .split(";")
    //   .map((v) => v.trim())
    //   .filter((v) => v !== "");

    // // form.value.receiver를 배열로 재설정
    // form.value.receiver = receiverArray;

    const { message } = await membersApi._playersend(form.value);

    handleToast(message);
    emit("update:isOpen", false);
    emit("refresh");
  } catch (err) {
    handleErrorToast(err.message);
  }
};

// 토스트 확인 모달
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

watch(
  () => props.item,
  (val) => {
    if (!val) {
      form.value = {};
      return;
    }

    const tmp = { ...val };

    // 🔥 receiver 배열 → "a@a.com; b@b.com" 문자열로 변환
    if (Array.isArray(tmp.receiver)) {
      tmp.receiver = tmp.receiver.join("; ");
    }

    form.value = tmp;
  },
);

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if(e.key === "Escape") {
      modalClose();
    }
  });
})

onUnmounted(() => {
    window.addEventListener("keydown", (e) => {
    if(e.key === "Escape") {
      modalClose();
    }
  });
});
</script>
<style lang="scss" scoped>
@use "@/assets/scss/components/modal.scss";
</style>
