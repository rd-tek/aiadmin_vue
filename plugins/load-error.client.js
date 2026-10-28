/**
 * 2026-10-28 AI검토 4차: 데이터 불러오기 실패 안내 (4앱 같은 파일)
 *
 * 목록·상세를 불러오는 요청(GET)이 네트워크 끊김·서버 오류(5xx)로 실패해도 화면 대부분이 조용히
 * '데이터가 없습니다' 를 보여 줘서, 실제로 데이터가 없는 것처럼 보였습니다(오류는 콘솔에만).
 *
 * - api/inflight.js 가 이런 실패 때 window 에 'xg:load-error' 이벤트를 보냄(중단된 요청은 제외)
 * - 이 플러그인은
 *   1) html 에 .xg-load-error 를 붙임 → common.scss 가 글자 있는 빈 상태 문구를 '불러오지 못했습니다' 로 바꿔 보여 줌
 *   2) 화면 아래에 안내 바(다시 시도·닫기)를 띄움 — 화면이 이미 오류 토스트를 띄웠으면 생략(중복 방지)
 * - 페이지를 이동하면 둘 다 해제
 */
export default defineNuxtPlugin((nuxtApp) => {
  const root = document.documentElement;
  let bar = null;
  let timer = 0;

  const hide = () => {
    clearTimeout(timer);
    root.classList.remove("xg-load-error");
    if (bar) {
      bar.remove();
      bar = null;
    }
  };

  const show = (net) => {
    if (bar) return;
    bar = document.createElement("div");
    bar.className = "xg-snackbar";
    bar.setAttribute("role", "status");
    bar.setAttribute("aria-live", "polite");
    const msg = document.createElement("span");
    msg.className = "xg-snackbar-msg";
    msg.textContent = net
      ? "데이터를 불러오지 못했습니다. 네트워크 상태를 확인해 주세요."
      : "데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.";
    const retry = document.createElement("button");
    retry.type = "button";
    retry.className = "xg-snackbar-retry";
    retry.textContent = "다시 시도";
    retry.addEventListener("click", () => window.location.reload());
    const close = document.createElement("button");
    close.type = "button";
    close.className = "xg-snackbar-close";
    close.setAttribute("aria-label", "안내 닫기");
    close.textContent = "×";
    close.addEventListener("click", () => {
      if (bar) bar.remove();
      bar = null;
    });
    bar.append(msg, retry, close);
    document.body.appendChild(bar);
  };

  // 2026-10-28(최종 검토): 실패한 주소 목록 — 같은 주소가 다시 성공하면(검색·다시 불러오기) 안내를 거둠
  const failed = new Set();
  window.addEventListener("xg:load-ok", (e) => {
    const p = e?.detail?.path;
    if (!p || !failed.has(p)) return;
    failed.delete(p);
    if (!failed.size) hide();
  });

  window.addEventListener("xg:load-error", (e) => {
    if (e?.detail?.path) failed.add(e.detail.path);
    root.classList.add("xg-load-error");
    clearTimeout(timer);
    // 화면이 자체 오류 토스트를 띄웠는지 잠시 본 뒤 결정(같은 내용 두 번 안내하지 않음)
    timer = setTimeout(() => {
      const modalShown = [...document.querySelectorAll(".toast-modal.is-active")].some((el) => el.getClientRects().length);
      if (!modalShown) show(!!e?.detail?.net);
    }, 450);
  });

  nuxtApp.hook("page:start", () => { failed.clear(); hide(); });
});
