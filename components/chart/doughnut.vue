<template>
  <div ref="chartRef" class="donut-chart"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref, onBeforeUnmount, watch, defineProps } from "vue";

// 1. 부모에게서 받을 데이터 정의
const props = defineProps({
  data: {
    type: Array,
    default: () => [], // [{name: '아카데미A', value: 10}, ...]
  },
});

const chartRef = ref(null);
let chartInstance = null;

// 차트 색상 팔레트 (데이터가 많아질 경우를 대비해 색상 순환)
const colorPalette = [
  "#7987FF",
  "#F765A3",
  "#A155B9",
  "#36CFC9",
  "#FF9C6E",
  "#FFC069",
  "#95DE64",
  "#5CDBD3",
];

// 2. 옵션 생성 함수
const getOptions = (data) => {
  // 데이터에 색상 입히기 (itemStyle 주입)
  const formattedData = data.map((item, index) => ({
    value: item.value,
    name: item.label,
    itemStyle: {
      color: colorPalette[index % colorPalette.length], // 색상 순환 할당
    },
  }));

  return {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}건 ({d}%)", // 툴팁 포맷: 이름: 값 (퍼센트)
    },
    legend: {
      type: "scroll", // 항목이 많으면 스크롤
      orient: "vertical",
      right: 0, // 오른쪽 끝에 붙임
      top: "middle", // 세로 중앙 정렬
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 12,
      borderRadius: 10,
      inactiveColor: "#ccc",
      textStyle: {
        width: 100, // 글자 길면 말줄임 처리를 위해 폭 지정
        overflow: "truncate",
        ellipsis: "...",
      },
    },
    series: [
      {
        name: "아카데미 점유율",
        type: "pie",
        radius: ["60%", "90%"], // 도넛 모양
        center: ["35%", "50%"], // 차트 위치 (범례 공간 확보를 위해 왼쪽으로 이동)
        avoidLabelOverlap: true, // 라벨 겹침 방지 켜기
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 0,
        },
        label: {
          show: true,
          position: "inside", // 도넛 안쪽에 퍼센트 표시
          formatter: "{d}%", // 퍼센트만 표시
          color: "#fff",
          fontFamily: "Inter",
          fontSize: 11,
        },
        labelLine: {
          show: true, // 안쪽 라벨이라 라인 숨김
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "18",
            fontWeight: "bold",
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        // ✨ 가공된 데이터 주입
        data: formattedData,
      },
    ],

    media: [
      {
        query: { maxWidth: 768 },
        option: {
          legend: {
            orient: "horizontal",
            right: "auto",
            left: 0,
            bottom: 0,
          },
          series: [
            {
              radius: ["45%", "70%"], // 🔥 모바일은 더 작게
              center: ["50%", "40%"],
            }
          ]
        }
      }
    ]
  };
};

// 3. 차트 업데이트 함수
const updateChart = () => {
  if (chartInstance && props.data) {
    chartInstance.setOption(getOptions(props.data));
  }
};

// 4. 데이터 변경 감지 (API 로딩 후 업데이트)
watch(
  () => props.data,
  () => {
    updateChart();
  },
  { deep: true },
);

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);

    // 초기 데이터 있으면 그리기
    updateChart();

    window.addEventListener("resize", () => {
      chartInstance?.resize();
    });
  }
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
  window.removeEventListener("resize", () => {
    chartInstance?.resize();
  });
});
</script>

<style scoped>
.donut-chart {
  width: 100%;
  height: 400px;
}
</style>
