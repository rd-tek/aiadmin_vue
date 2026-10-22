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
          <img src="/images/icon/icon_close_grey.png" alt="" />
        </button>
      </div>
      <div class="modal-body">
        <!-- 2026-10-13: 서버(ownerroomview)에서 타석별 정보를 불러와 수정하도록 다시 구성.
             이전: 항상 빈 양식, 필수값(메인/서브/기타 코드) 입력칸 없음 → 저장 시 항상 검증 오류,
             '인원'(실제로는 매장 보유 타석 수, 저장도 안 됨) 표시, H/W·S/W 모델·번호 하드코딩 -->
        <p class="machine-summary">
          보유 타석 <strong>{{ roomCount }}</strong>개
          <span class="machine-summary-sub">(타석 수는 매장 정보에서 변경)</span>
        </p>
        <p v-if="loadError" class="machine-alert" role="alert">{{ loadError }}</p>
        <table>
            <colgroup>
                <col width="24%">
                <col width="*">
            </colgroup>
            <tbody>
                <tr>
                    <th><label for="mi-roomno">타석 번호</label></th>
                    <td>
                    <div class="select-default">
                        <select id="mi-roomno" v-model.number="modal_form.roomno" @change="loadRoom">
                            <option v-for="n in roomOptions" :key="n" :value="n">Room {{ n }}</option>
                        </select>
                    </div>
                    </td>
                </tr>
                <tr>
                <th><label for="mi-roomname">타석 이름</label> <span class="req">*</span></th>
                <td>
                    <div class="input-text">
                        <input id="mi-roomname" type="text" maxlength="20" v-model="modal_form.roomname" placeholder="예) 2층 NEX">
                    </div>
                </td>
                </tr>
                <tr>
                <th><label for="mi-maincode">메인 코드</label> <span class="req">*</span></th>
                <td>
                    <div class="input-text">
                        <input id="mi-maincode" type="text" v-model="modal_form.maincode" placeholder="메인 코드">
                    </div>
                </td>
                </tr>
                <tr>
                <th><label for="mi-subcode">서브 코드</label> <span class="req">*</span></th>
                <td>
                    <div class="input-text">
                        <input id="mi-subcode" type="text" v-model="modal_form.subcode" placeholder="서브 코드(시리얼)">
                    </div>
                </td>
                </tr>
                <tr>
                <th><label for="mi-etccode">기타 코드</label> <span class="req">*</span></th>
                <td>
                    <div class="input-text">
                        <input id="mi-etccode" type="text" v-model="modal_form.etccode" placeholder="기타 코드">
                    </div>
                </td>
                </tr>
                <tr>
                <th><label for="mi-hw">H/W 모델</label></th>
                <td>
                    <div class="select-default">
                        <select id="mi-hw" v-model="modal_form.hwmodelno">
                            <option value="">선택</option>
                            <option v-for="h in hwList" :key="h.hwmodelno" :value="String(h.hwmodelno)">{{ h.hwmodelname }}</option>
                        </select>
                    </div>
                </td>
                </tr>
                <tr>
                <th><label for="mi-sw">S/W 모델</label></th>
                <td>
                    <div class="select-default">
                        <select id="mi-sw" v-model="modal_form.swmodelno">
                            <option value="">선택</option>
                            <option v-for="s in swList" :key="s.swmodelno" :value="String(s.swmodelno)">{{ s.swmodelname }}</option>
                        </select>
                    </div>
                </td>
                </tr>
                <tr>
                <th>설치일</th>
                <td>
                    <div class="datepicker">
                        <!-- 2026-10-21: VueDatePicker 는 브라우저 전용 플러그인(plugins/vue-datepicker.client.ts)으로 등록돼 서버에서 못 그림 → ClientOnly(하이드레이션 경고 해소) -->
                        <ClientOnly>
                        <VueDatePicker
                            v-model="insDate"
                            :format="formatDate"
                            :enable-time-picker="false"
                            auto-apply
                            teleport
                            aria-label="설치일"
                        />
                        </ClientOnly>
                    </div>
                </td>
                </tr>
                <tr>
                <th><label for="mi-status">상태</label></th>
                <td>
                    <div class="select-default">
                        <select id="mi-status" v-model="modal_form.roomstatus">
                            <option value="1">사용 가능</option>
                            <option value="2">사용 불가능</option>
                        </select>
                    </div>
                </td>
                </tr>
                <tr>
                <th><label for="mi-token">토큰</label></th>
                <td>
                    <div class="input-text">
                        <input id="mi-token" type="text" v-model="modal_form.token" placeholder="장비 인증 토큰">
                    </div>
                </td>
                </tr>
                <tr>
                <th>만료기한</th>
                <td>
                    <div class="datepicker">
                      <ClientOnly>
                      <VueDatePicker
                        v-model="expDate"
                        :format="formatDate"
                        :enable-time-picker="false"
                        auto-apply
                        teleport
                        aria-label="만료기한"
                    />
                      </ClientOnly>
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
            <button type="button" class="btn-md-fill btn-primary-purple" :disabled="saving || !modal_form.simulator_pk" @click="modalSave">
                저장하기
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
  isOpen: { type: Boolean, default: false },
  item: { type: Object, default: null },
});
const emit = defineEmits(["update:isOpen", "saved"]);

const modalClose = () => {
  emit("update:isOpen", false);
  document.querySelector("body").classList.remove("is-hidden");
};

const emptyForm = () => ({
  ownerno: "",
  roomno: 1,
  roomname: "",
  maincode: "",
  subcode: "",
  etccode: "",
  hwmodelno: "",
  swmodelno: "",
  roomstatus: "1",
  simulator_pk: "",
  api_pk: "",
  token: "",
});
const modal_form = reactive(emptyForm());
const roomCount = ref(0);
const insDate = ref(null);
const expDate = ref(null);
const hwList = ref([]);
const swList = ref([]);
const loadError = ref("");
const saving = ref(false);

// 타석 번호 선택지 = 보유 타석 수(최소 1)
const roomOptions = computed(() => Array.from({ length: Math.max(1, Number(roomCount.value) || 0) }, (_, i) => i + 1));

const formatDate = (date) => (date ? dayjs(date).format("YYYY.MM.DD") : "");

const loadModels = async () => {
  if (hwList.value.length && swList.value.length) return;
  try {
    const [hw, sw] = await Promise.all([membersApi._adminOwnerRoomHwList(), membersApi._adminOwnerRoomSwList()]);
    hwList.value = hw?.ownerhwlist || [];
    swList.value = sw?.ownerswlist || [];
  } catch (e) {
    /* 모델 목록 실패해도 나머지는 표시 */
  }
};

// 선택한 타석 정보 불러오기
const loadRoom = async () => {
  loadError.value = "";
  const ownerno = modal_form.ownerno;
  const roomno = modal_form.roomno || 1;
  if (!ownerno) return;
  try {
    const res = await membersApi._adminOwnerRoomView(ownerno, roomno);
    const r = res?.ownerroominfo || {};
    Object.assign(modal_form, emptyForm(), {
      ownerno,
      roomno: Number(r.roomno || roomno),
      roomname: r.roomname || "",
      maincode: r.maincode || "",
      subcode: r.subcode || "",
      etccode: r.etccode || "",
      hwmodelno: r.hwmodelno ? String(r.hwmodelno) : "",
      swmodelno: r.swmodelno ? String(r.swmodelno) : "",
      roomstatus: r.roomstatus ? String(r.roomstatus) : "1",
      simulator_pk: r.simulator_pk || "",
      api_pk: r.api_pk || "",
      token: r.token || "",
    });
    roomCount.value = Number(r.roomcnt || 0);
    insDate.value = r.installdate ? dayjs(r.installdate).toDate() : null;
    expDate.value = r.expdate ? dayjs(r.expdate).toDate() : null;
    if (!r.simulator_pk) {
      loadError.value = "이 타석은 아직 생성되지 않았습니다. 매장 정보에서 타석 수를 저장하면 타석이 만들어집니다.";
    }
  } catch (e) {
    loadError.value = e?.data?.message || e?.message || "장비 정보를 불러오지 못했습니다.";
  }
};

watch(
  () => [props.isOpen, props.item],
  async ([open, item]) => {
    if (!open || !item) return;
    Object.assign(modal_form, emptyForm(), { ownerno: item.ownerno || item.owner_pk, roomno: 1 });
    await loadModels();
    await loadRoom();
  },
  { immediate: true }
);

const toastMessage = ref();
const toastWarnMessage = ref();
const toastErrorMessage = ref();
const modals = reactive({});
const openSaveToast = (message) => { document.querySelector('body').classList.add('is-hidden'); modals['toastModal'] = true; toastMessage.value = message; };
const openWarnToast = (message) => { document.querySelector('body').classList.add('is-hidden'); modals['toastWarnModal'] = true; toastWarnMessage.value = message; };
const openErrorToast = (message) => { document.querySelector('body').classList.add('is-hidden'); modals['toastErrorModal'] = true; toastErrorMessage.value = message; };

const modalSave = async () => {
  if (saving.value) return;
  const need = [["roomname", "타석 이름"], ["maincode", "메인 코드"], ["subcode", "서브 코드"], ["etccode", "기타 코드"]];
  for (const [k, label] of need) {
    if (!String(modal_form[k] ?? "").trim()) { openWarnToast(`${label}을(를) 입력해주세요.`); return; }
  }
  if (!modal_form.hwmodelno || !modal_form.swmodelno) { openWarnToast("H/W·S/W 모델을 선택해주세요."); return; }
  if (!insDate.value) { openWarnToast("설치일을 선택해주세요."); return; }
  if (!expDate.value) { openWarnToast("만료기한을 선택해주세요."); return; }
  saving.value = true;
  try {
    const res = await membersApi._adminOwnerRoomEdit({
      ...modal_form,
      installdate: dayjs(insDate.value).format("YYYY-MM-DD"),
      expdate: dayjs(expDate.value).format("YYYY-MM-DD"),
    });
    if (res?.code === 200) {
      openSaveToast(res?.message || "저장되었습니다.");
      emit("saved");
      await loadRoom();
    } else {
      openErrorToast(res?.message || "저장에 실패했습니다.");
    }
  } catch (error) {
    openErrorToast(error?.data?.message || "저장 중 오류가 발생했습니다.");
  } finally {
    saving.value = false;
  }
};
</script>
<style lang="scss" scoped>
@use "@/assets/scss/components/modal.scss";
.machine-summary { margin: 0 0 12px; font-size: 14px; color: #333; }
.machine-summary strong { font-weight: 700; }
.machine-summary-sub { margin-left: 6px; color: #6e6e6e; font-size: 13px; }
.machine-alert { margin: 0 0 12px; padding: 10px 12px; border-radius: 6px; background: #fff4e5; color: #8a4b00; font-size: 13px; line-height: 1.5; }
.req { color: #D81E3C; }
th label { font-weight: inherit; }

/* 2026-10-22: 항목 11줄이 세로로 쌓여 1440×900 에서도 팝업 안에 스크롤(본문 891 > 652) → PC(1024↑)는 2열.
   짝: 타석 번호·이름 / 메인·서브 코드 / 기타 코드(한 줄) / H/W·S/W / 설치일·상태 / 토큰·만료기한. 모바일은 기존 1열 */
@media screen and (min-width: 1024px) {
  table { display: block; }
  colgroup { display: none; }
  tbody { display: grid; grid-template-columns: 1fr 1fr; column-gap: 16px; }
  tr { display: grid; grid-template-columns: 96px minmax(0, 1fr); }
  tr:has(#mi-etccode) { grid-column: 1 / -1; }
  th, td { display: flex; align-items: center; }
  td > * { flex: 1; min-width: 0; }
}
</style>
