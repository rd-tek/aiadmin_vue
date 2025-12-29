<template>
  <div ref="chartRef" class="line-chart"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted, onBeforeUnmount, watch, defineProps } from "vue";

// 1. Props 정의 (부모에서 labels와 values를 받음)
const props = defineProps({
  labels: {
    type: Array,
    default: () => [],
  },
  values: {
    type: Array,
    default: () => [],
  },
});

const chartRef = ref(null);
let chartInstance = null;

// 2. 옵션 생성 함수 (데이터 주입)
const getOptions = (labels, values) => {
  return {
    title: { text: "", left: "center" },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      orient: 'horizontal', // 가로 정렬
      left: 0,              // 왼쪽 끝 정렬
      bottom: 0,            // 하단 끝 정렬
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
      right: 8,
      top: 10,
      bottom: 60,
      containLabel: true, // 축 라벨이 잘리지 않도록
    },
    xAxis: {
      type: "category",
      data: labels, // ✨ Props 라벨 연결 (1월~12월)
      splitLine: {
        show: true,
        lineStyle: { type: "solid", color: "#F1F1F1" },
      },
      axisLine: {
        show: false, // x축의 중심축
        lineStyle: {
          color: '#F1F1F1', // y축 라인 색상
          width: 1,
          type: 'solid'
        }
      },
      axisTick: { show: false },
      axisLabel: { color: "#030229", fontSize: 11, margin: 15 },
    },
    yAxis: {
      type: "value",
      min: 0, // ✨ 수강생 수는 0부터 시작 (음수 제거)
      // max, interval은 제거하여 데이터에 맞게 자동 조절
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
        color: "#000",
        fontSize: 11,
        margin: 15,
      },
    },
    series: [
      {
        name: "수강 등록", // 범례 이름
        type: "line",
        symbol: "circle",
        symbolSize: 13, // 사이즈 살짝 조정
        data: values, // ✨ Props 값 연결
        smooth: true, // 부드러운 곡선
        lineStyle: {
          width: 1,
          color: '#7987FF'
        },
        itemStyle: { 
          color: '#7987FF',
          borderColor: '#7987FF', // #7987FF(파란색) #FFA5CB(핑크색) #E697FF(보라색)
          borderWidth: 3
        },
      },
    ],
    media: [
      {
        query: { maxWidth: 768 },
        option: {
          series: [
            {
              symbolSize: 5
            }
          ],
          grid: {
            bottom: 40
          }
        }
      }
    ]
  };
};

// 3. 차트 업데이트
const updateChart = () => {
  if (chartInstance && props.labels.length > 0) {
    chartInstance.setOption(getOptions(props.labels, props.values));
  }
};

// 4. 데이터 감시 (비동기 데이터 처리)
watch(
  () => [props.labels, props.values],
  () => {
    updateChart();
  },
  { deep: true },
);

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);
    updateChart(); // 초기 데이터 렌더링

    window.addEventListener("resize", () => {
      chartInstance?.resize();
    });
  }
});

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.dispose();
  window.removeEventListener("resize", () => {
    chartInstance?.resize();
  });
});
</script>

<style scoped>
.line-chart {
  width: 100%;
  height: 400px;
}
</style>
