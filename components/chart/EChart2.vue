<template>
  <div class="line-chart" ref="chartRef"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  // "{y,x,z}, {y,x,z}, ..." 문자열 또는
  // [[y,x,z], ...] / [{y,x,z}, ...] 형태의 배열도 허용
  raw: { type: [String, Array], required: true }
})

const chartRef = ref(null)
let chartInstance = null

/* -------------------- 파싱/정규화 -------------------- */
const normalizePoints = (input) => {
  if (Array.isArray(input)) {
    return input.map(v => {
      if (Array.isArray(v) && v.length >= 3) return { y: +v[0], x: +v[1], z: +v[2] }
      if (v && typeof v === 'object' && 'y' in v && 'x' in v && 'z' in v) {
        return { y: +v.y, x: +v.x, z: +v.z }
      }
      return null
    }).filter(Boolean)
  }
  const s = String(input)
  const blocks = s.match(/\{[^}]*\}/g) || []
  return blocks
    .map(b => b.replace(/[{}]/g, '').split(',').map(v => Number(v.trim())))
    .filter(arr => arr.length === 3 && arr.every(n => !Number.isNaN(n)))
    .map(([y, x, z]) => ({ y, x, z }))
}

const dropZeroTriples = (arr) =>
  arr.filter(p => !(p.y === 0 && p.x === 0 && p.z === 0))

/* -------------------- 렌더링 -------------------- */
const buildOption = (pairs = []) => {
  const xs = pairs.map(p => p?.[0]).filter(v => Number.isFinite(v));
  const ys = pairs.map(p => p?.[1]).filter(v => Number.isFinite(v));

  const xMin = xs.length ? Math.min(...xs) : 0;
  const xMax = xs.length ? Math.max(...xs) : 0;
  const yAbsMax = ys.length
    ? Math.max(Math.abs(Math.min(...ys)), Math.abs(Math.max(...ys)))
    : 1;

  return {
    title: { text: '', left: 0, top: 0 },
    // ✅ 여백 최소화 (왼쪽/오른쪽 줄임)
    grid: { left: 0, right: 20, top: 20, bottom: 10, containLabel: true },
    xAxis: {
      type: 'value',
      min: xMin,
      max: xMax,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        show: true,
        showMinLabel: false, // 최소값 숨기기
        showMaxLabel: false, // 최대값 숨기기
        color: '#030229',
        fontSize: 12,
        margin: 6, // ✅ 라벨 여백도 조금 줄이기
        fontFamily: 'Nunito',
        opacity: 0.7,
        formatter: (val) => `${(val).toFixed(0)}m`, 
      },
      splitLine: { show: true, lineStyle: { type: 'dashed', color: '#DFE5EE' } },
    },
    yAxis: {
      type: 'value',
      min: -yAbsMax,
      max: yAbsMax,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        show: true,
        showMinLabel: false, // 최소값 숨기기
        showMaxLabel: false, // 최대값 숨기기
        color: '#030229',
        fontSize: 12,
        margin: 6, // ✅ 여백 줄이기
        fontFamily: 'Nunito',
        opacity: 0.7,
        formatter: (val) => `${(val).toFixed(0)}m`, 
      },
      splitLine: { show: true, lineStyle: { type: 'dashed', color: '#DFE5EE' } },
    },
    series: [
      {
        name: '점수',
        type: 'line',
        symbol: 'none',
        itemStyle: { color: '#fff', borderColor: '#EDA10D', borderWidth: 3 },
        smooth: false,
        data: pairs,
        lineStyle: { color: '#FCAA0B', width: 5 },
      },
    ],
    dataZoom: [{ type: 'inside', zoomOnMouseWheel: false }],
  };
};

const renderChart = () => {
  if (!chartRef.value) return
  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value, null, { renderer: 'canvas', useDirtyRect: false })
  }

  const points = dropZeroTriples(normalizePoints(props.raw))
  const pairs = points.map(p => [p.z, p.y]) // x=z, y=y

  chartInstance.setOption(buildOption(pairs), true)

  // 차트 영역에서의 기본 스크롤 방지 (옵션 유지 의도)
  const dom = chartRef.value
  dom.addEventListener('wheel', (e) => e.preventDefault(), { passive: false })
  dom.addEventListener('mousewheel', (e) => e.preventDefault(), { passive: false })
}

const resize = () => { chartInstance && chartInstance.resize() }

onMounted(() => {
  renderChart()
  window.addEventListener('resize', resize)
})

watch(() => props.raw, () => {
  renderChart()
}, { deep: true })

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})
</script>
<style lang="scss" scoped>
.line-chart {
  width: 100%;
  height: 100%;
}
</style>