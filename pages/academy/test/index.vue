<template>
  <div class="membership academy-write">
    <div class="membership-wrap">
      <div class="content">
        <div class="content-head">아카데미 등록하기</div>
        <div class="content-tab">
          <div
            class="content-tab-list left"
            :class="{ 'is-ing': curriculum, 'is-complete': !curriculum }"
            @click="leftClick"
          >
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M11.6668 18.184L7.82496 14.3421L6.17529 15.9918L11.6668 21.4833L22.9916 10.1585L21.342 8.50879L11.6668 18.184Z"
                  fill="white"
                />
              </svg>
            </div>
            <div class="text">1. 커리큘럼 등록</div>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M11.6668 18.184L7.82496 14.3421L6.17529 15.9918L11.6668 21.4833L22.9916 10.1585L21.342 8.50879L11.6668 18.184Z"
                  fill="white"
                />
              </svg>
            </div>
            <div class="text">2. 클래스 등록 및 관리</div>
          </div>
        </div>
        <div class="membership-info">
          <form class="form">

            <!-- 커리큘럼 등록 -->
            <div class="form-section" v-if="!curriculum">
              <div class="sub">커리큘럼 등록</div>
              <div class="cont">
                <div class="cont-list">
                  <label>아카데미 대표 이미지</label>
                  <div class="cont-list-box">
                    <div
                      class="img-area"
                      :class="{ 'no-data': images.academy === null }"
                      :style="
                        images.academy
                          ? { backgroundImage: `url('${images.academy}')` }
                          : {}
                      "
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
                      <button
                        type="button"
                        class="btn-sm-line"
                        @click="removeFile('academy')"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
                <div class="cont-list">
                  <label>제목<span class="required"></span></label>
                  <div class="cont-list-box">
                    <input type="text" placeholder="제목" />
                  </div>
                </div>
                <div class="cont-list col-2">
                  <label>대상(난이도)<span class="required"></span></label>
                  <div class="cont-list-box">
                    <div class="select-default">
                      <select>
                        <option>대상을 선택하세요</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="cont-list">
                  <label>태그<span class="required"></span></label>
                  <div class="cont-list-box">
                    <input
                      type="text"
                      placeholder="#태그 입력(#으로 구분, 최대 5개)"
                    />
                  </div>
                </div>
                <div class="cont-list">
                  <label>아카데미 소개글<span class="required"></span></label>
                  <div class="cont-list-box">
                    <textarea placeholder="내용을 입력하세요."></textarea>
                  </div>
                </div>
                <div class="cont-list">
                  <label>코치 소개글<span class="required"></span></label>
                  <div class="cont-list-box">
                    <textarea placeholder="내용을 입력하세요."></textarea>
                  </div>
                </div>
                <div class="cont-list">
                  <label>코치 프로필 이미지</label>
                  <div class="cont-list-box">
                    <div
                      class="img-area"
                      :class="{ 'no-data': images.coach === null }"
                      :style="
                        images.coach
                          ? { backgroundImage: `url('${images.coach}')` }
                          : {}
                      "
                    />
                    <div class="btn-wrap">
                      <div class="btn-group">
                        <button type="button" class="btn-sm-line">등록</button>
                        <input
                          type="file"
                          @change="onFileChange($event, 'coach')"
                          accept="image/*"
                        />
                      </div>
                      <button
                        type="button"
                        class="btn-sm-line"
                        @click="removeFile('coach')"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 클래스 등록 및 관리 -->
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
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="20"
                          viewBox="0 0 16 20"
                          fill="none"
                      >
                          <mask
                          id="mask0_104_4948"
                          style="mask-type: alpha"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="16"
                          height="20"
                          >
                          <rect width="16" height="20" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_104_4948)">
                          <path
                              d="M7.32964 10.6708H3.52832V9.32915H7.32964V5.52783H8.67128V9.32915H12.4726V10.6708H8.67128V14.4721H7.32964V10.6708Z"
                              fill="#FF7519"
                          />
                          </g>
                      </svg>
                      <div class="text">카테고리 추가</div>
                    </button>
                    <button
                      type="button"
                      class="btn-sm-line"
                      @click="removeCategory"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="20"
                        viewBox="0 0 16 20"
                        fill="none"
                      >
                        <mask
                          id="mask0_104_1523"
                          style="mask-type: alpha"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="16"
                          height="20"
                        >
                          <rect width="16" height="20" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_104_1523)">
                          <path
                            d="M4.42188 10.6707V9.3291H11.5773V10.6707H4.42188Z"
                            fill="#FF7519"
                          />
                        </g>
                      </svg>
                      <span class="text">삭제</span>
                    </button>
                  </div>
                  <div class="category">
                    <div class="category-wrap">
                      <div class="category-title" :class="{ 'is-active': setTotalClass }" @click="handleTotalClass">
                        <span class="text">전체 클래스</span>
                        <span class="num">(11)</span>
                      </div>
                      <div class="category-cont">
                        <div class="step-list" v-for="(item, i) in categoryList" :key="i">
                          <div
                            class="step-list-item"
                            ref="stepListItemRef"
                            :class="{ 'is-active': setClassList === i || isEdit === item.id, 'is-on': !openList[item.id] || item.children.length > 0 }"
                            @click="handleClassList(i, item)"
                          >
                            <i class="icon">
                              <img
                                src="/public/images/icon/icon_document.png"
                                alt="icon_document"
                              />
                            </i>
                            <template v-if="isEdit !== item.id">
                              <span class="text" @dblclick="handleEditClassList(item)">{{ item.name }}</span>
                            </template>
                            <template v-else>
                              <div class="step-list-edit">
                                <input type="text" v-model="item.name" @input="handleInput(item.name)">
                                <button type="button" class="btn-close" @click="isEdit = -1" aria-label="닫기">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="#52575C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                </button>
                              </div>
                            </template>
                            <button
                              type="button"
                              class="btn-arrow"
                              :class="{ 'is-active': !openList[item.id] }"
                              @click.stop="handleAccordion(item)"
                              v-if="item.children"
                            >
                              <img
                                src="/public/images/icon/icon_chevron_down.png"
                                alt="icon_chevron_down"
                              />
                            </button>
                          </div>
                          <transition
                            @before-enter="beforeEnter"
                            @enter="enter"
                            @before-leave="beforeLeave"
                            @leave="leave"
                          >
                            <div
                              class="depth"
                              v-if="!openList[item.id]"
                            >
                              <div class="depth-list" v-for="(depth, j) in item.children" :key="j">
                                <div
                                  class="depth-list-item"
                                  ref="depthListItemRef"
                                  :class="{
                                    'is-active':
                                      (setDepthList.parentId === item.id && setDepthList.depthId === depth.id) || isDepthEdit === depth.id
                                  }"
                                  @click="handleDepthList(item.id, depth.id, depth)"
                                >
                                  <i class="icon">
                                    <img
                                      src="/public/images/icon/icon_document.png"
                                      alt="icon_document"
                                    />
                                  </i>
                                  <template v-if="isDepthEdit !== depth.id">
                                    <span class="text" @dblclick="handleEditDepthList(depth)">{{ depth.name }}</span>
                                  </template>
                                  <template v-else>
                                    <div class="step-list-edit">
                                      <input type="text" v-model="depth.name" @input="handleDepthInput(depth.name)">
                                      <button type="button" class="btn-close" @click="isDepthEdit = -1" aria-label="닫기">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                          <path d="M13 1L1 13M1 1L13 13" stroke="#52575C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                      </button>
                                    </div>
                                  </template>
                                </div>
                              </div>
                            </div>
                          </transition>
                        </div>
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

                      />
                    </div>
                  </div>
                  <div class="cont-list">
                    <label>공개설정<span class="required"></span></label>
                    <div class="cont-list-box">
                      <div class="radio-box">
                        <input type="radio" id="0" name="gender" value="M" />
                        <label for="0">
                          <span class="check-box-item">
                            <span class="item-blur" />
                          </span>
                          <span class="check-box-txt">공개</span>
                        </label>
                      </div>
                      <div class="radio-box">
                        <input type="radio" id="1" name="gender" value="F" />
                        <label for="1">
                          <span class="check-box-item">
                            <span class="item-blur" />
                          </span>
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
                          <editor-client />
                        </client-only>
                      </div>
                    </div>
                  </div>
                  <div class="cont-list align-start">
                    <label>미션<span class="required"></span></label>
                    <div class="cont-list-flex">
                      <div class="cont-list-box col-2 align-center">
                        <div class="col-wrap">
                          <div class="select-default">
                            <select v-model="missonSelect">
                              <option v-for="(item, index) in missionList" :key="index" :value="item">{{ item }}</option>
                            </select>
                          </div>

                          <!-- input 1개 -->
                          <div class="input-text" v-if="missonSelect === '구질' || missonSelect === '남은 거리' || missonSelect === '도착 지형'">
                            <input
                              type="text"
                              placeholder="내용을 입력하세요"
                            />
                          </div>

                          <!-- input 2개 (범위) -->
                          <div class="input-wrap" v-else>
                            <div class="input-text">
                              <input
                                type="text"
                                placeholder="내용을 입력하세요"
                              />
                            </div>
                            <span>~</span>
                            <div class="input-text">
                              <input
                                type="text"
                                placeholder="내용을 입력하세요"
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          class="btn-del"
                          @click="handleDel(index)"
                        >
                          <img
                            src="/public/images/icon/icon_delete.png"
                            alt="icon_delete"
                          />
                        </button>
                      </div>
                      <!-- 반복되는 폼 -->
                      <div
                        class="cont-list-box col-2 align-center"
                        v-for="(form, index) in formList"
                        :key="index"
                      >
                        <div class="col-wrap">
                          <div class="select-default">
                            <select v-model="form.mission">
                              <option>비거리</option>
                              <option>볼속도</option>
                              <option>볼방향</option>
                              <option>이격거리</option>
                              <option>탈출각</option>
                              <option>사이드스핀</option>
                              <option>구질</option>
                              <option>남은 거리</option>
                              <option>도착 지형</option>
                            </select>
                          </div>
                          <!-- input 1개 -->
                          <div class="input-text" v-if="form.mission === '구질' || form.mission === '남은 거리' || form.mission === '도착 지형'">
                            <input
                              type="text"
                              placeholder="내용을 입력하세요"
                              v-model="form.value"
                            />
                          </div>

                          <!-- input 2개 (범위) -->
                          <div class="input-wrap" v-else>
                            <div class="input-text">
                              <input
                                type="text"
                                placeholder="내용을 입력하세요"
                                v-model="form.start"
                              />
                            </div>
                            <span>~</span>
                            <div class="input-text">
                              <input
                                type="text"
                                placeholder="내용을 입력하세요"
                                v-model="form.end"
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          class="btn-del"
                          @click="handleDel(index)"
                        >
                          <img
                            src="/public/images/icon/icon_delete.png"
                            alt="icon_delete"
                          />
                        </button>
                      </div>

                      <!-- 추가 버튼 -->
                      <div class="cont-list-box col-2">
                        <button
                          type="button"
                          class="cont-list-btn"
                          @click="handleAdd"
                        >
                          <img
                            src="/public/images/icon/icon_add_circle.png"
                            alt="icon_add_circle"
                          />
                          <span class="text">추가하기</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 임시저장 / 확인 -->
            <div class="btn-wrap">
              <button type="button" class="btn-primary btn-lg-line">
                임시저장
              </button>
              <button type="button" class="btn-primary-teal btn-lg-fill">
                확인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- 추천정보 모달 -->
  <modal-recommend-info
    :isOpen="modals.modalRecommendInfo"
    @update:isOpen="modals.modalRecommendInfo = $event"/>

  <!-- 카테고리 삭제 모달 -->
  <modal-category-confirm 
    :isOpen="modals.modalCategoryConfirm"
    @update:isOpen="modals.modalCategoryConfirm = $event" 
    @confirm="handleConfirmDelete"/>

</template>
<script setup>
import editorClient from "@/components/toast-ui/editor.client.vue";
import { onClickOutside } from "@vueuse/core";

const stepListItemRef = ref();
onClickOutside(stepListItemRef, event => {
  console.log(event.target)
    const parent = event.target.closest('.step-list-item');

    if(parent === null) {
        isEdit.value = -1;
    }
});

const depthListItemRef = ref();
onClickOutside(depthListItemRef, event => {
    const parent = event.target.closest('.depth-list-item');

    if(parent === null) {
        isDepthEdit.value = -1;
    }
})

const curriculum = ref(true);
const isComplete = ref(false);

// 커리큘럼 등록
const leftClick = () => {
  curriculum.value = true;
};

// 클래스 등록 및 관리
const rightClick = () => {
  curriculum.value = false;
};

// 모달 관련
const modals = reactive({ modalSample: false });
const modalOpen = (modalName) => {
  modals[modalName] = !modals[modalName];
  document.querySelector("body").classList.add("is-hidden");
};

// 여러 이미지를 객체로 관리
const images = ref({
  academy: null,
  coach: null,
});

// 파일 변경
const onFileChange = (event, key) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = () => {
      images.value[key] = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

// 파일 삭제
const removeFile = (key) => {
  images.value[key] = null;
  const fileInputs = document.querySelectorAll("input[type=file]");
  fileInputs.forEach((input) => (input.value = ""));
};

// 미션 리스트
const missionList = ref(['비거리', '볼속도', '볼방향', '이격거리', '탈출각', '사이드스핀', '구질', '남은 거리', '도착 지형']);
const missonSelect = ref('비거리');

// 미션 폼
const formList = ref([]);

// 미션 추가
const handleAdd = () => {
  formList.value.push({ mission: missonSelect.value, value: "" });
};

// 미션 삭제
const handleDel = (index) => {
  formList.value.splice(index, 1);
};

// 애니메이션
const beforeEnter = (el) => {
  el.style.height = "0";
  el.style.transition = "height 0.4s ease"; // transition 미리 설정
};

const enter = (el) => {
  el.style.height = el.scrollHeight + "px";
  el.addEventListener(
    "transitionend",
    () => {
      el.style.height = "auto"; // 완료 후 auto로 변경
    },
    { once: true },
  );
};

const beforeLeave = (el) => {
  el.style.height = el.scrollHeight + "px";
  el.style.transition = "height 0.4s ease"; // leave에도 미리 설정
};

const leave = (el) => {
  el.style.height = "0";
};

// 카테고리 리스트
const categoryList = ref([
  {
    id: 0,
    name: "S/W 바로잡기",
    children: [
      {
        id: 1001,
        index: 0,
        name: "어프로치 연습 1",
        children: [],
      },
      {
        id: 1002,
        index: 1,
        name: "어프로치 연습 2",
        children: [],
      },
    ],
  },
  {
    id: 1,
    name: "S/W 바로잡기",
    children: [
      {
        id: 2001,
        index: 0,
        name: "하프스윙 연습 1",
        children: [],
      },
      {
        id: 2002,
        index: 1,
        name: "하프스윙 연습 2",
        children: [],
      },
    ],
  },
]);


// 아코디언
const openList = ref({});
const handleAccordion = (item) => {   
  openList.value[item.id] = !openList.value[item.id];
}

// 클래스 클릭 이벤트
const classStepTitle = ref('');
const setClassList = ref(-1);
const isStep = ref(false);
const handleClassList = (i, item) => {
  setClassList.value = setClassList.value === i ? -1: i;
  setDepthList.value = -1;
  classStepTitle.value = item.name;
  isStep.value = true;
  setTotalClass.value = false;
  isDepthEdit.value = -1;
}

// 스텝 편집 이벤트
const handleDepthInput = (item) => {
  setInput.value = classStepTitle.value = item;
}

// 클래스/스텝 제목 이벤트
const handleClassStep = () => {
  // 선택된 클래스가 있으면 클래스 이름 업데이트
  if (setClassList.value !== -1) {
    categoryList.value[setClassList.value].name = classStepTitle.value;
  }

  // 선택된 스텝이 있으면 스텝 이름 업데이트
  if (setDepthList.value.parentId !== null && setDepthList.value.depthId !== null) {
    const parent = categoryList.value.find(item => item.id === setDepthList.value.parentId);
    if (parent) {
      const depth = parent.children.find(child => child.id === setDepthList.value.depthId);
      if (depth) {
        depth.name = classStepTitle.value;
      }
    }
  }
}

// 클래스 더블클릭 이벤트
const isEdit = ref(-1);
const handleEditClassList = (item) => {  
  isEdit.value = item.id
  isDepthEdit.value = -1;
}

// 클래스 편집 이벤트
const setInput = ref();
const handleInput = (item) => {
  setInput.value = classStepTitle.value = item;
}

// 스텝 클릭 이벤트
const setDepthList = ref({
  parentId: null, // 선택된 상위 id
  depthId: null,  // 선택된 하위 id
});

// 스텝 더블클릭 이벤트
const isDepthEdit = ref(-1);
const handleEditDepthList = (depth) => {
  isDepthEdit.value = depth.id
  isEdit.value = -1;
}

const handleDepthList = (parentId, depthId, depth) => {
  // 클래스 선택 해제 (클래스가 아닌 '스텝' 선택 상태)
  setClassList.value = -1;

  // 현재는 스텝 선택 상태
  isStep.value = false;

  classStepTitle.value = depth.name;
  setTotalClass.value = false;

  if (
    setDepthList.value.parentId === parentId &&
    setDepthList.value.depthId === depthId
  ) {
    setDepthList.value = { parentId: null, depthId: null };
    // 선택 해제 후엔 기본적으로 다시 전체 '클래스' 상태가 아니도록 유지
  } else {
    setDepthList.value = { parentId, depthId };
  }
};


// 전체 클래스
const setTotalClass = ref(false);
const handleTotalClass = () => {
  setTotalClass.value = !setTotalClass.value;
  setClassList.value = -1;
  isEdit.value = -1;
  isDepthEdit.value = -1;
  isStep.value = false;
  setDepthList.value = -1;
}

// 카테고리 추가 이벤트
const count = ref(2);        // 클래스용
const depthCount = ref(10); // 스텝용
const addCategory = () => {
  if(isStep.value) {
    if (setClassList.value === -1) return; // 전체 클래스 선택 시 스텝 추가 불가

    const parent = categoryList.value[setClassList.value];
    parent.children = parent.children || [];

    const newStep = {
      id: depthCount.value, // 고유 id
      name: `새로운 스텝 ${depthCount.value++}`,
      children: [],
    };

    parent.children.push(newStep);
    openList.value[parent.id] = false; // 아코디언 열기
    
  } else {
    categoryList.value.push({
    id: count.value,
    name: `새로운 클래스 ${count.value++}`
  })
  }
}

// 삭제 모달 열기 이벤트
const removeCategory = () => {
  modals.modalCategoryConfirm = true;
}

// 카테고리 삭제 이벤트
const handleConfirmDelete = (confirmed) => {
  if (!confirmed) {
    modals.modalCategoryConfirm = false;
    return;
  }

  if (isStep.value) {

    // 클래스 삭제(상위)
    if (setTotalClass.value) {
      modals.modalCategoryConfirm = false;
      return;
    }

    if (setClassList.value === -1 || setClassList.value === null || setClassList.value === undefined) {
      modals.modalCategoryConfirm = false;
      return;
    }

    // setClassList가 id인지 index인지 안전하게 계산
    let selectedIndex = categoryList.value.findIndex(item => item.id === setClassList.value);

    // 못찾았으면 배열 인덱스로 시도
    if (selectedIndex === -1) {
      if (typeof setClassList.value === 'number' &&
          setClassList.value >= 0 &&
          setClassList.value < categoryList.value.length) {
        selectedIndex = setClassList.value;
      }
    }

    // 삭제 실행
    if (selectedIndex !== -1) {
      categoryList.value.splice(selectedIndex, 1);
    } else {
      modals.modalCategoryConfirm = false;
      return;
    }

    // 삭제 후 상태 초기화
    setClassList.value = -1;
    setDepthList.value = { parentId: null, depthId: null };
    isEdit.value = -1;
    isDepthEdit.value = -1;
    isStep.value = false;        // ✅ 삭제 후 스텝 모드 해제
    modals.modalCategoryConfirm = false;

    // count도 재조정 (선택적으로 마지막 id를 유지하고 싶으면 아래처럼)
    if (categoryList.value.length > 0) {
      count.value = Math.max(...categoryList.value.map(c => c.id)) + 1;
    } else {
      count.value = 0;
    }


  } else {

    console.log(setDepthList.value.parentId)

    // 스텝(하위) 삭제
    if (setDepthList.value.parentId === null) {
      modals.modalCategoryConfirm = false;
      return;
    }

    const parentIndex = categoryList.value.findIndex(
      (item) => item.id === setDepthList.value.parentId
    );
    if (parentIndex !== -1) {
      const parent = categoryList.value[parentIndex];
      const depthIndex = parent.children.findIndex(
        (child) => child.id === setDepthList.value.depthId
      );
      if (depthIndex !== -1) {
        parent.children.splice(depthIndex, 1);
      }
    }

    setDepthList.value = { parentId: null, depthId: null };
  }

  // 모달 닫기
  modals.modalCategoryConfirm = false;
};


onMounted(() => {
  categoryList.value.forEach((item) => {
    openList.value[item.id]
  })
})

definePageMeta({
  layout: "sub-page",
});
</script>
<style lang="scss" scoped>
@use "@/assets/scss/pages/academy-detail.scss";
</style>
