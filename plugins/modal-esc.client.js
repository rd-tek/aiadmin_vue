// 2026-10-12(회귀 점검): 열린 모달을 ESC 로 닫기
//   대부분의 모달 컴포넌트에 ESC 처리가 없어 키보드로 닫을 수 없던 문제(원래부터) 보완.
//   - 맨 마지막(위) .modal.is-active 의 닫기 버튼(.btn-close)을 대신 눌러, 각 모달의 기존 닫기 로직(emit)을 그대로 사용
//   - 토스트(.toast-modal.is-active)가 떠 있으면 토스트 자체 ESC 처리에 맡김
//   - 모달을 닫았으면 이후 window 리스너 전파를 멈춰 자체 ESC 처리가 있는 모달과 중복 실행 방지
export default defineNuxtPlugin(() => {
  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || e.isComposing) return;
    if (document.querySelector(".toast-modal.is-active")) return;
    const vis = (el) => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== "hidden";
    const opened = [...document.querySelectorAll(".modal.is-active")].filter(vis);
    const top = opened[opened.length - 1];
    if (!top) return;
    const btn = top.querySelector(".modal-header .btn-close") || top.querySelector(".btn-close");
    if (!btn) return;
    e.stopImmediatePropagation();
    btn.click();
  });
});
