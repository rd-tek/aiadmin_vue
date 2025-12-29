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
    orient: 'horizontal',  // 가로 정렬
    left: 'left',          // 왼쪽 정렬
    bottom: 0,             // 차트 아래쪽에 붙이기
    itemWidth: 8,          // 아이콘 가로
    itemHeight: 8,         // 아이콘 세로
    itemGap: 20,           // 아이템 간격
    borderRadius: 8,       // 아이콘 둥글게
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
    containLabel: true, // 축 라벨이 잘리지 않도록
  },
  xAxis: {
    type: 'category',
      data: ['2020', '2021', '2022', '2023', '2024', '2025'],
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
    },
  },
  yAxis: {
    type: 'value',
    min: -60,
    max: 60,
    interval: 40,
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
      name: '진행수',
      type: 'bar',
      stack: 'total',
      barWidth: '25%',
      barGap: '0%',          // 시리즈 간 간격 제거
      barCategoryGap: '0%',  // 카테고리 간 간격 제거
      data: [-30, -30, -30, -30, -30, -30],
      itemStyle: {
        color: '#FFA5CB'
      }
    },
    {
      name: '완료수',
      type: 'bar',
      stack: 'total',
      barWidth: '25%',
      barGap: '0%',          // 시리즈 간 간격 제거
      barCategoryGap: '0%',  // 카테고리 간 간격 제거
      data: [-60, -60, -60, -60, -60, -60],
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
 