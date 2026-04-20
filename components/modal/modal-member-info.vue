<template>
  <div
    class="modal modal-member-info"
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
        <div class="content-section">
          <p class="title">기본 정보</p>
          <table>
              <colgroup>
                  <col width="20%">
                  <col width="*">
              </colgroup>
              <tbody>
                  <tr>
                      <th>닉네임</th>
                      <td>홍길동</td>
                      <th>성별</th>
                      <td>남</td>
                  </tr>
                  <tr>
                      <th>단골매장</th>
                      <td>
                          <span class="color-grey">2024.07.17</span>
                      </td>
                      <th>가입일</th>
                      <td>1999.09.19</td>
                  </tr>
              </tbody>
          </table>
        </div>
        <div class="content-section">
          <p class="title">
            <span>추가 정보</span>
            <span class="sub">(18홀 완료*)</span>
          </p>
          <table>
            <colgroup>
              <col width="30%">
              <col width="*">
            </colgroup>
            <tbody>
              <tr>
                <th>평균 성공 퍼트 거리</th>
                <td>6m</td>
                <th>전체 라운드</th>
                <td>9</td>
              </tr>
              <tr>
                <th>평균 드라이버 거리</th>
                <td>222m</td>
                <th>페어웨이 안착률</th>
                <td>58.02%</td>
              </tr>
              <tr>
                <th>GIR&</th>
                <td>222</td>
                <th>파 세이브율</th>
                <td> 73.46</td>
              </tr>
              <tr>
                <th>평균 타수</th>
                <td>2222</td>
                <th>최저 타수</th>
                <td>-9</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <div class="btn-wrap">
          <button type="button" class="btn-md-line" @click="modalClose">
            닫기
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
