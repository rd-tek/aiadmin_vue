<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";

const props = defineProps({
  labels: { type: Array, default: () => [] },
  values1: { type: Array, default: () => [] },
  values2: { type: Array, default: () => [] },
  height: { type: String, default: "300px" },
  name1: { type: String, default: '데이터 1' },
  name2: { type: String, default: '데이터 2' },
});

const chartRef = ref(null);
let chart = null;
let resizeObserver = null;

const getOption = () => ({
  tooltip: { trigger: "axis" },
  grid: { top: "10px", left: "3%", right: "4%", bottom: "3%", containLabel: true },
  xAxis: {
    type: "category",
    data: props.labels,
    boundaryGap: false,
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: { color: "#A3AED0" },
  },
  yAxis: {
    minInterval: 1,
    min: 0,
    type: "value",
    axisLabel: { color: "#A3AED0" },
  },
  series: [
    ...((props.values1?.length) ? [{
      name: props.name1,
      type: "line",
      data: props.values1,
      smooth: true,
      symbol: "none",
      lineStyle: {
        color: "#4318FF", width: 4, cap: "round",
        shadowColor: "rgba(67, 24, 255, 0.4)", shadowBlur: 10, shadowOffsetY: 4,
      },
      itemStyle: { color: "#4318FF" },
    }] : []),
    ...((props.values2?.length) ? [{
      name: props.name2,
      type: "line",
      data: props.values2,
      smooth: true,
      symbol: "none",
      lineStyle: {
        color: "#6AD2FF", width: 4, cap: "round",
        shadowColor: "rgba(106, 210, 255, 0.3)", shadowBlur: 12, shadowOffsetY: 6,
      },
      itemStyle: { color: "#6AD2FF" },
    }] : []),
  ],
});

const initChart = async () => {
  await nextTick();
  if (!chartRef.value) return;
  chart = echarts.init(chartRef.value);
  chart.setOption(getOption());
  resizeObserver = new ResizeObserver(() => { chart?.resize(); });
  resizeObserver.observe(chartRef.value);
};

const updateChart = () => {
  if (!chart) return;
  chart.setOption(getOption());
  chart.resize();
};

const handleResize = () => {
  nextTick(() => { setTimeout(() => { chart?.resize(); }, 100); });
};

onMounted(() => {
  initChart();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  resizeObserver?.disconnect();
  chart?.dispose();
});

watch(
  () => [props.labels, props.values1, props.values2],
  () => { updateChart(); },
  { deep: true }
);
</script>

<style scoped>
.chart {
  width: 100%;
  height: v-bind(height);
}
</style>