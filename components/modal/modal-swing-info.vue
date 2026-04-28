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
                        <input type="text" placeholder="제목을 입력해주세요."></input>
                    </div>
                </div>
            </div>
            <div class="form-list">
                <label for="">내용</label>
                <div class="form-list-box">
                    <textarea></textarea>
                </div>
            </div>
            <div class="form-list">
                <label for="">상태</label>
                <div class="form-list-box">
                    <div class="checkbox-list">
                        <div class="check-box">
                            <input type="radio" id="chk_01" name="chk_01">
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
                            <input type="radio" id="chk_02" name="chk_01">
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
            <button type="button" class="btn-md-fill btn-primary-purple" @click="modalClose">
                저장
            </button>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:isOpen']);
const modalClose = () => {
  emit("update:isOpen", false);
  document.querySelector("body").classList.remove("is-hidden");
};

</script>
<style lang="scss" scoped>
@use "@/assets/scss/components/modal.scss";
</style>
