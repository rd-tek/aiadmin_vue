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
  // [{ name:'진행중', data:[...] }, { name:'완료', data:[...] }]
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

  const hasData = labels.length && rawSeries.length;

  // 스택 막대 시, 각 구간별 합계로 y축 max 참고하고 싶으면 여기서 계산 가능
  // 지금은 min:0만 주고 나머지는 ECharts에 맡김
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      icon: "circle",
      orient: "horizontal", // 가로 정렬
      left: "left", // 왼쪽 정렬
      bottom: 0, // 차트 아래쪽에 붙이기
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
      bottom: 50,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: hasData ? labels : [],
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
          color: "#F1F1F1",
          width: 1,
          type: "solid",
        },
      },
      axisLabel: {
        color: "#030229",
        fontSize: 11,
        margin: 15,
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      // max / interval 은 자동으로, 필요하면 나중에 추가
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
    series: hasData
      ? rawSeries.map((s, index) => {
          const defaultColors = ["#FF7373", "#E697FF", "#FFA5CB", "#7987FF", "#2BBr"];
          const color = s.color || defaultColors[index % defaultColors.length];

          return {
            name: s.name,
            type: "bar",
            stack: "total", // ✅ 스택 막대
            barWidth: "30%",
            barGap: "0%",
            barCategoryGap: "30%",
            data: s.data || [],
            itemStyle: {
              color
            }
          }
        })
      : [],
  };
};

const initChart = () => {
  if (!chartRef.value) return;

  chartInstance = echarts.init(chartRef.value);
  chartInstance.setOption(buildOption());
};

const updateChart = () => {
  if (!chartInstance) return;
  chartInstance.setOption(buildOption(), true);
};

const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};

onMounted(() => {
  initChart();
  window.addEventListener("resize", handleResize);
});

// labels / series 변경 시 갱신
watch(
  () => [props.labels, props.series],
  () => {
    updateChart();
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
