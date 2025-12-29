<template>
  <div class="dashboard">
    <div class="dashboard-wrap">
      <div class="content">
        <div class="content-section">
          <div class="top-area">
            <h2 class="title">요약 정보</h2>
          </div>
          <div class="cont">
            <div class="cont-box">
              <div class="cont-box-list color-purple">
                <div class="tit">이달의 영상 현황</div>
                <div class="desc">
                  <span class="text">전월대비</span>
                  <span class="num">
                    {{
                      formatChange(mainData.summary.fit_video?.change_percent)
                    }}
                  </span>
                  <i class="icon">
                    {{ changeIcon(mainData.summary.fit_video?.change_percent) }}
                  </i>
                </div>
                <div class="num">
                  <span class="count">
                    {{ mainData.summary.fit_video?.current_month_count || 0 }}
                  </span>
                </div>
              </div>
              <div class="cont-box-list color-blue">
                <div class="tit">이달의 수료 현황</div>
                <div class="desc">
                  <span class="text">전월대비</span>
                  <span class="num">
                    {{
                      formatChange(
                        mainData.summary.class_complete?.change_percent,
                      )
                    }}
                  </span>
                  <i class="icon">
                    {{
                      changeIcon(
                        mainData.summary.class_complete?.change_percent,
                      )
                    }}
                  </i>
                </div>
                <div class="num">
                  <span class="count">
                    {{
                      mainData.summary.class_complete?.current_month_count || 0
                    }}
                  </span>
                </div>
              </div>
              <div class="cont-box-list">
                <div class="tit">이달의 문의 현황</div>
                <ul class="info">
                  <li class="info-list">
                    <div class="tit">답변진행</div>
                    <div class="num">{{ qnaInProgress }}</div>
                  </li>
                  <li class="info-list">
                    <div class="tit">답변완료</div>
                    <div class="num">{{ qnaDone }}</div>
                  </li>
                </ul>
              </div>
              <div class="cont-box-list">
                <div class="tit">이달의 코칭 현황</div>
                <ul class="info">
                  <li class="info-list">
                    <div class="tit">코칭진행</div>
                    <div class="num">{{ coachingProgress }}</div>
                  </li>
                  <li class="info-list">
                    <div class="tit">코칭완료</div>
                    <div class="num">{{ coachingDone }}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="content-section">
          <div class="top-area">
            <h2 class="title">주간 베스트 아카데미</h2>
            <nuxt-link to="/academy" class="btn-all">
              <span class="text">전체보기</span>
              <img
                src="/images/icon/icon_chevron_right_grey.png"
                alt="icon_chevron_right_grey"
              />
            </nuxt-link>
          </div>
          <div class="cont">
            <div class="cont-item">
              <nuxt-link
                :to="{ path: `/academy/${item.academy_pk}` }"
                class="cont-item-list"
                :class="{ 'is-move': academyMove }"
                ref="academyRef"
                v-for="(item, index) in mainData.list"
                :key="index"
              >
                <div
                  class="img-area"
                  v-if="item.thumbnail"
                >
                  <div class="img-area-inner" :style="{
                    backgroundImage: `url(${common.getImg(item.thumbnail)})`,
                  }"></div>
                  <div class="num">{{ item.no }}</div>
                </div>
                <div class="img-area" v-else>
                  <div class="img-area-inner" :class="{ 'no-image': item.thumbnail === '' }"></div>
                  <div class="num">{{ item.no }}</div>
                </div>

                <div class="cont-item-info">
                  <div class="title">
                    {{ item.title }}
                  </div>
                  <div class="info">
                    <div class="info-list">
                      <span class="tit">코칭진행</span>
                      <span class="num">{{
                        common.suffix(item.totalEnroll, "건")
                      }}</span>
                    </div>
                    <div class="info-list">
                      <span class="tit">코칭완료</span>
                      <span class="num"
                        >{{ common.suffix(item.completedEnroll, "건") }}
                      </span>
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useMainApi } from "~/api/main";
import { useRouteQuery } from "@vueuse/router";
import { useCommon } from "~/utils/common";
import { useElementVisibility } from "@vueuse/core";
import { useHead } from "#app";

const router = useRouter();

const common = useCommon();
const mainApi = useMainApi();
const pagenoRef = useRouteQuery("pageno", 1); // 원본 Ref
const searchData = reactive({
  pageno: computed({
    get: () => Number(pagenoRef.value) || 1,
    set: (v) => {
      pagenoRef.value = v;
    },
  }),

  searchtype: useRouteQuery("searchtype", "c.content"),
  searchname: useRouteQuery("searchname", ""),
});

const academyRef = ref();
const academyMove = ref(false);
const isVisibleAcademy = useElementVisibility(academyRef);
watch(
  () => isVisibleAcademy.value,
  () => {
    academyMove.value = true;
  },
);

onMounted(() => {
  academyMove.value = true;
});

definePageMeta({
  layout: "default",
  name: "대시보드",
});

const _main = async () => {
  try {
    const res = await mainApi._main(searchData);

    mainData.value.list = res.list;

    mainData.value.summary = {
      fit_video: res.fit_video,
      class_complete: res.class_complete,
      enroll: res.enroll,
      qna: res.qna,
    };
  } catch (err) {
    alert(err.message);
  }
};

const mainData = ref({
  list: null,
  summary: {
    fit_video: null,
    class_complete: null,
    enroll: null,
    qna: null,
  },
});

// 전월대비 퍼센트 + / - 표시용
const formatChange = (val) => {
  if (val === null || val === undefined) return "0%";
  const n = Number(val) || 0;
  const sign = n > 0 ? "+" : n < 0 ? "-" : "";
  // 백엔드가 소수 1자리라 그냥 그대로 써도 되고, toFixed(1) 써도 됨
  return `${sign}${Math.abs(n)}%`;
};

const changeIcon = (val) => {
  if (val === null || val === undefined) return "";
  const n = Number(val) || 0;
  if (n > 0) return "▲";
  if (n < 0) return "▼";
  return ""; // 0이면 화살표 없음
};

// 문의/코칭 진행·완료 계산용
const qnaInProgress = computed(() => {
  const q = mainData.value.summary.qna;
  if (!q) return 0;
  return q.question_count || 0;
});

const qnaDone = computed(() => {
  const q = mainData.value.summary.qna;
  return q ? q.answer_count || 0 : 0;
});

const coachingProgress = computed(() => {
  const e = mainData.value.summary.enroll;
  if (!e) return 0;
  return e.total_count || 0;
  const done = e.completed_status_1 || 0; // status=1 을 완료로 보고 있음
  return Math.max(0, total - done);
});

const coachingDone = computed(() => {
  const e = mainData.value.summary.enroll;
  return e ? e.completed_status_1 || 0 : 0;
});

onMounted(async () => {
  await _main();
});

useHead({
  htmlAttrs: {
    lang: "ko",
  },
  title: "대시보드",
  meta: [{ name: "description", content: "대시보드 페이지 입니다." }],
});
</script>
<style lang="scss" scoped>
@use "@/assets/scss/pages/index.scss";
</style>
