// 2026-11-18: 화면 크기 위젯(body zoom) 상태에서 모든 ECharts 그래프의 마우스 좌표 보정(앱 전체 한 곳)
//   ECharts(zrender)는 마우스 위치를 offsetX/offsetY 로 읽는데, body 에 zoom 이 걸리면 확대된 화면 px 로 들어와
//   그래프 내부 좌표(확대 전 px)와 배율만큼 어긋남 → 범례·점·막대를 누르거나 올려도 옆 항목이 잡힘(오른쪽·아래로 갈수록 심함)
//   aiadmin 노찬규 utils/echart-zoom-fix.js(대시보드 그래프 1개)와 같은 계산을 document 캡처 단계에서 모든 그래프에 적용
//   (zrender 는 이벤트에 zrX/zrY 가 이미 있으면 그대로 씀, 배율이 없으면 아무것도 안 함)
const EVENTS = ["mousedown", "mousemove", "mouseup", "mouseout", "click", "dblclick", "contextmenu"];

export default defineNuxtPlugin(() => {
  const handler = (e) => {
    const t = e.target;
    if (!t || typeof t.closest !== "function") return;
    const box = t.closest("[_echarts_instance_]");
    if (!box) return;
    // 그래프 실제 크기 = zrender 가 만든 안쪽 div(style 의 px 크기 = 차트 내부 크기, 배율 뒤 resize 전이어도 맞음)
    const root = box.querySelector(":scope > div") || box;
    const w = parseFloat(root.style.width) || root.offsetWidth;
    const h = parseFloat(root.style.height) || root.offsetHeight;
    if (!w || !h) return;
    const rect = root.getBoundingClientRect();
    const sx = rect.width / w;
    const sy = rect.height / h;
    if (Math.abs(sx - 1) < 0.005 && Math.abs(sy - 1) < 0.005) return; // 배율 없음 → 기본 동작 그대로
    e.zrX = (e.clientX - rect.left) / sx;
    e.zrY = (e.clientY - rect.top) / sy;
  };
  EVENTS.forEach((name) => document.addEventListener(name, handler, true));
});
