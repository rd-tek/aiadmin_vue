<!-- EWeightMini.vue : 네 옵션 유지 + shotweight_info.list 바로 사용 (단일 시리즈) -->
<template>
  <!--
    2026-09-02: 데이터가 없으면 빈 차트 대신 안내를 둡니다.
      차트 요소는 v-show 로 남겨 둡니다. v-if 로 없애면 ref 가
      사라져 나중에 데이터가 와도 그릴 대상이 없습니다.
  -->
  <div class="line-chart" ref="chartRef" v-show="hasData"></div>
  <div class="no-info" v-if="!hasData">내역이 없습니다.</div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref, onBeforeUnmount, watch, computed, nextTick } from 'vue'

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
  /**
   * 2026-09-02: 외부에서 세로바 위치를 지정합니다.
   *
   * 동작 버튼(address·backswing·topswing·downswing·impact·
   * follow-through·finish)이 가진 프레임 인덱스를 그대로 넘기면 됩니다.
   * fit_total_frames 와 이 차트의 데이터 길이가 같아 1:1 대응합니다.
   * null 이면 자동 루프가 세로바를 움직입니다.
   */
  markIndex: { type: Number, default: null },
  /**
   * 2026-10-21: 영상 재생 위치(초). follow 가 true 면 세로바·L/R/F/B 가 이 값을 따라갑니다.
   *   이전에는 영상과 무관하게 6초짜리 자체 루프가 돌아(영상 길이 약 5초) 재생·정지·이동과 어긋났습니다.
   */
  currentTime: { type: Number, default: null },
  follow: { type: Boolean, default: false },
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
    /**
     * 2026-09-02: 빈 배열일 때는 경고하지 않습니다.
     *
     * 페이지가 :list="swingView?.shotweight_info?.list || []" 로 넘기는데
     * swingView 는 마운트 후 API 로 채워집니다. 첫 렌더에서는 항상 빈
     * 배열이라, 아직 안 온 것을 잘못된 데이터로 보고 경고하고 있었습니다.
     * 값이 왔는데 길이가 틀린 경우만 알립니다.
     */
    if (list.length > 0) {
      console.warn(
        'fit_weight_info 배열은 2개(좌/우) 또는 4개(좌/우/전/후)여야 합니다. 받은 길이:',
        list.length,
      )
    }
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

// 2026-09-02: 그릴 값이 있는지. 템플릿의 안내 문구 분기에 씁니다.
const hasData = computed(() => seriesData.value.labels.length > 0)

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
// 2026-09-02: 세로바가 같은 인덱스에 머무는 동안 setOption 을 반복하지
//   않도록 마지막으로 그린 인덱스를 기억합니다.
let lastMarkIdx = -1

const stopBalanceLoop = () => {
  lastMarkIdx = -1
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

/**
 * 2026-09-02: 특정 인덱스의 L/R/F/B 퍼센트
 *   자동 루프와 외부 이동(markIndex)이 같은 규칙을 쓰도록 분리했습니다.
 */
const pctAt = (idx) => {
  const { getAt } = seriesData.value
  const g = (typeof getAt === 'function' ? getAt(idx) : null) || {}
  const L = Number(g.L ?? 0)
  const R = Number(g.R ?? 0)
  const F = Number(g.F ?? 0)
  const B = Number(g.B ?? 0)
  const lrSum = L + R
  const fbSum = F + B
  return {
    L: lrSum > 0 ? (L / lrSum) * 100 : 0,
    R: lrSum > 0 ? (R / lrSum) * 100 : 0,
    F: fbSum > 0 ? (F / fbSum) * 100 : 0,
    B: fbSum > 0 ? (B / fbSum) * 100 : 0,
  }
}

/**
 * 2026-09-02: 세로바를 지정한 좌표로 옮깁니다.
 *   동작 버튼 클릭처럼 외부에서 위치를 정할 때 씁니다.
 *   부모의 L/R/F/B 숫자도 그 좌표 값으로 맞춰 보냅니다.
 */
let pendingMarkIdx = null

const moveMarkTo = (idx) => {
  const { labels } = seriesData.value
  const len = labels.length
  if (!len || !chartInstance) {
    // 2026-09-02: 차트가 아직 없으면 보류했다가 render 직후 적용합니다.
    //   데이터가 늦게 와서 render 가 나중에 일어나는 경우, 그냥 반환하면
    //   세로바가 영영 움직이지 않습니다.
    pendingMarkIdx = idx
    return
  }
  pendingMarkIdx = null
  const i = Math.max(0, Math.min(len - 1, Math.round(Number(idx) || 0)))
  lastMarkIdx = i
  chartInstance.setOption({
    series: [{ markLine: { data: [{ xAxis: i }] } }],
  })
  emit('balance', { index: i, pct: pctAt(i) })
}

// 2026-10-21: 초 → 데이터 인덱스(fit_total_frames 와 데이터 길이 1:1)
const timeToIndex = (sec) => {
  const len = seriesData.value.labels.length
  if (!len) return 0
  const tf = Number(props.totalFrames) || len
  const pt = Number(props.playTime) || 0
  const idx = pt > 0 ? (Number(sec) || 0) * (tf / pt) : 0
  return Math.max(0, Math.min(len - 1, Math.round(idx)))
}

const startBalanceLoop = () => {
  // 2026-10-21: 영상 동기화 모드에서는 자체 루프 대신 현재 재생 위치로 맞춤
  if (props.follow && seriesData.value.labels.length) {
    stopBalanceLoop()
    moveMarkTo(timeToIndex(props.currentTime ?? 0))
    return
  }
  stopBalanceLoop()

  const { labels, getAt } = seriesData.value
  const len = labels.length
  if (!len) {
    /**
     * 2026-09-02: 데이터가 없으면 0 을 한 번 보냅니다.
     *
     * 부모 페이지는 animated 를 55/65/75/85 로 초기화해 두었습니다.
     * 그냥 반환하면 그 값이 화면에 남아, 측정값이 없는 스윙에서도
     * 그럴듯한 숫자가 보입니다.
     */
    emit('balance', { index: 0, pct: { L: 0, R: 0, F: 0, B: 0 } })
    return
  }

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

    /**
     * 2026-09-02: 세로바를 현재 좌표로 이동
     *
     * 인덱스가 바뀔 때만 갱신합니다. 매 프레임 setOption 을 부르면
     * 6초 동안 360회가 되어 불필요하게 무겁습니다.
     */
    if (idx !== lastMarkIdx) {
      lastMarkIdx = idx
      chartInstance?.setOption({
        series: [{ markLine: { data: [{ xAxis: idx }] } }],
      })
    }

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
    top: 0,
    bottom: 0,
    containLabel: true
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
      /**
       * 2026-09-02: 재생 위치를 따라가는 세로바
       *
       * 위 startBalanceLoop 이 6초 동안 진행시키는 인덱스에 세로선을
       * 세워, 지금 어느 좌표의 값인지 차트에서 바로 읽히게 합니다.
       * 초기에는 비워두고 루프가 채웁니다.
       *
       *   silent          마우스 이벤트를 가리지 않습니다
       *   animation:false 전환 애니메이션이 붙으면 바가 뒤늦게 따라옵니다
       *   color           툴팁 라벨과 같은 규칙 (LR 파랑 / FB 분홍)
       */
      markLine: {
        silent: true,
        symbol: 'none',
        animation: false,
        label: { show: false },
        /**
         * 2026-09-02: 색을 데이터 선에서 떼어냈습니다.
         *
         * 이전에는 세로바를 선과 같은 색(#5BC4FF / #FF5BEF)으로 그려서
         * 선 위에 겹치면 사실상 보이지 않았습니다. 세로바는 '지금 어느
         * 좌표인지' 를 알려주는 보조선이니 데이터 색과 구분돼야 합니다.
         * 짙은 회색 실선으로 두어 눈금선(#E5E7E8)과도 헷갈리지 않게 합니다.
         */
        lineStyle: {
          color: '#35383B',
          width: 2,
          type: 'solid',
          opacity: 0.85,
        },
        data: [],
      },
      smooth: true,
      // ✅ 네가 준 자리에 우리가 만든 퍼센트값을 그대로 꽂는다.
      // 2026-09-02: 더미 폴백을 없앴습니다. 값이 없으면 그리지 않습니다.
      //   (없는 데이터를 그럴듯한 곡선으로 보여주고 있었습니다)
      data: values,
      lineStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 1, y2: 0,
          colorStops: [
            { offset: 0, color: '#5BC4FF' }
          ],
        },
        width: 5,
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowBlur: 10,
        shadowOffsetY: 8,
      },
    },
  ],
  media: [
    {
      query: {
        maxWidth: 768
      },
      option: {
        series: [
          {
            lineStyle: {
              width: 2
            }
          }
        ]
      }
    }
  ],
  dataZoom: [{ type: 'inside', zoomOnMouseWheel: false }]
})

/* -------------------- 렌더/업데이트 -------------------- */
const render = () => {
  if (!chartRef.value) return

  /**
   * 2026-09-02: 값이 없으면 차트를 만들지 않습니다.
   *
   * 데이터가 없을 때 차트 요소는 v-show 로 숨겨집니다. display:none 인
   * 요소는 clientWidth/Height 가 0 이라, 그대로 init 하면 ECharts 가
   *   [ECharts] Can't get DOM width or height...
   * 경고를 냅니다. 대신 balance 0 만 보내 부모의 초기 하드코딩 값이
   * 화면에 남지 않게 합니다.
   */
  if (!hasData.value) {
    startBalanceLoop()
    return
  }

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

  // 2026-09-02: 차트가 없어 보류됐던 세로바 위치를 지금 적용합니다.
  if (pendingMarkIdx !== null) {
    const p = pendingMarkIdx
    pendingMarkIdx = null
    stopBalanceLoop()
    moveMarkTo(p)
  }

  // 2026-09-02: 휠 스크롤 차단 리스너를 제거했습니다.
  //   dataZoom 이 zoomOnMouseWheel: false 라 휠 확대가 없으므로
  //   기본 스크롤을 막을 이유가 없었고, 차트 위에서 페이지
  //   스크롤이 멈추는 문제만 남았습니다. 게다가 이 등록은 다시
  //   그릴 때마다 쌓이는 누수였습니다.
}

const resizeChart = () => {
  if (!chartInstance) return
  const dom = chartRef.value
  if (!dom || dom.clientWidth === 0 || dom.clientHeight === 0) return
  chartInstance.resize()
}

/**
 * 2026-09-02: render 를 nextTick 뒤로 미룹니다.
 *
 * 차트 요소는 데이터가 없을 때 v-show 로 숨겨집니다. 데이터가 도착한
 * 직후 곧바로 render 를 부르면 Vue 가 아직 DOM 을 갱신하지 않아
 * 요소가 display:none 상태이고, 크기가 0 이라 ECharts 가
 *   [ECharts] Can't get DOM width or height...
 * 경고를 냅니다. 한 틱 기다리면 표시가 반영된 뒤에 그립니다.
 */
onMounted(async () => {
  await nextTick()
  render()
  window.addEventListener('resize', resizeChart)
  window.addEventListener('scroll', resizeChart)
})

watch(() => [props.list, props.kind], async () => {
  stopBalanceLoop()
  await nextTick()
  render()
}, { deep: true })

/**
 * 2026-09-02: 동작 버튼이 지정한 좌표로 세로바 이동
 *
 * 버튼을 누르면 영상도 그 지점에서 멈추므로, 자동으로 흐르던 루프도
 * 함께 멈추고 세로바를 그 자리에 고정합니다.
 */
watch(() => props.currentTime, (t) => {
  if (!props.follow || t === null || t === undefined) return
  const i = timeToIndex(t)
  if (i === lastMarkIdx) return
  stopBalanceLoop()
  moveMarkTo(i)
})

watch(() => props.markIndex, (v) => {
  if (v === null || v === undefined) return
  stopBalanceLoop()
  moveMarkTo(v)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  window.removeEventListener('scroll', resizeChart)
  stopBalanceLoop()
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})
</script>
<style lang="scss" scoped>
/* 2026-10-15: 체중 데이터가 없을 때 안내 상자가 글자 폭으로 줄어 Step Balance 가 가운데로 몰리던 문제.
   aimember(정본) 전역 .no-info 와 같게 — 차트 자리를 그대로 채우는 상자로 */
.no-info {
  flex: 1 1 auto;
  align-self: stretch;
  width: 100%;
  min-width: 0;
  min-height: 11.5vh;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 1px solid #E5E7E8;
  border-radius: 8px;
  background: #fff;
  color: #52575C;
  font-size: 15px;
}.line-chart {
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