<template>
  <div ref="chartRef" class="bar-chart"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

const props = defineProps({
  labels: {
    type: Array,
    default: () => [],
  },
  // [{ name: "완료", data: [...] }, { name: "진행중", data: [...] }]
  series: {
    type: Array,
    default: () => [],
  },
});

const chartRef = ref(null);
let chartInstance = null;

const buildOption = () => {
  const labels = props.labels || [];
  const rawSeries = props.series || [];

  // ✅ 시리즈에서 완료 / 진행중 찾아서 순서 강제 (왼쪽: 진행중, 오른쪽: 완료)
  const inProgress = rawSeries.find((s) => s.name === "진행중");
  const completed = rawSeries.find((s) => s.name === "완료");

  const seriesList = [];

  if (inProgress) {
    seriesList.push({
      name: inProgress.name,
      type: "bar",
      barWidth: "30%",
      barGap: "0%",
      data: inProgress.data || [],
      itemStyle: {
        color: "#FFA5CB",
      },
    });
  }

  if (completed) {
    seriesList.push({
      name: completed.name,
      type: "bar",
      barWidth: "30%",
      barGap: "0%",
      data: completed.data || [],
      itemStyle: {
        color: "#7987FF",
      },
    });
  }

  // ✅ y축 최대값/interval 자동 계산
  const allVals = [...(inProgress?.data || []), ...(completed?.data || [])].map(
    (v) => Number(v) || 0,
  );
  const maxVal = allVals.length ? Math.max(...allVals) : 0;
  let maxY = 5;
  if (maxVal > 0) {
    const base = Math.pow(10, String(maxVal).length - 1); // 1, 10, 100 ...
    maxY = Math.ceil(maxVal / base) * base;
  }
  const interval = maxY / 3;

  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      icon: "circle",
      orient: "horizontal",
      left: "left",
      bottom: 0,
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 20,
      borderRadius: 8,
      inactiveColor: "#ccc",
      textStyle: {
        color: "#333",
        fontSize: 12,
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
      axisTick: {
        alignWithLabel: true,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "solid",
          color: "#F1F1F1",
        },
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#F1F1F1', // y축 라인 색상
          width: 1,
          type: 'solid'
        }
      },
      axisLabel: {
        color: "#030229",
        fontSize: 11,
        margin: 15,
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: true,
        lineStyle: {
          color: "#F1F1F1",
          width: 1,
          type: "solid",
        },
      },
      axisLabel: {
        show: true,
        color: "#000",
        fontSize: 11,
        margin: 15,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#F1F1F1",
          type: "solid",
        },
      },
    },
    series: seriesList,
  };
};

const handleResize = () => {
  chartInstance?.resize();
};

const initChart = () => {
  if (!chartRef.value) return;

  chartInstance = echarts.init(chartRef.value);
  chartInstance.setOption(buildOption());
  window.addEventListener("resize", handleResize);
};

onMounted(() => {
  initChart();
});

// labels/series 바뀔 때마다 옵션 갱신
watch(
  () => [props.labels, props.series],
  () => {
    if (!chartInstance) return;
    chartInstance.setOption(buildOption(), true);
  },
  { deep: true },
);

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  chartInstance?.dispose();
});
</script>

<style scoped>
.bar-chart {
  width: 100%;
  height: 400px;
}
</style>
