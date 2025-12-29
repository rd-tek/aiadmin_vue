<template>
    <transition name="toast-fade">
        <div class="toast-modal toast-modal-confirm" :class="{ 'is-active': isOpen }" ref="toastRef">
            <div class="toast-modal-header">
                <button type="button" class="btn-close" @click="modalClose" aria-label="닫기">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 3.88906L8.88906 0L10 1.11094L6.11094 5L10 8.88906L8.88906 10L5 6.11094L1.11094 10L0 8.88906L3.88906 5L0 1.11094L1.11094 0L5 3.88906Z" fill="#52575C"/>
                    </svg>
                </button>
            </div>
            <div class="toast-modal-body">
                <div class="img-area">
                    <div class="img-area-inner">
                        <img src="/images/imoji/imoji_01.png" alt="imoji_01">
                    </div>
                </div>
                <div class="cont-area">
                    <div class="tit">{{ toastConfirmMessage }}</div>
                    <p class="dsc">이 게시물을 수정하시겠습니까? 이 작업은 취소할 수 없습니다.</p>
                </div>
            </div>
            <div class="toast-modal-footer">
                <div class="btn-wrap">
                    <button type="button" class="btn-lg-line" @click="modalClose">취소</button>
                    <button type="button" class="btn-primary-yellow btn-lg-fill" @click="modalConfirm">확인</button>
                </div>
            </div>
        </div>
    </transition>
    <transition name="fade">
        <div class="toast-bg" v-if="messageShow"></div>
    </transition>
</template>
<script setup>
const props = defineProps({
  isOpen: { type: Boolean, default: false },
  toastConfirmMessage: { type: [String, Boolean], default: false },
});

const emit = defineEmits(["update:isOpen", 'confirm']);
const messageShow = ref(true);
const modalClose = () => {
    emit("update:isOpen", false);
    document.querySelector('body').classList.remove('is-hidden');
}

const modalConfirm = () => {
    emit("update:isOpen", false);
    emit("confirm", true);
    document.querySelector('body').classList.remove('is-hidden');
}

</script>