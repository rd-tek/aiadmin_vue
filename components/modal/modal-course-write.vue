<template>
  <div
    class="modal modal-course-write"
    :class="{ 'is-active': isOpen }"
    @click.self="modalClose"
  >
    <div class="modal-container">
      <div class="modal-header">
        <p class="title">코스 홀 정보 등록/수정</p>
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
                    <th>코스명</th>
                    <td>
                        <b>XG드래곤밸리</b>
                    </td>
                </tr>
                <tr>
                    <th>서브 코스명</th>
                    <td>lake course</td>
                </tr>
                <tr>
                    <th>홀</th>
                    <td>2H</td>
                </tr>
                <tr>
                    <th>홀 이미지</th>
                    <td>
                        <div class="input-wrap">
                            <div class="input-text">
                                <input type="text" placeholder="선택해 주세요">
                            </div>
                            <button type="button" class="btn-md-line">파일선택</button>
                        </div>
                        <p class="file">$1000_01H_GRN_L.png</p>
                    </td>
                </tr>
                <tr>
                    <th>코스 미니맵</th>
                    <td>
                        <div class="input-wrap">
                            <div class="input-text">
                                <input type="text" placeholder="선택해 주세요">
                            </div>
                            <button type="button" class="btn-md-line">파일선택</button>
                        </div>
                        <p class="file">$1000_01H_GRN_L.png</p>
                    </td>
                </tr>
                <tr>
                    <th>그린 미니맵(좌)</th>
                    <td>
                        <div class="input-wrap">
                            <div class="input-text">
                                <input type="text" placeholder="선택해 주세요">
                            </div>
                            <button type="button" class="btn-md-line">파일선택</button>
                        </div>
                        <p class="file">$1000_01H_GRN_L.png</p>
                    </td>
                </tr>
                <tr>
                    <th>그린 미니맵(우)</th>
                    <td>
                        <div class="input-wrap">
                            <div class="input-text">
                                <input type="text" placeholder="선택해 주세요">
                            </div>
                            <button type="button" class="btn-md-line">파일선택</button>
                        </div>
                        <p class="file">$1000_01H_GRN_L.png</p>
                    </td>
                </tr>
                <tr>
                    <th>홀 동영상</th>
                    <td>
                        <div class="input-wrap">
                            <div class="input-text">
                                <input type="text" placeholder="선택해 주세요">
                            </div>
                            <button type="button" class="btn-md-line">파일선택</button>
                        </div>
                        <p class="file">$1000_01H_GRN_L.png</p>
                    </td>
                </tr>
                <tr>
                    <th>홀 소개</th>
                    <td>
                        <div class="text-area">
                            <textarea placeholder="한글 100자 3줄까지 입력가능합니다."></textarea>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <div class="btn-wrap">
            <button type="button" class="btn-md-line" @click="modalClose">
                닫기
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
