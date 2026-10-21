<template>
  <!--
    2026-10-21: 화면 크기 조절 — 정부24(plus.gov.kr) 방식 참고
      · 위치: GNB 오른쪽 고정(알림 왼쪽). PC '화면 크기 ▾' 글자 버튼, 모바일은 같은 자리 아이콘 버튼
      · 선택: 이름 붙은 5단계(작게 / 보통(기본) / 조금 크게 / 크게 / 가장 크게) + 초기화, 현재 단계 체크 표시
      · floating: GNB 가 없는 강좌 강의실 화면용(오른쪽 아래 고정, '맨 위로' 버튼과 겹치면 비킴)
      · 4앱(aimember·aishop·aiadmin·aicoach) 동일 파일, 저장 키 xg_fontscale(이전 값 유지)
  -->
  <div
    class="font-size-control"
    :class="{ 'is-floating': floating, 'is-menu': !floating, 'is-compact': compact, 'is-pop-left': popAlign === 'left', 'is-open': open }"
    ref="rootRef"
    :style="floating && fabBottom ? { bottom: fabBottom + 'px' } : null"
  >
    <button
      ref="toggleRef"
      type="button"
      class="fs-toggle"
      :aria-label="`화면 크기 조절, 현재 ${currentLabel}`"
      aria-haspopup="true"
      :aria-expanded="open ? 'true' : 'false'"
      :aria-controls="popId"
      @click.stop="toggle"
      @keydown.esc.stop="close(true)"
    >
      <svg class="fs-svg" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M3 18 8 6l5 12M4.6 14h6.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M14.5 18 18 10l3.5 8M15.6 15.5h4.8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span class="fs-label" v-if="!floating">화면 크기</span>
      <span class="fs-label" v-else>화면</span>
      <svg v-if="!floating" class="fs-caret" viewBox="0 0 12 12" width="10" height="10" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </button>

    <div v-show="open" :id="popId" class="fs-pop" role="group" aria-label="화면 크기" @click.stop @keydown.esc.stop="close(true)">
      <p class="fs-pop-title">화면 크기</p>
      <ul class="fs-list">
        <li v-for="(lv, i) in LEVELS" :key="lv.v">
          <button
            :ref="(el) => { if (i === 0) firstPopBtn = el }"
            type="button"
            class="fs-opt"
            :class="{ 'is-on': isCurrent(lv.v) }"
            :aria-pressed="isCurrent(lv.v) ? 'true' : 'false'"
            @click="setScale(lv.v)"
          >
            <span class="fs-opt-sample" :style="{ fontSize: Math.round(14 * lv.v) + 'px' }" aria-hidden="true">가</span>
            <span class="fs-opt-name">{{ lv.name }}<small v-if="lv.v === 1">(기본)</small></span>
            <svg v-if="isCurrent(lv.v)" class="fs-check" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
        </li>
      </ul>
      <button type="button" class="fs-reset" @click="setScale(1)">초기화</button>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  // GNB 가 없는 화면(강좌 강의실)용 오른쪽 아래 고정 버튼
  floating: { type: Boolean, default: false },
  // 모바일 상단바처럼 좁은 자리: 아이콘만
  compact: { type: Boolean, default: false },
  // 패널 펼침 방향(버튼이 화면 왼쪽에 있으면 "left")
  popAlign: { type: String, default: "right" },
  // (이전 호출 호환용 — 사용하지 않음)
  variant: { type: String, default: "" },
  collapsible: { type: Boolean, default: false },
});
const KEY = "xg_fontscale";
const LEVELS = [
  { v: 0.9, name: "작게" },
  { v: 1, name: "보통" },
  { v: 1.1, name: "조금 크게" },
  { v: 1.2, name: "크게" },
  { v: 1.3, name: "가장 크게" },
];
const scale = ref(1);
const open = ref(false);
const rootRef = ref(null);
const toggleRef = ref(null);
let firstPopBtn = null;
const popId = props.floating ? "fs-pop-fab" : "fs-pop-gnb";

// 이전 단계(0.85·1.15·1.45 등)로 저장된 값은 가장 가까운 단계로 맞춤
const nearest = (v) => LEVELS.reduce((a, b) => (Math.abs(b.v - v) < Math.abs(a.v - v) ? b : a)).v;
const isCurrent = (v) => Math.abs(scale.value - v) < 0.001;
const currentLabel = computed(() => (LEVELS.find((l) => isCurrent(l.v)) || LEVELS[1]).name);

const apply = (v) => {
  if (!import.meta.client) return;
  try {
    document.body.style.zoom = String(v);
    localStorage.setItem(KEY, String(v));
  } catch (e) {}
};
const setScale = (v) => {
  scale.value = nearest(v);
  apply(scale.value);
  queueAvoid();
};

const toggle = async () => {
  if (open.value) return close(true);
  open.value = true;
  await nextTick();
  firstPopBtn?.focus?.();
};
const close = (returnFocus) => {
  open.value = false;
  if (returnFocus) toggleRef.value?.focus?.();
};
const onDocClick = (e) => {
  if (open.value && rootRef.value && !rootRef.value.contains(e.target)) close(false);
};
const onDocKey = (e) => {
  if (open.value && e.key === "Escape") close(true);
};

// 고정 버튼이 '맨 위로' 버튼(.btn-top)과 겹치지 않게
const fabBottom = ref(0);
let fabRaf = 0;
const avoidTopButton = () => {
  fabRaf = 0;
  if (!props.floating || !import.meta.client) return;
  const base = window.innerWidth <= 1024 ? 100 : 140;
  const top = [...document.querySelectorAll(".btn-top")].find((el) => el.offsetParent && el.getBoundingClientRect().height > 0);
  let b = base;
  if (top) {
    const r = top.getBoundingClientRect();
    if (r.bottom > 0 && r.top < window.innerHeight) b = Math.max(base, Math.round(window.innerHeight - r.top + 14));
  }
  if (b !== fabBottom.value) fabBottom.value = b;
};
const queueAvoid = () => {
  if (!props.floating || !import.meta.client) return;
  if (!fabRaf) fabRaf = requestAnimationFrame(avoidTopButton);
};

onMounted(() => {
  try {
    const s = parseFloat(localStorage.getItem(KEY));
    if (!isNaN(s) && s > 0) {
      scale.value = nearest(s);
      document.body.style.zoom = String(scale.value);
    }
  } catch (e) {}
  document.addEventListener("click", onDocClick);
  document.addEventListener("keydown", onDocKey);
  if (props.floating) {
    window.addEventListener("scroll", queueAvoid, { passive: true });
    window.addEventListener("resize", queueAvoid);
    setTimeout(queueAvoid, 300);
  }
});
onBeforeUnmount(() => {
  document.removeEventListener("click", onDocClick);
  document.removeEventListener("keydown", onDocKey);
  window.removeEventListener("scroll", queueAvoid);
  window.removeEventListener("resize", queueAvoid);
  if (fabRaf) cancelAnimationFrame(fabRaf);
});
</script>
<style lang="scss" scoped>
.font-size-control {
  position: relative;
  display: inline-flex;
  align-items: center;
  flex: none;
}

/* GNB 버튼: '화면 크기 ▾' (알림 왼쪽) */
.is-menu .fs-toggle {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #E5E7E8;
  border-radius: 999px;
  background: #fff;
  color: #35383B;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: border-color .15s, background .15s;
  &:hover { background: #F7F8F9; }
  .fs-caret { transition: transform .2s; }
}
.is-menu.is-open .fs-toggle {
  border-color: #35383B;
  .fs-caret { transform: rotate(180deg); }
}

/* 패널 */
.fs-pop {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 300;
  width: 216px;
  padding: 10px;
  border: 1px solid #E5E7E8;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  text-align: left;
}
.is-pop-left .fs-pop { left: 0; right: auto; }
.fs-pop-title {
  margin: 2px 6px 6px;
  font-size: 12px;
  font-weight: 700;
  color: #72777A;
}
.fs-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.fs-opt {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 40px;
  padding: 6px 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #35383B;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  &:hover { background: #F2F3F4; }
  &.is-on { background: #EEF1F4; font-weight: 700; }
  &:focus-visible { outline: 2px solid #2563eb; outline-offset: 1px; }
}
.fs-opt-sample {
  flex: 0 0 26px;
  text-align: center;
  font-weight: 700;
  line-height: 1;
}
.fs-opt-name {
  flex: 1;
  small { margin-left: 3px; font-size: 12px; font-weight: 400; color: #72777A; }
}
.fs-check { flex: none; color: #35383B; }
.fs-reset {
  display: block;
  width: 100%;
  margin-top: 6px;
  padding: 9px 0 3px;
  border: 0;
  border-top: 1px solid #E5E7E8;
  background: transparent;
  font-size: 13px;
  color: #72777A;
  cursor: pointer;
  &:hover { color: #35383B; }
}

/* 모바일 GNB: 같은 자리 아이콘 버튼(글자는 화면 읽기용) */
.is-menu.is-compact .fs-toggle {
  width: 36px;
  padding: 0;
  justify-content: center;
  .fs-label, .fs-caret { display: none; }
}
@media screen and (max-width: 768px) {
  .is-menu .fs-toggle {
    width: 36px;
    padding: 0;
    justify-content: center;
    .fs-label, .fs-caret { display: none; }
  }
  .fs-pop { width: 200px; }
}

/* 강좌 강의실: 오른쪽 아래 고정 */
.font-size-control.is-floating {
  position: fixed;
  right: 60px;
  bottom: 140px;
  z-index: 98;
  .fs-toggle {
    width: 60px;
    height: 60px;
    border: 1px solid #E5E7E8;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    color: #35383B;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
  }
  .fs-pop { top: auto; bottom: calc(100% + 10px); }
}
@media screen and (max-width: 1024px) {
  .font-size-control.is-floating {
    right: 30px;
    bottom: 100px;
    .fs-toggle { width: 50px; height: 50px; }
  }
}
@media print { .font-size-control.is-floating { display: none; } }
</style>
