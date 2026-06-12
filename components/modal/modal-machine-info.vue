<template>
  <div
    class="modal modal-machine-info"
    :class="{ 'is-active': isOpen }"
    @click.self="modalClose"
  >
    <div class="modal-container">
      <div class="modal-header">
        <p class="title">장비 정보</p>
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
                            <option v-for="(room, i) in 26" :key="i">Room {{ i + 1 }}</option>
                        </select>
                    </div>
                    </td>
                </tr>
                <tr>
                <th>룸 이름</th>
                <td>
                    <div class="input-text">
                        <input type="text" v-model="modal_form.roomname" placeholder="이름을 입력해주세요.">
                    </div>
                </td>
                </tr>
                <tr>
                <th>인원</th>
                <td>
                    <div class="input-wrap">
                        <div class="input-text">
                            <input type="text" v-model="modal_form.roomcnt">
                        </div>
                        <div class="input-text">
                            <input type="text" v-model="modal_form.roomno">
                        </div>
                        <div class="input-text">
                            <input type="text" v-model="modal_form.hwmodelno">
                        </div>
                    </div>
                </td>
                </tr>
                <tr>
                <th>H/W 모델</th>
                <td>
                    <div class="select-default">
                        <select v-model="modal_form.hwmodelno">
                            <option value="1">xgolf zes</option>
                            <option value="2">xgolf nex</option>
                            <option value="3">xgolf eye</option>
                            <option value="4">xgolf black</option>
                            <option value="5">xgolf nex S</option>
                            <option value="6">xgolf club</option>
                            <option value="7">xgolf etc</option>
                            <option value="8">none</option>
                        </select>
                    </div>
                </td>
                </tr>
                <tr>
                <th>S/W 모델</th>
                <td>
                    <div class="select-default">
                        <select v-model="modal_form.swmodelno">
                            <option value="1">10001</option>
                            <option value="2">10002</option>
                        </select>
                    </div>
                </td>
                </tr>
                <tr>
                <th>설치일</th>
                <td>
                    <div class="datepicker">
                        <VueDatePicker 
                            v-model="insDate"
                            :format="formatInsDate" 
                            date-picker
                            auto-apply
                            @open="isFocused = true"
                            @closed="isFocused = false"
                            teleport
                        />
                    </div>
                </td>
                </tr>
                <tr>
                <th>상태</th>
                <td>
                    <div class="select-default">
                        <select v-model="modal_form.roomstatus">
                            <option value="1">사용 가능</option>
                            <option value="2">사용 불가능</option>
                        </select>
                    </div>
                </td>
                </tr>
                <tr>
                <th>토큰명</th>
                <td>
                    <div class="input-text">
                        <input type="text" v-model="modal_form.token" placeholder="토큰명을 넣어주세요.">
                    </div>
                </td>
                </tr>
                <tr>
                <th>만료기한</th>
                <td>
                    <div class="datepicker">
                        <VueDatePicker 
                            v-model="expDate"
                            :format="formatExpDate" 
                            date-picker
                            auto-apply
                            @open="isFocused = true"
                            @closed="isFocused = false"
                            teleport
                        />
                    </div>
                </td>
                </tr>
            </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <div class="btn-wrap column-reverse">
            <button type="button" class="btn-md-line" @click="modalClose">
                닫기
            </button>
            <button type="button" class="btn-md-fill btn-primary-purple" @click="modalSave">
                등록하기
            </button>
        </div>
      </div>
    </div>

    <!-- 토스트 알림 모달 -->
    <toast-modal
        :isOpen="modals.toastModal"
        :toastMessage="toastMessage"
        @update:isOpen="modals.toastModal = $event"
    />

    <!-- 토스트 경고 모달 -->
    <toast-warn-modal 
        :isOpen="modals.toastWarnModal"
        :toastWarnMessage="toastWarnMessage"
        @update:isOpen="modals.toastWarnModal = $event"/>

    <!-- 토스트 에러 모달 -->
    <toast-error-modal 
        :isOpen="modals.toastErrorModal"
        :toastErrorMessage="toastErrorMessage"
        @update:isOpen="modals.toastErrorModal = $event"/>

  </div>
</template>
<script setup>
import dayjs from 'dayjs'
import { useMembersApi } from "~/api/member";
import toastModal from '@/components/toast-ui/toast-modal.vue';
import toastWarnModal from '@/components/toast-ui/toast-warn-modal.vue';
import toastErrorModal from '@/components/toast-ui/toast-error-modal.vue';

const membersApi = useMembersApi();
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    default: null
  }
});

const emit = defineEmits([
  "update:isOpen",
  "saved"
]);

const modalClose = () => {
  emit("update:isOpen", false);
  document.querySelector("body").classList.remove("is-hidden");
};

const modal_form = reactive({
  ownerno: "",
  roomcnt: 0,
  roomno: 0,
  roomname: "",
  maincode: "",
  subcode: "",
  etccode: "",
  hwmodelno: 1,
  swmodelno: 1,
  installdate: "",
  roomstatus: 1,
  apipk: 0,
  token: "",
  expdate: dayjs().add(1, "year").format("YYYY-MM-DD"),
})

const expDate = ref(new Date());
const formatExpDate = (date) => {
  const year = date.getFullYear();
  const month =  `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}.${month}.${day}`
}

const insDate = ref(new Date());
const formatInsDate = (date) => {
  const year = date.getFullYear();
  const month =  `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}.${month}.${day}`
}

const modals = reactive({});
const toastMessage = ref();
const toastWarnMessage = ref();
const toastErrorMessage = ref();

// 2026.06.04[cgnoh]: 저장 토스트
const openSaveToast = (message) => {
  document.querySelector('body').classList.add('is-hidden');
  modals['toastModal'] = true;
  toastMessage.value = message;
}

// 2026.06.04[cgnoh]: 경고 토스트
const openWarnToast = (message) => {
  document.querySelector('body').classList.add('is-hidden');
  modals['toastWarnModal'] = true;
  toastWarnMessage.value = message;
}

// 2026.06.04[cgnoh]: 에러 토스트
const openErrorToast = (message) => {
  document.querySelector('body').classList.add('is-hidden');
  modals['toastErrorModal'] = true;
  toastErrorMessage.value = message;
}

const modalSave = async () => {
  try {
    if (!modal_form.roomname?.trim()) {
      openWarnToast("룸 이름을 입력해주세요.");
      return;
    }

    if (!modal_form.roomcnt) {
      openWarnToast("인원을 입력해주세요.");
      return;
    }

    if (!modal_form.token?.trim()) {
      openWarnToast("토큰명을 입력해주세요.");
      return;
    }

    const payload = {
      ...modal_form,

      installdate: insDate.value
        ? dayjs(insDate.value).format("YYYY-MM-DD")
        : "",

      expdate: expDate.value
        ? dayjs(expDate.value).format("YYYY-MM-DD")
        : "",
    };

    const res = await membersApi._adminOwnerRoomWrite(payload);

    if (res?.code === 200) {
      openSaveToast("등록되었습니다.");

      emit("saved");

      modalClose();
    } else {
      openErrorToast(res?.message || "저장에 실패했습니다.");
    }
  } catch (error) {
    console.error(error);
    openErrorToast("저장 중 오류가 발생했습니다.");
  }
};

watch(
  () => props.item,
  (item) => {
    if (!item) return;

    modal_form.ownerno = item.ownerno || item.owner_pk;

    console.log("owner info", modal_form.ownerno);
  },
  { immediate: true }
);

</script>
<style lang="scss" scoped>
@use "@/assets/scss/components/modal.scss";
</style>
