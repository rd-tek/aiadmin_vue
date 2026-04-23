<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

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
  values3: {
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

const getOption = () => ({
  tooltip: {
    trigger: "axis",
  },
  grid: {
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
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      type: "bar",
      stack: "total",
      data: props.values1,
      barWidth: "40%",
      itemStyle: {
        color: "#4318FF",
      },
    },
    {
      type: "bar",
      stack: "total",
      data: props.values2,
      barWidth: "40%",
      itemStyle: {
        color: "#6AD2FF",
      },
    },
    {
      type: "bar",
      stack: "total",
      data: props.values3,
      barWidth: "40%",
      itemStyle: {
        color: "rgba(163, 174, 208, .3)",
        borderRadius: [6, 6, 0, 0],
      },
    },
  ],
});

const initChart = () => {
  if (!chartRef.value) return;
  chart = echarts.init(chartRef.value);
  chart.setOption(getOption());
};

const updateChart = () => {
  if (!chart) return;
  chart.setOption(getOption());
};

const handleResize = () => {
  chart?.resize();
};

onMounted(() => {
  initChart();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  chart?.dispose();
});

watch(
  () => [props.labels, props.values],
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