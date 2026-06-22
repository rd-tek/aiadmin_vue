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
                    <input
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
                </div>
              </td>
            </tr>
            <tr>
              <th>홀 소개</th>
              <td>
                <div class="text-area">
                  <textarea :value="item?.contents" placeholder="한글 100자 3줄까지 입력가능합니다."></textarea>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <div class="btn-wrap">
          <button type="button" class="btn-md-line" @click="modalClose">닫기</button>
          <button type="button" class="btn-md-fill btn-primary-purple" @click="modalSave">저장하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCourseApi } from "~/api/course";

const { _courseHoleEdit } = useCourseApi();

// 2026.06.16[cgnoh]: existingKey = API 응답에서 받아온 파일명 필드
const fileFields = [
  { key: 'holeImage',     label: '홀 이미지',      accept: 'image/*', existingKey: null },
  { key: 'courseMinimap', label: '코스 미니맵',     accept: 'image/*', existingKey: 'minimap_filename' },
  { key: 'greenMinimapL', label: '그린 미니맵(좌)', accept: 'image/*', existingKey: 'grnmap1_filename' },
  { key: 'greenMinimapR', label: '그린 미니맵(우)', accept: 'image/*', existingKey: 'grnmap2_filename' },
  { key: 'holeVideo',     label: '홀 동영상',       accept: 'video/*', existingKey: 'movie_filename' },
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

watch(() => props.isOpen, (val) => {
  if (val) {
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
    formData.append('contents', props.item.contents || '');

    if (fileStates.courseMinimap.file) formData.append('minimap', fileStates.courseMinimap.file);
    if (fileStates.greenMinimapL.file) formData.append('grnmap1', fileStates.greenMinimapL.file);
    if (fileStates.greenMinimapR.file) formData.append('grnmap2', fileStates.greenMinimapR.file);
    if (fileStates.holeVideo.file)     formData.append('movie',   fileStates.holeVideo.file);

    try {
        const res = await _courseHoleEdit(formData);
        if (res?.code === 200) {
            alert(res.message || '저장되었습니다.');
            
            modalClose();
        } else {
            alert(res?.message || '저장에 실패했습니다.');
        }
    } catch (err) {
        console.error(err);
        alert('저장 중 오류가 발생했습니다.');
    }
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/components/modal.scss";
</style>