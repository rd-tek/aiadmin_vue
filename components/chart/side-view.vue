<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup>
import * as echarts from "echarts";
import {
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from "vue";

const props = defineProps({
  labels: {
    type: Array,
    default: () => [],
  },

  values1: {
    type: Array,
    default: () => [],
  },

  values2: {
    type: Array,
    default: () => [],
  },

  height: {
    type: String,
    default: "300px",
  },
});

const chartRef = ref(null);

let chart = null;
let resizeObserver = null;

// 옵션 생성
const getOption = () => ({
  tooltip: {
    trigger: "axis",
  },

  grid: {
    top: "15px",
    left: "15px",
    right: "15px",
    bottom: "15px",
    containLabel: true,
  },

  xAxis: {
    type: "category",
    data: props.labels,
    boundaryGap: false,

    axisTick: {
      show: false,
    },

    axisLine: {
      show: false,
    },

    axisLabel: {
      color: "#A3AED0",
    },
  },

  yAxis: {
    type: "value",

    axisLabel: {
      color: "#A3AED0",
    },
  },

  series: [
    {
      name: "데이터 1",
      type: "line",
      data: props.values1,
      smooth: true,
      symbol: "none",

      lineStyle: {
        color: "#FCAA0B",
        width: 4,
        cap: "round",
        shadowColor: "rgba(252, 170, 11, 0.4)",
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 4,
      },
    },

    {
      name: "데이터 2",
      type: "line",
      data: props.values2,
      smooth: true,
      symbol: "none",

      lineStyle: {
        color: "#FCAA0B",
        width: 4,
        cap: "round",
        shadowColor: "rgba(252, 170, 11, 0.3)",
        shadowBlur: 12,
        shadowOffsetY: 6,
      },
    },
  ],
});

// 초기화
const initChart = async () => {
  await nextTick();

  if (!chartRef.value) return;

  chart = echarts.init(chartRef.value);

  chart.setOption(getOption());

  // 브라우저 resize
  window.addEventListener("resize", handleResize);

  // 부모 요소 크기 변경 감지
  resizeObserver = new ResizeObserver(() => {
    chart?.resize();
  });

  resizeObserver.observe(chartRef.value);
};

// 업데이트
const updateChart = () => {
  if (!chart) return;

  chart.setOption(getOption());

  // 데이터 변경 후 resize
  chart.resize();
};

// resize
const handleResize = () => {
  chart?.resize();
};

onMounted(() => {
  initChart();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);

  resizeObserver?.disconnect();

  chart?.dispose();
});

// 데이터 변경 감지
watch(
  () => [props.labels, props.values1, props.values2],
  () => {
    updateChart();
  },
  { deep: true }
);
</script>

<style scoped>
.chart {
  width: 100%;
  height: v-bind(height);
}
</style>