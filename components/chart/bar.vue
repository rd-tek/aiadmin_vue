<template>
  <div ref="chartRef" class="bar-chart"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted, onBeforeUnmount, watch, defineProps, nextTick } from "vue";

// 1. 부모로부터 받을 Props 정의
const props = defineProps({
  labels: {
    type: Array,
    default: () => [], // ['2021', '2022'...]
  },
  values: {
    type: Array,
    default: () => [], // [10, 20...]
  },
});

const chartRef = ref(null);
let chartInstance = null;
const getOptions = (labels, values) => {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    legend: {
      icon: "circle",
      orient: 'horizontal',
      left: 'left',
      bottom: 0,
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 20,
      borderRadius: 8,
      inactiveColor: '#ccc',
      textStyle: {
        color: '#333',
        fontSize: 12
      },
    },
    grid: {
      left: 0,
      right: 1,
      top: 10,
      bottom: 60,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: labels,
      axisTick: { alignWithLabel: true },
      splitLine: {
        show: true,
        lineStyle: { type: "solid", color: "#F1F1F1" },
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#F1F1F1',
          width: 1,
          type: 'solid'
        }
      },
      axisLabel: { color: "#030229", fontSize: 11, margin: 15 },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: true,
        lineStyle: { color: "#F1F1F1", width: 1, type: "solid" },
      },
      axisLabel: {
        show: true,
        color: "#000",
        fontSize: 11,
        margin: 15,
      },
    },
    series: [
      {
        name: "실적",
        type: "bar",
        barWidth: "30%",
        data: values,
        itemStyle: {
          color: '#7987FF'
        }
      },
    ],
  };
};

watch(
  [() => props.labels, () => props.values],
  () => {
    if (!chartInstance) return;
    chartInstance.setOption(getOptions(props.labels, props.values), { notMerge: true });
  },
  { deep: true, immediate: true }
);

const initChart = async () => {
  await nextTick();
  if (!chartRef.value) return;

  chartInstance = echarts.init(chartRef.value);
  chartInstance.setOption(getOptions(props.labels, props.values));

  resizeHandler = () => {
    chartInstance?.resize();
  };
  window.addEventListener("resize", resizeHandler);
};

onMounted(() => {
  initChart();
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
  window.removeEventListener("resize", () => {
    chartInstance?.resize();
  });
});
</script>

<style scoped>
.bar-chart {
  width: 100%;
  height: 400px;
}
</style>