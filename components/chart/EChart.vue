<!-- EWeightMini.vue : 네 옵션 유지 + shotweight_info.list 바로 사용 (단일 시리즈) -->
<template>
  <div class="line-chart" ref="chartRef"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref, onBeforeUnmount, watch, computed } from 'vue'

const props = defineProps({
  // swingdetailinfo.shotweight_info.list 그대로
  // 예: [{ fit_weight_info: "1,2,3..." }, { fit_weight_info: "1,2,3..." }] or 4개
  list: { type: Array, required: true },
  // 어떤 퍼센트를 한 줄로 그릴지 선택: 'LR' | 'FB'
  kind: { type: String, default: 'LR' },
  // (선택) 프레임→시간 변환
  totalFrames: { type: Number, default: null },
  playTime: { type: Number, default: null },
  // (선택) 시리즈명
  seriesName: { type: String, default: '' },
})

const emit = defineEmits(['seek', 'point', 'balance'])

const chartRef = ref(null)
let chartInstance = null

/* -------------------- 유틸 -------------------- */
const parseCSV = (csv) =>
  String(csv)
    .split(',')
    .map((v) => parseFloat(v.trim()))
    .filter((n) => !Number.isNaN(n))

/* -------------------- 데이터 전처리 -------------------- */
/**
 * list 길이가 2면 [Right, Left], 길이가 4면 [Right, Left, Front, Back] 라고
 * 네 기존 코드 흐름을 그대로 따른다.
 */
const seriesData = computed(() => {
  const list = Array.isArray(props.list) ? props.list : []
  if (!(list.length === 2 || list.length === 4)) {
    console.warn('fit_weight_info 배열은 2개(좌/우) 또는 4개(좌/우/전/후)여야 합니다.')
    return { labels: [], values: [], getAt: () => ({ L:0, R:0, F:0, B:0 }), hasFB:false }
  }

  const parsed = list.map(it => parseCSV(it?.fit_weight_info ?? ''))
  const len = Math.min(...parsed.map(a => a.length || 0))
  const labels = Array.from({ length: len }, (_, i) => String(i))

  const leftArr  = parsed[1] || []   // 컨벤션: [Right, Left, (Front, Back)]
  const rightArr = parsed[0] || []
  const frontArr = list.length === 4 ? (parsed[2] || []) : []
  const backArr  = list.length === 4 ? (parsed[3] || []) : []

  const values = []
  for (let i = 0; i < len; i++) {
    const left  = leftArr[i]  ?? 0
    const right = rightArr[i] ?? 0
    const front = frontArr[i] ?? 0
    const back  = backArr[i]  ?? 0

    if (props.kind === 'FB') {
      const s = front + back
      values.push(s > 0 ? Math.min(100, Math.max(0, (front / s) * 100)) : 0)
    } else {
      const s = left + right
      values.push(s > 0 ? Math.min(100, Math.max(0, (left / s) * 100)) : 0)
    }
  }

  const getAt = (i) => ({
    L: leftArr[i]  ?? 0,
    R: rightArr[i] ?? 0,
    F: frontArr[i] ?? 0,
    B: backArr[i]  ?? 0,
  })

  return { labels, values, getAt, hasFB: list.length === 4 }
})

/* -------------------- 옵션 (네 스타일 그대로) -------------------- */
const bfClass = 'color-blue'; // back/front(#5BC4FF)
const lrClass = 'color-pink'; // left/right(#FF5BEF)
const kindClass = props.kind === 'LR' ? bfClass : lrClass; // 예시

// 파일 상단(스크립트 내) 어딘가에 배치
const makeFormatter = (labels, helpers, kind) => (params) => {
  const d = params?.[0];
  if (!d) return '';
  const idx = d.dataIndex ?? 0;

  const hasHelpers = helpers && typeof helpers.getAt === 'function';
  const g = hasHelpers ? (helpers.getAt(idx) || {}) : {};
  const L = Number(g.L ?? 0);
  const R = Number(g.R ?? 0);
  const F = Number(g.F ?? 0);
  const B = Number(g.B ?? 0);
  const hasFB = !!(hasHelpers && helpers.hasFB);

  // ---- 퍼센트 계산 (합 100% 보정) ----
  const lrSum = L + R;
  let pL = lrSum > 0 ? (L / lrSum) * 100 : 0;
  let pR = lrSum > 0 ? 100 - pL : 0;        // 보정
  pL = Math.round(pL); pR = Math.max(0, 100 - pL); // 반올림 후 다시 100 맞춤

  let pF = 0, pB = 0;
  if (hasFB) {
    const fbSum = F + B;
    pF = fbSum > 0 ? (F / fbSum) * 100 : 0;
    pB = fbSum > 0 ? 100 - pF : 0;
    pF = Math.round(pF); pB = Math.max(0, 100 - pF);
  }

  const rows = [
    `<span>L: ${pL}</span>`,
    `<span>R: ${pR}</span>`,
    ...(hasFB ? [
      `<span>F: ${pF}</span>`,
      `<span>B: ${pB}</span>`,
    ] : []),
  ].join('');

  // 시리즈 값(라인 자체의 %)도 보여주고 싶으면 여기 남김
  const pctSeries = `${Number(d.data ?? 0).toFixed(0)}%`;
  const lab = labels?.[idx] ?? d.axisValueLabel ?? String(idx);
  const colorClass = (kind === 'LR') ? 'color-blue' : 'color-pink';

  return `
    <div class="custom-tooltip">
      <div class="custom-tooltip-body">
        <span class="head">${lab} </span>
        <div class="cont">
          <div class="label ${colorClass}"></div>
          <div class="values">${rows}</div>
        </div>
      </div>
    </div>
  `;
};

let rafId = null
const stopBalanceLoop = () => {
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

const startBalanceLoop = () => {
  stopBalanceLoop()

  const { labels, getAt } = seriesData.value
  const len = labels.length
  if (!len) return

  const DURATION = 6000 // 6초
  const t0 = performance.now()

  const tick = (now) => {
    const p = Math.min(1, (now - t0) / DURATION)
    const idx = Math.max(0, Math.floor(p * (len - 1)))

    const g = getAt(idx) || {}
    const L = Number(g.L ?? 0)
    const R = Number(g.R ?? 0)
    const F = Number(g.F ?? 0)
    const B = Number(g.B ?? 0)

    // 퍼센트 계산 (LR / FB 각각 합=100 기준)
    const lrSum = L + R
    const fbSum = F + B

    const pct = {
      L: lrSum > 0 ? (L / lrSum) * 100 : 0,
      R: lrSum > 0 ? (R / lrSum) * 100 : 0,
      F: fbSum > 0 ? (F / fbSum) * 100 : 0,
      B: fbSum > 0 ? (B / fbSum) * 100 : 0,
    }

    // 부모로 송신
    emit('balance', {
      index: idx,
      pct,        // { L,R,F,B } 각 %
      // raw: { L, R, F, B }  // 원시값도 필요하면 이 줄 주석 해제
    })

    if (p < 1) rafId = requestAnimationFrame(tick)
  }

  rafId = requestAnimationFrame(tick)
}

const buildOption = (labels, values, helpers) => ({
  animation: true,
  animationDuration: 1000,             // ✅ 전체 라인 그리기 1초
  animationEasing: 'cubicOut',         // 부드럽게 감속
  animationDelay: (idx) => idx * 10,   // 각 포인트마다 살짝 딜레이(점점 나타남)

  animationDurationUpdate: 1000,       // 업데이트 시도 동일하게 1초
  animationEasingUpdate: 'cubicOut',
  animationDelayUpdate: (idx) => idx * 10,
  tooltip: {
    trigger: 'axis',
    confine: true,
    backgroundColor: 'rgba(0, 0, 0, 0.84)',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 8,
    padding: [12],
    textStyle: { color: '#fff', fontSize: 13, fontWeight: 500, fontFamily: 'Pretendard' },
    formatter: makeFormatter(labels, helpers, props.kind),
    
  },
  grid: {
    left: 0,
    right: 0,
    top: isMobile.value ? 0 : 10,
    bottom: isMobile.value ? 0 : 10,
    containLabel: isMobile.value ? false : true,
  },
  xAxis: {
    // ✅ 네가 준 카테고리 축 형태 유지. 라벨만 프레임 인덱스로 생성.
    data: labels.length ? labels : ['10am','11am','12am','01pm','02pm','03pm','04pm','05pm','06pm','07pm','08pm','09pm','10pm','11pm','12pm'],
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: '#030229',
      fontSize: 14,
      margin: 15,
      fontFamily: 'Nunito',
      opacity: 0.7,
      show: false
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
    interval: 20,
    min: 0,
    max: 100
  },
  series: [
    {
      name: props.seriesName,
      type: 'line',
      symbol: 'none',
      symbolSize: 14,
      itemStyle: {
        color: '#fff',
        borderColor: '#AE8FF7',
        borderWidth: 3
      },
      smooth: true,
      // ✅ 네가 준 자리에 우리가 만든 퍼센트값을 그대로 꽂는다.
      data: values.length ? values : [5, 20, 36, 10, 10, 5, 20, 36, 10, 10, 5, 20, 36, 10, 10],
      lineStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 1, y2: 0,
          colorStops: [
            { offset: 0, color: '#5BC4FF' }
          ],
        },
        width: isMobile.value ? 2 : 5,
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowBlur: 10,
        shadowOffsetY: 8,
      },
    },
  ],
  dataZoom: [{ type: 'inside', zoomOnMouseWheel: false }]
})

const isMobile = computed(() => window.innerWidth <= 768)

/* -------------------- 렌더/업데이트 -------------------- */
const render = () => {
  if (!chartRef.value) return
  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value, null, { renderer: 'canvas', useDirtyRect: false })
  }

  const { labels, values, getAt, hasFB } = seriesData.value
  chartInstance.setOption(buildOption(labels, values, { getAt, hasFB }), true)

  // ✅ 차트 애니메이션과 동일한 6초에 맞춰 부모 animated 업데이트
  startBalanceLoop()

  // 클릭 → 프레임 인덱스/시간 emit 
  chartInstance.off('click')
  chartInstance.on('click', (params) => {
    if (!params) return
    const frameIndex = params.dataIndex
    if (props.totalFrames && props.playTime) {
      const frameRate = props.totalFrames / props.playTime
      const currentTime = frameIndex / frameRate
      emit('seek', currentTime)
    } else {
      // emit('point', { index: frameIndex, value: params.data })
    }
  })

  // 스크롤 방지 
  const dom = chartRef.value
  const prevent = (e) => e.preventDefault()
  dom.addEventListener('wheel', prevent, { passive: false })
  dom.addEventListener('mousewheel', prevent, { passive: false })
}

const resizeChart = () => { chartInstance && chartInstance.resize() }

onMounted(() => {
  render()
  window.addEventListener('resize', resizeChart)
})

watch(() => [props.list, props.kind], () => {
  stopBalanceLoop()
  render()
}, { deep: true })

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  stopBalanceLoop()
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})
</script>
<style lang="scss" scoped>
.line-chart {
  width: 100%;
  height: 11.5vh;
}

::v-deep(.custom-tooltip) {
  .custom-tooltip-body {
    .head {
      display: block;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .cont {
      display: flex;
      align-items: baseline;
      gap: 8px;
      
      .label {
        width: 10px;
        height: 10px;
        background: #fff;

        &.color-blue {
          background: #5BC4FF;
        }

        &.color-pink {
          background: #FF5BEF; 
        }
      }

      .values {
        display: grid; 
        grid-template-columns: repeat(2, 1fr);
        gap: 6px 8px;
        font-weight: 500;
      }
    }
  }
}
</style>