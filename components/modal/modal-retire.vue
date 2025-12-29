<template>
    <div class="modal modal-confirm" :class="{ 'is-active' : isOpen }" @click.self="modalClose">
        <div class="modal-container">
            <div class="modal-header">
                <p class="title">회원 탈퇴하기</p>
                <button type="button" class="btn-close" @click="modalClose" aria-label="닫기">
                    <img src="/images/icon/icon_close_grey.png" alt="icon_close_grey">
                </button>
            </div>
            <div class="modal-body">
                <div class="content">
                    회원 탈퇴 하기 전에 반드시 확인하세요.
                    <br><br>
                    회원 계정의 탈퇴가 완료된 회원은 모든 서비스를 이용할 수 없습니다.
                    <br><br>
                    또한, 수강 중인 강좌는 자동으로 수강 취소된다는 점 유념하시기 바랍니다.
                </div>
            </div>
            <div class="modal-footer">
                <div class="btn-wrap">
                    <button type="button" class="btn-lg-line" @click="modalClose">취소</button>
                    <button type="button" class="btn-default btn-lg-fill" @click="modalClose">확인</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:isOpen']);
const modalClose = () => {
    emit('update:isOpen', false);
    document.querySelector('body').classList.remove('is-hidden');
}

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
@use '@/assets/scss/components/modal.scss';
</style>