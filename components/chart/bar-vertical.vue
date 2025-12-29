<template>
  <div ref="chartRef" class="bar-chart"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const chartRef = ref(null)
let chartInstance = null

const chartOptions = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    icon: "circle",
  },
  grid: {
    left: 0,
    right: 1,
    top: 10,
    bottom: 0,
    containLabel: true, // 축 라벨이 잘리지 않도록
  },
  xAxis: {
    type: 'category',
      data: [
      'A매장', 'B매장', 'C매장', 'D매장',
      'E매장', 'F매장', 'G매장', 'H매장',
      'I매장', 'J매장', 'K매장', 'L매장',
      'M매장', 'N매장', 'O매장', 'P매장'
    ],
    axisTick: {
      alignWithLabel: true
    },
    splitLine: {
      show: true,
      lineStyle: {
          type: 'solid',
          color: '#F1F1F1',
      }
    },
    axisLine: {
      show: false, // x축의 중심축
      lineStyle: {
        color: '#F1F1F1', // y축 라인 색상
        width: 1,
        type: 'solid'
      }
    },
    axisLabel: {
      color: '#030229',
      fontSize: 11,
      margin: 15,
      rotate: 90 // 90도로 회전 → 세로 표시
    },
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 2200,
    interval: 500,
    axisLine: {
      show: true,
      lineStyle: {
        color: '#F1F1F1', // y축 라인 색상
        width: 1,
        type: 'solid'
      }
    },
    axisLabel: {
      show: true,
      color: '#000',   // y축 라벨(숫자) 색상
      fontSize: 11,
      margin: 15
    },
  },
  series: [
    {
      name: '신청자수',
      type: 'bar',
      barWidth: '50%',
      data: [1200, 2000, 1500, 800, 700, 1100, 1300, 1200, 2000, 1500, 800, 700, 1100, 1300, 1000, 800],
      itemStyle: {
        color: '#7987FF'
      }
    }
  ]
}

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    chartInstance.setOption(chartOptions)

    // 화면 리사이즈 시 차트 자동 조정
    window.addEventListener('resize', () => {
      chartInstance?.resize()
    })
  }
})

onBeforeUnmount(() => {
  chartInstance?.dispose()
})
</script>

<style scoped>
.bar-chart {
  width: 100%;
  height: 400px;
}
</style>
