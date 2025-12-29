<template>
    <transition name="toast-fade">
        <div class="toast-modal toast-modal-delete" :class="{ 'is-active': isOpen }" ref="toastRef">
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                            <path d="M14 5V4.2C14 3.0799 14 2.51984 13.782 2.09202C13.5903 1.71569 13.2843 1.40973 12.908 1.21799C12.4802 1 11.9201 1 10.8 1H9.2C8.07989 1 7.51984 1 7.09202 1.21799C6.71569 1.40973 6.40973 1.71569 6.21799 2.09202C6 2.51984 6 3.0799 6 4.2V5M8 10.5V15.5M12 10.5V15.5M1 5H19M17 5V16.2C17 17.8802 17 18.7202 16.673 19.362C16.3854 19.9265 15.9265 20.3854 15.362 20.673C14.7202 21 13.8802 21 12.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V5" stroke="#D92D20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="cont-area">
                    <div class="tit">{{ toastDeleteMessage }}</div>
                    <p class="dsc">이 게시물을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.</p>
                </div>
            </div>
            <div class="toast-modal-footer">
                <div class="btn-wrap">
                    <button type="button" class="btn-lg-line" @click="modalClose">취소</button>
                    <button type="button" class="btn-primary-red btn-lg-fill" @click="modalConfirm">확인</button>
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
  toastDeleteMessage: { type: [String, Boolean], default: false },
});

const emit = defineEmits(["update:isOpen", 'confirm', 'delete']);
const messageShow = ref(true);
const modalClose = () => {
    emit("update:isOpen", false);
    document.querySelector('body').classList.remove('is-hidden');
}

const modalConfirm = () => {
    emit("update:isOpen", false);
    emit("confirm", true);
    emit("delete", true);
    document.querySelector('body').classList.remove('is-hidden');
}

</script>