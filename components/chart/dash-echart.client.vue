<!-- 2026-10-13: 대시보드용 범용 ECharts 래퍼 (option 을 그대로 받아 그림, 크기 변화 자동 대응) -->
<template>
  <div ref="el" class="dash-echart" :style="{ height }"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import { attachEchartZoomFix } from "~/utils/echart-zoom-fix";

const props = defineProps({
  option: { type: Object, required: true },
  height: { type: String, default: "280px" },
});
const el = ref(null);
let chart = null;
let ro = null;
let detachZoomFix = null; // 2026-11-17: 화면 크기 배율(body zoom) 상태에서 범례·점 클릭 위치 보정

const render = () => {
  if (!chart) return;
  chart.setOption(props.option, true);
};

onMounted(async () => {
  await nextTick();
  chart = echarts.init(el.value);
  detachZoomFix = attachEchartZoomFix(el.value, () => chart);
  render();
  ro = new ResizeObserver(() => chart && chart.resize());
  ro.observe(el.value);
});
watch(() => props.option, render, { deep: true });
onBeforeUnmount(() => {
  ro?.disconnect();
  detachZoomFix?.();
  chart?.dispose();
  chart = null;
});
</script>

<style scoped>
.dash-echart { width: 100%; }
</style>
