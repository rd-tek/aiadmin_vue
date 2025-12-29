<template>
    <div class="modal modal-map" :class="{ 'is-active' : isOpen }" @click.self="modalClose">
        <div class="modal-container">
            <div class="modal-header">
                <p class="title">가나 스크린골프</p>
                <button type="button" class="btn-close" @click="modalClose" aria-label="닫기">
                    <img src="/images/icon/icon_close_grey.png" alt="icon_close_grey">
                </button>
            </div>
            <div class="modal-body">
                <div class="content">
                    <img src="/images/default/img_sample_01.png" alt="img_sample_01">
                    <div class="content-desc">
                        <div class="content-desc-row">
                            <p class="title">매장 유형</p>
                            <div class="desc">직영점</div>
                        </div>
                        <div class="content-desc-row">
                            <p class="title">주소</p>
                            <div class="desc">경기도 성남시 분당구 정자일로 95, 1784</div>
                        </div>
                        <div class="content-desc-row">
                            <p class="title">이메일</p>
                            <div class="desc">test@test.com</div>
                        </div>
                        <div class="content-desc-row">
                            <p class="title">홈페이지</p>
                            <div class="desc">가나 스크린골프</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="btn-wrap">
                    <button type="button" class="btn-lg-line" @click="modalClose">확인</button>
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