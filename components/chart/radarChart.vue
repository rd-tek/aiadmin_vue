<template>
  <div style="width: 100%; height: 400px">
    <div ref="chartRef" style="width: 100%; height: 100%" />
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const chartRef = ref(null)

onMounted(() => {
  const chart = echarts.init(chartRef.value)

  const option = {
    title: {
      text: ''
    },
    tooltip: {},
    legend: {
      data: ['']
    },
    radar: {
      name: {
        textStyle: {
          color: '#696D6E',  // ✅ 라벨 글자 색상
          fontSize: 12,
          fontWeight: '500',
        }
      },
      indicator: [
        { name: 'WEIGHT', max: 6500 },
        { name: 'HIP', max: 16000 },
        { name: 'WEIST', max: 30000 },
        { name: 'STRENGTH', max: 38000 },
        { name: 'FIT', max: 52000 },
        { name: 'BUST', max: 25000 }
      ],

      // ⚫ 중심에서 퍼지는 선 (축 라인)
      axisLine: {
        lineStyle: {
          color: '#E4EAF0',
          width: 1,
          type: 'dashed' // 'solid' | 'dashed' | 'dotted'
        }
      },

      // 🔵 방사형 격자 라인
      splitLine: {
        lineStyle: {
          color: ['#E4EAF0'], // 선 색상 (여러 개로 하면 격자마다 다르게)
          width: 1,
          type: 'dashed'
        }
      },

      // 🟢 배경면
      splitArea: {
        show: true,
        areaStyle: {
          color: ['#fff', '#fff'], // 격자 배경 색상
        }
      }
    },
    series: [
      {
        name: '',
        lineStyle: {
          color: '#28B5E1', // 이 시리즈의 선 색상
          width: 4 ,
        },
        areaStyle: {
          color: 'rgba(40, 181, 225, 0.1)', // 면적 색상도 커스텀 가능
        },
        type: 'radar',
        symbol: 'none', // ← 점 없애기
        data: [
          {
            value: [4300, 10000, 28000, 35000, 50000, 19000],
            name: ''
          }
        ]
      }
    ]
  }

  chart.setOption(option)
})
</script>
