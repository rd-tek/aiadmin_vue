<template>
  <div>
    <!-- 데이터 편집 UI -->
    <div class="editor">
      <div v-for="(val, i) in dataValues" :key="i" class="editor-item">
        <label>{{ indicators[i].name }}</label>
        <select v-model.number="dataValues[i]">
          <option disabled value="">선택</option>
          <option v-for="opt in options" :key="opt" :value="opt">
            {{ opt }}
          </option>
        </select>
      </div>
    </div>

    <!-- 차트 -->
    <div class="chart-wrap">
      <div ref="chartRef" class="chart-box" />
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, watch, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  analysis: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:analysis"]);

const chartRef = ref(null);
let chart = null;

const toNum = (v) => {
  if (v == null || v === "" || v === 0) return 1;
  const n = Number(v);
  return Number.isNaN(n) ? 1 : n;
};

// 거리 → 방향성 → 정확도 → 자세 → 임팩트
const getValues = (a = {}) => [
  toNum(a.grade_distance),
  toNum(a.grade_direction),
  toNum(a.grade_accuracy),
  toNum(a.grade_position),
  toNum(a.grade_impact),
];

// 🟢 Radar indicator 정의
const indicators = ref([
  { name: "거리", max: 5 },
  { name: "방향성", max: 5 },
  { name: "정확도", max: 5 },
  { name: "자세", max: 5 },
  { name: "임팩트", max: 5 },
]);

// 🟢 데이터 (수정 가능)
const dataValues = ref([1, 1, 1, 1, 1]);

// 🟢 select 옵션 (공통)
const options = [1, 2, 3, 4, 5];

// 🟢 차트 옵션 생성 함수
const getOption = () => ({
  tooltip: {},
  radar: {
    axisName: { color: "#696D6E", fontSize: 12, fontWeight: "500" },
    alignTicks: false,
    indicator: indicators.value,
    axisLine: { lineStyle: { color: "#E4EAF0", width: 1, type: "dashed" } },
    splitLine: { lineStyle: { color: ["#E4EAF0"], width: 1, type: "dashed" } },
    splitArea: { show: true, areaStyle: { color: ["#fff", "#fff"] } },
  },
  series: [
    {
      type: "radar",
      lineStyle: { color: "#28B5E1", width: 4 },
      areaStyle: { color: "rgba(40, 181, 225, 0.1)" },
      symbol: "none",
      data: [{ value: dataValues.value }],
    },
  ],
});

// 🔹 props.analysis → dataValues 동기화 (부모에서 값 내려줄 때)

watch(
  () => props.analysis,
  (val) => {
    dataValues.value = getValues(val || {});
  },
  { immediate: true, deep: true },
);

const initChart = () => {
  if (!chartRef.value) return;

  const el = chartRef.value;
  const { clientWidth, clientHeight } = el;

  // width/height가 0이면 잠깐 뒤에 다시 시도
  if (!clientWidth || !clientHeight) {
    setTimeout(initChart, 100);
    return;
  }

  // 이미 chart 있으면 재사용
  if (!chart) {
    chart = echarts.init(el, null, { renderer: "canvas" });
  }

  chart.setOption(getOption());
};

const resizeChart = () => {
  if (chart) {
    chart.resize();
  }
};

onMounted(async () => {
  await nextTick(); // DOM 렌더 끝난 뒤에
  initChart(); // 여기서만 init
  window.addEventListener("resize", resizeChart);
});

onBeforeUnmount(() => {
  if (chart) {
    chart.dispose();
    chart = null;
  }
  window.removeEventListener("resize", resizeChart);
});

// 🟢 데이터 변경 시: 차트 갱신 + 부모로 v-model emit (무한 루프 방지 포함)

watch(
  dataValues,
  (vals) => {
    // 🔥 1) max 자동 조정 부분은 제거
    // indicators.value = indicators.value.map((ind, i) => ({
    //   ...ind,
    //   max: Math.max(ind.max, vals[i]) * 1.1
    // }))

    // 2) 차트 갱신만
    if (chart) {
      chart.setOption({
        radar: { indicator: indicators.value }, // max:5 그대로 사용
        series: [{ data: [{ value: vals }] }],
      });
    }

    // 3) emit 부분은 그대로
    const [
      grade_distance,
      grade_direction,
      grade_accuracy,
      grade_position,
      grade_impact,
    ] = vals;

    const fromProps = getValues(props.analysis || {});
    const isSame =
      vals.length === fromProps.length &&
      vals.every((v, i) => v === fromProps[i]);

    if (!isSame) {
      emit("update:analysis", {
        ...(props.analysis || {}),
        grade_distance,
        grade_direction,
        grade_accuracy,
        grade_position,
        grade_impact,
      });
    }
  },
  { deep: true },
);
</script>
<style scoped>
.editor {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.editor-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.editor-item label {
  font-size: 12px;
  margin-bottom: 4px;
}
.editor-item select {
  width: 100px;
  padding: 4px;
}

.chart-wrap {
  width: 100%;
  height: 50vw;
  max-height: 400px;
}

.chart-box {
  width: 100%;
  height: 100%;
}
</style>
