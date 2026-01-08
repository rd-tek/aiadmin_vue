<template>
  <div
    class="modal modal-callback"
    :class="{ 'is-active': isOpen }"
    @click.self="modalClose"
  >
    <div class="modal-container">
      <div class="modal-header">
        <p class="title">불러오기</p>
        <button type="button" class="btn-close" @click="modalClose" aria-label="닫기">
          <img src="/images/icon/icon_close_grey.png" alt="icon_close_grey" />
        </button>
      </div>
      <div class="modal-body">
        <div class="content">
          <div class="title">{{ displayTitle }}</div>
          <div class="cont">
            <div
              class="cont-list"
              v-for="(item, index) in resultAnalysisData.list"
              :key="index"
            >
              <div class="radio-box">
                <input
                  type="radio"
                  :id="`radio_${index}`"
                  :name="`radio_${index}`"
                  :value="item.fit_ans_analysis_pk"
                  v-model="selectedPk"
                />
                <label :for="`radio_${index}`">
                  <span class="check-box-item">
                    <i class="item-line" />
                  </span>
                </label>
              </div>
              <div class="form-box">
                <div class="input-text">
                  <input
                    type="text"
                    placeholder="제목"
                    v-model="item.edit_title"
                  />
                  <button
                    type="button"
                    class="btn-primary-grey btn-md-fill"
                    @click="_save(item)"
                  >
                    내용저장
                  </button>
                </div>
                <div class="text-area">
                  <textarea
                    placeholder="내용을 입력하세요"
                    v-model="item.result_txt"
                    readonly
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="no-info" v-if="resultAnalysisData.list.length === 0">내역이 없습니다.</div>
          </div>
          <client-only>
            <VueAwesomePaginate
              :items-per-page="10"
              :max-pages-shown="3"
              v-model="searchData.pageno"
              :total-items="resultAnalysisData.listcnt || 1"
              @click="onClickHandler"
              pagination-container-class="pagination-container type02"
              paginate-buttons-class="paginate-buttons"
              active-page-class="active"
              back-button-class="paginate-buttons"
              next-button-class="paginate-buttons"
            >
              <template #prev-button>
                <img src="/images/icon/icon_prev.png" alt="icon_prev" />
              </template>
              <template #next-button>
                <img src="/images/icon/icon_next.png" alt="icon_next" />
              </template>
            </VueAwesomePaginate>
          </client-only>
        </div>
      </div>
      <div class="modal-footer">
        <div class="btn-wrap">
          <button type="button" class="btn-lg-line" @click="modalClose">
            취소
          </button>
          <button
            type="button"
            class="btn-primary-teal btn-lg-fill"
            @click="handleClick"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";
// import { useCoachingApi } from "~/api/coaching";
import { useCommon } from "@/utils/common";
import { useRouteQuery } from "@vueuse/router";

const common = useCommon();
const route = useRoute();
const router = useRouter();
// const coachingApi = useCoachingApi();

const selectedPk = ref(null);
const form = reactive({
  title: "",
});
// 👇 defineProps 수정
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  // 부모에서 넘겨준 값을 받기 위해 추가
  callbackValue: {
    type: String, // 넘어오는 값이 문자열이므로 String 지정
    default: "", // 값이 없을 경우를 대비한 기본값
  },
});

const emit = defineEmits(["update:isOpen", "select-content"]);
// 📝 형님, 여기에 매핑할 텍스트들을 쫙 정리해뒀습니다.
// 나중에 멘트 바꿀 일 있으면 여기만 고치시면 됩니다.
const titleMap = {
  coaching_result: "코칭 결과",
  lesson1: "Address",
  lesson2: "Back Swing",
  lesson3: "Top Swing",
  lesson4: "Down Swing",
  lesson5: "Impact",
  lesson6: "Follow Throw",
  lesson7: "Finish",
  lessontotal: "종합 코칭",
};

const resultAnalysisData = ref({
  list: [],
  listcnt: 0,
});
const pagenoRef = useRouteQuery("pageno", 1); // 원본 Ref
const searchData = reactive({
  pageno: computed({
    get: () => Number(pagenoRef.value) || 1,
    set: (v) => {
      pagenoRef.value = v;
    },
  }),
});

// ⚡ props.callbackValue가 바뀔 때마다 자동으로 알맞은 한글/영문 제목을 찾습니다.
const displayTitle = computed(() => {
  // 매핑된 게 있으면 그걸 보여주고, 없으면 그냥 기본값 보여줍니다.
  return titleMap[props.callbackValue] || "";
});

const modalClose = () => {
  emit("update:isOpen", false);
  document.querySelector("body").classList.remove("is-hidden");
};

const onClickHandler = (page) => {
  _resultAnalysisList();
  // const item = preferShop.value[page - 1];
  // if (item) emit("itemChg", item);
  // return false;
};

const handleClick = () => {
  // 선택된 게 없으면 경고
  if (!selectedPk.value) {
    alert("항목을 선택해주세요.");
    return;
  }

  // 리스트에서 selectedPk와 일치하는 녀석을 찾습니다.
  const selectedItem = resultAnalysisData.value.list.find(
    (item) => item.fit_ans_analysis_pk === selectedPk.value,
  );

  if (selectedItem) {
    // ✨ 핵심: 부모에게 'select-content'라는 이벤트로 텍스트를 던집니다!
    // 그리고 모달을 닫아줍니다.
    emit("select-content", selectedItem.result_txt);
    modalClose();
  }
};

const _save = async (item) => {
  const payload = {
    fit_ans_analysis_pk: item.fit_ans_analysis_pk,
    result_title: item.edit_title,
    analysis_type: props.callbackValue,
  };

  try {
    const { message } = await coachingApi._analysisresulttitlewrite(payload);
    alert(message);
    _resultAnalysisList();
  } catch (err) {
    alert(err.message);
  }
};

const _resultAnalysisList = async () => {
  try {
    const res = await coachingApi._resultanalysislist({
      analysis_type: props.callbackValue,
    });

    const mappedList = res.list.map((item) => ({
      ...item,
      // 수정용 변수 (초기값은 원본 제목과 같게 세팅)
      edit_title: item.result_title,
    }));

    resultAnalysisData.value.list = mappedList;
    resultAnalysisData.value.listcnt = Number(res.analysislistcnt);
  } catch (err) {
    alert(err.message);
  }
};

watch(
  () => props.isOpen,
  async (newVal) => {
    if (newVal === true) {
      // 값이 있을 때만 API 호출 (빈 값이면 호출 안 하거나 방어)
      if (props.callbackValue) {
        selectedPk.value = null; // 모달 열 때마다 선택 초기화
        resultAnalysisData.value = {
          list: [],
          listcnt: 0,
        };
        await _resultAnalysisList();
      } else {
        console.warn("callbackValue가 비어있습니다!");
      }
    }
  },
);

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if(e.key === "Escape") {
      modalClose();
    }
  });
})

onUnmounted(() => {
    window.addEventListener("keydown", (e) => {
    if(e.key === "Escape") {
      modalClose();
    }
  });
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/components/modal.scss";
</style>
