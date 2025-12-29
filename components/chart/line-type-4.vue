<template>
  <div ref="chartRef" class="line-chart"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref, onBeforeUnmount } from 'vue'

const chartRef = ref(null)
let chartInstance

const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value, null, {
      renderer: 'canvas',
      useDirtyRect: false
    })

    const option = {
      title: {
      text: '',
        left: 0,
        top: 0,  
      },
      tooltip: {
        trigger: 'axis',
          formatter: function (params) {
          const data = params[0];
          return `
            <div style="text-align: left;">
              <strong>${data.axisValueLabel}</strong><br/>
              <span style="display: inline-block; width: 8px; height: 8px; border-radius: 10px; background: #FCAA0B; margin-right: 4px;"></span>${data.seriesName}: ${data.data}
            </div>
          `;
        }
      },
      grid: {
        left: 0,
        right: 0,
        top: 35,
        bottom: 0,  
        containLabel: true,
      },
      xAxis: { 
        data: ['2016', '2017', '2018', '2019', '2020', '2021'],
        axisLine: {
          show: false // x축의 바깥 테두리선 제거
        },
        axisTick: {
          show: false, // 축의 눈금선 제거
        },
        axisLabel: {
          color: '#030229',
          fontSize: 14,
          margin: 15,
          fontFamily: 'Nunito',
          opacity: 0.7
        },
      },
      yAxis: {
          axisLabel: {
          color: '#030229',
          fontSize: 14,
          margin: 15,
          fontFamily: 'Nunito',
          opacity: 0.7,
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#DFE5EE'
          }
        },
      },
      series: [
        {
          name: '점수',
          type: 'line',
          symbol: 'circle',
          symbolSize: 14,
          itemStyle: {
            color: '#fff',
            borderColor: '#EDA10D',
            borderWidth: 3
          },
          smooth: false,
          data: [5, 20, 36, 10, 10, 25],
          lineStyle: {
            color: '#FCAA0B',
            width: 5,
          },
        },
      ],
      media: [
        {
          query: { maxWidth: 768 },
          option: {
            grid: {
              top: 0,
              containLabel: false
            }
          },
          series: [
            {
              symbolSize: 5,
              lineStyle: {
                width: 2
              }
            }
          ]
        }
      ],
      dataZoom: [{ type: 'inside', zoomOnMouseWheel: false }]
    }

    chartInstance.setOption(option)
    
    // passive 이벤트 리스너로 마우스 휠 이벤트 처리
    const chartDom = chartRef.value
    if (chartDom) {
      chartDom.addEventListener('wheel', (e) => {
        e.preventDefault()
      }, { passive: false })
      
      chartDom.addEventListener('mousewheel', (e) => {
        e.preventDefault()
      }, { passive: false })
    }
  }
}

const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

onMounted(() => {
  initChart()

  // 윈도우 사이즈 변경 시 차트 크기 리사이즈
  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  // 컴포넌트가 언마운트 될 때 차트 인스턴스를 정리
  if (chartInstance) {
    chartInstance.dispose()
  }

  // 이벤트 리스너 제거
  window.removeEventListener('resize', resizeChart)
})
</script>
<style lang="scss" scoped>
.line-chart {
  width: 100%;
  height: 100%;
}
</style>