<template>
  <div
    class="modal modal-coaching-write"
    :class="{ 'is-active': isOpen }"
    @click.self="modalClose"
  >
    <div class="modal-container">
      <div class="modal-header">
        <p class="title">코칭 제목 등록</p>
        <button type="button" class="btn-close" @click="modalClose" aria-label="닫기">
          <img src="/images/icon/icon_close_grey.png" alt="icon_close_grey" />
        </button>
      </div>
      <div class="modal-body">
        <table>
            <colgroup>
                <col width="20%">
                <col width="*">
            </colgroup>
            <tbody>
                <tr>
                    <th>제목</th>
                    <td>
                        <div class="input-text">
                            <input type="text" placeholder="제목을 입력해주세요.">
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td>
                        <div class="text-area">
                            <textarea placeholder="한글 100자 3줄까지 입력가능합니다."></textarea>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>상태</th>
                    <td>
                        <div class="radio-list">
                            <div class="radio-box">
                                <input type="radio" id="radio_00" name="radio_00">
                                <label for="radio_00">
                                    <span class="check-box-item" />
                                    <span class="check-box-txt">공개</span>
                                </label>
                            </div> 
                        </div>
                        <div class="radio-list">
                            <div class="radio-box">
                                <input type="radio" id="radio_01" name="radio_00">
                                <label for="radio_01">
                                    <span class="check-box-item" />
                                    <span class="check-box-txt">비공개</span>
                                </label>
                            </div> 
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <div class="btn-wrap">
            <button type="button" class="btn-md-line" @click="modalClose">
                취소하기
            </button>
            <button type="button" class="btn-md-fill btn-primary-purple" @click="modalClose">
                저장하기
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
