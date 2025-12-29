<template>
    <div class="modal modal-confirm" :class="{ 'is-active' : isOpen }" @click.self="modalClose">
        <div class="modal-container">
            <div class="modal-header">
                <p class="title">카테고리 삭제</p>
                <button type="button" class="btn-close" @click="modalClose" aria-label="닫기">
                    <img src="/images/icon/icon_close_grey.png" alt="icon_close_grey">
                </button>
            </div>
            <div class="modal-body">
                <div class="content">
                    카테고리에 속한 모든 글이 삭제됩니다. 계속 진행 하시겠습니까?
                </div>
            </div>
            <div class="modal-footer">
                <div class="btn-wrap">
                    <button type="button" class="btn-md-line" @click="modalClose">취소</button>
                    <button type="button" class="btn-primary-yellow btn-md-fill" @click="confirmDelete">확인</button>
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

const emit = defineEmits(['update:isOpen', 'confirm']);
const modalClose = () => {
    emit('update:isOpen', false);
    document.querySelector('body').classList.remove('is-hidden');
}

const confirmDelete = () => {
    emit('confirm', true);
    modalClose();
}

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if(e.key === "Escape") {
      modalClose();
    }
  });
})

onUnmounted(() => {
  window.removeEventListener("keydown", (e) => {
    if(e.key === "Escape") {
      modalClose();
    }
  });
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/components/modal.scss';
</style>