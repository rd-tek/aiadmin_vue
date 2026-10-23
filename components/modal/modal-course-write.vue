<template>
  <div
    class="modal modal-course-write"
    :class="{ 'is-active': isOpen }"
    @click.self="modalClose"
  >
    <div class="modal-container">
      <div class="modal-header">
        <p class="title">코스 홀 정보</p>
        <button type="button" class="btn-close" @click="modalClose" aria-label="닫기">
          <img src="/images/icon/icon_close_grey.png" alt="" />
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
              <td>{{ item?.coursename || '-' }}</td>
            </tr>
            <tr>
              <th>서브 코스명</th>
              <td>{{ item?.subcoursename || '-' }}</td>
            </tr>
            <tr>
              <th>홀</th>
              <td>{{ item?.hole_no ? item.hole_no + 'H' : '-' }}</td>
            </tr>
            <tr v-for="file in fileFields" :key="file.key">
              <th>{{ file.label }}</th>
              <td>
                <div class="input-wrap">
                  <div class="input-text">
                    <input :aria-label="file.label + ' 파일 선택'"
                      type="file"
                      :ref="el => setFileRef(file.key, el)"
                      @change="onFileChange(file.key, $event)"
                      :accept="file.accept"
                    />
                    <button type="button" class="btn-file" @click="triggerFile(file.key)">파일선택</button>
                    <span class="name" v-if="fileStates[file.key].fileName">
                      {{ fileStates[file.key].fileName }}
                    </span>
                    <!-- 기존 등록된 파일명 표시 -->
                    <span class="name" v-else-if="item?.[file.existingKey]">
                      {{ item[file.existingKey] }}
                    </span>
                    <span class="name placeholder" v-else>파일을 선택하거나 여기에 드롭하세요.</span>
                  </div>
                  <!-- 2026-09-14: 홀 이미지 미리보기 (새로 선택한 파일 또는 기존 등록 이미지) — 스타일은 modal.scss .hole-img-preview -->
                  <div class="hole-img-preview" v-if="file.urlKey && (fileStates[file.key].previewUrl || item?.[file.urlKey])">
                    <img :src="fileStates[file.key].previewUrl || common.getImg((item[file.urlKey] || '') + '/' + (item[file.existingKey] || ''))" alt="hole preview" />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>홀 소개</th>
              <td>
                <div class="text-area">
                  <!-- 2026-10-23: :value(단방향)라 고친 내용이 저장되지 않던 문제 → 로컬 값으로 양방향 -->
                  <textarea aria-label="홀 소개" v-model="contents" placeholder="한글 100자 3줄까지 입력가능합니다."></textarea>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <div class="btn-wrap">
          <button type="button" class="btn-md-line" @click="modalClose">닫기</button>
          <button type="button" class="btn-md-fill btn-primary-purple" :disabled="saving" @click="modalSave">{{ saving ? '저장 중...' : '저장하기' }}</button>
        </div>
      </div>
    </div>
    <!-- 2026-10-23: 기본 alert → 앱 공통 팝업(완료를 닫으면 이 창도 닫힘) -->
    <toast-modal :isOpen="doneOpen" :toastMessage="doneMessage" @update:isOpen="onDoneClose" />
    <toast-warn-modal :isOpen="warnOpen" :toastWarnMessage="warnMessage" @update:isOpen="warnOpen = $event" />
  </div>
</template>

<script setup>
import { useCourseApi } from "~/api/course";
import { useCommon } from "@/utils/common";
import toastModal from "@/components/toast-ui/toast-modal.vue";
import toastWarnModal from "@/components/toast-ui/toast-warn-modal.vue";

const { _courseHoleEdit } = useCourseApi();
const common = useCommon();

// 2026.06.16[cgnoh]: existingKey = API 응답 파일명(*_name→매핑됨), urlKey = 이미지 URL(*_url) — 2026-09-14 이미지 미리보기 추가
const fileFields = [
  { key: 'courseMinimap', label: '코스 미니맵',     accept: 'image/*', existingKey: 'minimap_filename', urlKey: 'minimap_url' },
  { key: 'greenMinimapL', label: '그린 미니맵(좌)', accept: 'image/*', existingKey: 'grnmap1_filename', urlKey: 'grnmap1_url' },
  { key: 'greenMinimapR', label: '그린 미니맵(우)', accept: 'image/*', existingKey: 'grnmap2_filename', urlKey: 'grnmap2_url' },
  { key: 'holeVideo',     label: '홀 동영상',       accept: 'video/*', existingKey: 'movie_filename', urlKey: null },
];

const fileStates = reactive(
  Object.fromEntries(
    fileFields.map(({ key }) => [
      key,
      { fileName: '', previewUrl: '', file: null },
    ])
  )
);

// 모달 열릴 때 fileStates 초기화
const props = defineProps({
  isOpen: { type: Boolean, default: false },
  item: { type: Object }
});

const contents = ref('');
const saving = ref(false);
const doneOpen = ref(false);
const doneMessage = ref('');
const warnOpen = ref(false);
const warnMessage = ref('');
const showWarn = (m) => { warnMessage.value = m; warnOpen.value = true; };
const onDoneClose = (v) => { doneOpen.value = v; if (!v) modalClose(); };

watch(() => props.isOpen, (val) => {
  if (val) {
    contents.value = props.item?.contents || '';
    // 새 홀 열릴 때 파일 상태 초기화
    fileFields.forEach(({ key }) => {
      fileStates[key] = { fileName: '', previewUrl: '', file: null };
    });
  }
});

const fileRefs = {};
const setFileRef = (key, el) => {
  if (el) fileRefs[key] = el;
};

const triggerFile = (key) => {
  fileRefs[key]?.click();
};

const onFileChange = (key, event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  const state = fileStates[key];
  state.file = file;
  state.fileName = file.name;
  const reader = new FileReader();
  reader.onload = () => { state.previewUrl = reader.result; };
  reader.readAsDataURL(file);
};

const emit = defineEmits(['update:isOpen']);
const modalClose = () => {
  emit('update:isOpen', false);
  document.querySelector('body').classList.remove('is-hidden');
};

const modalSave = async () => {
    const formData = new FormData();

    formData.append('courseno', props.item.courseno);
    formData.append('coursubtype', props.item.coursubtype);
    formData.append('holeno', props.item.hole_no);
    formData.append('contents', contents.value || '');

    if (fileStates.courseMinimap.file) formData.append('minimap', fileStates.courseMinimap.file);
    if (fileStates.greenMinimapL.file) formData.append('grnmap1', fileStates.greenMinimapL.file);
    if (fileStates.greenMinimapR.file) formData.append('grnmap2', fileStates.greenMinimapR.file);
    if (fileStates.holeVideo.file)     formData.append('movie',   fileStates.holeVideo.file);

    if (saving.value) return;
    saving.value = true; // 동영상 업로드 중 두 번 눌러 중복 저장되던 것 방지
    try {
        const res = await _courseHoleEdit(formData);
        if (Number(res?.code) === 200) {
            if (props.item) props.item.contents = contents.value; // 다시 열었을 때 고친 소개가 보이게
            doneMessage.value = res.message || '저장되었습니다.';
            doneOpen.value = true;
        } else {
            showWarn(res?.message || '저장에 실패했습니다.');
        }
    } catch (err) {
        console.error(err);
        showWarn('저장 중 오류가 발생했습니다.');
    } finally {
        saving.value = false;
    }
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/components/modal.scss";
</style>