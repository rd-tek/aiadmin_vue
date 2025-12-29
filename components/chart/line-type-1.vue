<template>
  <div ref="chartRef" class="line-chart"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref, onBeforeUnmount, watch, nextTick } from "vue";

const props = defineProps({
  labels: { type: Array, default: () => [] },
  series: { type: Array, default: () => [] },
});

const chartRef = ref(null);
let chartInstance;

const buildOption = () => {
  const hasData = props.labels.length && props.series.length;

  return {
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        if (!params || !params.length) return "";
        const axisLabel = params[0].axisValueLabel;

        const lines = params
          .map((p) => {
            return `
              <span style="display:inline-block;width:8px;height:8px;border-radius:10px;background:${p.color};margin-right:4px;"></span>
              ${p.seriesName}: ${p.data}
            `;
          })
          .join("<br/>");

        return `
          <div style="text-align:left;">
            <strong>${axisLabel}</strong><br/>
            ${lines}
          </div>
        `;
      },
    },

    legend: {
      orient: "horizontal",
      left: 0,
      bottom: 0,
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 20,
      inactiveColor: "#ccc",
      textStyle: { color: "#333", fontSize: 12 },
    },

    grid: {
      left: 0,
      right: 0,
      top: 10,
      bottom: 60,
      containLabel: true,
    },

    xAxis: {
      type: "category",
      data: hasData ? props.labels : [],
      splitLine: { show: true, lineStyle: { type: "solid", color: "#F1F1F1" } },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#030229", fontSize: 11, margin: 15 },
    },

    yAxis: {
      type: "value",
      axisLine: { show: true, lineStyle: { color: "#F1F1F1", width: 1, type: "solid" } },
      axisLabel: { show: true, color: "#000", fontSize: 11, margin: 15 },
    },

    series: hasData
      ? props.series.map((s, index) => {
          // ✅ 마지막 "#2BBr"가 잘못된 값이라 수정
          const defaultColors = ["#FF7373", "#E697FF", "#FFA5CB", "#7987FF", "#2BBBFF"];
          const color = s.color || defaultColors[index % defaultColors.length];

          return {
            name: s.name,
            type: "line",
            symbol: "circle",
            symbolSize: 13,
            data: s.data || [],
            smooth: true,
            lineStyle: { width: 1, color },
            itemStyle: { color, borderColor: color, borderWidth: 3 },
          };
        })
      : [],

    media: [
      {
        query: { maxWidth: 768 },
        option: {
          series: (hasData ? props.series : []).map(() => ({ symbolSize: 5 })),
          grid: { bottom: 90, containLabel: false },
        },
      },
    ],

    dataZoom: [{ type: "inside", zoomOnMouseWheel: false }],
  };
};

const initChart = async () => {
  if (!chartRef.value) return;

  // 이미 있으면 dispose 후 재생성 (레이아웃 이슈 방지)
  if (chartInstance) chartInstance.dispose();

  chartInstance = echarts.init(chartRef.value, null, {
    renderer: "canvas",
    useDirtyRect: false,
  });

  chartInstance.setOption(buildOption());

  // ✅ 부모 레이아웃 확정 후 리사이즈(특히 height:100%일 때 중요)
  await nextTick();
  requestAnimationFrame(() => chartInstance && chartInstance.resize());

  const chartDom = chartRef.value;
  if (chartDom) {
    chartDom.addEventListener(
      "wheel",
      (e) => e.preventDefault(),
      { passive: false },
    );
    chartDom.addEventListener(
      "mousewheel",
      (e) => e.preventDefault(),
      { passive: false },
    );
  }
};

const updateChart = () => {
  if (!chartInstance) return;
  chartInstance.setOption(buildOption(), true);
  requestAnimationFrame(() => chartInstance && chartInstance.resize());
};

const resizeChart = () => chartInstance && chartInstance.resize();

onMounted(() => {
  initChart();
  if (typeof window !== "undefined") window.addEventListener("resize", resizeChart);
});

watch(
  () => [props.labels, props.series],
  () => updateChart(),
  { deep: true },
);

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.dispose();
  if (typeof window !== "undefined") window.removeEventListener("resize", resizeChart);
});
</script>

<style scoped>
.line-chart {
  width: 100%;
  height: 100%;      /* ✅ 유지 */
  min-height: 300px; /* ✅ 부모 높이가 0이어도 보이게 하는 핵심 */
}
</style>