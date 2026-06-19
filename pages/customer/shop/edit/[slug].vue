<template>
    <div class="customer-member edit">
      <div class="table-wrap">
        <div class="table type02">
          <table>
            <colgroup>
                <col width="18%">
                <col width="*">
            </colgroup>
            <tbody>
                <tr>
                    <th>상태</th>
                    <td>
                      <div class="select-default">
                        <select v-model="form.type">
                            <option value="1">공지</option>
                            <option value="2">뉴스</option>
                        </select>
                      </div>
                    </td>
                </tr>
                <tr>
                    <th>제목</th>
                    <td>
                        <div class="input-text">
                            <input
                                type="text"
                                v-model="form.title"
                                placeholder="제목을 입력해주세요."
                                >
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>게시</th>
                    <td>
                        <div class="checkbox">
                            <div class="checkbox-list">
                                <div class="check-box">
                                    <input
                                        type="checkbox"
                                        id="chk_0"
                                        :checked="form.status === '1'"
                                        @change="form.status = $event.target.checked ? '1' : '0'"
                                    >
                                    <label for="chk_0">
                                        <span class="check-box-item">
                                            <i class="item-line" />
                                        </span>
                                        <span class="check-box-txt">게시</span>
                                    </label>
                                </div>
                            </div>
                            <div class="checkbox-list">
                                <div class="check-box">
                                    <input
                                        type="checkbox"
                                        id="chk_1"
                                        :checked="form.topflag === '1'"
                                        @change="form.topflag = $event.target.checked ? '1' : '0'"
                                    >
                                    <label for="chk_1">
                                        <span class="check-box-item">
                                            <i class="item-line" />
                                        </span>
                                        <span class="check-box-txt">상단에 표시</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td>
                        <div class="textarea">
                            <textarea
                                v-model="form.contents"
                                placeholder="내용을 입력해주세요."
                            ></textarea>
                        </div>
                        <div class="input-wrap">
                            <div class="input-text">
                                <input
                                    type="file"
                                    ref="fileInput"
                                    @change="onFileChange"
                                    placeholder="파일을 선택하거나 여기에 드롭하세요."  
                                />
                                <button type="button" class="btn-file" @click="triggerFile">파일선택</button>
                                <span class="name" v-if="fileName">{{ fileName }}</span>
                                <span class="name placeholder" v-else>파일을 선택하거나 여기에 드롭하세요.</span>
                            </div>
                        </div>
                        <div class="desc">
                            <div class="desc-list">* 파일 총 용량은 최대 26MB까지(파일당 최대 4MB 등록 가능)</div>
                            <div class="desc-list">* JPG, JPEG, PNG, ZIP 유형만 가능</div>
                        </div>
                    </td>
                </tr>
            </tbody>
          </table>
            <div class="btn-wrap">
                <button
                    type="button"
                    class="btn-md-line"
                    @click="handleList"
                >
                    목록보기
                </button>
                <button
                    type="button"
                    class="btn-primary-purple btn-md-fill"
                    @click="handleSave"
                >
                    저장
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
import { useRoute, useRouter } from "vue-router";
import { useCustomerApi } from "~/api/support";
import toastModal from '@/components/toast-ui/toast-modal.vue';
import toastWarnModal from '@/components/toast-ui/toast-warn-modal.vue';
import toastErrorModal from '@/components/toast-ui/toast-error-modal.vue';

// 2026.06.08[cgnoh]: 라우터 관련
const route = useRoute();
const router = useRouter();

// 2026.06.08[cgnoh]: API 관련
const customerApi = useCustomerApi();

// 2026.06.08[cgnoh]: 공지사항/뉴스 상세 조회 관련 상태
const noticeno = computed(() => route.params.noticeno || route.params.slug);

// 2026.06.08[cgnoh]: 파일 관련 상태
const fileInput = ref(null);
const file = ref(null);
const fileName = ref("");

// 2026.06.08[cgnoh]: 글 수정 관련 상태
const form = reactive({
  type: "1",
  title: "",
  contents: "",
  status: "1",
  topflag: "0",
});

// 2026.06.08[cgnoh]: 공지사항/뉴스 상세 조회
const getNoticeDetail = async () => {
  try {
    const res = await customerApi._ownerNoticeview(noticeno.value);

    const notice = res.noticeview || {};

    form.type = notice.type || "1";
    form.title = notice.title || "";
    form.contents = notice.contents || "";
    form.status = notice.status || "1";
    form.topflag = notice.topflag || "0";

    if (notice.filename) {
      fileName.value = notice.filename;
    }
  } catch (err) {
    console.error(err);
  }
};

// 2026.06.08[cgnoh]: 글 수정 처리
const triggerFile = () => {
  fileInput.value?.click();
};

// 2026.06.08[cgnoh]: 파일 선택 처리
const onFileChange = (e) => {
  const selected = e.target.files?.[0];

  if (!selected) return;

  file.value = selected;
  fileName.value = selected.name;
};

// 2026.06.15[cgnoh]: 토스트 메시지 관련
const toastMessage = ref();
const toastWarnMessage = ref();
const toastErrorMessage = ref();

// 2026.06.15[cgnoh]: 모달 관련
const modals = reactive({});

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

// 2026.06.08[cgnoh]: 글 저장 처리
const handleSave = async () => {
  try {
    if (!form.title.trim()) {
      openWarnToast("제목을 입력해주세요.");
      return;
    }

    if (form.title.length > 30) {
      openWarnToast("제목은 30자 이하만 입력 가능합니다.");
      return;
    }

    const formData = new FormData();

    formData.append("type", form.type);
    formData.append("title", form.title);
    formData.append("contents", form.contents);
    formData.append("status", form.status);
    formData.append("topflag", form.topflag);

    if (file.value) {
    formData.append("file", file.value);
    }

    const res = await customerApi._ownerNoticeModify(
    noticeno.value,
    formData
    );

    openSaveToast("수정되었습니다.");
    router.push(`/customer/shop/${noticeno.value}`);
  } catch (err) {
    openErrorToast(res.message || "수정에 실패했습니다.");
  }
};

// 2026.06.08[cgnoh]: 목록 페이지로 이동
const handleList = () => {
  router.push("/customer/shop");
};

onMounted(() => {
  getNoticeDetail();
});

definePageMeta({
  layout: "default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/customer.scss';
</style>