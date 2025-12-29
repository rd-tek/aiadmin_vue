
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

/* -------------------- 옵션 빌드 (기존 스타일 최대 유지) -------------------- */
const buildOption = (pairs /* [[z,x], ...] */) => ({
  title: { text: '', left: 0, top: 0 },
  // tooltip: {
  //   trigger: 'axis',
  //   formatter(params) {
  //     const d = params?.[0];
  //     if (!d) return '';
  //     const [z, x] = d.value;
  //     return `
  //       <div style="text-align:left;">
  //         <strong>z: ${z}</strong><br/>
  //         ${(x * 100).toFixed(2)}%
  //       </div>
  //     `;
  //   },
  //   confine: true,
  // },
  grid: { left: 5, right: 20, top: 20, bottom: 0, containLabel: true },

  xAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      show: true,
      color: '#030229',
      fontSize: 14,
      margin: 15,
      fontFamily: 'Nunito',
      opacity: 0.7,
      formatter: (val) => `${(val ).toFixed(0)}m`, // 
    },
    splitLine: { show: true, lineStyle: { type: 'dashed', color: '#DFE5EE' } },
  },

  yAxis: {
    type: 'value',
    min: 0,
    axisLabel: {
      show: true,
      color: '#030229',
      fontSize: 14,
      margin: 15,
      fontFamily: 'Nunito',
      opacity: 0.7,
      formatter: (val) => `${(val).toFixed(0)}m`, // ✅ y값을 *100 후 m로 표시
    },
    axisTick: { show: false },
    axisLine: { show: false },
    splitLine: { show: true, lineStyle: { type: 'dashed', color: '#DFE5EE' } },
  },

  series: [
    {
      name: '점수',
      type: 'line',
      symbol: 'none',
      symbolSize: 14,
      itemStyle: { color: '#fff', borderColor: '#AE8FF7', borderWidth: 3 },
      smooth: true,
      data: pairs,
      lineStyle: { color: '#16DBCC', width: 5 },
    },
  ],

  dataZoom: [{ type: 'inside', zoomOnMouseWheel: false }],
});

/* -------------------- 렌더링 -------------------- */
const renderChart = () => {
  if (!chartRef.value) return
  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value, null, { renderer: 'canvas', useDirtyRect: false })
  }

  const points = dropZeroTriples(normalizePoints(props.raw))
  const pairs = points.map(p => [p.z, p.x]) // x축=z, y축=x

  chartInstance.setOption(buildOption(pairs), true)

  // 차트 영역에서의 기본 스크롤 방지 (기존 dataZoom 설정을 존중)
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