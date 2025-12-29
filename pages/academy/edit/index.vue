<template>
    <div class="membership academy-write">
        <div class="membership-wrap">
            <div class="content">
                <div class="content-head">아카데미 등록하기</div>
                <div class="content-tab">
                    <div class="content-tab-list left" :class="{ 'is-ing' : curriculum, 'is-complete' : !curriculum }" @click="leftClick">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <path d="M11.6668 18.184L7.82496 14.3421L6.17529 15.9918L11.6668 21.4833L22.9916 10.1585L21.342 8.50879L11.6668 18.184Z" fill="white"/>
                            </svg>
                        </div>
                        <div class="text">1. 커리큘럼 등록</div>
                    </div>
                    <div class="content-tab-list right" :class="{ 'is-ing' : !curriculum && !isComplete, 'is-complete' : !curriculum && isComplete }" @click="rightClick">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <path d="M11.6668 18.184L7.82496 14.3421L6.17529 15.9918L11.6668 21.4833L22.9916 10.1585L21.342 8.50879L11.6668 18.184Z" fill="white"/>
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
                                        <div class="img-area" 
                                             :class="{ 'no-data' : images.academy === null }" 
                                             :style="images.academy ? { backgroundImage: `url('${images.academy}')` } : {}" />
                                        <div class="btn-wrap">
                                            <div class="btn-group">
                                                <button type="button" class="btn-sm-line">등록</button>
                                                <input
                                                    type="file"
                                                    @change="onFileChange($event, 'academy')"
                                                    accept="image/*"
                                                />
                                            </div>
                                            <button type="button" class="btn-sm-line" @click="removeFile('academy')">삭제</button>
                                        </div>  
                                    </div>
                                </div>
                                <div class="cont-list">
                                    <label>제목<span class="required"></span></label>
                                    <div class="cont-list-box">
                                        <input
                                            type="text"
                                            placeholder="제목"
                                        />
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
                                        <textarea
                                            placeholder="내용을 입력하세요."
                                        ></textarea>
                                    </div>
                                </div>
                                <div class="cont-list">
                                    <label>코치 소개글<span class="required"></span></label>
                                    <div class="cont-list-box">
                                        <textarea
                                            placeholder="내용을 입력하세요."
                                        ></textarea>
                                    </div>
                                </div>
                                <div class="cont-list">
                                    <label>코치 프로필 이미지</label>
                                    <div class="cont-list-box">
                                        <div class="img-area" 
                                             :class="{ 'no-data' : images.coach === null }" 
                                             :style="images.coach ? { backgroundImage: `url('${images.coach}')` } : {}" />
                                        <div class="btn-wrap">
                                            <div class="btn-group">
                                                <button type="button" class="btn-sm-line">등록</button>
                                                <input
                                                    type="file"
                                                    @change="onFileChange($event, 'coach')"
                                                    accept="image/*"
                                                />
                                            </div>
                                            <button type="button" class="btn-sm-line" @click="removeFile('coach')">삭제</button>
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
                                        <button type="button" class="btn-sm-line" @click="addCategory">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
                                                <mask id="mask0_104_4948" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="20">
                                                <rect width="16" height="20" fill="#D9D9D9"/>
                                                </mask>
                                                <g mask="url(#mask0_104_4948)">
                                                <path d="M7.32964 10.6708H3.52832V9.32915H7.32964V5.52783H8.67128V9.32915H12.4726V10.6708H8.67128V14.4721H7.32964V10.6708Z" fill="#FF7519"/>
                                                </g>
                                            </svg>
                                            <span class="text">카테고리 추가</span>
                                        </button>
                                        <button type="button" class="btn-sm-line" @click="deleteCategory">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
                                                <mask id="mask0_104_1523" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="20">
                                                <rect width="16" height="20" fill="#D9D9D9"/>
                                                </mask>
                                                <g mask="url(#mask0_104_1523)">
                                                <path d="M4.42188 10.6707V9.3291H11.5773V10.6707H4.42188Z" fill="#FF7519"/>
                                                </g>
                                            </svg>
                                            <span class="text">삭제</span>
                                        </button>
                                    </div>
                                    <div class="category">
                                        <div class="category-wrap">
                                            <div class="category-title" :class="{ 'is-active' : setCategoryAdd }" @click="handleCategoryAdd">
                                                <span class="text">전체 클래스</span>
                                                <span class="num">(11)</span>
                                            </div>
                                            <div class="category-cont">
                                                <draggable
                                                    v-model="categoryList"
                                                    item-key="id"
                                                    group="tree"
                                                    :animation="200"
                                                    class="step">
                                                    <template #item="{ element }">
                                                        <div class="step-list">
                                                            <div class="step-list-item" @click="handleAccordion(element.id)">
                                                                <i class="icon">
                                                                    <img src="/public/images/icon/icon_document.png" />
                                                                </i>
                                                                <span class="text">{{ element.name }}</span>
                                                                <button
                                                                    v-if="element.children && element.children.length > 0"
                                                                    type="button"
                                                                    class="btn-arrow"
                                                                    :class="{ 'is-active': openList[element.id] }"
                                                                    >
                                                                    <img src="/public/images/icon/icon_chevron_down.png" />
                                                                </button>
                                                            </div>
                                                            <transition
                                                                @before-enter="beforeEnter"
                                                                @enter="enter"
                                                                @before-leave="beforeLeave"
                                                                @leave="leave">
                                                                <draggable
                                                                    v-if="openList[element.id] !== true"
                                                                    v-model="element.children"
                                                                    item-key="id"
                                                                    group="tree"
                                                                    :animation="200"
                                                                    class="depth">
                                                                    <template #item="{ element: child }">
                                                                        <div class="depth-list">
                                                                            <div class="depth-list-item" :class="{ 'is-active': depthActive[child.id] }" @click="handleDepthAdd(child.id)">
                                                                                <i class="icon">
                                                                                    <img src="/public/images/icon/icon_document.png" />
                                                                                </i>
                                                                                <span class="text">{{ child.name }}</span>
                                                                            </div>
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
                                                placeholder="내용을 입력하세요."
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
                                            name="gender"
                                            value="M"
                                            />
                                            <label for="0">
                                            <span class="check-box-item">
                                                <span class="item-blur" />
                                            </span>
                                            <span class="check-box-txt">공개</span>
                                            </label>
                                        </div>
                                        <div class="radio-box">
                                            <input
                                            type="radio"
                                            id="1"
                                            name="gender"
                                            value="F"
                                            />
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
                                            <div class="cont-list-box col-2"> 
                                                <div class="select-default"> 
                                                    <select> 
                                                        <option>미션2</option> 
                                                    </select> 
                                                </div> 
                                                <div class="input-wrap"> 
                                                    <div class="input-text"> 
                                                        <input type="text" placeholder="내용을 입력하세요" /> 
                                                    </div> 
                                                    <span>~</span> 
                                                    <div class="input-text"> 
                                                        <input type="text" placeholder="내용을 입력하세요" /> 
                                                    </div> 
                                                </div> 
                                            </div> 
                                            <div class="cont-list-box col-2"> 
                                                <div class="select-default"> 
                                                    <select> 
                                                        <option>미션3</option> 
                                                    </select> 
                                                </div> 
                                                <div class="input-text"> 
                                                    <input type="text" placeholder="내용을 입력하세요" /> 
                                                </div> 
                                            </div>
                                            <!-- 반복되는 폼 -->
                                            <div 
                                                class="cont-list-box col-2" 
                                                v-for="(form, index) in formList" 
                                                :key="index"
                                            >
                                            <div class="select-default">
                                                <select v-model="form.mission">
                                                <option>미션1</option>
                                                <option>미션2</option>
                                                <option>미션3</option>
                                                </select>
                                            </div>

                                            <!-- input 1개 -->
                                            <div v-if="!form.range" class="input-text">
                                                <input
                                                type="text"
                                                placeholder="내용을 입력하세요"
                                                v-model="form.value"
                                                />
                                            </div>

                                            <!-- input 2개 (범위) -->
                                            <div v-else class="input-wrap">
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

                                            <!-- 추가 버튼 -->
                                            <div class="cont-list-box col-2">
                                            <button type="button" class="cont-list-btn" @click="handleAdd">
                                                <img src="/public/images/icon/icon_add_circle.png" alt="">
                                                <span class="text">추가하기</span>
                                            </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="btn-wrap">
                            <button type="button" class="btn-primary btn-lg-line">임시저장</button>
                            <button type="button" class="btn-primary-teal btn-lg-fill">확인</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <modal-recommend-info :isOpen="modals.modalRecommendInfo" @update:isOpen="modals.modalRecommendInfo = $event"/>
</template>
<script setup>
import editorClient from '@/components/toast-ui/editor.client.vue'
import draggable from "vuedraggable";

const curriculum = ref(true);
const isComplete = ref(false);

const leftClick = () => {
    curriculum.value = true;
}

const rightClick = () => {
    curriculum.value = false;
}

const modals = reactive({modalSample: false});

const modalOpen = (modalName) => {
  modals[modalName] = !modals[modalName];
  document.querySelector('body').classList.add('is-hidden');
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

// 삭제
const removeFile = (key) => {
  images.value[key] = null;

  // input 초기화
  const fileInputs = document.querySelectorAll("input[type=file]");
  fileInputs.forEach((input) => (input.value = ""));
};

const setCategoryAdd = ref(false);
const handleCategoryAdd = () => {
    setCategoryAdd.value = !setCategoryAdd.value;
}

const depthActive = ref({});

const handleDepthAdd = (id) => {
    Object.keys(depthActive.value).forEach((key) => {
        depthActive.value[key] = false;
    });
    depthActive.value[id] = true;
};

const categoryList = ref([
  {
    id: 1,
    name: "S/W 바로잡기",
    children: [
        { 
            id: 11, 
            name: "어프로치 연습 1", 
            children: []
        },
        { 
            id: 12, 
            name: "어프로치 연습 2", 
            children: []
        }
    ]
  },
  {
    id: 2,
    name: "S/W 바로잡기",
    children: [
        { 
            id: 21,
            name: "하프스윙 연습 1",
            children: []
        },
        { 
            id: 22, 
            name: "하프스윙 연습 2", 
            children: []
        }
    ]
  }
]);

const addCategory = () => {
    if(setCategoryAdd.value) {
        categoryList.value.push({
        id: nextId++,
        name: "새 카테고리",
        children: []
    });
    }
};

// 아코디언
const openList = ref({}); // 각 카테고리 열림 상태
let nextId = 3; // 새 카테고리 고유 id

const handleAccordion = (id) => {
  openList.value[id] = !openList.value[id];
};

const beforeEnter = (el) => {
  el.style.height = "0";
  el.style.transition = "height 0.4s ease";  // transition 미리 설정
};

const enter = (el) => {
  el.style.height = el.scrollHeight + "px";
  el.addEventListener("transitionend", () => {
    el.style.height = "auto"; // 완료 후 auto로 변경
  }, { once: true });
};

const beforeLeave = (el) => {
  el.style.height = el.scrollHeight + "px";
  el.style.transition = "height 0.4s ease";  // leave에도 미리 설정
};

const leave = (el) => {
  el.style.height = "0";
};

const formList = ref([
  { mission: "미션1", value: "", range: false } // 초기 폼 하나
])

// 폼 추가 함수
const handleAdd = () => {
  formList.value.push({ mission: "미션1", value: "", range: false })
}

onMounted(() => {
  categoryList.value.forEach((item) => {
    openList[item.id] = true; // 기본 열림
  });
});

definePageMeta({ 
    layout: 'sub-page'
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/membership.scss';
</style> 