<template>
  <div
    class="modal modal-machine-info"
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
        <table>
            <colgroup>
                <col width="20%">
                <col width="*">
            </colgroup>
            <tbody>
                <tr>
                    <th>번호</th>
                    <td>
                    <div class="select-default">
                        <select>
                            <option>Room 1</option>
                        </select>
                    </div>
                    </td>
                </tr>
                <tr>
                <th>룸 이름</th>
                <td>
                    <div class="input-text">
                        <input type="text" placeholder="이름을 입력해주세요.">
                    </div>
                </td>
                </tr>
                <tr>
                <th>인원</th>
                <td>
                    <div class="input-wrap">
                        <div class="input-text">
                            <input type="text" value="1">
                        </div>
                        <div class="input-text">
                            <input type="text" value="2">
                        </div>
                        <div class="input-text">
                            <input type="text" value="3">
                        </div>
                    </div>
                </td>
                </tr>
                <tr>
                <th>H/W 모델</th>
                <td>
                    <div class="select-default">
                        <select>
                            <option>xgolf eye</option>
                        </select>
                    </div>
                </td>
                </tr>
                <tr>
                <th>S/W 모델</th>
                <td>
                    <div class="select-default">
                        <select>
                            <option>super leisure</option>
                        </select>
                    </div>
                </td>
                </tr>
                <tr>
                <th>설치일</th>
                <td>
                    <div class="datepicker">
                        <VueDatePicker 
                            v-model="month"
                            :format="formatMonth" 
                            month-picker
                            auto-apply
                            @open="isFocused = true"
                            @closed="isFocused = false"
                        />
                    </div>
                </td>
                </tr>
                <tr>
                <th>상태</th>
                <td>
                    <div class="select-default">
                        <select>
                            <option>사용 가능</option>
                        </select>
                    </div>
                </td>
                </tr>
                <tr>
                <th>토큰명</th>
                <td>
                    <div class="input-text">
                        <input type="text" placeholder="토큰명을 넣어주세요.">
                    </div>
                </td>
                </tr>
                <tr>
                <th>상태</th>
                <td>
                    <div class="datepicker">
                        <VueDatePicker 
                            v-model="month"
                            :format="formatMonth" 
                            month-picker
                            auto-apply
                            @open="isFocused = true"
                            @closed="isFocused = false"
                        />
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
                등록하기
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
