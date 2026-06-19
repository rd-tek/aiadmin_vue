<template>
  <div
    class="modal modal-swing-info"
    :class="{ 'is-active': isOpen }"
    @click.self="modalClose"
  >
    <div class="modal-container">
      <div class="modal-header">
        <p class="title">회원 정보</p>
        <button type="button" class="btn-close" @click="modalClose" aria-label="닫기">
          <img src="/images/icon/icon_close_grey.png" alt="icon_close_grey" />
        </button>
      </div>
      <div class="modal-body">
        <div class="form">
            <div class="form-list">
                <label for="">제목</label>
                <div class="form-list-box">
                    <div class="input-text">
                        <input type="text" v-model="form.title" placeholder="제목을 입력해주세요." />
                    </div>
                </div>
            </div>
            <div class="form-list">
                <label for="">내용</label>
                <div class="form-list-box">
                    <textarea v-model="form.content"></textarea>
                </div>
            </div>
            <div class="form-list">
                <label for="">상태</label>
                <div class="form-list-box">
                    <div class="checkbox-list">
                        <div class="check-box">
                            <input
                                type="radio"
                                id="chk_01"
                                name="view_flag"
                                value="1"
                                v-model="form.flag"
                            >
                            <label for="chk_01">
                                <span class="check-box-item">
                                    <i class="item-line" />
                                </span>
                                <span class="check-box-txt">공개</span>
                            </label>
                        </div>
                    </div>
                    <div class="checkbox-list">
                        <div class="check-box">
                            <input
                                type="radio"
                                id="chk_02"
                                name="view_flag"
                                value="0"
                                v-model="form.flag"
                            >
                            <label for="chk_02">
                                <span class="check-box-item">
                                    <i class="item-line" />
                                </span>
                                <span class="check-box-txt">비공개</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="btn-wrap">
            <button type="button" class="btn-md-line" @click="modalClose">
                취소
            </button>
            <button type="button" class="btn-md-fill btn-primary-purple" @click="modalSave">
                저장
            </button>
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


  </div>
</template>
<script setup>
import { useSwingApi } from "~/api/swing";
import toastModal from '@/components/toast-ui/toast-modal.vue';
import toastWarnModal from '@/components/toast-ui/toast-warn-modal.vue';
import toastErrorModal from '@/components/toast-ui/toast-error-modal.vue';

// 2026.06.18[cgnoh]: api 관련
const { _swingTitleWrite } = useSwingApi();
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
    item: {
        type: Object
    }
});

const emit = defineEmits([
  "update:isOpen",
  "saved"
]);

// 2026.06.18[cgnoh]: 모달 닫기
const modalClose = () => {
  emit("update:isOpen", false);
  document.querySelector("body").classList.remove("is-hidden");
};

// 2026.06.18[cgnoh]: 폼 형태
const form = reactive({
  swing_pk: "",
  title: "",
  content: "",
  flag: "1",
});

// 2026.06.15[cgnoh]: 토스트 메시지 관련
const toastMessage = ref();
const toastWarnMessage = ref();
const toastErrorMessage = ref();

// 2026.06.15[cgnoh]: 모달 관련
const modals = reactive({});

// 2026.06.04[cgnoh]: 저장 토스트
const openSaveToast = (message) => {
  document.querySelector('body').classList.add('is-hidden');
  modals['toastModal'] = true;
  toastMessage.value = message;
}

// 2026.06.04[cgnoh]: 경고 토스트
const openWarnToast = (message) => {
  document.querySelector('body').classList.add('is-hidden');
  modals['toastWarnModal'] = true;
  toastWarnMessage.value = message;
}

// 2026.06.04[cgnoh]: 에러 토스트
const openErrorToast = (message) => {
  document.querySelector('body').classList.add('is-hidden');
  modals['toastErrorModal'] = true;
  toastErrorMessage.value = message;
}

// 2026.06.18[cgnoh]: 모달 저장
const modalSave = async () => {
  try {
    if (!form.title.trim()) {
      openWarnToast("제목을 입력해주세요.");
      return;
    }

    const res = await _swingTitleWrite(
      form.swing_pk,
      form.title,
      form.content,
      form.flag
    );

    if (res.code === 200) {
      openSaveToast("저장되었습니다.");

      emit("saved");
      emit("update:isOpen", false);

      document.body.classList.remove("is-hidden");
    } else {
      openErrorToast(res.message || "저장에 실패했습니다.");
    }
  } catch (err) {
    console.error(err);
    openWarnToast("저장 중 오류가 발생했습니다.");
  }
};

watch(
  () => props.item,
  (item) => {
    if (!item) return;

    form.swing_pk = item.swing_pk;
    form.title = item.title || "";
    form.content = item.content || "";
    form.flag = item.view_flag ?? "1";
  },
  { immediate: true }
);

</script>
<style lang="scss" scoped>
@use "@/assets/scss/components/modal.scss";
</style>
