<template>
    <div class="modal modal-confirm" :class="{ 'is-active' : isOpen }" @click.self="modalClose">
        <div class="modal-container">
            <div class="modal-header">
                <p class="title">단골매장 변경</p>
                <button type="button" class="btn-close" @click="modalClose" aria-label="닫기">
                    <img src="/images/icon/icon_close_grey.png" alt="icon_close_grey">
                </button>
            </div>
            <div class="modal-body">
                <div class="content">
                    단골매장이 변경됩니다. 계속 진행 하시겠습니까?
                </div>
            </div>
            <div class="modal-footer">
                <div class="btn-wrap">
                    <button type="button" class="btn-md-line" @click="modalClose">취소</button>
                    <button type="button" class="btn-primary-yellow btn-md-fill" @click="modalOpen">확인</button>
                </div>
            </div>
        </div>
        <modal-map :isOpen="modals.modalMap" @update:isOpen="modals.modalMap = $event" />
    </div>
</template>
<script setup>
import ModalMap from './modal-map.vue';

const modals = reactive({modalMap: false});
const modalOpen = () => {
    modals['modalMap'] = !modals['modalMap'];
    document.querySelector('.modal-map').style.background = 'none'
    document.querySelector('body').classList.add('is-hidden');
};

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