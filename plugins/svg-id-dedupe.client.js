/**
 * 2026-10-21: SVG 내부 id 중복 정리 (4앱 동일 파일)
 *
 * 피그마에서 내보낸 인라인 SVG 아이콘(mask0_…, clip0_… 등)이 헤더·목록 행처럼
 * 한 화면에 여러 번 그려져 같은 id 가 반복되었습니다(접근성 기준: id 중복 금지).
 * 파일 80여 곳을 하나씩 고치는 대신, 화면이 그려진 뒤 두 번째부터 나오는 SVG 내부 id 를
 * 고유하게 바꾸고 같은 <svg> 안의 참조(url(#id), href="#id")도 함께 바꿉니다.
 * - 페이지 하이드레이션까지 끝난 뒤(app:suspense:resolve)부터 동작 → 서버/브라우저 화면 불일치 없음
 * - 이후 화면 변화는 MutationObserver 로 감지해 다음 프레임에 한 번만 처리
 */
export default defineNuxtPlugin((nuxtApp) => {
  const REF_ATTRS = ["mask", "clip-path", "fill", "stroke", "filter", "marker-start", "marker-mid", "marker-end", "style"];
  let seq = 0;
  let raf = 0;

  const retarget = (svg, oldId, newId) => {
    const from = `url(#${oldId})`;
    const to = `url(#${newId})`;
    svg.querySelectorAll("*").forEach((n) => {
      for (const a of REF_ATTRS) {
        const v = n.getAttribute(a);
        if (v && v.includes(from)) n.setAttribute(a, v.split(from).join(to));
      }
      for (const h of ["href", "xlink:href"]) {
        if (n.getAttribute(h) === `#${oldId}`) n.setAttribute(h, `#${newId}`);
      }
    });
  };

  const run = () => {
    raf = 0;
    const seen = new Set();
    document.querySelectorAll("svg [id]").forEach((el) => {
      const id = el.id;
      if (!id) return;
      if (!seen.has(id)) {
        seen.add(id);
        return;
      }
      const svg = el.ownerSVGElement || el.closest("svg");
      let next;
      do next = `${id}--${++seq}`; while (document.getElementById(next));
      el.id = next;
      seen.add(next);
      if (svg) retarget(svg, id, next);
    });
  };

  const queue = () => {
    if (!raf) raf = requestAnimationFrame(run);
  };

  // 페이지(Suspense) 하이드레이션은 app:mounted 보다 늦게 끝남 → 그 전에 id 를 바꾸면 불일치 경고.
  // 첫 하이드레이션이 끝난(app:suspense:resolve, isHydrating=false) 뒤부터 동작
  let started = false;
  const start = () => {
    if (started) return;
    if (nuxtApp.isHydrating) {
      setTimeout(start, 50);
      return;
    }
    started = true;
    queue();
    new MutationObserver(queue).observe(document.body, { childList: true, subtree: true });
  };
  nuxtApp.hook("app:suspense:resolve", () => setTimeout(start, 0));
  nuxtApp.hook("page:finish", () => (started ? queue() : setTimeout(start, 0)));
});
