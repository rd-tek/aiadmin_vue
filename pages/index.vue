<template>
  <!-- 2026-10-13: 대시보드 개편 — 지표별 빈 선그래프 6개 → KPI 카드(전월 대비·미니 추이) + 일별 통합 추이 + 최근 6개월 추이 + 이번 달 구성 + 누적 현황 -->
  <div class="dash2">
    <section class="dash2-kpis">
      <article v-for="k in kpis" :key="k.key" class="kpi" :style="{ '--c': k.color }">
        <div class="kpi-head">
          <span class="kpi-dot"></span>
          <span class="kpi-title">{{ k.label }}</span>
        </div>
        <div class="kpi-main">
          <strong class="kpi-value">{{ fmt(k.month) }}</strong>
          <span class="kpi-unit">이번 달</span>
        </div>
        <div class="kpi-delta" :class="k.deltaClass">
          <template v-if="k.delta === null">전월 데이터 없음</template>
          <template v-else-if="k.delta === 0">전월과 동일</template>
          <template v-else>{{ k.delta > 0 ? '▲' : '▼' }} {{ fmt(Math.abs(k.delta)) }} <small>전월 대비</small></template>
        </div>
        <client-only>
          <dash-echart class="kpi-spark" :option="sparkOption(k)" height="44px" />
        </client-only>
        <div class="kpi-foot">누적 <b>{{ fmt(k.total) }}</b></div>
      </article>
    </section>

    <section class="dash2-row">
      <div class="card card-wide">
        <div class="card-head">
          <h3>일별 추이 <small>{{ monthLabel }}</small></h3>
          <div class="seg">
            <button type="button" :class="{ on: dailyMode === 'line' }" @click="dailyMode = 'line'">선</button>
            <button type="button" :class="{ on: dailyMode === 'bar' }" @click="dailyMode = 'bar'">막대</button>
          </div>
        </div>
        <client-only>
          <dash-echart v-if="hasDaily" :option="dailyOption" height="320px" />
          <div v-else class="empty">이번 달 데이터가 없습니다.</div>
        </client-only>
      </div>
    </section>

    <section class="dash2-row two">
      <div class="card">
        <div class="card-head"><h3>최근 6개월 추이</h3></div>
        <client-only>
          <dash-echart v-if="trend.labels.length" :option="trendOption" height="300px" />
          <div v-else class="empty">불러오는 중…</div>
        </client-only>
      </div>
      <div class="card">
        <div class="card-head"><h3>이번 달 활동 구성</h3></div>
        <client-only>
          <dash-echart v-if="monthSum > 0" :option="donutOption" height="300px" />
          <div v-else class="empty">이번 달 활동이 없습니다.</div>
        </client-only>
      </div>
    </section>

    <section class="dash2-row">
      <div class="card card-wide">
        <div class="card-head"><h3>누적 현황</h3></div>
        <div class="totals">
          <div v-for="k in kpisByTotal" :key="'t' + k.key" class="total-row" :style="{ '--c': k.color }">
            <span class="total-label">{{ k.label }}</span>
            <span class="total-bar"><i :style="{ width: (maxTotal ? (k.total / maxTotal) * 100 : 0) + '%' }"></i></span>
            <span class="total-val">{{ fmt(k.total) }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { useMainApi } from "~/api/main";
import DashEchart from "~/components/chart/dash-echart.client.vue";

const { _getMain } = useMainApi();
const month = useMonth();

// 지표 정의(백엔드 /main 응답 키)
const DEFS = [
  { key: "player", label: "일반 회원", color: "#4318FF" },
  { key: "owner", label: "매장 회원", color: "#05CD99" },
  { key: "gameend", label: "게임 완료", color: "#2B7FFF" },
  { key: "gamestop", label: "게임 중단", color: "#EE5D50" },
  { key: "tournament", label: "토너먼트", color: "#FFB547" },
  { key: "eventwinning", label: "미니게임 당첨", color: "#A855F7" },
];

// 좁은 화면: 범례를 아래로, 위 여백 확대
const isMobile = ref(false);
const onResize = () => { isMobile.value = window.innerWidth <= 768; };
onMounted(() => { onResize(); window.addEventListener("resize", onResize); });
onBeforeUnmount(() => window.removeEventListener("resize", onResize));

const cur = ref({});
const prev = ref(null);
const trend = ref({ labels: [], rows: {} });
const dailyMode = ref("bar"); // 2026-10-15: 일별 건수(정수)는 막대가 기본 — 곡선은 1건이 종 모양으로 보여 오해

const toDate = (v) => {
  if (v?.year !== undefined) return new Date(v.year, v.month, 1);
  const d = v instanceof Date ? v : new Date(v || Date.now());
  return new Date(d.getFullYear(), d.getMonth(), 1);
};
const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
const shift = (d, n) => new Date(d.getFullYear(), d.getMonth() + n, 1);
const base = computed(() => toDate(month.value));
const monthLabel = computed(() => `${base.value.getFullYear()}년 ${base.value.getMonth() + 1}월`);
const fmt = (n) => Number(n || 0).toLocaleString("ko-KR");
const num = (v) => Number(v || 0);

const fetchMonth = async (d) => {
  try {
    const res = await _getMain({ regdate: ymd(d) });
    return res?.code === 200 ? res : null;
  } catch (e) {
    return null;
  }
};

const load = async () => {
  const b = base.value;
  const months = [-5, -4, -3, -2, -1, 0].map((n) => shift(b, n));
  const results = await Promise.all(months.map(fetchMonth));
  cur.value = results[5] || {};
  prev.value = results[4];
  const rows = {};
  for (const def of DEFS) rows[def.key] = results.map((r) => (r ? num(r[`${def.key}cntmonth`]) : 0));
  trend.value = { labels: months.map((d) => `${String(d.getFullYear()).slice(2)}.${d.getMonth() + 1}월`), rows };
};

const kpis = computed(() => DEFS.map((def) => {
  const m = num(cur.value[`${def.key}cntmonth`]);
  const p = prev.value ? num(prev.value[`${def.key}cntmonth`]) : null;
  const delta = p === null ? null : m - p;
  return {
    ...def,
    month: m,
    total: num(cur.value[`${def.key}cnttotal`]),
    list: cur.value[`${def.key}list`] || [],
    delta,
    deltaClass: delta === null || delta === 0 ? "flat" : delta > 0 ? "up" : "down",
  };
}));
const kpisByTotal = computed(() => [...kpis.value].sort((a, b) => b.total - a.total));
const maxTotal = computed(() => Math.max(0, ...kpis.value.map((k) => k.total)));
const monthSum = computed(() => kpis.value.reduce((s, k) => s + k.month, 0));
const dailyLabels = computed(() => (kpis.value.find((k) => k.list.length)?.list || []).map((v) => v.date));
const hasDaily = computed(() => dailyLabels.value.length > 0);

const axisBase = {
  axisLine: { lineStyle: { color: "#E3E6EE" } },
  axisTick: { show: false },
  axisLabel: { color: "#8F9BBA", fontSize: 11 },
};
const sparkOption = (k) => ({
  animation: false,
  grid: { left: 0, right: 0, top: 4, bottom: 0 },
  xAxis: { type: "category", show: false, boundaryGap: false, data: k.list.map((v) => v.date) },
  yAxis: { type: "value", show: false, min: 0 },
  series: [{ type: "line", data: k.list.map((v) => num(v.cnt)), smooth: false, symbol: "none", lineStyle: { width: 2, color: k.color }, areaStyle: { color: k.color, opacity: 0.12 } }],
});
const dailyOption = computed(() => ({
  color: DEFS.map((d) => d.color),
  tooltip: { trigger: "axis" },
  legend: { top: 0, icon: "circle", itemWidth: 8, itemHeight: 8, textStyle: { color: "#475467", fontSize: 12 } },
  grid: { left: 36, right: 16, top: isMobile.value ? 70 : 40, bottom: 28 },
  xAxis: { type: "category", data: dailyLabels.value, boundaryGap: dailyMode.value === "bar", ...axisBase },
  yAxis: { type: "value", minInterval: 1, splitLine: { lineStyle: { color: "#F1F3F9" } }, ...axisBase, axisLine: { show: false } },
  series: kpis.value.map((k) => ({
    name: k.label,
    type: dailyMode.value,
    stack: dailyMode.value === "bar" ? "all" : undefined,
    data: k.list.map((v) => num(v.cnt)),
    smooth: false,
    symbol: "circle",
    symbolSize: 5,
    showSymbol: dailyMode.value === "line",
    barMaxWidth: 18,
    lineStyle: { width: 2 },
    areaStyle: dailyMode.value === "line" ? { opacity: 0.06 } : undefined,
    emphasis: { focus: "series" },
  })),
}));
const trendOption = computed(() => ({
  color: DEFS.map((d) => d.color),
  tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
  legend: { top: 0, icon: "circle", itemWidth: 8, itemHeight: 8, textStyle: { color: "#475467", fontSize: 12 } },
  grid: { left: 36, right: 12, top: isMobile.value ? 70 : 56, bottom: 24 },
  xAxis: { type: "category", data: trend.value.labels, ...axisBase },
  yAxis: { type: "value", minInterval: 1, splitLine: { lineStyle: { color: "#F1F3F9" } }, ...axisBase, axisLine: { show: false } },
  series: DEFS.map((d) => ({ name: d.label, type: "bar", stack: "m", barMaxWidth: 28, data: trend.value.rows[d.key] || [], itemStyle: { borderRadius: 2 } })),
}));
const donutOption = computed(() => ({
  color: DEFS.map((d) => d.color),
  tooltip: { trigger: "item", formatter: "{b}: {c}건 ({d}%)" },
  legend: isMobile.value
    ? { orient: "horizontal", bottom: 0, left: "center", icon: "circle", itemWidth: 8, itemHeight: 8, textStyle: { color: "#475467", fontSize: 12 } }
    : { orient: "vertical", right: 8, top: "middle", icon: "circle", itemWidth: 8, itemHeight: 8, textStyle: { color: "#475467", fontSize: 12 } },
  series: [{
    type: "pie",
    radius: isMobile.value ? ["44%", "66%"] : ["52%", "78%"],
    center: isMobile.value ? ["50%", "42%"] : ["36%", "50%"],
    avoidLabelOverlap: true,
    itemStyle: { borderColor: "#fff", borderWidth: 2 },
    label: { show: true, position: "center", formatter: () => `{a|${fmt(monthSum.value)}}\n{b|이번 달 합계}`, rich: { a: { fontSize: 24, fontWeight: 700, color: "#1B2559" }, b: { fontSize: 12, color: "#8F9BBA", padding: [6, 0, 0, 0] } } },
    labelLine: { show: false },
    data: kpis.value.map((k) => ({ name: k.label, value: k.month })),
  }],
}));

watch(month, load);
onMounted(load);

definePageMeta({ layout: "default" });
useHead({
  htmlAttrs: { lang: "ko" },
  title: "대시보드",
  meta: [{ name: "description", content: "대시보드 페이지 입니다." }],
});
</script>

<style lang="scss" scoped>
.dash2 { display: flex; flex-direction: column; gap: 20px; }
.dash2-kpis { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 14px; }
.kpi {
  position: relative;
  background: #fff;
  border-radius: 18px;
  padding: 18px 18px 14px;
  box-shadow: 0 6px 24px rgba(112, 144, 176, 0.10);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 6px;
  &:before { content: ""; position: absolute; left: 0; top: 0; right: 0; height: 4px; background: var(--c); opacity: .85; }
  &-head { display: flex; align-items: center; gap: 8px; }
  &-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--c); }
  &-title { font-size: 13px; color: #6B7280; font-weight: 600; }
  &-main { display: flex; align-items: baseline; gap: 6px; }
  &-value { font-size: 28px; font-weight: 800; color: #1B2559; letter-spacing: -0.5px; font-variant-numeric: tabular-nums; }
  &-unit { font-size: 12px; color: #A3AED0; }
  &-delta { font-size: 12px; font-weight: 600; small { font-weight: 500; color: #A3AED0; margin-left: 2px; } &.up { color: #05A66B; } &.down { color: #E5484D; } &.flat { color: #A3AED0; } }
  &-spark { margin: 2px -4px 0; }
  &-foot { font-size: 12px; color: #8F9BBA; border-top: 1px dashed #EEF0F6; padding-top: 8px; b { color: #1B2559; font-weight: 700; margin-left: 2px; } }
}
.dash2-row { display: grid; gap: 20px; &.two { grid-template-columns: 3fr 2fr; } }
.card {
  background: #fff;
  border-radius: 18px;
  padding: 20px 22px;
  box-shadow: 0 6px 24px rgba(112, 144, 176, 0.10);
  min-width: 0;
  &-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; h3 { font-size: 18px; font-weight: 700; color: #1B2559; small { font-size: 13px; font-weight: 500; color: #A3AED0; margin-left: 6px; } } }
}
.seg { display: inline-flex; background: #F4F7FE; border-radius: 10px; padding: 3px; button { padding: 4px 12px; border-radius: 8px; font-size: 12px; color: #8F9BBA; &.on { background: #fff; color: #4318FF; font-weight: 700; box-shadow: 0 2px 6px rgba(0,0,0,.06); } } }
.empty { height: 240px; display: flex; align-items: center; justify-content: center; color: #A3AED0; font-size: 14px; }
.totals { display: flex; flex-direction: column; gap: 12px; padding: 4px 0; }
.total-row { display: grid; grid-template-columns: 120px 1fr 80px; align-items: center; gap: 14px; }
.total-label { font-size: 14px; color: #475467; font-weight: 600; }
.total-bar { height: 10px; background: #F1F3F9; border-radius: 10px; overflow: hidden; i { display: block; height: 100%; background: var(--c); border-radius: 10px; transition: width .6s ease; } }
.total-val { text-align: right; font-weight: 700; color: #1B2559; font-variant-numeric: tabular-nums; }

@media screen and (max-width: 1400px) { .dash2-kpis { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media screen and (max-width: 1024px) { .dash2-row.two { grid-template-columns: 1fr; } }
@media screen and (max-width: 768px) {
  .dash2-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
  .kpi { padding: 14px 14px 12px; &-value { font-size: 22px; } }
  .card { padding: 16px; }
  .total-row { grid-template-columns: 96px 1fr 56px; gap: 10px; }
}
</style>
