<template>
    <div class="modal modal-recommend-active-register" :class="{ 'is-active' : isOpen }" @click.self="modalClose">
        <div class="modal-container">
            <div class="modal-header">
                <p class="title">추천운동 등록</p>
                <button type="button" class="btn-close" @click="modalClose" aria-label="닫기">
                    <img src="/images/icon/icon_close_grey.png" alt="icon_close_grey">
                </button>
            </div>
            <div class="modal-body">
                <div class="cont">
                    <div class="cont-list">
                        <label>아카데미 대표 이미지</label>
                        <div class="cont-list-box">
                            <div class="img-area" 
                                    :class="{ 'no-data' : images.academy === null }" 
                                    :style="images.academy ? { backgroundImage: `url('${images.academy}')` } : {}" />
                            <div class="btn-wrap">
                                <div class="btn-group">
                                    <button type="button" class="btn-sm-line">등록</button>
                                    <input
                                        type="file"
                                        @change="onFileChange($event, 'academy')"
                                        accept="image/*"
                                    />
                                </div>
                                <button type="button" class="btn-sm-line" @click="removeFile('academy')">삭제</button>
                            </div>  
                        </div>
                    </div>
                    <div class="cont-list">
                        <label>제목<span class="required"></span></label>
                        <div class="cont-list-box">
                            <div class="input-text">
                                <input
                                    type="text"
                                    placeholder="제목"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="cont-list col-2">
                        <label>대상(난이도)<span class="required"></span></label>
                        <div class="cont-list-box">
                            <div class="select-default">
                                <select>
                                    <option>대상을 선택하세요</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="cont-list">
                        <label>태그<span class="required"></span></label>
                        <div class="cont-list-box">
                            <div class="input-text">
                                <input
                                    type="text"
                                    placeholder="#태그 입력(#으로 구분, 최대 5개)"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="cont-list">
                        <label>아카데미 소개글<span class="required"></span></label>
                        <div class="cont-list-box">
                            <div class="text-area">
                                <textarea
                                    placeholder="내용을 입력하세요."
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="cont-list">
                        <label>코치 소개글<span class="required"></span></label>
                        <div class="cont-list-box">
                            <div class="text-area">
                                <textarea
                                    placeholder="내용을 입력하세요."
                                ></textarea>
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

// 여러 이미지를 객체로 관리
const images = ref({
  academy: null,
  coach: null,
});

// 파일 변경
const onFileChange = (event, key) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = () => {
      images.value[key] = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

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