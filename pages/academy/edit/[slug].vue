<template>
  <div class="membership academy-write">
    <div class="membership-wrap">
      <div class="content">
        <div class="content-head">아카데미 수정하기</div>
        <div class="content-tab">
          <div
            class="content-tab-list left"
            :class="{ 'is-ing': curriculum, 'is-complete': !curriculum }"
            @click="leftClick"
          >
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M11.6668 18.184L7.82496 14.3421L6.17529 15.9918L11.6668 21.4833L22.9916 10.1585L21.342 8.50879L11.6668 18.184Z" fill="white"/>
              </svg>
            </div>
            <div class="text">1. 클래스 등록 및 관리</div>
          </div>
          <div
            class="content-tab-list right"
            :class="{
              'is-ing': !curriculum && !isComplete,
              'is-complete': !curriculum && isComplete,
            }"
            @click="rightClick"
          >
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M11.6668 18.184L7.82496 14.3421L6.17529 15.9918L11.6668 21.4833L22.9916 10.1585L21.342 8.50879L11.6668 18.184Z" fill="white"/>
              </svg>
            </div>
            <div class="text">2. 커리큘럼 등록</div>
          </div>
        </div>
        <div class="membership-info">
          <form class="form">
            <div class="form-section" v-if="!curriculum">
              <div class="sub">커리큘럼 등록</div>
              <div class="cont">
                <div class="cont-list">
                  <label>아카데미 대표 이미지</label>
                  <div class="cont-list-box">
                    <div
                      class="img-area"
                      :class="{ 'no-data': images.academy === null }"
                      :style="images.academy ? { backgroundImage: `url('${images.academy}')` } : {}"
                    />
                    <div class="btn-wrap">
                      <div class="btn-group">
                        <button type="button" class="btn-sm-line">등록</button>
                        <input
                          type="file"
                          @change="onFileChange($event, 'academy')"
                          accept="image/*"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cont-list">
                  <label>제목<span class="required"></span></label>
                  <div class="cont-list-box">
                    <input
                      type="text"
                      v-model="form.academy.title"
                      placeholder="제목"
                    />
                  </div>
                </div>
                <div class="cont-list col-2">
                  <label>대상(난이도)<span class="required"></span></label>
                  <div class="cont-list-box">
                    <div class="select-default">
                      <select v-model="form.academy.target_audience">
                        <option>대상을 선택하세요</option>
                        <option
                          v-for="(item, index) in targetOptions"
                          :key="index"
                          :value="item"
                        >
                          {{ item }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="cont-list">
                  <label>태그<span class="required"></span></label>
                  <div class="cont-list-box">
                    <input
                      type="text"
                      v-model="academyTagInput"
                      placeholder="#태그 입력(#으로 구분, 최대 5개)"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="form-section" v-else>
              <div class="sub">클래스 등록 및 관리</div>
              <div class="cont">
                <div class="cont-left">
                  <div class="btn-wrap">
                    <button
                      type="button"
                      class="btn-sm-line"
                      @click="addCategory"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
                         <mask id="mask0_104_4948" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="20"><rect width="16" height="20" fill="#D9D9D9" /></mask>
                         <g mask="url(#mask0_104_4948)"><path d="M7.32964 10.6708H3.52832V9.32915H7.32964V5.52783H8.67128V9.32915H12.4726V10.6708H8.67128V14.4721H7.32964V10.6708Z" fill="#FF7519" /></g>
                      </svg>
                      <div class="text">카테고리 추가</div>
                    </button>
                    <button
                      type="button"
                      class="btn-sm-line"
                      @click="removeCategory"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
                         <mask id="mask0_104_1523" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="20"><rect width="16" height="20" fill="#D9D9D9" /></mask>
                         <g mask="url(#mask0_104_1523)"><path d="M4.42188 10.6707V9.3291H11.5773V10.6707H4.42188Z" fill="#FF7519" /></g>
                      </svg>
                      <span class="text">삭제</span>
                    </button>
                  </div>
                  <div class="category">
                    <div class="category-wrap">
                      <div
                        class="category-title"
                        :class="{ 'is-active': currentSelection.type === SELECTION_TYPE.TOTAL }"
                        @click="handleTotalClass"
                      >
                        <span class="text">전체 클래스</span>
                        <span class="num">({{ form.classes?.length }})</span>
                      </div>
                      <div class="category-cont">
                        <draggable
                          v-model="form.classes"
                          item-key="temp_id"
                          ghost-class="drag-ghost"
                          chosen-class="drag-chosen"
                          drag-class="drag-moving"
                          :animation="200"
                          group="categoryClass"
                          handle=".step-list-item"
                        >
                          <template #item="{ element: cls }">
                            <div class="step-list">
                              <div
                                class="step-list-item"
                                :key="cls.temp_id"
                                ref="stepListItemRef"
                                :class="{
                                  'is-active': currentSelection.type === SELECTION_TYPE.CLASS && currentSelection.classId === cls.temp_id,
                                  'is-on': !openList[cls.temp_id] && cls.steps.length > 0,
                                }"
                                @click="handleClassList(cls)"
                              >
                                <i class="icon">
                                  <img src="/public/images/icon/icon_document.png" alt="icon_document" />
                                </i>

                                <span class="text">{{ cls.title }}</span>

                                <button
                                  type="button"
                                  class="btn-arrow"
                                  :class="{ 'is-active': !openList[cls.temp_id] }"
                                  @click.stop="handleAccordion(cls)"
                                  v-if="cls.steps.length > 0"
                                >
                                  <img src="/public/images/icon/icon_chevron_down.png" alt="icon_chevron_down" />
                                </button>
                              </div>

                              <transition
                                @before-enter="beforeEnter"
                                @enter="enter"
                                @before-leave="beforeLeave"
                                @leave="leave"
                              >
                                <draggable
                                  v-model="cls.steps"
                                  item-key="temp_id"
                                  ghost-class="drag-ghost"
                                  :animation="200"
                                  group="categoryStep"
                                  handle=".depth-list-item"
                                  v-if="!openList[cls.temp_id]"
                                >
                                  <template #item="{ element: step }">
                                    <div
                                      class="depth-list-item"
                                      :key="step.temp_id"
                                      ref="depthListItemRef"
                                      :class="{
                                        'is-active': currentSelection.type === SELECTION_TYPE.STEP && currentSelection.stepId === step.temp_id
                                      }"
                                      @click.stop="handleDepthList(cls, step)"
                                    >
                                      <i class="icon">
                                        <img src="/public/images/icon/icon_document.png" alt="icon_document" />
                                      </i>
                                      <span class="text">{{ step.title }}</span>
                                    </div>
                                  </template>
                                </draggable>
                              </transition>
                            </div>
                          </template>
                        </draggable>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cont-right">
                  <div class="cont-list">
                    <label>클래스/스탭 제목<span class="required"></span></label>
                    <div class="cont-list-box">
                      <input
                        type="text"
                        @input="handleClassStep"
                        v-model="classStepTitle"
                        placeholder="내용을 입력하세요."
                        :disabled="currentSelection.type === SELECTION_TYPE.NONE || currentSelection.type === SELECTION_TYPE.TOTAL"
                      />
                    </div>
                  </div>
                  <div class="cont-list">
                    <label>공개설정<span class="required"></span></label>
                    <div class="cont-list-box">
                      <div class="radio-box">
                        <input
                          type="radio"
                          id="0"
                          v-model="form.academy.status"
                          value="1"
                        />
                        <label for="0">
                          <span class="check-box-item"><span class="item-blur" /></span>
                          <span class="check-box-txt">공개</span>
                        </label>
                      </div>
                      <div class="radio-box">
                        <input
                          type="radio"
                          id="1"
                          v-model="form.academy.status"
                          value="0"
                        />
                        <label for="1">
                          <span class="check-box-item"><span class="item-blur" /></span>
                          <span class="check-box-txt">비공개</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="cont-list">
                    <label>추천정보<span class="required"></span></label>
                    <div class="cont-list-box">
                      <button
                        type="button"
                        class="btn-default btn-md-fill"
                        @click="modalOpen('modalRecommendInfo')"
                      >
                        등록하기
                      </button>
                    </div>
                  </div>
                  <div class="cont-list align-start">
                    <label>학습목표<span class="required"></span></label>
                    <div class="cont-list-flex">
                      <div class="cont-list-box">
                        <client-only>
                          <editor-client v-model="form.academy.intro" />
                        </client-only>
                      </div>
                    </div>
                  </div>
                  <div class="cont-list align-start" v-if="currentMissions && currentMissions.length > 0">
                    <label>미션<span class="required"></span></label>
                    <div class="cont-list-flex">
                      <div class="cont-list-box col-2 align-center">
                        <div class="col-wrap">
                          <div class="select-default">
                            <select v-model="currentMissions[0].mission">
                              <option v-for="(item, index) in missionList" :key="index" :value="item">{{ item }}</option>
                            </select>
                          </div>
                          <div class="select-default" v-if="currentMissions[0].mission === '구질'">
                            <select v-model="currentMissions[0].value">
                              <option v-for="shape in shotShapeOptions" :key="shape" :value="shape">{{ shape }}</option>
                            </select>
                          </div>
                          <div class="input-text" v-else-if="isSingleMission(currentMissions[0].mission)">
                            <input type="text" placeholder="내용을 입력하세요" v-model="currentMissions[0].value" />
                          </div>
                          <div class="input-wrap" v-else>
                            <div class="input-text">
                              <input type="text" placeholder="내용을 입력하세요" v-model="currentMissions[0].start" />
                            </div>
                            <span>~</span>
                            <div class="input-text">
                              <input type="text" placeholder="내용을 입력하세요" v-model="currentMissions[0].end" />
                            </div>
                          </div>
                        </div>
                        <button type="button" class="btn-del" @click="handleDelFirstMission">
                          <img src="/public/images/icon/icon_delete.png" alt="icon_delete" />
                        </button>
                      </div>

                      <div
                        class="cont-list-box col-2 align-center"
                        v-for="(mission, index) in currentMissions.slice(1)"
                        :key="index + 1"
                      >
                        <div class="col-wrap">
                          <div class="select-default">
                            <select v-model="mission.mission">
                              <option v-for="(item, idx) in missionList" :key="idx" :value="item">{{ item }}</option>
                            </select>
                          </div>
                          <div class="select-default" v-if="mission.mission === '구질'">
                            <select v-model="mission.value">
                              <option v-for="shape in shotShapeOptions" :key="shape" :value="shape">{{ shape }}</option>
                            </select>
                          </div>
                          <div class="input-text" v-else-if="isSingleMission(mission.mission)">
                            <input type="text" placeholder="내용을 입력하세요" v-model="mission.value" />
                          </div>
                          <div class="input-wrap" v-else>
                            <div class="input-text">
                              <input type="text" placeholder="내용을 입력하세요" v-model="mission.start" />
                            </div>
                            <span>~</span>
                            <div class="input-text">
                              <input type="text" placeholder="내용을 입력하세요" v-model="mission.end" />
                            </div>
                          </div>
                        </div>
                        <button type="button" class="btn-del" @click="handleDelMission(index + 1)">
                          <img src="/public/images/icon/icon_delete.png" alt="icon_delete" />
                        </button>
                      </div>

                      <div class="cont-list-box col-2">
                        <button type="button" class="cont-list-btn" @click="handleAddMission">
                          <img src="/public/images/icon/icon_add_circle.png" alt="icon_add_circle" />
                          <span class="text">추가하기</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="btn-wrap">
              <button type="button" class="btn-primary btn-lg-line" @click="handleCancel">취소</button>
              <button type="button" class="btn-primary btn-lg-line" @click="handleSave">임시저장</button>
              <button type="button" class="btn-primary-teal btn-lg-fill" @click="handleSubmit">확인</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <modal-recommend-info
    :isOpen="modals.modalRecommendInfo"
    @update:isOpen="modals.modalRecommendInfo = $event"
    v-model:form="form.recommend"
  />

  <modal-category-confirm
    :isOpen="modals.modalCategoryConfirm"
    @update:isOpen="modals.modalCategoryConfirm = $event"
    @confirm="handleConfirmDelete"
  />

  <toast-modal
    :isOpen="modals.toastModal"
    :toastMessage="toastMessage"
    @update:isOpen="modals.toastModal = $event"
  />

  <toast-warn-modal 
    :isOpen="modals.toastWarnModal"
    :toastWarnMessage="toastWarnMessage"
    @update:isOpen="modals.toastWarnModal = $event"
  />

  <toast-error-modal 
    :isOpen="modals.toastErrorModal"
    :toastErrorMessage="toastErrorMessage"
    @update:isOpen="modals.toastErrorModal = $event"
  />

</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useAcademyApi } from "~/api/academy";
import { useCommon } from "@/utils/common";
import { useHead } from '#app'
import editorClient from "@/components/toast-ui/editor.client.vue";
import draggable from "vuedraggable";
import { onClickOutside } from "@vueuse/core";
import toastModal from '@/components/toast-ui/toast-modal.vue';
import toastErrorModal from '@/components/toast-ui/toast-error-modal.vue';
import toastWarnModal from '@/components/toast-ui/toast-warn-modal.vue';

const common = useCommon();
const route = useRoute();
const router = useRouter();
const academyApi = useAcademyApi();
const academy_pk = Number(route.params.slug) || null;

// ============================================
// 1. 상태 통합 및 상수 정의
// ============================================

const SELECTION_TYPE = {
  NONE: 'NONE',
  TOTAL: 'TOTAL', // 전체 클래스
  CLASS: 'CLASS', // 특정 클래스
  STEP: 'STEP'    // 특정 스텝
};

// 통합된 현재 선택 상태
const currentSelection = ref({
  type: SELECTION_TYPE.NONE,
  classId: null, // 클래스 temp_id
  stepId: null,  // 스텝 temp_id
  data: null     // 선택된 객체
});

// 우측 폼 입력 바인딩용
const classStepTitle = ref("");

// 카운트 관리 (수정 페이지는 서버 데이터 기준으로 초기화 필요)
const count = ref(0); 
const depthCount = ref(0); 

// 아코디언 상태 관리
const openList = ref({});

// ============================================
// 2. 기본 데이터 및 폼
// ============================================
const curriculum = ref(true); 
const isComplete = ref(false);

const form = ref({
  academy: {
    academy_pk: null,
    expert_fk: null,
    title: "",
    intro: "",
    thumbnail: "",
    target_audience: "",
    tag_csv: "",
    status: 1,
  },
  classes: [], // 서버에서 로드
  recommend: {},
});

// ============================================
// 3. 선택 핸들러 (통합 로직)
// ============================================

// 1) 전체 클래스 클릭
const handleTotalClass = () => {
  currentSelection.value = {
    type: SELECTION_TYPE.TOTAL,
    classId: null,
    stepId: null,
    data: null
  };
  classStepTitle.value = "";
};

// 2) 개별 클래스 클릭
const handleClassList = (cls) => {
  currentSelection.value = {
    type: SELECTION_TYPE.CLASS,
    classId: cls.temp_id,
    stepId: null,
    data: cls
  };
  classStepTitle.value = cls.title;
};

// 3) 개별 스텝 클릭
const handleDepthList = (parentCls, step) => {
  currentSelection.value = {
    type: SELECTION_TYPE.STEP,
    classId: parentCls.temp_id,
    stepId: step.temp_id,
    data: step
  };
  classStepTitle.value = step.title;
};

// 4) 우측 폼에서 제목 입력 시 동기화
const handleClassStep = () => {
  if (!currentSelection.value.data) return;
  currentSelection.value.data.title = classStepTitle.value;
};

// 아코디언 토글
const handleAccordion = (cls) => {
  openList.value[cls.temp_id] = !openList.value[cls.temp_id];
};

// ============================================
// 4. 추가 / 삭제 로직 (수정된 로직 적용)
// ============================================

const createEmptyMission = () => ({
  mission: "비거리",
  value: "",
  start: "",
  end: "",
});

// 카테고리 추가
const addCategory = () => {
  const { type, classId } = currentSelection.value;

  // A. 클래스 추가
  if (type === SELECTION_TYPE.TOTAL || type === SELECTION_TYPE.NONE) {
    count.value++;
    form.value.classes.push({
      temp_id: count.value,
      class_pk: null,
      seq: form.value.classes.length + 1,
      title: `새로운 클래스 ${count.value}`,
      content: "",
      thumbnail: "",
      preview_yn: 0,
      status: 1,
      steps: [],
    });
    openList.value[count.value] = false; 
  }
  // B. 스텝 추가
  else if (type === SELECTION_TYPE.CLASS || type === SELECTION_TYPE.STEP) {
    const parentClass = form.value.classes.find(c => c.temp_id === classId);
    if (!parentClass) return;

    depthCount.value++;
    parentClass.steps.push({
      temp_id: depthCount.value,
      step_pk: null,
      seq: parentClass.steps.length + 1,
      title: `새로운 스탭 ${depthCount.value}`,
      content: "",
      video_url: "",
      preview_yn: 0,
      status: 1,
      missions: [createEmptyMission()],
    });
    openList.value[parentClass.temp_id] = false; 
  }
};

// 삭제 버튼 클릭
const removeCategory = () => {
  const { type, classId, stepId } = currentSelection.value;

  if (type === SELECTION_TYPE.NONE || type === SELECTION_TYPE.TOTAL) {
    handleWarnToast("삭제할 클래스나 스탭을 선택해주세요.");
    return;
  }
  
  // 🔥 스텝(Step)인 경우 -> 모달 없이 '즉시 삭제'
  if (type === SELECTION_TYPE.STEP) {
    const parentClass = form.value.classes.find(c => c.temp_id === classId);
    if (parentClass) {
      const sIdx = parentClass.steps.findIndex(s => s.temp_id === stepId);
      if (sIdx !== -1) {
        parentClass.steps.splice(sIdx, 1);
        handleToast("해당 스텝이 삭제되었습니다.");
        handleClassList(parentClass); // 삭제 후 상위 클래스 선택
      }
    }
    return; 
  }

  // 클래스(Class)인 경우 -> 확인 모달 오픈
  if (type === SELECTION_TYPE.CLASS) {
    modals.modalCategoryConfirm = true;
  }
};

// 삭제 확인 (모달 콜백 - 클래스 삭제만 담당)
const handleConfirmDelete = (confirmed) => {
  if (!confirmed) {
    modals.modalCategoryConfirm = false;
    return;
  }

  const { type, classId } = currentSelection.value;

  if (type === SELECTION_TYPE.CLASS) {
    const idx = form.value.classes.findIndex(c => c.temp_id === classId);
    if (idx !== -1) {
      form.value.classes.splice(idx, 1);
      handleToast("해당 클래스가 삭제되었습니다.");
      handleTotalClass(); 
    }
  }

  modals.modalCategoryConfirm = false;
};

// ============================================
// 5. 서버 데이터 로드 및 초기화
// ============================================

const _academyView = async () => {
  try {
    const res = await academyApi._academyview(academy_pk);

    form.value.academy = res.academy;
    form.value.classes = res.classes;
    form.value.recommend = res.recommend;

    images.value.academy = common.getImg(res.academy.thumbnail) || null;
    images.value.coach = res.academy.coach_thumbnail || null;

    // 🔥 [수정 페이지 핵심] 불러온 데이터의 ID와 충돌하지 않도록 count 초기화
    if (form.value.classes && form.value.classes.length > 0) {
      // 1. 클래스 ID 최대값 찾기
      const maxClassId = Math.max(0, ...form.value.classes.map(c => c.temp_id || 0));
      count.value = maxClassId + 1;

      // 2. 스텝 ID 최대값 찾기
      let maxStepId = 1000; // 기본값
      form.value.classes.forEach(c => {
        if (c.steps && c.steps.length > 0) {
          const localMax = Math.max(...c.steps.map(s => s.temp_id || 0));
          if (localMax > maxStepId) maxStepId = localMax;
        }
        // 아코디언 초기화
        openList.value[c.temp_id] = false;
      });
      depthCount.value = maxStepId + 1;
    }

  } catch (err) {
    handleErrorToast(err.message);
  }
};

onMounted(async () => {
  await _academyView();
});

// ============================================
// 6. 기타 유틸리티
// ============================================

// 탭 전환
const leftClick = () => { curriculum.value = true; };
const rightClick = () => { curriculum.value = false; };

// 모달 및 토스트
const modals = reactive({
  modalRecommendInfo: false,
  modalCategoryConfirm: false,
  toastModal: false,
  toastErrorModal: false,
  toastWarnModal: false
});

const modalOpen = (modalName) => {
  modals[modalName] = !modals[modalName];
  document.querySelector("body").classList.add("is-hidden");
};

const toastMessage = ref("");
const handleToast = (msg) => {
  document.querySelector('body').classList.add('is-hidden');
  toastMessage.value = msg;
  modals.toastModal = true;
};

const toastErrorMessage = ref("");
const handleErrorToast = (msg) => {
  document.querySelector('body').classList.add('is-hidden');
  toastErrorMessage.value = msg;
  modals.toastErrorModal = true;
};

const toastWarnMessage = ref("");
const handleWarnToast = (msg) => {
  document.querySelector('body').classList.add('is-hidden');
  toastWarnMessage.value = msg;
  modals.toastWarnModal = true;
};

// 파일 관리
const images = ref({ academy: null, coach: null });
const onFileChange = (event, key) => {
  const file = event.target.files[0];
  if (!file || !file.type.startsWith("image/")) return;

  const reader = new FileReader();
  reader.onload = () => { images.value[key] = reader.result; };
  reader.readAsDataURL(file);

  if (key === "academy") form.value.academy.thumbnail = file;
};

// 미션 관리
const missionList = ref(["비거리", "볼속도", "볼방향", "이격거리", "탈출각", "사이드스핀", "구질", "남은 거리", "도착 지형"]);
const shotShapeOptions = ["풀 훅", "풀 스트레이트", "풀 슬라이스", "훅", "스트레이트", "슬라이스", "푸시 훅", "푸시 스트레이트", "푸시 슬라이스"];
const isSingleMission = (type) => ["남은 거리", "도착 지형"].includes(type);

const currentStep = computed(() => {
  if (currentSelection.value.type !== SELECTION_TYPE.STEP) return null;
  return currentSelection.value.data;
});

const currentMissions = computed({
  get() {
    const step = currentStep.value;
    if (!step) return [];
    if (!Array.isArray(step.missions) || step.missions.length === 0) {
      step.missions = [createEmptyMission()];
    }
    return step.missions;
  },
  set(val) {
    if (currentStep.value) currentStep.value.missions = val;
  }
});

const handleAddMission = () => {
  if (!currentStep.value) {
    handleWarnToast("먼저 미션을 등록할 스탭을 선택해주세요.");
    return;
  }
  currentStep.value.missions.push(createEmptyMission());
};

const handleDelFirstMission = () => {
  if (!currentStep.value) return;
  if (currentStep.value.missions.length <= 1) {
    Object.assign(currentStep.value.missions[0], createEmptyMission());
  } else {
    currentStep.value.missions.splice(0, 1);
  }
};

const handleDelMission = (idx) => {
  if (!currentStep.value) return;
  currentStep.value.missions.splice(idx, 1);
};

// 태그 관리
const academyTagInput = ref("");
watch(() => form.value.academy.tag_csv, (val) => {
  if (!val) {
    academyTagInput.value = "";
    return;
  }
  const tags = val.split(",").map(t => t.trim()).filter(Boolean).map(t => t.startsWith("#") ? t : `#${t}`);
  academyTagInput.value = tags.join(" ");
}, { immediate: true });

watch(academyTagInput, (val) => {
  if (!val) {
    form.value.academy.tag_csv = "";
    return;
  }
  const tags = val.split("#").map(t => t.trim()).filter(Boolean).map(t => t.replace(/\s+/g, " "));
  form.value.academy.tag_csv = tags.join(",");
});

// 저장 로직
const handleCancel = () => { router.push('/academy'); };
const handleSave = () => { handleToast('저장되었습니다.'); };
const handleSubmit = async () => {
  const payload = {
    academy_pk,
    academy: form.value.academy,
    classes: form.value.classes,
    recommend: form.value.recommend,
  };
  try {
    const { message } = await academyApi._academywrite(payload);
    handleToast(message);
  } catch (err) {
    handleErrorToast(err.message);
  }
};

// 드래그 애니메이션
const beforeEnter = (el) => { el.style.height = "0"; el.style.transition = "height 0.4s ease"; };
const enter = (el) => { el.style.height = el.scrollHeight + "px"; el.addEventListener("transitionend", () => { el.style.height = "auto"; }, { once: true }); };
const beforeLeave = (el) => { el.style.height = el.scrollHeight + "px"; el.style.transition = "height 0.4s ease"; };
const leave = (el) => { el.style.height = "0"; };

const targetOptions = ["초급 골퍼", "중급 골퍼", "상급 골퍼"];

definePageMeta({ layout: "detail-sub-page" });
useHead({
  htmlAttrs: { lang: 'ko' },
  title: '아카데미 수정하기',
  meta: [{ name: 'description', content: '아카데미 수정하기 페이지 입니다.' }]
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/pages/academy-detail.scss";
</style>