/**
 * 2026-10-28 AI검토 4차: 팝업 접근성 공통 처리 (4앱 같은 파일)
 *
 * 팝업 약 70개 중 role="dialog" 가 1개뿐이고, ESC 닫기·포커스 이동이 팝업마다 달랐습니다
 * (키보드·화면낭독기 사용자가 팝업이 열린 줄 모르거나, Tab 이 팝업 뒤 화면으로 빠져나감).
 *
 * 대상: 열린 팝업 .modal.is-active(안쪽 .modal-container) · 토스트 .toast-modal.is-active
 * - 열릴 때: role=dialog(확인·삭제 토스트는 alertdialog)·aria-modal·제목 연결, 포커스를 팝업으로 이동
 * - 열린 동안: Tab/Shift+Tab 이 팝업 안에서만 돎
 * - ESC: 닫기(X)·'취소'·안내 토스트의 단일 버튼만 누름 — 확인/삭제 같은 실행 버튼은 누르지 않음
 * - 닫힐 때: 열기 전 포커스 위치로 되돌림
 * 컴포넌트 코드는 건드리지 않음(이미 ESC 를 처리하는 팝업은 같은 닫기가 한 번 더 불릴 뿐)
 */
export default defineNuxtPlugin(() => {
  const OPEN = ".modal.is-active, .toast-modal.is-active";
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const stack = []; // { el, box, prev }
  let seq = 0;
  let raf = 0;

  const visible = (el) => !!el && el.isConnected && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== "hidden";
  const boxOf = (el) => (el.classList.contains("toast-modal") ? el : el.querySelector(".modal-container") || el);
  const focusables = (box) => [...box.querySelectorAll(FOCUSABLE)].filter((n) => visible(n) && !n.closest("[inert]"));

  const decorate = (el, box) => {
    const alert = el.matches(".toast-modal-confirm, .toast-modal-delete");
    if (!box.hasAttribute("role")) box.setAttribute("role", alert ? "alertdialog" : "dialog");
    box.setAttribute("aria-modal", "true");
    if (!box.hasAttribute("tabindex")) box.setAttribute("tabindex", "-1");
    box.setAttribute("data-xg-dialog", "");
    if (!box.hasAttribute("aria-labelledby") && !box.hasAttribute("aria-label")) {
      const t = box.querySelector(".modal-header .title, .modal-header h2, .modal-header h3, .tit, .cont-area");
      if (t) {
        if (!t.id) t.id = `xg-dialog-title-${++seq}`;
        box.setAttribute("aria-labelledby", t.id);
      }
    }
  };

  const scan = () => {
    raf = 0;
    const open = [...document.querySelectorAll(OPEN)].filter(visible);
    // 닫힌 팝업: 포커스 되돌림
    for (let i = stack.length - 1; i >= 0; i--) {
      if (!open.includes(stack[i].el)) {
        const { box, prev } = stack.splice(i, 1)[0];
        const focusInside = box.contains(document.activeElement) || document.activeElement === document.body;
        if (focusInside && prev && prev.isConnected && typeof prev.focus === "function") prev.focus({ preventScroll: true });
      }
    }
    // 새로 열린 팝업: 속성·포커스
    for (const el of open) {
      if (stack.some((s) => s.el === el)) continue;
      const box = boxOf(el);
      decorate(el, box);
      stack.push({ el, box, prev: document.activeElement });
      // 열림 애니메이션 뒤 포커스(입력칸 대신 팝업 자체 — 모바일 키보드가 갑자기 뜨지 않게)
      setTimeout(() => { if (visible(el) && !box.contains(document.activeElement)) box.focus({ preventScroll: true }); }, 60);
    }
  };
  const schedule = () => { if (!raf) raf = requestAnimationFrame(scan); };
  new MutationObserver(schedule).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["class"] });

  document.addEventListener("keydown", (e) => {
    const top = stack[stack.length - 1];
    if (!top || !visible(top.el)) return;
    const { el, box } = top;
    if (e.key === "Tab") {
      const list = focusables(box);
      if (!list.length) { e.preventDefault(); box.focus({ preventScroll: true }); return; }
      const first = list[0], last = list[list.length - 1];
      const a = document.activeElement;
      if (e.shiftKey && (a === first || a === box || !box.contains(a))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (a === last || !box.contains(a))) { e.preventDefault(); first.focus(); }
    } else if (e.key === "Escape" && !e.defaultPrevented) {
      // 2026-10-28(최종 검토): 팝업 안에서 날짜 선택기·펼친 목록이 열려 있으면 ESC 는 그것만 닫게(팝업은 그대로)
      const t = e.target instanceof Element ? e.target : null;
      if (t && t.closest('[aria-expanded="true"], .dp__menu, .dp__outer_menu_wrap, .dp__overlay')) return;
      if (document.querySelector(".dp__outer_menu_wrap, .dp__menu:not(.dp__menu_inline)")?.getClientRects().length) return;
      const btns = [...box.querySelectorAll("button")].filter(visible);
      // 머리말의 닫기(X)를 먼저 — 본문 안의 다른 X(항목 지우기 등)를 누르지 않게
      let target = [box.querySelector(".modal-header .btn-close"), box.querySelector(":scope > .btn-close, :scope > * > .btn-close"), box.querySelector('[aria-label="닫기"], [aria-label="안내 닫기"]'), box.querySelector(".btn-close")].find(visible) || null;
      if (!visible(target)) target = btns.find((b) => /^(취소|닫기)$/.test(b.textContent.trim()));
      if (!target && el.matches(".toast-modal-error, .toast-modal-warn, .toast-modal-alarm, .toast-modal:not(.toast-modal-confirm):not(.toast-modal-delete)") && btns.length === 1) target = btns[0];
      if (target) { e.preventDefault(); target.click(); }
    }
  }, true);
});
