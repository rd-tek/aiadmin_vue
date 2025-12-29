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
    axisPointer: { type: 'shadow' }
  },
  legend: {
    icon: "circle",
    orient: 'horizontal',
    left: 'left',
    bottom: 0,
    itemWidth: 8,
    itemHeight: 8,
    itemGap: 20,
    borderRadius: 8,
    inactiveColor: '#ccc',
    textStyle: {
      color: '#333',
      fontSize: 12
    }
  },
  grid: {
    left: 0,
    right: 1,
    top: 10,
    bottom: 50,
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: ['2020', '2021', '2022', '2023', '2024', '2025'],
    axisTick: { alignWithLabel: true },
    splitLine: {
      show: true,
      lineStyle: { type: 'solid', color: '#F1F1F1' }
    },
    axisLine: { 
      show: false,
      lineStyle: {
        color: '#F1F1F1', // y축 라인 색상
        width: 1,
        type: 'solid'
      } 
    },
    axisLabel: { color: '#030229', fontSize: 11, margin: 15 },
  },
  yAxis: {
    type: 'value',
    min: 0,       // ✅ y축 최소값
    max: 750,     // ✅ y축 최대값
    interval: 150,
    axisLine: {
      show: true,
      lineStyle: { color: '#F1F1F1', width: 1, type: 'solid' }
    },
    axisLabel: { show: true, color: '#000', fontSize: 11, margin: 15 },
  },
  series: [
    {
      name: '+100',
      type: 'bar',
      stack: 'total',       // 같은 그룹에 쌓이도록
      barWidth: '35%',
      data: [100, 120, 130, 140, 110, 150],
      itemStyle: { color: '#7987FF' }
    },
    {
      name: '90-99',
      type: 'bar',
      stack: 'total',
      data: [200, 180, 160, 170, 190, 210],
      itemStyle: { color: '#FFA5CB' }
    },
    {
      name: '80-89',
      type: 'bar',
      stack: 'total',
      data: [150, 170, 180, 160, 140, 130],
      itemStyle: { color: '#E697FF' }
    },
    {
      name: '-79',
      type: 'bar',
      stack: 'total',
      data: [220, 200, 210, 230, 250, 240],
      itemStyle: { color: '#FF7373' }
    },
  ]
}

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    chartInstance.setOption(chartOptions)
    window.addEventListener('resize', () => chartInstance?.resize())
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
