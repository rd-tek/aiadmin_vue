<template>
  <div style="width: 100%; height: 400px">
    <div ref="chartRef" style="width: 100%; height: 100%" />
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, onBeforeUnmount, watch, ref } from 'vue'

const props = defineProps({
  analysis: {
    type: Object,
    default: () => ({})
  }
})

const chartRef = ref(null)
let chart = null

const toNum = (v) => Number(v) || 0

// 거리 → 방향성 → 정확도 → 자세 → 임팩트
const getValues = (a) => [
  toNum(a?.grade_distance),
  toNum(a?.grade_direction),
  toNum(a?.grade_accuracy),
  toNum(a?.grade_position),
  toNum(a?.grade_impact)
]

const renderChart = () => {
  if (!chart) return

  const option = {
    tooltip: {},
    legend: { show: false },
    radar: {
      radius: '70%', // 반지름을 줄이면 라벨 공간 확보
      axisNameGap: 8, // 축과 라벨 사이 거리
      axisName: {
        color: '#696D6E',
        fontSize: 12,
        fontWeight: '500',
        padding: [-3, -3], // 라벨 안쪽 여백
      },
      alignTicks: false,
      indicator: [
        { name: '거리', max: 5 },
        { name: '방향성', max: 5 },
        { name: '정확도', max: 5 },
        { name: '자세', max: 5 },
        { name: '임팩트', max: 5 },
      ],
      axisLine: {
        lineStyle: {
          color: '#E4EAF0',
          width: 1,
          type: 'dashed'
        }
      },
      splitLine: {
        lineStyle: {
          color: ['#E4EAF0'],
          width: 1,
          type: 'dashed'
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['#fff', '#fff'],
        }
      }
    },
    series: [
      {
        type: 'radar',
        lineStyle: {
          color: '#28B5E1', // 🔵 선 색상
          width: 4,         // 🔵 굵기
        },
        areaStyle: {
          color: 'rgba(40, 181, 225, 0.1)', // 🔵 면 색상
        },
        symbol: 'none',
        data: [
          {
            value: getValues(props.analysis),
            name: '구질 분석'
          }
        ]
      }
    ]
  }

  chart.setOption(option)
}

onMounted(() => {
  chart = echarts.init(chartRef.value, null, {
    renderer: 'canvas',
    useDirtyRect: false
  })
  renderChart()

  window.addEventListener('resize', onRadarResize)
})

// 2026-09-16: 익명 resize 리스너 누수 수정 (named handler + 언마운트 시 제거)
const onRadarResize = () => chart?.resize()

onBeforeUnmount(() => {
  window.removeEventListener('resize', onRadarResize)
  chart?.dispose()
  chart = null
})

watch(() => props.analysis, () => renderChart(), { deep: true })
</script>