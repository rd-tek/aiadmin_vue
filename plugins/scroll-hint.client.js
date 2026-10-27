// 2026-10-26: 가로로 스크롤되는 표(.table-wrap 또는 data-scroll-hint)에 '더 있음' 표시 + 키보드 접근(4앱 같은 파일)
//   - 폰에서 표의 일부 열만 보이고 나머지가 있다는 표시가 없었음 → 스크롤 가능한 쪽 가장자리를 흐리게(전역 스타일 .scroll-more-*)
//   - 스크롤되는 영역에 키보드로 접근할 수 없었음(접근성 axe scrollable-region-focusable) → 넘칠 때만 tabindex·이름 부여
const SEL = ".table-wrap, [data-scroll-hint]";
const bound = new WeakSet();
const update = (el) => {
  const max = el.scrollWidth - el.clientWidth;
  const left = el.scrollLeft > 2;
  const right = max > 2 && el.scrollLeft < max - 2;
  el.classList.toggle("scroll-more-left", left);
  el.classList.toggle("scroll-more-right", right);
  // 세로로 스크롤되는 영역(PC 표 등)도 키보드 접근 대상
  const vmax = el.scrollHeight - el.clientHeight;
  const vScroll = vmax > 2 && /(auto|scroll)/.test(getComputedStyle(el).overflowY);
  if ((max > 2 || vScroll) && !el.hasAttribute("tabindex")) {
    el.setAttribute("tabindex", "0");
    if (!el.hasAttribute("role")) el.setAttribute("role", "region");
    if (!el.hasAttribute("aria-label")) el.setAttribute("aria-label", el.dataset.scrollHint || "표(좌우로 스크롤)");
  }
};
const bind = (el) => {
  if (bound.has(el)) { update(el); return; }
  bound.add(el);
  el.addEventListener("scroll", () => update(el), { passive: true });
  if (typeof ResizeObserver !== "undefined") new ResizeObserver(() => update(el)).observe(el);
  update(el);
};
// 2026-10-27: 슬라이드 탭(Swiper) — 처음/끝이 아니면 잘리는 쪽 가장자리 흐림(같은 .scroll-more-* 스타일)
const swBound = new WeakSet();
const bindSwiper = (el) => {
  const sw = el.swiper;
  if (!sw || swBound.has(el)) return;
  swBound.add(el);
  const upd = () => {
    const locked = sw.isLocked || (sw.isBeginning && sw.isEnd);
    el.classList.toggle("scroll-more-left", !locked && !sw.isBeginning);
    el.classList.toggle("scroll-more-right", !locked && !sw.isEnd);
  };
  ["progress", "resize", "slideChange", "transitionEnd", "update"].forEach((ev) => sw.on(ev, upd));
  upd();
};
const scan = () => {
  document.querySelectorAll(SEL).forEach(bind);
  document.querySelectorAll(".tab .swiper").forEach(bindSwiper);
};

export default defineNuxtPlugin((nuxtApp) => {
  let t = 0;
  const later = () => { clearTimeout(t); t = setTimeout(scan, 150); };
  nuxtApp.hook("app:mounted", later);
  nuxtApp.hook("page:finish", later);
  // 데이터가 늦게 와서 표가 나중에 생기는 경우
  new MutationObserver(later).observe(document.body, { childList: true, subtree: true });
});
