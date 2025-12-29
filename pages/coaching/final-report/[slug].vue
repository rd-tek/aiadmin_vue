<template>
  <div class="board final-report">
    <div class="board-wrap">
      <div class="title" id="report">
        <h2 class="text" v-if="currentState === 'reportRegister'">
          코칭 리포트 등록하기
        </h2>
        <h2 class="text" v-else-if="currentState === 'onepointLesson'">
          원포인트레슨 관리
        </h2>
        <h2 class="text" v-else-if="currentState === 'recommendActive'">
          추천 운동 등록
        </h2>
      </div>
      <div class="content-tab">
        <div
          class="content-tab-list left"
          @click="leftClick"
          :class="{
            'is-ing': currentState === 'reportRegister',
            'is-complete':
              currentState === 'onepointLesson' ||
              currentState === 'recommendActive' ||
              currentState === 'done',
          }"
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
          <div class="text">1. 리포트 등록</div>
        </div>
        <div
          class="content-tab-list center"
          @click="centerClick"
          :class="{
            'is-ing': currentState === 'onepointLesson',
            'is-complete':
              currentState === 'recommendActive' || currentState === 'done',
          }"
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
          <div class="text">2. 원포인트레슨 관리</div>
        </div>
        <div
          class="content-tab-list right"
          @click="rightClick"
          :class="{
            'is-ing': currentState === 'recommendActive',
            'is-complete': currentState === 'done',
          }"
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
          <div class="text">3. 추천 운동 등록</div>
        </div>
      </div>

      <!-- 코칭 리포트 등록하기 -->
      <div class="cont" v-if="currentState === 'reportRegister'">
        <div class="section">
          <div class="top-area">
            <div class="title">리포트 등록</div>
            <button
              type="button"
              class="btn-callback btn-sm-line"
              @click="modalCallbackOpen('total')"
            >
              불러오기
            </button>
          </div>
          <div class="chart-area">
            <div class="chart-box radar-chart">
              <p class="title">코칭 구질분석</p>
              <div class="chart" v-if="resultAnalysisView.analysis">
                <chart-radar v-model:analysis="form.analysis" />
              </div>
            </div>
            <div class="chart-box bar-chart">
              <div class="chart-box-list">
                <p class="title">평균 비거리(m)</p>
                <ul class="progress" v-if="resultAnalysisView.stats">
                  <li
                    class="progress-list"
                    v-if="resultAnalysisView.stats?.mine?.fit_distance"
                  >
                    <div class="progress-num">
                      <span class="num">{{
                        resultAnalysisView.stats?.mine?.fit_distance
                      }}</span>
                      <span class="text">나의평균</span>
                    </div>
                    <div class="progress-bar">
                      <div
                        class="progress-bar-inner is-orange"
                        :style="{ width: animatedProgress + '%' }"
                      ></div>
                    </div>
                  </li>
                  <li
                    class="progress-list"
                    v-if="resultAnalysisView.stats?.others?.fit_distance"
                  >
                    <div class="progress-num">
                      <span class="num">{{
                        resultAnalysisView.stats?.others?.fit_distance
                      }}</span>
                      <span class="text">전체평균</span>
                    </div>
                    <div class="progress-bar">
                      <div
                        class="progress-bar-inner is-cyan"
                        :style="{ width: animatedProgress + '%' }"
                      ></div>
                    </div>
                  </li>
                </ul>
                <div class="no-info" v-else>내역이 없습니다.</div>
              </div>
              <div class="chart-box-list">
                <p class="title">평균 캐리(m)</p>
                <ul class="progress" v-if="resultAnalysisView.stats">
                  <li
                    class="progress-list"
                    v-if="resultAnalysisView.stats?.mine?.fit_carry"
                  >
                    <div class="progress-num">
                      <span class="num">{{
                        resultAnalysisView.stats?.mine?.fit_carry
                      }}</span>
                      <span class="text">나의평균</span>
                    </div>
                    <div class="progress-bar">
                      <div
                        class="progress-bar-inner is-orange"
                        :style="{ width: animatedProgress + '%' }"
                      ></div>
                    </div>
                  </li>
                  <li
                    class="progress-list"
                    v-if="resultAnalysisView.stats?.others?.fit_carry"
                  >
                    <div class="progress-num">
                      <span class="num">{{
                        resultAnalysisView.stats?.others?.fit_carry
                      }}</span>
                      <span class="text">전체평균</span>
                    </div>
                    <div class="progress-bar">
                      <div
                        class="progress-bar-inner is-cyan"
                        :style="{ width: animatedProgress + '%' }"
                      ></div>
                    </div>
                  </li>
                </ul>
                <div class="no-info" v-else>내역이 없습니다.</div>
              </div>
              <div class="chart-box-list">
                <p class="title">평균 볼속도(km/h )</p>
                <ul class="progress" v-if="resultAnalysisView.stats">
                  <li
                    class="progress-list"
                    v-if="resultAnalysisView.stats?.mine?.fit_ball_speed"
                  >
                    <div class="progress-num">
                      <span class="num">{{
                        resultAnalysisView.stats?.mine?.fit_ball_speed
                      }}</span>
                      <span class="text">나의평균</span>
                    </div>
                    <div class="progress-bar">
                      <div
                        class="progress-bar-inner is-orange"
                        :style="{ width: animatedProgress + '%' }"
                      ></div>
                    </div>
                  </li>
                  <li
                    class="progress-list"
                    v-if="resultAnalysisView.stats?.others?.fit_ball_speed"
                  >
                    <div class="progress-num">
                      <span class="num">{{
                        resultAnalysisView.stats?.others?.fit_ball_speed
                      }}</span>
                      <span class="text">전체평균</span>
                    </div>
                    <div class="progress-bar">
                      <div
                        class="progress-bar-inner is-cyan"
                        :style="{ width: animatedProgress + '%' }"
                      ></div>
                    </div>
                  </li>
                </ul>
                <div class="no-info" v-else>내역이 없습니다.</div>
              </div>
            </div>
          </div>
          <div class="top-area">
            <div class="title">코칭 결과 분석</div>
            <button
              type="button"
              class="btn-callback btn-sm-line"
              @click="modalCallbackOpen('coaching_result')"
            >
              불러오기
            </button>
          </div>
          <div class="form-area">
            <div class="form-area-list">
              <div class="text-area">
                <textarea
                  placeholder="내용을 입력하세요"
                  v-model="form.analysis.coaching_result"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="btn-area">
            <button
              type="button"
              class="btn-primary-teal btn-lg-fill"
              @click="handleSubmit"
            >
              확인
            </button>
          </div>
        </div>
      </div>

      <!-- 원포인트레슨 -->
      <div class="cont" v-else-if="currentState === 'onepointLesson'">
        <div class="section">
          <div class="top-area">
            <div class="title">원포인트레슨 등록</div>
            <button
              type="button"
              class="btn-callback btn-sm-line"
              @click="modalCallbackOpen('total')"
            >
              불러오기
            </button>
          </div>
          <div class="table-area" v-if="!isMobile">
            <table class="type01">
              <colgroup>
                <col width="15%" />
                <col width="15%" />
                <col width="*" />
              </colgroup>
              <thead>
                <tr>
                  <th>구분동작</th>
                  <th>평가</th>
                  <th>내용</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(label, idx) in lessonLabels" :key="idx">
                  <td>
                    <div class="flex-wrap">
                      <div class="color-point">{{ label }}</div>
                      <button
                        type="button"
                        class="btn-callback btn-sm-line"
                        @click="modalCallbackOpen(`lesson${idx + 1}`)"
                      >
                        불러오기
                      </button>
                    </div>
                  </td>

                  <td>
                    <div class="select-default">
                      <select v-model="form.analysis[`lessonlevel${idx + 1}`]">
                        <option>레벨선택</option>
                        <option
                          v-for="lvl in [1, 2, 3, 4, 5]"
                          :key="lvl"
                          :value="lvl"
                        >
                          {{ lvl }}
                        </option>
                      </select>
                    </div>
                  </td>

                  <td>
                    <div class="text-area">
                      <textarea
                        v-model="form.analysis[`lesson${idx + 1}`]"
                      ></textarea>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="flex-wrap">
                      <div class="color-point">총평</div>
                      <button
                        type="button"
                        class="btn-callback btn-sm-line"
                        @click="modalCallbackOpen(`lessontotal`)"
                      >
                        불러오기
                      </button>
                    </div>
                  </td>

                  <td>
                  </td>

                  <td>
                    <div class="text-area">
                      <textarea v-model="form.analysis.lessontotal"></textarea>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-area" v-else>
            <table class="type01">
              <thead>
                <tr>
                  <th>
                    <div class="head-wrap">
                      <span class="text">구분동작</span>
                      <span class="text">평가</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(label, idx) in lessonLabels" :key="idx">
                  <td>
                    <div class="info-area">
                      <span class="info-area-list">
                        <span class="color-point">{{ label }}</span>
                      </span>
                      <span class="info-area-list">
                        <span class="border-box">{{
                          form.analysis[`lessonlevel${idx + 1}`]
                        }}</span>
                      </span>
                    </div>
                    <div class="text-area">
                      <textarea
                        v-model="form.analysis[`lesson${idx + 1}`]"
                      ></textarea>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="btn-wrap">
            <button
              type="button"
              class="btn-primary-teal btn-lg-fill"
              @click="handleSubmit"
            >
              확인
            </button>
            <button type="button" class="btn-lg-line" @click="goBack">
              이전 페이지
            </button>
          </div>
        </div>
      </div>

      <!-- 추천운동 -->
      <div class="cont" v-else-if="currentState === 'recommendActive'">
        <div class="section">
          <div class="top-area">
            <div class="title">추천운동 선택</div>
            <button
              type="button"
              class="btn-callback btn-sm-line"
              @click="modalCallbackOpen('total')"
            >
              불러오기
            </button>
          </div>
          <div class="grid-area">
            <div
              class="grid-list"
              v-for="item in resultAnalysisView.recommendations"
              :key="item.recommend_exercise_pk"
            >
              <div class="check-box">
                <input
                  type="checkbox"
                  v-model="selectedPks"
                  :id="`check_${item.recommend_exercise_pk}`"
                  :value="item.recommend_exercise_pk"
                />
                <label :for="`check_${item.recommend_exercise_pk}`">
                  <span class="check-box-item">
                    <i class="item-line" />
                  </span>
                  <div class="chexk-box-wrap">
                    <div class="img-area">
                      <div
                        class="image"
                        :style="{
                          backgroundImage: `url(${
                            item.thumbnail_url
                              ? common.getImg(item.thumbnail_url)
                              : '/images/default/img_logo.png'
                          })`,
                        }"
                      ></div>
                    </div>
                    <div class="label">
                      <div class="label-list">{{ item.target_audience || item.title }}</div>
                    </div>
                    <div class="title">{{ item.objective }}</div>
                    <!-- <div class="desc">{{ item.objective }}</div> -->
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div class="btn-wrap">
            <button type="button" class="btn-lg-line" @click="goBack">
              이전 페이지
            </button>
            <button
              type="button"
              class="btn-lg-line"
              @click="modalOpen('modalPreview')"
            >
              미리보기
            </button>
            <button
              type="button"
              class="btn-primary-teal btn-lg-fill"
              @click="handleSubmit"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <modal-callback
    :isOpen="modals.modalCallback"
    @update:isOpen="modals.modalCallback = $event"
    :callbackValue="callbackValue"
    @select-content="handleSelectContent"
  />
  <modal-preview
    :isOpen="modals.modalPreview"
    @update:isOpen="modals.modalPreview = $event"
    :item="form"
  />

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
    @update:isOpen="modals.toastWarnModal = $event"
  />

  <!-- 토스트 에러 모달 -->
  <toast-error-modal
    :isOpen="modals.toastErrorModal"
    :toastErrorMessage="toastErrorMessage"
    @update:isOpen="modals.toastErrorModal = $event"
  />
</template>
<script setup>
import { useMemberApi } from "~/api/membership";
import { useCoachingApi } from "~/api/coaching";
import { useRouteQuery } from "@vueuse/router";
import { useCommon } from "@/utils/common";
import RadarChart from "~/components/chart/radarChart.vue";
import { useWindowSize } from "@vueuse/core";
import toastModal from "@/components/toast-ui/toast-modal.vue";
import toastErrorModal from "@/components/toast-ui/toast-error-modal.vue";
import toastWarnModal from "@/components/toast-ui/toast-warn-modal.vue";
import { useHead } from '#app'

const common = useCommon();
const route = useRoute();
const router = useRouter();
const coachingApi = useCoachingApi();
const memberApi = useMemberApi();
const enroll_pk = Number(route.params.slug);
const modals = reactive({});
const modalOpen = (modalName) => {
  modals[modalName] = !modals[modalName];
  document.querySelector("body").classList.add("is-hidden");
};

const callbackValue = ref("");
const modalCallbackOpen = (val) => {
  modals.modalCallback = true;
  callbackValue.value = val;
  // document.querySelector("body").classList.add("is-hidden");
};

// 토스트 확인 모달
const toastMessage = ref();
const handleToast = (message) => {
  document.querySelector("body").classList.add("is-hidden");
  modals["toastModal"] = true;
  toastMessage.value = message;
};

// 토스트 에러 모달
const toastErrorMessage = ref();
const handleErrorToast = (message) => {
  document.querySelector("body").classList.add("is-hidden");
  modals["toastErrorModal"] = true;
  toastErrorMessage.value = message;
};

// 토스트 경고 모달
const toastWarnMessage = ref();
const handleWarnToast = (message) => {
  document.querySelector("body").classList.add("is-hidden");
  modals["toastWarnModal"] = true;
  toastWarnMessage.value = message;
};

const resultAnalysisView = ref({
  analysis: {},
  stats: {},
  recommendations: {},
});

const form = ref({
  analysis: {
    grade_distance: 1,
    grade_direction: 1,
    grade_accuracy: 1,
    grade_position: 1,
    grade_impact: 1,
    lessonlevel1: 1,
    lessonlevel2: 1,
    lessonlevel3: 1,
    lessonlevel4: 1,
    lessonlevel5: 1,
    lessonlevel6: 1,
    lessonlevel7: 1,
  },
  stats: {},
  recommendations: [],
});

const selectedPks = ref([]);
const hasChecked = computed(() => selectedPks.value.length > 0);
const _resultAnalysisView = async (enroll_pk) => {
  try {
    const res = await coachingApi._resultanalysisview(enroll_pk);

    console.log("res", res);
    resultAnalysisView.value = {
      analysis: res.analysis,
      stats: res.stats,
      recommendations: res.recommendations,
    };

    // 기존 form 구조 유지하면서 값만 덮어쓰기
    form.value.analysis = {
      ...form.value.analysis,
      ...resultAnalysisView.value.analysis,
    };
    form.value.stats = resultAnalysisView.value.stats;
    form.value.recommendations = resultAnalysisView.value.recommendations;

    selectedPks.value = [
      resultAnalysisView.value.analysis.recommend_exercise_fk,
    ];
  } catch (err) {
    handleErrorToast(err.message);
  }
};

// 리포트 등록(reportRegister)
// 원포인트레슨 관리(onepointLesson)
// 추천 운동 등록(recommendActive)
// 완료(done)
const currentState = ref("reportRegister");
const lessonLabels = [
  "Address",
  "Back Swing",
  "Top Swing",
  "Down Swing",
  "Impact",
  "Follow Throw",
  "Finish",
];

const targetProgress = ref(30);
const animatedProgress = ref(0);
const totalAttempts = 10;
const currentAttempt = computed(() => {
  return Math.min(
    Math.round((animatedProgress.value / 100) * totalAttempts),
    totalAttempts,
  );
});

const leftClick = () => {
  currentState.value = "reportRegister";
};

const centerClick = () => {
  currentState.value = "onepointLesson";
};

const rightClick = () => {
  currentState.value = "recommendActive";
};

onMounted(() => {
  _resultAnalysisView(enroll_pk);
});

const handleSelectContent = (content) => {
  // 현재 열려있는 모달의 키값 (예: 'lesson1', 'coaching_result' 등)
  const targetKey = callbackValue.value;

  console.log(`[데이터 적용] ${content} 위치에 내용이 들어갑니다.`);

  // ✨ 형님, 여기서 form.analysis 안에 쏙 집어넣습니다!
  // form.analysis['lesson1'] = "내용..." 이런 식으로 동작합니다.
  if (form.value.analysis && targetKey) {
    form.value.analysis[targetKey] = content;
  }
};

// 현재 페이지 상태 (숫자)
const currentPage = ref(0);

// 초기값: URL param에서 가져오기
const initPage = Number(route.params.slug);
if (!isNaN(initPage)) currentPage.value = initPage;

// 페이지 변경 시 URL 업데이트 (양방향 동기화)
watch(currentPage, (page) => {
  if (page !== Number(route.params.slug)) {
    router.push({ name: route.name, params: { slug: page } });
  }
});

// URL param 변경 시 currentPage 업데이트
watch(
  () => route.params.slug,
  (slug) => {
    const page = Number(slug);
    if (!isNaN(page) && page !== currentPage.value) {
      currentPage.value = page;
    }
  },
);

const { width } = useWindowSize();
const isMobile = ref(false);

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/");
  }
};

const handleSubmit = async () => {
  if (!hasChecked.value) {
    if (process.client) {
      handleWarnToast("추천운동을 하나 이상 선택해주세요.");
    }
    return;
  }
  const payload = {
    enroll_pk,
    analysis: form.value.analysis,
    selected_pks: selectedPks.value,
  };

  try {
    const { message } = await coachingApi._analysiswrite(payload);
    handleToast(message);
  } catch (err) {
    handleErrorToast(err.message);
  }
};

watch(
  width,
  (newWidth) => {
    isMobile.value = newWidth <= 1024;
  },
  { immediate: true },
);

definePageMeta({
  layout: "sub-page",
});

useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  title: '최종 코칭 리포트',
  meta: [
    { name: 'description', content: '최종 코칭 리포트 페이지 입니다.' }
  ]
})
</script>
<style lang="scss" scoped>
@use "@/assets/scss/pages/final-report.scss";
</style>
