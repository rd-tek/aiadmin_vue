// 2026-11-17: 화면 크기 위젯(body zoom) 상태에서 ECharts 마우스 좌표 보정
//   ECharts(zrender)는 마우스 위치를 브라우저의 offsetX/offsetY 로 읽는데, body 에 zoom 이 걸리면 이 값이 확대된 화면 px 로 들어와
//   그래프 내부 좌표(확대 전 px)와 배율만큼 어긋남 → 범례(라벨)·점을 눌러도 옆 자리가 눌린 것으로 처리됨(오른쪽·아래로 갈수록 심함)
//   → 그래프가 받기 전에(capture) 실제 화면에 그려진 크기와 내부 크기의 비율로 좌표를 직접 계산해 넘김(zrX/zrY 가 있으면 zrender 는 그대로 사용)
const EVENTS = ["mousedown", "mousemove", "mouseup", "mouseout", "click", "dblclick", "contextmenu"];

export function attachEchartZoomFix(el, getChart) {
  const handler = (e) => {
    const chart = getChart();
    if (!chart || chart.isDisposed?.()) return;
    const rect = el.getBoundingClientRect();
    const w = chart.getWidth();
    const h = chart.getHeight();
    if (!rect.width || !rect.height || !w || !h) return;
    const sx = rect.width / w;
    const sy = rect.height / h;
    if (Math.abs(sx - 1) < 0.005 && Math.abs(sy - 1) < 0.005) return; // 배율 없음 → 기본 동작 그대로
    e.zrX = (e.clientX - rect.left) / sx;
    e.zrY = (e.clientY - rect.top) / sy;
  };
  EVENTS.forEach((name) => el.addEventListener(name, handler, true));
  return () => EVENTS.forEach((name) => el.removeEventListener(name, handler, true));
}
