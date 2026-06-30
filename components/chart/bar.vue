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
  labels: { type: Array, default: () => [] },
  values1: { type: Array, default: () => [] },
  values2: { type: Array, default: () => [] },
  values3: { type: Array, default: () => [] },
  height: { type: String, default: "300px" },
  name1: { type: String, default: '데이터 1' },
  name2: { type: String, default: '데이터 2' },
  name3: { type: String, default: '데이터 3' },
});

const chartRef = ref(null);

let chart = null;
let resizeObserver = null;

const getOption = () => ({
  tooltip: {
    trigger: "axis",
  },

  grid: {
    top: "10px",
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },

  xAxis: {
    type: "category",
    data: props.labels,
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: { color: "#A3AED0" },
  },

  yAxis: {
    minInterval: 1,
    min: 0,
    type: "value",
    axisLabel: { color: "#A3AED0" },
    splitLine: {
      lineStyle: { color: "rgba(163, 174, 208, 0.2)" },
    },
  },

  series: [
    ...((props.values1?.length) ? [{
      name: props.name1,
      type: "bar",
      stack: "total",
      data: props.values1,
      barWidth: "40%",
      itemStyle: { color: "#4318FF" },
    }] : []),

    ...((props.values2?.length) ? [{
      name: props.name2,
      type: "bar",
      stack: "total",
      data: props.values2,
      barWidth: "40%",
      itemStyle: { color: "#6AD2FF" },
    }] : []),

    ...((props.values3?.length) ? [{
      name: props.name3,
      type: "bar",
      stack: "total",
      data: props.values3,
      barWidth: "40%",
      itemStyle: {
        color: "rgba(163, 174, 208, .3)",
        borderRadius: [6, 6, 0, 0],
      },
    }] : []),
  ],
});

const initChart = async () => {
  await nextTick();
  if (!chartRef.value) return;
  chart = echarts.init(chartRef.value);
  chart.setOption(getOption());
  resizeObserver = new ResizeObserver(() => {
    chart?.resize({ animation: { duration: 300 } });
  });
  resizeObserver.observe(chartRef.value);
};

const updateChart = () => {
  if (!chart) return;
  chart.setOption(getOption());
  chart.resize();
};

const handleResize = () => {
  nextTick(() => {
    setTimeout(() => { chart?.resize(); }, 100);
  });
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
  () => [props.labels, props.values1, props.values2, props.values3],
  () => { updateChart(); },
  { deep: true }
);
</script>

<style scoped>
.chart {
  width: 100%;
  height: v-bind(height);
  min-height: 200px;
}
</style>