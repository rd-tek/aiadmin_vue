/**
 * 2026-10-28 AI검토 4차: 클릭만 되는 칸 키보드 처리 (4앱 같은 파일, 짝: xg-click-a11y.mjs 컴파일 변환)
 * - [data-xg-click] 에서 Enter/Space → 클릭과 같은 동작
 * - 안쪽에 링크·버튼·입력칸이 있는 칸은 role/tabindex 를 떼어 '버튼 안 버튼'(중첩) 이 되지 않게 함 — 이 경우 안쪽 요소로 조작
 * - 화면에 안 보이는(display:none) 칸은 Tab 순서에서 자연히 빠짐
 */
export default defineNuxtPlugin((nuxtApp) => {
  const INNER = 'a[href], button, input, select, textarea, [contenteditable="true"], [tabindex]:not([data-xg-click])';
  let raf = 0;
  const fix = () => {
    raf = 0;
    for (const el of document.querySelectorAll("[data-xg-click]")) {
      const nested = !!el.querySelector(INNER);
      if (nested && el.getAttribute("role") === "button") {
        el.removeAttribute("role");
        el.removeAttribute("tabindex");
        el.setAttribute("data-xg-click", "nested");
      } else if (!nested && el.getAttribute("data-xg-click") === "nested") {
        el.setAttribute("role", "button");
        el.setAttribute("tabindex", "0");
        el.setAttribute("data-xg-click", "");
      }
    }
  };
  const schedule = () => { if (!raf) raf = requestAnimationFrame(fix); };
  // 하이드레이션이 끝난 뒤부터(서버 HTML 과 속성이 달라 경고가 나지 않게)
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    new MutationObserver(schedule).observe(document.body, { subtree: true, childList: true });
    schedule();
  };
  nuxtApp.hook("app:suspense:resolve", start);
  nuxtApp.hook("page:finish", start);

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const el = e.target;
    if (!(el instanceof HTMLElement) || !el.matches('[data-xg-click][role="button"]')) return;
    if (e.repeat) return;
    e.preventDefault(); // Space 로 화면이 스크롤되지 않게
    el.click();
  });
});
