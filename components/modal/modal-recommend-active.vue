<template>
    <div class="modal modal-recommend-active" :class="{ 'is-active' : isOpen }" @click.self="modalClose">
        <div class="modal-container">
            <div class="modal-header">
                <p class="title">추천운동 상세</p>
                <button type="button" class="btn-close" @click="modalClose" aria-label="닫기">
                    <img src="/images/icon/icon_close_grey.png" alt="icon_close_grey">
                </button>
            </div>
            <div class="modal-body">
                <div class="content">
                    <div class="content-section">
                        <div class="img-area" :style="{ backgroundImage: `url('/images/default/img_recommend_01.png')` }">
                        </div>
                        <div class="cont">
                            <div class="table">
                                <div class="table-body">
                                    <div class="table-row">
                                        <div class="table-row-head">제목</div>
                                        <div class="table-row-data">추천운동1</div>
                                    </div>
                                    <div class="table-row">
                                        <div class="table-row-head">추천 대상</div>
                                        <div class="table-row-data">초급</div>
                                    </div>
                                    <div class="table-row">
                                       <div class="table-row-head">목적</div>
                                        <div class="table-row-data">자세관련</div>
                                    </div>
                                    <div class="table-row">
                                        <div class="table-row-head">내용</div>
                                        <div class="table-row-data">test</div>
                                    </div>
                                </div>
                            </div>
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