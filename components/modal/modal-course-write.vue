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
              <td><b>{{ item?.coursename || '-' }}</b></td>
            </tr>
            <tr>
              <th>서브 코스명</th>
              <td>{{ item?.subcourse.subcoursename || '' }}</td>
            </tr>
            <tr>
              <th>홀</th>
              <td>2H</td>
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
// 파일 필드 정의
const fileFields = [
  { key: 'holeImage',      label: '홀 이미지',      accept: 'image/*' },
  { key: 'courseMinimap',  label: '코스 미니맵',     accept: 'image/*' },
  { key: 'greenMinimapL',  label: '그린 미니맵(좌)', accept: 'image/*' },
  { key: 'greenMinimapR',  label: '그린 미니맵(우)', accept: 'image/*' },
  { key: 'holeVideo',      label: '홀 동영상',       accept: 'video/*' },
];

// 각 파일 필드의 상태를 key로 관리
const fileStates = reactive(
  Object.fromEntries(
    fileFields.map(({ key }) => [
      key,
      { fileName: '', previewUrl: '', file: null },
    ])
  )
);

// 각 input 엘리먼트를 key로 관리
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
  reader.onload = () => {
    state.previewUrl = reader.result;
  };
  reader.readAsDataURL(file);
};

// 저장 시 fileStates에서 각 파일 접근 가능
// ex) fileStates.holeImage.file

const props = defineProps({
    isOpen: { type: Boolean, default: false },
    item: {
        type: Object
    }
});
const emit = defineEmits(['update:isOpen']);
const modalClose = () => {
  emit('update:isOpen', false);
  document.querySelector('body').classList.remove('is-hidden');
};

const modalSave = () => {

};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/components/modal.scss";
</style>