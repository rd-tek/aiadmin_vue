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
let resizeObserver = null;

// 옵션
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

    splitLine: {
      lineStyle: {
        color: "rgba(163, 174, 208, 0.2)",
      },
    },
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

// 초기화
const initChart = async () => {
  await nextTick();

  if (!chartRef.value) return;

  chart = echarts.init(chartRef.value);

  chart.setOption(getOption());

  // 부모 크기 감지
  resizeObserver = new ResizeObserver(() => {
    chart?.resize({
      animation: {
        duration: 300,
      },
    });
  });

  resizeObserver.observe(chartRef.value);
};

// 업데이트
const updateChart = () => {
  if (!chart) return;

  chart.setOption(getOption());

  chart.resize();
};

// window resize
const handleResize = () => {
  nextTick(() => {
    setTimeout(() => {
      chart?.resize();
    }, 100);
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

// 데이터 변경 감지
watch(
  () => [
    props.labels,
    props.values1,
    props.values2,
    props.values3,
  ],
  () => {
    updateChart();
  },
  {
    deep: true,
  }
);
</script>

<style scoped>
.chart {
  width: 100%;
  height: v-bind(height);
  min-height: 200px;
}
</style>